@echo off

docker stop "backend"

docker rm "backend"

docker build --tag "sp7333/backend" ..\backend

docker image prune --force

docker run -p "8080:8080" -e "profile=devdocker" --name "backend" "sp7333/backend"
