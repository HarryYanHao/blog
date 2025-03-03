---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---

# frp+OpenVPN
[[toc]]
一天突发奇想，购买了云服务器和域名。本着不浪费的精神，于是专研了一段时间的内网穿透，使用到的工具有frp和OpenVPN。
记录一下搭建的方法和遇到的问题吧

## frp
### frp简介
介绍一下frp
frp是内网穿透工具，可以安全、便捷地将内网服务暴露到公网，通过拥有公网 IP 的节点进行中转，让公网用户可以访问内网中的机器。



frp客户端 frpc 需要安装在内网
frp服务度啊 frps 需要安装在有公网ip的服务器上
通过端口
### frps搭建
frp都提供docker环境的安装 但是本次服务器上没有安装docker 所以frps我是直接gitclone下来的 frpc安装在mac上 使用的是docker

:::tip
frp文档
<https://gofrp.org/zh-cn/docs/overview/>
:::
安装过程不赘述了，主要还用到了systemd 来管理 frps 服务，包括启动、停止、配置后台运行和设置开机自启动 具体参考文档

### frpc搭建
:::tip
frpc dockerhub 
<https://hub.docker.com/r/snowdreamtech/frpc>
:::
run的时候 --restart=always 容器随docker启动，使用的volume 挂载了frpc的配置文件

frp的配置参考上述的文档，比较简单。

## OpenVPN
使用frp穿透到内网的机器后，我不满足于单台机器，如果单台可以穿透，那么被穿透的机器所在的内网上的资源应该都可以被访问（类似vpn）。查询资料发现frp可以和OpenVPN配合使用，达到类似效果。

### 安装OpenVpn（docker版本）
我一开始的想法是，把frp的客户端和OpenVPN的服务端都装在同一个环境，也就是以docker容器的形式。此方法比较简单
:::tip
github OpenVPN docker环境
https://github.com/kylemanna/docker-openvpn
:::
按照官方的文档生成了证书和.ovpn 等文件后顺利启动。能ping通内网ip 但是却无法访问内网ip的资源。
### 尝试过的配置
#### OpenVPN服务端的配置文件 openvpn.conf
server 192.168.254.0 255.255.255.0 OpenVPN提供的虚拟ip地址范围（√）

client-config-dir /etc/openvpn/ccd 对应的ccd文件中需要有和CLIENTNAME.ovpn 同名的的文件 即 ccd/CLIENTNAME 在其中配置了虚拟ip地址 iroute 172.20.10.0 255.255.255.0 （X）

push "route 192.168.5.0 255.255.255.0" 内网ip地址推送到客户端 有多条需要写多条push（√）
#### OpenVPN客户端的配置文件 CLIENTNAME.ovpn
remote 47.115.150.92 21194 udp //21194是fprc配置的对公网暴露的udp端口 服务端监听的仍然是1194
#### OpenVPN服务容器中的配置
这一部份主要是配置的网络转发的相关内容（docker容器默认有配置，如果没有则需要自己手动添加）
iptables -t nat -A POSTROUTING -s 192.168.254.0/24  -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.200.0/24  -j SNAT --to-source 192.168.5.23


OVPN客户端导入.ovpn文件后启动成功，发现docker容器中17.0.X.X的资源可以访问，但是服务器所在的内网192.168.0.X却无法访问。感觉是容器和宿主机mac os系统上通信不互通。


### 安装OpenVPN（服务器版本）
既然安装在docker上 容器之间的内网是可以访问的，那同样的道理。将OpenVPN安装到macOS上就可以实现效果
#### brew安装
mac提供了brew包管理工具方便的安装
```sh
brew install openvpn
```
安装成功后头疼的问题来了，之前使用docker的时候，证书和客户端文件都是依靠docker --rm调试的方式生成。如果在本地安装OpenVPN则需要自己手动生成证书还需要找到对应的客户端的配置文件模版和客户端的配置文件的模版
:::tip
这个文档帮助了我很多
<https://neddy-tek.medium.com/openvpn-server-and-client-set-up-on-macos-3bb1fb84b29d>
:::
```sh
brew install easy-rsa
```
大体思路是

安装软件包->生成客户端和服务端证书 -> 新建客户端文件夹，配置文件和证书放在同一文件夹下，修改客户端配置文件 -> 新建服务端文件夹，配置文件和证书放在同一文件夹下，修改服务端配置文件 -> 启动服务端 -> 导入客户端文件 -> 启动客户端

当然同样的道理，客户端和服务端的配置也可以参照安装到docker时 用到的配置项。

### 遇到的问题
连接成功后发现客户端和服务端之间可以相互ping通，资源可以访问，但是ping不通 服务端所在的内网。查询资料得知需要开启IPv4 的转发，源地址转和启用网络转发
mac没有iptables命令，需要使用pfctl 参考下面的命令
IPv4 的转发
```sh
sysctl -w net.inet.ip.forwarding=1 #暂时开启，重启失效
```
```sh
sudo vim /etc/sysctl.conf
net.inet.ip.forwarding=1 #永久生效
```

在linux中需要用到的源地址转换为
iptables -t nat -A POSTROUTING -s 192.168.254.0/24  -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.200.0/24  -j SNAT --to-source 192.168.5.23
在mac中需要用pf替换写法
```sh
vi /etc/pf.conf
nat-anchor "nat-forwarding" #添加nat-anchor
rdr-anchor "rdr-forwarding" #添加rdr-anchor
load anchor "nat-forwarding" from "/etc/pf.anchors/nat"
load anchor "rdr-forwarding" from "/etc/pf.anchors/rdr" #(可选)

vi /etc/pf.anchors/nat
#iptables -t nat -A POSTROUTING -s 192.168.254.0/24  -j MASQUERADE
#将10.8.0.0/24的流量转发到en0
nat on en0 from 10.8.0.0/24 to any -> (en0) 

#iptables -t nat -A POSTROUTING -s 192.168.200.0/24  -j SNAT --to-source 192.168.5.23
#将10.8.0.0/24的流量转发到192.168.5.23(可选)
vi /etc/pf.anchors/rdr
rdr on en0 from 10.8.0.0/24 to any -> 192.168.5.23 
#en0网卡要根据现场选择 有内网ip的网卡
```

启用网络转发
```sh
sudo pfctl -d #禁用 pf
```
```sh
sudo pfctl -f /etc/pf.conf #重新加载配置
```
```sh
sudo pfctl -e #启用pf
```

## 后续
### OpenVPN服务后台持久的配置
```sh
vi /opt/homebrew/Cellar/openvpn/2.6.12/homebrew.mxcl.openvpn.plist

vi /opt/homebrew/Cellar/openvpn/2.6.12/homebrew.openvpn.service

#使用到的配置文件修改为上面生成的服务端的配置文件
```

### 安全


