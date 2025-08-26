pipeline {
    agent any

    triggers {
        // Runs build when GitHub webhook fires
        githubPush()
    }

    environment {
        NODE_VERSION  = '20'
        BUN_VERSION   = '1.0.0'
        DOCKER_IMAGE  = 'second-brainly-app'
        DOCKER_TAG    = "${BUILD_NUMBER}"
        PATH          = "$HOME/.bun/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vraj1331/second-brainly.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    echo "Running container from image ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh """
                        docker rm -f ${DOCKER_IMAGE}-container || true
                        docker run -d --name ${DOCKER_IMAGE}-container -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
