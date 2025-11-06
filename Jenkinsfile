pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 devops-app'
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
