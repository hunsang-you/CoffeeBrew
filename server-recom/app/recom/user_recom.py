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

from fastapi import HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta

from .item_recom_cbf import load_item_data
from ..db import crud
from ..db import model


@logging_time
def load_user_data(db: Session):
    db_users = crud.get_many(db, model.Member, limit=sys.maxsize)
    user_idx = model.Member.__tablename__ + "_idx"

    user_df = pd.DataFrame(
        data=[user.values() for user in db_users], columns=db_users[0].keys()
    )
    user_df = user_df[list(model.Member.__table__.columns.keys())]

    return user_df


@logging_time
def load_like_data(db: Session):
    db_likes = crud.get_many(db, model.LikeList, limit=sys.maxsize)
    like_idx = model.LikeList.__tablename__ + "_idx"

    like_df = pd.DataFrame(
        data=[like.values() for like in db_likes], columns=db_likes[0].keys()
    )
    like_df = like_df[list(model.LikeList.__table__.columns.keys())]

    return like_df


@logging_time
def load_review_data(db: Session):
    db_reviews = crud.get_many(db, model.Review, limit=sys.maxsize)
    review_idx = model.Review.__tablename__ + "_idx"

    review_df = pd.DataFrame(
        data=[review.values() for review in db_reviews], columns=db_reviews[0].keys()
    )
    review_df = review_df[list(model.Review.__table__.columns.keys())]

    return review_df


@logging_time
def calc_recom_bean_by_age(db: Session, save_dir: str):
    member_df = load_user_data(db)
    like_list_df = load_like_data(db)
    bean_data_df = load_item_data(model.Bean, db)

    member_like_df = pd.merge(
        like_list_df,
        member_df[["idx", "age_range", "gender"]],
        left_on="member_idx",
        right_on="idx",
    )

    member_like_df.drop(
        member_like_df[member_like_df["item_type"] == "capsule"].index,
        axis=0,
        inplace=True,
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

    age_like_df = member_like_df.pivot_table(
        index=["age_range"], columns=["item_idx"], values="count", aggfunc="sum"
    )
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
    member_df = load_user_data(db)
    like_list_df = load_like_data(db)
    capsule_data_df = load_item_data(model.Capsule, db)

    member_like_df = pd.merge(
        like_list_df,
        member_df[["idx", "age_range", "gender"]],
        left_on="member_idx",
        right_on="idx",
    )

    member_like_df.drop(
        member_like_df[member_like_df["item_type"] == "bean"].index,
        axis=0,
        inplace=True,
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

    age_like_df = member_like_df.pivot_table(
        index=["age_range"], columns=["item_idx"], values="count", aggfunc="sum"
    )
    age_like_df.fillna(0, inplace=True)

    # 좋아요 합계 기준으로 연령대별 추천 원두의 상위 10개를 출력
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
        recom_list = json.loads(recom_list.replace("'", '"'))
        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    except:
        print(age_range)
        print(recom_list)

    return recom_list[:k]


def get_recom_by_gender(gender, matrix, k=5):
    try:
        recom_list = matrix.set_index("gender").loc[gender]["recommendation"]
        recom_list = json.loads(recom_list.replace("'", '"'))
        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    except:
        print(gender)
        print(recom_list)

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
