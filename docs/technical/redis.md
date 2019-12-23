---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# Redis 深度历险
[[toc]]
## Redis 安装
:::tip
个人使用的是docker安装,安装方式简单
:::
```sh
docker pull redis
docker run --name myredis -d -p 6399:6379 redis
docker exec -it myredis /bin/bash
redis-cli
```
## Redis 基础数据结构
Redis有5种基础数据结构，分别为：String（字符串），hash（哈希），list（列表），set（集合），zset（有序集合）   
Redis所有的数据结构都是以唯一的key字段作为名称，然后通过这个唯一key值获取相应的value数据。
对同一个key存储不同的数据结构，redis会报`WRONGTYPE Operation against a key holding the wrong kind of value`错误信息
### string
字符串String是Redis最简单的数据结构。字符串结构使用非常广泛，一个常见的用途就是缓存用户信息。我们将用户信息结构体使用JSON序列化成字符串，然后将序列化后的字符串塞进Redis缓存。同样，获取用户信息会经过一次反序列化的过程。 
:::warning
字符串最大长度为512M
:::  
Redis的字符串是动态字符串，是可以修改的字符串,采用与分配冗余空间的方式来减少内存的频繁分配。capacity一般高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，超过1M时只会多扩1M的空间
### list
Redis的list数据结构是一种链表的结构，这意味着list的插入和删除操作非常快，时间复杂度为O(1)，但是索引定位很慢时间复杂度O(n) 当列表弹出最后一个元素，该数据结构自动被删除，内存被回收。   
慢操作   
lget lrange ltrim 都是复杂度O(n)操作   
双向指针可以实现类似 队列 栈 的数据结构操作   
### hash
hash结构是采用数组+链表二维结构，redis字典的值只能是字符串，Redis为了高性能不能采取堵塞rehash，所以使用的是渐进式的rehash策略，渐进式的rehash会在rehash的同时，保留新旧两个hash结构，然后在后续的定时任务中以及hash操作指令中，顺序渐进的将旧hash的值一点点的迁徙到新hash结构中，当搬迁完成了，就会使用新的hash结构取而代之  
当hash移除最后一个元素之后，该数据结构自动被删除，内存被回收
string和hash结构区别，hash可以根据字段单独存储，获取的时候可以部分获取。string只能存储所有序列化的数据。获取的时候需要一次性全部读取。比较消耗网络流量。hash存储的消耗肯定是高于string的。需要根据使用的实际的情况选择合适的存储结构。
### set
set结构内部的键值对是无序且唯一的   
当集合中最后一个元素移除之后，数据结构自动删除，内存被回收。   
eg：集合结构可以存储中奖用户id，因为有去重功能，可以保证一个用户不能中奖两次。在我们项目中可以存储委托，成交id    
常用的方法有 sdd smembers sismember scard#获取长度 spop#弹出一个
### zset
zset有序集合 一方面是一个set 保证了value的唯一性 另一方面提供了一个score字段 代表这个value的排序权重   
zset中最后一个元素移除之后，数据结构自动删除，内存被回收。
## 容器型数据结构通用规则
list/set/zset/hash 这四种数据结构是容器型数据结构 他们共享下面两条通用规则   

1.create if not exist   
如果容器不存在，那就创建一个，再进行操作。比如rpush，比如刚开始是没有列表的，则会自动创建一个，然后再rpush进去新元素     

2.drop if no elements    
如果容器内的最后一个元素被移除，容器消失，释放内存。    
## 过期时间
Redis所有的数据结构都可以设置过期时间，时间到了，redis会自动删除相应的对象。需要注意的是过期是以对象为单位即是以key为单位 不是以其中的子key。    
还有一点需要注意，如果你为某个key设置了过期时间，但是有用set修改了值，过期时间会消失。



