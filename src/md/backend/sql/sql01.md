# 一、SQL 简介

## 1.1 什么是 SQL

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据

三个关键点：

1. SQL 是一门数据库编程语言
2. 使用 SQL 语言编写出来的代码，叫做 SQL 语句
3. SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如 Mongodb）不支持 SQL 语言

## 1.2 SQL 能做什么

1. 从数据库中查询数据
2. 向数据库中插入新的数据
3. 更新数据库中的数据
4. 从数据库删除数据
5. 可以创建新数据库
6. 可在数据库中创建新表
7. 可在数据库中创建存储过程、视图

## SQL

> 全称Structured Query Language，结构化查询语言。操作关系型数据库的编程语言，定义了一套操作关系型数据库统一**标准。**

## SQL通用语法

> 1、SQL语句可以单行或多行书写，以分号结尾。
> 2、SQL语句可以使用空格/缩进来增强语句的可读性。
> 3、MySQL数据库的SQL语句不区分大小写，关键字建议使用大写。
> 4、注释： 单行注释：-- 注释内容 或 # 注释内容；多行注释：/* 注释内容 */

## SQL分类

> SQL语句，根据其功能，主要分为四类：DDL、DML、DQL、DCL。

| **分类** | **全称**                   | **说明**                                               |
| -------- | -------------------------- | ------------------------------------------------------ |
| **DDL ** | Data Definition Language   | 数据定义语言，用来定义数据库对象(数据库，表，字段)     |
| **DCL ** | Data Control Language      | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |
| **DML**  | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改         |
| **DQL ** | Data Query Language        | 数据查询语言，用来查询数据库中表的记录                 |

## 核心动词

### 数据定义

- CREATE -create(创建)
- DROP -drop(删除)
- ALTER -alter(修改)

### 数据查询

- SELECT -select(查询)

### 数据操纵

- INSERT -insert(插入)
- UPDATE -update(更新)
- DELETE -delete(删除)

### 数据控制

- CRANT -crant(授权)
- REVOKE -revoke(收回)
