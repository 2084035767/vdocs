# 六、DQL

> DQL英文全称是Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记录。

## 6.1 基本语法

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

## 6.2 基础查询

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

## 6.3 条件查询

语法

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表 ;
```

### 条件

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

### SQL 的 ORDER BY 子句

- ORDERBY 语句用于根据指定的列对结果集进行排序。
- ORDERBY 语句默认按照升序对记录进行排序（关键字 ASC 可以不写）
- 如果您希望按照降序对记录进行排序，可以使用 DESC 关键字

### SQL 的 WHERE 子句

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

```sql
-- 查询语句中的WHERE条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
-- 更新语句中的WHERE条件
UPDATE 表名称 SET 列=新值 WHERE 列 运算符 值
-- 删除语句中的WHERE条件
DELETE FROM 表名称 WHERE 列 运算符 值
```

#### ORDERBY 子句-多重排序

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

## 6.4 聚合函数

### 常见的聚合函数

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

### SQL 的 COUNT(*)函数

COUNT(*)函数用于返回查询结果的总数据条数，语法格式如下：

```sql
SELECT COUNT(*) FROM 表名称
```

#### 使用 AS 为列设置别名

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

