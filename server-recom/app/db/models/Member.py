from sqlalchemy import Column
from sqlalchemy import Integer, String, DateTime

from ..database import Base


class Member(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())[1:]

    def values(self):
        return list(self.__dict__.values())[1:]

    __tablename__ = "member"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    age_range = Column(String(255))
    expired = Column(String(255))
    gender = Column(String(255))
    hashcode = Column(String(255))
    member_email = Column(String(255))
    nickname = Column(String(255))
    profileImg = Column(String(255))
    role = Column(String(255))
    sns_type = Column(String(255))
