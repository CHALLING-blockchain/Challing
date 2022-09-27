@echo off

docker stop "backeth"

docker rm "backeth"

docker run -p "8082:3000" --add-host=host.docker.internal:host-gateway --name "backeth" "sp7333/backeth"
