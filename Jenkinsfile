pipeline {
  agent any

  environment {
    JWT_SECRET = credentials('jwt.secret')
    KAKAO_CLIENT_ID = credentials('kakao.client_id')
    KAKAO_LOGIN_REDIRECT_URI = "https://j7b106.p.ssafy.io/loginresult"

    JVM_OPTIONS = """\
      -Dspring.profiles.active=production\
      -Dcom.ssafy.db.address_and_port=${credentials('db.address_and_port')}\
      -Dcom.ssafy.db.password=${credentials('db.password')}\
      -Dcom.ssafy.jwt.secret=${JWT_SECRET}\
      -Dcom.ssafy.kakao.client_id=${KAKAO_CLIENT_ID}\
      -Dcom.ssafy.kakao.redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}\
    """
  }

  stages {
    stage('echo_jvm_options') {
      steps {
        sh 'echo ${JVM_OPTIONS}'
      }
    }

    stage('ls_before') {
      steps {
        dir('backend') {
          sh 'echo backend'
          sh 'ls'
        }
      }
    }

    stage('backend_build') {
      steps {
        dir('backend') {
          sh './gradlew clean build ${JVM_OPTIONS}'
        }
      }
    }

    stage('ls_after') {
      steps {
        dir('backend') {
          sh 'echo backend'
          sh 'ls'
        }

        dir('backend/build') {
          sh 'echo backend build'
          sh 'ls'
        }

        dir('backend/build/libs') {
          sh 'echo backend build libs'
          sh 'ls'
        }
      }
    }
  }
}
