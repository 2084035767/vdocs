# Spring Boot 笔记

## 一、简介

### 1.1 什么是Spring Boot？

- 简化Spring应用开发的一个框架；
- 整个Spring技术栈的一个大整合；
- J2EE开发的一站式解决方案；

### 1.2 Spring Boot的优势和特点

为基于Spring的开发提供更快的入门体验

开箱即用，没有代码生成，也无需XML配置。同时也可以修改默认值来满足特定的需求

提供了一些大型项目中常见的非功能性特性，如嵌入式服务器、安全、指标，健康检测、外部配置等



### 1.3 Spring Boot的核心概念

- **起步依赖** 起步依赖本质上是一个Maven项目对象模型（Project Object Model，POM），定义了对其他库的传递依赖，这些东西加在一起即支持某项功能。

简单的说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能。

- **自动配置**

Spring Boot的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程，考虑了众多因素，才决定Spring配置应该用哪个，不该用哪个。该过程是Spring自动完成的。

## 二、入门程序

### 2.1 环境设置

安装Java Development Kit (JDK)

安装和配置开发环境（例如，Eclipse、IntelliJ IDEA）

### 2.2 快速开始

创建一个Spring Boot项目

运行第一个Spring Boot应用程序

探索Spring Boot的项目结构

## 三、核心功能

### 3.1 配置管理

#### 使用application.properties进行配置



#### 使用application.yml进行配置



#### 自定义配置文件

#### 配置热部署devtools

3.2 统一开发



### 3.2 Web开发

#### 创建RESTful API

#### 处理HTTP请求和响应

#### Thymeleaf 模板引擎



### 3.3 数据访问

#### mybatis-plus

#### 配置数据源和连接池



### 3.4 安全性

#### 用户认证和授权

#### 使用Spring Security保护应用程序

#### 配置HTTPS和SSL

OAuth 2.0：用于实现身份验证和授权的开放标准。



### 3.5 测试

#### 单元测试和集成测试

#### 使用Spring Boot Test进行端到端测试

## 四、整合功能

### 日志



### 短信和邮件

### 缓存

- Spring Cache：提供缓存抽象和支持，可以与各种缓存提供商集成，如Ehcache、Redis等。

### 消息队列

- Spring AMQP：与AMQP（高级消息队列协议）兼容的消息传递框架，支持与RabbitMQ集成。
- Spring Kafka：与Apache Kafka集成的消息传递框架。

### 批处理

- Spring Batch：用于大规模批处理作业的框架。

### 微服务

- Spring Cloud：用于构建和管理微服务架构的工具集，包括服务注册与发现、负载均衡、配置管理等。

### 监控和管理

- Spring Boot Actuator：用于监控和管理Spring Boot应用程序的模块。
- Spring Boot Admin：用于监控和管理Spring Boot应用程序的可视化管理界面。

### 



### 工具类

hutool



## 五、部署和运维

### 打包和部署

### 使用Maven进行项目打包

### 部署Spring Boot应用程序到Tomcat或其他应用服务器

### 监控和管理

### 使用Actuator进行应用程序监控

### 配置和使用Spring Boot Admin进行应用程序管理

### 容器化

### 使用Docker容器化Spring Boot应用程序

### 部署和管理容器化应用程序

## 六、进阶功能