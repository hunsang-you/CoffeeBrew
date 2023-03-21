# 타입스크립트

qodnwk

# 타입스크립트를 배우는 이유?

## 자바스크립트는 타입에 관대하다 !

- 5-’3’ 이렇게 연산해도 알아서 계산해줌
- 타입을 정하지 않았기때문에 엥간한건 알아서 다 변환해준다!
- **코드에 목적을 명시하고 목적에 맞지 않는 타입의 변수나 함수들에서 에러를 발생시켜 버그를 사전에 제거**
- Ts는 js의 상위 확장이다 javascript + type = typescript !
- Ts는 컴파일 단계에서 오류를 포착할 수 있는 장점이 생긴다. 명시적인 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 이씨고, 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅이 쉬워진다.

## 굳이 왜 써야하냐?

1. 코드 천줄 만줄 짜다보면
2. 남이짜던 자바스크립트 수정할 일이 생기면 생각이 달라진다.
3. 에러가 명확해진다. 쌩 자바스크립트는 이거 좀 이상한데요 몰?루 같은 애매한 에러메세지가 많음. → 타입스크립트는 엄격한 타입룰 덕분에 여기는 숫자만써라. 등 자세하게 알려줌

[타입스크립트 초반부강의](https://www.notion.so/5b062523358d49068997d769b3f1b8db)

[4강 . 타입을 미리정하기 애매할때](https://www.notion.so/4-88486162639d4b3ab311ace59cfae11a)

[5강. 함수에 타입 지정하는 법 & void 타입](https://www.notion.so/5-void-20bd3de80fbb497ab83fc7da337b5d18)

[6강 타입 확정하기](https://www.notion.so/6-158272f2c00446a28bf853a598e9d4ac)

[7강 type & readonly](https://www.notion.so/7-type-readonly-41d63e55863a4a1b95040e2be05242c0)

[8강 Literal Types로 만드는 const 변수 유사품](https://www.notion.so/8-Literal-Types-const-ac1c78059d1b4a3c996907910fcec88a)

[9강 함수와 methods에 type alias지정하는법](https://www.notion.so/9-methods-type-alias-bcb083b9295741c5a6bbc1cb6e68e438)

[10강 TS로 HTML 변경과 조작할 때 주의점](https://www.notion.so/10-TS-HTML-235bf8a1b5ab4ba1b832bd19d1aff66b)

[11강 JS문법 Class공부](https://www.notion.so/11-JS-Class-32fb0e8a874c44139d133e8957a03e60)

[12강 JS prototype 문법](https://www.notion.so/12-JS-prototype-8a89fbcb18d445be9725ff282898fa50)

[13강 class 만들 때 타입지정 가능](https://www.notion.so/13-class-73c22ddf0fd949c3991f892e7b2bc144)

# 14강 object에 타입지정하려면 interface

# Type 키워드보다 더 좋은 방법이 있다. interface

→ 더 좋다고 말할수있나?

chat gpt헝님 말씀

먼저, **`interface`**의 특징을 살펴보면 다음과 같습니다.

- **`interface`**는 기본적으로 객체(Object) 타입을 정의하는 데 사용됩니다.
- **`interface`**는 **`extends`** 키워드를 사용하여 다른 인터페이스를 확장할 수 있습니다.
- **`interface`**는 클래스(Class)나 함수(Function)와 같은 것을 직접적으로 정의할 수는 없습니다.

반면에, **`type`**의 특징은 다음과 같습니다.

- **`type`**은 객체(Object) 뿐만 아니라 모든 타입을 정의할 수 있습니다.
- **`type`**은 **`&`**를 사용하여 여러 타입을 결합할 수 있습니다.
- **`type`**은 **`|`**를 사용하여 여러 타입 중 하나를 선택할 수 있습니다.
- **`type`**은 **`as`**를 사용하여 타입 캐스팅을 할 수 있습니다.
- **`type`**은 **`extends`** 키워드를 사용하여 다른 타입을 확장할 수 있습니다.

따라서, 객체 타입을 정의할 때는 **`interface`**를 사용하는 것이 더 적합하고, 다른 타입을 정의할 때는 **`type`**을 사용하는 것이 더 적합합니다. 또한, **`type`**은 여러 타입을 결합하거나 선택할 수 있는 등 **`interface`**보다 더 강력한 기능을 제공하기 때문에, 복잡한 타입을 정의할 때 유용합니다.

하지만, **`interface`**와 **`type`**은 기능적으로 매우 유사하므로 어떤 것을 사용하더라도 큰 차이는 없습니다. 따라서 개인적인 취향이나 프로젝트 규칙에 따라 선택하면 됩니다.

기본적으로 object는 interface 그 외 type쓴다고 생각해도 괜찮을것같다.

## Object에 쓸 수 있는 interface문법

- interface 문법을 쓰면 object의 자료형의 타입을 보다 편리하게 지정가능

```tsx
interface Square {
  color: string;
  width: number;
}

let sq: Square = { color: "red", width: 100 };
```

type alias와 용도와 기능이 똑같다.

1. 대문자로 작명하고
2. {} 안에 타입 명시해야함.
3. 콤마대신 세미콜론도 가능

## interface 장점은 extends도 가능

Student interface & Teacher interface가 필요함

Student 에는 name 속성이 들어가야하고

Teacher는 name ,age 속성이 들어가야한다.

어떻게 만들래?

```tsx
interface Student {
  name: string;
}
interface Teacher extends Student {
  age: number;
}
```

extends 문법은 interface 여기에 복사해달라는 것이다.

## type 키워드와의 차이점

type ailas와 interface는 거의 똑같은 기능을 제공합니다.

차이점은 extends문법이 약간 다르다.

```tsx
interface Animal {
  name: string;
}
interface Cat extends Animal {
  legs: number;
}
```

interface의 경우 일반적으로 이렇게 extends한다.

```tsx
type Animal = {
  name: string;
};
type Cat = Animal & { legs: number };
```

type alias의 경우 extends는 안되고 & 기호를 쓰면 object 두개를 합칠 수 있다.

**사실 interface도 type처럼 &를 이용해 복사가능**

```tsx
interface Student {
  name: string;
}
interface Teacher {
  age: number;
}

let obj: Student & Teacher = { name: "kim", age: 90 };
```

& 사용하는걸 intersection이라고 부름. extends와 유사하게 사용가능

**주의 : extends 쓸 땐 타입끼리 중복속성이 발견될 경우 에러 발생 근데 & 쓰면 때에 따라 아닐 수도 있다.**

## 타입이름 중복선언시

```tsx
interface Animal {
  name: string;
}
interface Animal {
  legs: number;
}
```

interface의 경우 타입이름 중복선언을 허용해주며 extends 한 것이랑 동일하게 작동함.

이러면 Animal타입은 name, legs 속성을 가진다.

**장점 : type 선언을 자주 쓰는 외부 라이브러리 이용시 type 선언을 내가 덮어쓰기 , override하기 편함.**

```tsx
type Animal = {
  name: string;
};
type Animal = {
  legs: number;
};
```

type의 경우 중복선언을 허용하지 않는다. 에러발생

**장점 : 엄격하고 진지함.**

그래서 일반적인 상황에선 type 키워드 자주 활용하면 됨

다른 사람이 내 코드를 이용하는 상황이 많으면 interface로 유연하게 만드는거시 좋다.

그래서 타입스크립트로 작성된 라이브러리들은 interface 타입정해놓은 곳이 많다.

아니면 object 자료형은 전부 interface로만들고 다른 자료형은 type 키워드로 만들고 이런 것도 괜찮다.

둘의 문법을 잘 알고 있으면 기준은 정하기 나름

## extend 할때 object 안의 속성이 중복될 경우

```tsx
interface Animal {
  name: string;
}
interface Dog extends Animal {
  name: number;
}
```

extend할때 속성이 중복됨. 그럼 에러발생

```tsx
interface Animal {
  name: string;
}
interface Dog {
  name: number;
}

let 변수: Dog & Animal = { name: "멍멍" };
```

잉? &연산자도 에러발생함.

(주의) name : string, name : number 라서 에러가 나는 것임. 둘다 name : string 타입이면 &로 합칠땐 에러 안남. extends도 에러 안남,,

## 숙제1 interface 이용해서 간단하게 타입 만들기

```tsx
let 상품 = { brand: "Samsung", serialNumber: 1360, model: ["TV", "phone"] };
```

이런 변수가 있음. interface로 타입지정 해보자!

```tsx
interface Product {
  brand: string;
  serial: number;
  model: string[];
}
let 상품 = { brand: "Samsung", serialNumber: 1360, model: ["TV", "phone"] };
```

so easy~

## 숙제2 array 안에 object 여러개가 필요

```tsx
let 장바구니 = [
  { product: "청소기", price: 7000 },
  { product: "삼다수", price: 800 },
];
```

object들이 들어가는 array 타입지정하기

```tsx
interface Product {
  product: string;
  price: number;
}

let bas: Product[] = [
  { product: "청소기", price: 7000 },
  { product: "삼다수", price: 800 },
];
```

예~~~

## 숙제3 위에서 만든 타입을 extends 해보자.

```tsx
{ product : '청소기', price : 7000, card : false }
```

card 속성이 들어가야함

```tsx
interface Product {
  product: string;
  price: number;
}
interface NewProduct extends Product {
  card: boolean;
}
```

## 숙제4 object 안에 함수를 2개 넣고 싶다.

1. 이 object는 plus()함수를 내부에 가지고 있으며 plus 함수는 파라미터 2개를 입력하면 더해서 return 해줌.
2. 이 ojbect자료는 minus()함수를 내부에 가지고 있으며, minus 함수는 파라미터 2개를 입력하면 빼서 return 해줌

어떻게 만들래?

# 15강 함수 rest파라미터…

## rest 파라미터 개념

- 리액트 때문에 계속되는 자바스크립트 기초학력 저하현상..ㅋㅋㅋㅋㅋㅋㅋㅋ
- 함수에 파라미터가 몇개 들어올지 미리 정의가 불가능한 경우가 있다.
  - 몇개가 들어올지 모른다면 …로 rest 파라미터를 만들어주면된다.

```tsx
function 전부더하기(...a) {
  console.log(a);
}

전부더하기(1, 2, 3, 4, 5);
```

이걸 rest 파라미터라고 한다.

다른 일반 파라미터 뒤에만 올 수 있다.

rest 파라미터자리에 집어넣은 값들은 전부 array안데 담겨있다.

## rest 파라미터 타입지정은

```tsx
function addAll(...a: number[]) {
  console.log(a);
}
```

array에 담기기때문에 타입지정도 array처럼 해주면 된다.

## Spread operator와는 다르다 !

괄호 벗겨주는 …spread는 array, object 자료 왼쪽에 ,

여러개의 파라미터를 의미하는 …rest는 함수선언할 때 소괄호 안에 출몰한다.

## Destructuring 문법 개념설명

JS에서 array,object 안에 있는 데이터를 빼서 변수로 만들고 싶을 때 쓰는 문법

```tsx
let 사람 = { student: true, age: 20 };
let student = 사람.student;
let age = 사람.age;
```

이렇게 쓰면 되는데 귀찮음

그래서 Destructuring 사용해서 변수를 빠르고 쉽게 뺀다.

```tsx
let { student, age } = { student: true, age: 20 };
```

```tsx
let [a, b] = ["안녕", 100];
```

다만 object destructuring 할 땐 변수이름을 속성이름과 맞춰주는게 편리하고

array destructuring할 땐 변수이름 맘대로 작명가능.

## Destructuring 문법도 함수 파라미터에 사용가능

Why ? 함수 파라미터 작명하는 것도 변수만드는 문법과 똑같아서 그렇다.

변수만들 때 기존 object에 있던 자료를 파라미터로 집어넣고 싶으면

```tsx
let person = { student: true, age: 20 };

function 함수(a, b) {
  console.log(a, b);
}
함수(person.student, person.age);
```

이래도 되긴함.

근데 destructuring 문법을 이용하면 더 쉽게 가능.

```tsx
let person = { student: true, age: 20 };

function 함수({ student, age }) {
  console.log(student, age);
}
함수({ student: true, age: 20 });
```

? 더 어려운거같은데..

파라미터 변수만들 때 { student, age} 라고 쓰면

파라미터로 들어오는 student : ~는 student 변수에 저장하고

age 어쩌구는 age 변수에 저장해달라는 말임.

object 자료니깐 변수 작명할 때 object 속성명으로 잘 작명해야한다.

항상 같은 모습의 object, array 자료가 들어올 때 스는 문법이다.

### Q. 위의 함수 파라미터에 타입 지정하기.

```tsx
let person : { student : boolean, age : number} = { student : true, age : 20 }

function 함수({student, age}: {student : boolean,age:number){
  console.log(student, age)
}
함수({ student : true, age : 20 })
```

평소하던거랑 똑같이하면된다.

## 숙제1 숫자 여러개를 입력하면 최댓값을 return 해주는 함수를 만들어보자.

최대갑(6,3,7,2) 이렇게 쓰면 7이 return 되어야한다.

조건 1. 넣을 수 있는 숫자 갯수는 제한없음, 0 이상의 정수만 가능

조건 2. Math.max() 사용금지

```tsx
interface MaxFunc {
  (...params: number[]): number;
}

const maxFunc: MaxFunc = (...parmas) => {
  let maxs = 0;
  parmas.forEach((i) => {
    if (maxs < i) {
      maxs = i;
    }
  });
  return maxs;
};

console.log(maxFunc(1, 2, 3, 4, 5, 6, 76, 44, 33));
```

- 뭐.. 너무 쉬워서 할말이없음..

## 숙제2 object 자료를 파라미터로 입력할 수 있는 함수를 만들자.

```tsx
함수({ user: "kim", comment: [3, 5, 4], admin: false });
```

조건1. 파라미터 destructuring 문법사용

조건2. 함수실행시 입력한 파라미터의 value들 전부 콘솔창에 출력하기

```tsx
interface Work2 {
  user: string;
  comment: number[];
  admin: boolean;
}

const userInfo: Work2 = {
  user: "kim",
  comment: [1, 2, 3],
  admin: false,
};

const func = ({
  user,
  comment,
  admin,
}: {
  user: string;
  comment: number[];
  admin: boolean;
}) => {
  console.log(user);
  console.log(comment);
  console.log(admin);
};

let fff = func(userInfo);
```

난 오브젝트 자료부터 전부 타입지정을 해줬음

답안

```tsx
type UserType = {
  user: string;
  comment: number[];
  admin: boolean;
};

function 함수({ user, comment, admin }: UserType): void {
  console.log(user, comment, admin);
}

함수({ user: "kim", comment: [3, 5, 4], admin: false });
```

틀린부분은없음. 오히려 내 쪽이 좀더 자세하다..?

## 숙제3 array 자료를 파라미터로 입력할 수 있는 함수를 만들자

```tsx
함수([40, "wine", false]);
```

조건1: 파라미터문법사용

조건2: 전부 콘솔창에 출력

---

0308
footer 하단 고정

```
function Main() {
  return (
    <div className='wrapper'>
      <div className='contentWrapper'>
        <Navbar />
        <Banner />
        <Contents/>
      </div>
        <Footer />
    </div>
  )
}

.wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.contentWrapper{
  flex: 1;
}
```

세로로 flex를 써서 위의 content가 나머지 공간을 다 쓰도록
flex: 1 을 써주게 되면 해결 됨.
이때 중요한 건 react에서는 heigit: 100%가 먹지 않으므로
height: 100vh로 해주면 됨.

---

0309

타입스크립트 관련 공부는 안했고
피그마 목업작업 진행함. 네비바디자인이 생각보다 쉽지 않다는걸 깨달음

---

0313

지도를 사용할일이 있어 라이브러리 먼저 조사하였음.
피그마로 만들어도 구현을 못하면 못쓰는 디자인이라 생각해서이다.
react-simple-maps를 좀 알아봤는데 마커쪽 커스텀은 자유로웠지만 지도 자체에 대한
커스텀 자유도는 매우 부족함
원하던 대로 구현하기위해선 직접 지도 데이터를 topjson형태로 만들어야하는데 이 부분이 쉽지않아보임.
대체로 annotation과 marker tooltip을 활용하여 하는 방안에 대해 모색해볼예정

---

0314

아오 지도제대로 깃푸시안됐네
