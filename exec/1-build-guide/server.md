## Build guide

### Prerequisite

- Ubuntu 20.04 기반 서버
	- Welcome to Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)
- `j7b106.p.ssafy.io` 도메인 사용

### Docker

- [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
	- 참고하여 설치
	- 특이사항 없음

### Nginx

- [https://nginx.org/en/linux_packages.html#Ubuntu](https://nginx.org/en/linux_packages.html#Ubuntu)
	- 참고하여 설치
	- mainline 패키지가 아닌 stable 패키지 설치할 것

#### Nginx - Certbot 설치 및 자동 SSL 구성
- [https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)
	- 참고하여 설치
	- 특이사항 없음

#### Nginx - Site 구성 설정 파일

- /etc/nginx/sites-available/default
	- 두번째 server 블록이 유효한 설정 (첫번째 서버 블록은 무시해도 좋음)
		- 호스트: j7b106.p.ssafy.io, 포트: 80 으로 들어온 모든 http 를 443 포트의 https 로 리다이렉트

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
    if ($host = j7b106.p.ssafy.io) {
        return 301 https://$host$request_uri;
    }

    listen 80 ;
    listen [::]:80 ;
    server_name j7b106.p.ssafy.io;
    return 404;
}
```

- /etc/nginx/sites-available/jenkins
	- Jenkins 웹 인터페이스 접속을 위해 58888 포트를 58080 으로 리버스 프록시

```nginx
server {
    server_name j7b106.p.ssafy.io;

    listen [::]:58888 ssl ipv6only=on;
    listen 58888 ssl;

    location / {
        proxy_pass http://localhost:58080/;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    ssl_certificate /etc/letsencrypt/live/j7b106.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j7b106.p.ssafy.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

- /etc/nginx/sites-available/ganache
	- Ganache 서버를 위해 8545 포트를 9425 로 리버스 프록시

```nginx
server {
    server_name j7b106.p.ssafy.io;

    listen [::]:8545 ssl ipv6only=on;
    listen 8545 ssl;

    location / {
        proxy_pass http://localhost:9425/;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    ssl_certificate /etc/letsencrypt/live/j7b106.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j7b106.p.ssafy.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

- /etc/nginx/sites-available/sp7333
	- 메인 서비스를 위해 443 (https 기본 포트) 을 프론트와 백으로 리버스 프록시

```nginx
server {
    server_name j7b106.p.ssafy.io;

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;

    location / {
        proxy_pass http://localhost:8081/;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    location /api {
        proxy_pass http://localhost:8080/api;
        proxy_redirect off;
        charset utf-8;

        include /etc/nginx/proxy_params;
        proxy_set_header X-Nginx-Proxy true;
    }

    ssl_certificate /etc/letsencrypt/live/j7b106.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j7b106.p.ssafy.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

- 각 파일을 `/etc/nginx/sites-available/` 에 생성
	- nano, vim 등 에디터 이용
	- 각 구성 설정을 사용 가능하도록 등록한다고 이해하면 됨
- 각 파일의 심볼릭 링크를 `/etc/nginx/sites-enabled/` 에 생성
	- `sudo ln -s /etc/nginx/sites-available/<FILE> /etc/nginx/sites-enabled/`
	- 사용 가능한 설정 중 실제로 사용할 설정을 골라 활성화한다고 이해하면 됨
- Nginx 테스트
	- `sudo nginx -t`
- Nginx 재시작
	- `sudo service nginx restart`

### Ganache

```sh
sudo docker run -d -p 9425:8545 --name ganache trufflesuite/ganache-cli -d -m "<MNEMONIC_PHRASE>" --hostname 0.0.0.0 --debug
```

### MySQL

- [https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)
	- 참고하여 설치

- 유저 생성

```mysql
CREATE USER '이름'@'%' IDENTIFIED BY '비밀번호';
GRANT ALL PRIVILEGES ON *.* TO '이름'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

- MySQL 서버 세팅 시 주의사항
	- 설정 파일에서 `bind-address` 부분 주석 처리해야 리모트에서 접속 가능

```sh
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

### Jenkins

#### Jenkins - 설치 및 설정

- 젠킨스는 편의를 위해 도커 이미지 사용
	- 세부 옵션은 다음을 참고
		- [https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)

```sh
sudo docker run --detach --publish 58080:8080 --publish 50000:50000 --volume /home/ubuntu/jenkins_home:/var/jenkins_home --volume /var/run/docker.sock:/var/run/docker.sock --user root --name jenkins jenkins/jenkins:lts
```

- 웹 인터페이스 접속 후 계정 설정 (Nginx 리버스 프록시까지 마친 후 하는 것을 권장)
	- 리버스 프록시를 했다면
		- `https://<도메인>:58888` 로 접속
	- 아니라면
		- `http://<도메인>:58080` 으로 접속
	- 초기 비밀번호 확인을 위해 로그 확인

```sh
sudo docker logs jenkins
```

- 권장 플러그인 설치 (웹 인터페이스에서)

- 젠킨스 컨테이너 내부에 도커 설치
	- Docker 설치 참고
	- [여기](https://faun.pub/how-to-install-docker-in-jenkins-container-4c49ba40b373)도 참고할 만함

```sh
sudo docker exec -it jenkins bash
```

- 계정 설정 후 플러그인 설치
	- GitLab 연동
		- `Generic Webhook Trigger`
		- `Gitlab API Plugin`
		- `GitLab Authentication plugin`
		- `GitLab Plugin`
	- Docker 관련
		- `Docker`
		- `Docker API Plugin`
		- `Docker Commons Plugin`
		- `Docker Pipeline`
	- MatterMost 연동 (메시지 제공)
		- `Mattermost Notification Plugin`
	- Blue Ocean 인터페이스 관련 (예쁜 화면 제공)
		- `Blue Ocean`
	- 영어 인터페이스를 위해 (검색에 용이)
		- `Locale plugin`

- Manage Jenkins > Configure System 에서 젠킨스 전역 설정
	- 인터페이스 영어로 변경
	- GitLab 연동
		- key 를 이용한 방식보다는 적당히 아이디 비번을 쓰는 것이 정신 건강에 이로움
		- key 방식으로 해 봤는데 잘 안 됨
	- MatterMost 연동

#### Jenkins - Credentials

환경변수 파일을 사용하기 위해 젠킨스 크리덴셜을 이용

- 웹 인터페이스에서 진행
- `Manage Jenkins`
- `Manage Credentials`
- `Stores scoped to Jenkins` 에서
	- `Domains` 열에 있는 `(global)` 선택
- `Add Credentials`
	- `Kind`
		- `Secret file` 선택
		- 파일 업로드
		- `ID` 지정 (Jenkinsfile 의 환경변수 부분 참고)
		- `Create` 으로 생성

- 크리덴셜 파일 목록 (내용은 [Build guide](../1-build-guide/) 참고)
	- frontend
		- .env.local
		- .env.production.local
	- backend
		- application-production-secret.yml
	- backeth
		- .env.production4server

#### Jenkins - Pipeline

자동화할 파이프라인 정의

- 웹 인터페이스에서 진행
- `New Item`
- `Pipeline` 선택
- `OK`
- `Pipeline` > `Definition`
	- `Pipeline script from SCM` 선택 (Jenkinsfile 을 사용하기 위해 필요)
	- `SCM`
		- `Git` 선택
			- 리포지토리 설정
				- 주소, 접속 크리덴셜, 브랜치

- Jenkinsfile (참고용, 소스에 포함되어 있음)

```groovy
pipeline {
  agent any

  // 파이프라인에서 사용할 변수 설정
  environment {
    // 환경변수 파일을 젠킨스 크리덴셜로부터 가져옴
    // 그렇게 하기 위해서 Manage Jenkins > Manage Credentials 에서 크리덴셜 등록 (Kind: Secret file)
    FRONTEND_DEFAULT = credentials('frontend_default')
    FRONTEND_PRODUCTION = credentials('frontend_production')
    BACKEND_PRODUCTION = credentials('backend_production')
    BACKEND_PRODUCTION_DEMO = credentials('backend_production_demo')
    BACKETH_PRODUCTION = credentials('backeth_production')

    // 도커 이미지, 컨테이너 이름
    FRONTEND_IMAGE = 'sp7333/frontend'
    FRONTEND_CONTAINER = 'frontend'
    BACKEND_IMAGE = 'sp7333/backend'
    BACKEND_CONTAINER = 'backend'
    BACKETH_IMAGE = 'sp7333/backeth'
    BACKETH_CONTAINER = 'backeth'

    // MM 플러그인, Blue Ocean 플러그인 관련
    MMACCOUNT = '@wp29dud' // @아이디 사용 (언급시 알림)
    MSGSUFFIX = "\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>" // 메시지에 일괄적으로 달릴 링크
  }

  stages {
    // 작업 개시 알림
    stage('mattermost_send_start') {
      steps {
        catchError {
          mattermostSend(
            color: '#FFF33C',
            text: MMACCOUNT,
            message: "Job start${MSGSUFFIX}"
          )
        }
      }
    }

    // 빌드 전 정리 작업
    stage('pre_deploy') {
      // 병렬 처리 (파일 작업과 도커 작업)
      parallel {
        // 파일 (환경 변수) 세팅
        stage('file_work') {
          stages {
            // 변경 사항을 지움 (백엔드 application-production.yml 때문)
            stage('git_clean') {
              steps {
                sh 'git clean --force'
              }
            }

            // 파일 세팅
            stage('set_files') {
              steps {
                sh '\
                  cp $FRONTEND_DEFAULT frontend/.env.local & \
                  cp $FRONTEND_PRODUCTION frontend/.env.production.local & \
                  cp $BACKETH_PRODUCTION backeth/.env.production & \
                  cat $BACKEND_PRODUCTION >> backend/src/main/resources/application-production.yml & \
                '
                // cp -R ../contracts frontend/src & \
                // 위와 같이 저장소에 ignore 됐던 컨트랙트 복사 작업도 있었으나
                // 도중에 저장소에 트래킹하게 돼서 불필요해짐
              }
            }
          }
        }

        // 도커 관련 작업
        stage('docker_work') {
          stages {
            // 안 쓰이는 이미지 제거
              // 하지 않으면 서버가 아파함
            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
                }
              }
            }

            // 같은 이름을 계속 사용하기 때문에 현재 작동 중인 컨테이너를 지움
            stage('remove_containers') {
              steps {
                catchError {
                  sh "docker rm --force ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER} ${BACKETH_CONTAINER}"
                }
              }
            }
          }
        }
      }
    }

    // 배포 본 작업
    stage('deploy') {
      // 병렬 처리 (프론트엔드와 백엔드)
      parallel {
        // 프론트엔드
        stage('frontend') {
          stages {
            // Build
            stage('frontend_build') {
              steps {
                dir('frontend') {
                  sh "docker build --build-arg runscript=buildprod --tag ${FRONTEND_IMAGE} ."
                }
              }
            }

            // Run
            stage('frontend_serve') {
              steps {
                sh "docker run -d -p 8081:80 --name ${FRONTEND_CONTAINER} ${FRONTEND_IMAGE}"
              }
            }

            // 알림
            stage('mattermost_send_frontend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Deploying frontend complete${MSGSUFFIX}"
                  )
                }
              }
            }
          }
        }

        // 백엔드
        stage('backend') {
          stages {
            // Express Build
            stage('backeth_build') {
              steps {
                sh "docker build --file backeth/Dockerfile --tag ${BACKETH_IMAGE} ."
              }
            }

            // Express Run
            stage('backeth_run') {
              steps {
                sh "docker run -d -p 8082:3000 --add-host=host.docker.internal:host-gateway --name ${BACKETH_CONTAINER} ${BACKETH_IMAGE}"
              }
            }

            // Express 알림
            stage('mattermost_send_backeth_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Launching backeth complete${MSGSUFFIX}"
                  )
                }
              }
            }

            // 스프링 Build
            stage('backend_build') {
              steps {
                dir('backend') {
                  sh "docker build --tag ${BACKEND_IMAGE} ."
                }
              }
            }

            // 스프링 Run
            stage('backend_serve') {
              steps {
                sh "docker run -d -p 8080:8080 -e profile=production --add-host=host.docker.internal:host-gateway --name ${BACKEND_CONTAINER} ${BACKEND_IMAGE}"
              }
            }

            // 알림
            stage('mattermost_send_backend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Deploying backend complete${MSGSUFFIX}"
                  )
                }
              }
            }
          }
        }
      }
    }

    // 작업 종료 알림
    stage('mattermost_send_end') {
      steps {
        catchError {
          mattermostSend(
            color: '#3399FF',
            text: MMACCOUNT,
            message: "Job end${MSGSUFFIX}\n\nhttps://j7b106.p.ssafy.io/"
          )
        }
      }
    }
  }
}
```
