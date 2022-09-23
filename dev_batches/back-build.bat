@echo off

docker stop "backend"

docker rm "backend"

docker build --tag "sp7333/backend" ..\backend

docker image prune --force
