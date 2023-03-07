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
