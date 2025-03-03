---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---

# Docker 使用
[[toc]]
## docker 简介
docker 是一个开源的容器平台，可以轻松将应用程序打包成镜像，然后发布到任何流行的主机上。 

docker 运行在 Linux 或 Windows 上，并且可以管理 Linux 或 Windows 上运行的容器。 

docker 旨在使开发人员能够快速、轻松地创建、运行、共享和升级应用程序。   

docker可以创建自定义镜像包含开发所需要的环境以及依赖，创建互不影响的沙箱机制容器，互相不会有任何接口
## docker 安装
安装GUI             
[docker官网](https://www.docker.com/)           

MAC Linux Windows 也可使用对应的包管理工具下载              
brew apt-get等 
brew install docker
## docker构建镜像的两种方式
### 通过容器创建
#### 容器提交 
是一种快速创建镜像的方法，它将一个正在运行的容器的当前状态保存为一个新的镜像。
```sh
docker commit container_id my_image:tag
```
:::tip
可以使用docker push 推送到远程仓库 后续使用docker pull拉去新镜像
:::
### 通过Dockerfile创建
```dockerfile
# 基于Node.js的官方Docker镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app
 
# 复制package.json并安装依赖
COPY package.json  /app/


RUN npm cache verify
# 安装项目依赖
RUN npm install



# 复制项目文件并构建VuePress
COPY . /app

 
# 配置VuePress静态文件目录
ENV VUEPRESS_PUBLIC=/app/public
ENV VUEPRESS_DIST=/app/.vuepress/dist
 
# 暴露端口
EXPOSE 8081
 
# # 启动VuePress开发服务器
CMD ["npm", "run", "docs:dev"]
```

#### Dockerfile说明
Dockerfile 是一个文本文件，用来描述如何构建镜像。    

在Docker构建自定义镜像时，Dockerfile是一个至关重要的工具。Dockerfile 是一个文本文件，它包含了一系列指令，用于自动化构建Docker镜像。通过编写Dockerfile，你可以精确地定义构建镜像所需的步骤、依赖关系和配置项。整个过程通常称为“构建”（build）。Dockerfile确保了镜像构建的可重复性和一致性。           

**在构建时，Dockerfile需要在开发项目的根目录下。**

FROM：指定基于哪个镜像来构建。示例中使用了node:14-alpine 镜像。我们可以根据实际需求选择合适的基镜像来构建我们自己的镜像。      

LABEL：为镜像添加元数据，如作者、版本等，便于管理和搜索镜像。            

EXPOSE：声明镜像内服务对外提供的端口号。如果不指定，运行容器时使用 -P 将不会自动映射端口。

WORKDIR：设定镜像的工作目录，即容器内的当前目录（等同于命令 pwd）。

COPY：从宿主机指定目录复制文件到容器内的指定目录。如 
COPY . . 表示将宿主机当前目录下的所有文件复制到容器内的工作目录。        

RUN：在新构建的镜像中执行命令并提交结果。每次 RUN 指令都会在当前镜像层上执行命令，然后生成一个新的镜像层。例如，上面通过 pip 根据 package.json 安装 node 依赖，**命令执行目录为当前工作目录，所以npm install需要用到的 package.json 必须在当前目录下。**

CMD：设置容器启动后默认执行的命令。只有最后一个 CMD 指令会被执行，如果用户在运行容器时指定了命令，则会覆盖 CMD 指定的命令。如 CMD ["npm", "run", "docs:dev"] 表示容器启动时运行 npm run docs:dev。               

ENV：设置环境变量。     

#### 基于Dockerfile构建镜像
在Dockerfile文件同级目录执行 
```sh
docker build -t image_name .
```
### 构建Dockerfile 的优劣

#### 构建Dockerfile的优点：

简化配置：Dockerfile可以包含所有必要的配置步骤，简化了部署过程。

可重复性：相同的Dockerfile会产生相同的容器，确保了可重复性和一致性。

版本控制：Dockerfile和应用程序代码一起进行版本控制，便于追踪和回滚。

易于维护：Dockerfile使得应用程序的构建、配置和依赖关系易于理解和维护。

分层构建：Dockerfile中的每个RUN指令创建一个新的镜像层，减少了镜像大小。

#### 构建Dockerfile的缺点：

增加了学习成本：需要理解Dockerfile的语法和指令。

构建时间：构建大型Docker镜像可能需要较长时间。

构建错误：Dockerfile的错误可能会导致整个构建失败。

安全问题：Dockerfile中可能包含安全敏感的信息，如密码等。

依赖管理：处理Dockerfile中的依赖关系可能复杂，特别是跨多个层时。
## docker网络通信
### 网络驱动
安装 Docker 以后，会默认创建三种网络。
```sh
docker network ls #查看所有的网络
```
- bridge：默认网络，每个容器都有自己的IP地址，默认情况下，容器之间可以通过IP地址进行通信。docker0虚拟网桥，每次重启IP地址有可能发生变化

- host：使用主机网络，容器和主机共享网络命名空间，容器将不会虚拟出自己的网卡，配置自己的 IP 等，而是使用宿主机的 IP 和端口。-p 参数在此网络下不起作用

- none：创建一个空的容器，不启动网络功能。有独立的网络命名空间，但并没有对其进行任何网络设置，如分配 veth pair 和网桥连接，IP 等

可以使用--net host 或者 --network host来指定

### 容器间通信
#### 创建网络连接
```sh
docker network create -d bridge my-bridge-network
```
-d指定网络驱动
在启动容器时使用 --network标志将其连接到网络 --ip指定固定的ip这样每次启动时ip是不会变化的
```sh
docker run -d -v $(pwd):/var/www/html --network=container-network  --ip=172.28.0.101 -p 8089:80 nextcloud #例子
```
不容的网络的容器不能相互通信。如果需要可以将容器添加到同一个网络中。
```sh
docker network connect my_bridge web
```


## 启动容器
```sh
docker run -p 8081:8081 -v $(pwd):/app -it blog --name myblog
```
### 参数说明
-d：在后台运行容器并打印容器的 ID。         

-i：以交互模式运行容器，通常与 -t 同时使用。            

-t：分配一个伪终端，通常与 -i 同时使用。

--name：为容器指定一个名称而不是随机生成。

-p：映射容器端口到主机端口，格式为：hostPort:containerPort。

-v：将主机目录挂载到容器内，格式为：/host/directory:/container/directory。          
**开发环境的构建通常是将项目目录挂载到容器的工作目录下
生产环境通常是将代码和环境同时打包 并不要求挂载项目目录**

--rm：当容器停止时自动删除容器。可用于调试生成需要的文件

--restart：设置容器的重启策略，如 always、on-failure。

### 进入容器
在运行的容器内启动一个交互式bash会话
```sh
docker exec -it myredis /bin/bash
```
## 实际构建
目标是构建一个python+nginx+uwsgi的镜像，模拟生产环境
python使用到的框架是django，该项目具体内容可以看另外一篇笔记

```sh
docker exec -it myredis /bin/bash
```
### Dockerfile文件
```dockerfile
# 基础镜像选择 Python 3.9
FROM python:3.9

# 设置工作目录
WORKDIR /data/python/website

# 复制项目文件到容器内
COPY . /data/python/website

# 安装依赖
RUN pip install -r requirements.txt

# 安装 uwsgi
RUN pip install uwsgi

# 安装 Nginx
RUN apt-get update && \
    apt-get install -y nginx


#脚本权限修改
RUN chmod +x ./boost.sh

#Nginx 配置替换
RUN rm /etc/nginx/sites-enabled/default && cp /data/python/website/default /etc/nginx/sites-enabled/default

# 暴露端口
EXPOSE 8000
EXPOSE 80

# 启动命令
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["./boost.sh"]
# 启动 Nginx 和 uWSGI
#ENTRYPOINT ["bash", "-c"]
#CMD ["nginx && uwsgi --ini website/uwsgi.ini"]

```
新建shell 在启动的时候可以执行脚本中的多条命令,也可以ENTRYPOINT 和 CMD 配合使用 如注释中的例子。

nginx中默认的配置也可以在构建镜像的时候修改

### 遇到的问题
镜像启动容器时，是一种前台活动，容器关闭对应的服务也会停止。
之前是直接部署在机器上，uwsgi.ini配置了常驻启动，所以一直没发现。daemonize=uwsgi.log 使得容器一直尝试在后台运行，这时候就会有异常。   
这同时也提醒了我们，不同的环境所需要的配置是不同的。

## docker实际中的使用
在mac上，推荐使用docker提供的桌面工具docker desktop。它支持可视化的构建、拉取镜像，创建以及管理容器。能直观的分配需要的资源，监控容器运行的情况。
### 项目的运行环境
作为一名后端开发，同时希望在本地搭建前端页面用于学习或者调试，这时候docker可以简单方便的搭建环境。
### 开发的测试环境
不同的项目需要的开发环境不同，比如有些使用的是php7/php8 有些使用的是python。为了避免本地多种环境的杂乱无章，可以使用docker隔离不同环境。不同的环境映射不同的文件，可以方便我们在本地进行调试。值得注意的是，官方提供的docker环境中可能有些插件拓展默认没有安装，但是提供了安装脚本，可以方便的安装。以下是php7 docker环境  安装pdo_mysql的拓展的例子
```sh
#命令加载扩展文件，加载后在/usr/src目录下会多出php目录
docker-php-source extract
#pdo pdo_mysql拓展安装
docker-php-ext-install mysqli pdo pdo_mysql
#pdo_mysql扩展已安装完成，最后将一开始加载的扩展文件收起来
docker-php-source delete
```
后记：因为官方提供的php的docker环境是基于alpine的，所以我当时以为需要使用apk安装一些依赖。但是发现安装失败。经过google后，发现官方提供的php的docker环境是包含拓展文件的，可以按照上述方法直接使用。

### 其他项目的运行环境
最近ai的概念特别火热，于是我想方便的在本地运行一个开源的大模型。这种优秀的项目都提供了docker的一键安装方法，使我能快速的上手体验，比如我使用的是ollama+Open WebUI+qwen模型。都可以使用docker一键安装。


基于ai模型，我在docker上还使用了anythingllm搭建了知识库

为了方便外网访问，于是我用到了ngrok提供的内网穿透技术，这个项目在官网也提供了docker环境。

以上项目的安装方法请参考[ai笔记相关章节](ai.md#本地搭建)
