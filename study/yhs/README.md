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
