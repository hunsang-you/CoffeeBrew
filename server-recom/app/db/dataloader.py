import sys
import numpy as np
import pandas as pd

from ..util.logging_time import logging_time

from sqlalchemy.orm import Session
from sqlalchemy.orm.decl_api import DeclarativeMeta

from ..db import crud


class DataLoader:
    def __init__(self, db: Session):
        self.db = db

    @logging_time
    def load_data(self, model: DeclarativeMeta):
        db_items = crud.get_all(self.db, model, limit=sys.maxsize - 1)

        if not db_items:
            db_df = pd.DataFrame()
        else:
            db_df = pd.DataFrame(
                data=[user.values() for user in db_items], columns=db_items[0].keys()
            )
            db_df = db_df[list(model.__table__.columns.keys())]

        return db_df

    @logging_time
    def load_data_by_idx(self, model: DeclarativeMeta, idx: int):
        db_item = crud.get_by_idx(self.db, model, idx)

        if not db_item:
            db_df = pd.DataFrame()
        else:
            db_df = pd.DataFrame(data=[db_item.values()], columns=db_item.keys())
            db_df = db_df[list(model.__table__.columns.keys())]

        return db_df

    @logging_time
    def load_data_by_member_idx(self, model: DeclarativeMeta, idx: int):
        db_items = crud.get_many_by_member_idx(
            self.db, model, idx, limit=sys.maxsize - 1
        )

        if not db_items:
            db_df = pd.DataFrame()
        else:
            db_df = pd.DataFrame(
                data=[item.values() for item in db_items], columns=db_items[0].keys()
            )
            db_df = db_df[list(model.__table__.columns.keys())]

        return db_df

    @logging_time
    def load_data_by_item_type(self, model: DeclarativeMeta, type: str):
        db_items = crud.get_many_by_item_type(
            self.db, model, type, limit=sys.maxsize - 1
        )

        if not db_items:
            db_df = pd.DataFrame()
        else:
            db_df = pd.DataFrame(
                data=[item.values() for item in db_items], columns=db_items[0].keys()
            )
            db_df = db_df[list(model.__table__.columns.keys())]

        return db_df
