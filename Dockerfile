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
EXPOSE 3000
 
# # 启动VuePress开发服务器
CMD ["npm", "run", "docs:dev"]
