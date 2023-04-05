import os
import os.path as path
import json
import random
import numpy as np
import pandas as pd


# 사용자 기반 정보를 기준으로 다른 사용자 정보를 활용해(cf)
# 사용자가 선호, 관심있는 아이템을 누른 다른 사용자가 선호하는 아이템을 추천해줌
def get_recom_by_user(userIdx, data, matrix, itemType="bean"):
    try:
        user_likes = data.loc[
            (data["member_idx"] == userIdx) & (data["item_type"] == itemType)
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
