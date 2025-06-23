pipeline {
  agent any

  environment {
    IMAGE_NAME = "chaumanh/socialmediaservice"
    REGISTRY_CREDENTIALS = 'dockerhub-cred'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            credentialsId: 'github-cred',
            url: 'https://github.com/ChauManh/MySocialMediaWebsiteBE.git'
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CREDENTIALS) {
            def image = docker.build("${IMAGE_NAME}")
            image.push('latest')
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        withCredentials([string(credentialsId: 'ec2-host', variable: 'EC2_HOST')]) {
          sshagent(['ec2-deploy-key']) {
            sh """
              ssh -o StrictHostKeyChecking=no ubuntu@$EC2_HOST '
                cd ~/socialmediaserver &&
                sudo docker stop socialmediaservice || true &&
                sudo docker rm socialmediaservice || true &&
                sudo docker rmi chaumanh/socialmediaservice:latest || true &&
                sudo docker pull chaumanh/socialmediaservice:latest &&
                sudo docker run -d --name socialmediaservice --env-file .env -p 5000:5000 chaumanh/socialmediaservice:latest
              '
            """
          }
        }
      }
    }
  }
}
