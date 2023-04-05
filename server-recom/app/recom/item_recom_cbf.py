import sys
import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd

from ..util.logging_time import logging_time

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sqlalchemy.orm import Session

from ..db import crud
from ..db import model


@logging_time
def load_bean_data(db: Session):
    db_items = crud.get_many(db, model.Bean, limit=sys.maxsize)

    bean_df = pd.DataFrame(
        data=[item.values() for item in db_items], columns=db_items[0].keys()
    )
    bean_df = bean_df[list(model.Bean.__table__.columns.keys())]

    bean_detail_df = pd.DataFrame(
        data=[item.detail.values() for item in db_items],
        columns=db_items[0].detail.keys(),
    )
    bean_detail_df = bean_detail_df[list(model.Bean_detail.__table__.columns.keys())]

    bean_score_df = pd.DataFrame(
        data=[item.score.values() for item in db_items],
        columns=db_items[0].score.keys(),
    )
    bean_score_df = bean_score_df[list(model.Bean_score.__table__.columns.keys())]

    bean_data_df = bean_df.copy()
    bean_data_df = pd.merge(
        bean_df,
        bean_detail_df.drop(["idx", "created_date", "updated_date"], axis=1),
        how="left",
        left_on="idx",
        right_on="bean_idx",
    )
    bean_data_df.drop("bean_idx", axis=1, inplace=True)
    bean_data_df = pd.merge(
        bean_df,
        bean_score_df.drop(["idx", "created_date", "updated_date"], axis=1),
        how="left",
        left_on="idx",
        right_on="bean_idx",
    )
    bean_data_df.drop("bean_idx", axis=1, inplace=True)

    return bean_data_df


@logging_time
def calc_bean_recom(db: Session, save_dir: str):
    bean_data_df = load_bean_data(db)

    grade_cosine_sim = cosine_similarity(
        bean_data_df[["flavor", "acidity", "sweetness", "bitterness", "body"]]
    )

    df_grade_cosine_sim = pd.DataFrame(
        grade_cosine_sim,
        index=bean_data_df["idx"],
        columns=bean_data_df["name_ko"],
        dtype=np.float16,
    )

    # 유사도 기준으로 추천 원두의 상위 5개를 출력
    bean_recom = bean_data_df.copy()[["idx", "name_ko"]]
    bean_recom["recommendation"] = bean_recom.apply(
        lambda x: recommendation_list_by_id(
            x.idx, df_grade_cosine_sim, bean_data_df, k=5
        ),
        axis=1,
    )

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    bean_recom.to_csv(
        path.join(save_dir, "bean_cbf_recom.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


# id 기반 추천 알고리즘
def recommendation_list_by_id(target_id, matrix, items, k=10):
    try:
        target_idx = matrix.index.get_indexer([target_id])
        recom_idx = (
            matrix.iloc[:, target_idx]
            .sort_values(by=matrix.iloc[:, target_idx].columns[0], ascending=False)
            .drop(target_id)[:k]
            .index
        )

        # 반환한 인덱스 값은 1부터 시작하나, 실제 iloc로 접근하는 인덱스 값은 0부터 시작하므로 이를 보정해야함
        recom_idx = recom_idx - 1
        recom_id = items.iloc[recom_idx, :].idx.values
        recom_title = items.iloc[recom_idx, :].name_ko.values

    except:
        print(recom_idx)
        print(recom_id, recom_title)

    recom_list = [dict(id=id, title=title) for id, title in zip(recom_id, recom_title)]

    return recom_list


# 추천 결과가 저장된 json에서 값을 읽어오는 메소드
def get_recom_by_item(itemIdx, matrix, k=5):
    try:
        recom_list = matrix.set_index("idx").loc[itemIdx]["recommendation"]
        recom_list = json.loads(recom_list.replace("'", '"'))
        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    except:
        print(itemIdx)
        print(recom_list)

    return recom_list[:k]
