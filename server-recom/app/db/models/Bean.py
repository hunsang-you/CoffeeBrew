from sqlalchemy import Column, ForeignKey
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import relationship

from ..database import Base


# bean
class Bean(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "bean"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    name_en = Column(String(255))
    name_ko = Column(String(255))
    summary = Column(String(255))
    thumbnail = Column(String(255))
    user_grade = Column(Integer)

    detail = relationship("Bean_detail", back_populates="bean", uselist=False)
    score = relationship("Bean_score", back_populates="bean", uselist=False)


# bean_detail
class Bean_detail(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "bean_detail"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    decaffeination = Column(String(255))
    description = Column(String(1000))
    origin = Column(String(255))
    processing = Column(String(255))
    rank = Column(String(255))
    region = Column(String(255))
    bean_idx = Column(Integer, ForeignKey("bean.idx"))

    bean = relationship("Bean", back_populates="detail", uselist=False)


# bean_score
class Bean_score(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "bean_score"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    acidity = Column(Integer)
    balance = Column(Integer)
    bitterness = Column(Integer)
    body = Column(Integer)
    coffeeing_note = Column(String(255))
    flavor = Column(Integer)
    roasting_point = Column(String(255))
    sweetness = Column(Integer)
    bean_idx = Column(Integer, ForeignKey("bean.idx"))

    bean = relationship("Bean", back_populates="score", uselist=False)
