import os, gc
import os.path as path
import re, math
import json

import numpy as np
import pandas as pd

from .util.logging_time import logging_time

from typing import Union

import uvicorn
from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from .recom import item_recom_cbf, user_recom_cbcf
from .recom import user_recom

from sqlalchemy.orm import Session

from .db.model import Model
from .db.dataloader import DataLoader

from .db.database import engine, SessionLocal, Base

DIR_PATH = path.join(".", "data")

# # FastAPI lifespan
# # FastAPI가 구동될 때 initialization 해야 할 영역을 기술
# # yield 이후에 적히는 구문들은 FastAPI가 종료 될 때 destruction 해야 할 영역을 기술
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Load Data
#     global data
#     data = load_data()
#     print(data)

#     yield
#     recom_data.clear()


Base.metadata.create_all(bind=engine)

# app = FastAPI(lifespan=lifespan)
app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# root endpoint
@app.get("/")
async def root():
    pass
    return {"message": "Hello FastAPI !!"}


# # db connect check
# @app.get("/db-check")
# async def checkDB(db: Session = Depends(get_db)):
#     print("Call - {}...".format(checkDB.__name__))

#     db_check = crud.get_many(db, model.Bean)
#     return db_check


# @app.get("/db-check/{idx}")
# async def checkDBByIdx(idx: Union[int, None] = None, db: Session = Depends(get_db)):
#     print("Call - {}...".format(checkDBByIdx.__name__))
#     print("idx:{}".format(idx))

#     db_check = crud.get_once(db, model.Bean, idx)
#     if db_check is None:
#         raise HTTPException(status_code=404, detail="DB connect check failed")
#     return db_check


# cbf 기반 추천 알고리즘
# 전체 사용자 기준 추천 알고리즘(비회원용)
@app.get("/item/{itemType}")
async def getItemRecom(itemType: Union[str, None] = None):
    print("Call - {}...".format(getItemRecom.__name__))
    print("itemType:{}".format(itemType))

    read_file = "null"
    if itemType == "bean":
        read_file = "like_recom_bean_by_age.csv"
    elif itemType == "capsule":
        read_file = "like_recom_capsule_by_age.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    # 모든 연령대의 사용자(= 모든 사용자) 기준 가장 인기있는 제품을 k개 출력
    result = user_recom.get_recom_by_age("00~00", recom_read, k=8)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# 스테이터스 기반 추천 알고리즘
@app.get("/item/{itemType}/{itemId}")
async def getItemRecom(
    itemType: Union[str, None] = None, itemId: Union[int, None] = None
):
    print("Call - {}...".format(getItemRecom.__name__))
    print("itemId:{}, itemType:{}".format(itemId, itemType))

    read_file = "null"
    if itemType == "bean":
        read_file = "item_recom_bean.csv"
    elif itemType == "capsule":
        read_file = "item_recom_capsule.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    result = item_recom_cbf.get_recom_by_item(itemId, recom_read, k=5)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# 통계 기반 추천 알고리즘
# 사용자 연령대 기반 제품 추천
@app.get("/age/{ageRange}/{itemType}")
async def getAgeRecom(
    ageRange: Union[str, None] = None, itemType: Union[str, None] = None
):
    print("Call - {}...".format(getAgeRecom.__name__))
    print("ageRange:{}, itemType:{}".format(ageRange, itemType))

    read_file = "null"
    if itemType == "bean":
        read_file = "like_recom_bean_by_age.csv"
    elif itemType == "capsule":
        read_file = "like_recom_capsule_by_age.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    result = user_recom.get_recom_by_age(ageRange, recom_read)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# 사용자 성별 기반 제품 추천
@app.get("/gender/{gender}/{itemType}")
async def getGenderRecom(
    gender: Union[str, None] = None, itemType: Union[str, None] = None
):
    print("Call - {}...".format(getGenderRecom.__name__))
    print("gender:{}, itemType:{}".format(gender, itemType))

    read_file = "null"
    if itemType == "bean":
        read_file = "like_recom_bean_by_gender.csv"
    elif itemType == "capsule":
        read_file = "like_recom_capsule_by_gender.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    result = user_recom.get_recom_by_gender(gender, recom_read)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# cf 기반 추천 알고리즘 호출
# 사용자 데이터 기반 제품 추천
@app.get("/user/{userId}/{itemType}")
async def getUserRecom(
    userId: Union[int, None] = None,
    itemType: Union[str, None] = None,
    db: Session = Depends(get_db),
):
    print("Call - {}...".format(getUserRecom.__name__))
    print("userId:{}, itemType:{}".format(userId, itemType))

    if itemType == "bean":
        result = await getUserRecomByLike(userId, itemType, db)
    elif itemType == "capsule":
        result = await getUserRecomByLike(userId, itemType, db)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return result


# 사용자 설문 기반 제품 추천
@app.get("/user/{userId}/{itemType}/survey")
async def getUserRecomBySurvey(
    userId: Union[int, None] = None,
    itemType: Union[str, None] = None,
    db: Session = Depends(get_db),
):
    print("Call - {}...".format(getUserRecomBySurvey.__name__))
    print("userId:{}, itemType:{}".format(userId, itemType))

    data_read = user_recom.load_survey_data(db)

    result = await getUserRecomByLike(userId, itemType)

    if itemType == "bean":
        result = await getUserRecomByLike(userId, itemType)
    elif itemType == "capsule":
        result = await getUserRecomByLike(userId, itemType)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return result


# 사용자 좋아요 기반 제품 추천
@app.get("/user/{userId}/{itemType}/like")
async def getUserRecomByLike(
    userId: Union[int, None] = None,
    itemType: Union[str, None] = None,
    db: Session = Depends(get_db),
):
    print("Call - {}...".format(getUserRecomByLike.__name__))
    print("userId:{}, itemType:{}".format(userId, itemType))

    model = Model()
    loader = DataLoader(db)

    data_read = loader.load_data_by_member_idx(model["LikeList"], userId)

    read_file = "null"
    if itemType == "bean":
        read_file = "user_recom_bean_by_like.csv"
    elif itemType == "capsule":
        read_file = "user_recom_capsule_by_like.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    if not data_read.empty:
        return user_recom.get_recom_by_user(userId, data_read, recom_read, itemType)
    else:
        data_read = loader.load_data_by_member_idx(model["LikeList"], userId % 10)
        return user_recom.get_recom_by_user(
            userId % 10, data_read, recom_read, itemType
        )
        # raise HTTPException(status_code=404, detail="Item not found")


# 사용자 리뷰 기반 제품 추천
@app.get("/user/{userId}/{itemType}/review")
async def getUserRecomByReview(
    userId: Union[int, None] = None,
    itemType: Union[str, None] = None,
    db: Session = Depends(get_db),
):
    print("Call - {}...".format(getUserRecomByReview.__name__))
    print("userId:{}, itemType:{}".format(userId, itemType))

    model = Model()
    loader = DataLoader(db)

    data_read = loader.load_data_by_member_idx(model["Review"], userId)

    read_file = "null"
    if itemType == "bean":
        read_file = "user_recom_bean_by_review.csv"
    elif itemType == "capsule":
        read_file = "user_recom_capsule_by_review.csv"
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    recom_read = pd.read_csv(
        path.join(DIR_PATH, read_file),
        low_memory=False,
        encoding="utf-8",
    )

    if not data_read.empty:
        return user_recom.get_recom_by_user(userId, data_read, recom_read, itemType)
    else:
        data_read = loader.load_data_by_member_idx(model["LikeList"], userId % 10)
        return user_recom.get_recom_by_user(
            userId % 10, data_read, recom_read, itemType
        )
        # raise HTTPException(status_code=404, detail="Item not found")


# 스케줄러에서 추천 데이터 최신화를 요청할 때 호출
@app.get("/update")
async def updateRecom(db: Session = Depends(get_db)):
    print("Call - {}...".format(updateRecom.__name__))

    await updateRecomByItem("bean", db)
    await updateRecomByItem("capsule", db)

    return {"message": "update all recommendations"}


@app.get("/update/{itemType}")
async def updateRecomByItem(
    itemType: Union[str, None] = None, db: Session = Depends(get_db)
):
    print("Call - {}...".format(updateRecomByItem.__name__))
    print("itemType:{}".format(itemType))

    if itemType == "bean":
        item_recom_cbf.calc_recom_bean(db, DIR_PATH)
    elif itemType == "capsule":
        item_recom_cbf.calc_recom_capsule(db, DIR_PATH)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return {"message": "update item-based recommendations"}


@app.get("/update/{itemType}/like")
async def updateRecomByLike(
    itemType: Union[str, None] = None, db: Session = Depends(get_db)
):
    print("Call - {}...".format(updateRecomByLike.__name__))
    print("itemType:{}".format(itemType))

    if itemType == "bean":
        user_recom_cbcf.calc_recom_bean_by_like(db, DIR_PATH)
    elif itemType == "capsule":
        user_recom_cbcf.calc_recom_capsule_by_like(db, DIR_PATH)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return {"message": "update like-based recommendations"}


@app.get("/update/{itemType}/review")
async def updateRecomByReview(
    itemType: Union[str, None] = None, db: Session = Depends(get_db)
):
    print("Call - {}...".format(updateRecomByReview.__name__))
    print("itemType:{}".format(itemType))

    if itemType == "bean":
        user_recom_cbcf.calc_recom_bean_by_review(db, DIR_PATH)
    elif itemType == "capsule":
        user_recom_cbcf.calc_recom_capsule_by_review(db, DIR_PATH)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return {"message": "update review-based recommendations"}


@app.get("/update/{itemType}/age")
async def updateRecomByAge(
    itemType: Union[str, None] = None, db: Session = Depends(get_db)
):
    print("Call - {}...".format(updateRecomByAge.__name__))
    print("itemType:{}".format(itemType))

    if itemType == "bean":
        user_recom.calc_recom_bean_by_age(db, DIR_PATH)
    elif itemType == "capsule":
        user_recom.calc_recom_capsule_by_age(db, DIR_PATH)
    else:
        raise HTTPException(status_code=400, detail="Invalid input value")

    return {"message": "update age-based recommendations"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
