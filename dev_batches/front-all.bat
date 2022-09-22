@echo off

docker stop "forntend"

docker rm "frontend"

docker build --tag "sp7333/frontend" ..\frontend

docker image prune --force

docker run -p "3000:80" --name "frontend" "sp7333/frontend"
