@echo off

docker stop "backeth"

docker rm "backeth"

docker build --tag "sp7333/backeth" .

docker image prune --force

docker run -d -p "8082:3000" --add-host=host.docker.internal:host-gateway --name "backeth" "sp7333/backeth"

pause
