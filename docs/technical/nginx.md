---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# Nginx学习笔记
## Nginx 介绍
nginx是一款轻量级的Web服务器/反向代理服务器/电子邮件代理服务器。
nginx能做什么   

--web服务(动静分离)   
--负载均衡   
--正向代理   
--反向代理   

### 正向代理
客户没有能力直接访问目标地址，由中间有能力访问的服务器做代理，客户端访问这台服务器，服务器访问地址后将数据原样返回到客户端 eg：最典型的例子 翻墙。   
正向代理最大的特点 客户端明确的知道需要方位的服务器地址，服务器只清楚是哪台代理服务器，并不清楚具体是哪个客户端，正向代理模式隐藏了真实客户端信息。
对于服务器来说客户端是黑盒。   
正向代理配置示例
```
server {  
    resolver 114.114.114.114;       #指定DNS服务器IP地址  
    listen 8080;  
    location / {  
        proxy_pass http://$http_host$request_uri;     #设定代理服务器的协议和地址  
    }  
}  
```

### 反向代理
在分布式部署中，客户端访问反向代理服务器 由该服务器将请求转发到某一服务器上进行业务处理。此时请求来源的客户端信息是明确的，但是由哪个应用服务器处理是不明确的。
对于客户端来说处理业务的服务器是黑盒。   
反向代理配置示例 
```
#http块
upstream abc.harry.com{
	server 192.168.16.85:8882 weight=1;
	server 192.168.16.85:8883 weight=2;
}
#location块
location / {
	···
	proxy_pass http://abc.harry.com;
	···
}

```
### 负载均衡
负载均衡主要是针对反向代理。将反向代理服务器接收的请求按照规则分发的过程称为负载均衡，具体的规则称为负载均衡策略。具体的请求数量称为负载量。
nginx支持的负载均衡调度算法有以下五种   
1.`轮询`，默认情况   
2.`权重`，依据weight值 weight值越大被分配到请求的几率越大，这种主要是实际工作中后端服务器硬件配置不同而调整的，正常来说性能好分配的权重大，接收的请求多。   
3.`ip_hash`，每个请求的客户端ip的hash结果进行匹配。你这样的算法下固定了同一个ip访问到同一个后端服务器，这也解决了集群部署环境下session共享的问题。   
4.`fair（第三方）`，智能调度算法，动态的根据后端服务器的请求处理响应时间进行均衡分配，响应时间短处理效率高的分配到请求的概率高。需要注意的是nginx默认是不支持fair算法，需要安装upstream_fair模块。   
5.`url_hash(第三方)`，按照访问的url的hash结果分配请求。每个请求的url会指向后端固定的某个服务器，可以在nginx作为静态服务器的情况下提高缓存效率。同样要注意nginx默认不支持这种调度算法，需要安装。 

## Nginx 性能优化 
### Nginx 运行工作进程数量
```
#nginx 配置
worker_processes 4;
```
nginx默认采用多进程工作方式，Nginx启动后会运行一个master进程和多个的worker进程，和配置的数量有关。master进程主要用来管理work进程。
1.接收来自外界的信号。    
2.向各worker进程发送信号。   
3.监控worker进程的运行状态。   
4.当异常情况下worker进程退出后，会自动重新启动新的worker进程。   
work进程主要用来处理网络事件，各个worker进程之间是对等且相互独立的。它们同等竞争来自客户端的请求，一个请求只可能在一个worker进程中处理，work进程看个数一般设置为机器CPU核数，如果设置过大，可能会因为上下文切换更加耗费时间，稳定性更低 没有达到优化的目的

### Nginx运行CPU亲和力
```
worker_cpu_affinity 0001 0010 0100 1000;
```

### Nginx最大打开文件数
```
work_rlimit_nofile 65535;
```
这个配置是指当一个nginx进程打开的最多文件描述符数目，理论值是应该是最多打开文件数(ulimit -n)与nginx进程数相除，但是nginx分配请求不是那么均匀，所以最好与ulimit -n的值保持一致
### Nginx事件处理模型
```
events{
	use epoll;
	worker_connections 65535;
	multi_accept on;
	accept_mutex off;
}
```
nginx采用epoll事件模型，处理效率高。--后续会继续理解 事件处理模型 epoll 阻塞i/o等    
`work_connections`:是单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来判定，实际最大值就是worker进程数 * work_connections    
`multi_accept`:使得work进程获得连接通知时尽可能多的接收连接。该配置的作用是立即接收所有连接放到监听队列中。如果配置为off，work进程将逐个接受连接       
`accept_mutex`:为off，当有一个请求进来，所有可用的worker都会被唤醒，但只有一个worker处理连接。这就导致惊群现象，当只有少量请求时，每秒重复多次，则会导致服务器性能下降，因为所有被唤醒的worker都在占用cpu的时间。增加了上下文切换。所以当没有大量并发请求时可以处理为on
### 开启高效传输模式
```
http{
	include mime.types;
	default_type application/octet-stream;
	···
	sendfile on;
	tcp_nopush on;
	···
}
```
`include mime.types`:媒体类型，include 只是一个再当前文件中包含另一个文件内容的指令   
`default_type`:默认媒体类型   
`sendfile on`:开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为on，如果用来进行下载等磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统负载。
`tcp_no_push`:必须在sendfile开启的模式下才有效，防止网络阻塞，积极的减少网络报文段的数量（将响应头和正文的开始部分一起发送，而不是一个接一个的发送）

### 连接超时时间
主要目的是保护服务器资源，cpu，内存，控制连接数，因为建立连接也是需要消耗资源的。   
暂时没有进行这方面调优 稍后回来更新

### fastcgi调优

### gzip调优
使用gzip压缩功能，可以为我们节约带宽，加快服务器客户端传输速度，有更好的体验，也为我们节约了成本，所以说这是一个重点。
一般我们需要压缩的内容有：文本，js，html，css，对于图片，视频，flash不进行压缩，同时也要注意gzip功能是需要消耗cpu的。
```
gzip on;
gzip_min_length:2k;
gzip_buffers 4 32k;
gzip_http_version 1.1;
gzip_comp_level 6;
gzip_types text/plain text/css text/javascript application/json application/x-javascript application/xml;
gzip vary on;
gzip proxied any;
```
`gzip on` 开启gzip压缩
`gzip_min_length` 1k 设置允许压缩的页面最小字节数 从header投的Content-Length中获取，默认是0，不管多大都进行压缩，建议设置大于1k，如果小于1k可能会越压越大。   
`gzip_buffers`: 4 32k 压缩缓冲区大小，表示申请4个单位为32k的内存作为压缩结果流缓存，默认值是申请与原始大小相同的内存空间来储存gzip的压缩结果。   
`gzip_http_version`:压缩版本，用于设置识别http协议版本，默认是1.1，针对不支持gzip解压的浏览器用于判断，现在基本不用配置这个值。   
`gzip_comp_level`: 压缩比例，用于指定gzip压缩比，1压缩比例最小 处理速度最快 消耗cpu资源少 9 压缩比例最大 处理速度慢 消耗cpu资源多。   
`gzip_type`: 用于指定压缩mime类型 `text/html`类型总会被压缩。不能使用通配符如text/*   
`gzip_vary`: varyheader支持，该选项可以让前端缓存服务器经过gzip压缩过得页面。   








