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

# 0313

### Spring builder 패턴

- 빌더 패턴(Builder pattern) 이란 복합 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 패턴입니다.
- 어떠한 인스턴스의 경우에는 특정 인자만으로 생성해야 하는 경우
- 특정인자값을 null값만 전달하는 경우

```
///lombok을 이용한 builder 패턴
Member membe = Member.builder("한재욱")
                    .age("27").hairColor(HairColor.BLACK).build()

```

Builder 패턴의 장점

1. 필요한 데이터만 설정할 수 있음.
2. 유연성을 확보할 수 있음.
3. 가독성을 높일 수 있음.
4. 불변성을 확보할 수 있음.

# 0314

### Spring component-scan

- 빈으로 등록 될 준비를 마친 클래스들을 스캔하여, 빈으로 등록해주는 것이다.
- @Controller, @Service, @Component, @Repository 어노테이션을 붙인
  클래스들이 빈으로 등록 될 준비를 한 것
- 사용방법
  1. xml 파일에 설정
  2. 자바파일안에 설정
