pipeline {
  agent any

  environment {
    JVM_OPTIONS = """\
      -Dspring.profiles.active=production\
      -Dcom.ssafy.db.address_and_port=${credentials('db.address_and_port')}\
      -Dcom.ssafy.db.username=${credentials('db.username')}\
      -Dcom.ssafy.db.password=${credentials('db.password')}\
      -Dcom.ssafy.jwt.secret=${credentials('jwt.secret')}\
      -Dcom.ssafy.kakao.client_id=${credentials('kakao.client_id')}\
      -Dcom.ssafy.kakao.redirect_uri=${credentials('kakao.redirect_uri')}\
    """
  }

  stages {
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
