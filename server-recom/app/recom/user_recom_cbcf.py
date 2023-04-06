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

from .user_recom import load_user_data, load_like_data, load_review_data
from .item_recom_cbf import load_item_data, recommendation_list_by_id
from ..db import crud
from ..db import model


@logging_time
def calc_recom_bean_by_like(db: Session, save_dir: str):
    member_df = load_user_data(db)
    like_list_df = load_like_data(db)
    bean_data_df = load_item_data(model.Bean, db)

    like_list_df.drop(
        like_list_df[like_list_df["item_type"] == "capsule"].index,
        axis=0,
        inplace=True,
    )

    like_list_df = pd.merge(
        like_list_df,
        bean_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    like_list_df = like_list_df[["item_idx", "member_idx", "name_ko"]]
    like_list_df = like_list_df.pivot(
        index=["item_idx", "name_ko"], columns=["member_idx"], values="member_idx"
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
    print(recom_df.shape)
    recom_df.head()

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
    member_df = load_user_data(db)
    like_list_df = load_like_data(db)
    capsule_data_df = load_item_data(model.Capsule, db)

    like_list_df.drop(
        like_list_df[like_list_df["item_type"] == "bean"].index,
        axis=0,
        inplace=True,
    )

    like_list_df = pd.merge(
        like_list_df,
        capsule_data_df[["idx", "name_ko"]],
        left_on="item_idx",
        right_on="idx",
    )

    like_list_df = like_list_df[["item_idx", "member_idx", "name_ko"]]
    like_list_df = like_list_df.pivot(
        index=["item_idx", "name_ko"], columns=["member_idx"], values="member_idx"
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
    print(recom_df.shape)
    recom_df.head()

    # 파일 저장
    os.makedirs(save_dir, exist_ok=True)
    recom_df.to_csv(
        path.join(save_dir, "user_recom_capsule_by_like.csv"),
        sep=",",
        index=False,
        encoding="utf-8",
    )
