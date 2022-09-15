FROM openjdk:11
ARG JAR_FILE=target/*.jar
ENV JO_PROFILE=_ \
    JO_DB_ADDRESS=_ \
    JO_DB_PASSWORD=_ \
    JO_JWT_SECRET=_ \
    JO_KAKAO_CLIENT_ID=_ \
    JO_KAKAO_LOGIN_REDIRECT_URI=_
COPY ${JAR_FILE} app.jar
ENTRYPOINT java \
    ${JO_PROFILE} \
    ${JO_DB_ADDRESS} \
    ${JO_DB_PASSWORD} \
    ${JO_JWT_SECRET} \
    ${JO_KAKAO_CLIENT_ID} \
    ${JO_KAKAO_LOGIN_REDIRECT_URI} \
    -jar /app.jar
