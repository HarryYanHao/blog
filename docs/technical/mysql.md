---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# mysql 学习
[[toc]]
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
### 用explain检查sql:
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
3.串行化时 读写数据都会锁住整张表。    




