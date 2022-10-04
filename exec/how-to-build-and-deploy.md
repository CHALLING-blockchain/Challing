# 소스 클론 이후 빌드 및 배포하는 방법

이 문서는 배포 환경(서버) 기준으로 작성됐다.
개발 환경은 [how-to-run-on-dev-local](./how-to-run-on-dev-local.md) 을 참고

## 사용한 소프트웨어 정보

| SW | 버전 |
| --- | --- |
| Ubuntu | Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64) |
| Docker | 20.10.17 |
| Nginx | nginx/1.18.0 (Ubuntu) |
| Java | openjdk version "1.8.0_192" |
| Node.js | 16.16.0-x64 LTS |
| MySQL | 8.0.29.0 |
| Openvidu | 2.22.0 |

## 소스 클론

이 문서의 설명은 서버에서 소스가 `/home/ubuntu/repositories/<저장소_이름>` 경로에 위치 하는 것을 기준으로 한다.

`/home/ubuntu/repositories` 디렉토리를 만들고 그곳에서 clone 을 진행한다.

```bash
mkdir /home/ubuntu/repositories
cd /home/ubuntu/repositories
git clone <저장소_주소>
```

저장소 경로로 간다.

```bash
cd <저장소_이름>
```

## 환경 변수 파일 업로드

파일을 서버에 옮길 적절한 툴(SFTP 등)을 사용하여 환경 변수가 설정된 파일을 서버에 업로드한다.

- frontend
    - frontend/[.env.production.local](./server-files/frontend/.env.production.local)
- backend
    - backend/src/main/resources/[application-production.properties](server-files/backend/src/main/resources/application-production.properties)

### .env.production.local

```properties
VUE_APP_API_SERVER_BASE_URL = "https://여기_도메인명_넣기/api"
VUE_APP_KAKAO_CLIENT_ID = "여기_KAKAO_DEV_REST_API_KEY_넣기"
VUE_APP_KAKAO_LOGIN_REDIRECT_URI = "https://여기_도메인명_넣기/loginview"
VUE_APP_KAKAO_LOGOUT_REDIRECT_URI = "https://여기_도메인명_넣기/logoutview"
VUE_APP_WS_SERVER_BASE_URL = "https://여기_도메인명_넣기"
VUE_APP_OPENVIDU_SERVER_URL = "https://여기_도메인명_넣기:여기_오픈비두_포트번호_넣기"
VUE_APP_OPENVIDU_SERVER_SECRET = "여기_오픈비두_암호_넣기"
```

### application-production.properties

```properties
com.mbting.kakao.client_id=여기_KAKAO_DEV_REST_API_KEY_넣기
com.mbting.kakao.redirect_uri=https://여기_도메인명_넣기/loginview
com.mbting.fileupload_uri=https://여기_도메인명_넣기/static/upload/
com.mbting.openvidu.server.url=https://여기_도메인명_넣기:여기_오픈비두_포트번호_넣기/
com.mbting.openvidu.server.secret=여기_오픈비두_암호_넣기

spring.datasource.url=jdbc:mysql://localhost:여기_MySQL_포트번호_넣기/mbtisgt?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
spring.datasource.username=여기_DB_계정명_넣기
spring.datasource.password=여기_DB_비밀번호_넣기

logging.file.name=logs/mbting-op-test-log.log

# jwt
jwt.secret=여기_JWT_암호_넣기
# unit is ms. 15 * 24 * 60 * 60 * 1000 = 15days
jwt.expiration=1296000000
```

### 환경 변수 주요 사항

동일해야 하는 값

| frontend | backend |
| --- | --- |
| VUE_APP_KAKAO_CLIENT_ID | com.mbting.kakao.client_id |
| VUE_APP_KAKAO_LOGIN_REDIRECT_URI | com.mbting.kakao.redirect_uri |
| VUE_APP_OPENVIDU_SERVER_URL | com.mbting.openvidu.server.url |
| VUE_APP_OPENVIDU_SERVER_SECRET | com.mbting.openvidu.server.secret |

### (참고용) 빌드 툴 환경 프로필 어디에서 적용되는가

- frontend: package.json

```json
{
  "scripts": {
    "dist": "vue-cli-service build --mode production"
  }
}
```

(옵션) 실행 커맨드 `npm run dist`

- backend: build.gradle

```groovy
tasks.named('bootRun') {
	systemProperty 'spring.profiles.active', findProperty('profile') ?: 'default'
}
```

(옵션) 실행 커맨드 `gradle bootRun -Pprofile=production`

## Backend 실행 스크립트 업로드

파일을 서버에 옮길 적절한 툴(SFTP 등)을 사용하여 Backend 를 빌드하고 실행할 스크립트 파일을 서버에 업로드한다.

- 빌드, 실행: run.sh
    - backend/[run.sh](./server-files/backend/run.sh)
- 로그 모니터: monitor.sh
    - backend/[monitor.sh](./server-files/backend/monitor.sh)

## Ubuntu 상세

포트를 막지 않았는지 확인 (ufw 비활성화 하였음)

```bash
sudo ufw status verbose
```

> Status: inactive

nano (텍스트 편집기), git, docker 설치 확인

```bash
nano --version
```

> GNU nano, version 4.8

```bash
git --version
```

> git version 2.25.1

```bash
docker --version
```

> Docker version 20.10.17, build 100c701

[Docker 설치](https://docs.docker.com/engine/install/ubuntu/)

## Nginx 상세

Nginx 설치

```bash
sudo apt-get update
sudo apt-get install nginx
```

certbot 이 자동으로 생성한 config 를 기반으로 한다.

[certbot 상세](#certbot-상세)를 참고하여 설정을 수행한다.

Nginx 가 기본으로 제공하는 설정, certbot 이 자동 생성한 설정 그리고 프로젝트에 필요한 추가 설정이 합쳐져 최종적으로 다음과 같은 config 가 된다.

/etc/nginx/sites-available/[default](./server-files/nginx-config/default)
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    if ($host = 여기_도메인명_넣기) {
        return 301 https://$host$request_uri;
    }

    listen 80 ;
    listen [::]:80 ;
    server_name 여기_도메인명_넣기;
    return 404;
}
```

/etc/nginx/sites-available/[mbting](./server-files/nginx-config/mbting)
```nginx
server {
    server_name 여기_도메인명_넣기;

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;

    location / {
        root /home/ubuntu/repositories/여기_저장소명_넣기/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080/api;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    location /ws {
        proxy_pass http://localhost:8080/ws;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    location /static {
        proxy_pass http://localhost:8080/static;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    ssl_certificate /etc/letsencrypt/live/도메인명(자동생성됨)/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/도메인명(자동생성됨)/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

작성한 config 적용

```bash
sudo ln -s /etc/nginx/sites-availadle/mbting /etc/nginx/sites-enabled/
```

Nginx 테스트

```bash
sudo nginx -t
```

Nginx 재시작

```bash
sudo service nginx restart
```

## certbot 상세

[공식 가이드 페이지](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) (Nginx on Ubuntu 20)

위의 공식 가이드를 따라한다.

## Java 상세

[다운로드 및 설치 가이드](https://www.azul.com/downloads/?version=java-8-lts&os=ubuntu&architecture=x86-64-bit&package=jdk&show-old-builds=true)

```bash
java -version
```

> openjdk version "1.8.0_192"
> OpenJDK Runtime Environment (Zulu 8.33.0.1-linux64) (build 1.8.0_192-b01)
> OpenJDK 64-Bit Server VM (Zulu 8.33.0.1-linux64) (build 25.192-b01, mixed mode)

## MySQL 상세

Docker 컨테이너로 MySQL 을 설치한다. (버전, root 계정 비밀번호, 포트 설정을 설치 시에 하기 위함)

```bash
sudo docker run --name mysql-server-test -e "MYSQL_ROOT_PASSWORD=여기_루트_계정_비밀번호_넣기" -d -p 여기_MySQL_포트번호_넣기:3306 mysql/mysql-server:8.0.29
```

이 프로젝트에서는 MySQL 이 기본으로 사용하는 포트(3306)를 쓰지 않는다. 이 점에 주의한다.

root 계정은 사용하지 않는다.

새로운 계정을 만든다.

컨테이너에 접속

```bash
sudo docker exec -it mysql-server-test bash
```

MySQL CLI 를 통해 접속

```bash
mysql -u root -p
```

root 비밀번호 입력

다음을 차례로 입력

```mysql
CREATE USER '여기_DB_계정명_넣기'@'%' IDENTIFIED BY '여기_DB_비밀번호_넣기';
GRANT ALL PRIVILEGES ON *.* TO '여기_DB_계정명_넣기'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

위의 MySQL 설정으로 DB 계정이 생성되며 권한이 부여된다.

MySQL Workbench 등을 이용하여 `mbtisgt` database 생성

```sql
CREATE DATABASE `mbtisgt`;
```

## Openvidu 상세

버전 정보

> - Openvidu Information:
>     - Installation Type: On Premises
>     - Openvidu Version: 2.22.0
>     - Openvidu Call Version: 2.22.0
> - System Information:
>     - Linux Version:
>         - Description: Ubuntu 20.04 LTS
>     - Docker Version: 
>     - Docker Compose Version: 2.6.0

[오픈비두 설치 가이드](https://docs.openvidu.io/en/stable/deployment/ce/on-premises/) (Deploying OpenVidu CE on premises)

위 가이드를 따라한다.

설치와 실행을 마쳤다면 `/opt/openvidu` 경로의 `.env` 의 내용을 수정한다.

```bash
sudo nano /opt/openvidu/.env
```

```properties
DOMAIN_OR_PUBLIC_IP=<도메인_주소>
OPENVIDU_SECRET=MY_SECRET # 운영시 사용할 암호를 적절히 입력
HTTP_PORT=____ # Nginx 포트(80)와 겹치면 안 됨
HTTPS_PORT=____ # Nginx 포트(443)와 겹치면 안 됨, 이 포트번호를 위의 여기_오픈비두_포트번호_넣기 에 넣어야 함
CERTIFICATE_TYPE=letsencrypt # selfsigned 를 쓰지 않는다
LETSENCRYPT_EMAIL=<이메일> # 본인이 실제로 사용하는 이메일 주소를 쓴다
```

오픈비두를 재실행한다.

```bash
sudo /opt/openvidu/openvidu restart
```

## Frontend 빌드

frontend 경로로 간다.

```bash
cd /home/ubuntu/repositories/<저장소_이름>/frontend
```

패키지 설치 및 빌드

```bash
npm install
npm run dist
```

Nginx 재실행

```bash
sudo service nginx restart
```

저장소 루트로 돌아간다.

```bash
cd ..
```

## Backend 빌드

현재 실행 중인 Backend 프로세스를 확인하여 있다면 프로세스를 강제 종료한다.

```bash
ps -aux | grep mbting
```

예를들어 실행 중인 Backend 프로세스가 있다면 다음과 같은 출력이 나온다.

> ubuntu <프로세스_ID> 11.3  5.4 7924280 898344 pts/0  Sl   06:12   0:32 java -Dspring.profiles.active=production -Dcom.mbting.ddl_auto=create -jar /home/ubuntu/repositories/S07P12B205/backend/jar/mbting-0.0.1-SNAPSHOT.jar

있다면 강제 종료

```bash
kill -9 <프로세스_ID>
```

backend 경로로 간다.

```bash
cd backend
```

빌드, 복사 그리고 실행을 한 번에 하는 스크립트 `run.sh` 를 실행한다.

```bash
sh run.sh
```

(참고용) [run.sh](./server-files/backend/run.sh) 의 내용은 다음과 같다.

```sh
#!/bin/sh

echo "빌드 시작" \
&& /home/ubuntu/repositories/S07P12B205/backend/gradlew clean build \
&& echo "빌드 성공" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "jar 복사 시작" \
&& cp /home/ubuntu/repositories/S07P12B205/backend/build/libs/mbting-0.0.1-SNAPSHOT.jar /home/ubuntu/repositories/S07P12B205/backend/jar/ \
&& echo "jar 복사 성공" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "============" \
&& echo "jar 실행" \
&& nohup java \
"-Dspring.profiles.active=production" \
"-Dcom.mbting.ddl_auto=create" \
-jar /home/ubuntu/repositories/S07P12B205/backend/jar/mbting-0.0.1-SNAPSHOT.jar &
```

(옵션) 성공했다면 `clear` 를 입력한다. (nohup 때문에 백그라운드의 프로세스가 출력을 보여주기 때문에 단순히 화면을 지우는 것이다.)

(옵션) 백엔드의 로그를 확인하기 위해 `monitor.sh` 를 실행한다. (종료: `Ctrl + C`)

```bash
sh monitor.sh
```

(참고용) [monitor.sh](./server-files/backend/monitor.sh) 의 내용은 다음과 같다.

```sh
#!/bin/sh

tail -f /home/ubuntu/repositories/S07P12B205/backend/logs/mbting-op-test-log.log
```
