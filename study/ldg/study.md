## 23.03.08

Redux의 state를 변경하고 싶으면 변경하는 법이 따로 있습니다.

1. store.js에 state변경해주는 함수부터 만들고

2. export 해두고

3. 필요할 때 import 해서 쓰면 되는데 dispatch() 로 감싸서 써야합니다.

좀 길고 복잡합니다.

- **저번시간 숙제는**
  
  store.js에 장바구니 데이터 보관한 다음에
  
  Cart.js 적절한 곳에 꽂아넣어보라고 했습니다.
  
  ```jsx
  let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ]
  })
  
  export default configureStore({
    reducer: {
      user : user.reducer,
      cart : cart.reducer
    }
  })
  ```
  
  ▲ state 이렇게 만들어두고
  
  ```jsx
  <tbody>
    {
      state.cart.map((a, i)=>
        <tr key={i}>
          <td>1</td>
          <td>{state.cart[i].name}</td>
          <td>{state.cart[i].count}</td>
          <td>안녕</td>
        </tr>
       )
     }
  </tbody>
  ```
  
  ▲ Cart.js 에선 이렇게 코드짜봤습니다.
  
  let state = useSelector((state)=> state)
  
  당연히 위에서 이렇게 state 부터 가져와야할듯

> store의 state 변경하는 법

큰 그림부터 그려드리면

state 수정해주는 함수부터 store.js에 만들어두고

그걸 컴포넌트에서 원할 때 실행하는 식으로 코드를 짭니다.

버튼누르면 예전에 'kim' 이라고 저장해놓은걸 'john kim' 으로 수정하고 싶으면 어떻게 해야할지 알아봅시다.

정확한 step으로 딱딱 알려드려야 혼자 코드짤 때 편하니까 step을 알려드리면

**1. store.js 안에 state 수정해주는 함수부터 만듭니다.**

```jsx
let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers : {
    changeName(state){
      return 'john ' + state
    }
  }
})
```

slice 안에 reducers : { } 열고 거기 안에 함수 만들면 됩니다.

- 함수 작명 맘대로 합니다.
- 파라미터 하나 작명하면 그건 기존 state가 됩니다.
- return 우측에 새로운 state 입력하면 그걸로 기존 state를 갈아치워줍니다.

이제 changeName() 쓸 때 마다 'kim' -> 'john kim' 이렇게 변할듯

**2. 다른 곳에서 쓰기좋게 export 해둡니다.**

```jsx
export let { changeName } = user.actions
```

이런 코드 store.js 밑에 추가하면 됩니다.

slice이름.actions 라고 적으면 state 변경함수가 전부 그 자리에 출력됩니다.

그걸 변수에 저장했다가 export 하라는 뜻일 뿐임

**3. 원할 때 import 해서 사용합니다. 근데 dispatch() 로 감싸서 써야함**

예를 들어서 Cart.js 에서 버튼같은거 하나 만들고

그 버튼 누르면 state를 'kim' -> 'john kim' 이렇게 변경하고 싶으면

```jsx
(Cart.js)

import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"

(생략)

<button onClick={()=>{
  dispatch(changeName())
}}>버튼임</button>
```

이렇게 코드짜면 됩니다.

- store.js에서 원하는 state변경함수 가져오면 되고
- useDispatch 라는 것도 라이브러리에서 가져옵니다.
- 그리고 dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 진짜로 변경됩니다.

진짜인지 궁금하면 user라는 state 한 번 출력해보십시오.

dispatch로 꼭 감싸야 실행됩니다.

> 그지같고 복잡한데요

store안에 있는 state를 수정하고 싶으면

- state 수정해주는 함수를 store.js에 만들어두고
- 컴포넌트는 그걸 부르기만 하는 식으로 state 수정하게 되어있습니다.

**Q. 왜 이렇게 복잡하고 그지같나요?**

Redux 만든 사람이 정한 문법일 뿐이라 Redux 만든사람에게 뭐라하면 됩니다.

**Q. 컴포넌트에서 state 직접 수정하면 편하지 않나요?**

그럼 당장은 편한데 나중에 프로젝트가 커지면 심각한 단점이 있을 수 있습니다.

![https://codingapple.com/wp-content/uploads/2022/05/캡처3-복사4.png](https://codingapple.com/wp-content/uploads/2022/05/%EC%BA%A1%EC%B2%983-%EB%B3%B5%EC%82%AC4.png)

컴포넌트 100개에서 직접 'kim' 이라는 state 변경하다가

갑자기 'kim'이 123이 되어버리는 버그가 발생하면

범인 찾으려고 컴포넌트 100개를 다 뒤져야합니다.

![https://codingapple.com/wp-content/uploads/2022/05/캡처3-복사5.png](https://codingapple.com/wp-content/uploads/2022/05/%EC%BA%A1%EC%B2%983-%EB%B3%B5%EC%82%AC5.png)

근데 state 수정함수를 store.js에 미리 만들어두고

컴포넌트는 **그거 실행해달라고 부탁만** 하는 식으로 코드를 짜놓으면

'kim'이 123이 되어버리는 버그가 발생했을 때 범인찾기가 수월합니다.

범인은 무조건 store.js에 있으니까요. (수정함수를 잘 만들어놨다면)

아무튼 그런 장점 덕분에 저따구로 코드를 짜는 것일 뿐이고

자신있으면 예습 차원으로

Cart 페이지에 만들어둔 버튼누르면 왼쪽에 있는 수량이 +1 되는 기능을 만들어봅시다.

## 23.03.07

**오늘의 숙제 :**

하단에 있는 데이터를 Redux store 안에 보관해둡시다.

그리고 Cart.js 페이지에 가져와서 데이터바인딩해봅시다.

데이터 갯수에 맞게 표 생성해달라고 반복문쓰는 것도 좋을듯요

**숙제용 장바구니 데이터**

```jsx
[
  {id : 0, name : 'White and Black', count : 2},
  {id : 2, name : 'Grey Yordan', count : 1}
]
```

▲ 유저가 장바구니에 추가한 데이터라고 생각하고

redux store에 보관해두고 가져다가 써봅시다.

array 자료 안에 object 자료가 2개 들어있을 뿐입니다.

object 자료 안엔 상품 1개의 정보가 들어있군요

[collapse]

뭐 배우기 전에 항상 이걸 왜 쓰는지 생각해보는게 중요합니다.

그래야 나중에 "여기서 Redux 쓰는게 맞나요?" 이런 질문 안하고 알아서 코드 잘짬

Redux 라이브러리 왜 쓴다고 했냐면

state를 Redux store에 보관해둘 수 있는데 모든 컴포넌트가 거기 있던 state를 직접 꺼내쓸 수 있어서

**props 없어도 편리하게 state 공유가 가능**하다고 했습니다.

오늘은 Redux store에 state 보관하는 법을 알아봅시다.

> Redux store에 state 보관하는 법

저번시간에 만들어둔 store.js 파일 열어서 이렇게 코드짜면 state 하나 만들 수 있습니다.

step 1. createSlice( ) 로 state 만들고

step 2. configureStore( ) 안에 등록하면 됩니다.

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim'
})

export default configureStore({
  reducer: {
    user : user.reducer
  }
})
```

1. createSlice( ) 상단에서 import 해온 다음에

**{ name : 'state이름', initialState : 'state값' }** 이거 넣으면 state 하나 생성가능합니다.

(createSlice( ) 는 useState( ) 와 용도가 비슷하다고 보면 됩니다)

2. state 등록은 configureStore( ) 안에 하면 됩니다.

**{ 작명 : createSlice만든거.reducer }** 이러면 등록 끝입니다.

여기 등록한 state는 모든 컴포넌트가 자유롭게 사용가능합니다.

> Redux store에 있던 state 가져다쓰는 법

```jsx
(Cart.js)

import { useSelector } from "react-redux"

function Cart(){
  let a = useSelector((state) => { return state } )
  console.log(a)

  return (생략)
}
```

아무 컴포넌트에서 useSelector((state) => { return state } ) 쓰면 store에 있던 모든 state가 그 자리에 남습니다.

변수에 저장해서 진짜로 출력해보십시오.

{ user : 'kim' } 이런거 출력될듯

```jsx
let a = useSelector((state) => state.user )
```

이런 식으로 쓰면 좀 더 편리할 수도 있습니다.

> Redux 편하니까 맨날 쓰면 되겠네요

간단한거 만들 때

컴포넌트가 몇개 없을 때

이럴 땐 그냥 props 쓰는게 더 코드가 짧습니다.

## 23.03.06

/cart로 접속하면 장바구니 페이지를 보여줍시다.

근데 장바구니 기능은 Redux 배울 겸 그걸 이용해서 만들어봅시다.

> 장바구니 페이지만들기

페이지하나 필요하면 어떻게 해야합니까.

라우터 쓰면 되는 것 아니겠습니까 그래서 App.js의 <Routes> 쓰던 곳을 찾아가봅시다.

```jsx
<Route path="/cart" element={ <Cart/> } />
```

그리고 <Route>를 하나 추가했습니다. 누가 /cart 로 접속하면 <Cart> 컴포넌트를 보여주기로 했습니다.

<Cart> 컴포넌트는 알아서 만들어서 저기 넣으면 됩니다.

전 Cart.js 라는 다른 파일에 컴포넌트 만들었음

> 장바구니 페이지에서 사용할 Table 레이아웃은

```jsx
<Table>
  <thead>
    <tr>
      <th>#</th>
      <th>상품명</th>
      <th>수량</th>
      <th>변경하기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>안녕</td>
      <td>안녕</td>
      <td>안녕</td>
    </tr>
  </tbody>
</Table>
```

이거 넣으면 표가 생성됩니다. Cart 컴포넌트에 넣어봤습니다.

물론 React-bootstrap에서 가져온거라 상단에서 import { Table } from 'react-bootstrap' 하면 됩니다.

> Redux 쓰면 뭐가 좋냐면

Redux는 props 없이 state를 공유할 수 있게 도와주는 라이브러리입니다.

![https://codingapple.com/wp-content/uploads/2022/05/캡처.png](https://codingapple.com/wp-content/uploads/2022/05/%EC%BA%A1%EC%B2%98.png)

이거 설치하면 js 파일 하나에 state들을 보관할 수 있는데

그걸 모든 컴포넌트가 직접 꺼내쓸 수 있습니다.

그래서 귀찮은 props 전송이 필요없어집니다.

컴포넌트가 많아질 수록 좋겠군요.

그래서 사이트가 커지면 쓸 수 밖에 없어서

개발자 구인시에도 redux같은 라이브러리 숙련도를 대부분 요구합니다.

> Redux 설치는

```jsx
npm install @reduxjs/toolkit react-redux
```

터미널에 입력하면됩니다.

참고로 redux toolkit이라는 라이브러리를 설치할 건데 redux의 개선버전이라고 보면 됩니다. 문법이 좀 더 쉬워짐

근데 설치하기 전에 package.json 파일을 열어서

"react"

"react-dom"

항목의 버전을 확인합시다.

이거 두개가 18.1.x 이상이면 사용가능합니다.

![https://codingapple.com/wp-content/uploads/2022/05/캡처7.png](https://codingapple.com/wp-content/uploads/2022/05/%EC%BA%A1%EC%B2%987.png)

▲ 그게 아니면 직접 두개를 18.1.0 이렇게 수정한 다음 파일저장하고

터미널에서 npm install 누르면 됩니다. 그럼 이제 redux 설치가능

> Redux 셋팅은

```jsx
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { }
})
```

1. 아무데나 store.js 파일을 만들어서 위 코드를 복붙해줍니다.

저는 src 폴더 안에 만들었음

이게 뭐냐면 아까 말했던 state들을 보관하는 파일입니다.

```jsx
import { Provider } from "react-redux";
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

2. index.js 파일가서 Provider 라는 컴포넌트와 아까 작성한 파일을 import 해옵니다.

그리고 밑에 <Provider store={import해온거}> 이걸로 <App/> 을 감싸면 됩니다.

그럼 이제 <App>과 그 모든 자식컴포넌트들은 store.js에 있던 state를 맘대로 꺼내쓸 수 있습니다.

간편하겠군요 실제 사용은 다음시간에 해봅시다.
