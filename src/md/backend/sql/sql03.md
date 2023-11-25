# 三、DDL

> Data Definition Language，数据定义语言，用来定义数据库对象(数据库，表，字段) 。

## 3.1 数据库操作

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

### 案例

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

## 3.2 查询创建

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

## 3.3 表操作

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

## 表操作-案例

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
