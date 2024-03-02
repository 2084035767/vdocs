## MongoDB基本操作

[TOC]

### 1. 配置信息

#### 1.1 自动重启配置MongoDB服务

在WIN的环境下使用WIN + R键输入`services.msc`并且回车，找到`MongoDB Serever(MongpDB)`服务右键启动即可；

> MongoDB的默认端口号为 **:27017**

### 2. 核心概念

#### 2.1 库<DataBase>

`MongoDB中的库也是类似于Mysql中的数据库，用来通过不同的库隔离不同的应用程序`；

可以建造多个库，每一个库都有自己的集合和权限，不同的数据库也放置在不同的文件当中；

默认的数据库为 `test` ，数据库储存在 `指定的data目录当中`；

##### 2.1.1 查看所有库

- `> show databases; | show dbs;`

- 从打印的信息来看一共有三个库；

  --- admin 0.00GB

  --- config 0.00GB

  --- local 0.00GB

> **⚠️注意:**
>
> `admin` 、`config`、`local` 这三个库是MongoDB的保留库。不要删除也不要随便对其进行操作；
>
> admin：从权限角度来看，这是 `root` 库。如果将一个用户添加到这个数据库当中，这个用户将会自动继承所有的数据库的权限。一些特定的服务器端命令也只能从这个数据库运行。
>
>  比如：列出所有的数据库或者关闭服务器；
>
> config：当MongoDB用于分片设置时。config数据库在内部使用，用于保存分片的相关信息；
>
> local： 这个数据永远不会被复制，可以用来储存限于本地单台服务器的任意集合；

##### 2.1.2 创建数据库/切换

```
use DataBaseName;
```

> **⚠️注意:**
>
> 只有当使用的库不存在的时候才会进行创造，如果存在则是切换至目标库；
>
> use 代表创建并使用，当这个库中没有数据的时候是不显示这个库的；
>
> 查询当前在哪个数据库使用 `db` 进行查询 默认是 `test` 库；

##### 2.1.3 删除数据库

```
db.dropDatabase();
```

删除当前选中的库；

> **⚠️注意:**
>
> 虽然删除后确实是把数据库删除了，但是当你未切换成其它库或者退出时使用`db`来查询当前所在库时仍然是显示处在此库当中；

#### 2.2 集合<Collection>

`MongoDB中的集合就是其中的文档组（储存许多的文档），类似于Mysql数据库当中的表的作用`；

集合存在于数据库当中，一个库可以创建多个集合；

每个集合 `没有固定的结构` 。这意味着可以 `在对集合插入不同格式和类型的数据` ，但通常情况下插入集合的数据都会有一定的关联性；

##### 2.2.1 查看集合

```
show collections; | show tables;
```

##### 2.2.2 创建集合

```
db.createCollection("collectionName", [options]);
```

> 创建集合又两个参数，第一个参数是填写 集合的名称，第二个参数是填写设置。`如果不填写options则使用默认配置`；
>
> **Options部分参数：**
>
> | 字段   | 类型 | 描述                                                         |
> | ------ | ---- | ------------------------------------------------------------ |
> | capped | 布尔 | （可选）如果为true，则创建固定集合。固定集合是指有着固定大小的集合； 如果参数达到了最大值，它会自动覆盖最早的文档。**当该值为true时，必须制定size参数**； |
> | size   | 数值 | （可选）为固定集合制定一个指定的最大值，即字节数； **如果capped为true时，必须制定该字段的参数**； |
> | max    | 数值 | （可选）指定固定集合中包含文档的最大数量；                   |
>
> > ```
> > 🌰
> > json
> > 复制代码db.createCollection("collectionNmae", {max: 100, capped: true, size:1000})
> > ```
>
> > `当集合不存在时，向集合之中插入文档时，也会自动创建该集合`；

##### 2.2.3 删除集合

```
db.collectionName.drop();
```

#### 2.3文档<Document>

文档是集合中一条条记录，是一组键值对（key-value）；

MongoDB的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别；

这也是MongoDB非常突出的特点；

> ```
> 🌰
> json复制代码{
> 	"name": "urbaneH",
> 	"drink": "water"
> }
> ```

##### 2.3.1 插入文档

- **单条文档**

> ```
> db.collectionName.insert({name: "UrbaneH", age: 18});
> ```

- **多条文档**

> ```java
> java复制代码db.collectionName.insertMany(
> 	[<Document1>, <Document2>, ......],
> 	{
> 		writeConcern: 1, // 写入策略，默认为1，即要求确认写操作，如果为0，则是不要求；
> 		ordered: true // 指定是否按顺序写入，默认true；
> 	}
> )
>   // 例如 insert也可以不一定要insertMany；
> db.collectionName.insert([
>   {name: "xiaohua", "age": 17},
>   {name: "xiaohu", "age": 18}
> ])
> ```

- **脚本方式**

> ```js
> js复制代码for (let i = 0; i <= 100; i++){
> 	db.collectionName.insert({
> 		"_id": i,
> 		"name": "hahah",
> 		"age": i + 1;
> 	})
> }
> ```

> **⚠️注意:**
>
> `在MongoDB中每个文档都会有一个_id作为唯一标识，_id默认会自动生成如果手动指定将使用手动指定的值作为_id的值`；

##### 2.3.2 查询集合所有

```
db.collectionName.find();
```

##### 2.3.3 删除文档

> ```java
> java复制代码db.collectionName.remove(
> 	<query>, // 条件；
> 	{					// 删除的配置对象；
> 		justOne: <boolean>, // 是否仅删除一条数据；
>     		writeConcern: <Document> // 如果抛出意外，抛出的异常级别；
> 	}
> );
> ```
>
> > 如果 `justOne` 不选择或者参数为 `false` 则表示删除匹配到的所有文档；
>
> > **如果remove不带有条件的话（但仍要在条件处带有 `{}`表示空条件），就是删除所有**;

##### 2.3.4 更新文档

> ```java
> java复制代码db.collectionName.update(
> 	<query>,
> 	<update>,
> 	{
> 		upsert: <boolean>,
> 		mulit: <boolean>,
> 		wirteConcern: <Document>
> 	}
> );
> ```
>
> > **query**：update的查询条件，类似sql update查询where后面的部分；
>
> > **update**：update的对象和一些更新的操作符（如$, $inc, ......）等，也可以理解为sql update查询内的set后面的部分；
>
> > **upsert**：`可选`，这个参数的意思是，如果不存在update的记录，是否插入objNew，默认为 `false` 不插入；`<boolaen>类型`
>
> > **mulit**：`可选`，这个参数的意思是，是否只更新找到的第一条数据，默认为 `false` ，如果为 **true** 则将所有查询到的数据都进行更新；`<boolean>类型`
>
> > **wirteConcern**：`可选`，抛出的异常级别；
>
> ```
> 🌰
> sql复制代码> db.collectionName.update({"name": "UrbaneH"}, {"name": "11", "bir": new date()})
> --- 这个更新是将符合条件的全部更新成后面的文档，相当于先删除再更新；
> > db.collectionName.update({"name": "UrbaneH"}, {$set: {"name": "xiaohua"}})
> --- 保留原来的数据更新，但只更新符合条件的第一条数据；
> > db.collectionName.update({"name": "UrbaneH"}, {$ser: {"name": "xiaohua"}}, {mulit: true})
> --- 保留原来的数据更新，更新符合条件的所有数据；
> > db.collectionName.update(
> 	{"name": "UrbaneH"},
> 	{$set: {"name": "xiaohua"}},
> 	{
> 		mulit: true,
> 		upset: true
> 	}
> )
> --- 保留原来的数据更新，更新符合条件的所有数据，没有符合条件时插入数据；
> ```

##### 2.3.5 查询文档

```
db.collectionName.find(query, projection);
```

> > **query**：`可选` 使用查询操作符指定查询条件；
>
> > **projection**：`可选 `使用投影操作符指定返回的键。查询时返回文档中所有的键值，只需要省略该参数即可。默认为省略；
>
> **⚠️注意:**
>
> 默认的查询是非结构化的，如果需要使得结果结构化也更加易读，需要在后面加上 `pretty()`
>
> ```
> 🌰
> db.collectionName.find(query, projection).pretty();
> ```

###### 2.3.5.1对比语法

> | 操作       | 格式                     | 范例                                        | RDBMS中的类似语句      |
> | ---------- | ------------------------ | ------------------------------------------- | ---------------------- |
> | 等于       | `{<key>:<value>`}        | `db.col.find({"by":"UrbaneH"}).pretty()`    | `where by = 'UrbaneH'` |
> | 小于       | `{<key>:{$lt:<value>}}`  | `db.col.find({"likes":{$lt:50}}).pretty()`  | `where likes < 50`     |
> | 小于或等于 | `{<key>:{$lte:<value>}}` | `db.col.find({"likes":{$lte:50}}).pretty()` | `where likes <= 50`    |
> | 大于       | `{<key>:{$gt:<value>}}`  | `db.col.find({"likes":{$gt:50}}).pretty()`  | `where likes > 50`     |
> | 大于或等于 | `{<key>:{$gte:<value>}}` | `db.col.find({"likes":{$gte:50}}).pretty()` | `where likes >= 50`    |
> | 不等于     | `{<key>:{$ne:<value>}}`  | `db.col.find({"likes":{$ne:50}}).pretty()`  | `where likes != 50`    |

###### 2.3.5.2 AND查询

> ```
> db.collectionName.find({key1:value1, key2: value2});
> ```
>
> **如果相同的字段出现的话会以最后一次出现为准；**
>
> **类似于 where 的 WHERE key1 = value1 AND key2 = value2；**

###### 2.3.5.3 OR查询

> ```sql
> sql复制代码db.collectionName.find({
> 	$or: [
> 		{key1: value1}, {key2: value2}
> 	]
> }).pretty()
> ```
>
> **类似于 WHERE key1 = value1 OR key2 = value2;**

###### 2.3.5.4 AND和OR查询

> ```
> db.collectionName.find({"age": {$gt: 50}}, $or: [{"name": "UrbaneH"}, {"name": "MongoDb"}]).pretty();
> ```
>
> **这就类似于 WHERE age > 50 AND (name = “UrbaneH” OR name = “MongoDB”);**

###### 2.3.5.5 🌟数组中查询

> ```
> db.collectionName.find({shuzu: "baohanneirong"})
> ```
>
> **⬆️表示查询shuzu中的数组包含baohanneirong的文档**
>
> 只需要使用包含数组的字段作为键，要包含的值作为值就可以了;
>
> ```
> db.collectionName.find({shuzu: {$size: 3}});
> ```
>
> **⬆️表示查询shuzu长度为3的数据**

###### 2.3.5.6 模糊查询

> **在MongoDB中，模糊查询是依靠正则表达式的方式来进行实现的；**
>
> **以斜杠开头以斜杠结尾，不需要使用双引号包裹字符串，例如:**
>
> ```
> db.collectionName.find(name: {/U/})；
> ```
>
> **⬆️表示查询name中包含U字符的文档**
>
> **如果是对于数组的内容进行模糊查询也可以使用上述方法，MongoDB的正则可以直接匹配数组中所有元素；**
>
> **例如一个文档中的shuzu: [“吃饭”， “喝水”，“睡觉”]**
>
> ```
> db.collectionName.find({shuzu: {/吃/}});
> ```
>
> **⬆️也可以匹配到**

###### 2.3.5.7 排序

> ```
> db.collectionName.sort({key1: 1, key2: -1});
> ```
>
> **1是升序，-1是降序**

###### 2.3.5.8 分页

> ```
> db.collectionName.find().sort({query}).limit(rows).skip(start);
> ```
>
> 1⃣️ `sort` 先根据需要的条件排序；
>
> 2⃣️ `limit` 是讲每页分为多少条数据；
>
> 3⃣️ `skip` 是指当前显示第几页；

###### 2.3.5.9 总条数

> ```
> db.collectionName.count();
> db.collectionName.find({query}).counu();
> ```

###### 2.3.5.10 🧹去重

> ```
> db.collectionName.distinct("字段");
> ```
>
> **返回值是对应字段的剩余的值（去重后）;**

###### 2.3.5.11 返回指定字段

> 这也是上文中提到的 `projection` 的内容；
>
> ```
> db.collectionName.find({name: "UrbaneH"}, {age: 0});
> ```
>
> **⬆️表示查询集合中name的值为UrbaneH的数据，但不返回age字段；**
>
> **⚠️注意:**
>
> 0和1不可以同时使用；`0：不返回`；`1：返回；`
>
> **如果使用了0则除了其字段其余都返回，如果使用了1则仅返回其字段**

#### 2.4 关系总结

| RDBMS（关系型数据库） | MogoDB（非关系型数据库） |
| --------------------- | ------------------------ |
| 数据库<DataBase>      | 数据库<DataBase>         |
| 表<Table>             | 集合<Collection>         |
| 行<Row>               | 文档<Document>           |
| 列<Colume>            | 字段<Field>              |

### 3. $type

#### 说明

$type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果。

> | **类型**                | **数字** | **备注**         |
> | ----------------------- | -------- | ---------------- |
> | Double                  | 1        |                  |
> | String                  | 2        |                  |
> | Object                  | 3        |                  |
> | Array                   | 4        |                  |
> | Binary data             | 5        |                  |
> | Undefined               | 6        | 已废弃。         |
> | Object id               | 7        |                  |
> | Boolean                 | 8        |                  |
> | Date                    | 9        |                  |
> | Null                    | 10       |                  |
> | Regular Expression      | 11       |                  |
> | JavaScript              | 13       |                  |
> | Symbol                  | 14       |                  |
> | JavaScript (with scope) | 15       |                  |
> | 32-bit integer          | 16       |                  |
> | Timestamp               | 17       |                  |
> | 64-bit integer          | 18       |                  |
> | Min key                 | 255      | Query with `-1`. |
> | Max key                 | 127      |                  |

#### 使用

```sql
sql复制代码> db.collectionName.insert({
    title: 'PHP 教程', 
    description: 'PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。',
    by: 'UrbaneH',
    url: 'http://www.xxx.com',
    tags: ['php'],
    likes: 200
})
> db.collectionName.insert({title: 'Java 教程', 
    description: 'Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。',
    by: 'UrabaneH',
    url: 'http://www.xxx.com',
    tags: ['java'],
    likes: 150
})
> db.collectionName.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: 'UrabaneH',
    url: 'http://www.xxx.com',
    tags: ['mongodb'],
    likes: 100
})
```

> **🔧使用方法:**
>
> ```sql
> sql复制代码db.collectionName.find({"title" : {$type : 2}})
> 或
> db.collectionName.find({"title" : {$type : 'string'}})
> 🖨️输出:
> ```
>
> > ```json
> > json复制代码{ "_id" : ObjectId("56066542ade2f21f36b0313a"), "title" : "PHP 教程", "description" : "PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。", "by" : "UrbaneH", "url" : "http://www.xxx.com", "tags" : [ "php" ], "likes" : 200 }
> > { "_id" : ObjectId("56066549ade2f21f36b0313b"), "title" : "Java 教程", "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。", "by" : "UrbaneH", "url" : "http://www.xxx.com", "tags" : [ "java" ], "likes" : 150 }
> > { "_id" : ObjectId("5606654fade2f21f36b0313c"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "UrbaneH", "url" : "http://www.xxx.com", "tags" : [ "mongodb" ], "likes" : 100 }
> > ```
> >
> > **使用 $type 主要用于选择集合中指定字段指定类型的数据，比方说上面是选取集合中 title 字段中类型为 String 的数据；**

### 4. 索引<Index>

索引通常能够极大的提高查询的效率。

如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是**特殊的数据结构**，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构；

![Index](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2ea155062804975ad1b8ae9350efd53~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**从根本上来说 MongoDB 中的索引与其他数据库系统中的索引类似。MongoDB在集合层面上定义了索引，并支持对MongoDB集合中的任何字段或文档的子字段进行索引；**

#### 4.1 创建索引

```
db.collection.createIndex(keys, options)
```

`Key` 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可；

`createIndex` 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）；

```sql
sql复制代码> db.colltectionName.createIndex({"title":1})
--- 创建一个title字段的索引，为升序创建；
> db.colltectionName.createIndex({"title":1, "description":-1})
--- 创建复合索引 title 和 description ，分别为升序和降序；
> db.colltectionName.createIndex({open: 1, close: 1}, {background: true})
--- 创建索引时指定需要的参数
```

> **`options的属性`:**
>
> | Parameter          | Type          | Description                                                  |
> | ------------------ | ------------- | ------------------------------------------------------------ |
> | `background`       | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
> | `unique`           | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
> | `name`             | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
> | dropDups           | Boolean       | **3.0+版本已废弃。**在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
> | sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
> | expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
> | v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
> | weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
> | default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
> | language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

#### 4.2 索引基础API

```sql
sql复制代码> db.colltectionName.getIndexes()
--- 查看集合索引
> db.colltectionName.totalIndexSize()
--- 查看集合索引大小
> db.colltectionName.dropIndexes()
--- 删除集合所有索引
> db.colltectionName.dropIndex("索引名称")
--- 删除指定索引
```

#### 4.3 复合索引

**复合索引主要是由两个字段共同维护的一个索引；**

```sql
sql复制代码db.colltectionName.createIndex(
	{
  	name: 1,
  	age: -1
  },
  {
  	name: "name_age_index"
  }
);
```

> **⚠️注意:**
>
> MongoDB 中复合索引和传统关系型数据库一致 都是 `左前缀原则`；

### 5. 聚合查询<Aggregate>

MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。

有点类似 **SQL** 语句中的 **count(\*)**。

#### 5.1 操作符

> | 表达式    | 描述                                                         | 实例                                                         |
> | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | $sum      | 计算总和。                                                   | db.colltectionName.aggregate([{group : {_id : "by_user", num_tutorial : {���:"*s**u**m*:"likes"}}}]) |
> | $avg      | 计算平均值                                                   | db.colltectionName.aggregate([{group : {_id : "by_user", num_tutorial : {���:"*a**vg*:"likes"}}}]) |
> | $min      | 获取集合中所有文档对应值得最小值。                           | db.colltectionName.aggregate([{group : {_id : "by_user", num_tutorial : {���:"*min*:"likes"}}}]) |
> | $max      | 获取集合中所有文档对应值得最大值。                           | db.colltectionName.aggregate([{group : {_id : "by_user", num_tutorial : {���:"*ma**x*:"likes"}}}]) |
> | $push     | 将值加入一个数组中，不会判断是否有重复的值。                 | db.colltectionName.aggregate([{group : {_id : "by_user", url : {���ℎ:"*p**u**s**h*:"url"}}}]) |
> | $addToSet | 将值加入一个数组中，会判断是否有重复的值，若相同的值在数组中已经存在了，则不加入。 | db.colltectionName.aggregate([{group : {_id : "by_user", url : {��������:"*a**dd**T**o**S**e**t*:"url"}}}]) |
> | $first    | 根据资源文档的排序获取第一个文档数据。                       | db.colltectionName.aggregate([{group : {_id : "by_user", first_url : {�����:"*f**i**rs**t*:"url"}}}]) |
> | $last     | 根据资源文档的排序获取最后一个文档数据                       | db.colltectionNameaggregate([{group : {_id : "by_user", last_url : {����:"*l**a**s**t*:"url"}}}]) |

#### 5.2 操作实例

##### 5.2.1 计算每个作者编写的文章总数

**⬇️集合内的数据**

```sql
sql复制代码{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
},
sql复制代码> db.colltectionName.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{
   "result" : [
      {
         "_id" : "runoob.com",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}
```

> 1⃣️ 将集合内的数据进行分组
>
> `$group` 是用来分组的，里面的参数 `__id` 用来声明用原数据的哪个字段作为分组的索引；⬆️🌰就是将 by_user 这个字段进行分组聚合操作，并且这个字段作为了新的集合的索引；
>
> 2⃣️ 选择聚合函数
>
> `num_tutorial` 参数简单理解就是对于分组后的数据，聚合的办法；⬆️🌰就是选择了 `$sum` 来累加，由于原数据中没有有关作者文章数量的信息，且每一条数据都是一条文章的数据，所以这里使用 `$sum: 1` 含义就是每条数据累加 1。如果选择累加原数据的值，则同样的方法就是 `$字段名称`；

##### 5.2.2 $push的使用

```sql
sql复制代码> db.colltectionName.aggregate([{$group : {_id : "$by_user", urls : {$push: "$url"}}}])
--- 
{
	"_id": xxxx,
	"urls": ["www.baidu.com"]
},
{
	"_id": xxxx1,
	"urls": [
   	"www.4399.com",
    "www.7k7k.com",
    "www.4399.com"
  ]
}
```

> 会将分组后的作者的所有 url 加入到一个数组当中并且使用 `urls` 来作为字段名；
>
> **但是会出现重复的数据，如果不希望有重复的数据可以使用 $addToSet**