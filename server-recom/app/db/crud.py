from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta


def get_once(db: Session, model: DeclarativeMeta, idx: int):
    return db.query(model).filter(model.idx == idx).first()


def get_many(db: Session, model: DeclarativeMeta, skip: int = 0, limit: int = 100):
    return db.query(model).offset(skip).limit(limit).all()


def get_count(db: Session, model: DeclarativeMeta):
    return db.query(model).count()
