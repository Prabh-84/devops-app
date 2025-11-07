pipeline {
    agent any

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
                bat 'docker build -t devops-app .'
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop old container if running
                bat 'docker stop devops-app || exit 0'
                
                // Remove old container if exists
                bat 'docker rm devops-app || exit 0'
                
                // Run new container
                bat 'docker run -d --name devops-app -p 3000:3000 devops-app'
            }
        }
    }

    post {
        success {
            echo '✅ Build and Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
