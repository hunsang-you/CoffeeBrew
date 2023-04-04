import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd


def get_recom_by_age(age_range, matrix, k=5):
    try:
        recom_list = matrix.set_index("age_range").loc[age_range]["recommendation"]
        recom_list = json.loads(recom_list.replace("'", '"'))
        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    except:
        print(age_range)
        print(recom_list)

    return recom_list[:k]


def get_recom_by_gender(gender, matrix, k=5):
    try:
        recom_list = matrix.set_index("gender").loc[gender]["recommendation"]
        recom_list = json.loads(recom_list.replace("'", '"'))
        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]

    except:
        print(gender)
        print(recom_list)

    return recom_list[:k]
