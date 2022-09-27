@echo off

docker stop "backeth"

docker rm "backeth"

docker build --file "../backeth/Dockerfile" --tag "sp7333/backeth" ..

docker image prune --force
