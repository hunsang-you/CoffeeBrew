### Port Number

> 각각의 구성요소는 Docker container 로 격리하였습니다
> Port|이름
> :--|:--
> 80|HTTP => 443(HTTPS)로 리다이렉트
> 443|HTTPS
> 3000|React, Nginx Docker Container
> 3306|Mysql Docker Container
> 6379|Redis Docker Container
> 8009|FastApi Docker Container
> 8081|SpringBoot Docker Container
> 8082|Jenkins Docker Container

### ssl 인증서 발급

> - nginx 설치
>
> ```
> sudo apt-get install nginx
> ```
>
> - letsencrypt 설치
>
> ```
> sudo apt-get install letsencrypt
>
> sudo systemctl stop nginx
>
> sudo letsencrypt certonly --standalone -d 도메인
>
> # 발급 경로
> cd /etc/letsencrypt/live/도메인/
> # 발급 확인
> ls
> ```

### How To Run in Local

> - Frontend
>
> ```
> npm install
>
> npm start
> ```
>
> - Backend
>   > - 사용하는 IDE 로 import 후 src/main/java/b305/coffeebrew/server/ ServerApplication.java 실행

### How To Run in EC2

> - 개요
>   > - Coffeebrew는 Jenkins 를 이용한 CI/CD 자동화 환경으로 구성하여 팀 구성원 각자 작성한 코드를 Gitlab 에 푸쉬하면 Webhook 을 통해 Jenkins 의 Pipeline Script 에 작성한 대로 CI/CD 흐름이 진행됩니다

> - EC2 배포 환경 구성 순서
>   > 1. ufw (uncomplicated firewall) 방화벽 포트 개방
>   > 2. Docker & Docker-compose 설치
>   > 3. Jenkins 도커 이미지 설치 및 컨테이너 실행 및 설정
>   > 4. Mysql 도커 이미지 설치 및 컨테이너 실행 및 설정
>   > 5. Redis 도커 이미지 설치 및 컨테이너 실행 및 설정
>   > 6. frontend 폴더의 Dockerfile과 Docker-compose file을 이용하여 도커 이미지 생성 및 컨테이너 실행
>   > 7. backend 폴더의 Dockerfile과 Docker-compose file을 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>   > 8. Nginx 설치 및 설정
> - ### ufw (uncomplicated firewall) 방화벽 포트 개방
>
> ```
> # ufw 명령 도움말
> sudo ufw -help
>
> # ufw 상태 확인
> sudo ufw status
>
> # ufw 포트 허용
> sudo ufw allow portnumber
> ```
>
> - Docker 설치
>
> ```
> # 도커 공식 GPG key를 생성
> sudo apt-get update
>
> sudo apt-get install \
> ca-certificates \
>    curl \
>    gnupg \
>    lsb-release
> ```
>
> ```
> # 키저장소 추가
> sudo mkdir -p /etc/apt/keyrings
>
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | <\>sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
>
> echo \
>  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/>keyrings/docker.gpg] https://download.docker.com/linux/ubuntu\
> $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
> ```
>
> ```
> # 도커 패키지 설치
> sudo apt-get update
>
> $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
> dpkg -s libc6 | grep Arch
> sudo curl -L "https://github.com/docker/compose/releases/download/v2.15.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
>
> ```
>
> - Docker-compose 설치
>
> ```
> # 도커 공식 GPG key를 생성
> sudo apt-get update
>
> sudo apt-get install \
> ca-certificates \
>    curl \
>    gnupg \
>    lsb-release
> ```
>
> - Nginx & SSL 설정
>
> ```
> # Nginx 설치
> sudo apt-get install nginx
> sudo nginx -v //설치확인
> sudo systemctl stop nginx // nginx중지
> ```
>
> ```
> # Let's Encypt 설치
> sudo apt-get install letsencrypt
> sudo letsencrypt certonly --standalone -d [도메인]
> ```
>
> - ec2 nginx
>
> ```conf
> # /etc/nginx/sites-available/coffeebrew.conf
> server {
>        location / {
>                proxy_pass http://localhost:3000;
>        }
>        location /api {
>                proxy_pass http://localhost:8081;
>        }
>        location /recom/ {
>                proxy_pass http://localhost:8009/;
>        }
>
>       listen 443 ssl; # managed by Certbot
>       ssl_certificate /etc/letsencrypt/live/j8b305.p.ssafy.io/fullchain.pem;
>       # managed by Certbot
>       ssl_certificate_key /etc/letsencrypt/live/j8b305.p.ssafy.io/privkey.pem; # managed by Certbot
> }
>
> server {
>    if ($host = j8b305.p.ssafy.io) {
>        return 301 https://$host$request_uri;
>    } # managed by Certbot
>
>        listen 80;
>        server_name j8b305.p.ssafy.io;
>    return 404; # managed by Certbot
> }
> ```
>
> ```
> # jenkins 구성하는 docker-compose.yml
>version: "3"
>  
>services:
>  jenkins:
>    container_name: jenkins
>    image: jenkins/jenkins:lts
>    user: root
>    volumes:
>      - /jenkins:/var/jenkins_home
>      - /var/run/docker.sock:/var/run/docker.sock
>    ports:
>      - 8082:8080
>    environment:
>      - TZ=Asia/Seoul
>    privileged: true
>    restart: "unless-stopped"
> ```
>```
> # mysql 구성하는 docker-compose.yml
>version: "3"
>  
>services:
>  mysql:
>    image: mysql:8.0
>    container_name: mysql
>    ports:
>      - 3306:3306 # HOST:CONTAINER
>    environment:
>      - MYSQL_ROOT_PASSWORD=@xmrghkB305
>      - TZ=Asia/Seoul
>    command:
>      - --character-set-server=utf8mb4
>      - --collation-server=utf8mb4_unicode_ci
>    volumes:
>      - ./data:/var/lib/mysql
>```
>```
>> # server(backend) 구성하는 docker-compose.yml
>version: "3"
>services:
>  api:
>    build:
>      context: ./server
>      dockerfile: Dockerfile
>    volumes:
>      - /jenkins/workspace/b305_coffeebrew_server:/var/jenkins_home/workspace/b305_coffeebrew_server
>      - /var/run/docker.sock:/var/run/docker.sock
>      - /etc/localtime:/etc/localtime:ro
>      - /usr/share/zoneinfo/Asia/Seoul:/etc/timezone:ro
>      - /logs:/logs
>    environment:
>      - SOURCECODE_JENKINS_CREDENTIAL_ID=donghun
>      - SOURCE_CODE_URL=https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22B305.git
>      - RELEASE_BRANCH=release-server
>      - datasource=j8b305.p.ssafy.io
>      - dbUser=${dbUser}
>      - dbPwd=${dbPwd}
>      - jwt_secret_key=${jwt_secret_key}
>      - rest_api_key=${rest_api_key}
>      - client_secret_key=${client_secret_key}
>      - redisPwd=${redisPwd}
>      - clientId=${clientId}
>      - clientSecret=${clientSecret}
>      - schema=devdb
>    ports:
>      - "8081:8081"
>    networks:
>      - web
>
>networks:
>        web:
>                external: true
>```
>
>```
> # client(frontend) 구성하는 docker-compose.yml
>
>version: "3"
>services:
>        client:
>                build:
>                        context: ./front
>                        dockerfile: Dockerfile
>                volumes:
>                        - /jenkins/workspace/b305_coffeebrew_client:/var/jenkins_home/workspace/b305_coffeebrew_b305
>                        - /var/run/docker.sock:/var/run/docker.sock
>                environment:
>                        TZ: "Asia/Seoul"
>                ports:
>                        - 3000:3000
>                networks:
>                        - web
>
>networks:
>        web:
>                external: true
>```
>
>```
> # recom(추천 서버) 구성하는 docker-composer.yml
>
>version: '3'
>services:
>  recom:
>    build:
>      context: .
>      dockerfile: Dockerfile
>    volumes:
>      - /jenkins/workspace/b305_coffeebrew_recom_server:/recom
>    ports:
>      - 8009:8009
>    environment:
>      dbUser: ${dbUser}
>      dbPwd: ${dbPwd}
>```
>```
> # 각 환경변수의 값은 Jenkinsfile의 credential Secret text에 설정
> ![image](/uploads/f4954ad830ad3a8cb8c4be7cdbc1cb8b/image.png)
>```
>```
> # jenkins frontend pipeline
>
> pipeline {
>    agent any
>    options {
>        timeout(time: 1, unit: 'HOURS')
>    }
>    environment {
>        SOURCECODE_JENKINS_CREDENTIAL_ID = 'donghun'
>        SOURCE_CODE_URL = 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22B305.git'
>        RELEASE_BRANCH = 'release-client'
>    }
>    stages {
>
>        stage('clone') {
>            steps {
>                git url: "$SOURCE_CODE_URL",
>                    branch: "$RELEASE_BRANCH",
>                    credentialsId: "$SOURCECODE_JENKINS_CREDENTIAL_ID"
>                sh "ls -al"
>            }
>        }
>
>        stage('frontend dockerizing') {
>            steps {
>                sh "pwd"
>                sh "docker build -t front ./front"
>            }
>        }
>
>		stage('Deploy') {
>            steps{
>                sh "pwd"
>                sh "docker-compose --file /var/jenkins_home/workspace/docker-compose-client.yml up -d --build"
>                sh "docker-compose ps"
>            }
>            post {
>                success {
>                    echo "docker-compose success"
>                }
>
>                failure {
>                    echo "docker-compose failed"
>                }
>            }		
>        }
>    }
>}
>
> ```
> ```
> # jenkins backend pipeline
>
>pipeline {
>    agent any
>    options {
>        timeout(time: 1, unit: 'HOURS')
>    }
>    environment {
>        SOURCECODE_JENKINS_CREDENTIAL_ID = 'donghun'
>        SOURCE_CODE_URL = 'https://lab.ssafy.com/s08-bigdata-recom-sub2/S08P22B305.git'
>        RELEASE_BRANCH = 'release-client'
>    }
>    stages {
>
>        stage('clone') {
>            steps {
>                git url: "$SOURCE_CODE_URL",
>                    branch: "$RELEASE_BRANCH",
>                    credentialsId: "$SOURCECODE_JENKINS_CREDENTIAL_ID"
>                sh "ls -al"
>            }
>        }
>
>        stage('frontend dockerizing') {
>            steps {
>                sh "pwd"
>                sh "docker build -t front ./front"
>            }
>        }
>
>		stage('Deploy') {
>            steps{
>                sh "pwd"
>                sh "docker-compose --file /var/jenkins_home/workspace/docker-compose-client.yml up -d --build"
>                sh "docker-compose ps"
>            }
>            post {
>                success {
>                    echo "docker-compose success"
>                }
>
>                failure {
>                    echo "docker-compose failed"
>                }
>            }		
>        }
>    }
>}
>
> ```
> ```
> # Frontend Dockerfile
>
>FROM node:16.18.0
>WORKDIR /front
>COPY ./package*.json /front
>COPY / /front
>RUN npm install
>RUN npm install -g serve@14.2.0
>EXPOSE 3000
>RUN npm run build
>CMD ["npx", "serve", "-s", "build"]
>```
>```
> # Backend Dockerfile
>
>FROM openjdk:11
>COPY build/libs/server-0.0.1-SNAPSHOT.jar /app/server.jar
>WORKDIR /app
>ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "server.jar"]
>```