@echo off

docker stop "backeth"

docker rm "backeth"

docker run -p "8082:3000" -e "PORT=3000" -e "runscript=start" -e "APP_NODE_ENDPOINT=http://host.docker.internal:7545" --add-host=host.docker.internal:host-gateway --name "backeth" "sp7333/backeth"
