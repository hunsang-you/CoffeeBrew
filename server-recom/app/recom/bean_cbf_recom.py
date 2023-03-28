import os
import os.path as path
import numpy as np
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# 키워드 기반 유사도 측정
def calc_bean_recom_by_keyword(dir_path):
    # 데이터 로드
    print("Log - data load...")
    bean_data = pd.read_csv(path.join(dir_path, "bean_raw_data.csv"), low_memory=False)

    # 결측치 채우기
    bean_data.replace({"decaffeination": "-"}, "F", inplace=True)
    bean_data.replace(
        {
            "aroma": "-",
            "flavor": "-",
            "acidity": "-",
            "sweetness": "-",
            "bitterness": "-",
            "body": "-",
            "balance": "-",
        },
        "5",
        inplace=True,
    )
    bean_data = bean_data.astype(
        {
            "aroma": np.int32,
            "flavor": np.int32,
            "acidity": np.int32,
            "sweetness": np.int32,
            "bitterness": np.int32,
            "body": np.int32,
            "balance": np.int32,
        }
    )

    # TF-IDF 벡터화
    tfidf_vector = TfidfVectorizer()
    tfidf_matrix = tfidf_vector.fit_transform(bean_data["coffeeing_note"]).toarray()
    tfidf_matrix_feature = tfidf_vector.get_feature_names_out()

    print("Log - create cosine similarity matrix...")
    cosine_sim = cosine_similarity(tfidf_matrix)

    df_cosine_sim = pd.DataFrame(
        cosine_sim, index=bean_data.id, columns=bean_data.title, dtype=np.float16
    )

    # 유사도 기준으로 추천 원두의 상위 5개를 출력
    print("Log - recommendation bean...")
    bean_recom = bean_data.copy()[["id", "title"]]
    bean_recom["recommendation"] = bean_recom.apply(
        lambda x: recommendation_list_by_id(x.id, df_cosine_sim, bean_data, k=5), axis=1
    )

    # 파일 저장
    print("Log - save result...")
    os.makedirs(path.join(dir_path, "output"), exist_ok=True)
    bean_recom.to_csv(
        path.join(dir_path, "output", "bean_cbf_recom.csv"), sep=",", index=False
    )


# 스테이터스 기반 유사도 측정
def calc_bean_recom_by_status(dir_path):
    # 데이터 로드
    print("Log - data load...")
    bean_data = pd.read_csv(path.join(dir_path, "bean_raw_data.csv"), low_memory=False)

    # 결측치 채우기
    bean_data.replace({"decaffeination": "-"}, "F", inplace=True)
    bean_data.replace(
        {
            "aroma": "-",
            "flavor": "-",
            "acidity": "-",
            "sweetness": "-",
            "bitterness": "-",
            "body": "-",
            "balance": "-",
        },
        "5",
        inplace=True,
    )
    bean_data = bean_data.astype(
        {
            "aroma": np.int32,
            "flavor": np.int32,
            "acidity": np.int32,
            "sweetness": np.int32,
            "bitterness": np.int32,
            "body": np.int32,
            "balance": np.int32,
        }
    )

    print("Log - create cosine similarity matrix...")
    cosine_sim = cosine_similarity(
        bean_data[
            ["aroma", "flavor", "acidity", "sweetness", "bitterness", "body", "balance"]
        ]
    )

    df_cosine_sim = pd.DataFrame(
        cosine_sim, index=bean_data.id, columns=bean_data.title, dtype=np.float16
    )

    # 유사도 기준으로 추천 원두의 상위 5개를 출력
    print("Log - recommendation bean...")
    bean_recom = bean_data.copy()[["id", "title"]]
    bean_recom["recommendation"] = bean_recom.apply(
        lambda x: recommendation_list_by_id(x.id, df_cosine_sim, bean_data, k=5), axis=1
    )

    # 파일 저장
    print("Log - save result...")
    os.makedirs(path.join(dir_path, "output"), exist_ok=True)
    bean_recom.to_csv(
        path.join(dir_path, "output", "bean_cbf_recom.csv"), sep=",", index=False
    )


# id 기반 추천 알고리즘
def recommendation_list_by_id(target_id, matrix, items, k=10):
    try:
        target_idx = matrix.index.get_indexer([target_id])
        recom_idx = (
            matrix.iloc[:, target_idx]
            .sort_values(by=matrix.iloc[:, target_idx].columns[0], ascending=False)[
                1:11
            ]
            .index
        )

        # 반환한 인덱스 값은 1부터 시작하나, 실제 iloc로 접근하는 인덱스 값은 0부터 시작하므로 이를 보정해야함
        recom_idx = recom_idx - 1
        recom_id = items.iloc[recom_idx, :].id.values
        recom_title = items.iloc[recom_idx, :].title.values

    except:
        print(recom_idx)
        print(recom_id, recom_title)

    recom_list = [dict(id=id, title=title) for id, title in zip(recom_id, recom_title)]

    return recom_list
