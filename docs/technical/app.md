
docker run --restart=always --network host -d -v frp:/etc/frp --name frpc snowdreamtech/frpc

docker run --name mysql -e --network=container-network  --ip=172.28.0.100 -p 3306:3306 MYSQL_ROOT_PASSWORD=mysql.admin.pass -d mysql:8.0

docker run --name=mynextcloud -d -v $(pwd):/var/www/html --network=container-network  --ip=172.28.0.101 -p 8089:80 nextcloud




docker run -d \
  --name=freshrss \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/gmt+8 \
  -p 1201:80 \
  -v $(pwd):/config \
  --network=container-network  --ip=172.28.0.102 \
  --restart unless-stopped \
  lscr.io/linuxserver/freshrss:latest



docker run -d -v $(pwd):/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" --network=container-network  --ip=172.28.0.104 xhofe/alist:latest


docker run -d \
    --name embyserver \
    --volume $(pwd)/programdata:/config \
    --volume $(pwd):/mnt/share1 \
    --volume $(pwd):/mnt/share2 \
    --publish 8096:8096 \
    --publish 8920:8920 \
    --env UID=1000 \
    --env GID=100 \
    --env GIDLIST=100 \
    --network=container-network  --ip=172.28.0.105 \
    emby/embyserver_arm64v8



docker run -d --name alist-strm -p 18080:5000 -v $(pwd):/home  -v $(pwd)/alist-strm/config:/config  --network=container-network  --ip=172.28.0.106 itefuir/alist-strm:latest



docker run -d  \
  -p 8086:8000 \
  -e MYSQL_HOST=172.28.0.100  \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=mysql.admin.pass \
  -e MYSQL_DB=msg_push \
  -e MYSQL_TABLE_PREFIX=message_ \
  --network=container-network  \
  --ip=172.28.0.107 \
  --name message-nest  \
  engigu/message-nest:latest

docker run -d  --name message-pusher -p 8086:3000 -e TZ=Asia/Shanghai -v $(pwd):/data justsong/message-pusher

docker run -dit \
  -v $PWD/ql/data:/ql/data \
  -p 5700:5700 \
  --name qinglong \
  whyour/qinglong:latest