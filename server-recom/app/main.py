import os, gc
import os.path as path
import re, math
import json

from typing import Union

import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel

URI_PREFIX = "/api/recom"

app = FastAPI()


@app.get("/")
async def root():
    pass
    return {"message": "Hello FastAPI !!"}


# cbf 기반 원두 추천 알고리즘 호출
@app.get(URI_PREFIX + "/bean")
async def getBeanInfoAll():
    pass
    return {"message": "call /bean"}


@app.get(URI_PREFIX + "/bean/{beanId}")
async def getBeanRecom(beanId: Union[int, None] = None):
    pass
    return {"message": f"call /bean/{beanId}"}


# cf 기반 추천 알고리즘 호출
@app.get(URI_PREFIX + "/user")
async def getUserInfoAll():
    pass
    return {"message": "call /user"}


@app.get(URI_PREFIX + "/user/{userId}")
async def getUserRecom(userId: Union[int, None] = None):
    pass
    return {"message": f"call /user/{userId}"}


# 스케줄러에서 추천 데이터 최신화를 요청할 때 호출
@app.get(URI_PREFIX + "/update")
async def updateRecom():
    pass
    return {"message": "call /update"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
