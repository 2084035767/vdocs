# 二、Redis数据结构

## 2.1 字符串（String）

Redis中的字符串是一个字节序列。Redis中的字符串是二进制安全的，这意味着它们的长度不由任何特殊的终止字符决定。因此，可以在一个字符串中存储高达512兆字节的任何内容。

String是redis最基本的数据类型，一个key对应一个value。

string类型是 二进制安全的，意思是redis的string可以包含任何数据，比如jpg图片或者序列化的对象。

string类型是Redis最基本的数据类型，一个redis中字符串value**最多可以是512M**

-字符串值的最大长度为 512MB。

String 类似的使用场景: value 除了是字符串还可以是数字 或者对象



```bash
APPEND key '123' # 给key后面追加字符串123 如果key不存在 则为set 返回字符串长度

STRLEN key # 获取字符串长度

incr key # 自增1

decr key # 自减1

INCRBY key 10 # 递增10 指定增量

DECRBY key 10 # 递减10

GETRANGE key 0 3 # 截取字符串 0-3 包括3
GETRANGE key 0 -1 # 截取所有字符串

SETRANGE key 1 xxx # 替换指定位置的字符串

###########################################################################
setex (set with expire) # 设置过期时间
setnx (set if not exist) # 不存在在设置 (分布式锁中会常常使用)

setex key3 30 'hello' # 设置key3的为hello,30秒后过期

###########################################################################
mset mget msetex # 批量设置与批量获取

mset k1 v1 k2 v2 k3 v3

msetex k1 v1 k4 v4 # 原子性的操作 要么一起成功 要么一起失败

getset key value # 先取后设置 不存在则返回nil 如果存在,则获取,并赋为新值
############################################################################
# 对象
set user:1 {name:kuizuo,age:20} # 设置user为一个对象
# or
set user:1:name kuizuo
# user:{id}:{filed} value

get user:1
# or
get user:1:name
```



#### 字符串命令

| 编号 | 命令                           | 说明                                       |
| ---- | ------------------------------ | ------------------------------------------ |
| 1    | set key value                  | 此命令设置指定键的值                       |
| 2    | get key                        | 获取指定键的值                             |
| 3    | getrange key start end         | 获取存储在键上的字符串的子字符串           |
| 4    | getset key value               | 设置键的字符串值并返回其旧值               |
| 5    | getbit key offset              | 返回在键处存储的字符串值中偏移处的位值     |
| 6    | mget key1 [key2..]             | 获取所有给定键的值                         |
| 7    | setbit key offset value        | 存储在键上的字符串值中设置或清除偏移处的位 |
| 8    | setex key seconds value        | 使用键和到期时间来设置值                   |
| 9    | setnx key value                | 设置键的值，仅当键不存在时                 |
| 10   | setrange key offset value      | 在指定偏移处开始的键处覆盖字符串的一部分   |
| 11   | strlen key                     | 获取存储在键中的值的长度                   |
| 12   | mset key value [key value …]   | 为多个键分别设置它们的值                   |
| 13   | msetnx key value [key value …] | 为多个键分别设置它们的值，仅当键不存在时   |
| 14   | psetex key milliseconds value  | 设置键的值和到期时间(以毫秒为单位)         |
| 15   | incr key                       | 将键的整数值增加1                          |
| 16   | incrby key increment           | 将键的整数值按给定的数值增加               |
| 17   | incrbyfloat key increment      | 将键的浮点值按给定的数值增加               |
| 18   | decr key                       | 将键的整数值减1                            |
| 19   | decrby key decrement           | 按给定数值减少键的整数值                   |
| 20   | append key value               | 将指定值附加到键                           |



## 2.2 哈希（Hash）

Redis散列/哈希(Hashes)是键值对的集合。Redis散列/哈希是字符串字段和字符串值之间的映射。因此，它们用于表示对象。

Redis Hash是一个string类型的field（字段）和value（值）的映射表，Hash特别适合用户存储对象。

Redis中每个Hash可以存储2^32-1个键值对（40多亿）



-每个散列/哈希可以存储多达2^32 - 1个健-值对(超过40亿个)。

hash 可变更数据 比如 user 信息,更适合对象的存储

Map 集合，key-map(key-value)

```bash
hset myhash field1 kuizuo

hget myhash field1

hgetall myhash

hdel myhash

hlen myhash # 获取hash表的字段数量

HEXISTS myhash field1 # 判断hash中 指定字段是否存在

Hkeys myhash # 只获得所有field

Hvals myhash # 只获得所有value
```



#### 哈希命令

set 命令用 h 开头

| 编号 | 命令                                     | 说明                                   |
| ---- | ---------------------------------------- | -------------------------------------- |
| 1    | hdel key field2 [field2]                 | 删除一个或多个哈希字段                 |
| 2    | hexists key field                        | 判断是否存在散列字段。                 |
| 3    | hget key field                           | 获取存储在指定键的哈希字段的值         |
| 4    | hgetall key                              | 获取存储在指定键的哈希中的所有字段和值 |
| 5    | hincrby key field increment              | 将哈希字段的整数值按给定数字增加       |
| 6    | hincrbyfloat key field increment         | 将哈希字段的浮点值按给定数值增加       |
| 7    | hkeys key                                | 获取哈希中的所有字段                   |
| 8    | hlen key                                 | 获取散列中的字段数量                   |
| 9    | hmget key field1 [field2]                | 获取所有给定哈希字段的值               |
| 10   | hmset key field1 value1 [field2 value2 ] | 为多个哈希字段分别设置它们的值         |
| 11   | hset key field value                     | 设置散列字段的字符串值                 |
| 12   | hsetnx key field value                   | 仅当字段不存在时，才设置散列字段的值   |
| 13   | hvals key                                | 获取哈希中的所有值                     |



## 2.3 列表（List）

Redis列表只是字符串列表，按插入顺序排序。我们可以向Redis列表的头部或尾部添加元素。

-列表的最大长度为2^32 - 1个元素(4294967295，每个列表可容纳超过40亿个元素)。

Redis列表是最简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边），它的底层实际是个双端链表，最多可以包含2^32-1个元素（4294967295，每个列表超过40亿个元素）

redis 里 List 可以充当栈,队列,阻塞队列

列表实际上就是一个链表

可以实现消息队列 (Lpush Rpop),栈(Lpush Lpop)

```bash
LPUSH list value # 将value 将一个值或多个值插入列表头部(左)

RPUSH list value # 将value 将一个值或多个值插入列表底部(右)

LRANGE list 0 -1 # 获取所有list元素

LPOP list # 移除list的第一个元素(左)

RPOP list # 移除list的最后一个元素(右)

Lindex list 1 # 通过下标获取list中的某一个值

Lset list 0 item # 如果不存在列表 去更新就会报错

Llen list # 取列表的长度

Lrem list 1 one # 移除指定的值 例:移除一个为one的

Ltrim list 1 2 # 截取1-2 包括2

Linsert list before "world" "new" # 在world 前面插入new 后面则用after


rpoplpush list1 list2 # 移除列表最后一个元素,将他移动到新的列表
```



#### 列表命令

**所有 list 命令用 l 开头**

| 编号 | 命令                                  | 说明                                                         |
| ---- | ------------------------------------- | ------------------------------------------------------------ |
| 1    | blpop key1 [key2 ] timeout            | 删除并获取列表中的第一个元素，或阻塞，直到有一个元素可用     |
| 2    | brpop key1 [key2 ] timeout            | 删除并获取列表中的最后一个元素，或阻塞，直到有一个元素可用   |
| 3    | brpoplpush source destination timeout | 从列表中弹出值，将其推送到另一个列表并返回它; 或阻塞，直到一个可用 |
| 4    | lindex key index                      | 通过其索引从列表获取元素                                     |
| 5    | linsert key before/after pivot value  | 在列表中的另一个元素之前或之后插入元素                       |
| 6    | llen key                              | 获取列表的长度                                               |
| 7    | lpop key                              | 删除并获取列表中的第一个元素                                 |
| 8    | lpush key value1 [value2]             | 将一个或多个值添加到列表                                     |
| 9    | lpushx key value                      | 仅当列表存在时，才向列表添加值                               |
| 10   | lrange key start stop                 | 从列表中获取一系列元素                                       |
| 11   | lrem key count value                  | 从列表中删除元素                                             |
| 12   | lset key index value                  | 通过索引在列表中设置元素的值                                 |
| 13   | ltrim key start stop                  | 修剪列表的指定范围                                           |
| 14   | rpop key                              | 删除并获取列表中的最后一个元素                               |
| 15   | rpoplpush source destination          | 删除列表中的最后一个元素，将其附加到另一个列表并返回         |
| 16   | rpush key value1 [value2]             | 将一个或多个值附加到列表                                     |
| 17   | rpushx key value                      | 仅当列表存在时才将值附加到列表                               |



## 2.4 集合（Set）

Redis集合是字符串的无序集合。在Redis中，我们可以添加，删除和测试成员存在的时间O(1)复杂性。

-一个集合中的最大成员数量为2^32 - 1(即4294967295，每个集合中元素数量可达40亿个)个。

set 中的值是无法重复的，无序不重复集合



Redis的Set是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，集合对象的编码可以是intset或者Hashtable。

Redis中Set集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。

集合中最大的成员数为2^32-1（4294967295，每个集合可存储40多亿个成员）

```bash
sadd myset "hello" # set集合中添加元素

scard myset # 获取set集合中的内容元素个数

smembers myset # 查看指定set的所有值

sismember myset hello # 判断某一个值是不是在set集合中

SRANDMEMBER myset # 随机抽选出一个元素
SRANDMEMBER myset 2 # 随机抽选出指定个数元素
#####################################################################
# 获取set中的差集
SDIFF set1 set2

# 获取set中的交集
SINTER set1 set2

# 获取set中的并集
SUNION set1 set2
```



#### 集合命令

set 命令用 s 开头

| 编号 | 命令                                           | 说明                             |
| ---- | ---------------------------------------------- | -------------------------------- |
| 1    | sadd key member1 [member2]                     | 将一个或多个成员添加到集合       |
| 2    | scard key                                      | 获取集合中的成员数               |
| 3    | sdiff key1 [key2]                              | 减去多个集合                     |
| 4    | sdiffstore destination key1 [key2]             | 减去多个集并将结果集存储在键中   |
| 5    | sinter key1 [key2]                             | 相交多个集合                     |
| 6    | sinterstore destination key1 [key2]            | 交叉多个集合并将结果集存储在键中 |
| 7    | sismember key member                           | 判断确定给定值是否是集合的成员   |
| 8    | smove source destination member                | 将成员从一个集合移动到另一个集合 |
| 9    | spop key                                       | 从集合中删除并返回随机成员       |
| 10   | srandmember key [count]                        | 从集合中获取一个或多个随机成员   |
| 11   | srem key member1 [member2]                     | 从集合中删除一个或多个成员       |
| 12   | sunion key1 [key2]                             | 添加多个集合                     |
| 13   | sunionstore destination key1 [key2]            | 添加多个集并将结果集存储在键中   |
| 14   | sscan key cursor [MATCH pattern] [COUNT count] | 递增地迭代集合中的元素           |

## 2.5 有序集合（Sorted Set）

Redis可排序集合类似于Redis集合，是不重复的字符集合。 不同之处在于，排序集合的每个成员都与分数相关联，这个分数用于按最小分数到最大分数来排序的排序集合。虽然成员是唯一的，但分数值可以重复。

zset(sorted set：有序集合)

- Redis `zset` 和`Set`一样也是`string`类型元素的集合，且不允许重复的成员。
- 不同的是每个元素都会关联一个`double`类型的分数，`Redis`正是通过分数来为集合中的成员进行从小到大的排序。
- zset的成员是唯一的，但是分数（`score`）却可以重复。
- zset集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。集合中最大的成员数是`2^.32-1`

有序集合，在 set 的基础上增加了一个值 score

排序 班级成绩表，工资表排序



普通消息 1 重要消息 2 带权重进行判断

排行榜应用实现，取 TOP N

```bash
zadd myset 1 one

zadd myset 2 two 3 three

# ZRANGEBYSCORE key min max 一定要从小到大
ZRANGEBYSCORE myset -inf +inf # 根据score排序

ZREVERANGE myset 0 -1 # 从大到小进行排序!

Zrem myset item # 移除有序集合中的指定元素

Zcard myset # 获取有序集合中元素的个数
```



#### 集合命令

zset 命令用 z 开头

| 编号 | 命令                                           | 说明                             |
| ---- | ---------------------------------------------- | -------------------------------- |
| 1    | zadd key member1 [member2]                     | 将一个或多个成员添加到集合       |
| 2    | scard key                                      | 获取集合中的成员数               |
| 3    | sdiff key1 [key2]                              | 减去多个集合                     |
| 4    | sdiffstore destination key1 [key2]             | 减去多个集并将结果集存储在键中   |
| 5    | sinter key1 [key2]                             | 相交多个集合                     |
| 6    | sinterstore destination key1 [key2]            | 交叉多个集合并将结果集存储在键中 |
| 7    | sismember key member                           | 判断确定给定值是否是集合的成员   |
| 8    | smove source destination member                | 将成员从一个集合移动到另一个集合 |
| 9    | spop key                                       | 从集合中删除并返回随机成员       |
| 10   | srandmember key [count]                        | 从集合中获取一个或多个随机成员   |
| 11   | srem key member1 [member2]                     | 从集合中删除一个或多个成员       |
| 12   | sunion key1 [key2]                             | 添加多个集合                     |
| 13   | sunionstore destination key1 [key2]            | 添加多个集并将结果集存储在键中   |
| 14   | sscan key cursor [MATCH pattern] [COUNT count] | 递增地迭代集合中的元素           |

## 2.6 高级数据结构

### geospatial

地址位置，**geospatial 命令用 geo 开头**

**GEO 底层的实现原理就是 Zset,所以可以使用 Zset 命令来操作 Geo!**

应用: 推算地理位置的信息，两地之间的距离，方圆几里的人

```bash
# 规则: 两极无法直接添加,一般都是直接下载城市数据,直接通过程序一次性读入
# 参数: key (经度，纬度、名称) 切记不可反！ 经纬度
# 有效经度-180度到180度 有效纬度-85.05112878到85.05112878
GEOADD china:city 116.40 39.90 beijin # 设置北京的经纬度

GEOPOS china:city beijing # 获取北京的经纬度

GEODIST china:city beijing shanghai unit # 获取两地之间的距离 默认单位m

GEORADIS china:city 110 30 1000 km # 以110,30 这个点范围1000km的 地理位置
GEORADIS china:city 110 30 500 km withdist withcoord count 10 # 以110,30 这个点范围500km的 获取10个 带直线距离和经纬度

GEORADIUSBYMEMBER chaina:city beijing 1000m # 以北京周围1000km的 地理位置

GEOHASH china:city beijing # 将二维的地址位置转为一位11位字符串,如果两个字符串越接近,则距离越近

ZRANGE chaina:city 0 -1 # 查看地图中全部元素

ZREM chaina:city beijing # 移除指定元素
```



### Hyperloglog

Redis Hyperloglog 基数统计的算法

基数(不重复的元素)，会有误差！0.81 的错误率，但使用场景是可以接受的

统计网页的 UV （一个人访问一个网站多次，但是还是算作一个人），传统的方式，用 set 保存用户的 id，然后统计 set 中的元素数量来作为标准判断。

**Hyperloglog 命令 使用 PF 开头**

```bash
PFadd mykey1 a b c d e f g h i j
PFadd mykey2 i j k l m n o

PFMERGE mykey3 mykey1 mykey2 # 获取并集 并生成新的组

PFCOUNT mykey # 获取元素的数量
```



允许容错,一定可以使用 Hyperloglog

不允许容错,就使用 set 与自己的数据类型即可

### Bitmaps

位存储

统计用户信息，活跃，不活跃；登录，不登录，打卡；两个状态的都可以使用 Bitmaps

Bitmaps 位图,数据结构，都是操作二进制为来进行记录，就只有 0 和 1 两个状态！

```javascript
# 记录周一到周日的打卡
setbit sign 0 1
setbit sign 1 1
setbit sign 2 1
setbit sign 3 1
setbit sign 4 1
setbit sign 5 0
setbit sign 6 0

# 查看某一天是否有打开
getbit sign 3

# 统计打卡的天数
bitcount sign
```

### 6.redis地理空间（GEO）

Redis GEO主要用于存储地理位置信息，并对存储的信息进行操作，包括：

- 添加地理位置的坐标。
- 获取地理位置的坐标。
- 计算两个位置之间的距离。
- 根据用户给定的经纬度坐标来获取指定范围内的地址位置集合。

7.redis基数统计（HyperLogLog）

HyperLogLog是用来做基数统计的算法，HyperLogLog的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需要的空间总是固定且是很小的。

在Redis里面，每个HyperLogLog键只需要花费12KB内存，就可以计算接近2^64个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为HyperLogLog只会根据输入元素来计算基数，而不会存储输入元素本身，所以HyperLogLog不能像集合那样，返回输入的各个元素。

### 8.redis位图（bitmap）

由0和1状态表现的二进制位的bit数组

### 9.redis位域（bitfield）

通过bitfield命令可以一次性操作多个比特位域(指的是连续的多个比特位)，它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应的执行结果。

说白了就是通过bitfield命令我们可以一次性对多个比特位域进行操作。

### 10.redis流（Stream）

Redis Stream是Redis5.0版本新增加的数据结构。

Redis Stream主要用于消息队列（MQ，Message Queue），Redis本身就是一个Redis发布订阅（pub/sub）来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis宕机等，消息就会被丢弃。

简单来说发布订阅（pub/sub）可以分发消息，但无法记录历史消息。

而Redis Stream提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

