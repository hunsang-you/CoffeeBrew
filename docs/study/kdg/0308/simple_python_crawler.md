# Python을 사용한 간단한 API를 사용한 크롤러 만들기

## 핵심 모듈

```python
import json # json 처리 모듈
import requests # api request를 날리기 위한 모듈
import time # sleep으로 딜레이를 주기 위해 사용
import os.path as fp # isfile로 중간 진행상황을 저장하기 위함
```

## 구현 방법

python은 파일의 읽기, 쓰기에 대한 기본 기능을 지원하고, JSON을 처리하는 기본 모듈이 있다.

따라서 API request 요청을 보내 그 결과를 받아오는 과정을 자동화 하면 간단한 크롤러를 만들 수 있다.

1. 크롤링 해야하는 시퀀스(또는 인덱스)를 준비
2. 준비한 시퀀스를 API 요청 양식에 맞게 보냄
3. API 응답 값 중 필요한 데이터를 추출해 JSON 형태로 가공해 저장

## 주의 사항

API 요청은 서버 쪽에서 제어하므로, 크롤러 같은 같은 봇으로 검출 될 경우 요청을 중단시킬 수 있다.

별다른 처리 없이 데이터를 긁어오면 요청예외가 발생 할 때 프로그램이 멈추고 여태 작업한 결과물이 날라감으로 이를 대비해 중간중간 현재까지 작업한 결과를 저장해주는 코드를 추가로 작성해 주어야 한다.

## 전체 코드

```python
import json
import requests
import time
import os.path as fp

# 다른 종류의 API를 사용해 데이터를 크롤링 할수 있으므로 Path를 변수로 저장
readRandomIdPath = './CQI_get_info/arabica_random_id.json'
stopIndexPath = './CQI_get_info/stopIndex.txt'
saveGradesPath = './CQI_get_info/arabica_random_id_grades.json'

def main():
    # cqi db에서 제공하는 coffee의 random_id를 미리 추출했있으니, 이를 기반으로 값을 가져 올 것
    with open(readRandomIdPath, 'r') as f:
        coffee_values = json.load(f)

    # API요청 특성상, 너무 많은 호출을 시도하면 연결이 끊길 수 있음
    # 이러한 상황을 방지하기 위해서 중간 저장 기능을 구현

    # isfile()로 파일이 있는지 체크하고, 있다면 저장된 grades 값을 load
    if fp.isfile(saveGradesPath):
        with open(saveGradesPath, 'r') as f:
            responses = json.load(f)
    else :
        responses = []

    # isfile()로 파일이 있는지 체크하고, 있다면 저장된 가장 최근 작업한 인덱스 값을 load
    if fp.isfile(stopIndexPath):
        with open(stopIndexPath, 'r') as f:
            lastGetIdx = int(f.readline())
    else :
        lastGetIdx = 0

    idx = lastGetIdx

    # try-finally를 사용해 api request에 예외 발생시 여태까지 크롤링한 결과물을 최근 작업완료한 인덱스와 같이 중간 저장한다.
    try:
        # coffee_values에 인덱스 슬라이스를 통해 가장 최근에 작업이 멈춘 인덱스부터 다시 크롤링 시작
        for coffee in coffee_values[lastGetIdx:]:

            idx += 1

            # request 부하를 방지하기 위한 sleep
            time.sleep(0.2)

            # API POST request
            url = 'https://database.coffeeinstitute.org/api/coffee/grades'
            headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'}
            data = {'coffee': coffee}

            response = requests.post(url, headers=headers, data=data)
            print('no.' + str(idx) + ' | random_id : ' + str(coffee))

            # response된 값 중 data 영역만 저장
            responses.append(response.json()['data'])

    finally:
        with open(stopIndexPath, 'w') as f:
            f.write(str(idx-1))
        with open(saveGradesPath, 'w') as f:
            json.dump(responses, f, indent=2)

if __name__ == '__main__':
    main()
```
