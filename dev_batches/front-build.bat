@echo off

docker stop "frontend"

docker rm "frontend"

docker build --tag "sp7333/frontend" ..\frontend

docker image prune --force
