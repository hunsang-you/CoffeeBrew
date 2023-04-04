import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

MYSQL_URL_ENV = "j8b305.p.ssafy.io"
MYSQL_SCHEMA_ENV = "devdb"
MYSQL_USERNAME_ENV = os.getenv("dbUser")
MYSQL_PASSWORD_ENV = os.getenv("dbPwd")

print(MYSQL_URL_ENV, MYSQL_SCHEMA_ENV, MYSQL_USERNAME_ENV)

SQLALCHEMY_DATABASE_URL = (
    "mysql+pymysql://{username}:{password}@{dbUrl}/{schema}?charset=utf8mb4".format(
        username=MYSQL_USERNAME_ENV,
        password=MYSQL_PASSWORD_ENV,
        dbUrl=MYSQL_URL_ENV,
        schema=MYSQL_SCHEMA_ENV,
    )
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
