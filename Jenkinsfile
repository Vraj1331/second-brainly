pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        BUN_VERSION = '1.0.0'
        DOCKER_IMAGE = 'second-brainly-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        PATH = "$HOME/.bun/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Setup Bun') {
            steps {
                script {
                    sh '''
                        if ! command -v bun &> /dev/null; then
                            echo "Installing Bun..."
                            curl -fsSL https://bun.sh/install | bash
                        fi
                    '''
                }
            }
        }

        // Other stages (Install, Build, Docker, Deploy) remain the same
    }

    post {
        always { cleanWs() }
    }
}
