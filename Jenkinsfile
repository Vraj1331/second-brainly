
pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        BUN_VERSION = '1.0.0'
        DOCKER_IMAGE = 'second-brainly-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    tools {
        nodejs "NodeJS-${NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Bun') {
            steps {
                sh '''
                    if ! command -v bun &> /dev/null; then
                        echo "Installing Bun..."
                        curl -fsSL https://bun.sh/install | bash
                        export PATH="$HOME/.bun/bin:$PATH"
                    fi
                '''
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh '''
                                export PATH="$HOME/.bun/bin:$PATH"
                                bun install
                            '''
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('brainly-frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Backend Build') {
                    steps {
                        dir('backend') {
                            sh '''
                                export PATH="$HOME/.bun/bin:$PATH"
                                bun run build
                            '''
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        dir('brainly-frontend') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    if (fileExists('Dockerfile')) {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    } else {
                        echo "No Dockerfile found, skipping Docker build"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                echo "Deploying to staging..."
                // staging deploy logic here
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
