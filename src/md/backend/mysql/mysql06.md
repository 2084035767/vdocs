# 六、MySQL 函数

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
