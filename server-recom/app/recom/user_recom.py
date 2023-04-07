import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd

from ..util.logging_time import logging_time

from sqlalchemy.orm import Session

from ..db.model import Model
from ..db.dataloader import DataLoader


@logging_time
def calc_recom_bean_by_age(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    member_df = loader.load_data(model["Member"])
    like_list_df = loader.load_data_by_item_type(model["LikeList"], "bean")
    bean_data_df = loader.load_data(model["Bean"])

    member_like_df = pd.merge(
        like_list_df,
        member_df[["idx", "age_range", "gender"]],
        left_on="member_idx",
        right_on="idx",
    )

    member_like_df = pd.merge(
        member_like_df,
        bean_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    member_like_df = member_like_df[
        ["item_idx", "name_ko", "member_idx", "age_range", "gender"]
    ]
    member_like_df["count"] = 1

    # 각 연령대별 좋아요를 많이 받은 상품을 표시
    age_like_df = member_like_df.pivot_table(
        index=["age_range"], columns=["item_idx"], values="count", aggfunc="sum"
    )

    # 모든 연령대를 통틀어 가장 좋아요를 많이 받은 상품을 표시
    age_like_df.loc["00~00"] = member_like_df.pivot_table(
        columns=["item_idx"], values="count", aggfunc="sum"
    ).iloc[0]

    # 결측치 채우기
    age_like_df.fillna(0, inplace=True)

    # 좋아요 합계 기준으로 연령대별 추천 원두의 상위 10개를 출력
    recom_df = pd.DataFrame(
        [[i + 1, age_range] for i, age_range in enumerate(age_like_df.index)],
        columns=["idx", "age_range"],
    )
    recom_df["recommendation"] = recom_df.apply(
        lambda x: get_top_k(x.age_range, age_like_df, bean_data_df, k=10), axis=1
    )

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    recom_df.to_csv(
        path.join(save_dir, "like_recom_bean_by_age.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


@logging_time
def calc_recom_capsule_by_age(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    member_df = loader.load_data(model["Member"])
    like_list_df = loader.load_data_by_item_type(model["LikeList"], "capsule")
    capsule_data_df = loader.load_data(model["Capsule"])

    member_like_df = pd.merge(
        like_list_df,
        member_df[["idx", "age_range", "gender"]],
        left_on="member_idx",
        right_on="idx",
    )

    member_like_df = pd.merge(
        member_like_df,
        capsule_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )
    member_like_df = member_like_df[
        ["item_idx", "name_ko", "member_idx", "age_range", "gender"]
    ]
    member_like_df["count"] = 1

    # 각 연령대별 좋아요를 많이 받은 상품을 표시
    age_like_df = member_like_df.pivot_table(
        index=["age_range"], columns=["item_idx"], values="count", aggfunc="sum"
    )

    # 모든 연령대를 통틀어 가장 좋아요를 많이 받은 상품을 표시
    age_like_df.loc["00~00"] = member_like_df.pivot_table(
        columns=["item_idx"], values="count", aggfunc="sum"
    ).iloc[0]

    # 결측치 채우기
    age_like_df.fillna(0, inplace=True)

    # 좋아요 합계 기준으로 연령대별 추천 캡슐의 상위 10개를 출력
    recom_df = pd.DataFrame(
        [[i + 1, age_range] for i, age_range in enumerate(age_like_df.index)],
        columns=["idx", "age_range"],
    )
    recom_df["recommendation"] = recom_df.apply(
        lambda x: get_top_k(x.age_range, age_like_df, capsule_data_df, k=10), axis=1
    )

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    recom_df.to_csv(
        path.join(save_dir, "like_recom_capsule_by_age.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


def get_recom_by_age(age_range, matrix, k=5):
    try:
        recom_list = matrix.set_index("age_range").loc[age_range]["recommendation"]

    except:
        print("Invalid argument - {}".format(age_range))
        recom_list = matrix.set_index("age_range").loc["00~00"]["recommendation"]

    recom_list = json.loads(recom_list.replace("'", '"'))
    recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    return recom_list[:k]


def get_recom_by_gender(gender, matrix, k=5):
    try:
        recom_list = matrix.set_index("gender").loc[gender]["recommendation"]

    except:
        print("Invalid argument - {}".format(gender))
        recom_list = matrix.set_index("gender").loc["None"]["recommendation"]

    recom_list = json.loads(recom_list.replace("'", '"'))
    recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    return recom_list[:k]


def get_recom_by_user(userIdx, data, matrix, itemType="bean"):
    try:
        user_likes = data.loc[
            (data["member_idx"] == userIdx) & (data["item_type"] == itemType)
        ]
        user_likes = list(user_likes["item_idx"].values)

        recom_list = []
        for temp_list in matrix.set_index("idx").loc[user_likes]["recommendation"]:
            recom_list.extend(json.loads(temp_list.replace("'", '"')))

        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]
        recom_list = random.sample(recom_list, k=5)

    except:
        print(user_likes)
        print(recom_list)

    return recom_list


def get_top_k(loc_index, matrix, items, axis=0, k=10):
    top_k_idx = []

    if axis == 0:
        top_k_idx = matrix.loc[loc_index].sort_values()[-k:].index
    else:
        top_k_idx = matrix.loc[:, loc_index].sort_values()[-k:].index

    try:
        top_k_idx = top_k_idx - 1
        recom_id = items.iloc[top_k_idx, :].idx.values
        recom_title = items.iloc[top_k_idx, :].name_ko.values
    except:
        print(top_k_idx)
        print(recom_id, recom_title)

    recom_list = [dict(id=id, title=title) for id, title in zip(recom_id, recom_title)]

    return recom_list
