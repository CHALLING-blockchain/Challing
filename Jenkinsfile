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

    BACKEND_IMAGE = 'sp7333/backend'
    BACKEND_CONTAINER = 'backend'
    FRONTEND_IMAGE = 'sp7333/frontend'
    FRONTEND_CONTAINER = 'frontend'
  }

  stages {
    stage('stop_running_containers') {
      steps {
        catchError {
          sh 'docker stop ${BACKEND_CONTAINER}'
        }
      }
    }

    stage('remove_container') {
      steps {
        catchError {
          sh 'docker rm ${BACKEND_CONTAINER}'
        }
      }
    }

    stage('remove_image') {
      steps {
        catchError {
          sh 'docker image rm ${BACKEND_IMAGE}'
        }
      }
    }

    stage('prune_images') {
      steps {
        catchError {
          sh 'docker image prune --force'
        }
      }
    }

    stage('backend_build') {
      steps {
        dir('backend') {
          sh './gradlew clean bootJar ${PF_PROFILE}${PROFILE} ${PF_DB_ADDRESS}${DB_ADDRESS} ${PF_DB_PASSWORD}${DB_PASSWORD} ${PF_JWT_SECRET}${JWT_SECRET} ${PF_KAKAO_CLIENT_ID}${KAKAO_CLIENT_ID} ${PF_KAKAO_LOGIN_REDIRECT_URI}${KAKAO_LOGIN_REDIRECT_URI}'
        }
      }
    }

    stage('backend_docker_image') {
      steps {
        dir('backend') {
          sh 'docker build --build-arg JAR_FILE=build/libs/*.jar --tag ${BACKEND_IMAGE} .'
        }
      }
    }

    stage('backend_docker_container') {
      steps {
        // sh 'docker run --name ${BACKEND_CONTAINER} -p 8080:8080 ${BACKEND_IMAGE} java ${PF_PROFILE}${PROFILE} ${PF_DB_ADDRESS}${DB_ADDRESS} ${PF_DB_PASSWORD}${DB_PASSWORD} ${PF_JWT_SECRET}${JWT_SECRET} ${PF_KAKAO_CLIENT_ID}${KAKAO_CLIENT_ID} ${PF_KAKAO_LOGIN_REDIRECT_URI}${KAKAO_LOGIN_REDIRECT_URI} -jar app.jar'
        sh 'docker run --name ${BACKEND_CONTAINER} -p 8080:8080 ${BACKEND_IMAGE} echo hello'
      }
    }
  }
}
