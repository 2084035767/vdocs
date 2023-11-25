# 四、字段约束

## 4.1 非空约束

限定某个字段/某列的值不允许为空，

> 空字符串‘’不等于NULL，0也不等于NULL

```sql
CREATE TABLE 表名称( 
	字段名 数据类型, 
	字段名 数据类型 NOT NULL, 
	字段名 数据类型 NOT NULL 
);
# 添加not null
ALTER TABLE 表名称 MODIFY 字段名 数据类型 NOT NULL;

# 去掉not null，相当于修改某个非注解字段，该字段允许为空
ALTER TABLE 表名称 MODIFY 字段名 数据类型
```
## 4.2 唯一约束

用来限制某个字段/某列的值不能重复

- 同一个表可以有多个唯一约束
- 唯一约束可以是某一个列的值唯一，也可以多个列组合的值唯一。
- 唯一性约束允许列值为空。
- 在创建唯一约束的时候，如果不给唯一约束命名，就默认和列名相同。
- MySQL会给唯一约束的列上默认创建一个唯一索引。
```sql
CREATE TABLE 表名称(
	字段名 数据类型, 字段名 数据类型 UNIQUE, 
	字段名 数据类型 UNIQUE KEY, 字段名 数据类型 
);
CREATE TABLE 表名称( 
	字段名 数据类型, 
	字段名 数据类型, 
	字段名 数据类型, 
	[CONSTRAINT 约束名] UNIQUE KEY(字段名) 
);
# 指定唯一键约束
# 方式一：
ALTER TABLE 表名称 ADD UNIQUE KEY(字段列表);
# 方式二：
ALTER TABLE 表名称 MODIFY 字段名 字段类型 UNIQUE;
```
## 4.3 主键约束

用来唯一标识表中的一行记录

- 主键约束相当于唯一约束+非空约束的组合，主键约束列不允许重复，也不允许出现空值
- 一个表最多只能有一个主键约束
- 主键约束对应着表中的一列或者多列
- 如果是多列组合的复合主键约束，那么这些列都不允许为空值，并且组合的值不允许重复
- 当创建主键约束时，系统默认会在所在的列或列组合上建立对应的主键索引
```sql
CREATE TABLE 表名称( 
	字段名 数据类型 PRIMARY KEY, #列级模式 
	字段名 数据类型, 
	字段名 数据类型 
);
CREATE TABLE 表名称( 
	字段名 数据类型, 
	字段名 数据类型, 
	字段名 数据类型, 
	[CONSTRAINT 约束名] PRIMARY KEY(字段名) #表级模式 
);

ALTER TABLE 表名称 ADD PRIMARY KEY(字段列表); #字段列表可以是一个字段，也可以是多个字段，如果是多 个字段的话，是复合主键
ALTER TABLE 表名称 ADD PRIMARY KEY(字段名1,字段名2);
```
## 4.4 自增长约束

某个字段的值自增

- 一个表最多只能有一个自增长列
- 当需要产生唯一标识符或顺序值时，可设置自增长
- 自增长列约束的列必须是键列（主键列，唯一键列）
- 自增约束的列的数据类型必须是整数类型
```sql
-- 建表
CREATE TABLE 表名称( 
	字段名 数据类型 PRIMARY KEY AUTO_INCREMENT,
	字段名 数据类型 UNIQUE KEY not null,
	字段名 数据类型 UNIQUE KEY,
	字段名 数据类型 NOT NULL DEFAULT 默认值
);
CREATE TABLE 表名称( 
	字段名 数据类型 DEFAULT 默认值 ,
	字段名 数据类型 UNIQUE KEY AUTO_INCREMENT,
	字段名 数据类型 NOT NULL DEFAULT 默认值,
	PRIMARY KEY(字段名) 
);
-- 增加自增约束
ALTER TABLE 表名称 MODIFY 字段名 数据类型 AUTO_INCREMENT;
-- 删除自增约束，去掉auto_increment相当于删除
ALTER TABLE 表名称 MODIFY 字段名 数据类型; 

```
## 4.5 外键约束

限定某个表的某个字段的引用完整性

- 从表的外键列，必须引用/参考主表的主键或唯一约束的列
- 在创建外键约束时，如果不给外键约束命名，默认名不是列名，而是自动产生一个外键名（例如student_ibfk_1;），也可以指定外键约束名。
- 创建(CREATE)表时就指定外键约束的话，先创建主表，再创建从表
- 删表时，先删从表（或先删除外键约束），再删除主表
- 从表的外键列与主表被参照的列名字可以不相同，但是数据类型必须一样，逻辑意义一致
- 在“从表”中指定外键约束，并且一个表可以建立多个外键约束
- 当创建外键约束时，系统默认会在所在的列上建立对应的普通索引，索引名是外键的约束名，删除外键约束后，必须手动删除对应的索引
```sql
CREATE TABLE 主表名称( 
字段1 数据类型 PRIMARY KEY, 
字段2 数据类型 
);
CREATE TABLE 从表名称( 
字段1 数据类型 PRIMARY KEY, 
字段2 数据类型, 
[CONSTRAINT <外键约束名称>] FOREIGN KEY（从表的某个字段) REFERENCES 主表名(被参考字段) 
);
#(从表的某个字段)的数据类型必须与主表名(被参考字段)的数据类型一致，逻辑意义也一样 
#(从表的某个字段)的字段名可以与主表名(被参考字段)的字段名一样，也可以不一样
-- FOREIGN KEY: 在表级指定子表中的列
-- REFERENCES: 标示在父表中的列
```
### 约束等级

- Cascade方式：在父表上update/delete记录时，同步update/delete掉子表的匹配记录
- Set null方式：在父表上update/delete记录时，将子表上匹配记录的列设为null，但是要注意子表的外键列不能为not null
- No action方式：如果子表中有匹配的记录，则不允许对父表对应候选键进行update/delete操作
- Restrict方式：同no action， 都是立即检查外键约束（如果没有指定等级，就相当于Restrict方式。）
- Set default方式：父表有变更时，子表将外键列设置成一个默认的值，但Innodb不能识别

## 4.6 默认值约束

给某个字段/某列指定默认值，一旦设置默认值，在插入数据时，如果此字段没有显式赋值，则赋值为默
认值。
说明：默认值约束一般不在唯一键和主键列上加
```sql
CREATE TABLE 表名称( 
	字段名 数据类型 PRIMARY KEY, 
	字段名 数据类型 UNIQUE KEY NOT NULL, 
	字段名 数据类型 UNIQUE KEY, 
	字段名 数据类型 NOT NULL DEFAULT 默认值, 
);
# 在给某个字段加非空约束也一样，如果这个字段原来有默认值约束，你想保留，也要在modify语句中保留默 认值约束，否则就删除了
ALTER TABLE 表名称 MODIFY 字段名 数据类型 DEFAULT 默认值;
ALTER TABLE 表名称 MODIFY 字段名 数据类型 DEFAULT 默认值 NOT NULL;
```

## 五、事务简介

事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系 
统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。 
就比如: 张三给李四转账1000块钱，张三银行账户的钱减少1000，而李四银行账户的钱要增加 
1000。 这一组操作就必须在一个事务的范围内，要么都成功，要么都失败。

## 5.1 事务四大特性

> 一般来说，事务是必须满足4个条件（ACID）：：原子性（**A**tomicity，或称不可分割性）、一致性（**C**onsistency）、隔离性（**I**solation，又称独立性）、持久性（**D**urability）。

- **原子性：**一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
- **一致性：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
- **隔离性：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
- **持久性：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

## 5.2 事务控制语句

- BEGIN 或 START TRANSACTION 显式地开启一个事务；
- COMMIT 也可以使用 COMMIT WORK，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的；
- ROLLBACK 也可以使用 ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；
- SAVEPOINT identifier，SAVEPOINT 允许在事务中创建一个保存点，一个事务中可以有多个 SAVEPOINT；
- RELEASE SAVEPOINT identifier 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；
- ROLLBACK TO identifier 把事务回滚到标记点；
- SET TRANSACTION 用来设置事务的隔离级别。InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。

## 5.3 事务处理主要有两种方法

1、用 BEGIN, ROLLBACK, COMMIT来实现

- **BEGIN** 开始一个事务
- **ROLLBACK** 事务回滚
- **COMMIT** 事务确认

2、直接用 SET 来改变 MySQL 的自动提交模式:

- **SET AUTOCOMMIT=0** 禁止自动提交
- **SET AUTOCOMMIT=1** 开启自动提交

## 六、MySQL 函数

> MySQL中的函数主要分为以下四类： 字符串函数、数值函数、日期函数、流程函数；

## 6.1 MySQL 字符串函数

MySQL中内置了很多字符串函数，常用的几个如下：

|        |            |                                    |
| ------ | ---------- | ---------------------------------- |
| concat | 字符串拼接 | select concat('Hello' , ' MySQL'); |
| lower  | 全部转小写 | select lower('Hello');             |
| upper  | 全部转大写 | select upper('Hello');             |
| lpad   | 左填充     | select lpad('01', 5, '-');         |
| rpad   | 右填充     | select rpad('01', 5, '-');         |
| trim   | 去除空格   | select trim(' Hello My ')          |
|        |            |                                    |

## 6.2 MySQL 数值函数

常见的数值函数如下：

|       |            |                        |
| ----- | ---------- | ---------------------- |
| ceil  | 向上取整   | select ceil(1.1);      |
| floor | 向下取整   | select floor(1.9);     |
| rand  | 获取随机数 | select rand();         |
| round | 四舍五入   | select round(2.344,2); |



## 6.3 MySQL 日期函数

|                    |                        |                                                              |
| ------------------ | ---------------------- | ------------------------------------------------------------ |
| curdate            | 当前日期               | select curdate();                                            |
| curtime            | 当前时间               | select curtime();                                            |
| now                | 当前日期和时间         | select now();                                                |
| YEAR , MONTH , DAY | 当前年、月、日         | select YEAR(now()); <br/>select MONTH(now()); <br/>select DAY(now()); |
| date_add           | 增加指定的时间间隔     | select date_add(now(), INTERVAL 70 YEAR );                   |
| datediff           | 获取两个日期相差的天数 | select datediff('2021-10-01', '2021-12-01');                 |



## 6.4 MySQL 流程函数

> 流程函数也是很常用的一类函数，可以在SQL语句中实现条件筛选，从而提高语句的效率。

| **函数 **                                                    | **功能**                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| IF(value , t , f)                                            | 如果value为true，则返回t，否则返回f                        |
| IFNULL(value1 , value2)                                      | 如果value1不为空，返回value1，否则返回value2               |
| CASE WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END      | 如果val1为true，返回res1，... 否 则返回default默认值       |
| CASE [ expr ] WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END | 如果expr的值等于val1，返回 res1，... 否则返回default默认值 |

A. if
```sql
select if(false, 'Ok', 'Error'); 
```
B. ifnull
```sql
select ifnull('Ok','Default');

select ifnull('','Default');

select ifnull(null,'Default');
```
C. case when then else end
需求: 查询emp表的员工姓名和工作地址 (北京/上海 ----> 一线城市 , 其他 ----> 二线城市)
```sql
select
name,
( case workaddress when '北京' then '一线城市' when '上海' then '一线城市' else
'二线城市' end ) as '工作地址'
from emp;
```

## 6.5 MySQL 系统函数

|             |              |                       |
| ----------- | ------------ | --------------------- |
| SYSTEM_USER | 获取当前用户 | SELECT SYSTEM_USER(); |
| USER        | 获取当前用户 | SELECT USER();        |
| VERSION     | 获取当前版本 | SELECT VERSION();     |
