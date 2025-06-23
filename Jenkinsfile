pipeline {
  agent any

  environment {
    IMAGE_NAME = "chaumanh/socialmediaservice"
    CONTAINER_NAME = "socialmediaservice"
    REGISTRY_CREDENTIALS = credentials('dockerhub-cred')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            credentialsId: 'github-cred',
            url: 'https://github.com/ChauManh/MySocialMediaWebsiteBE.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}")
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CREDENTIALS) {
            def image = docker.build("${IMAGE_NAME}")
            image.push("latest")
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-deploy-key']) {
          sh '''
          ssh -o StrictHostKeyChecking=no ubuntu@<IP_EC2> << 'ENDSSH'
            cd ~/socialmediaserver
            sudo docker stop socialmediaservice || true
            sudo docker rm socialmediaservice || true
            sudo docker rmi chaumanh/socialmediaservice:latest || true
            sudo docker pull chaumanh/socialmediaservice:latest
            sudo docker run -d --name socialmediaservice --env-file .env -p 5000:5000 chaumanh/socialmediaservice:latest
          ENDSSH
          '''
        }
      }
    }
  }
}
