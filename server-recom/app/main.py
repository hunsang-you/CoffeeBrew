import os, gc
import os.path as path
import re, math
import json

import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel

URI_PREFIX = "/api"

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
