FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["echo", "${TETE}"]
#, "sh", "-c", "java -Dspring.profiles.active=${TETE} ${JO_PROFILE} ${JO_DB_ADDRESS} ${JO_DB_PASSWORD} ${JO_JWT_SECRET} ${JO_KAKAO_CLIENT_ID} ${JO_KAKAO_LOGIN_REDIRECT_URI} -jar /app.jar"]
