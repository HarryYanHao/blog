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

--rm：当容器停止时自动删除容器。

--restart：设置容器的重启策略，如 always、on-failure。

## 进入容器
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