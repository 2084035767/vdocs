

# MyBatis 笔记

```
   __  ___     ___       __  _   
  /  |/  /_ __/ _ )___ _/ /_(_)__
 / /|_/ / // / _  / _ `/ __/ (_-<
/_/  /_/\_, /____/\_,_/\__/_/___/
       /___/                     
```



## 一、MyBatis简介

### 1.1 什么是MyBatis

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。

MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。

MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

### 1.2 MyBatis的历史

-    MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下，iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github
-    iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）

### 1.3 MyBatis的优点

​    

1. MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架
2. MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集
3. MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录
4. MyBatis 是一个 半自动的ORM（Object Relation Mapping）框架

### 1.4 与其它持久化层技术对比

::: tabs#ORM

@tab JDBC  

 - SQL 夹杂在Java代码中耦合度高，导致硬编码内伤  
   - 维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见  
   - 代码冗长，开发效率低

@tab Hibernate 和 JPA

 - 操作简便，开发效率高  
   - 程序中的长难复杂 SQL 需要绕过框架  
   - 内部自动生产的 SQL，不容易做特殊优化  
   - 基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难。  
   - 反射操作太多，导致数据库性能下降

@tab MyBatis

 - 轻量级，性能出色  
   - SQL 和 Java 编码分开，功能边界清晰。Java代码专注业务、SQL语句专注数据  
   - 开发效率稍逊于HIbernate，但是完全能够接受

:::

## 二、MyBatis入门指南

### 2.1 MyBatis入门程序



#### 创建maven工程

**引入MyBatis依赖**

::: code-tabs#mybatis

@tab Maven

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>x.x.x</version>
</dependency>
```

@tab Gradle

```gradle
implementation group: 'com.baomidou', name: 'mybatis-plus-boot-starter', version: 'x.x.x'
```

:::



**创建maven工程**

```xml
<dependencies>
    <!-- Mybatis核心 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>
    <!-- junit测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!-- MySQL驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.3</version>
    </dependency>
</dependencies>
```



#### 创建MyBatis的核心配置文件

创建一个mybatis-config.xml

> 习惯上命名为`mybatis-config.xml`，这个文件名仅仅只是建议，并非强制要求。将来整合Spring之后，这个配置文件可以省略，所以大家操作时可以直接复制、粘贴。
> 核心配置文件主要用于配置连接数据库的环境以及MyBatis的全局配置信息
> 核心配置文件存放的位置是src/main/resources目录下

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!-- 数据库连接信息-->
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
         <!-- 加载sql映射文件-->
        <mapper resource="sql映射文件路径"/>
    </mappers>
</configuration>
```

#### 创建实体类

```java
public class User {
    private Integer id;
    private String name;
    private String password;
    private String email;
    private String phone;
    //...构造器、get、set方法等
```



#### 创建Mapper接口

创建一个UserMapper.xml

> MyBatis中的mapper接口相当于以前的dao。但是区别在于，mapper仅仅是接口，我们不需要提供实现类

```java
package com.atguigu.mybatis.mapper;  
  
public interface UserMapper {  
	/**  
	* 添加用户信息  
	*/  
	int insertUser();  
}
```

**命名解析：**为了减少输入量，MyBatis 对所有具有名称的配置元素（包括语句，结果映射，缓存等）使用了如下的命名解析规则。

- 全限定名（比如 “com.mypackage.MyMapper.selectAllThings）将被直接用于查找及使用。
- 短名称（比如 “selectAllThings”）如果全局唯一也可以作为一个单独的引用。 如果不唯一，有两个或两个以上的相同名称（比如 “com.foo.selectAllThings” 和 “com.bar.selectAllThings”），那么使用时就会产生“短名称不唯一”的错误，这种情况下就必须使用全限定名。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

 <!-- 
namespace：命名空间
id：唯一标识
resultType：结果类型
-->
<mapper namespace="test">
    <select id="select" resultType="User">
         <!-- sql语句-->
    </select>
</mapper>
```

#### 创建MyBatis的映射文件

- 相关概念：ORM（Object Relationship Mapping）对象关系映射。  
 - 对象：Java的实体类对象  
   - 关系：关系型数据库  
   - 映射：二者之间的对应关系

| Java概念 | 数据库概念 |
| -------- | ---------- |
| 类       | 表         |
| 属性     | 字段/列    |
| 对象     | 记录/行    |

- 映射文件的命名规则
 - 表所对应的实体类的类名+Mapper.xml
   - 例如：表t_user，映射的实体类为User，所对应的映射文件为UserMapper.xml 
   - 因此一个映射文件对应一个实体类，对应一张表的操作
   - MyBatis映射文件用于编写SQL，访问以及操作表中的数据
   - MyBatis映射文件存放的位置是src/main/resources/mappers目录下
- MyBatis中可以面向接口操作数据，要保证两个一致
 - mapper接口的全类名和映射文件的命名空间（namespace）保持一致
   - mapper接口中方法的方法名和映射文件中编写SQL的标签的id属性保持一致

```xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE mapper  
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="com.atguigu.mybatis.mapper.UserMapper">  
	<!--int insertUser();-->  
	<insert id="insertUser">  
		insert into t_user values(null,'张三','123',23,'女')  
	</insert>  
</mapper>
```

#### 通过junit测试功能

- SqlSession：代表Java程序和数据库之间的会话。（HttpSession是Java程序和浏览器之间的会话）
- SqlSessionFactory：是“生产”SqlSession的“工厂”
- 工厂模式：如果创建某一个对象，使用的过程基本固定，那么我们就可以把创建这个对象的相关代码封装到一个“工厂类”中，以后都使用这个工厂类来“生产”我们需要的对象

```java
public class UserMapperTest {
    @Test
    public void testInsertUser() throws IOException {
        //读取MyBatis的核心配置文件
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取sqlSession，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
        //SqlSession sqlSession = sqlSessionFactory.openSession();
	    //创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交  
		SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //通过代理模式创建UserMapper接口的代理实现类对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        //调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签，并执行标签中的SQL语句
        int result = userMapper.insertUser();
        //提交事务
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
}
```

此时需要手动提交事务，如果要自动提交事务，则在获取sqlSession对象时，使用`SqlSession sqlSession = sqlSessionFactory.openSession(true);`，传入一个Boolean类型的参数，值为true，这样就可以自动提交

#### 加入log4j日志功能

1. 加入依赖

   ```xml
   <!-- log4j日志 -->
   <dependency>
   <groupId>log4j</groupId>
   <artifactId>log4j</artifactId>
   <version>1.2.17</version>
   </dependency>
   ```

2. 加入log4j的配置文件

   - log4j的配置文件名为log4j.xml，存放的位置是src/main/resources目录下
   - 日志的级别：FATAL(致命)>ERROR(错误)>WARN(警告)>INFO(信息)>DEBUG(调试) 从左到右打印的内容越来越详细

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
   <log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
       <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
           <param name="Encoding" value="UTF-8" />
           <layout class="org.apache.log4j.PatternLayout">
   			<param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m (%F:%L) \n" />
           </layout>
       </appender>
       <logger name="java.sql">
           <level value="debug" />
       </logger>
       <logger name="org.apache.ibatis">
           <level value="info" />
       </logger>
       <root>
           <level value="debug" />
           <appender-ref ref="STDOUT" />
       </root>
   </log4j:configuration>
   ```

### 2.2 核心配置文件详解

>核心配置文件中的标签必须按照固定的顺序(有的标签可以不写，但顺序一定不能乱)：
>properties、settings、typeAliases、typeHandlers、objectFactory、objectWrapperFactory、reflectorFactory、plugins、environments、databaseIdProvider、mappers

| 配置项                               |                                                              |      |
| ------------------------------------ | ------------------------------------------------------------ | ---- |
| `<properties>`（属性）               |                                                              |      |
| `<settings>`（设置）                 |                                                              |      |
| `<typeAliases>`（类型别名）          | 类型别名可为 Java 类型设置一个缩写名字。<br />也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean |      |
| `<typeHandlers>`（类型处理器）       | MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时， 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型 |      |
| `<objectFactory>`（对象工厂）        | 每次 MyBatis 创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成实例化工作。 |      |
| `<plugins>`（插件）                  |                                                              |      |
| `<environments>`（环境配置）         | MyBatis 可以配置成适应多种环境，这种机制有助于将 SQL 映射应用于多种数据库之中， 现实情况下有多种理由需要这么做。 |      |
| `<environment>`（环境变量）          |                                                              |      |
| `<transactionManager>`（事物管理器） |                                                              |      |
| `<dataSource>`（数据源）             |                                                              |      |
| `<mappers>`（映射器）                |                                                              |      |



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//MyBatis.org//DTD Config 3.0//EN"
        "http://MyBatis.org/dtd/MyBatis-3-config.dtd">
<configuration>
    <!--引入properties文件，此时就可以${属性名}的方式访问属性值-->
    <properties resource="jdbc.properties"></properties>
    <settings>
        <!--将表中字段的下划线自动转换为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
    <typeAliases>
        <!--
        typeAlias：设置某个具体的类型的别名
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User"></typeAlias>-->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User" alias="user">
        </typeAlias>-->
        <!--以包为单位，设置改包下所有的类型都拥有默认的别名，即类名且不区分大小写-->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
    <!--
    environments：设置多个连接数据库的环境
    属性：
	    default：设置默认使用的环境的id
    -->
    <environments default="mysql_test">
        <!--
        environment：设置具体的连接数据库的环境信息
        属性：
	        id：设置环境的唯一标识，可通过environments标签中的default设置某一个环境的id，表示默认使用的环境
        -->
        <environment id="mysql_test">
            <!--
            transactionManager：设置事务管理方式
            属性：
	            type：设置事务管理方式，type="JDBC|MANAGED"
	            type="JDBC"：设置当前环境的事务管理都必须手动处理
	            type="MANAGED"：设置事务被管理，例如spring中的AOP
            -->
            <transactionManager type="JDBC"/>
            <!--
            dataSource：设置数据源
            属性：
	            type：设置数据源的类型，type="POOLED|UNPOOLED|JNDI"
	            type="POOLED"：使用数据库连接池，即会将创建的连接进行缓存，下次使用可以从缓存中直接获取，不需要重新创建
	            type="UNPOOLED"：不使用数据库连接池，即每次使用连接都需要重新创建
	            type="JNDI"：调用上下文中的数据源
            -->
            <dataSource type="POOLED">
                <!--设置驱动类的全类名-->
                <property name="driver" value="${jdbc.driver}"/>
                <!--设置连接数据库的连接地址-->
                <property name="url" value="${jdbc.url}"/>
                <!--设置连接数据库的用户名-->
                <property name="username" value="${jdbc.username}"/>
                <!--设置连接数据库的密码-->
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <!--引入映射文件-->
    <mappers>
        <!-- <mapper resource="UserMapper.xml"/> -->
        <!--
        以包为单位，将包下所有的映射文件引入核心配置文件
        注意：
			1. 此方式必须保证mapper接口和mapper映射文件必须在相同的包下
			2. mapper接口要和mapper映射文件的名字一致
        -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>
```



### 2.3 映射器（Mapper）文件详解



#### MyBatis获取参数值

### 2.4 MyBatis 增删改查

1. 添加

   ```xml
   <!--int insertUser();-->
   <insert id="insertUser">
   	insert into t_user values(null,'admin','123456',23,'男','12345@qq.com')
   </insert>
   ```

2. 删除

   ```xml
   <!--int deleteUser();-->
    <delete id="deleteUser">
        delete from t_user where id = 6
    </delete>
   ```

3. 修改

   ```xml
   <!--int updateUser();-->
    <update id="updateUser">
        update t_user set username = '张三' where id = 5
    </update>
   ```

4. 查询一个实体类对象

   ```xml
   <!--User getUserById();-->  
   <select id="getUserById" resultType="com.atguigu.mybatis.bean.User">  
   	select * from t_user where id = 2  
   </select>
   ```

5. 查询集合

   ```xml
   <!--List<User> getUserList();-->
   <select id="getUserList" resultType="com.atguigu.mybatis.bean.User">
   	select * from t_user
   </select>
   ```

::: tip

注意

1. 查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射关系  
	- resultType：自动映射，用于属性名和表中字段名一致的情况  
	- resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况  
2. 当查询的数据为多条时，不能使用实体类作为返回值，只能使用集合，否则会抛出异常TooManyResultsException；但是若查询的数据只有一条，可以使用实体类或集合作为返回值

:::



### 2.5 MyBatis 增删改查（注解）

1. 添加

   ```java
   @insert(insert into t_user values(null,'admin','123456',23,'男','12345@qq.com'))
   int insertUser();
   ```

2. 删除

   ```java
   @delete(delete from t_user where id = 6)
   int deleteUser()
   ```

3. 修改

   ```java
   @update(update t_user set username = '张三' where id = 5)
   int updateUser()
   ```

4. 查询一个实体类对象

   ```java
   @select(select * from t_user where id = 2)
   User getUserById(); 
   ```

5. 查询集合

   ```java
   @select(select * from t_user)
   List<User> getUserList();
   ```



## 三、查询

## 四、动态SQL

### 4.1 if元素

### 4.2 choose、when、otherwise元素

### 4.3 trim、where、set元素

### 4.4 foreach元素

## 五、缓存

### 5.1 缓存种类

### 5.2 MyBatis一级缓存

### 5.3 MyBatis二级缓存

## 六、高级特性

### 6.1 嵌套查询

### 6.2 分页

### 6.3 存储过程调用

### 6.4 自定义类型处理器

