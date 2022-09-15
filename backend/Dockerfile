FROM openjdk:11
ARG JAR_FILE=target/*.jar
ARG JVM_OPTIONS
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "${JVM_OPTIONS}","-jar","/app.jar"]
