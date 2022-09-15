pipeline {
  agent any

  environment {
    PROFILE = 'produnction'
    JO_PROFILE = '-Dspring.profiles.active=' + PROFILE
    JO_DB_ADDRESS = 'Dcom.ssafy.db.address_and_port=' + credentials('db.address_and_port')
    JO_DB_PASSWORD = '-Dcom.ssafy.db.password=' + credentials('db.password')
    JO_JWT_SECRET = '-Dcom.ssafy.jwt.secret=' + credentials('jwt.secret')
    JO_KAKAO_CLIENT_ID = '-Dcom.ssafy.kakao.client_id=' + credentials('kakao.client_id')
    KAKAO_LOGIN_REDIRECT_URI = 'https://j7b106.p.ssafy.io/loginresult'
    JO_KAKAO_LOGIN_REDIRECT_URI = '-Dcom.ssafy.kakao.redirect_uri=' + KAKAO_LOGIN_REDIRECT_URI

    BACKEND_IMAGE_TAG = 'backend/firstcontainer'
  }

  stages {
    stage('backend_build') {
      steps {
        dir('backend') {
          sh './gradlew clean bootJar ${JO_PROFILE} ${JO_DB_ADDRESS} ${JO_DB_PASSWORD} ${JO_JWT_SECRET} ${JO_KAKAO_CLIENT_ID} ${JO_KAKAO_LOGIN_REDIRECT_URI}'
        }
      }
    }

    stage('backend_docker_build') {
      steps {
        dir('backend') {
          sh 'docker build --build-arg JAR_FILE=build/libs/*.ja --build-arg JO_PROFILE=${JO_PROFILE} --build-arg JO_DB_ADDRESS=${JO_DB_ADDRESS} --build-arg JO_DB_PASSWORD=${JO_DB_PASSWORD} --build-arg JO_JWT_SECRET=${JO_JWT_SECRET} --build-arg JO_KAKAO_CLIENT_ID=${JO_KAKAO_CLIENT_ID} -t ${BACKEND_IMAGE_TAG} .'
        }
      }
    }
  }
}
