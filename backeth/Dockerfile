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
