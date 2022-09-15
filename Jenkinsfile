pipeline {
  agent any

  environment {
    PF_PROFILE = '-Dspring.profiles.active='
    PROFILE = 'produnction'

    PF_DB_ADDRESS = '-Dcom.ssafy.db.address_and_port='
    DB_ADDRESS = credentials('db.address_and_port')

    PF_DB_PASSWORD = '-Dcom.ssafy.db.password='
    DB_PASSWORD = credentials('db.password')

    PF_JWT_SECRET = '-Dcom.ssafy.jwt.secret='
    JWT_SECRET = credentials('jwt.secret')

    PF_KAKAO_CLIENT_ID = '-Dcom.ssafy.kakao.client_id='
    KAKAO_CLIENT_ID = credentials('kakao.client_id')

    PF_KAKAO_LOGIN_REDIRECT_URI = '-Dcom.ssafy.kakao.redirect_uri='
    KAKAO_LOGIN_REDIRECT_URI = 'https://j7b106.p.ssafy.io/loginresult'

    BACKEND_IMAGE_TAG = 'backend/firstcontainer'
  }

  stages {
    stage('backend_build') {
      steps {
        dir('backend') {
          sh './gradlew clean bootJar ${PF_PROFILE}${PROFILE} ${PF_DB_ADDRESS}${DB_ADDRESS} ${PF_DB_PASSWORD}${DB_PASSWORD} ${PF_JWT_SECRET}${JWT_SECRET} ${PF_KAKAO_CLIENT_ID}${KAKAO_CLIENT_ID} ${PF_KAKAO_LOGIN_REDIRECT_URI}${KAKAO_LOGIN_REDIRECT_URI}'
        }
      }
    }

    stage('backend_docker_build') {
      steps {
        dir('backend') {
          sh 'docker build --build-arg JAR_FILE=build/libs/*.jar --build-arg JO_PROFILE=${PF_PROFILE}${PROFILE} --build-arg JO_DB_ADDRESS=${PF_DB_ADDRESS}${DB_ADDRESS} --build-arg JO_DB_PASSWORD=${PF_DB_PASSWORD}${DB_PASSWORD} --build-arg JO_JWT_SECRET=${PF_JWT_SECRET}${JWT_SECRET} --build-arg JO_KAKAO_CLIENT_ID=${PF_KAKAO_CLIENT_ID}${KAKAO_CLIENT_ID -t ${BACKEND_IMAGE_TAG} .'
        }
      }
    }
  }
}
