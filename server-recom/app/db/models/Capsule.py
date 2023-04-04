from sqlalchemy import Column, ForeignKey
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import relationship

from ..database import Base


# capsule
class Capsule(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "capsule"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    name_en = Column(String(255))
    name_ko = Column(String(255))
    summary = Column(String(255))
    thumbnail = Column(String(255))
    user_grade = Column(Integer)

    detail = relationship("Capsule_detail", back_populates="capsule", uselist=False)
    score = relationship("Capsule_score", back_populates="capsule", uselist=False)


# capsule_detail
class Capsule_detail(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "capsule_detail"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    company = Column(String(255))
    description = Column(String(255))
    machine_type = Column(String(255))
    origin = Column(String(255))
    capsule_idx = Column(Integer, ForeignKey("capsule.idx"))

    capsule = relationship("Capsule", back_populates="detail", uselist=False)


# capsule_score
class Capsule_score(Base):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def keys(self):
        return list(self.__dict__.keys())

    def values(self):
        return list(self.__dict__.values())

    __tablename__ = "capsule_score"

    idx = Column(Integer, primary_key=True, index=True)
    created_date = Column(DateTime())
    updated_date = Column(DateTime())
    acidity = Column(Integer)
    balance = Column(Integer)
    bitterness = Column(Integer)
    body = Column(Integer)
    coffeeing_note = Column(String(255))
    flavor = Column(Integer)
    roasting = Column(Integer)
    capsule_idx = Column(Integer, ForeignKey("capsule.idx"))

    capsule = relationship("Capsule", back_populates="score", uselist=False)
