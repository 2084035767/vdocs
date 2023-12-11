# 一、Redis简介

## 1.1 Redis的定义和特点

Redis是一个开源，高级的键值存储和一个适用的解决方案，用于构建高性能，可扩展的Web应用程序。

**Remote Dictionary Server**(**远程字典服务**)是完全开源的，使用ANSIC语言编写遵守[BSD](https://so.csdn.net/so/search?q=BSD&spm=1001.2101.3001.7020)协议，是一个高性能的Key-Value数据库提供了丰富的数据结构，例如String、Hash、List、Set、SortedSet等等。数据是存在内存中的，同时Redis支持事务、持久化、LUA脚本、发布/订阅、缓存淘汰、流技术等多种功能特性提供了主从模式、Redis Sentinel和Redis Cluster集群架构方案。

#### Redis有三个主要特点，使它优越于其它键值数据存储系统

1) Redis将其数据库完全保存在内存中，仅使用磁盘进行持久化。

2) 与其它键值数据存储相比，Redis有一组相对丰富的数据类型。

3) Redis可以将数据复制到任意数量的从机中。



## 1.2 Redis的优势和应用场景

### Redis优点

1) 异常快 - Redis非常快，每秒可执行大约110000次的设置(SET)操作，每秒大约可执行81000次的读取/获取(GET)操作。

2) 支持丰富的数据类型 - Redis支持开发人员常用的大多数数据类型，例如列表，集合，排序集和散列等等。这使得Redis很容易被用来解决各种问题，因为我们知道哪些问题可以更好使用地哪些数据类型来处理解决。

3) 操作具有原子性 - 所有Redis操作都是原子操作，这确保如果两个客户端并发访问，Redis服务器能接收更新的值。

4) 多实用工具 - Redis是一个多实用工具，可用于多种用例，如：缓存，消息队列(Redis本地支持发布/订阅)，应用程序中的任何短期数据，例如，web应用程序中的会话，网页命中计数等。

### Redis与其他键值存储系统

1) Redis是键值数据库系统的不同进化路线，它的值可以包含更复杂的数据类型，可在这些数据类型上定义原子操作。

2) Redis是一个内存数据库，但在磁盘数据库上是持久的，因此它代表了一个不同的权衡，在这种情况下，在不能大于存储器(内存)的数据集的限制下实现非常高的写和读速度。

3) 内存数据库的另一个优点是，它与磁盘上的相同数据结构相比，复杂数据结构在内存中存储表示更容易操作。 因此，Redis可以做很少的内部复杂性。



## 1.3 安装与配置

#### 下载文件 

#### 解压安装

```bash
tar xzf  redis-3.2.0.tar.gz
cd redis-3.2.0
make
make install PREFIX=/usr/redis  #设置安装路径
```

#### 启动redis服务端

```bash
cp ~/redis-3.2.0/redis.conf /usr/redis/   #将配置文件复制到安装指定的目录

cd /usr/redis
bin/redis-server ./redis.conf  #启动服务， redis启动默认为前台模式
```

### 开机自启

#### 1.修改redis.conf文件

```bash
daemonize yes        #设置为后台启动模式
pidfile /var/run/redis_6379.pid
```

#### 2.修改redis_init_script文件

```bash
cd ~/redis-3.2.0/utils #redis解压的目录
vim redis_init_script
# as it does use of the /proc filesystem.下一行修改：    
# chkconfig: 2345 90 10
# descrption: Redis is a per....
REDISPORT=6379
EXEC=/usr/redis/bin/redis-server
CLIEXEC=/usr/redis/bin/redis-cli
PIDFILE=/var/run/redis_${REDISPORT}.pid
CONF="/usr/redis/redis.conf"
上边两行#的注释必须要添加,否则脚本无法添加到自启动任务列表中。
```

#### 设置redis开启和关闭命令

```bash
cp redis_init_script /etc/init.d/redis
chmod +x /etc/init.d/redis
service redis start
service redis stop 
```

```perl
1）修改redis.conf中
    bind ip #非127.0.0.1，而是系统中指定的ip，通过ifconfig查询
    本次测试配置是 bind 192.168.2.11

2）修改/etc/init.d/redis
    将$CLIEXEC -p $REDISPORT shutdown修改成
    $CLIEXEC -h 192.168.2.11 -p $REDISPORT shutdown
```

```bash
# 添加自启动服务

chkconfig redis on    #设置自启动
chkconfig --list  #查看自启动列表
```

### 补充

```perl
# 如果redis设置了密码,则redis脚本(原名redis_init_script)中的
$CLIEXEC -h 192.168.2.11 -p $REDISPORT shutdown需要改成
$CLIEXEC -h 192.168.2.11 -p $REDISPORT -a "密码" shutdown
```

分类: [Redis](https://www.cnblogs.com/moonlightL/category/1046169.html)

标签: [redis](https://www.cnblogs.com/moonlightL/tag/redis/) , [Nosql](https://www.cnblogs.com/moonlightL/tag/Nosql/) , [数据库](https://www.cnblogs.com/moonlightL/tag/数据库/)