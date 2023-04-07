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

from fastapi import HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta

from .item_recom_cbf import load_item_data, recommendation_list_by_id

from ..db.model import Model
from ..db.dataloader import DataLoader


@logging_time
def calc_recom_bean_by_like(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    like_list_df = loader.load_data_by_item_type(model["LikeList"], "bean")
    bean_data_df = loader.load_data(model["Bean"])

    like_list_df = pd.merge(
        like_list_df,
        bean_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    like_list_df = like_list_df[["item_idx", "member_idx", "name_ko"]]
    like_list_df["count"] = 1
    like_list_df = like_list_df.pivot_table(
        index=["item_idx", "name_ko"],
        columns=["member_idx"],
        values="count",
        aggfunc=np.mean,
    )
    like_list_df.fillna(0, inplace=True)

    cosine_sim = cosine_similarity(like_list_df)

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=like_list_df.droplevel(1).index,
        columns=like_list_df.droplevel(0).index,
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
        path.join(save_dir, "user_recom_bean_by_like.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


@logging_time
def calc_recom_capsule_by_like(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    like_list_df = loader.load_data_by_item_type(model["LikeList"], "capsule")
    capsule_data_df = loader.load_data(model["Capsule"])

    like_list_df = pd.merge(
        like_list_df,
        capsule_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    like_list_df = like_list_df[["item_idx", "member_idx", "name_ko"]]
    like_list_df["count"] = 1
    like_list_df = like_list_df.pivot_table(
        index=["item_idx", "name_ko"],
        columns=["member_idx"],
        values="count",
        aggfunc=np.mean,
    )
    like_list_df.fillna(0, inplace=True)

    cosine_sim = cosine_similarity(like_list_df)

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=like_list_df.droplevel(1).index,
        columns=like_list_df.droplevel(0).index,
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
        path.join(save_dir, "user_recom_capsule_by_like.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


@logging_time
def calc_recom_bean_by_review(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    review_df = loader.load_data_by_item_type(model["Review"], "bean")
    bean_data_df = loader.load_data(model["Bean"])

    review_df = pd.merge(
        review_df,
        bean_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    review_df = review_df[["item_idx", "member_idx", "name_ko", "overall"]]
    review_df = review_df.pivot_table(
        index=["item_idx", "name_ko"],
        columns=["member_idx"],
        values="overall",
        aggfunc=np.mean,
    )
    review_df.fillna(0, inplace=True)

    cosine_sim = cosine_similarity(review_df)

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=review_df.droplevel(1).index,
        columns=review_df.droplevel(0).index,
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
        path.join(save_dir, "user_recom_bean_by_review.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )


@logging_time
def calc_recom_capsule_by_review(db: Session, save_dir: str):
    model = Model()
    loader = DataLoader(db)

    review_df = loader.load_data_by_item_type(model["Review"], "capsule")
    capsule_data_df = loader.load_data(model["Capsule"])

    review_df = pd.merge(
        review_df,
        capsule_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    review_df = review_df[["item_idx", "member_idx", "name_ko", "overall"]]
    review_df = review_df.pivot_table(
        index=["item_idx", "name_ko"],
        columns=["member_idx"],
        values="overall",
        aggfunc=np.mean,
    )
    review_df.fillna(0, inplace=True)

    cosine_sim = cosine_similarity(review_df)

    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=review_df.droplevel(1).index,
        columns=review_df.droplevel(0).index,
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
        path.join(save_dir, "user_recom_capsule_by_review.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )
