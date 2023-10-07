# MySQL 数据库

## 数据库的基本概念

### 什么是数据库

- 数据库（database）是用来组织、存储和管理数据的仓库
- 当今世界是 个充满着数据的互联网世界，充着大量的数据。数据的来源有很多，比如出行记录、消费记录、浏览的网页、发送的消息等等。除了文本类型的数据，图像、音乐、声音都是数据。
- 为了方便管理互联网世界中的数据，就有了数据库管理系统的概念（简称：数据库）。用户可以对数据库中的数据进行新增、查询、更新、删除等操作

### 常见的数据库及分类

市面上的数据库有很多种，最常见的数据库有如下几个

1. MySQL 数据库（目前使用最广泛、流行度最高的开源免费数据库；Community+Enterprise）
2. Oracle 数据库（收费）
3. SQLServer 数据库（收费）
4. Mongodb 数据库（Community+Enterprise）

- 其中，MySQL、Oracle、SQLServer 属于传统型数据库（又叫做：关系型数据库或 SQL 数据库），这三者的设计理念相同，用法比较类似
- 而 Mongodb 属于新型数据库（又叫做：非关系型数据库或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

### 传统型数据库的数据组织结构

- 在传统型数据库中，数据的组织结构分为数据库（database）、数据表（table）、数据行（row）、字段（field）这 4 大部分组成
- 数据的组织结构：指的就是数据以什么样的结构进行存储

#### 实际开发中库、表、行、字段的关系

1. 在实际项目开发中，一般情况下，每个项目都对应独立的数据库
2. 不同的数据，要存储到数据库的不同表中，例如：用户数据存储到 users 表中，图书数据存储到 books 表中。
3. 每个表中具体存储哪些信息，由字段来决定，例如：我们可以为 users 表设计 id，user，name，password 这 3 个字段。
4. 表中的行，代表每一条具体的数据

## 安装 MySQL

### 了解需要安装哪些 MySQL 相关的软件

对于开发人员来说，只需要安装 MySQL Server 和 MySQL Workbench 这两个软件，就能满足开发的需要了。MySQL Server 专门用来提供数据存储和服务的软件。

 MySQL Workbench：可视化的 MySQL 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据

## MySQL 的基本使用

推荐哔哩哔哩搜教程

DataType 数据类型：

- int 整数
- varchar（len）字符串
- tinyint（1）布尔值

字段的特殊标识：

- PK（PrimaryKey）主键、唯一标识
- NN (Not Nul） 值不允许为空
- UQ （Unique） 值唯一
- AI （Auto lncrement）值自动增长



## 使用 SQL 管理数据库

### 什么是 SQL

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据

三个关键点：

1. SQL 是一门数据库编程语言
2. 使用 SQL 语言编写出来的代码，叫做 SQL 语句
3. SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如 Mongodb）不支持 SQL 语言

### SQL 能做什么

1. 从数据库中查询数据
2. 向数据库中插入新的数据
3. 更新数据库中的数据
4. 从数据库删除数据
5. 可以创建新数据库
6. 可在数据库中创建新表
7. 可在数据库中创建存储过程、视图
8. etc..

### SQL 语句

#### SQL 的 SELECT 语句

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下：

```sql
-- 这是注释
-- 从FROM指定的【表中】，查询出【所有的】数据。* 表示【所有列】
SELECT * FROM 表名称
-- 从FROM指定的【表中】，查询出指定列名称（字段）的数据。
SELECT 列名称 FROM 表名称
```

 注意：SQL 语句中的关键字对大小写不敏感。SELECT 等效于 select，FROM 等效于 from。

#### SQL 的 INSERTINTO 语句

INSERTINTO 语句用于向数据表中插入新的数据行，语法格式如下：
```sql
-- 语法解读：向指定的表中，插入如下几列数据，列的值通过values
-- 指定注意：列和值要一一对应，多个列和多个值之间，使用英文的逗号分隔
INSERT INTO table_name (列1, 列2...) VALUES (值1, 值2...)
```

#### SQL 的 UPDATE 语句

Update 语句用于修改表中的数据。语法格式如下：

```sql
-- 语法解读：
-- 1.用UPDATE指定要更新哪个表中的数据
-- 2.用SET指定列对应的新值
-- 3.用WHERE指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

#### SQL 的 DELETE 语句

DELETE 语句用于删除表中的行。语法格式如下

```sql
-- 语法解读：
-- 从指定的表中，根据WHERE条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称 = 值
```

#### SQL 的 WHERE 子句

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

```sql
-- 查询语句中的WHERE条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
-- 更新语句中的WHERE条件
UPDATE 表名称 SET 列=新值 WHERE 列 运算符 值
-- 删除语句中的WHERE条件
DELETE FROM 表名称 WHERE 列 运算符 值
```

##### 可在 WHERE 子句中使用的运算符

  下面的运算符可在 WHERE 子句中使用，用来限定选择的标准

| 操作符  |     描述     |
| :-----: | :----------: |
|    =    |     等于     |
|   <>    |    不等于    |
|    >    |     大于     |
|    <    |     小于     |
|   >=    |   大于等于   |
|   <=    |   小于等于   |
| BETWEEN | 在某个范围内 |
|  LIKE   |  索某种模式  |

注意：在某些版本的 SQL 中，操作符`<>`可以写成`!=`

#### SQL 的 AND 和 OR 运算符

- AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来
- AND 表示必须同时满足多个条件，相当于 JavaScript 中的&&运算符
- OR 示只要满足任意一个条件即可，相当 JavaScript 中的||运算符

#### SQL 的 ORDER BY 子句

- ORDERBY 语句用于根据指定的列对结果集进行排序。
- ORDERBY 语句默认按照升序对记录进行排序（关键字 ASC 可以不写）
- 如果您希望按照降序对记录进行排序，可以使用 DESC 关键字

##### ORDERBY 子句-多重排序

对表中的数据，先按照字段进行降序排序，再按照其他字段顺序，进行升序排序

```sql
SELECT * FROM 表名称 ORDER BY 列 DESC, 列 ASC
```

#### SQL 的 COUNT(*)函数

COUNT(*)函数用于返回查询结果的总数据条数，语法格式如下：

```sql
SELECT COUNT(*) FROM 表名称
```

##### 使用 AS 为列设置别名

如果希望给查询出来的列名称设置别名，可以使用 AS 关键字，示例如下

```sql
SELECT COUNT(*) AS 新名 FROM 表 WHERE 列 = 值
```

## 在项自中操作 MySQL

### 在项目中操作数据库的步骤

1. 安装操作 MySQL 数据库的第三方模块（mysql）
2. 通过 mysql 模块连接到 MySQL 数据库
3. 通过 mysql 模块执行 SQL 语句

### 安装与配置 mysql 模块

#### 安装 mysql 模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包

```sh
npm install mysql
```

#### 配置 mysql 模块

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```js
//1.导入mysql模块
const mysql =reqtire(mysql）
//2建立与MySQ数据库的连接
const db = mysql.createPool({
host: '127.0.0.1',     //数据库的IP地址
user: 'root',          //登录数据库的账号
password: 'admin123',  //登录数据库的密码
database: 'my_db_01'   //指定要操作哪个数据库
 })
```

#### 测试 mysql 模块能否正常工作

调用 db.queryO 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果

```js
//检测mysql模块能否正常工作
db.query('SELECT 1', (err, results) => {
    if (err) return console.log(err.message)
//只要能打印出[ RowDataPacket{ '1': 1}]的结果，就证明数据库连接正常
    	onsole.1og（results）
})
```

### 使用 mysql 模块操作 MySQL 数据库

#### 查询数据

```js
//查询users表中所有的用户数据
db.query('SELECT * FROM users', (err, results) => {
//查询失败
if (err) return consolle.log(err.message)
	//查询成功
	onsole.log(results)
})
```

#### 插入数据

向 users 表中新增数据，其中 username 为 Spider-Man，password 为 pcc321。示例代码如下

```js
//1.要插入到users表中的数据对象
const user = {username: 'Spider-Man', password: 'pcc321'}
//2.待执行的SQL语句，其中英文的 ? 表示占位符
const sqlStr = 'INSERT INTO users (username, password) VALUES(?, ?)'
//3.使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [usar.username, user.password], (err results) => {   
	if (err) return console.log(err.message)//失败
	if(results.affectedRows === 1){ console.log('插入数据成功')}//成功
})
```

##### 插入数据的便捷方式

句表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应则可以通过如下方式快速插入数据

```js
//1.要插入到users表中的数据对象
const user = {username: 'Spider-Man2', password: 'pcc4321'}
//2.待执行的SQL语句，其中英文的 ? 表示占位符
const sqlStr = 'INSERT INTO users SET ?'
//3.使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, user, (err, results) => {   
	if (err) return console.log(err.message)//失败
	if (results.affectedRows === 1){ console.log('插入数据成功')}//成功
})
```

4.更新数据
可以通过如下方式，更新表中的数据

```js
//1.要更新的数据对象
const user = {id= 6, username: 'jj', password: '4321'}
//2.要执行的SQL语句
const sqlStr = 'UPDATE users SET username=?, password=?,  WHERE id=?'
//3.调用db.query()执行SQL语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {   
	if (err) return console.log(err.message)//失败
	if (results.affectedRows === 1){ console.log('更新数据成功')}//成功
})
```

#### 删除数据

在删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据。示例如下：

```js
//1.要执行的SQL语句
const sqlStr = 'DELETE FROM users WIHERE id=?'
//2调用db.query()执行SQL语句的同时，为占位符指定具体的值
//注意：如果SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
//如果SQL语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 7, (err, results) => {
	if (err) return console.log(err.message）//失败
	if (results.affectedRows === 1){ console.log('删除数据成功！')}//成功
})
```

#### 标记删除

- 使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。

- 所的标记删除，就是在表中设置类似于 status 这样的状态字段，来标记当前这条数据是否被删除

- 当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status 字段标记为删除即可

```js
//标记删除：使用UPDATE语句替代DELETE语句；只更新数据的状态，并没有真正删除
db.query('UPDATE USERS SET status=1 WHERE id=?', 6, (err, results) => {
	if (err) return console.log(err.message）//失败
	if (results.affectedRows === 1){ console.log('标记删除成功！')}//成功
})
```

