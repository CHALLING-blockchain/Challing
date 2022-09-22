pipeline {
  agent any

  environment {
    FRONTEND_DEFAULT = credentials('frontend_default')
    FRONTEND_PRODUCTION = credentials('frontend_production')
    BACKEND_PRODUCTION = credentials('backend_production')

    FRONTEND_IMAGE = 'sp7333/frontend'
    FRONTEND_CONTAINER = 'frontend'
    BACKEND_IMAGE = 'sp7333/backend'
    BACKEND_CONTAINER = 'backend'
  }

  stages {
    stage('mattermost_send_start') {
      steps {
        catchError {
          mattermostSend(
            color: "#FFF33C",
            message: "Job start\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>\n@wp29dud"
          )
        }
      }
    }

    stage('git_clean') {
      steps {
        sh 'git clean --force'
      }
    }

    stage('set_env_files') {
      steps {
        dir('frontend') {
          sh 'cp ${FRONTEND_DEFAULT} ./.env.local'
          sh 'cp ${FRONTEND_PRODUCTION} ./.env.production.local'
        }

        dir('backend/src/main/resources') {
          sh 'cat ${BACKEND_PRODUCTION} >> ./application-production.yml'
        }
      }
    }

    stage('stop_running_containers') {
      steps {
        catchError {
          sh 'docker stop ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER}'
        }
      }
    }

    stage('remove_containers') {
      steps {
        catchError {
          sh 'docker rm ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER}'
        }
      }
    }

    stage('remove_images') {
      steps {
        catchError {
          sh 'docker image rm ${BACKEND_IMAGE} ${FRONTEND_IMAGE}'
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

    stage('deploy') {
      parallel {
        stage('frontend') {
          stages {
            stage('frontend_build') {
              steps {
                dir('frontend') {
                  sh 'docker build --build-arg runscript=buildprod --tag ${FRONTEND_IMAGE} .'
                }
              }
            }

            stage('frontend_serve') {
              steps {
                sh 'docker run -d -p 8081:80 --name ${FRONTEND_CONTAINER} ${FRONTEND_IMAGE}'
              }
            }

            stage('mattermost_send_frontend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: "#52C606",
                    message: "Deploying frontend complete\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>"
                  )
                }
              }
            }
          }
        }

        stage('backend') {
          stages {
            stage('backend_build') {
              steps {
                dir('backend') {
                  sh 'docker build --tag ${BACKEND_IMAGE} .'
                }
              }
            }

            stage('backend_serve') {
              steps {
                sh 'docker run -d -p 8080:8080 -e profile=production --name ${BACKEND_CONTAINER} ${BACKEND_IMAGE}'
              }
            }

            stage('mattermost_send_backend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: "#52C606",
                    message: "Deploying backend complete\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>"
                  )
                }
              }
            }
          }
        }
      }
    }

    stage('mattermost_send_end') {
      steps {
        catchError {
          mattermostSend(
            color: "#3399FF",
            message: "Job end\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>\n@wp29dud"
          )
        }
      }
    }
  }
}
