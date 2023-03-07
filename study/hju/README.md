# 0306

```
// fastapi crud
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://j8b305.p.ssafy.io",
    "https://lj8b305.p.ssafy.io",
    "http://localhost",
    "http://localhost:8080",
]

//get path parameter
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

# 0307

```
//fast api 라우터 사용
from fastapi import APIRouter, FastAPI

app = FastAPI()
invoices_callback_router = APIRouter()

//클래스 모델
class InvoiceEventReceived(BaseModel):
    ok: bool

//router post
@invoices_callback_router.post(
    "{$callback_url}/invoices/{$request.body.id}", response_model=InvoiceEventReceived
)

```

```
//cookie 전달 방법
from fastapi import FastAPI, Response

app = FastAPI()

//post방식
@app.post("/cookie/")
def create_cookie():
//메시지 생성
    content = {"message": "Come to the dark side, we have cookies"}
    response = JSONResponse(content=content)
    //set cookie
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return response

```
