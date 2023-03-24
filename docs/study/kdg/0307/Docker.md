# Docker

## Docker Architecture

![Docker Architecture](../img/docker_architecture.svg)

Docker Architecture

도커는 내부적으로 Client-Server 구조를 가지며, Docker daemon이라 불리는 데몬을 실행하여 Docker Containers와 관련된 모든 요청(빌드, 실행. 배포)을 처리한다.

도커의 기본 CLI 클라이언트는 UNIX Socket(default) 또는 네트워크 인터페이스(http)를 통해 도커 데몬으로 REST요청을 보내게 된다.

### **도커 데몬**

Docker 데몬( `dockerd`)은 Docker API 요청을 수신하고 이미지, 컨테이너, 네트워크 및 볼륨과 같은 Docker 객체를 관리합니다. 데몬은 다른 데몬과 통신하여 Docker 서비스를 관리할 수도 있습니다.

### **도커 클라이언트**

Docker 클라이언트( `docker`)는 많은 Docker 사용자가 Docker와 상호 작용하는 기본 방법입니다. 와 같은 명령을 사용하면 `docker run`클라이언트는 이러한 명령을 로 전송하여 `dockerd`수행합니다. 이 `docker`명령은 Docker API를 사용합니다. Docker 클라이언트는 둘 이상의 데몬과 통신할 수 있습니다.

### **도커 데스크톱**

Docker Desktop은 Mac, Windows 또는 Linux 환경을 위한 설치하기 쉬운 애플리케이션으로 컨테이너화된 애플리케이션 및 마이크로서비스를 구축하고 공유할 수 있습니다. Docker Desktop에는 Docker 데몬( `dockerd`), Docker 클라이언트( `docker`), Docker Compose, Docker Content Trust, Kubernetes 및 Credential Helper가 포함됩니다. 자세한 내용은 [도커 데스크탑 을](https://docs.docker.com/desktop/) 참조하십시오 .

### **도커 레지스트리**

Docker *레지스트리는* Docker 이미지를 저장합니다. Docker Hub는 누구나 사용할 수 있는 공개 레지스트리이며 Docker는 기본적으로 Docker Hub에서 이미지를 찾도록 구성되어 있습니다. 개인 레지스트리를 실행할 수도 있습니다.

`docker pull`또는 명령을 사용하면 `docker run`구성된 레지스트리에서 필수 이미지를 가져옵니다. 명령 을 사용하면 `docker push`이미지가 구성된 레지스트리로 푸시됩니다.

### **도커 개체**

Docker를 사용하면 이미지, 컨테이너, 네트워크, 볼륨, 플러그인 및 기타 개체를 만들고 사용하게 됩니다. 이 섹션은 이러한 개체 중 일부에 대한 간략한 개요입니다.

### **이미지**

이미지 *는* Docker 컨테이너 생성 지침이 포함된 읽기 전용 템플릿입니다. 종종 이미지는 일부 추가 사용자 지정과 함께 다른 이미지를 *기반으로 합니다* . 예를 들어 이미지를 기반으로 하는 이미지를 빌드할 수 `ubuntu` 있지만 Apache 웹 서버와 애플리케이션은 물론 애플리케이션을 실행하는 데 필요한 구성 세부 정보도 설치합니다.

자신의 이미지를 만들 수도 있고 다른 사람이 만들고 레지스트리에 게시한 이미지만 사용할 수도 있습니다. 고유한 이미지를 빌드하려면 이미지를 만들고 실행하는 데 필요한 단계를 정의하는 간단한 구문으로 *Dockerfile* 을 만듭니다 . Dockerfile의 각 명령어는 이미지에 레이어를 만듭니다. Dockerfile을 변경하고 이미지를 다시 빌드하면 변경된 레이어만 다시 빌드됩니다. 이것은 다른 가상화 기술과 비교할 때 이미지를 매우 가볍고 작고 빠르게 만드는 이유의 일부입니다.

### **컨테이너**

컨테이너는 이미지의 실행 가능한 인스턴스입니다. Docker API 또는 CLI를 사용하여 컨테이너를 생성, 시작, 중지, 이동 또는 삭제할 수 있습니다. 컨테이너를 하나 이상의 네트워크에 연결하거나 스토리지를 연결하거나 현재 상태를 기반으로 새 이미지를 생성할 수도 있습니다.

기본적으로 컨테이너는 다른 컨테이너 및 해당 호스트 시스템과 비교적 잘 격리되어 있습니다. 컨테이너의 네트워크, 스토리지 또는 기타 기본 하위 시스템이 다른 컨테이너 또는 호스트 시스템에서 얼마나 격리되는지 제어할 수 있습니다.

컨테이너는 생성하거나 시작할 때 제공하는 구성 옵션과 이미지로 정의됩니다. 컨테이너가 제거되면 영구 저장소에 저장되지 않은 상태 변경 사항이 모두 사라집니다.

### **예제 `docker run`명령**

다음 명령은 `ubuntu`컨테이너를 실행하고 로컬 명령줄 세션에 대화형으로 연결한 다음 실행합니다 `/bin/bash`.

`$ docker run -i -t ubuntu /bin/bash`

이 명령을 실행하면 다음이 발생합니다(기본 레지스트리 구성을 사용한다고 가정).

1. 이미지가 로컬에 없는 경우 `ubuntu`Docker는 마치 수동으로 실행한 것처럼 구성된 레지스트리에서 이미지를 가져옵니다 `docker pull ubuntu`.
2. Docker는 마치 수동으로 명령을 실행한 것처럼 새 컨테이너를 생성합니다 `docker container create` .
3. Docker는 읽기-쓰기 파일 시스템을 최종 계층으로 컨테이너에 할당합니다. 이를 통해 실행 중인 컨테이너는 로컬 파일 시스템에서 파일 및 디렉터리를 생성하거나 수정할 수 있습니다.
4. 네트워킹 옵션을 지정하지 않았으므로 Docker는 컨테이너를 기본 네트워크에 연결하는 네트워크 인터페이스를 생성합니다. 여기에는 컨테이너에 IP 주소를 할당하는 것이 포함됩니다. 기본적으로 컨테이너는 호스트 시스템의 네트워크 연결을 사용하여 외부 네트워크에 연결할 수 있습니다.
5. Docker는 컨테이너를 시작하고 `/bin/bash`. `i`컨테이너가 대화식으로 실행되고 터미널에 연결되기 때문에( 및 플래그 로 인해 `t` ) 출력이 터미널에 기록되는 동안 키보드를 사용하여 입력을 제공할 수 있습니다.
6. `exit`명령을 종료하기 위해 입력하면 `/bin/bash`컨테이너가 중지되지만 제거되지는 않습니다. 다시 시작하거나 제거할 수 있습니다.

## **기본 기술**

[Docker는 Go 프로그래밍 언어](https://golang.org/) 로 작성되었으며 Linux 커널의 여러 기능을 활용하여 기능을 제공합니다. *Docker는 컨테이너*`namespaces` 라는 격리된 작업 공간을 제공하기 위해 라는 기술을 사용합니다 . 컨테이너를 실행하면 Docker는 해당 컨테이너에 대한 *네임스페이스 세트를 생성합니다.*

이러한 네임스페이스는 격리 계층을 제공합니다. 컨테이너의 각 측면은 별도의 네임스페이스에서 실행되며 액세스는 해당 네임스페이스로 제한됩니다.