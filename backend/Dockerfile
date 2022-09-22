FROM gradle:jdk11-alpine as build-stage
WORKDIR /workdir/
COPY . .
RUN gradle clean bootJar

FROM adoptopenjdk/openjdk11:jre-11.0.16.1_1-alpine
COPY --from=build-stage /workdir/build/libs/backend-0.1.0-SNAPSHOT.jar /jar/app.jar
ENV profile default
EXPOSE 8080
ENTRYPOINT java -Dspring.profiles.active=$profile -jar /jar/app.jar
