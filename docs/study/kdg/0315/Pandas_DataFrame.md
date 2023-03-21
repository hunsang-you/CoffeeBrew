# Pandas

## Pandas란?

pandas는 데이터 조작 및 분석을 위한 파이썬 프로그래밍 언어 용으로 작성된 소프트웨어 라이브러리

숫자 테이블과 시계열을 조작하기 위한 데이터 구조와 연산을 제공

## Pandas의 특징

- 통합 인덱싱으로 데이터 조작을 위한 Data Frame 개체
- 메모리 내 데이터 구조 와 다른 파일 형식 간에 데이터를 읽고 쓰는 도구
- 데이터 정렬 및 누락된 데이터의 통합 처리
- 데이터 세트의 재구성 및 피벗
- 레이블 기반 슬라이싱, 멋진 인덱싱 및 대규모 데이터 세트의 하위 집합
- 데이터 구조 열 삽입 및 삭제
- 데이터 세트에 대한 분할-적용-결합 작업을 허용하는 엔진별로 그룹화
- 데이터 세트 병합 및 결합
- 저차원 데이터 구조에서 고차원 데이터로 작업하기 위한 계층적 축 인덱싱
- 시계열 기능: 날짜 범위 생성 및 빈도 변환, 이동 창 통계, 이동 창 선형 회귀, 날짜 이동 및 지연
- 데이터 필터링을 제공

## Pandas 기초적인 사용법 정리

```python
import pandas as pd
# df, test 는 예시 dataframe 이름

# 특정 목록만 출력
df.columns # 칼럼명(필드)목록 출력
df.index # 인덱스(레코드)목록  출력
df.dtypes # 칼럼 타입 출력
df.values # 인덱스를 제외한 나머지 칼럼들의 값
df.칼럼명 # 해당 칼럼 출력
df['칼럼명'] # 칼럼을 출력하는 같은 명령어

# 목록을 리스트타입(list)으로 바꾸기
df.columns.tolist() # 필드명 리스트
df.values.tolist() # 전체 값 리스트(2차원 리스트로 출력)
df.칼럼명.tolist() # 특정 칼럼만 리스트로 출력
df.index.tolist() # 인덱스 -> 리스트로 출력

# (전체 인덱스)날짜 포맷으로 변환하기
df.index.strftime('%Y-%m-%d').tolist()

# 날짜 포맷 데이터
pd.datetime(2023,3,12)

# 날짜 계산하기
pd.datetime(2023,3,12)-pd.DateOffset(90) # 90일전 날짜 계산

# (인덱스)특정 연도조건에 해당하는 항목 출력
df[df.index.year >= 2020]
df[df.index.year == 2020]

# (인덱스) 특정 연도 범위주기
test[pd.datetime(2020,1,1):pd.datetime(2020,1,6)]
test[test.index <= pd.datetime(2020,1,6)]
test.loc[pd.datetime(2020,1,1):pd.datetime(2020,1,6)]

# null(NaN) 값 처리
df.y.fillna('null') # y는 필드이름

# 소수점 반올림
df.yhat.round(2) # yhat은 필드이름

# 데이터 프레임 합치기 (칼럼 복사하기)
data1 = pd.DataFrame({'ds':forecast.ds, 'yhat':forecast.yhat})
data1 = data1.set_index('ds') # 인덱스 셋팅해주기

# 다른방법
new_data = data1.join(data2)
```
