# DooD(Docker outside of Docker)

## DinD(**Docker in Docker)**

도커 바이너리를 설정하고 컨테이너 내부의 격리된 도커 데몬을 실행하는 작업

⇒ 도커 데몬이 2개 띄워지는 셈

CI측면에서 접근한다면 Task를 수행하는 Agent가 Docker Client와 Docker Daemon역할까지 동시에 하게되어 도커 명령들을 수행하는데 문제가 없어짐

But, 호스트 도커 컨테이너가 privilieged mode로 실행되어야 함

```bash
docker run --privileged --name dind1 -d docker:1.8-dind
```

privilieged 플래그를 사용한다면 호스트 컨테이너가 호스트 머신에서 할 수 있는 거의 모든 작업을 할 수 있게 되는데, 이는 컨테이너 실행시 큰 보안 위험이 발생 할 수 있다.

*[http://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/](http://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)*

*[https://sreeninet.wordpress.com/2016/12/23/docker-in-docker-and-play-with-docker/](https://sreeninet.wordpress.com/2016/12/23/docker-in-docker-and-play-with-docker/)*

## DooD(Docker outside of Docker)

호스트의 docker socket을 에이전트 컨테이너에 볼륨 세팅을 통해 공유하고 호스트의 도커 데몬을 이용해 CI의 도커 명령을 실행

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock ...
```

-v 옵션으로 호스트의 docker.sock(docker socket)을 빌려 사용

소켓통신을 통해 에이전트 컨테이너는 호스트의 daemon에 docker 명령을 전달

DooD는 Docker에서 공식적으로 DinD보다 권장하는 사용법이다.

## DooD 사용시 Permission denied문제

일반적으로 docker.sock을 바인딩 해도 권한이 없음 문제가 발생할 때가 있다.

이는 호스트 도커의의 권한 정보를 확인해보면 무엇이 문제인지 알 수 있다.

```bash
ls -al /run | grep docker
drwx------  8 root  root    180 Feb 21 01:09 docker
-rw-r--r--  1 root  root      4 Feb 21 01:09 docker.pid
srw-rw----  1 root  docker    0 Feb 21 01:01 docker.sock
```

도커를 기본 설정으로 설치하면 **호스트 도커의 docker.sock의 소유자는 root이고 group은 docker**로 잡혀 있다. 

이때 사용할 수 있는 문제 해결법은 크게 3가지가 있다.

추가로, 도커 내부 컨테이너에 bash를 실행시키는 명령어는 다음과 같다.

```bash
# default 사용자 권한으로 실행
docker exec -it [CONTAINER NAME] /bin/bash

# 특정 사용자 권한으로 실행
docker exec -it -u [USER] [CONTAINER NAME] /bin/bash

# root 권한으로 실행
docker exec -it -u root [CONTAINER NAME] /bin/bash

# 빠져나오는 명령어
exit
```

### 1. chmod를 사용한 문제 해결법

해당 문제를 해결하는 가장 쉬운 방법은 chmod로 docker.sock의 접근 권한을 public 하게 풀어주는 것이다.

```bash
sudo chmod 666 /var/run/docker.sock
```

하지만 이렇게 열어두면 서버에 로그인 가능한 모든 계정이 docker.sock에 임의로 접근해 모든 도커 이미지를 실행/삭제/정지 할수 있는 **보안 이슈**가 생긴다.

### 2. chown을 사용한 문제 해결법

이와 다른 방법으로는 chown 명령어로 docker 소켓에 접근할 특정 사용자에게 소유권을 넘겨주는 방법을 사용할 수 도 있다. 

```bash
sudo chown [OWNER] /var/run/docker.sock
```

그러나 해당 방법을 사용할 경우 특정 사용자 개인에게 권한이 귀속되는 문제로 다른 권한을 가진 사용자가 docker.sock에 접근 할 수 없는 문제가 생긴다.

### 3. docker 그룹을 사용한 문제 해결법(권장)

해당 문제를 해결하기 위해선 에이전트 내에서 동작하는 컨테이너의 내부를 살펴볼 필요가 있다. 에이전트 컨테이너 내부에서 docker.sock의 권한을 조회하면 호스트 도커와 조금 다른 결과가 나온다.

```bash
ls -al /run | grep docker
srw-rw----  1 root  499    0 Feb 21 01:01 docker.sock
```

그룹 499로 잡혀있는 에이전트 컨테이너의 docker.sock을 확인할 수 있다.

‘그룹 499는 무엇인가?’ 하면 호스트에서 그룹 정보를 확인해보면 된다.

```bash
cat /etc/group
...
ubuntu:x:1000:
docker:x:499:
...
```

에이전트 컨테이너 내부의 **그룹 499는 호스트 그룹의 docker와 동일한 groupId값**으로, 에이전트 컨테이너 내부의 그룹에는 그룹 499에 대한 그룹이 정의 되어 있지 않기 때문에 컨테이너 내부 docker.sock에서 외부 docker.sock으로 접근할 수 없던 것이다.  

이를 해결하는 방법은 다음과 같다.

1. 에이전트 컨테이너 내부에 docker 그룹을 생성
2. 에이전트 컨테이너 내부의 default user를 docker 그룹에 추가
3. 에이전트 컨테이너 내부의 docker.sock의 소유 그룹을 docker로 변경

```bash
# 관리자 권한으로 에이전트 컨테이너 내부의 bash에 접속
docker exec -it -u root [CONTAINER NAME] /bin/bash

# groupId 499으로 docker 그룹 추가
groupmod -g 499 docker

# usermod로 사용자를 docker group에 추가
usermod -aG docker [USER]

exit
```

추가 1 : 호스트 도커의 디폴트 유저에게도 docker 그룹을 지정하면 docker 명령어를 sudo 없이 사용 가능하다. 

```bash
# 해당 명령어는 호스트에서 실행하는 명령어
usermod -aG docker [USER]
```

추가 2 : 유저 권한 또는 그룹 권한을 수정했을 경우, 바로 적용이 안되고 bash나 shell을 재부팅해야 적용될 수 있으니 ssh연결을 끊고 재접속하면 된다.

### 🔗reference

- **[DinD(docker in docker)와 DooD(docker out of docker)](https://aidanbae.github.io/code/docker/dinddood/)**