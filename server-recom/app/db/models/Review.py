from sqlalchemy import Column
from sqlalchemy import Integer, String, DateTime

from ..database import Base


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
    member_idx = Column(Integer)
