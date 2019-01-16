pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Release') {
      steps {
        sh 'npm run release'
      }
    }
  }
}
