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

URI_PREFIX = "/api"
DIR_PATH = path.join(".", "jupyter", "movie", "kaggle-the-movies-dataset", "output")


def load_movie_recom_data():
    df = pd.DataFrame()

    with open(path.join(DIR_PATH, "pre_movies_cbf_recom.json")) as f:
        df = pd.read_json(f)
        print("recom_data loaded!!")
    return df


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(path.join(DIR_PATH, "pre_movies_cbf_recom.json"))

    # Load Data
    global movie_recom_data
    movie_recom_data = load_movie_recom_data()
    print(movie_recom_data.head())
    yield

    movie_recom_data.clear()


app = FastAPI(lifespan=lifespan)


@app.get(URI_PREFIX + "/movie/recom")
async def get_movie_recom(id: Union[int, None] = None, title: Union[str, None] = None):
    print("id:{}, title:{}".format(id, title))
    print("id_type:{}, title_type:{}".format(type(id), type(title)))

    if id is not None:
        df_out = movie_recom_data.loc[movie_recom_data["id"] == id].to_dict("records")
        return JSONResponse(content=df_out)
    elif title is not None:
        df_out = movie_recom_data.loc[movie_recom_data["title"] == title].to_dict(
            "records"
        )
        return JSONResponse(content=df_out)
    else:
        return dict()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
