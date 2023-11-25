# SQL　笔记（MySQL）

## 一、简介

### 1.1 什么是 SQL

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据

三个关键点：

1. SQL 是一门数据库编程语言
2. 使用 SQL 语言编写出来的代码，叫做 SQL 语句
3. SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如 Mongodb）不支持 SQL 语言

### 1.2 SQL 能做什么

1. 从数据库中查询数据
2. 向数据库中插入新的数据
3. 更新数据库中的数据
4. 从数据库删除数据
5. 可以创建新数据库
6. 可在数据库中创建新表
7. 可在数据库中创建存储过程、视图

### SQL

> 全称Structured Query Language，结构化查询语言。操作关系型数据库的编程语言，定义了一套操作关系型数据库统一**标准。**

### SQL通用语法

> 1、SQL语句可以单行或多行书写，以分号结尾。
> 2、SQL语句可以使用空格/缩进来增强语句的可读性。
> 3、MySQL数据库的SQL语句不区分大小写，关键字建议使用大写。
> 4、注释： 单行注释：-- 注释内容 或 # 注释内容；多行注释：/* 注释内容 */

### SQL分类

> SQL语句，根据其功能，主要分为四类：DDL、DML、DQL、DCL。

| **分类** | **全称**                   | **说明**                                               |
| -------- | -------------------------- | ------------------------------------------------------ |
| **DDL ** | Data Definition Language   | 数据定义语言，用来定义数据库对象(数据库，表，字段)     |
| **DCL ** | Data Control Language      | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |
| **DML**  | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改         |
| **DQL ** | Data Query Language        | 数据查询语言，用来查询数据库中表的记录                 |

## 二、数据类型

> MySQL中的数据类型有很多，主要分为三类：数值类型、字符串类型、日期时间类型。

### 2.1 数值类型

| 类型         | 大小                                     | 范围（有符号）                                               | 范围（无符号）                                               | 用途       |
| ------------ | ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| TINYINT      | 1 Bytes                                  | (-128，127)                                                  | (0，255)                                                     | 小整数值   |
| SMALLINT     | 2 Bytes                                  | (-32 768，32 767)                                            | (0，65 535)                                                  | 大整数值   |
| MEDIUMINT    | 3 Bytes                                  | (-8 388 608，8 388 607)                                      | (0，16 777 215)                                              | 大整数值   |
| INT或INTEGER | 4 Bytes                                  | (-2 147 483 648，2 147 483 647)                              | (0，4 294 967 295)                                           | 大整数值   |
| BIGINT       | 8 Bytes                                  | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)      | (0，18 446 744 073 709 551 615)                              | 极大整数值 |
| FLOAT        | 4 Bytes                                  | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                  | 单精度     |
| 浮点数值     |                                          |                                                              |                                                              |            |
| DOUBLE       | 8 Bytes                                  | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度     |
| 浮点数值     |                                          |                                                              |                                                              |            |
| DECIMAL      | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值                                               | 依赖于M和D的值                                               | 小数值     |

**例如：**
1）年龄字段 -- 不会出现负数, 而且人的年龄不会太大 
`age tinyint unsigned `
2）分数 -- 总分100分, 最多出现一位小数 
`score double(4,1)`

### 2、字符串类型

| 类型       | 大小                  | 用途                            |
| ---------- | --------------------- | ------------------------------- |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

**例如：** 
1）用户名 username ------> 长度不定, 最长不会超过50 
`username varchar(50) `
2） 性别 gender ---------> 存储值, 不是男,就是女 
`gender char(1)` 
3）手机号 phone --------> 固定长度为11 
`phone char(11)`

### 3、日期时间类型

| 类型      | 大小( bytes) | 范围                                                         | 格式                | 用途                     |
| --------- | ------------ | ------------------------------------------------------------ | ------------------- | ------------------------ |
| DATE      | 3            | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3            | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1            | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8            | '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'               | YYYY-MM-DD hh:mm:ss | 混合日期和时间值         |
| TIMESTAMP | 4            | '1970-01-01 00:00:01' UTC 到 '2038-01-19 03:14:07' UTC 结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYY-MM-DD hh:mm:ss | 混合日期和时间值，时间戳 |


1）生日字段 birthday 
`birthday date` 
2）创建时间 createtime 
`createtime datetime`

## 三、DDL

> Data Definition Language，数据定义语言，用来定义数据库对象(数据库，表，字段) 。

### 3.1 数据库操作

查询所有数据库

```sql
show databases ;
```

查询当前数据库

```sql
select database() ;
```

创建数据库

```sql
create database [ if not exists ] 数据库名[ default charset 字符集] [ collate 排序规则] ;
```

#### 案例

```sql
CREATE DATABASE warehouse; 
-- 创建warehouse一个数据库, 使用数据库默认的字符集。
SELECT DATABASE() 
-- 查询当前数据库

```

**补充：**

> 在同一个数据库服务器中，不能创建两个名称相同的数据库，否则将会报错。

> 可以通过if not exists 参数来解决这个问题，数据库不存在, 则创建该数据库，如果存在，则不创建。

`create database if not extists itcast; `

删除数据库

```sql
drop database [ if exists ] 数据库名 ;
```

> 如果删除一个不存在的数据库，将会报错。此时，可以加上参数 if exists ，如果数据库存在，再 
> 执行删除，否则不执行删除。

切换数据库

```sql
use 数据库名 ;
```

> 我们要操作某一个数据库下的表时，就需要通过该指令，切换到对应的数据库下，否则是不能操作的。

### 3.2 查询创建

查询当前数据库所有表

```sql
show tables;
```

查看指定表结构

```sql
desc 表名 ;
```

通过这条指令，我们可以查看到指定表的字段，字段的类型、是否可以为NULL，是否存在默认值等信 息。 

查询指定表的建表语句

```sql
show create table 表名 ;
```

通过这条指令，主要是用来查看建表语句的，而有部分参数我们在创建表的时候，并未指定也会查询 
到，因为这部分是数据库的默认值，如：存储引擎、字符集等。

创建表结构

```sql
CREATE TABLE 表名( 
字段1 字段1类型 [ COMMENT 字段1注释 ], 
字段2 字段2类型 [COMMENT 字段2注释 ], 
字段3 字段3类型 [COMMENT 字段3注释 ], 
...... 
字段n 字段n类型 [COMMENT 字段n注释 ] 
) [ COMMENT 表注释 ] ;
```



```sql
create table tb_user(
	id int comment '编号',
	name varchar(50) comment '姓名',
	age int comment '年龄',
	gender varchar(1) comment '性别'
) comment '用户表';
```

### 3.3 表操作

添加字段

```sql
ALTER TABLE 表名 ADD 字段名 类型 (长度) [ COMMENT 注释 ] [ 约束 ]; 
```

**案例**

> 为emp表增加一个新的字段”昵称”为nickname，类型为varchar(20)

```sql
ALTER TABLE emp ADD nickname varchar(20) COMMENT '昵称'; 
```

修改数据类型

```sql
ALTER TABLE 表名 MODIFY 字段名 新数据类型 (长度);
```

修改字段名和字段类型

```sql
ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型 (长度) [ COMMENT 注释 ] [ 约束 ];
```

**案例**

> 将emp表的nickname字段修改为username，类型为varchar(30)

```sql
ALTER TABLE emp CHANGE nickname username varchar(30) COMMENT '昵称';
```

删除字段

```sql
ALTER TABLE 表名 DROP 字段名;
```

**案例**

> 将emp表的字段username删除

```sql
ALTER TABLE emp DROP username;
```

修改表名

```sql
ALTER TABLE 表名 RENAME TO 新表名;
```

**案例**

> 将emp表的表名修改为 employee

```sql
ALTER TABLE emp RENAME TO employee;
```

删除表

```sql
DROP TABLE [ IF EXISTS ] 表名;
```

> 可选项 IF EXISTS 代表，只有表名存在时才会删除该表，表名不存在，则不执行删除操作(如果不 
> 加该参数项，删除一张不存在的表，执行将会报错)。 

**案例**

> 如果tb_user表存在，则删除tb_user表

```sql
DROP TABLE IF EXISTS tb_user;
```

删除指定表, 并重新创建表

```sql
TRUNCATE TABLE 表名;
```

### 表操作-案例

设计一张员工信息表，要求如下：

1. 编号（纯数字） 
2. 员工工号 (字符串类型，长度不超过10位) 
3. 员工姓名（字符串类型，长度不超过10位） 
4. 性别（男/女，存储一个汉字） 
5. 年龄（正常人年龄，不可能存储负数） 
6. 身份证号（二代身份证号均为18位，身份证中有X这样的字符） 
7. 入职时间（取值年月日即可）

对应的建表语句如下：

```sql
create table emp(
	id int comment '编号',
	workno varchar(10) comment '工号',
	name varchar(10) comment '姓名',
	gender char(1) comment '性别',
	age tinyint unsigned comment '年龄',
	idcard char(18) comment '身份证号',
	entrydate date comment '入职时间'
) comment '员工表';
```

## 四、DCL

> DCL英文全称是Data Control Language(数据控制语言)，用来管理数据库用户、控制数据库的访问权限。

### 4.1 查询用户

1、查询用户

```sql
select * from mysql.user;
```

2、创建用户

```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

3、修改用户密码

```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码' ;
```

4、删除用户

```sql
DROP USER '用户名'@'主机名' ;
```

#### 案例

A. 创建用户itcast, 只能够在当前主机localhost访问, 密码123456;

```sql
create user 'itcast'@'localhost' identified by '123456';
```

B. 创建用户heima, 可以在任意主机访问该数据库, 密码123456;

```sql
create user 'heima'@'%' identified by '123456';
```

C. 修改用户heima的访问密码为1234;

```sql
alter user 'heima'@'%' identified with mysql_native_password by '1234';
```

D. 删除 itcast@localhost 用户

```sql
drop user 'itcast'@'localhost';
```

### 4.2 权限控制

| **权限 **           | **说明**           |
| ------------------- | ------------------ |
| ALL, ALL PRIVILEGES | 所有权限           |
| SELECT              | 查询数据           |
| INSERT              | 插入数据           |
| UPDATE              | 修改数据           |
| DELETE              | 删除数据           |
| ALTER               | 修改表             |
| DROP                | 删除数据库/表/视图 |
| CREATE              | 创建数据库/表      |

1、查询权限 

```sql
SHOW GRANTS FOR '用户名'@'主机名' ;
```

2、授予权限

```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```

3、撤销权限

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

#### 案例

A. 查询 'heima'@'%' 用户的权限 

```sql
show grants for 'heima'@'%';
```

B. 授予 'heima'@'%' 用户itcast数据库所有表的所有操作权限 

```sql
grant all on itcast.* to 'heima'@'%';
```

C. 撤销 'heima'@'%' 用户的itcast数据库的所有权限

```sql
revoke all on itcast.* from 'heima'@'%';
```

## 五、DML

> DML英文全称是Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。

### 5.1 添加数据

给指定字段添加数据

```sql
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
```

**案例**
给employee表所有的字段添加数据 ；

```sql
insert into employee(id,workno,name,gender,age,idcard,entrydate)
values(1,'1','Itcast','男',10,'123456789012345678','2000-01-01');
```

插入数据完成之后，我们有两种方式，查询数据库的数据：

```sql
select * from employee;
```

给全部字段添加数据

```sql
INSERT INTO 表名 VALUES (值1, 值2, ...);
```

**案例**
插入数据到employee表，具体的SQL如下

```sql
insert into employee values(2,'2','张无忌','男',18,'123456789012345670','2005-01-
01');
```

批量添加数据

```sql
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...), (值
1, 值2, ...) ;
```

```sql
INSERT INTO 表名 VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...) ; 
```

#### 插入语句

INSERTINTO 语句用于向数据表中插入新的数据行，语法格式如下：

```sql
-- 语法解读：向指定的表中，插入如下几列数据，列的值通过values
-- 指定注意：列和值要一一对应，多个列和多个值之间，使用英文的逗号分隔
INSERT INTO table_name (列1, 列2...) VALUES (值1, 值2...)
```



**案例**
批量插入数据到employee表，具体的SQL如下

```sql
insert into employee values(3,'3','韦一笑','男',38,'123456789012345670','2005-01-
01'),(4,'4','赵敏','女',18,'123456789012345670','2005-01-01');
```

### 5.2 修改数据

修改数据的具体语法为:

```sql
UPDATE 表名 SET 字段名1 = 值1 , 字段名2 = 值2 , .... [ WHERE 条件 ] ;
```

**案例**
A. 修改id为1的数据，将name修改为itheima

```sql
update employee set name = 'itheima' where id = 1; 
```

B. 修改id为1的数据, 将name修改为小昭, gender修改为 女

```sql
update employee set name = '小昭' , gender = '女' where id = 1;
```

C. 将所有的员工入职日期修改为 2008-01-01

```sql
update employee set entrydate = '2008-01-01';
```

#### 更新语句

Update 语句用于修改表中的数据。语法格式如下：

```sql
-- 语法解读：
-- 1.用UPDATE指定要更新哪个表中的数据
-- 2.用SET指定列对应的新值
-- 3.用WHERE指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```



### 5.3 删除数据

删除数据的具体语法为：

```sql
DELETE FROM 表名 [ WHERE 条件 ] ; 
```

**案例**
A. 删除gender为女的员工

```sql
delete from employee where gender = '女';
```

B. 删除所有员工

```sql
delete from employee;
```

#### SQL 的 SELECT 语句

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下：

```sql
-- 这是注释
-- 从FROM指定的【表中】，查询出【所有的】数据。* 表示【所有列】
SELECT * FROM 表名称
-- 从FROM指定的【表中】，查询出指定列名称（字段）的数据。
SELECT 列名称 FROM 表名称
```

#### 删除语句

DELETE 语句用于删除表中的行。语法格式如下

```sql
-- 语法解读：
-- 从指定的表中，根据WHERE条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称 = 值
```

## 六、DQL

> DQL英文全称是Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记录。

### 6.1 基本语法

DQL 查询语句，语法结构如下：

```sql
SELECT
字段列表

FROM
表名列表

WHERE
条件列表

GROUP BY
分组字段列表

HAVING
分组后条件列表

ORDER BY
排序字段列表

LIMIT
分页参数
```

### 6.2 基础查询

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下：

```sql
-- 这是注释
-- 从FROM指定的【表中】，查询出【所有的】数据。* 表示【所有列】
SELECT * FROM 表名称
-- 从FROM指定的【表中】，查询出指定列名称（字段）的数据。
SELECT 列名称 FROM 表名称
```

查询多个字段

```sql
SELECT 字段1, 字段2, 字段3 ... FROM 表名 ;
```

```sql
SELECT * FROM 表名 ;
```

> 注意 : * 号代表查询所有字段，在实际开发中尽量少用（不直观、影响效率）。

字段设置别名

```sql
SELECT 字段1 [ AS 别名1 ] , 字段2 [ AS 别名2 ] ... FROM 表名;
```

```sql
SELECT 字段1 [ 别名1 ] , 字段2 [ 别名2 ] ... FROM 表名;
```

去除重复记录

```sql
SELECT DISTINCT 字段列表 FROM 表名;
```

**案例**
A. 查询指定字段 name, workno, age并返回

```sql
select name,workno,age from emp;
```

B. 查询返回所有字段

```sql
select id ,workno,name,gender,age,idcard,workaddress,entrydate from emp;
```

C. 查询所有员工的工作地址,起别名

```sql
select workaddress as '工作地址' from emp;
-- as可以省略
```

```sql
select workaddress '工作地址' from emp;
```

D. 查询公司员工的上班地址有哪些(不要重复)

```sql
select distinct workaddress '工作地址' from emp;
```

### 6.3 条件查询

语法

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表 ;
```

#### 条件

常用的比较运算符如下:

- 

| **比较运算符 **     | **功能**                                 |
| ------------------- | ---------------------------------------- |
| >                   | 大于                                     |
| >=                  | 大于等于                                 |
| <                   | 小于                                     |
| <=                  | 小于等于                                 |
| =                   | 等于                                     |
| <> 或 !=            | 不等于                                   |
| BETWEEN ... AND ... | 在某个范围之内(含最小、最大值)           |
| IN(...)             | 在in之后的列表中的值，多选一             |
| LIKE 占位符         | 模糊匹配(_匹配单个字符, %匹配任意个字符) |
| IS NULL             | 是NULL                                   |

常用的逻辑运算符如下：

| **逻辑运算符 **    | **功能 **                   |
| ------------------ | --------------------------- |
| AND 或 &&          | 并且 (多个条件同时成立)     |
| OR 或 &#124;&#124; | 或者 (多个条件任意一个成立) |
| NOT 或 !           | 非 , 不是                   |

#### SQL 的 ORDER BY 子句

- ORDERBY 语句用于根据指定的列对结果集进行排序。
- ORDERBY 语句默认按照升序对记录进行排序（关键字 ASC 可以不写）
- 如果您希望按照降序对记录进行排序，可以使用 DESC 关键字

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

##### ORDERBY 子句-多重排序

对表中的数据，先按照字段进行降序排序，再按照其他字段顺序，进行升序排序

```sql
SELECT * FROM 表名称 ORDER BY 列 DESC, 列 ASC
```





**案例**

A. 查询年龄等于 22 的员工

```sql
select * from emp where age = 22;
```

B.查询没有身份证号的员工信息

```sql
select * from emp where idcard is null;
```

c.查询年龄在15岁(包含) 到 20岁(包含)之间的员工信息

```sql
select * from emp where age >= 15 && age <= 20;
select * from emp where age >= 15 and age <= 20;
select * from emp where age between 15 and 20;
```

D.查询年龄等于18 或 20 或 40 的员工信息

```sql
select * from emp where age = 18 or age = 20 or age =40;
select * from emp where age in(18,20,40);
```

E.查询姓名为两个字的员工信息 _ %

```sql
select * from emp where name like '__';
```

F. 查询身份证号最后一位是X的员工信息

```sql
select * from emp where idcard like '%X';
select * from emp where idcard like '_________________X';
```

### 6.4 聚合函数

#### 常见的聚合函数

| **函数 ** | **功能 ** |
| --------- | --------- |
| count     | 统计数量  |
| max       | 最大值    |
| min       | 最小值    |
| avg       | 平均值    |
| sum       | 求和      |

语法

```sql
SELECT 聚合函数(字段列表) FROM 表名 ; 
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



**案例**
A. 统计该企业员工数量

```sql
select count(*) from emp; -- 统计的是总记录数
select count(idcard) from emp; -- 统计的是idcard字段不为null的记录数
```

B. 统计该企业员工的平均年龄

```sql
select avg(age) from emp;
```

C. 统计该企业员工的最大年龄

```sql
select max(age) from emp;
```

D. 统计该企业员工的最小年龄

```sql
select min(age) from emp;
```

 E. 统计西安地区员工的年龄之和

```sql
select sum(age) from emp where workaddress = '西安';
```