from sqlalchemy import Column, ForeignKey
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import relationship

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
    kakao_id = Column(Integer)

    likelist = relationship("LikeList", back_populates="member", uselist=True)
    review = relationship("Review", back_populates="member", uselist=True)


class LikeList(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())[1:]

    def values(self):
        return list(self.__dict__.values())[1:]

    __tablename__ = "likelist"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    expired = Column(String(255))
    item_idx = Column(Integer)
    item_type = Column(String(255))
    member_idx = Column(Integer, ForeignKey("member.idx"))

    member = relationship("Member", back_populates="likelist", uselist=False)


class Review(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())[1:]

    def values(self):
        return list(self.__dict__.values())[1:]

    __tablename__ = "review"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    acidity = Column(Integer)
    bitterness = Column(Integer)
    body = Column(Integer)
    coffeeing_note = Column(String(255))
    content = Column(String(255))
    expired = Column(String(255))
    flavor = Column(Integer)
    item_idx = Column(Integer)
    item_type = Column(String(255))
    like = Column(Integer)
    overall = Column(Integer)
    sweetness = Column(Integer)
    member_idx = Column(Integer, ForeignKey("member.idx"))

    member = relationship("Member", back_populates="review", uselist=False)
