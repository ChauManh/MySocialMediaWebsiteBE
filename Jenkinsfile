pipeline {
  agent any

  environment {
    IMAGE_NAME = "chaumanh/socialmediaservice"
    CONTAINER_NAME = "socialmediaservice"
    REGISTRY_CREDENTIALS = credentials('dockerhub-cred') // tạo trong Jenkins
  }

  stages {
    stage('Pull github project') {
      steps {
        git 'https://github.com/ChauManh/socialmediaserviceBE.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}")
        }
      }
    }

    stage('Login Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-cred') {
            echo "Logged in Docker Hub"
          }
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-cred') {
            def image = docker.build("${IMAGE_NAME}")
            image.push('latest')
          }
        }
      }
    }

    stage('Deploy') {
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
