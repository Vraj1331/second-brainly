pipeline {
    agent any

    triggers {
        githubPush() // Trigger build on GitHub push
    }

    environment {
        NODE_VERSION  = '20'
        BUN_VERSION   = '1.0.0'
        DOCKER_IMAGE  = 'second-brainly-app'
        DOCKER_TAG    = "${BUILD_NUMBER}"
        PATH          = "$HOME/.bun/bin:$PATH"
    }

    stages {
        // ---------------------
        // 1. Checkout repository
        // ---------------------
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vraj1331/second-brainly.git'
            }
        }

        // ---------------------
        // 2. Setup Bun (if not installed)
        // ---------------------
        stage('Setup Bun') {
            steps {
                script {
                    sh '''
                        if ! command -v bun &> /dev/null; then
                            echo "Installing Bun..."
                            curl -fsSL https://bun.sh/install | bash
                            export PATH="$HOME/.bun/bin:$PATH"
                        fi
                    '''
                }
            }
        }

        // ---------------------
        // 3. Install dependencies
        // ---------------------
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'bun install'
                }
            }
        }

        // ---------------------
        // 4. Build backend Docker image
        // ---------------------
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ./backend"
                }
            }
        }

        // ---------------------
        // 5. Run container on separate port and network
        // ---------------------
        stage('Run Container') {
            steps {
                script {
                    echo "Running container ${DOCKER_IMAGE}-container"
                    sh """
                        docker rm -f ${DOCKER_IMAGE}-container || true
                        docker run -d --name ${DOCKER_IMAGE}-container -p 3001:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker network connect second-brainly-network ${DOCKER_IMAGE}-container || true
                    """
                }
            }
        }

        // ---------------------
        // 6. Optional: Run frontend build (if needed)
        // ---------------------
        stage('Build Frontend') {
            steps {
                dir('brainly-frontend') {
                    sh 'bun install'
                    sh 'bun run build'
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}
