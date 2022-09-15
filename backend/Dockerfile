FROM openjdk:11
ARG JAR_FILE=target/*.jar
ARG PROFILE
ARG
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java -jar /app.jar"]
