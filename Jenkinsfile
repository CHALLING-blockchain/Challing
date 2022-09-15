pipeline {
  agent any

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
          sh './gradlew clean build'
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
