pipeline {
  agent any

  environment {
    // 환경변수 파일을 젠킨스 크리덴셜로부터 가져옴
    FRONTEND_DEFAULT = credentials('frontend_default')
    FRONTEND_PRODUCTION = credentials('frontend_production')
    BACKEND_PRODUCTION = credentials('backend_production')

    // 도커 이미지, 컨테이너 이름
    FRONTEND_IMAGE = 'sp7333/frontend'
    FRONTEND_CONTAINER = 'frontend'
    BACKEND_IMAGE = 'sp7333/backend'
    BACKEND_CONTAINER = 'backend'
    BACKETH_IMAGE = 'sp7333/backeth'
    BACKETH_CONTAINER = 'backeth'

    // 젠킨스 MM 플러그인, Blue Ocean 플러그인 관련
    MMACCOUNT = '@wp29dud'
    MSGSUFFIX = "\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>"
  }

  stages {
    stage('mattermost_send_start') {
      steps {
        catchError {
          mattermostSend(
            color: '#FFF33C',
            text: MMACCOUNT,
            message: "Job start${MSGSUFFIX}"
          )
        }
      }
    }

    stage('pre_deploy') {
      parallel {
        stage('file_work') {
          stages {
            stage('git_clean') {
              steps {
                sh 'git clean --force'
              }
            }

            stage('set_files') {
              steps {
                sh '\
                  cp $FRONTEND_DEFAULT frontend/.env.local & \
                  cp $FRONTEND_PRODUCTION frontend/.env.production.local & \
                  cp -R ../contracts frontend/src & \
                  cat $BACKEND_PRODUCTION >> backend/src/main/resources/application-production.yml & \
                '
              }
            }
          }
        }

        stage('docker_work') {
          stages {
            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
                }
              }
            }

            stage('remove_containers') {
              steps {
                catchError {
                  sh "docker rm --force ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER} ${BACKETH_CONTAINER}"
                }
              }
            }
          }
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
                  sh "docker build --build-arg runscript=buildprod --tag ${FRONTEND_IMAGE} ."
                }
              }
            }

            stage('frontend_serve') {
              steps {
                sh "docker run -d -p 8081:80 --name ${FRONTEND_CONTAINER} ${FRONTEND_IMAGE}"
              }
            }

            stage('mattermost_send_frontend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Deploying frontend complete${MSGSUFFIX}"
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
                  sh "docker build --tag ${BACKEND_IMAGE} ."
                }
              }
            }

            stage('backend_serve') {
              steps {
                sh "docker run -d -p 8080:8080 -e profile=production --add-host=host.docker.internal:host-gateway --name ${BACKEND_CONTAINER} ${BACKEND_IMAGE}"
              }
            }

            stage('mattermost_send_backend_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Deploying backend complete${MSGSUFFIX}"
                  )
                }
              }
            }
          }
        }

        // TODO:
        //   env 파일 세팅
        //   APP_NODE_ENDPOINT
        //   APP_ACCOUNT_PRIVATE_KEY
        stage('backeth') {
          stages {
            stage('backeth_build') {
              steps {
                sh "docker build --file backeth/Dockerfile --tag ${BACKETH_IMAGE} ."
              }
            }

            stage('backeth_serve') {
              sh "docker run -d -p 8082:3000 --add-host=host.docker.internal:host-gateway --name ${BACKETH_CONTAINER} ${BACKETH_IMAGE}"
            }

            stage('mattermost_send_backeth_complete') {
              steps {
                catchError {
                  mattermostSend(
                    color: '#52C606',
                    message: "Launching backeth complete${MSGSUFFIX}"
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
            color: '#3399FF',
            text: MMACCOUNT,
            message: "Job end${MSGSUFFIX}\n\nhttps://j7b106.p.ssafy.io/"
          )
        }
      }
    }
  }
}
