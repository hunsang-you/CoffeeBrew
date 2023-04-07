import sys
import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd

from ..util.logging_time import logging_time

from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta

from ..db.model import Model
from ..db.dataloader import DataLoader


@logging_time
def load_item_data(model: DeclarativeMeta, db: Session):
    loader = DataLoader(db)

    db_items = loader.load_data(model)
    item_idx = model.__tablename__ + "_idx"
    item_model_detail = Model()[model.__tablename__ + "_detail"]
    item_model_score = Model()[model.__tablename__ + "_score"]

    if not db_items:
        db_df = pd.DataFrame()
    else:
        item_df = pd.DataFrame(
            data=[item.values() for item in db_items], columns=db_items[0].keys()
        )
        item_df = item_df[list(model.__table__.columns.keys())]

        item_detail_df = pd.DataFrame(
            data=[item.detail.values() for item in db_items],
            columns=db_items[0].detail.keys(),
        )
        item_detail_df = item_detail_df[
            list(item_model_detail.__table__.columns.keys())
        ]

        item_score_df = pd.DataFrame(
            data=[item.score.values() for item in db_items],
            columns=db_items[0].score.keys(),
        )
        item_score_df = item_score_df[list(item_model_score.__table__.columns.keys())]

        db_df = item_df.copy()
        db_df = pd.merge(
            item_df,
            item_detail_df.drop(["idx", "created_date", "updated_date"], axis=1),
            how="left",
            left_on="idx",
            right_on=item_idx,
        )

        db_df.drop(item_idx, axis=1, inplace=True)

        db_df = pd.merge(
            item_df,
            item_score_df.drop(["idx", "created_date", "updated_date"], axis=1),
            how="left",
            left_on="idx",
            right_on=item_idx,
        )

        db_df.drop(item_idx, axis=1, inplace=True)

    return db_df


@logging_time
def calc_recom_bean(db: Session, save_dir: str):
    model = Model()

    bean_data_df = load_item_data(model["Bean"], db)

    cosine_sim = cosine_similarity(
        bean_data_df[["flavor", "acidity", "sweetness", "bitterness", "body"]]
    )

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=bean_data_df["idx"],
        columns=bean_data_df["name_ko"],
        dtype=np.float16,
    )

    # 유사도 기준으로 추천 원두의 상위 10개를 출력
    recom_df = bean_data_df.copy()[["idx", "name_ko"]]
    recom_df["recommendation"] = recom_df.apply(
        lambda x: recommendation_list_by_id(x.idx, cosine_sim_df, bean_data_df, k=10),
        axis=1,
    )

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    recom_df.to_csv(
        path.join(save_dir, "item_recom_bean.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


@logging_time
def calc_recom_capsule(db: Session, save_dir: str):
    model = Model()

    capsule_data_df = load_item_data(model["Capsule"], db)

    cosine_sim = cosine_similarity(
        capsule_data_df[["flavor", "acidity", "roasting", "bitterness", "body"]]
    )

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=capsule_data_df["idx"],
        columns=capsule_data_df["name_ko"],
        dtype=np.float16,
    )

    # 유사도 기준으로 추천 캡슐의 상위 10개를 출력
    recom_df = capsule_data_df.copy()[["idx", "name_ko"]]
    recom_df["recommendation"] = recom_df.apply(
        lambda x: recommendation_list_by_id(
            x.idx, cosine_sim_df, capsule_data_df, k=10
        ),
        axis=1,
    )

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    recom_df.to_csv(
        path.join(save_dir, "item_recom_capsule.csv"),
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
            .drop(target_id)[:k]  # 자기 자신을 제외하고 k개 slice
            .index
        )

        # 반환한 인덱스 값은 1부터 시작하나, 실제 iloc로 접근하는 인덱스 값은 0부터 시작하므로 이를 보정해야함
        recom_idx = recom_idx - 1
        recom_id = items.iloc[recom_idx, :].idx.values
        recom_title = items.iloc[recom_idx, :].name_ko.values

    except:
        print(target_idx)
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
        print("Invalid argument - {}".format(itemIdx))
        recom_list = []

    return recom_list[:k]
