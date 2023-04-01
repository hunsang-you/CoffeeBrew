import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd


def get_recom_by_user(userIdx, data, matrix, item_type="bean"):
    try:
        user_likes = data.loc[
            (data["member_idx"] == 1) & (data["item_type"] == item_type)
        ]
        user_likes = list(user_likes["item_idx"].values)

        recom_list = []
        for temp_list in matrix.set_index("idx").loc[user_likes]["recommendation"]:
            recom_list.extend(json.loads(temp_list.replace("'", '"')))

        recom_list = [dict(t) for t in {tuple(d.items()) for d in recom_list}]
        recom_list = random.sample(recom_list, k=5)

    except:
        print(user_likes)
        print(recom_list)

    return recom_list
