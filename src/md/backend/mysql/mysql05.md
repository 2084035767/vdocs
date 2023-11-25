# 五、事务简介

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
