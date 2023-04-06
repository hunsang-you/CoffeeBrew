from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta


def get_all(db: Session, model: DeclarativeMeta, skip: int = 0, limit: int = 100):
    return db.query(model).offset(skip).limit(limit).all()


def get_by_idx(db: Session, model: DeclarativeMeta, idx: int, skip: int = 0):
    return db.query(model).filter(model.idx == idx).offset(skip).first()


def get_once_by_member_idx(
    db: Session, model: DeclarativeMeta, idx: int, skip: int = 0
):
    return db.query(model).filter(model.member_idx == idx).offset(skip).first()


def get_many_by_member_idx(
    db: Session,
    model: DeclarativeMeta,
    idx: int,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(model).filter(model.member_idx == idx).offset(skip).limit(limit).all()
    )


def get_once_by_item_type(
    db: Session, model: DeclarativeMeta, type: str, skip: int = 0
):
    return db.query(model).filter(model.item_type == type).offset(skip).first()


def get_many_by_item_type(
    db: Session,
    model: DeclarativeMeta,
    type: str,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(model).filter(model.item_type == type).offset(skip).limit(limit).all()
    )


def get_count(db: Session, model: DeclarativeMeta):
    return db.query(model).count()


def get_count_by_member_idx(db: Session, model: DeclarativeMeta, idx: int):
    return db.query(model).filter(model.member_idx == idx).count()
