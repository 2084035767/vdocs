### 一、库相关

#### 1.1 查看数据库列表

```sql
show dbs
```

#### 1.2 进入数据库

```perl
use 库名
```

#### 1.3 查看当前库

```
db.getName() 或 db
```

#### 1.4 查看库中的集合

```sql
show collections
```

#### 1.5 查看库状态

```scss
db.stats()
```

#### 1.6 查看库版本

```scss
db.version()
```

#### 1.7 查看当前db的连接机器地址

```scss
db.getMongo()
```

#### 1.8 创建库

```perl
use 库名 #库名不存在，自动创建。但是，如果不插入数据，切换库后会被自动删除
```

#### 1.9 删除当前库

```scss
db.dropDatabase()
```

#### 1.10 从指定主机上克隆数据库

```x86asm
db.cloneDatabase("127.0.0.1")
```

#### 1.11 修复当前数据库

```scss
db.repairDatabase()
```

#### 1.12 更多命令

```python
db.help()
```

### 二、集合相关

#### 2.1 查看当前db的所有集合

```scss
db.getCollectionNames() 或 show collections
```

#### 2.2 当前db所有聚集索引的状态

```scss
db.printCollectionStats()
```

#### 2.3 查看指定集合

```scss
db.getCollection(集合名称).find({})
```

#### 2.4 查看指定集合的数据条数

```scss
db.集合名称.count()
```

#### 2.5 查看指定集合空间大小

```scss
db.集合名称.dataSize()
```

#### 2.6 查看指定集合所在库

```scss
db.集合名称.getDB()
```

#### 2.7 修改指定集合名称

```scss
db.集合名称.renameCollection(集合新名称)
```

#### 2.8 添加数据到指定集合

```scss
db.集合名称.save(json串)

db.集合名称.insert(json串)

db.集合名称.insertOne(json串)

db.集合名称.insertMany(json串数组)
```

#### 2.9 删除指定集合

```scss
db.集合名称.drop()
```

#### 2.10 创建索引

```css
db.集合名称.ensureIndex({字段名:1})
```

#### 2.11 查询当前聚集集合所有索引

```scss
db.集合名称.getIndexes()
```

#### 2.12 查看总索引记录大小

```scss
db.集合名称.totalIndexSize()
```

#### 2.13 读取当前集合的所有index信息

```scss
db.集合名称.reIndex()
```

#### 2.14 删除指定索引

```scss
db.集合名称.dropIndex(索引名称)
```

#### 2.15 删除所有索引

```scss
db.集合名称.dropIndexes()
```

### 三、用户相关

#### 3.1 添加用户

```bash
db.addUser("name");

db.addUser("userName", "password", true) # 用户名，密码，是否只读
```

#### 3.2 数据库认证、安全模式

```x86asm
db.auth("userName","password")
```

#### 3.3 显示当前所有用户

```bash
show users
```

#### 3.4 删除用户

```x86asm
db.removeUser("userName")
```

### 四、案例

#### 4.1 新增文档（记录）

```dockerfile
db.user.save({

    "name":"张三",

    "age":26,

    "gender":"男"

})

#如果user集合不存在，会自动创建
类似于 insert into user(name,age,gender) values("张三",26,"男")
```

#### 4.2 集合查询

```undefined
测试数据如下图
```



##### 4.2.1 查询所有记录

```lua
db.user.find()

db.getCollection('user').find({})

类似于 select * from user;
```

##### 4.2.2 去重查询

```sql
db.user.distinct("name")

类似于 select distict name from user
```

##### 4.2.3 = 查询

```csharp
db.user.find({"name":"李四"})

类似于 select * from user where name = "李四"
```

##### 4.2.4 > 查询

```csharp
db.user.find({"age":{$gt:18}})

类似于 select * from user where age > 18
```

##### 4.2.5 >= 查询

```csharp
db.user.find({"age":{$gte:23}})

类似于 select * from user where age >= 23
```

##### 4.2.6 < 查询

```csharp
db.user.find({"age":{$lt:23}})

类似于 select * from user where age < 23
```

##### 4.2.7 <= 查询

```csharp
db.user.find({"age":{$lte:23}})

 类似于 select * from user where age <= 23
```

##### 4.2.8 >= 且 <= 查询

```powershell
db.user.find({"age":{$gte:18,$lte:22}})

类似于 select * from user where age >= 18 and age <= 22
```

##### 4.2.9 或、与 查询

```dockerfile
db.user.find({"name":"张三","age":23}) 或

db.user.find({$and:[{"name":"张三"},{"age":23}]}).pretty()

类似于 select * from user where name = "张三" and age = 23

db.user.find({$or:[{"age":18},{"age":22}]})

类似于 select * from user where age = 18 or age = 22
```

##### 4.2.10 like 查询

```csharp
db.user.find({"name":/李/})

类似于 select * from user where name like '%李%'

db.user.find({"name":/^李/})

类似于 select * from user where name like '李%'
```

##### 4.2.11 指定列查询

```dockerfile
db.user.find({},{"name":1,"gender":1})

类似于 select id,name,gender fomr user

db.user.find({"age":22},{"name":1,"gender":1})

类似于 select id,name,age from user where age = 22
```

##### 4.2.12 排序查询

```csharp
db.user.find({}).sort({age:-1})

类似于 select * from user order by age desc

db.user.find({}).sort({age:1})

类似于 select * from user order by age asc
```

##### 4.2.13 分页查询

```dockerfile
db.user.find({}).limit(3)

类似于 select * from user limit 3

db.user.find({}).skip(0).limit(3)

类似于 select * from user limit 0,3
```

##### 4.2.14 查询结果集的记录条数

```csharp
db.user.find({"age":{$lt:22}}).count()

类似于 select count(*) from user where age < 22
```

#### 4.3 聚合查询

```sql
聚合操作处理数据记录并返回计算结果。 聚合操作将多个文档中的值组合在一起，并可对分组数据执行各种操作，以返回单个结果。 在SQL中的 count(*)与group by组合相当于mongodb 中的聚合功能。
```

##### 4.3.1 count 统计

```php
db.user.aggregate({$group:{_id:null,count:{$sum:1}}})

类似于 select count(1) as count from user

    
db.user.aggregate({$group:{_id:null,count:{$sum:"$age"}}})

类似于 select count(age) as count from user
```

##### 4.3.2 group 分组

```csharp
db.user.aggregate({$group:{_id:"$gender",count:{$sum:"$age"}}})

类似于 select count(age) as count from user group by gender
```

##### 4.3.3 max统计

```csharp
db.user.aggregate({$group:{_id:"$gender",max:{$max:"$age"}}})

类似于 select max(age) as count from user group by gender
```

##### 4.3.4 min 统计

```csharp
db.user.aggregate({$group:{_id:"$gender",min:{$min:"$age"}}})

类似于 select min(age) as count from user group by gender
```

##### 4.3.5 avg 统计

```csharp
db.user.aggregate({$group:{_id:"$gender",age:{$avg:"$age"}}})

类似于 select avg(age) as count from user group by gender
```

##### 4.3.6 push 统计

```bash
将指定的表达式的值添加到一个数组中，这个值不要超过16M，不然会出现错误

db.user.aggregate({$group:{_id:"$gender",ages:{$push:"$age"}}})
```

##### 4.3.6 addToSet 统计

```bash
将表达式的值添加到一个数组中（无重复值），这个值不要超过16M，不然会出现错误

db.user.aggregate({$group:{_id:"$gender",ages:{$addToSet:"$age"}}})
```

#### 4.4 修改

```bash
db.user.update({"age":22},{$set:{"name":"李师师"}},false,true)

类似于 update user set name = "李四" where age = 22
```

#### 4.5 删除

```csharp
db.user.remove({"age":26})

类似于 delete from user where age = 26
```
