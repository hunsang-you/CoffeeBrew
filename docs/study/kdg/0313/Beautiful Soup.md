# Beautiful Soup

# Beautiful Soup란?

BeautifulSoup는 HTML과 XML 파일에서 데이터를 추출하기 위한 파이썬 라이브러리

다양한 파서(parser)를 사용하여 웹 크롤링과 스크래퍼 개발에 유용

## Beautiful Soup의 핵심 기능

- 태그, 속성 및 텍스트를 검색하는 기능
- 파싱 오류를 처리하는 기능
- HTML 및 XML에서 데이터를 추출하는 기능
- 정규식을 사용하여 데이터를 검색하는 기능

## 설치 방법

터미널 또는 명령 프롬프트에서 `pip`를 사용하여 설치

```bash
pip install beautifulsoup4

```

파이썬 코드에 임포트 하는 예시는 다음

```python
from bs4 import BeautifulSoup
```

## 간단한 사용 예시

```python
from bs4 import BeautifulSoup
import requests

url = '<https://www.example.com>'
response = requests.get(url)
html = response.content

soup = BeautifulSoup(html, 'html.parser')

# 태그 검색
title = soup.find('title')
print(title.text)

# 속성 검색
link = soup.find('a')
print(link['href'])

# 텍스트 검색
div = soup.find('div', {'class': 'example'})
print(div.text)

```

# 객체의 종류

## 태그

Tag 객체는 원래 문서의 XML 태그 또는 HTML 태그에 상응

```python
soup = BeautifulSoup('<b class="boldest">Extremely bold</b>')
tag = soup.b
type(tag)
# <class 'bs4.element.Tag'>
```

### 이름

태그마다 이름이 있고, 다음과 같이 .name으로 접근

```python
tag.name
# u'b'
```

태그의 이름을 바꾸면, 그 변화는 뷰티블수프가 생산한 HTML 트리에 적용

```python
tag.name = "blockquote"
tag
# <blockquote class="boldest">Extremely bold</blockquote>
```

### 속성

`<b class="boldest">` ← 태그는 속성 “class”, 값은 “boldest”

```python
tag['class']
# u'boldest'
```

다음과 같이 .attrs를 사용해 바로 접근

```python
tag.attrs
# {u'class': u'boldest'}
```

태그의 속성을 추가, 제거, 변경 또한 가능. 또한 딕셔너리로 처리

```python
tag['class'] = 'verybold'
tag['id'] = 1
tag
# <blockquote class="verybold" id="1">Extremely bold</blockquote>

del tag['class']
del tag['id']
tag
# <blockquote>Extremely bold</blockquote>

tag['class']
# KeyError: 'class'
print(tag.get('class'))
# None
```

### 값이 여러 개인 속성

bs에선 복수 속성을 리스트로 나타냄(class, title, style 같은 거)

```python
css_soup = BeautifulSoup('<p class="body strikeout"></p>')
css_soup.p['class']
# ["body", "strikeout"]

css_soup = BeautifulSoup('<p class="body"></p>')
css_soup.p['class']
# ["body"]
```

HTML 표준에 정의된 복수 속성이 아니라면, 속성이 하나 이상의 값이 있는 것처럼 보여도 bs에서는 인식하지 못함

```python
id_soup = BeautifulSoup('<p id="my id"></p>')
id_soup.p['id']
# 'my id'
```

태그의 내용을 리스트로 값을 수정하면 복수 속성은 합쳐져서 표시됨

```python
rel_soup = BeautifulSoup('<p>Back to the <a rel="index">homepage</a></p>')
rel_soup.a['rel']
# ['index']
rel_soup.a['rel'] = ['index', 'contents']
print(rel_soup.p)
# <p>Back to the <a rel="index contents">homepage</a></p>
```

문서를 XML로 해석하면, 복수 속성은 없음

```python
xml_soup = BeautifulSoup('<p class="body strikeout"></p>', 'xml')
xml_soup.p['class']
# u'body strikeout'
```

## NavigableString

bs는 NavigableString라는 클래스 안에다 텍스트를 보관

```python
tag.string
# u'Extremely bold'
type(tag.string)
# <class 'bs4.element.NavigableString'>
```

NavigableString은 파이썬의 유니코드 문자열과 똑같으나, 트리 네비게이트와 트리 탐색을 지원 

NavigableString을 유니코드 문자열로 변환하려면 unicode()를 사용

```python
unicode_string = unicode(tag.string)
unicode_string
# u'Extremely bold'
type(unicode_string)
# <type 'unicode'>
```

문자열을 직접 편집 할 수 없으나, replace_with() 사용해 문자열을 치환할 수 있음

```python
tag.string.replace_with("No longer bold")
tag
# <blockquote>No longer bold</blockquote>
```

## BeautifulSoup 객체

BeautifulSoup 객체 자신은 문서 전체를 대표 (bs의 트리의 루트에 해당)

BeautifulSoup 객체는 실제 HTML 태그나 XML 태그와 일치하지 않기에 이름도 속성도 없음

그러나 .name에 “[document]”라는 이름이 주어짐

```python
soup.name
# u'[document]'
```

## 트리 네비게이트

```python
html_doc = """
<html><head><title>The Dormouse's story</title></head>

<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""

from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc)
```

## 내려가기

태그 안에는 또 다른 태그가 담길 수 있고 이런 요소들은 자손(children) 태그라 부름

bs는 한 태그의 자손을 항해하고 반복하기 위한 속성을 다양하게 제공

가장 단순하게 해석 트리에서 태그를 가져오는 방법은 원하는 태그의 이름을 지정하는 것

<head> 태그를 원한다면, 그냥 soup.head라고 지정

```python
soup.head
# <head><title>The Dormouse's story</title></head>

soup.title
# <title>The Dormouse's story</title>
```

이 방법을 반복해 사용하면 해석 트리의 특정 부분을 더 깊게 접근할 수 있음

아래는 <body> 태그 안의 첫 번째 <b> 태그를 얻음

태그 이름을 속성으로 사용할 때 첫번째 자식 태그만 가져옴을 유의

```python
soup.body.b
# <b>The Dormouse's story</b>

soup.a
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>
```

<a> 태그를 모두 얻거나, 특정 이름으로 다른 태그를 가져오려면 `find_all()`이나 `select()`를 활용

```python
soup.find_all('a')
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

soup.select('#link2')
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>
```

### .contents와 .children

태그의 모든 자손은 .contents를 통해 리스트 형태로 모두 부름

```python
head_tag = soup.head
head_tag
# <head><title>The Dormouse's story</title></head>

head_tag.contents
[<title>The Dormouse's story</title>]

title_tag = head_tag.contents[0]
title_tag
# <title>The Dormouse's story</title>
title_tag.contents
# [u'The Dormouse's story']
```

### .string

태그 자손이 하나뿐이고, NavigableString이라면, 그 자손은 .string으로 얻을 수 있음

```python
title_tag.string
# u'The Dormouse's story'
```

태그에 자손이 하나 보다 많다면 .string이 무엇을 가리킬지 확실하지 않아 None으로 정의

```python
print(soup.html.string)
# None
```

## 올라가기

### .parent

한 요소의 부모는 .parent 속성으로 접근

```python
title_tag = soup.title
title_tag
# <title>The Dormouse's story</title>
title_tag.parent
# <head><title>The Dormouse's story</title></head>
```

### .parents

.parents로 한 태그의 부모들을 모두 다 반복할 수 있음. 문서의 최상단까지 순회

```python
link = soup.a
link
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>
for parent in link.parents:
    if parent is None:
        print(parent)
    else:
        print(parent.name)
# p
# body
# html
# [document]
# None
```

## 옆으로 가기

### .next_sibling와 .previous_sibling

.next_sibling과 .previous_sibling를 사용해 해석 트리에서 같은 수준에 있는 페이지 요소들 탐색

```python
sibling_soup.b.next_sibling
# <c>text2</c>

sibling_soup.c.previous_sibling
# <b>text1</b>
```

### .next_siblings과 .previous_siblings

태그의 복수개의 형제들은 .next_siblings이나 .previous_siblings로 반복할 수 있음

```python
for sibling in soup.a.next_siblings:
    print(repr(sibling))
# u',\n'
# <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>
# u' and\n'
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
# u'; and they lived at the bottom of a well.'
# None

for sibling in soup.find(id="link3").previous_siblings:
    print(repr(sibling))
# ' and\n'
# <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>
# u',\n'
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>
# u'Once upon a time there were three little sisters; and their names were\n'
# None
```

## 앞뒤로 가기

### .next_element와 .previous_element

문자열이나 태그의 .next_element 속성은 바로 다음 있는것을 탐색 

### .next_sibling과 .next_element의 차이

> `.next_sibling` : 태그의 형제 태그로 넘어감
`.next_element` :  이용하면 태그의 자손 태그로 넘어갔다가 자손 태그가 없으면 형제 태그로 넘어감. 그리고 태그의 끝을 알리는 `</>`태그는 뛰어넘음
> 

```python
last_a_tag.next_element
# u'Tillie'

last_a_tag.previous_element
# u' and\n'
last_a_tag.previous_element.next_element
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
```

### .next_elements과 .previous_elements

```python
for element in last_a_tag.next_elements:
    print(repr(element))
# u'Tillie'
# u';\nand they lived at the bottom of a well.'
# u'\n\n'
# <p class="story">...</p>
# u'...'
# u'\n'
# None
```