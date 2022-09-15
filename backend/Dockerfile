FROM openjdk:11
ARG JAR_FILE=target/*.jar
ENV PF_PROFILE                  = _ \
    muPROFILE                   = _ \
    PF_DB_ADDRESS               = _ \
    DB_ADDRESS                  = _ \
    PF_DB_PASSWORD              = _ \
    DB_PASSWORD                 = _ \
    PF_JWT_SECRET               = _ \
    JWT_SECRET                  = _ \
    PF_KAKAO_CLIENT_ID          = _ \
    KAKAO_CLIENT_ID             = _ \
    PF_KAKAO_LOGIN_REDIRECT_URI = _ \
    KAKAO_LOGIN_REDIRECT_URI    = _
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "${PF_PROFILE}${PROFILE}", "${PF_DB_ADDRESS}${DB_ADDRESS}", "${PF_DB_PASSWORD}${DB_PASSWORD}", "${PF_JWT_SECRET}${JWT_SECRET}", "${PF_KAKAO_CLIENT_ID}${KAKAO_CLIENT_ID}", "${PF_KAKAO_LOGIN_REDIRECT_URI}${KAKAO_LOGIN_REDIRECT_URI}", "-jar", "/app.jar"]
