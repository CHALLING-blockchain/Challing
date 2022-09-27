@echo off

docker stop "backeth"

docker rm "backeth"

docker build --file "../backeth/Dockerfile" --tag "sp7333/backeth" ..

docker image prune --force

docker run -p "8082:3000" --add-host=host.docker.internal:host-gateway --name "backeth" "sp7333/backeth"
