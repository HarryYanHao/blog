---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# Mysql 学习
## mac下安装与使用
推荐使用brew安装
``` sh
brew install mysql
```
查看mysql的配置文件路径
``` sh
mysql —help |grep my.cnf
```
查看配置
``` sql
show variables;
```
## sql语句优化
### 开启查询缓存
[mysqld]中添加：
```
query_cache_size = 20M
query_cache_type = ON
```
举例说明命中查询缓存的语句:
用变量接收查询条件
``` sql
select * from music163 where create_time = '2019-06-14 00:00:00';
```
不命中查询缓存的语句:
在sql语句中直接使用函数
``` sql
select * from music163 where create_time = curdate();
```
### 用explain检查sql
主要观察的指标有type和rows 前者会告诉你索引主键被如何利用后者会告诉你遍历了多少条数据，rows越少速度越快

### 为搜索的字段添加索引
某个字段你需要用于where后的查询条件，为其添加索引
特别说明：当添加联合索引时，在单个条件查询中 只有联合索引中的第一个生效，其余的不生效。

### 根据业务逻辑优化sql语句
使用limit限制查询条数，需要哪列数据写到查询语句，不要使用*来查询

### 建表时选择合适的数据类型
例如在枚举字段中 用enum 会比varchar 更加快捷紧凑，对数据长度进行一定的限制

### 尽可能的不要将字段值存储为null
尽量让字段保持not null 因为存储null也是需要额外的空间，和上一条一样，尽量减少存储空间，加快搜索速度

### 使用预处理语句
首先使用预处理可以保证程序避免遭受sql注入攻击，同时，在相同查询被多次使用的时候，mysql对预处理只会解析一次

### 垂直分割和越小的列
我们都知道一张表列数越少数据在硬盘中存储的越紧凑查询速度越快，所以我们要尽量避免一张表有特别多的列，如果一张表中存在特别多的列我们需要垂直分割，垂直分割的方法有多种多样，可以根据业务类型拆分，也可以根据数据是否经常变化来进行拆分。

### 选择合适的搜索引擎
搜索引擎主要有myisam和innodb 简单来说myisam适合读密集型的业务类型，innodb适合写密集型的业务，myisam不支持事物，innodb支持事物，myisam是表锁 innodb是行锁


### 将大的sql语句拆分成小段sql
如果执行大段的sql，特别是insert和delete可能会导致锁表，其他进程访问造成阻塞，进程hang住，从而导致web服务器crash

## 对已有表进行优化方法
1.首先利用上述的方法对sql语句进行优化  
2.利用memcached 和 redis 做一层缓存 内存查询的速度快于硬盘读取速度  
3.读写分离 在应用层面主从复制 或 主主复制 主写从读  可使用第三方轮子atlas  
4.使用mysql自带的分区表 无需更改代码,但是sql语句是需要针对分区表做优化的，sql条件中要带上分区条件的列，从而使查询定位到少量的分区上  
5.垂直拆分表  
6.水平拆分  
成本又低到高 成本越高效果越好
### 垂直拆分方案
一个数据库由多张表构成，每个表对应不同的业务，垂直切分是指按照业务类型将表进行分类，分布到不同的数据库上面，这样将单库的压力，分担到了不同的库上面。  

专库专用   
优点：   
1.拆分后业务清晰，拆分规则明确。   
2.系统之间整合或扩展容易。   
3.数据维护简单。   

缺点：   
1.分库后查询复杂，不能使用join等方法联合查询。需要在应用层修改   
2.事务处理复杂   
3.受限于单库性能瓶颈，不易数据扩展和性能提高。       

垂直拆分会使得单个用户请求的响应时间变长，但是会使得整个服务的吞吐量大大的增加（因为数据分库分表，可以想象成单个数据库的压力被分散到了不同的数据库，类似分布式部署）
使得单个用户响应请求变长的原因在于，垂直分割后，数据可能要经过多个rpc调用才能得到整合。rpc调用会加长单个用户请求的响应时间。   

垂直拆分方案：依据功能拆分和依据字段是否使用频繁拆分。

### 水平拆分方案
通过一种`算法`，将数据库进行水平分割。每个分片中的数据没有重合，所有分片中的数据并集组成全部数据。   
水平分表实际又可以分为如下三种，只分表，只分库，分库分表。   
单库容量最容易成为性能瓶颈，当业务表中的数据量比较大，导致数据库性能下降，则可以使用水平拆分
以用户数据为例   

水平拆分方案：   
1.范围法：以用户的uid主键为范围规划划分   
eg：   
user-db0:存储0到1千万的uid数据   
user-db1:存储1千万到2千万的uid数据    

优点：   
切分简单，根据uid，按照范围，很快能定位到数据在哪个库上。   
扩容简单，如果容量不够，只要增加user-db2即可。   

范围法的不足：   
uid必须要满足递增的特性，数据量不均，新增的user-db2，在初期的数据会比较少。   
请求量不均，一般来说新注册的用户活跃度往往会比较高，故user-db1往往user-db0负债要高，导致服务器利用率不平衡。    

2.哈希法：以用户的uid进行划分   
eg：      
user-db0:uid % 2 = 0的数据保存在db0数据库上   
user-db1:uid % 2 = 1的数据保存在db1数据库上   

哈希法的优点：   
切分策略简单，根据uid取模，根据取模结果很快能定位到数据在哪个库上。   
数据量均衡，只要uid是均匀的，数据在各个库上的分布一定是均衡的。   
请求量均衡，只要uid是均匀的，负载在各个库上的分布一定是均衡的。

哈希法的缺点：    
扩容麻烦，如果容量不够，要增加一个库，需要重新进行hash，将数据重新分布到不同的库上，会导致数据迁移，如何平滑的进行数据迁移，是一个需要解决的问题（搜电面试）   

### 拆分带来的问题
基本的数据库增删改查功能    
在应用层，已经无法像操作单表单库那样操作数据库，需要在不同的库查找不同的数据，应用层进行汇总。  分布式id，在分库分表后，我们不能再使用mysql的自增主键，因为不同的表中的自增id可能会出现冲突。因此，需要一个全局的id生成器，目前分布式id有很多种方案，比较轻量级的方案是twitter的snowflake算法。也可以使用redis 原子方法incr生成。   
分布式事务是分库分表，批量插入记录到四个不同的库，如何保证要么同时成功，要么同时失败。   
动态扩容，就是上述提到的哈希法扩容麻烦的问题，扩容需要动态迁徙数据。   
## mysql事务
事务的基本特点(ACID)
### 原子性
一个事务执行所有的操作，结果只有两种状态：要么全部执行，要么全部不执行，不存在中间状态。当某一节点发生错误的时候，事务会被执行`rollback`操作，将数据恢复到执行该事务之前的状态。是操作中最基本的不可分割的单位。eg：转账要么成功要么失败 不存在别的可能
### 一致性
事务开始执行和执行完成后，数据库的完整性约束完全没有收到破坏 eg：A转账给B 不可能发生 A转账成功 B没有收到款
### 隔离性
在同一时间点，数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同的级别
读未提交(`read uncommitted`),读已提交（`read committed`）,可重复读(`repeatable read`) 和串行化(`serializable`)
### 持久性
事务成功执行后，事务的所有操作对数据库的更新是永久的，不能回滚的
## 事务隔离级别命令及示例
```
#查看当前会话事务隔离级别
select @@tansaction
#查看全局事务隔离级别
select @@global.tx_isolation;
#设置当前会话隔离级别
set session transaction isolation level repeatable read;
```
隔离级别为读未提交(`read uncommitted`)   
会产生脏读，不可重复读，幻读问题    
``` mysql
#session 1
start transaction;
select fund_id from report where id = 1; #eg:此时的fund_id = 1

#session 2 
start transaction;
update report fund_id = 2 where id = 1;

#session 1
select fund_id from report where id = 1; #在session2未commit的情况下，查询fund_id的结果已经变为2 这就是脏读
```
隔离级别为读已提交(`read committed`)   
会产生不可重复读，幻读问题   
``` mysql
#session 1
start transaction;
select fund_id from report where id = 1; #eg:此时的fund_id = 1

#session 2 
start transaction;
update report fund_id = 2 where id = 1;

#session 1
select fund_id from report where id = 1; #在session2未commit的情况下，查询fund_id的结果仍然是1 说明没有脏读的问题

#session 2
commit;

#session 1
select fund_id from report where id = 1; #在session2提交之后 session1再次查询fund_id的结果变为了2 说明在重复查询时的值发生了改变 说明有不可重复读的问题
```
隔离级别为可重复读(`repeatable read`)
会产生幻读的问题   
``` mysql
start transaction;
select fund_id from report where id = 1; #eg:此时的fund_id = 1

#session 2 
start transaction;
update report fund_id = 2 where id = 1;

#session 1
select fund_id from report where id = 1; #在session2未commit的情况下，查询fund_id的结果仍然是1 说明没有脏读的问题

#session 2
insert into report (id,fund_id) values (22,10);
commit;

#session 1
select fund_id from report where id = 1; #在session2提交之后 session1再次查询fund_id的结果仍然为1 说明在重复查询时的值没有发生改变 说明没有不可重复读的问题
select fund_id from report where id = 22;#session2提交之后 session1查询仍然查不到该条记录。
update report fund_id=30 where id = 22;#结果却是修改成功，在没有查到的情况下仍然能修改成功这就是幻读的问题
```
串行化(`serializable`)
不会产生脏读，不可重复读，幻读问题 但是并发效性能最低。    
## 事务隔离性说明
1.隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大。   
2.mysql默认是使用repeatable read 可重复读隔离级别。    
3.读未提交对`查询出的数据`不加锁，读已提交，可重复读对`查询出的数据`加行锁,串行化时 读写数据都会锁住整张表`表锁`。    

## 主从复制
在数据库优化的过程中离不开读写分离，写主库，读从库，那为了确保主从数据一致性，所以要理解主从复制。由此也可延伸至一主二从 或主主复制，主主复制，互为主从，双方互为备份。
::: tip
本次mysql主从复制使用docker容器化搭建
:::
### 准备工作
安装docker  
拉取mysql镜像   
``` sh
docker pull mysql:5.7.13
``` 
### 主容器配置
启动主容器
``` sh
docker run -p 3309:3306 --name mysql_master -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7.13
``` 
创建主容器的复制账号
```
#sql语句
grant replication slave on *.* to 'backup'@'%' identified by 'backup';
show grants for 'backup'@'%';
```
修改mysql配置文件my.cnf
```
#my.cnf配置
​log-bin=mysql-bin #使用binary logging 是一种特殊的日志文件用于主从复制和备份，mysql-bin是log文件名的前缀

server-id=1 #唯一服务器ID，非0整数，不能和其他服务器的server-id重复
```
重启主容器 
``` sh
docker restart mysql_master
```
### 从容器配置
从容器执行sql
``` 
#mysql
change master to 
master_host = 'ip',
master_port = 'port',
master_user = 'backup',
master_password = 'backup';

start slave;
```
检查配置情况
```
#mysql
show slave;
```
​Slave_IO_State 如果是Waiting for master to send event，Slave_IO_Running与Slave_SQL_Running 如果都是Yes，那么恭喜你，可以测试主从复制的效果了，如果有一个不是Yes，一半是重启从容器后，事务回滚引起的，那么给出解决方法如下
```
stop slave;
set global SQL_SLAVE_SKIP_COUNTER=1;
start slave;
```
至此一主一从搭建完成，需要添加从容器 重复上述步骤即可。








