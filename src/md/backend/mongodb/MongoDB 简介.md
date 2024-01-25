## MongoDB 简介

### 是什么

- 基于分布犹文件存储数据库（就是一个数据库
- C++ 语言编写
- 支持的数据结构非常松散，是类似 json 的 bson 格式（后期插入修改数据写 JSON)

> JSON (JavaScript Object Notation,JS 对象简谱）是一种轻量级的数据交换格式 bson (二进制 SON)



#### 特点

MongoDB作为一款通用型数据库，除了能够创建、读取、更新和删除数据之外，还提供了一系列不断扩展的独特功能：

- 索引

  支持通用二级索引，允许多种快速查询，且提供唯一索引、复合索引、地理空间索引、全文索引

- 聚合

  支持聚合管道，用户能通过简单的片段创建复杂的集合，并通过数据库自动优化

- 特殊的集合类型

  支持存在时间有限的集合，适用于那些将在某个时刻过期的数据，如会话session。类似地，MongoDB也支持固定大小的集合，用于保存近期数据，如日志

- 文件存储

  支持一种非常易用的协议，用于存储大文件和文件元数据。MongoDB并不具备一些在关系型数据库中很普遍的功能，如链接join和复杂的多行事务。省略这些的功能是处于架构上的考虑，或者说为了得到更好的扩展性，因为在分布式系统中这两个功能难以高效地实现





- MongoDB安装简单。

- MongoDB的提供了一个面向文档存储，操作起来比较简单和容易。

- 在MongoDB记录中设置任何属性的索引来实现更快的排序。

- 如果负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。

- Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。

- MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言

#### 优点

- MongoDB 的架构较少。它是一个文档数据库，它的一个集合持有不同的文档

- 从一个到另一个的文档的数量，内容和大小可能有差异

- MongoDB 中单个对象的结构很清淅

- MongoDB 中没有复杂的连接

- MongoDB 提供深度查询的功能，因为它支持对文档的强大的动态查询

- MongoDB 很容易扩展

- 它使用内部存储器来存储工作集，这是其快速访问的原因



#### 使用场景

- 大而复杂的数据

- 移动和社会基础设施数据

- 内容管理和交付

- 用户数据管理

- 数据中心

### 从哪下载

- windows 版本下载: https://www.mongodb.org/dl/win32
- linux 版本下载: https://www.mongodb.org/dl/linux
- 各版本下载: https://www.mongodb.com/try/download/community

```
版本说明
```

- 2.x
- 3.x (3.2、 3.4、 3.6)
- 4.x (4.2 更佳的数据管理能力、更强的分布式架构、多文档事物等)



### MongoDB和MySQL的对比

下面是MongoDB和关系型数据库MySQL对比

| MySQL术语      | MongoDB术语                            |
| -------------- | -------------------------------------- |
| database数据库 | database数据库                         |
| table表        | collection表（集合）                   |
| row行          | document行（文档）                     |
| column字段     | field字段                              |
| index索引      | index索引                              |
| pk主键         | pk主键（MongoDB将`_id`字段设置为主键） |

在数据存储上，文档是MongoDB的核心概念，即采用类似json格式的键值对进行数据存储；

在配置文件上，MongoDB采用yaml格式文件配置。

## 安装

### Liunx 系统

```
BASH#步骤1:下载
curl -o https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz
#步骤2:解压
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz
#步骤3:将解压包拷贝到指定目录
mv mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb
#步骤4:创建数据存放目录与日志存放目录
mkdir -p /usr/local/mongodb/data /usr/local/mongodb/logs
#步骤5:启动MongoDB服务
/usr/local/mongodb/bin/mongod -- dbpath=/usr/local /mongodb/data --logpath=/usr/local/mongodb/logs/mongodb.log --logappend --port=27017 --fork

#后期登录即可
/usr/local/mongodb/bin/mongo
```

### Win 系统

步骤 1: 下载 https://www.mongodb.com/download-center/community 选择 windows、zip
步骤 2: 解压
步骤 3: 创建服务

```
BASHbin/mongod.exe --install --dbpath 磁盘路径 --logpath 日志路径
```

注意：

- 通过管理员身份运行 DOS 窗口否则没有权限创建失败
- 需要提前`创建数据和日志存放目录`、比如在 bin 同级目录下创建 `data 、logs目录`

这是我的命令：

```
BASHD:\Programs\MongoDB\bin>mongod --install --dbpath D:\Programs\MongoDB\data --logpath D:\Programs\MongoDB\logs\mongodb.log
```

步骤 4: 启动服务

可以在 windows 中的服务中找到 MongDB

```
BASHnet start mongodb
```

步骤 5: 登录 (验证是否安装成功）

输入 `mongo`

```
BASH
D:\Programs\MongoDB\bin>mongo
MongoDB shell version v4.4.0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("96b8ce39-895f-40eb-93a4-afd64c26c1cf") }
MongoDB server version: 4.4.0
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
        https://community.mongodb.com
---
The server generated these startup warnings when booting:
        2020-08-21T11:02:34.822+08:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
        2020-08-21T11:02:34.823+08:00: This server is bound to localhost. Remote systems will be unable to connect to this server. Start the server with --bind_ip <address> to specify which IP addresses it should serve responses from, or with --bind_ip_all to bind to all interfaces. If this behavior is desired, start the server with --bind_ip 127.0.0.1 to disable this warning
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
> exit
bye
```

基本语法

- 创建服务: `bin/mongod. exe --install -- dbpath 磁盘路径 -- logpath 日志路径`
- 删除服务: `bin/mongod. exe --remove`
- 启动服务: `net start mongodb (注: service 服务名d restart/stop/start)`
- 关闭服务: `net stop mongodb`



### 三、客户端连接

#### 3.1 非认证连接

```undefined
键入 mongo
```

#### 3.2 认证连接

```perl
mongodb://username:password@hostname/ #用户名，密码，主机名
```

#### 3.3 关闭服务端

```perl
use admin
db.shutdownServer()
#如果使用kill -9 关闭mongodb可能会导致数据文件损坏
```



## 基本操作

### 数据类型

MongoDB的数据类型为[BSON](https://docs.mongodb.com/manual/reference/bson-types/)，是一种二进制序列化格式，可以认为类似于JSON。

举例：

```bson
BASH#1、null：用于表示空或不存在的字段
d={'x':null}
#2、布尔型：true和false
d={'x':true,'y':false}
#3、数值
d={'x':3,'y':3.1415926}
#4、字符串
d={'x':'abc'}
#5、日期
d={'x':new Date()}
d.x.getHours()
#6、正则表达式
d={'pattern':/^*.?abc$/i}

# 正则写在／／内，后面的i代表:
# i 忽略大小写
# m 多行匹配模式
# x 忽略非转义的空白字符
# s 单行匹配模式

#7、数组
d={'x':[1,'a','v']}

#8、内嵌文档
user={'name':'abc','addr':{'country':'China','xxxx':'xx'}}
user.addr.country

#9、对象id:是一个12字节的ID,是文档的唯一标识，不可变
d={'x':ObjectId()}

#10、ObjectId
ObjectId是"_id"的默认类型。因为设计MongoDb的初衷就是用作分布式数据库，所以能够在分片环境中生成唯一的标识符非常重要，而常规的做法在多个服务器上同步自动增加主键既费时又费力，这就是MongoDB采用ObjectId的原因。
ObjectId采用12字节的存储空间，是一个由24个十六进制数字组成的字符串
    0|1|2|3|   4|5|6|     7|8    9|10|11    
    时间戳      机器      PID    计数器
如果快速创建多个ObjectId，会发现每次只有最后几位有变化。另外，中间的几位数字也会变化（要是在创建过程中停顿几秒）。
这是ObjectId的创建方式导致的

时间戳单位为秒，与随后5个字节组合起来，提供了秒级的唯一性。这个4个字节隐藏了文档的创建时间，绝大多数驱动程序都会提供
一个方法，用于从ObjectId中获取这些信息。

因为使用的是当前时间，很多用户担心要对服务器进行时钟同步。其实没必要，因为时间戳的实际值并不重要，只要它总是不停增加就好。
接下来3个字节是所在主机的唯一标识符。通常是机器主机名的散列值。这样就可以保证不同主机生成不同的ObjectId，不产生冲突

接下来两个字节确保了在同一台机器上并发的多个进程产生的ObjectId是唯一的

前9个字节确保了同一秒钟不同机器不同进程产生的ObjectId是唯一的。最后3个字节是一个自动增加的计数器。确保相同进程的同一秒产生的
ObjectId也是不一样的。

#11、自动生成_id
如果插入文档时没有"_id"键，系统会自动创建。可以将其作为分布式ID。
但通常会在客户端由驱动程序完成。这一做法非常好地体现了MongoDb的哲学：能交给客户端驱动程序来做的事情就不要交给服务器来做。
这种理念背后的原因是：即便是像MongoDB这样扩展性非常好的数据库，扩展应用层也要比扩展数据库层容易的多。将工作交给客户端做就
减轻了数据库扩展的负担。
```

### 数据库操作



连接`mongod`服务：

```bson
BASHmongo --host localhost --port 27017
# 默认端口为27017，或者使用mongosh（mongo的升级版，有更强的功能）
mongosh --host localhost --port 27017
```

```bson
BASH> show databases  # 查看数据库命令 可以简写为 show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
# 默认存在三个系统库
> use local  # 切换到local库
switched to db local
> show tables  # 查看表
startup_lo
```

```
BASH> use admin
switched to db admin
> use admin2
switched to db admin2

db.dropDatabase() #删除当前库
{ "ok" : 1 }
```

`隐式创建`: 在 mongodb 选择不存在的数据库不会报错，后期当该数据库有数据时，系统自动创建



### 集合操作

```bash
#1、添加表
db.createCollection("c1")

#2、查看表
> show collections
# 或者
> show tables

#3、删除表c1
> db.c1.drop()
```

思考：如何删除数据库？
回答:

1. 通过 `use语法`选中数据库
2. 通过 `db.dropDatabase()`

## 文档增删改查 (CURD)

### 明确需求

> 数据库主要用来存放项目数据
> 然后我们已经学会了数据库和集合的创建

思考：如何实现集合中数据的增删改查呢？
回答：通过 MongoDB 语法即可

### 插入文档

语法: `db.集合名.insertOne(JSON数据)`
说明：集合存在 - 则直接插入数据，集合不存在 - 隐式创建
练习：在 test2 数据库的 c1 集合中插入数据 (姓名叫 webopenfather 年龄 18 岁)

```
PLAINTEXTuse test2
db.c1.insert({uname : "webopenfather", age:18})

# 插入数据，下面的示例将一个新文档插入到inventory集合中。
db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)



BASH# 下面的示例将3个新文档插入到inventory集合中。
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])


MongoDB文档与Javascript的对象相近，因此可以这样：BASHfor(let i=1;i<=5;i++){
  print(i);
}

# 插入n条数据
let n = 20;
for(var i=1;i<=n;i++){
  db.inventory.insertOne({number:i})
}

留心1:数据库和集合不存在都隐式创建
留心2:对象的键统一不加引号方便看，但是查看集合数据时系统会自动加
留心3: mongodb会给每条数据增加一个全球唯一的_id键
```

> _id 的组成：时间戳 + 机器码 + PID + 计数器
>
> 可以，只需要给插入的 SON 数据增加`_id` 键即可覆盖（但实战强烈不推荐
> `db.c1.insert({_id:1, uname:"webopenfather", age:18})`

### 查询文档

基础语法: `db.集合名.find(条件[,查询的列])`

条件

- 查询所有数据
- 或者不写
- 查询 age=6 的数据 {age:6}
- 既要 age=6 又要性别 = 男 {age:6 ,sex:’男’}

查询的列 (可选参数

- 不写 – 这查询全部列 (字段
- {age:1} 共显示 age 列 (字段
- {age:0} 除了 age (字段都显示
- 留心：不管你怎么写系统自定义的 _id 都会在

升级语法：

```
PLAINTEXTdb.集合名.find({键:值})	注:值不直接写
			{运算符:值}
			
db.集合名.find({
	键:{运算符:值}
})
```

| 运算符 |   作用   |
| :----: | :------: |
| `$gt`  |   大于   |
| `$gte` | 大于等于 |
| `$lt`  |   小于   |
| `$lte` | 小于等于 |
| `$ne`  |  不等于  |
| `$in`  |    in    |
| `$nin` |  not in  |

```
查询一个表（集合）中的所有文档，可以将一个空文档作为查询过滤器参数传递给查询函数

查询一个表（集合）中的所有文档，可以将一个空文档作为查询过滤器参数传递给查询函数


指定相等条件的查询
BASHdb.inventory.find({item: "mat"})
# 该操作对应如下 SQL 语句：
SELECT * FROM inventory WHERE item = "mat"


BASH# 1 查询inventory集合中status字段为A或者D或者Z
db.inventory.find( { status: { $in: [ "A", "D", "Z"] } } )
# 该操作对应如下 SQL 语句：
SELECT * FROM inventory WHERE status in ("A", "D", "Z")

# 2 查询inventory集合中status等于"A" 和qty小于30的所有文档：
db.inventory.find( { status: "A", qty: { $lt: 30 } } )
# 该操作对应如下 SQL 语句：
SELECT * FROM inventory WHERE status = "A" AND qty < 30

# 3 查询inventory集合中status等于"A" 或qty小于30的所有文档：
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
# 该操作对应如下 SQL 语句：
SELECT * FROM inventory WHERE status = "A" OR qty < 30

# 4 复合查询，查询inventory集合中status等于"A" 并且qty小于30或者以字符p开头的所有文档
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]  # 使用`//`书写正则表达式进行正则匹配
} )
# 该操作对应如下 SQL 语句：
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

# 5 查看第4个爱好为tea的人，索引从0开始
db.user.find({"hobbies.3":'tea'}


查询时控制显示的列：
BASHdb.inventory.find({status:"A"},{'_id':0,'qty':1,'name':1})
# 0表示不显示，1表示显示
# 查询inventory下status为A的所有文档，只显示qty和name字段，不显示_id
```



除了比较运算符还有很多运算符，比如逻辑运算符：

| 运算符                                                       | 说明                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| [`$and`](https://docs.mongodb.com/manual/reference/operator/query/and/#mongodb-query-op.-and) | 返回与两个子句的条件匹配的所有文档。                 |
| [`$not`](https://docs.mongodb.com/manual/reference/operator/query/not/#mongodb-query-op.-not) | 反转查询表达式的效果并返回与查询表达式不匹配的文档。 |
| [`$nor`](https://docs.mongodb.com/manual/reference/operator/query/nor/#mongodb-query-op.-nor) | 返回所有未能匹配两个子句的文档。                     |
| [`$or`](https://docs.mongodb.com/manual/reference/operator/query/or/#mongodb-query-op.-or) | 返回与任一子句的条件匹配的所有文档。                 |

更多运算符请参考[官方文档](https://docs.mongodb.com/manual/reference/operator/query/)。

查询出的结果可以进行排序：

```
BASH# 排序: 1代表升序，-1代表降序
db.user.find().sort({"name":1,})
db.user.find().sort({"age":-1,'_id':1})
```

查询结果进行分页：

```
BASH# 分页: limit代表取多少个文档，skip代表跳过前多少个文档。 
# limit中表示一页显示的条数，skip(页码数*一页显示的条数)
db.user.find().sort({'age':1}).limit(1).skip(2)
```

查询结果计数：

```
BASH# 使用count计数
db.user.count({'age':{"$gt":30}}) 
# 先查询再计数
db.user.find({'age':{"$gt":30}}).count()
```

#### 更新文档

基础语法: `db.集合名.update(条件，新数据[,是否新增,是否修改多条])`

```
BASHdb.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)

# query : 查询条件
# update : update的对象，配合一些更新运算符（如$,$inc...等）
# upsert : 可选，默认为false，代表如果不存在update的记录不更新也不插入，设置为true代表插入。
# multi : 可选，默认为false，代表只更新找到的第一条记录，设为true,代表更新找到的全部记录。
# writeConcern :可选，抛出异常的级
```



```
PLAINTEXT是否新增:指条件匹配不到数据则插入(true是插入，false否不插入默认)
是否修改多条:指将匹配成功的数据都修改(true是，false否默认)
```

升级语法：

```
PLAINTEXTdb.集合名.update(条件，新数据)
				{修改器: {键:值}}
```

|  运算符   |   作用   |
| :-------: | :------: |
|  `$inc`   |   递增   |
| `$netame` | 重命名列 |
|  `$set`   | 修改列值 |
| `$unset`  |  删除列  |

为了更新单个文档，MongoDB提供了更新操作符，例如`$set`，来修改字段值：

```
BASHdb.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

上述更新操作：

- 使用`$set`运算符将字段`size.uom`的值更新为`cm`，将字段`status`的值更新为`P`
- 使用`$currentDate`运算符将字段的值更新为`lastModified`当前日期。如果 `lastModified`字段不存在，将创建该字段。

相关的运算符如下：

| 运算符                                                       | 说明                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`$currentDate`](https://docs.mongodb.com/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) | 将字段的值设置为当前日期，可以是日期或时间戳。               |
| [`$inc`](https://docs.mongodb.com/manual/reference/operator/update/inc/#mongodb-update-up.-inc) | 将字段的值增加指定的数量。                                   |
| [`$min`](https://docs.mongodb.com/manual/reference/operator/update/min/#mongodb-update-up.-min) | 仅当指定值小于现有字段值时才更新字段。                       |
| [`$max`](https://docs.mongodb.com/manual/reference/operator/update/max/#mongodb-update-up.-max) | 仅当指定值大于现有字段值时才更新字段。                       |
| [`$mul`](https://docs.mongodb.com/manual/reference/operator/update/mul/#mongodb-update-up.-mul) | 将字段的值乘以指定的数量。                                   |
| [`$rename`](https://docs.mongodb.com/manual/reference/operator/update/rename/#mongodb-update-up.-rename) | 重命名字段。                                                 |
| [`$set`](https://docs.mongodb.com/manual/reference/operator/update/set/#mongodb-update-up.-set) | 设置文档中字段的值。                                         |
| [`$setOnInsert`](https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/#mongodb-update-up.-setOnInsert) | 如果更新操作导致插入文档，则设置字段的值。如果更新操作没有导致插入则什么都不做。 |
| [`$unset`](https://docs.mongodb.com/manual/reference/operator/update/unset/#mongodb-update-up.-unset) | 从文档中删除指定的字段。                                     |
| [`$addToSet`](https://docs.mongodb.com/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) | 仅当集合中尚不存在元素时，才将元素添加到数组中。             |
| [`$pop`](https://docs.mongodb.com/manual/reference/operator/update/pop/#mongodb-update-up.-pop) | 删除数组的第一项或最后一项。                                 |
| [`$pull`](https://docs.mongodb.com/manual/reference/operator/update/pull/#mongodb-update-up.-pull) | 删除与指定查询匹配的所有数组元素。                           |
| [`$push`](https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push) | 将项目添加到数组。                                           |
| [`$pullAll`](https://docs.mongodb.com/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) | 从数组中删除所有匹配的值。                                   |

MongoDB提供以下方法来更新集合中的文档：

- db.collection.updateOne()：即使匹配多个文档，也最多更新单个文档
- db.collection.updateMany()：匹配多少文档就更新多少文档
- db.collection.replaceOne()：即使匹配多个文档，也只替换单个文档

使用举例：

```
BASH# 1、$inc增加或者减少：将qty增加1
db.inventory.updateOne(
   {item:'canvas'},
   {
       $inc:{qty:1}
   }
)

# 2、所有匹配到的文档，qty减少5
db.inventory.updateMany(
   {},
   {
       $inc:{qty:-5}
   }
)

# 3、$push添加数组内元素，为匹配到的文档添加一个字段hobbies
db.inventory.updateOne(
   {item:'canvas'},
   {
       "$push":{"hobbies":"game"}
   }
)

# 4、$push和$pull按照条件删除元素（不删除字段），"$pull" 把符合条件的全部删除，$pop从两端删一个
db.inventory.updateMany(
   {},
   {
       "$pull":{"hobbies":"game"}
   }
)

# 5、$unset按照条件删除指定字段，空字符串""不会影响操作。如果该字段不存在，不执行任何操作
db.inventory.updateMany(
   {},
   {
       "$unset":{"hobbies":""}
   }
)
```

更多用例请参阅官方文档。

```
PLAINTEXTuse test2;
for(var i = 1; i<= 10; i++){
	db.c3.insert( {"uname":"zs"+i, "age":i});
}
```

#### 删除文档

语法: `db.集合名.remove(条件[,是否删除一条])`
注意：是否删除一条 true 是，false 否、默认为 false

```
BASH> db.c3.find()
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4f6"), "uname" : "zs22", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4f7"), "uname" : "zs2", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4f8"), "uname" : "zs3", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4f9"), "uname" : "zs4", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4fa"), "uname" : "zs5", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4fb"), "uname" : "zs6", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4fc"), "uname" : "zs7", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4fd"), "uname" : "zs8", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4fe"), "uname" : "zs9", "age" : 20 }
{ "_id" : ObjectId("5f3fd0a58989b2009f00b4ff"), "uname" : "zs10", "age" : 20 }
{ "_id" : ObjectId("5f3fde2703673d79be111d2c"), "name" : "zs30", "age" : 20 }
> db.c3.remove({},true)
WriteResult({ "nRemoved" : 1 })
> db.c3.remove({})
WriteResult({ "nRemoved" : 10 })
>
```

提供两种删除方法：

- `db.collection.deleteMany()`：删除多个
- `db.collection.deleteOne()`：删除一个

要从集合中删除所有文档，请将一个空的过滤器`{}`传递给`db.collection.deleteMany()`方法

```
BASHdb.inventory.deleteMany({})
```

删除所有符合条件的文档：

```
BASHdb.inventory.deleteMany( {'qty': 100} )   # 删除所有qty为100的文档
db.inventory.deleteMany({ status : "A" })  # 删除所有status为A的文档
```

仅删除一个符合条件的文档：

```
BASHdb.inventory.deleteOne( {'qty': 100} )   # 即使匹配多个，也只删除一个qty为100的文档
```

### 5 聚合



聚合操作可以处理多个文档并返回计算结果。比如：

- 将多个文档中的值组合在一起。
- 对文档中的值进行运算操作并返回结果
- 分析数据随时间的变化

要执行聚合操作，可以使用

- [聚合管道](https://docs.mongodb.com/manual/aggregation/#std-label-aggregation-framework)
- [单一的聚合方法](https://docs.mongodb.com/manual/aggregation/#std-label-single-purpose-agg-operations)
- [Map-reduce 函数](https://docs.mongodb.com/manual/aggregation/#std-label-aggregation-map-reduce)

聚合管道的每个阶段对输入文档执行一个操作。例如，一个阶段可以过滤文档、分组文档和算值。从一个阶段输出的文档将输入到下一个阶段。聚合管道可以返回文档组的结果。例如，返回总值、平均值、最大值和最小值。

创建用例：

```
BASHdb.orders.insertMany( [
   { _id: 0, productName: "Steel beam", status: "new", quantity: 10 },
   { _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
   { _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
   { _id: 3, productName: "Iron rod", status: "new", quantity: 15 },
   { _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
   { _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
] )
```

下面使用聚合管道，包含两个阶段并返回每个产品的紧急订单总数：

```
BASHdb.orders.aggregate( [
   { $match: { status: "urgent" } },
   { $group: { _id: "$productName", sumQuantity: { $sum: "$quantity" } } }
] )

# $match，筛选文档
# $group，分组
```

更多相关运算符可参阅[官方文档](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)。



## 排序 & 分页

### 明确需求

数据库，是用来存放数据的
咱们后期从数据库获取数据需要排序、多页展示如何实现？

### 准备

```
PLAINTEXTuse test3
db.c1.insert({_id:1,name:"a",sex:1,age:1})
db.c1.insert({_id:2,name:"a",sex:1,age:2})
db.c1.insert({_id:3,name:"b",sex:2,age:3})
db.c1.insert({_id:4,name:"c",sex:2,age:4})
db.c1.insert({_id:5,name:"d",sex:2,age:5})

db.c1.find()
```

### 排序

- 语法: `db.集合名.find().sort(JSON数据)`
- 说明：键 - 就是要排序的列 / 字段、值:`1升序 -1降序`
- 练习：年龄升序 & 降序

```
BASH
> use test3
switched to db test3
> db.c1.insert({_id:1,name:"a",sex:1,age:1})
WriteResult({ "nInserted" : 1 })
> db.c1.insert({_id:2,name:"a",sex:1,age:2})
WriteResult({ "nInserted" : 1 })
> db.c1.insert({_id:3,name:"b",sex:2,age:3})
WriteResult({ "nInserted" : 1 })
> db.c1.insert({_id:4,name:"c",sex:2,age:4})
WriteResult({ "nInserted" : 1 })
> db.c1.insert({_id:5,name:"d",sex:2,age:5})
WriteResult({ "nInserted" : 1 })
> db.c1.find()
{ "_id" : 1, "name" : "a", "sex" : 1, "age" : 1 }
{ "_id" : 2, "name" : "a", "sex" : 1, "age" : 2 }
{ "_id" : 3, "name" : "b", "sex" : 2, "age" : 3 }
{ "_id" : 4, "name" : "c", "sex" : 2, "age" : 4 }
{ "_id" : 5, "name" : "d", "sex" : 2, "age" : 5 }
> db.c1.find().sort({age:1})
{ "_id" : 1, "name" : "a", "sex" : 1, "age" : 1 }
{ "_id" : 2, "name" : "a", "sex" : 1, "age" : 2 }
{ "_id" : 3, "name" : "b", "sex" : 2, "age" : 3 }
{ "_id" : 4, "name" : "c", "sex" : 2, "age" : 4 }
{ "_id" : 5, "name" : "d", "sex" : 2, "age" : 5 }
> db.c1.find().sort({age:-1})
{ "_id" : 5, "name" : "d", "sex" : 2, "age" : 5 }
{ "_id" : 4, "name" : "c", "sex" : 2, "age" : 4 }
{ "_id" : 3, "name" : "b", "sex" : 2, "age" : 3 }
{ "_id" : 2, "name" : "a", "sex" : 1, "age" : 2 }
{ "_id" : 1, "name" : "a", "sex" : 1, "age" : 1 }
>
```

### Limit 和 Skip 方法

- 语法: `db.集合名.find().sort().skip(数字).limit()`

- 说明: skip 跳过指定数量 (可选)，limit 限制查询的数量

- 练习：1 - 降序查询查询 2 条，2 - 降序跳过 2 条并查询 2 条

  ```
  BASH> db.c1.find().sort({age:-1}).skip(0).limit(2)
  { "_id" : 5, "name" : "d", "sex" : 2, "age" : 5 }
  { "_id" : 4, "name" : "c", "sex" : 2, "age" : 4 }
  > db.c1.find().sort({age:-1}).skip(2).limit(2)
  { "_id" : 3, "name" : "b", "sex" : 2, "age" : 3 }
  { "_id" : 2, "name" : "a", "sex" : 1, "age" : 2 }
  >
  ```

### 实战分页

需求：数据库 1 -10 数据，每页显示两条（5 页)
语法: `db.集合名.find().skip().limit(2)`

```
PLAINTEXTskip计算公式: (当前页 – 1) * 每页显示条数


1页	1 2  0
2页	3 4  2
3页  5 6  4
4页  7 8  6
5页  9 10 8
```

## 聚合查询

### 明确需求

思考：如何统计数据、如何实现分组统计等？
回答：通过 MongoDB 聚合查询

### 概念

聚合查询
顾名思义就是把数据聚起来，然后统计

### 语法

语法

```
BASHdb.集合名称.aggregate([
	{管道:{表达式}}
	...
])
```

常用管道

```
PLAINTEXT$group 将集合中的文档分组，用于统计结果
$match 过滤数据，只要输出符合条件的文档
$sort 聚合数据进一步排序
$skip 跳过指定文档数
$limit 限制集合数据返回文档数
...
```

常用表达式

```
PLAINTEXT$sum 总和	$sum:1同count表示统计
$avg 平均
$min 最小值
$max 最大值
```

### 准备

```
BASHuse test4
db.c1.insert({_id:1,name:"a" ,sex:1,age:1})
db.c1.insert({_id:2,name:"a" ,sex:1,age:23})
db.c1.insert({_id:3,name:"b",sex:2,age:3})
db.c1.insert({_id:4,name:"c",sex:2,age:4})
db.c1.insert({_id:5,name:"d",sex:2,age:5})
```

### 练习

- 统计男生、女生总年龄

  ```
  BASHdb.c1.aggregate([
  	{ 
  		$group: {
  			_id: "$sex",
  			rs: {$sum:"$age"}
  		} 
  	}
  ])
  ```

  示例：

  ```
  BASH> db.c1.aggregate([
  ... {
  ... $group: {
  ... _id: "$sex",
  ... rs: {$sum:"$age"}
  ... }
  ... }
  ... ])
  { "_id" : 2, "rs" : 12 }
  { "_id" : 1, "rs" : 24 }
  >
  ```

- 统计男生、女生总人数

  ```
  BASHdb.c1.aggregate([
  	{ 
  		$group: {
  			_id: "$sex",
  			rs: {$sum:1}
  		} 
  	}
  ])
  ```

  示例：

  ```
  BASH> db.c1.aggregate([
  ... {
  ... $group: {
  ... _id: "$sex",
  ... rs: {$sum:1}
  ... }
  ... }
  ... ])
  { "_id" : 2, "rs" : 3 }
  { "_id" : 1, "rs" : 2 }
  >
  ```

- 求学生总数和平均年龄

  ```
  BASHdb.c1.aggregate([
  	{
  		$group:{
  			_id:null,
  			total_num:{$sum:1},
  			total_avg:{$avg:"$age"}
  		}
  	}
  ])
  ```

  示例：

  ```
  BASH> db.c1.aggregate([
  ... {
  ... $group:{
  ... _id:null,
  ... total_num:{$sum:1},
  ... total_avg:{$avg:"$age"}
  ... }
  ... }
  ... ])
  { "_id" : null, "total_num" : 5, "total_avg" : 7.2 }
  ```

- 查询男生、女生人数、按人数升序

  ```
  BASHdb.c1.aggregate([
  	{ $group: {_id:"$sex",rs:{$sum: 1}}},
  	{ $sort:{rs:1} }
  ])
  ```

  示例：

  ```
  BASH> db.c1.aggregate([
  ... { $group: {_id:"$sex",rs:{$sum: 1}}},
  ... { $sort:{rs:1} }
  ... ])
  { "_id" : 1, "rs" : 2 }
  { "_id" : 2, "rs" : 3 }
  >
  ```

## 优化索引

### 生活中的索引

公交路牌、字典的索引、办公区域索引

### 数据库中的索引

- 说明：索引是一种排序好的便于快速查询的数据结构

### 索引优缺点

- 优点

  > 提高数据查询的效率，降低数据库的 IO 成本
  > 通过索引对数据进行排序，降低数据排序的成本，降低 CPU 的消耗

- 缺点

> 占用磁盘空间
> 大量索引影响 SQL 语句效率，因为每次插入和修改数据都需要更新索引

### 语法

- 创建索引语法: `db.集合名.createlndex(待创建索引的列[,额外选项])`

- 参数:

  > 待创建索引的列:{键：1,…. 键:-1}
  > 说明：1 升序 - 1 降序 例如 {age:1} 表示创建 age 索引并按照升序的方式存储
  > 额外选项：设置索引的名称或者唯一索引等等

- 删除索引语法:

  > 全部删除: `db.集合名.droplndexes()`
  > 删除指定: `db.集合名.droplndex(索引名)`

- 查看索引语法: `db.集合名.getlndexes()`

### 练习

准备∶向数据库中新增十万条数据

> ```
> BASH//选择数据库
> use test5;
> //向数据库中添加数据
> for(var i=0;i<100000;i++){
> 	db.c1.insert({'name':"aaa"+i,"age":i});
> }
> ```

创建普通索引：

> 需求：给 name 添加普通索引
>
> 练习 1: 给 name 添加普通索引，命令: `db.c1.createIndex({name:1})`
>
> ```
> BASH
> > db.c1.count()
> 100000
> > db.c1.createIndex({name:1})
> {
>         "createdCollectionAutomatically" : false,
>         "numIndexesBefore" : 1,
>         "numIndexesAfter" : 2,
>         "ok" : 1
> }
> > db.c1.getIndexes()
> [
>         {
>                 "v" : 2,
>                 "key" : {
>                         "_id" : 1
>                 },
>                 "name" : "_id_"
>         },
>         {
>                 "v" : 2,
>                 "key" : {
>                         "name" : 1
>                 },
>                 "name" : "name_1"
>         }
> ]
> >
> ```
>
> 练习 2: 删除 name 索引，命令: `db.c1.dropIndex('name_1')`
>
> ```
> BASH> db.c1.dropIndex('name_1')
> { "nIndexesWas" : 2, "ok" : 1 }
> > db.c1.getIndexes()
> [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
> >
> ```
>
> 练习 3: 给 name 创建索引并起名 zykj
>
> 命令: `db.c1.createIndex({name:1},{name:"zykj"})`
>
> ```
> BASH
> > db.c1.createIndex({name:1},{name:"zykj"})
> {
>         "createdCollectionAutomatically" : false,
>         "numIndexesBefore" : 1,
>         "numIndexesAfter" : 2,
>         "ok" : 1
> }
> > db.c1.getIndexes()
> [
>         {
>                 "v" : 2,
>                 "key" : {
>                         "_id" : 1
>                 },
>                 "name" : "_id_"
>         },
>         {
>                 "v" : 2,
>                 "key" : {
>                         "name" : 1
>                 },
>                 "name" : "zykj"
>         }
> ]
> >
> ```

创建符合索引

> 需求：给 name 和 age 添加组合索引
>
> 说明：就是一次给两个字段建立索引
>
> 语法：`db.集合名.createIndex({键1:方式,键2:方式})`
>
> ```
> BASH
> > db.c1.createIndex({name:1,age:1})
> {
>         "createdCollectionAutomatically" : false,
>         "numIndexesBefore" : 2,
>         "numIndexesAfter" : 3,
>         "ok" : 1
> }
> > db.c1.getIndexes()
> [
>         {
>                 "v" : 2,
>                 "key" : {
>                         "_id" : 1
>                 },
>                 "name" : "_id_"
>         },
>         {
>                 "v" : 2,
>                 "key" : {
>                         "name" : 1
>                 },
>                 "name" : "zykj"
>         },
>         {
>                 "v" : 2,
>                 "key" : {
>                         "name" : 1,
>                         "age" : 1
>                 },
>                 "name" : "name_1_age_1"
>         }
> ]
> >
> ```

创建唯一索引

> 需求：给 name 添加普通索引
>
> 语法：`db.集合名.createIndex(待添加索引的列,{unique:列名})`
>
> 练习 1：删除全部索引，命令: `db.c1.dropIndexes()`
>
> ```
> BASH> db.c1.dropIndexes()
> {
>         "nIndexesWas" : 3,
>         "msg" : "non-_id indexes dropped for collection",
>         "ok" : 1
> }
> > db.c1.getIndexes()
> [ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
> >
> ```
>
> 练习 2：设置唯一索引、命令：`db.createIndex({name:1},{unique:"name"})`
>
> ```
> BASH> db.c1.createIndex({name:1},{unique:"name"})
> {
>         "createdCollectionAutomatically" : false,
>         "numIndexesBefore" : 1,
>         "numIndexesAfter" : 2,
>         "ok" : 1
> }
> >
> ```
>
> 练习 3：测试唯一索引的特性，
>
> 命令： `db.c1.insert({name:"a"}) db.c1.insert({name:"a"})`
>
> ```
> BASH> db.c1.insert({name:"a"})
> WriteResult({ "nInserted" : 1 })
> > db.c1.insert({name:"a"})
> WriteResult({
>         "nInserted" : 0,
>         "writeError" : {
>                 "code" : 11000,
>                 "errmsg" : "E11000 duplicate key error collection: test5.c1 index: name_1 dup key: { name: \"a\" }"
>         }
> })
> >
> ```

### 分析索引 (explain)

语法: `db.集合名.find().explain('executionStats')`
说明:

[](https://cdn.jsdelivr.net/gh/zykjofficial/zykjimg@master/img/20200822204612.png)

- `COLLSCAN` 全表扫描
- `IXSCAN` 索引扫描
- `FETCH` 根据索引去检索指定 document

练习

> 测试: age 未添加索引情况
> 语法: `db.c1.find({age:18}).explain('executionStats');`
>
> ```
> BASH
> > db.c1.find({age:18}).explain('executionStats')
> {
>         "queryPlanner" : {
>                 "plannerVersion" : 1,
>                 "namespace" : "test5.c1",
>                 "indexFilterSet" : false,
>                 "parsedQuery" : {
>                         "age" : {
>                                 "$eq" : 18
>                         }
>                 },
>                 "winningPlan" : {
>                         "stage" : "COLLSCAN",
>                         "filter" : {
>                                 "age" : {
>                                         "$eq" : 18
>                                 }
>                         },
>                         "direction" : "forward"
>                 },
>                 "rejectedPlans" : [ ]
>         },
>         "executionStats" : {
>                 "executionSuccess" : true,
>                 "nReturned" : 1,
>                 "executionTimeMillis" : 121,
>                 "totalKeysExamined" : 0,
>                 "totalDocsExamined" : 100001,
>                 "executionStages" : {
>                         "stage" : "COLLSCAN",
>                         "filter" : {
>                                 "age" : {
>                                         "$eq" : 18
>                                 }
>                         },
>                         "nReturned" : 1,
>                         "executionTimeMillisEstimate" : 7,
>                         "works" : 100003,
>                         "advanced" : 1,
>                         "needTime" : 100001,
>                         "needYield" : 0,
>                         "saveState" : 100,
>                         "restoreState" : 100,
>                         "isEOF" : 1,
>                         "direction" : "forward",
>                         "docsExamined" : 100001
>                 }
>         },
>         "serverInfo" : {
>                 "host" : "MACHENIKE-SRTYLP00",
>                 "port" : 27017,
>                 "version" : "4.4.0",
>                 "gitVersion" : "563487e100c4215e2dce98d0af2a6a5a2d67c5cf"
>         },
>         "ok" : 1
> }
> >
> ```
>
> 测试：age 未添加索引情况
> 语法：`db.c1.find({age:18}).explain ('executionStats');`
>
> [](https://cdn.jsdelivr.net/gh/zykjofficial/zykjimg@master/img/20200822210512.png)
>
> 测试：age 添加索引情况
> 语法：db.c1.createIndex ({age: 1})
> 继续：`db.c1.find({age:18}).explain('executionStats')`
> [](https://cdn.jsdelivr.net/gh/zykjofficial/zykjimg@master/img/20200822210619.png)

### 选择规则 (如何选择合适的列创建索引)

- 为常做条件、排序、分组、联合操作的字段建立索引
- 选择唯 — 性索引 (ps. 同值较少如性别字段)
- 选择较小的数据列，为较长的字符串使用前缀索引 (ps. 索引文件更小)

## 权限机制



### 内置角色

介绍常用的内置角色。更多角色[请参考这里](https://docs.mongodb.com/manual/reference/built-in-roles/)。

数据库用户角色：

- `read`读权限，提供读取所有非系统集合上的数据的能力。
- `readWrite`读写权限，包含`read`所有权限以及修改所有非系统集合上的数据的能力。

数据库管理角色：

- `dbAdmin`提供执行管理任务的能力，例如与模式相关的任务、索引和收集统计信息。此角色不授予用户和角色管理权限。
- `userAdmin`提供在当前数据库上创建和修改角色和用户的能力。
- `dbOwner`数据库所有者可以对数据库执行任何管理操作。此角色结合了`readWrite`、`dbAdmin`和`userAdmin`的权限。

集群管理角色：

- `hostManager`提供监视和管理服务器的能力
- `clusterManager`在集群上提供管理和监视操作。可以访问配置和本地数据库，这些数据库分别用于分片和复制
- `clusterMonitor`提供对监控工具的只读访问
- `clusterAdmin`提供最强大的集群管理访问(副本集、分片、主从等)。组合了`clusterManager`、`clusterMonitor`和`hostManager`角色的能力，还提供了`dropDatabase`操作

备份恢复角色：

- `backup`提供备份数据所需的能力
- `restore`提供使用`mongorestore`恢复数据的能力

以下角色提供了为任何用户分配对任何数据库的任何特权的能力，这意味着具有这些角色之一的用户可以为自己分配对任何数据库的任何特权：

- `dbOwner`角色作用于`admin`数据库时
- `userAdmin`角色作用于`admin`数据库时
- `userAdminAnyDatabase`角色

以下角色提供对所有资源的完全权限：

- `root`

### 2 创建管理员用户

### 创建管理员用户

管理员用户在admin库下创建

```
BASH> use admin
> db.createUser(
  {
    user: "root",
    pwd: "123",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```

其他普通用户的创建也是一样的，提供一个通用模版：

```
BASH> db.createUser({
    user:"xxx",
    pwd:"xxxx",
    customDate:"xxx",
    roles:[{    #指定角色名称以及认证库
        role:"xxx", db:"xxxx"
    }]
})
```

### 3 开启访问控制

创建完成用户后，可以通过修改配置文件来启用RBAC，或者在命令行启动MongoDB时加上 `-auth`参数启动。这里选择前者：

```
BASHvim /etc/mongod.conf  # mongdb的配置文件，是yaml格式
# 修改security.authorization
security:
    authorization: enabled
```

> 补充：更多关于配置文件的内容，参阅官方文档：https://docs.mongodb.com/manual/reference/configuration-options/

重启`mongod`服务：

```
BASHsystemctl restart mongod
```

> 如果出现重启失败的情况，查看mongod状态：`systemctl status mongod`
>
> 如果有类似的错误`Process: ***ExecStart=/usr/bin/mongod $OPTIONS (code=exited, status=14)`，通常是权限问题，`mongod`没有对必需文件的写权限，导致数据库服务不能启动。解决方案如下：
>
> ```
> BASHchown -R mongod:mongod /var/lib/mongo
> chown -R mongod:mongod /var/log/mongodb
> chown mongod:mongod /tmp/*.sock
> ```

重启后，尝试连接服务：

```
BASHmongosh --host localhost --port 27017
```

发现不使用用户名和密码依然可以连接到数据库。但是没有权限查看数据库。

在登录时认证：

```
BASHmongosh --host localhost --port 27017 -u root -p 123 --authenticationDatabase admin
# -u 指定用户名
# -p 指定密码
# --authenticationDatabase 指定认证到哪个库（因为mongodb基于库进行RBAC控制）
```

也可以先不认证，连接之后再认证：

```
BASHmongosh --host localhost --port 27017 # 先不认证
> use admin  # 切换到要认证的库
> db.auth("root","123") # 在哪个库创建的用户就需要使用哪个库进行认证
```

### 4 删除用户

使用如下命令：

```
BASH> db.dropUser("root")
```

### 5 修改密码

使用如下命令：

```
BASHdb.changeUserPassword("user","new_passwd")
```

## 五、API

MongoDB官方提供了众多API方便不同语言调用，包括C，C++，GO，Java，Python，PHP，Node.js，C#等等

### 明确需求

发现我们再 DOS 窗口直接输入命令就可以登录数据库

这在实战工作中绝对不允许的

思考：如何解决

回答：使用权限机制，开启验证模式即可

### 语法

```
BASHdb.createUser({ 
    "user" : "账号",
    "pwd": "密码",
    "roles" : [{ 
        role: "角色", 
        db: "所属数据库"
    }] 
})
```

|    角色种类    |                             说明                             |
| :------------: | :----------------------------------------------------------: |
|  超级用户角色  |                            `root`                            |
| 数据库用户角色 |                     `read`、`readWrite`                      |
| 数据库管理角色 |                    `dbAdmin`、`userAdmin`                    |
|  集群管理角色  | `clusterAdmin`、`clusterManager`、`clusterMonitor`、`hostManager` |
|  备份恢复角色  |                     `backup`、`restore`                      |
| 所有数据库角色 | `readAnyDatabase`、`readWriteAnyDatabase`、`userAdminAnyDatabase`、`dbAdminAnyDatabase` |

|          角色          |                           角色说明                           |
| :--------------------: | :----------------------------------------------------------: |
|         `root`         |        只在 admin 数据库中可用。超级账号，超级权限；         |
|         `read`         |                    允许用户读取指定数据库                    |
|      `readWrite`       |                    允许用户读写指定数据库                    |
|       `dbAdmin`        | 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile； |
|  `dbAdminAnyDatabase`  |  只在 admin 数据库中可用，赋予用户所有数据库的 dbAdmin 权限  |
|     `clusterAdmin`     | 只在 admin 数据库中可用，赋予用户所有分片和复制集相关函数的管理权限 |
|      `userAdmin`       | 允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户 |
| `userAdminAnyDatabase` | 只在 admin 数据库中可用，赋予用户所有数据库的 userAdmin 权限 |
|   `readAnyDatabase`    |     只在 admin 数据库中可用，赋予用户所有数据库的读权限      |
| `readWriteAnyDatabase` |    只在 admin 数据库中可用，赋予用户所有数据库的读写权限     |

### 开启验证模式

开启验证模式概念：名词，指用户需要输入账号密码才能登陆使用
操作步骤

1. 添加超级管理员
2. 退出卸载服务
3. 重新安装需要输入账号密码的服务 (注在原安装命令基础上加上–auth 即可
4. 启动服务 -> 登陆测试

#### 步骤 1∶添加超级管理员

```
BASHmongo
use admin
db.createUser({
    "user": "admin",
    "pwd": "123456",
    "roles": [{
        role: "root",
        db: "admin"
	}]
})
```

脚下留心：2.x3.x4.x 前面版本默认是看不到 admin 没关系你直接选中即可

示例：

```
BASH
> db.createUser({
...     "user": "admin",
...     "pwd": "123456",
...     "roles": [{
...         role: "root",
...         db: "admin"
... }]
... })
Successfully added user: {
        "user" : "admin",
        "roles" : [
                {
                        "role" : "root",
                        "db" : "admin"
                }
        ]
}
> show collections
system.users
system.version
> db.system.users.find().pretty()
{
        "_id" : "admin.admin",
        "userId" : UUID("3f00e53b-8c36-4c75-adc3-6c0b78449490"),
        "user" : "admin",
        "db" : "admin",
        "credentials" : {
                "SCRAM-SHA-1" : {
                        "iterationCount" : 10000,
                        "salt" : "K8myxTY/yJz7RvZiQWqg/w==",
                        "storedKey" : "oF2VefhQw26ViWm4GTdKTFcgTTM=",
                        "serverKey" : "G3AZip1W1v35PXvyGqlBDSocy0I="
                },
                "SCRAM-SHA-256" : {
                        "iterationCount" : 15000,
                        "salt" : "pVUDZjB183V6DeDnVQZ3Dy1fmGbedWQedDLCLA==",
                        "storedKey" : "wRwieyrn5ZT8TnEzqcqHEGUA2/n6TrPNlcNaAtibO9E=",
                        "serverKey" : "bJIbWRbis72kyw/WF48F9m58kpHK8rcVZbQL6kehoPQ="
                }
        },
        "roles" : [
                {
                        "role" : "root",
                        "db" : "admin"
                }
        ]
}
>
```

#### 步骤 2: 退出卸载服务

脚下留心: DOS 窗口必须用管理员省份运行

```
BASHbin\mongod --remove
```

示例：

```
BASHD:\Programs\MongoDB\bin>mongod --remove
{"t":{"$date":"2020-08-22T21:42:20.619+08:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"main","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
{"t":{"$date":"2020-08-22T21:42:20.623+08:00"},"s":"W",  "c":"ASIO",     "id":22601,   "ctx":"main","msg":"No TransportLayer configured during NetworkInterface startup"}
{"t":{"$date":"2020-08-22T21:42:20.625+08:00"},"s":"I",  "c":"NETWORK",  "id":4648602, "ctx":"main","msg":"Implicit TCP FastOpen in use."}
{"t":{"$date":"2020-08-22T21:42:20.625+08:00"},"s":"I",  "c":"CONTROL",  "id":23307,   "ctx":"main","msg":"Trying to remove Windows service '{toUtf8String_serviceName}'","attr":{"toUtf8String_serviceName":"MongoDB"}}
{"t":{"$date":"2020-08-22T21:42:20.647+08:00"},"s":"I",  "c":"CONTROL",  "id":23310,   "ctx":"main","msg":"Service {toUtf8String_serviceName} is curnettly running, stopping service","attr":{"toUtf8String_serviceName":"MongoDB"}}
{"t":{"$date":"2020-08-22T21:42:20.647+08:00"},"s":"I",  "c":"CONTROL",  "id":23311,   "ctx":"main","msg":"Service '{toUtf8String_serviceName}' stopped","attr":{"toUtf8String_serviceName":"MongoDB"}}
{"t":{"$date":"2020-08-22T21:42:20.649+08:00"},"s":"I",  "c":"CONTROL",  "id":23312,   "ctx":"main","msg":"Service '{toUtf8String_serviceName}' removed","attr":{"toUtf8String_serviceName":"MongoDB"}}

D:\Programs\MongoDB\bin>
```

#### 步骤 3∶安装需要身份验证的 MongoDB 服务

在原安装命令基础上加 `--auth`

```
PLAINTEXTmongod --install --dbpath ‪D:\Programs\MongoDB\data --logpath ‪D:\Programs\MongoDB\logs\mongoDB2.log --auth
```

示例：

```
BASHD:\Programs\MongoDB\bin>mongod --install --dbpath D:\Programs\MongoDB\data --logpath D:\Programs\MongoDB\logs\mongoDB2.log --auth
D:\Programs\MongoDB\bin>net start mongodb
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。


D:\Programs\MongoDB\bin>
```

### 通过超级管理员账号登录

- 方法 1: `mongo服务器IP地址:端口/数据库 -u 用户名 -p 密码`

  ```
  BASH
  D:\Programs\MongoDB\bin>mongo localhost:270107/admin -u admin -p 123456
  MongoDB shell version v4.4.0
  exception: Port number 270107 out of range parsing HostAndPort from "localhost:270107"
  exiting with code 1
  
  D:\Programs\MongoDB\bin>mongo localhost:27017/admin -u admin -p 123456
  MongoDB shell version v4.4.0
  connecting to: mongodb://localhost:27017/admin?compressors=disabled&gssapiServiceName=mongodb
  Implicit session: session { "id" : UUID("05f0c834-a11b-42e7-af35-eafddd17cf95") }
  MongoDB server version: 4.4.0
  ---
  The server generated these startup warnings when booting:
          2020-08-22T21:56:41.558+08:00: This server is bound to localhost. Remote systems will be unable to connect to this server. Start the server with --bind_ip <address> to specify which IP addresses it should serve responses from, or with --bind_ip_all to bind to all interfaces. If this behavior is desired, start the server with --bind_ip 127.0.0.1 to disable this warning
  ---
  ---
          Enable MongoDB's free cloud-based monitoring service, which will then receive and display
          metrics about your deployment (disk utilization, CPU, operation statistics, etc).
  
          The monitoring data will be available on a MongoDB website with a unique URL accessible to you
          and anyone you share the URL with. MongoDB may use this information to make product
          improvements and to suggest MongoDB products and deployment options to you.
  
          To enable free monitoring, run the following command: db.enableFreeMonitoring()
          To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
  ---
  >
  ```

- 方法 2: `a-先登录，b-选择数据库，c-输入db.auth(用户名,密码)`

  ```
  BASHD:\Programs\MongoDB\bin>mongo
  MongoDB shell version v4.4.0
  connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
  Implicit session: session { "id" : UUID("a3cc854e-96aa-445e-9824-5514ef382981") }
  MongoDB server version: 4.4.0
  > use admin
  switched to db admin
  > db.auth('admin','123456')
  1
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  school  0.000GB
  test2   0.000GB
  test3   0.000GB
  test4   0.000GB
  test5   0.004GB
  >
  ```

### 练习

- 需求

  > 添加用户 shop1 可以读 shop 数据库
  > 添加用户 shop2 可以读写 shop 数据库
  > 脚下留心：必须在对应数据库创建用户

- 准备：创建测试数据和测试用户 (注：选择 shop 仓库创建用户)

  > ```
  > BASHuse shop;
  > for(var i=1; i<=10; i++) {
  > 	db.goods .insert({ "name" : "goodsName"+i , "price" :i});
  > }
  > ```

- 添加用户并设置权限

  ```
  BASH
  // 切记
  use shop
  
  // shop1 只能读
  db.createUser({ 
      "user" : "shop1",
      "pwd": "shop1",
      "roles" : [{ 
          role: "read", 
          db: "shop"
      }] 
  })
  
  // shop2 只能写
  db.createUser({ 
      "user" : "shop2",
      "pwd": "shop2",
      "roles" : [{ 
          role: "readWrite", 
          db: "shop"
      }] 
  })
  ```

- 验证

  ```
  BASHmongo localhost:270107/shop -u shop1 -p shop1
  
  mongo localhost:270107/shop -u shop2 -p shop2
  ```

## 备份还原

### 明确需求

在实战工作中一定要做好数据库备份工作
否则万一数据丢失
带来的影响是巨大的

不知道为啥下面的命令我执行不了。。。

### 备份数据库 mongodump

```
PLAINTEXTmongodump -h -port -u -p -d -o
```

- `-h` 表示服务器 IP 地址（不写默认本机）
- `-port` 表示端口（默认 27017）
- `-u` 表示账号
- `-p` 表示密码
- `-d` 表示数据库（数据库不写则导出全部）
- `-o` 备份到指定目录下

------

- 练习 (备份所有数据): `mongodump -u admin -p 123456 -o ‪D:\Programs\MongoDB\bak`
- 练习 (备份指定数据): `mongodump -u shop2 -p shop2 -d shop -o ‪D:\Programs\MongoDB\bak`

### 还原数据库 mongorestore

```
BASHmongorestore -h -port -u -p --drop -d
```

- `-h` 表示服务器 IP 地址（不写默认本机）
- `-port` 表示端口（默认 27017）
- `-u` 表示账号
- `-p` 表示密码
- `-d` 表示数据库（数据库不写则还原所有）
- `–drop` 表示先删除在导出，不写则覆盖

1. 还原所有数据

   ```
   PLAINTEXTmongorestore -u admin -p 123456 --drop D:\Programs\MongoDB\back
   ```

2. 备份指定数据库

   ```
   PLAINTEXTmongorestore -u shop2 -p shop2 -d shop --drop D:\Programs\MongoDB\back1\shop
   ```
