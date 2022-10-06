pipeline {
  agent any

  // 파이프라인에서 사용할 변수 설정
  environment {
    // 환경변수 파일을 젠킨스 크리덴셜로부터 가져옴
    // 그렇게 하기 위해서 Manage Jenkins > Manage Credentials 에서 크리덴셜 등록 (Kind: Secret file)
    FRONTEND_DEFAULT = credentials('frontend_default')
    FRONTEND_PRODUCTION = credentials('frontend_production')
    BACKEND_PRODUCTION = credentials('backend_production')
    BACKEND_PRODUCTION_DEMO = credentials('backend_production_demo')
    BACKETH_PRODUCTION = credentials('backeth_production')

    // 도커 이미지, 컨테이너 이름
    FRONTEND_IMAGE = 'sp7333/frontend'
    FRONTEND_CONTAINER = 'frontend'
    BACKEND_IMAGE = 'sp7333/backend'
    BACKEND_CONTAINER = 'backend'
    BACKETH_IMAGE = 'sp7333/backeth'
    BACKETH_CONTAINER = 'backeth'

    // MM 플러그인, Blue Ocean 플러그인 관련
    MMACCOUNT = '@wp29dud' // @아이디 사용 (언급시 알림)
    MSGSUFFIX = "\nBuild <${RUN_DISPLAY_URL}|#${BUILD_NUMBER}>" // 메시지에 일괄적으로 달릴 링크
  }

  stages {
    // 작업 개시 알림
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

    // 빌드 전 정리 작업
    stage('pre_deploy') {
      // 병렬 처리 (파일 작업과 도커 작업)
      parallel {
        // 파일 (환경 변수) 세팅
        stage('file_work') {
          stages {
            // 변경 사항을 지움 (백엔드 application-production.yml 때문)
            stage('git_clean') {
              steps {
                sh 'git clean --force'
              }
            }

            // 파일 세팅
            stage('set_files') {
              steps {
                sh '\
                  cp $FRONTEND_DEFAULT frontend/.env.local & \
                  cp $FRONTEND_PRODUCTION frontend/.env.production.local & \
                  cp $BACKETH_PRODUCTION backeth/.env.production & \
                  cat $BACKEND_PRODUCTION >> backend/src/main/resources/application-production.yml & \
                '
                // cp -R ../contracts frontend/src & \
                // 위와 같이 저장소에 ignore 됐던 컨트랙트 복사 작업도 있었으나
                // 도중에 저장소에 트래킹하게 돼서 불필요해짐
              }
            }
          }
        }

        // 도커 관련 작업
        stage('docker_work') {
          stages {
            // 안 쓰이는 이미지 제거
              // 하지 않으면 서버가 아파함
            stage('prune_images') {
              steps {
                catchError {
                  sh 'docker image prune --force'
                }
              }
            }

            // 같은 이름을 계속 사용하기 때문에 현재 작동 중인 컨테이너를 지움
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

    // 배포 본 작업
    stage('deploy') {
      // 병렬 처리 (프론트엔드와 백엔드)
      parallel {
        // 프론트엔드
        stage('frontend') {
          stages {
            // Build
            stage('frontend_build') {
              steps {
                dir('frontend') {
                  sh "docker build --build-arg runscript=buildprod --tag ${FRONTEND_IMAGE} ."
                }
              }
            }

            // Run
            stage('frontend_serve') {
              steps {
                sh "docker run -d -p 8081:80 --name ${FRONTEND_CONTAINER} ${FRONTEND_IMAGE}"
              }
            }

            // 알림
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

        // 백엔드
        stage('backend') {
          stages {
            // Express Build
            stage('backeth_build') {
              steps {
                sh "docker build --file backeth/Dockerfile --tag ${BACKETH_IMAGE} ."
              }
            }

            // Express Run
            stage('backeth_run') {
              steps {
                sh "docker run -d -p 8082:3000 --add-host=host.docker.internal:host-gateway --name ${BACKETH_CONTAINER} ${BACKETH_IMAGE}"
              }
            }

            // Express 알림
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

            // 스프링 Build
            stage('backend_build') {
              steps {
                dir('backend') {
                  sh "docker build --tag ${BACKEND_IMAGE} ."
                }
              }
            }

            // 스프링 Run
            stage('backend_serve') {
              steps {
                sh "docker run -d -p 8080:8080 -e profile=production --add-host=host.docker.internal:host-gateway --name ${BACKEND_CONTAINER} ${BACKEND_IMAGE}"
              }
            }

            // 알림
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

    // 작업 종료 알림
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
