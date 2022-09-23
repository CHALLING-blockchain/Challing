@echo off

docker stop "backend"

docker rm "backend"

docker run -p "8080:8080" -e "profile=devdocker" --name "backend" "sp7333/backend"
