## Build guide

소스 클론 이후 빌드 밎 배포할 수 있게 정리한 문서

### 빌드 가이드 본문

- [빌드 가이드 본문(./server.md)](./server.md)
	- 내용이 길어서 따로 정리

### 개발용 빌드 참고 문서

- [개발용 빌드 참고 문서(./dev.md)](./dev.md)
	- 이후 본격적으로 개발할 일은 없을 테니 간략히만 정리

### SW 정보

| SW            | version |
| ------------- | --- |
| Docker        | Docker version 20.10.18, build b40c2f6 |
| Nginx         | nginx version: nginx/1.18.0 (Ubuntu) |
| Ganache CLI   | Ganache CLI v6.12.2 (ganache-core: 2.13.2) |
| Truffle       | Truffle v5.5.28 (core: 5.5.28) |
| Node js       | v16.17.0 |
| Java          | Azul Zulu version 11.0.16 |
| MySQL         | Server version: 8.0.28 MySQL Community Server - GPL |
| VS Code       | 1.70.2 |
| IntelliJ IDEA | IntelliJ IDEA 2022.2.2 (Community Edition) |

### 개발 플랫폼, 패키지 매니저, 프레임 워크/라이브러리

| Part           | Platform | PM     | FW/Lib      |
| -------------- | -------- | ------ | ----------- |
| Smart Contract | Node js  | NPM    | Truffle     |
| Frontend       | Node js  | NPM    | React       |
| Backend (Main) | Java     | Gradle | Spring Boot |
| Backend (Web3) | Node js  | NPM    | Express     |
