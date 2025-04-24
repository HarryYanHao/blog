def notice(title,message){
    def encodeTitle = java.net.URLEncoder.encode(title, "UTF-8")
    def encodeMessage = java.net.URLEncoder.encode(message, "UTF-8")
    sh "curl -s http://47.115.150.92:8085/MWpHHyPxQDX95ay7cg2bbE/${encodeTitle}/${encodeMessage}"
}
pipeline {
    agent any
    // 定义参数，允许用户选择要拉取的分支
    parameters {
        //choice(name: 'GIT_TAG_BRANCH', choices: ['master', 'dev', 'feature-branch'], description: '选择要构建的分支')
        gitParameter name: 'GIT_REF', type: 'PT_BRANCH_TAG', tagFilter: '*',branchFilter: 'origin/(.*)',branch: '', defaultValue: 'master', sortMode: 'DESCENDING_SMART', selectedValue: 'DEFAULT', quickFilterEnabled: false
    }
    environment {
        // 目标服务器信息
        SERVER_USER = 'root'
        SERVER_HOST = '47.115.150.92'
        SERVER_PORT = '22'
        REMOTE_DIR = '/data'
        // Docker 镜像信息
        IMAGE_NAME = 'harrystart/blog'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'myBlog'
    }
    stages {
        stage('Checkout') {
            steps {
                script{
                    
                        // 尝试检查是否为有效的标签
                        if(sh("git ls-remote --tags origin refs/tags/${GIT_REF}",returnStdout: true)){
                            checkoutRef = "refs/tags/${GIT_REF}"
                        }else{
                             // 如果不是标签，则当作分支处理
                            checkoutRef = ${GIT_REF}
                        }
                        
                    
                }
                // 从 GitHub 特定分支拉取代码
                git branch: checkoutRef, url: 'git@github.com:HarryYanHao/blog.git'
            }
        }
        stage('Package') {
            steps {
                // 打包代码，这里以 tar 为例
                sh 'tar -zcvf code.tar.gz .'
            }
        }
        stage('Upload to Server') {
            steps {
                // 使用 SSH 上传打包后的代码到目标服务器
                sh "scp -P ${SERVER_PORT} code.tar.gz ${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}"
                notice(env.STAGE_NAME,'执行成功')
            }
           
        }
        stage('clean Docker on Server') {
            steps{
                script{
                    if(sh(script: "ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} 'docker ps -q -f name=${CONTAINER_NAME}'", returnStdout: true).trim()){
                        sh """
                        ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} << EOF
                        cd ${REMOTE_DIR}
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
EOF
                        """
                        
                    }
                    if(sh(script: "ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} 'docker images -q ${IMAGE_NAME}:${IMAGE_TAG}'", returnStdout: true)){
                        sh """
                        ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} << EOF
                        cd ${REMOTE_DIR}
                        docker rmi  ${IMAGE_NAME}:${IMAGE_TAG}
EOF
                        """
                        
                    }
                }
                
            }
        }
        stage('Build Docker Image on Server') {
            steps {
                // 使用 SSH 在服务器上解压代码并构建 Docker 镜像
                sh """
                ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} << EOF
                cd ${REMOTE_DIR}
                tar -zxvf code.tar.gz
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                docker run -d --name ${CONTAINER_NAME} -p 8081:8081 ${IMAGE_NAME}:${IMAGE_TAG}
EOF
                """
                notice(env.STAGE_NAME,'部署完成')
            }
        }
    }
}