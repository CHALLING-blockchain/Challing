## Build guide

소스 클론 이후 빌드 밎 배포할 수 있게 정리한 문서

### 빌드 가이드 본문

- [빌드 가이드 본문(./server.md)](./server.md)
	- 내용이 길어서 따로 정리

### 개발용 빌드 참고 문서

- [개발용 빌드 참고 문서(./dev.md)](./dev.md)

### SW 정보

| SW            | version |
| ------------- | --- |
| Docker        | Docker version 20.10.18, build b40c2f6 |
| Nginx         | nginx version: nginx/1.18.0 (Ubuntu) |
| Ganache CLI   | Ganache CLI v6.12.2 (ganache-core: 2.13.2) |
| Truffle       | Truffle v5.5.28 (core: 5.5.28) |
| Node js       | v16.17.0 |
| Java          | Azul Zulu version 11.0.16 |
| MySQL         | Server version: 8.0.23 MySQL Community Server - GPL |
| VS Code       | 1.70.2 |
| IntelliJ IDEA | IntelliJ IDEA 2022.2.2 (Community Edition) |

### 개발 플랫폼, 패키지 매니저, 프레임 워크/라이브러리

| Part           | Platform | PM     | FW/Lib      |
| -------------- | -------- | ------ | ----------- |
| Smart Contract | Node js  | NPM    | Truffle     |
| Frontend       | Node js  | NPM    | React       |
| Backend (Main) | Java     | Gradle | Spring Boot |
| Backend (Web3) | Node js  | NPM    | Express     |

### 환경 변수

개발시 환경 변수, 배포시 환경 변수 모두 필요

#### 개발용

- frontend
	- .env.local
- backeth
	- .env

- frontend/.env.local

```
REACT_APP_KAKAO_CLIENT_ID = ****
REACT_APP_ETHERSCAN_API_KEY = ****
REACT_APP_CRYPTO_API_KEY = ****
REACT_APP_METAMASK_PRIVATE_KEY = ****
REACT_APP_INFURA_API_KEY = ****
REACT_APP_ACCESS_KEY = ****
REACT_APP_SECRET_KEY = ****
```

- backeth/.env
```
PORT = "8082"
APP_NODE_ENDPOINT = "https://j7b106.p.ssafy.io:8545"
APP_ACCOUNT_PRIVATE_KEY = ****
```

#### 서버용

- frontend
	- .env.local
	- .env.production.local
- backend
	- application-production-secret.yml
- backeth
	- .env.production4server

- frontend/.env.local

```
REACT_APP_KAKAO_CLIENT_ID = ****
REACT_APP_ETHERSCAN_API_KEY = ****
REACT_APP_CRYPTO_API_KEY = ****
REACT_APP_METAMASK_PRIVATE_KEY = ****
REACT_APP_INFURA_API_KEY = ****
REACT_APP_ACCESS_KEY = ****
REACT_APP_SECRET_KEY = ****
```

- frontend/.env.production.local

```
REACT_APP_KAKAO_CLIENT_ID = ****
```

- backend/application-production-secret.yml

```yml
spring.datasource:
  username: ****
  password: ****

jwt.secret: ****

com.ssafy.kakao.client_id: ****
```

- backeth/.env.production4server

```
APP_NODE_ENDPOINT = "http://host.docker.internal:9425"
APP_ACCOUNT_PRIVATE_KEY = ****
```
