## Redis.conf[](#redisconf)

配置文件 unit 单位对大小写不敏感

##### 网络[](#网络)

```javascript
bind 127.0.0.1 # 绑定的IP

protected-mode yes # 保护模式

port 6379 # 端口设置
```



##### GENERAL 通用[](#general-通用)

```javascript
daemonize yes # 以守护进程方式的运行,默认是no,需自己开启yes

pidfile /var/run/redis_6379.pid # 以后台方式运行,就需要指定一个pid文件

# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)
# warning (only very important / critical messages are logged)
loglevel notice

logfile # 日志文件位置名

database 16 # 数据库数量 默认16个
alaways-show-logo yes # 是否总是显示LOGO
```



##### 快照[](#快照)

持久化,在规定的时间内,执行了多少次操作,则会持久化到文件 .rdb .aof

```javascript
stop-writes-on-bgsave-error yessave 900 1 # 在900s内,如果至少有一个key修改 则持久化操作
save 300 10 # 在300s内,如果至少有10个key进行修改 则持久化操作
save 60 10000

stop-writes-on-bgsave-error yes # 持久化如果出错 是否继续工作

rdbcompression yes # 是否压缩rdb文件,会消耗一些cpu资源
rdbchecksum yes # 保存rdb文件的时候,是否效验

dir ./ # rdb保存的目录

dbfilename dump.rdb # 保存的文件名
```



##### REPLICATION 主从复制[](#replication-主从复制)

```javascript
slaveof <masterip> <masterport> # 设置主机的端口和ip
```



##### SECURITY 密码[](#security-密码)

requirepass 密码

```javascript
config get requirepass

config set requirepass "123456"

auth 123456
```



##### CLIENTS 客户端[](#clients-客户端)

```javascript
maxclients 10000  # 默认客户端连接数

maxmemory <bytes> # redis 配置最大的内存容量

maxmemory-policy noeviction # 内存达到上限后的处理策略 # 移除一些过期的key

noeviction: 不删除策略, 达到最大内存限制时, 如果需要更多内存, 直接返回错误信息。（默认值）
allkeys-lru: 所有key通用; 优先删除最近最少使用(less recently used ,LRU) 的 key。
volatile-lru: 只限于设置了 expire 的部分; 优先删除最近最少使用(less recently used ,LRU) 的 key。
allkeys-random: 所有key通用; 随机删除一部分 key。
volatile-random: 只限于设置了 expire 的部分; 随机删除一部分 key。
volatile-ttl: 只限于设置了 expire 的部分; 优先删除剩余时间(time to live,TTL) 短的key。
```



##### APPEND ONLY MODE aof 配置[](#append-only-mode-aof-配置)

```javascript
appendonly no # 默认不开启aof模式,默认使用rdb方式持久化,在大部分情况,rdb够用
appendfilename "appendonly.aof"  # 持久化文件名

# appendfsync always  # 每次修改都会 sync 消耗性能
appendfsync everysec   # 美妙执行一次 sync,可能会丢失这1s的数据!
# appendfsync no # 不执行sync,这个时候操作系统自己同步数据,速度最快
```