

---

---

## 23.03.14

### TCP (흐름제어/혼잡제어)

---

#### 들어가기 전

- TCP 통신이란?
  - 네트워크 통신에서 신뢰적인 연결방식
  - TCP는 기본적으로 unreliable network에서, reliable network를 보장할 수 있도록 하는 프로토콜
  - TCP는 network congestion avoidance algorithm을 사용
- reliable network를 보장한다는 것은 4가지 문제점 존재
  - 손실 : packet이 손실될 수 있는 문제
  - 순서 바뀜 : packet의 순서가 바뀌는 문제
  - Congestion : 네트워크가 혼잡한 문제
  - Overload : receiver가 overload 되는 문제
- 흐름제어/혼잡제어란?
  - 흐름제어 (endsystem 대 endsystem)
    - 송신측과 수신측의 데이터 처리 속도 차이를 해결하기 위한 기법
    - Flow Control은 receiver가 packet을 지나치게 많이 받지 않도록 조절하는 것
    - 기본 개념은 receiver가 sender에게 현재 자신의 상태를 feedback 한다는 점
  - 혼잡제어 : 송신측의 데이터 전달과 네트워크의 데이터 처리 속도 차이를 해결하기 위한 기법
- 전송의 전체 과정
  - Application layer : sender application layer가 socket에 data를 씀.
  - Transport layer : data를 segment에 감싼다. 그리고 network layer에 넘겨줌.
  - 그러면 아랫단에서 어쨋든 receiving node로 전송이 됨. 이 때, sender의 send buffer에 data를 저장하고, receiver는 receive buffer에 data를 저장함.
  - application에서 준비가 되면 이 buffer에 있는 것을 읽기 시작함.
  - 따라서 flow control의 핵심은 이 receiver buffer가 넘치지 않게 하는 것임.
  - 따라서 receiver는 RWND(Receive WiNDow) : receive buffer의 남은 공간을 홍보함

#### 1. 흐름제어 (Flow Control)

- 수신측이 송신측보다 데이터 처리 속도가 빠르면 문제없지만, 송신측의 속도가 빠를 경우 문제가 생긴다.

- 수신측에서 제한된 저장 용량을 초과한 이후에 도착하는 데이터는 손실 될 수 있으며, 만약 손실 된다면 불필요하게 응답과 데이터 전송이 송/수신 측 간에 빈번히 발생한다.

- 이러한 위험을 줄이기 위해 송신 측의 데이터 전송량을 수신측에 따라 조절해야한다.

- 해결방법
  
  - Stop and Wait : 매번 전송한 패킷에 대해 확인 응답을 받아야만 그 다음 패킷을 전송하는 방법
    
    - [![](https://camo.githubusercontent.com/cb7f08015fa52f106d69a4cab2c4ad48129e2b71133e368808c51578c01f5437/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323633423744344535373135454345423332)](https://camo.githubusercontent.com/cb7f08015fa52f106d69a4cab2c4ad48129e2b71133e368808c51578c01f5437/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323633423744344535373135454345423332)
  
  - Sliding Window (Go Back N ARQ)
    
    - 수신측에서 설정한 윈도우 크기만큼 송신측에서 확인응답없이 세그먼트를 전송할 수 있게 하여 데이터 흐름을 동적으로 조절하는 제어기법
    
    - 목적 : 전송은 되었지만, acked를 받지 못한 byte의 숫자를 파악하기 위해 사용하는 protocol
      
      LastByteSent - LastByteAcked <= ReceivecWindowAdvertised
      
      (마지막에 보내진 바이트 - 마지막에 확인된 바이트 <= 남아있는 공간) ==
      
      (현재 공중에 떠있는 패킷 수 <= sliding window)
  
  - 동작방식 : 먼저 윈도우에 포함되는 모든 패킷을 전송하고, 그 패킷들의 전달이 확인되는대로 이 윈도우를 옆으로 옮김으로써 그 다음 패킷들을 전송
    
    - [![](https://camo.githubusercontent.com/3cf70c635be033188c4f4b945b6a873100ea1edc6c6c43304b54d896a5385441/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323533463745343835373135454435463237)](https://camo.githubusercontent.com/3cf70c635be033188c4f4b945b6a873100ea1edc6c6c43304b54d896a5385441/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323533463745343835373135454435463237)
  
  - Window : TCP/IP를 사용하는 모든 호스트들은 송신하기 위한 것과 수신하기 위한 2개의 Window를 가지고 있다. 호스트들은 실제 데이터를 보내기 전에 '3 way handshaking'을 통해 수신 호스트의 receive window size에 자신의 send window size를 맞추게 된다.
  
  - 세부구조
    
    1. 송신 버퍼
       - [![](https://camo.githubusercontent.com/5300c92ecb92341c1da329dc259bc28bfa7dc907928a46fee2090cf1a3cc4aa6/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323235333246343835373135454446323138)](https://camo.githubusercontent.com/5300c92ecb92341c1da329dc259bc28bfa7dc907928a46fee2090cf1a3cc4aa6/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323235333246343835373135454446323138)-
       - 200 이전의 바이트는 이미 전송되었고, 확인응답을 받은 상태
       - 200 ~ 202 바이트는 전송되었으나 확인응답을 받지 못한 상태
       - 203 ~ 211 바이트는 아직 전송이 되지 않은 상태
    2. 수신 윈도우
       - [![](https://camo.githubusercontent.com/44ccd747b75539c822ab51cd4b977db3493cca0b4c7054a98cb7edda4a5ddaf6/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323534303341343835373135454533363242)](https://camo.githubusercontent.com/44ccd747b75539c822ab51cd4b977db3493cca0b4c7054a98cb7edda4a5ddaf6/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323534303341343835373135454533363242)
    3. 송신 윈도우
       - [![](https://camo.githubusercontent.com/7720b92250e9083fce77e1ded3b009873cb992cf49bbe601aa29b9691595eea9/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323532303234344235373135454536413134)](https://camo.githubusercontent.com/7720b92250e9083fce77e1ded3b009873cb992cf49bbe601aa29b9691595eea9/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323532303234344235373135454536413134)
       - 수신 윈도우보다 작거나 같은 크기로 송신 윈도우를 지정하게되면 흐름제어가 가능하다.
    4. 송신 윈도우 이동
       - [![](https://camo.githubusercontent.com/a1ee8c02baf86e6a58b17375d367cd3ad69818cc95b61f8cf44fd53492c850fb/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323237444338353035373135454542413041)](https://camo.githubusercontent.com/a1ee8c02baf86e6a58b17375d367cd3ad69818cc95b61f8cf44fd53492c850fb/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323237444338353035373135454542413041)
       - Before : 203 ~ 204를 전송하면 수신측에서는 확인 응답 203을 보내고, 송신측은 이를 받아 after 상태와 같이 수신 윈도우를 203 ~ 209 범위로 이동
       - after : 205 ~ 209가 전송 가능한 상태
    5. Selected Repeat

#### 2. 혼잡제어 (Congestion Control)

- 송신측의 데이터는 지역망이나 인터넷으로 연결된 대형 네트워크를 통해 전달된다. 만약 한 라우터에 데이터가 몰릴 경우, 자신에게 온 데이터를 모두 처리할 수 없게 된다. 이런 경우 호스트들은 또 다시 재전송을 하게되고 결국 혼잡만 가중시켜 오버플로우나 데이터 손실을 발생시키게 된다. 따라서 이러한 네트워크의 혼잡을 피하기 위해 송신측에서 보내는 데이터의 전송속도를 강제로 줄이게 되는데, 이러한 작업을 혼잡제어라고 한다.
- 또한 네트워크 내에 패킷의 수가 과도하게 증가하는 현상을 혼잡이라 하며, 혼잡 현상을 방지하거나 제거하는 기능을 혼잡제어라고 한다.
- 흐름제어가 송신측과 수신측 사이의 전송속도를 다루는데 반해, 혼잡제어는 호스트와 라우터를 포함한 보다 넓은 관점에서 전송 문제를 다루게 된다.
- 해결 방법
  - [![](https://camo.githubusercontent.com/e5daaf381dd565e77a2827a78e339a708cb239e302354ff75b446f39e0134286/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323536453339343235373135463130313033)](https://camo.githubusercontent.com/e5daaf381dd565e77a2827a78e339a708cb239e302354ff75b446f39e0134286/68747470733a2f2f74312e6461756d63646e2e6e65742f6366696c652f746973746f72792f323536453339343235373135463130313033)
  - AIMD(Additive Increase / Multiplicative Decrease)
    - 처음에 패킷을 하나씩 보내고 이것이 문제없이 도착하면 window 크기(단위 시간 내에 보내는 패킷의 수)를 1씩 증가시켜가며 전송하는 방법
    - 패킷 전송에 실패하거나 일정 시간을 넘으면 패킷의 보내는 속도를 절반으로 줄인다.
    - 공평한 방식으로, 여러 호스트가 한 네트워크를 공유하고 있으면 나중에 진입하는 쪽이 처음에는 불리하지만, 시간이 흐르면 평형상태로 수렴하게 되는 특징이 있다.
    - 문제점은 초기에 네트워크의 높은 대역폭을 사용하지 못하여 오랜 시간이 걸리게 되고, 네트워크가 혼잡해지는 상황을 미리 감지하지 못한다. 즉, 네트워크가 혼잡해지고 나서야 대역폭을 줄이는 방식이다.
  - Slow Start (느린 시작)
    - AIMD 방식이 네트워크의 수용량 주변에서는 효율적으로 작동하지만, 처음에 전송 속도를 올리는데 시간이 오래 걸리는 단점이 존재했다.
    - Slow Start 방식은 AIMD와 마찬가지로 패킷을 하나씩 보내면서 시작하고, 패킷이 문제없이 도착하면 각각의 ACK 패킷마다 window size를 1씩 늘려준다. 즉, 한 주기가 지나면 window size가 2배로 된다.
    - 전송속도는 AIMD에 반해 지수 함수 꼴로 증가한다. 대신에 혼잡 현상이 발생하면 window size를 1로 떨어뜨리게 된다.
    - 처음에는 네트워크의 수용량을 예상할 수 있는 정보가 없지만, 한번 혼잡 현상이 발생하고 나면 네트워크의 수용량을 어느 정도 예상할 수 있다.
    - 그러므로 혼잡 현상이 발생하였던 window size의 절반까지는 이전처럼 지수 함수 꼴로 창 크기를 증가시키고 그 이후부터는 완만하게 1씩 증가시킨다.
  - Fast Retransmit (빠른 재전송)
    - 빠른 재전송은 TCP의 혼잡 조절에 추가된 정책이다.
    - 패킷을 받는 쪽에서 먼저 도착해야할 패킷이 도착하지 않고 다음 패킷이 도착한 경우에도 ACK 패킷을 보내게 된다.
    - 단, 순서대로 잘 도착한 마지막 패킷의 다음 패킷의 순번을 ACK 패킷에 실어서 보내게 되므로, 중간에 하나가 손실되게 되면 송신 측에서는 순번이 중복된 ACK 패킷을 받게 된다. 이것을 감지하는 순간 문제가 되는 순번의 패킷을 재전송 해줄 수 있다.
    - 중복된 순번의 패킷을 3개 받으면 재전송을 하게 된다. 약간 혼잡한 상황이 일어난 것이므로 혼잡을 감지하고 window size를 줄이게 된다.
  - Fast Recovery (빠른 회복)
    - 혼잡한 상태가 되면 window size를 1로 줄이지 않고 반으로 줄이고 선형증가시키는 방법이다. 이 정책까지 적용하면 혼잡 상황을 한번 겪고 나서부터는 순수한 AIMD 방식으로 동작하게 된다.

---

---

## 23.03.13

## [TCP] 3 way handshake & 4 way handshake

> 연결을 성립하고 해제하는 과정을 말한다

### 3 way handshake - 연결 성립

TCP는 정확한 전송을 보장해야 한다. 따라서 통신하기에 앞서, 논리적인 접속을 성립하기 위해 3 way handshake 과정을 진행한다.

[![](https://camo.githubusercontent.com/4acea6af95884347810f057d00c6c4643a56d4a7dbbdf49740745560cd45cc1f/68747470733a2f2f6d656469612e6765656b73666f726765656b732e6f72672f77702d636f6e74656e742f75706c6f6164732f5443502d636f6e6e656374696f6e2d312e706e67)](https://camo.githubusercontent.com/4acea6af95884347810f057d00c6c4643a56d4a7dbbdf49740745560cd45cc1f/68747470733a2f2f6d656469612e6765656b73666f726765656b732e6f72672f77702d636f6e74656e742f75706c6f6164732f5443502d636f6e6e656374696f6e2d312e706e67)

1. 클라이언트가 서버에게 SYN 패킷을 보냄 (sequence : x)

2. 서버가 SYN(x)을 받고, 클라이언트로 받았다는 신호인 ACK와 SYN 패킷을 보냄 (sequence : y, ACK : x + 1)

3. 클라이언트는 서버의 응답은 ACK(x+1)와 SYN(y) 패킷을 받고, ACK(y+1)를 서버로 보냄

이렇게 3번의 통신이 완료되면 연결이 성립된다. (3번이라 3 way handshake인 것)

### 4 way handshake - 연결 해제

연결 성립 후, 모든 통신이 끝났다면 해제해야 한다.

[![](https://camo.githubusercontent.com/8bb8960e46a3bfada6a237a7a91bce75a0a3e0e34eab5c1f5143ca6fe34d0b5f/68747470733a2f2f6d656469612e6765656b73666f726765656b732e6f72672f77702d636f6e74656e742f75706c6f6164732f434e2e706e67)](https://camo.githubusercontent.com/8bb8960e46a3bfada6a237a7a91bce75a0a3e0e34eab5c1f5143ca6fe34d0b5f/68747470733a2f2f6d656469612e6765656b73666f726765656b732e6f72672f77702d636f6e74656e742f75706c6f6164732f434e2e706e67)

1. 클라이언트는 서버에게 연결을 종료한다는 FIN 플래그를 보낸다.

2. 서버는 FIN을 받고, 확인했다는 ACK를 클라이언트에게 보낸다. (이때 모든 데이터를 보내기 위해 CLOSE_WAIT 상태가 된다)

3. 데이터를 모두 보냈다면, 연결이 종료되었다는 FIN 플래그를 클라이언트에게 보낸다.

4. 클라이언트는 FIN을 받고, 확인했다는 ACK를 서버에게 보낸다. (아직 서버로부터 받지 못한 데이터가 있을 수 있으므로 TIME_WAIT을 통해 기다린다.)
- 서버는 ACK를 받은 이후 소켓을 닫는다 (Closed)

- TIME_WAIT 시간이 끝나면 클라이언트도 닫는다 (Closed)

이렇게 4번의 통신이 완료되면 연결이 해제된다.

---

---

## 23.03.10

#### 7계층은 왜 나눌까?

통신이 일어나는 과정을 단계별로 알 수 있고, 특정한 곳에 이상이 생기면 그 단계만 수정할 수 있기 때문이다.

##### 1) 물리(Physical)

> 리피터, 케이블, 허브 등

단지 데이터 전기적인 신호로 변환해서 주고받는 기능을 진행하는 공간

즉, 데이터를 전송하는 역할만 진행한다.

##### 2) 데이터 링크(Data Link)

> 브릿지, 스위치 등

물리 계층으로 송수신되는 정보를 관리하여 안전하게 전달되도록 도와주는 역할

Mac 주소를 통해 통신한다. 프레임에 Mac 주소를 부여하고 에러검출, 재전송, 흐름제어를 진행한다.

##### 3) 네트워크(Network)

> 라우터, IP

데이터를 목적지까지 가장 안전하고 빠르게 전달하는 기능을 담당한다.

라우터를 통해 이동할 경로를 선택하여 IP 주소를 지정하고, 해당 경로에 따라 패킷을 전달해준다.

라우팅, 흐름 제어, 오류 제어, 세그먼테이션 등을 수행한다.

##### 4) 전송(Transport)

> TCP, UDP

TCP와 UDP 프로토콜을 통해 통신을 활성화한다. 포트를 열어두고, 프로그램들이 전송을 할 수 있도록 제공해준다.

- TCP : 신뢰성, 연결지향적

- UDP : 비신뢰성, 비연결성, 실시간

##### 5) 세션(Session)

> API, Socket

데이터가 통신하기 위한 논리적 연결을 담당한다. TCP/IP 세션을 만들고 없애는 책임을 지니고 있다.

##### 6) 표현(Presentation)

> JPEG, MPEG 등

데이터 표현에 대한 독립성을 제공하고 암호화하는 역할을 담당한다.

파일 인코딩, 명령어를 포장, 압축, 암호화한다.

##### 7) 응용(Application)

> HTTP, FTP, DNS 등

최종 목적지로, 응용 프로세스와 직접 관계하여 일반적인 응용 서비스를 수행한다.

사용자 인터페이스, 전자우편, 데이터베이스 관리 등의 서비스를 제공한다



---

---

## 23.03.09

### 변수 만들 때 타입정하기 (타입 실드씌우기)

타입스크립트는 변수만들 때 변수의 타입을 지정가능합니다.

```tsx
let 이름: string = 'kim'
```

**변수명:타입** 이렇게 정하면 됩니다.

방금 여러분은 변수에 실드를 씌운 것입니다.

이제 **이름**이라는 변수는 string 타입이 되며

갑자기 숫자 이런걸 할당하려고 하면 실드로 튕겨냅니다 (에러가 나게 됩니다.)

진짜 시험삼아 숫자 할당해보십시오. 타입 실드가 바로 튕겨내줄걸요

(참고) name이라는 변수명은 전역변수로 사용불가능합니다. 비슷한거 여러개 있음

### 타입은 여러가지가 있습니다.

자주 쓰는 primitive types 들을 소개하자면

string, number, boolean 이런게 있습니다.

```
let 이름 :string = 'kim';
let 나이 :number = 20;
let 결혼했니 :boolean = false;
```

(대문자 String 아닙니다 소문자 string임)

추가로 null, undefined 이런 것도 있습니다.

근데 굳이 사용하진 않습니다.

### array 또는 object 자료 안에도 타입 지정가능

여러 자료를 한 곳에 저장하고 싶을 때 array 또는 object 자료형을 사용합니다.

근데 그 안에 들어갈 자료들도 전부 타입지정이 가능합니다.

```tsx
let 회원들 :string[] = ['kim', 'park']
```

array 자료안에 들어갈 타입은 **타입명[]** 이렇게 지정하면 됩니다.

그럼 array 자료에 각각 string이라는 타입 실드를 장착한 겁니다.

이제 숫자로 수정하려면 실드가 튕겨냅니다. 에러날걸요?

**Q. array 안에 string, number 이런게 동시에 들어갈 땐 타입지정 어떻게 하냐고요?**

그것은 변수명: (string | number)[] 이렇게 하면 되는데 나중에 다뤄보도록 합시다.

```tsx
let 내정보 : { age : number } = { age : 20 }
```

object 자료안에 들어갈 타입은 내가 만들 object와 똑같은 모습으로 지정하면 됩니다.

뭔가 이상해보이지만 **변수명 오른쪽에 오는 것들은 전부 타입지정 문법**입니다.

외우면 이상하지 않습니다.

아무튼 이러면 age 속성에 number 실드를 씌워준 것입니다.

```tsx
let 이름 :string = 'kim';
이름 = 30;
```

타입을 잘 지정해준다면 타입이 실수로 변경될 때 이런 경고성 에러가 납니다.

Type 'number' is not assignable to type 'string'.(2322)

엄격하게 타입을 지켜서 코드짜는걸 도와주는 에러니 앞으로 반겨주면 됩니다.

(물론 이 에러는 ts에서만 나는 에러고 실제 변환된 .js 파일 가보시면 별일 없습니다.)

### 하지만 오늘의 프로 팁은

그렇다고 모든 변수에 타입지정하러 다니면 초보티가 납니다.

숙련자들은 타입을 귀찮게 굳이 적지 않습니다.

왜냐면 변수 생성시 **타입스크립트가 타입을 자동으로 부여해주니까요.**

```tsx
let 이름 = 'kim';
let 나이 = 20;
```

이렇게만 써도 자동으로 이름변수는 string, 나이 변수는 number를 가지고 있습니다.

(변수명에 마우스 올려보면 바로바로 확인가능)

array, object 만들 때도 자동으로 알아서 됩니다. 굳이 복잡하게 타입 명시할 필요 없음

```tsx
let 이름;
이름 = 'kim';
```

심지어 변수만 만들고

나중에 가서 여기에 'kim'을 할당해도 타입이 자동으로 string으로 변합니다.

그래서 간단한 변수들은 타입을 생략하도록 합시다.타입지정하는게 보기좋으시다면 그렇게 하도록 합시다.

팁) 에러메세지는 tsc -w 명령어 실행중인 터미널에 나옵니다.

간결하게 보려면 terminal 탭 옆에 problems 탭에도 나옴

**Q1. 여러분의 이름, 나이, 출생지역을 변수로 각각 저장해봅시다.**

물론 타입도 알아서 지정해보십시오. 이건 쉬우니 답은 없습니다.

```tsx
let 이름 : string = "dogyeom"
let 나이 : number = 30
let 출생 : string = "대전"
```

**Q2. 여러분이 가장 좋아하는 곡과 가수이름을 변수에 object 자료형으로 담아보십시오.**

object 안엔 노래 제목과 가수이름이 들어가면 됩니다.

근데 제목과 가수는 문자만 들어올 수 있어야합니다.

- **전 이렇게 했는데 따라하지 마셈**
  
  ```tsx
  var 좋아하는거 :{ song :string, singer :string } = { song : '사랑하기때문에', singer : '유재하' }
  ```

```tsx
let 좋아하는노래 : { [key : sting] : sting} = { 노래 제목 : "끝", 가수이름 : "권진아" }
```

**Q3. 다음과 같이 생긴 자료의 타입지정을 해보도록 합시다.**

```tsx
let project = {
  member : ['kim', 'park'],
  days : 30,
  started : true,
}
```

project 변수 우측에 적으면 됩니다.

member 안엔 문자로 가득한 array만 들어올 수 있고

days는 숫자, started는 true/false만 들어올 수 있습니다.



---

---

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

---

---

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

 ---

---

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
