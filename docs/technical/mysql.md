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
