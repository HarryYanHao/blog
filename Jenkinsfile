pipeline {
    agent any
    parameters {
        string(name: 'tag', defaultValue: 'default value', description: '自定义字符串参数')
    }
    stages {
        stage('Build') {
            steps {
                dir('/Users/harry/docker/blog'){
                    sh 'echo "Hello World"'
                    sh 'ls -l'
                    echo "自定义字符串参数值: ${params.tag}"
                }
            
            }
            
        }
    }
}