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

#0317

### Spring boot application properties

- 중요한 설정 key값들은 환경 변수로 빼서 저장 <br>

```
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${datasource}/${schema}?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: ${dbUser}
    password: ${dbPwd}
    hikari:
      connection-timeout: 10000000
      validation-timeout: 10000000
      max-lifetime: 580000000
  jpa:
    properties:
      hibernate:
        globally_quoted_identifiers: 'true'
    hibernate:
      ddl-auto: update
      use-new-id-generator-mappings: true
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    generate-ddl: true
  devtools:
    restart:
      enabled: false
  jackson:
    property-naming-strategy: LOWER_CAMEL_CASE
  main:
    allow-circular-references: true
  web:
    resources:
      add-mappings: false
```

### Kakao Oauth설정

```
spring:
      security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: ${rest_api_key}
            client-secret: ${client_secret_key}
            redirect-uri: http://localhost:8080/login/oauth2/code/kakao
            authorization-grant-type: authorization_code
            client-authentication-method: POST
            client-name: Kakao
            scope:
              - profile_nickname
              - profile_image
              - account_email
              - gender
              - age_range
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id

```
