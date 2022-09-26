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

    stage('git_clean') {
      steps {
        sh 'git clean --force'
      }
    }

    stage('set_env_files') {
      steps {
        dir('frontend') {
          // 크리덴셜의 경우 문자열 대체하지 않고 변수명을 그대로 씀
          sh 'cp $FRONTEND_DEFAULT ./.env.local'
          sh 'cp $FRONTEND_PRODUCTION ./.env.production.local'
        }

        dir('backend/src/main/resources') {
          sh 'cat $BACKEND_PRODUCTION >> ./application-production.yml'
        }
      }
    }

    stage('stop_running_containers') {
      steps {
        catchError {
          sh "docker stop ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER}"
        }
      }
    }

    stage('remove_containers') {
      steps {
        catchError {
          sh "docker rm ${BACKEND_CONTAINER} ${FRONTEND_CONTAINER}"
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

            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
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
                    message: "Deploying frontend complete${MSGSUFFIX}\n\n[페이지](https://j7b106.p.ssafy.io/)"
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

            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
                }
              }
            }

            stage('backend_serve') {
              steps {
                sh "docker run -d -p 8080:8080 -e profile=production --name ${BACKEND_CONTAINER} ${BACKEND_IMAGE}"
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
      }
    }

    stage('mattermost_send_end') {
      steps {
        catchError {
          mattermostSend(
            color: '#3399FF',
            text: MMACCOUNT,
            message: "Job end${MSGSUFFIX}"
          )
        }
      }
    }
  }
}
