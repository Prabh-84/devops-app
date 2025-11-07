pipeline {
    agent any

    environment {
        DOCKER_USER = "prabh84"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t devops-app ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat "docker login -u %USER% -p %PASS%"
                    bat "docker tag devops-app %DOCKER_USER%/devops-app:latest"
                    bat "docker push %DOCKER_USER%/devops-app:latest"
                }
            }
        }

        stage('Trigger Render Deploy') {
            steps {
                withCredentials([string(credentialsId: 'render_webhook', variable: 'HOOK_URL')]) {
                    bat "curl -X POST %HOOK_URL%"
                }
            }
        }

        stage('Deploy Locally on Jenkins Server (Optional)') {
            steps {
                bat 'docker rm -f devops-app || exit 0'
                bat 'docker run -d --name devops-app -p 3000:3000 devops-app'
            }
        }
    }

    post {
        success {
            echo '🎉 CI/CD Pipeline Success! Image pushed & Render Deploy Triggered.'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
