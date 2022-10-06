## 개발용 빌드

Dockerfile 및 커맨드로 정리 (선행 조건 및 자세한 내용은 [dev_batches](../../dev_batches/) 참고)

### Smart Contract

- 로컬 Ethereum Network 구동

```cmd
ganache-cli -d -p 7545 --gasLimit=2000000000 --allow-unlimited-contract-size -m "<MNEMONIC_PHRASE>"
```

- Truffle CLI 로 컨트랙트 배포 및 마이그레이션
    - truffle/ 폴더에서 다음을 실행

```cmd
npx truffle migrate --reset --compile-all --network loc_dev --config truffle-config-dev.js
```

### Frontend

- frontend/Dockerfile

```Dockerfile
FROM node:16.17.0-alpine as build-stage
WORKDIR /workdir/
COPY package*.json ./
RUN npm install
COPY . .
ARG runscript=build
RUN npm run ${runscript}

FROM nginx:stable-alpine
COPY --from=build-stage /workdir/default.conf /etc/nginx/conf.d/
COPY --from=build-stage /workdir/build/ /usr/share/nginx/html/
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
```

- dev_batches/front-all.bat

```cmd
docker stop "forntend"
docker rm "frontend"
docker build --tag "sp7333/frontend" ..\frontend
docker image prune --force
docker run -p "3000:80" --name "frontend" "sp7333/frontend"
```

### Backend (Main)

- backend/Dockerfile

```Dockerfile
FROM gradle:jdk11-alpine as build-stage
WORKDIR /workdir/
COPY . .
RUN gradle clean bootJar

FROM eclipse-temurin:11.0.16.1_1-jre-alpine
COPY --from=build-stage /workdir/build/libs/backend-0.1.0-SNAPSHOT.jar /jar/app.jar
ENV profile default
EXPOSE 8080
ENTRYPOINT java -Dspring.profiles.active=$profile -jar /jar/app.jar
```

- dev_batches/back-all.bat

```cmd
docker stop "backend"
docker rm "backend"
docker build --tag "sp7333/backend" ..\backend
docker image prune --force
docker run -p "8080:8080" -e "profile=devdocker" --name "backend" "sp7333/backend"
```

### Backend (Web3)

- backeth/Dockerfile

```Dockerfile
# Building directory is ..(project root)
# docker build --file (project root)/backeth/Dockerfile --tag sp7333/backeth (project root)

FROM node:16.17.0-alpine
WORKDIR /workdir/
COPY backeth/ ./
RUN npm install
COPY frontend/src/contracts/ src/artifacts/
ENV runscript=prod \
  PORT=3000 \
  APP_CONTRACT_ARTIFACT_DIR=./src/artifacts
EXPOSE ${PORT}
ENTRYPOINT npm run ${runscript}
```

- dev_batches/express.bat

```cmd
docker stop "backeth"
docker rm "backeth"
docker build --file "../backeth/Dockerfile" --tag "sp7333/backeth" ..
docker image prune --force
docker run -p "8082:3000" -e "PORT=3000" -e "runscript=start" -e "APP_NODE_ENDPOINT=http://host.docker.internal:7545" --add-host=host.docker.internal:host-gateway --name "backeth" "sp7333/backeth"
```
