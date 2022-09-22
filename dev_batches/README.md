## Batch files for dev on Windows

### Prerequisites

- Docker Desktop 이 실행되어 있어야 함
- backend 컨테이너 한정, MySQL 이 실행되어 있어야 함 (b106 DB, root, root)

### Batches

한 번이라도 all 이나 build 를 한 컨테이너에 대해서는 이후에 run 만 해도 돌아감

소스가 변경되었다면 all 이나 build 를 해야 변경사항이 반영됨

- front-\*.bat
  - frontend 컨테이너
- back-\*.bat
  - backend 컨테이너
- \*-all.bat
  - 빌드, 실행 모두 함
- \*-build.bat
  - 빌드만 함
- \*-run.bat
  - 실행만 함 (기존에 빌드가 되어 있어야 함)
- \*-stop.bat
  - 실행중인 컨테이너를 중단함

### Containers

backend: 8080번 포트, devdocker 프로파일 사용

frontend: 3000번 포트, default 프로파일 사용
