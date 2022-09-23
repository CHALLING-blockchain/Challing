@echo off

docker stop "frontend"

docker rm "frontend"

docker run -p "3000:80" --name "frontend" "sp7333/frontend"
