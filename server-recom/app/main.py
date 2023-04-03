import os, gc
import os.path as path
import re, math
import json

import numpy as np
import pandas as pd

from typing import Union

import uvicorn
from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from .recom import bean_cbf_recom
from .recom import user_cbcf_recom

from sqlalchemy.orm import Session

from .db import crud
from .db import model

# from .database.model.Bean import Bean, Bean_detail, Bean_score
# from .database.model.Capsule import Capsule, Capsule_detail, Capsule_score
# from .database.model.Member import Member
# from .database.model.Review import Review
# from .database.model.LikeList import LikeList
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


# db connect check
@app.get("/db-check")
async def checkDB(db: Session = Depends(get_db)):
    db_check = crud.get_many(db, model.Bean)
    return db_check


@app.get("/db-check/{idx}")
async def checkDB(idx: Union[int, None] = None, db: Session = Depends(get_db)):
    db_check = crud.get_once(db, model.Bean, idx)
    if db_check is None:
        raise HTTPException(status_code=404, detail="DB connect check failed")
    return db_check


# cbf 기반 원두 추천 알고리즘 호출
@app.get("/bean")
async def getBeanInfoAll():
    pass
    return {"message": "call /bean"}


@app.get("/bean/{beanId}")
async def getBeanRecom(beanId: Union[int, None] = None):
    print("id:{}, type:{}".format(beanId, type(beanId)))

    bean_recom_read = pd.read_csv(
        path.join(DIR_PATH, "output", "bean_cbf_recom.csv"),
        low_memory=False,
        encoding="utf-8",
    )

    result = bean_cbf_recom.get_recom_by_bean(beanId, bean_recom_read)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# cf 기반 추천 알고리즘 호출
@app.get("/user")
async def getUserInfoAll():
    pass
    return {"message": "call /user"}


@app.get("/user/{userId}")
async def getUserRecom(userId: Union[int, None] = None):
    pass
    return {"message": f"call /user/{userId}"}


@app.get("/user/{userId}/like")
async def getUserRecom(userId: Union[int, None] = None):
    print("user_id:{}, type:{}".format(userId, type(userId)))

    like_list_read = pd.read_csv(
        path.join(DIR_PATH, "sql_dummy", "sql_like_list.csv"),
        low_memory=False,
        encoding="cp949",
    )
    like_recom_read = pd.read_csv(
        path.join(DIR_PATH, "output", "bean_cbf_by_like_recom.csv"),
        low_memory=False,
        encoding="utf-8",
    )

    result = user_cbcf_recom.get_recom_by_user(
        userId, like_list_read, like_recom_read, item_type="bean"
    )
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


@app.get("/user/{userId}/review")
async def getUserRecom(userId: Union[int, None] = None):
    print("user_id:{}, type:{}".format(userId, type(userId)))

    review_read = pd.read_csv(
        path.join(DIR_PATH, "sql_dummy", "sql_review.csv"),
        low_memory=False,
        encoding="cp949",
    )
    review_recom_read = pd.read_csv(
        path.join(DIR_PATH, "output", "bean_cbf_by_review_recom.csv"),
        low_memory=False,
        encoding="utf-8",
    )

    result = user_cbcf_recom.get_recom_by_user(
        userId, review_read, review_recom_read, "bean"
    )
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return result


# 스케줄러에서 추천 데이터 최신화를 요청할 때 호출
@app.get("/update")
async def updateRecom():
    pass
    return {"message": "call /update"}


# @app.get("/update/bean")
# async def updateBeanRecom(type: Union[str, None] = "status"):
#     global recom_data

#     if type == "keyword":
#         bean_cbf_recom.calc_bean_recom_by_keyword(DIR_PATH)
#         recom_data = load_bean_recom_data()
#         return {"message": "update keyword-based recommendation list"}
#     else:
#         bean_cbf_recom.calc_bean_recom_by_status(DIR_PATH)
#         recom_data = load_bean_recom_data()
#         return {"message": "update status-based recommendation list"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
