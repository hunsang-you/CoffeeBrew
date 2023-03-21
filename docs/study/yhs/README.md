# 03.06

---

```typescript
// 첫 자료는 무조건 string
// 두번째 자료는 무조건 boolean
// let arr :(string|boolean)[] = ['dog', true]
let arr1 :[string, boolean?] = ['dog', true]
// () 가 아닌 [] -> 튜플타입
// tuple안에 옵션표시 가능 // ? -> boolean이 들어와도 되고 아니어도 되고

let arr2 :[string, boolean?, number?] = ['dog', true]
// 단 ? 는 중간에 들어오면 순서가 깨지게 되므로 마지막에만 넣도록함

// rest parameter type 지정시 tuple도 가능
function func1(...x :[number, string]) {
    console.log(x)
}

func1(1,'222')

// 위나 아래나 같지만, 위에는 파라미터가 []안에 전부 담겨옴
function func2(a:number, b:string) {
    console.log([a, b])
}

func2(111, '222')

let arr3 = [1, 2, 3];
let arr4 = [4, 5];
// array를 합칠때 ...spread 연산자를 사용
// 두 arr를 합치고 싶다면? 이 경우 타입 지정은?
// ...number[] => array가 들어오는데 아직 몇개인지 모른다
let arr5 :[number, number, ...number[]] = [4, 5, ...arr3]


// 숙제1
let food :[string, number, boolean] = ['초밥', 22000, true]

// 숙제2
type Arrtype = [string,number, ...boolean[]]
let arr :Arrtype = ['동서녹차', 4000, true, false, true, true, false, true]


// 숙제3
function 함수(...x:[string, boolean, ...(number|string)[]]) {
    console.log(x)
}
함수('a',true,6,3,'1',4)
```

---

# 03.07

###### declare_ambient_module.ts

```typescript
// js에 있는 변수를 ts에서 이용

console.log(a + 1);
// 콘솔창에 동작은 잘되긴 함

// 변수 재정의가 가능한 declare 문법
declare let a; // => 어딘가에 분명 변수 a가 있으니 에러가 나지 않도록함
// 일반 js파일 등에 있던 변수를 쓸 때 에러가 나지 않도록 재정의 하는데 쓰임
// declare로 정의한 내용은 js로 변환되지 않음

// 특히 js로 만든 라이브러리 사용할 때, 변수, 함수같은 걸 declare로 재정의하기도 함

// ts 파일 -> ts파일로 변수를 가져다 쓰고 싶다면
// import { a } from "./23_data2.ts";

// ts의 특징 : 모든 ts 파일은 ambient modle(글로벌모듈)
// 즉 ts 파일끼리는 import export가 없어도 서로 변수 사용 가능

let name = 123; // 타입스크립트 기본파일에 이미 name이 존재

// ts파일을 ambent 모듈이 아니라 로컬 모듈로 만드는법
// ==> import export 하나라도 있으면 자동으로 로컬 모듈로 바뀌게 됨
export {}; // => 현재 로컬모듈

// 갑자기 글로벌 변수를 만들고 싶다면
// declare global {} 안에 적으면 됨
declare global 
{
  type Dog = string;
}
```

###### data.ts

declare_ambient_module.ts파일에서 declare global로 정의한 type -> Dog는 전역으로 사용이 가능해져서 다른 파일에서도 사용 가능

```ts
let animal : Dog = 'puppy'
```

###### declare_ambient_module.js

```javascript
// js에 있는 변수를 ts에서 이용
Object.defineProperty(exports, "__esModule", { value: true });
console.log(a + 1);
// 일반 js파일 등에 있던 변수를 쓸 때 에러가 나지 않도록 재정의 하는데 쓰임
// declare로 정의한 내용은 js로 변환되지 않음
// 특히 js로 만든 라이브러리 사용할 때, 변수, 함수같은 걸 declare로 재정의하기도 함
// ts 파일 -> ts파일로 변수를 가져다 쓰고 싶다면
// import { a } from "./23_data2.ts";
// ts의 특징 : 모든 ts 파일은 ambient modle(글로벌모듈)
// 즉 ts 파일끼리는 import export가 없어도 서로 변수 사용 가능
let name = 123; // 타입스크립트 기본파일에 이미 name이 존재
```

---

# 03.08

###### typescript 사용시 있는 ~~.d.ts파일에 대해 정리

###### test.d.ts

```typescript
// 파일이름.d.ts
// - 타입 정의 보관용 파일(자바스크립트로 컴파일되지 않음)
// - 다른 ts파일에서 import 가능
// ts파일에 타입정의가 너무 길면 d.ts파일 만들기도 함
// 프로젝트에서 사용하는 타입을 쭉 정리해놓을 레퍼런스용으로 사용
// tsconfig -> "declaration": true => ts파일마다 d.ts파일 자동생성 옵션

// import / export 할 것이 많으면 namespace를 사용하거나 import * as ~~ 로 사용

// export type Age = number;
// export interface Person { name : string }
type Age = number;
interface Person { name : string }
```

###### index.ts

```typescript
// import { Age } from './types/common/23_test';
// import * from './23_test.d'

// index.d.ts.는 수정x
// 기본적으로 d.ts는 글로벌 모듈이 아니다(타입들에 export를 해야한다)
// 그래서 d.ts파일을 글로벌 모듈로 만드는 법
// tsconfig -> "typeRoots": ["./폴더명"] => 여기있는 타입들은 글로벌하게 이용가능

let age: Age = 20;
let age2: Age = 30;
let person : string = '홍길동';
type Age2 = number;

// 외부라이브러리 쓸 때 타입정의가 안되어 있다면
// $().append() => 동작은 잘될지 몰라도 에러가 발생

// 즉 j.query의 타입정의를 알아서 해주어야 함
// Definitely Typed github repository에서 원하는 타입.d.ts 확인
// 혹은 타입스크립트 공식홈페이지에서 검색(jquery)
// npm 설치시엔 대부분 타입도 들어옴
// npm i @types/jquery
// node_modules/@types 폴더에 있는 타입들은 글로벌 모듈
// tsconfig의 typeRoots를 따로 설정해놓으면 자동으로 @types를 포함하지 않음
// 그러므로 typeRoots에 @types를 추가하거나 typeRoots 자체를 다 지운다
$().append()
```

###### tsconfing.json

```typescript
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "strictNullChecks": true,
        "declaration": true,
        // "typeRoots": ["./types/common"], // 해당폴더에 d.ts파

    },

}
```

---

# 03.09

```typescript
// interface는 object 타입 지정할 때 사용하는 것
// 다른 용도로는 class타입을 확인하고 싶을 때도 interface 문법을 사용할 수 있다
// (implements 키워드도 필요함)


class Car1 {
    model : string;
    price : number = 1000;
    constructor(a :string) {
        this.model = a
    }
}

let myCar = new Car1('morning');
// Car1이라는 class를 사용한 object들은 model과 price 속성을 가지게 됨
// class가 model, price 속성을 가지고 있는지 타입으로 확인하고 싶으면?
// interface + implements 키워드로 확인
```

```typescript
interface CarType {
    model : string,
    price : number
}

class Car2 implements CarType {
    model : string;
    price : number = 1000;
    constructor(a :string) {
        this.model = a
    }
}

let myCar2 = new Car2('morning');

// class (클래스명) implements (interface명)
// ==> 이 class가 interface에 있는 속성을 다 들고 있는지에 대해 확인 가능
// 빠진게 있다면 에러
// class에 타입을 할당하고 변형시키는 것이 아닌, 확인만 하는 기능

class Car3 implements CarType {
    model;  // => any 타입
    tax (a) {   // a 파라미터 == any
        return a * 0.1
    }
}

// Car3의 경우, model이 string이 반영되는 것이 아닌, any 타입
// implement는 class의 타입을 체크하는 용도일 뿐, 할당하는게 아님을 꼭 명심
```

---

# 03.10

피그마 작업

---

# 03.14

#### object index signatures



object자료에 타입을 만들어 주고 싶은데

어떤 속성이 들어올지 모르거, 혹은 타입지정할 속성이 너무 많을때

index signatures 사용

```typescript
interface StringOnly {
  [key: string]: string
}

let obj :StringOnly = {
  name : 'kim',
  age : '20',
  location : 'seoul'
}
```

stringOnly라는 interface 생성

타입을 적을 때 `[key : string] : string` 이라고 적은 것은

###### 모든 string으로 들어오는 key값에 할당되는 value는 string이어야 한다

라는 것, 즉 ` {모든속성 : string}`



```typescript
interface StringOnly {
  age : number,
  [key: string]: string,
}

interface StringOnly {
  age : string,  ///가능  
  [key: string]: string,
}
```

모든속성 : string이어야 하므로 age:number는 오류를 발생시킴



##### **Recursive Index Signatures**

```typescript
let obj = {
  'font-size' : {
    'font-size' : {
      'font-size' : 14
    }
  }
}
```

중첩된 Object들을 한 번에 타입지정하려면?



```typescript
interface MyType {
  'font-size' : {
    'font-size' : {
      'font-size' : number
    }

  }
}
```



```typescript
interface MyType {
  'font-size': MyType | number
}


let obj :MyType = {
  'font-size' : {
    'font-size' : {
      'font-size' : 14
    }
  }
}
```

두 가지 사용 가능
