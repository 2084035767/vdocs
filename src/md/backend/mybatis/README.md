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

::: tabs

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
                <property name="driver" value="${驱动类（含包名）}"/>
                <property name="url" value="${数据库连接URL}"/>
                <property name="username" value="${用户名}"/>
                <property name="password" value="${密码}"/>
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
@Data
public class User {
    private Integer id;
    private String name;
    private String password;
    private String email;
    private String phone;
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
- 此时需要手动提交事务，如果要自动提交事务，则在获取sqlSession对象时，使用`SqlSession sqlSession = sqlSessionFactory.openSession(true);`，传入一个Boolean类型的参数，值为true，这样就可以自动提交

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



### 2.2 核心配置文件详解

>核心配置文件中的标签必须按照固定的顺序(有的标签可以不写，但顺序一定不能乱)：
>properties、settings、typeAliases、typeHandlers、objectFactory、objectWrapperFactory、reflectorFactory、plugins、environments、databaseIdProvider、mappers

| 标签                                 | 作用                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `<properties>`（属性）               | 允许在 MyBatis 配置文件中定义属性，这些属性可以在配置文件中的其他地方引用。属性可以用于替换配置文件中的占位符，或者用于配置其他元素的属性。 |
| `<settings>`（设置）                 | 用于配置 MyBatis 的全局设置，例如自动映射行为、缓存配置、数据库连接池等。 |
| `<typeAliases>`（类型别名）          | 用于为 Java 类型或包设置别名，以简化在映射文件中的类型引用。 |
| `<typeHandlers>`（类型处理器）       | 用于自定义类型处理器，将数据库中的数据类型转换为 Java 对象，或将 Java 对象转换为数据库中的数据类型。 |
| `<objectFactory>`（对象工厂）        | 用于创建结果对象的包装器实例。默认情况下，MyBatis 使用默认的对象包装器工厂，但可以通过该标签配置自定义的对象包装器工厂。 |
| `<reflectorFactory>`（反射器工厂）   | 用于创建反射器的实例。默认情况下，MyBatis 使用默认的反射器工厂，但可以通过该标签配置自定义的反射器工厂。 |
| `<plugins>`（插件）                  | 用于配置 MyBatis 的插件，可以拦截并修改 MyBatis 的核心行为。 |
| `<environments>`（环境配置）         | 用于配置 MyBatis 的数据库环境，包括事务管理器和数据源的配置。 |
| `<transactionManager>`（事物管理器） | 用于配置 MyBatis 的事务管理器。                              |
| `<dataSource>`（数据源）             | 用于配置 MyBatis 的数据源，包括驱动、数据库URL、用户名和密码。 |
| `<mappers>`（映射器）                | 用于配置 MyBatis 的映射器（Mapper），即定义 SQL 语句和映射关系的接口。 |

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
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
    <!--default：设置默认使用的环境的id-->
    <environments default="mysql_test">
        <!-- id：设置环境的唯一标识，可通过environments标签中的default设置某一个环境的id，表示默认使用的环境-->
        <environment id="mysql_test">
            <!--
            属性：
             type：设置事务管理方式，type="JDBC|MANAGED"
              JDBC：设置当前环境的事务管理都必须手动处理
              MANAGED：设置事务被管理，例如spring中的AOP
            -->
            <transactionManager type="JDBC"/>
            <!--
            属性：
             type：设置数据源的类型，type="POOLED|UNPOOLED|JNDI"
              POOLED：使用数据库连接池，即会将创建的连接进行缓存，下次使用可以从缓存中直接获取，不需要重新创建
              UNPOOLED：不使用数据库连接池，即每次使用连接都需要重新创建
              JNDI：调用上下文中的数据源
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
    <mappers>
        <!-- 文件引入: <mapper resource="UserMapper.xml"/> -->
        <!-- 包名引入: <package name="com.codeam.springmvc.mapper"/> -->
        <!-- 接口引入: <mapper class="com.codeam.springmvc.mapper.PersonMapper"/> -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>
```



### 2.3 映射器（Mapper）文件详解

#### MyBatis获取参数值

`#{}`和`${}`

- `#{}`表示一个占位符号，`${}`表示一个拼接符号，会引用sql注入，所以**不建议使用`${}`**。

- 如果接收简单类型，`#{}`中可以写成value或其它名称。`${}`中只能写成value。
- `#{}`和`${}`接收输入参数，类型可以是简单类型，pojo、hashmap。
- `#{}`和`${}`接收pojo对象值，通过OGNL读取对象中的属性值，通过属性.属性.属性...的方式获取对象属性值。

### 2.4 MyBatis 开发

| 标签          | 作用                                                |
| ------------- | --------------------------------------------------- |
| `<select>`    | 定义一个查询语句，用于执行 SELECT 操作。            |
| `<insert>`    | 定义一个插入语句，用于执行 INSERT 操作。            |
| `<update>`    | 定义一个更新语句，用于执行 UPDATE 操作。            |
| `<delete>`    | 定义一个删除语句，用于执行 DELETE 操作。            |
| `<bind>`      | 将参数绑定到一个变量，可以在 SQL 语句中引用该变量。 |
| `<selectKey>` | 配置在插入语句执行后获取自动生成的主键值。          |



#### DML 语句

```xml
<!--增加: int insertUser();-->
<insert id="insertUser">
	INSERT INTO USER(id, username) VALUES (#{id},#{userName})
</insert>

<!--删除:int deleteUser();-->
 <delete id="deleteUser">
     delete from t_user where id = 6
 </delete>

<!--修改:int updateUser();-->
 <update id="updateUser">
     update t_user set username = #{username} where id = 5
 </update>
```



#### DQL 语句

```xml
<!--查询一个: User getUserById();-->  
<select id="getUserById" resultType="com.atguigu.mybatis.bean.User">  
	select * from t_user where id = 2  
</select>

<!--查询集合: List<User> getUserList();-->
<select id="getUserList" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user
</select>
```

::: tip

查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射关系  
- resultType：自动映射，用于属性名和表中字段名一致的情况  
- resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况  

:::

### 2.5 MyBatis 注解开发

| 注解         | 作用                                                        |
| ------------ | ----------------------------------------------------------- |
| `@Mapper`    | 将接口标记为 MyBatis 的映射器（Mapper），用于与数据库交互。 |
| `@Select`    | 声明一个查询语句，用于执行 SELECT 操作。                    |
| `@Insert`    | 声明一个插入语句，用于执行 INSERT 操作。                    |
| `@Update`    | 声明一个更新语句，用于执行 UPDATE 操作。                    |
| `@Delete`    | 声明一个删除语句，用于执行 DELETE 操作。                    |
| `@Param`     | 指定方法参数的名称，用于在 SQL 语句中引用参数。             |
| `@Options`   | 配置一些特殊的查询选项，如返回自动生成的主键值。            |
| `@Flush`     | 配置在方法执行后刷新缓存。                                  |
| `@SelectKey` | 配置在插入语句执行后获取自动生成的主键值。                  |



#### DML 语句

```java
@insert(insert into t_user values(null,'admin','123456',23,'男','12345@qq.com'))
int insertUser();

@delete(delete from t_user where id = 6)
int deleteUser()
    
@update(update t_user set username = '张三' where id = 5)
int updateUser()
    
    
```



#### DQL 语句

```java
@select(select * from t_user where id = 2)
User getUserById(); 
@select(select * from t_user)
List<User> getUserList();
```



## 三、数据查询



## 四、动态SQL

**标签方式**

| 标签          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| `<sql>`       | 定义可重用的 SQL 片段，可以在其他语句中引用。                |
| `<include>`   | 引用 `<sql>` 标签中定义的 SQL 片段。                         |
| `<if>`        | 根据条件判断是否执行 SQL 片段。                              |
| `<trim>`      | 根据条件对 SQL 语句进行修剪，去除不必要的部分。              |
| `<where>`     | 定义 WHERE 子句，用于在查询语句中添加条件。如果where后面的字符串是以AND或者OR开头的，就将它们剔除。 |
| `<set>`       | 定义 SET 子句，用于在更新语句中设置要更新的列和值。如果该标签包含的元素中有返回值，就插入一个set，如果set后面的字符串是以,结尾的，就将这个逗号剔除。 |
| `<foreach>`   | 遍历集合或数组，并将元素应用于 SQL 语句中的参数。            |
| `<choose>`    | 类似于 Java 中的 switch 语句，根据条件选择不同的 SQL 片段。  |
| `<when>`      | `<choose>` 标签中的条件分支，用于定义条件和对应的 SQL 片段。 |
| `<otherwise>` | `<choose>` 标签中的默认分支，当所有条件不满足时执行的 SQL 片段。 |



**注解方式**

| 注解              | 作用                                          |
| ----------------- | --------------------------------------------- |
| `@SelectProvider` | 使用提供的类或方法生成动态 SQL 查询语句。     |
| `@InsertProvider` | 使用提供的类或方法生成动态 SQL 插入语句。     |
| `@UpdateProvider` | 使用提供的类或方法生成动态 SQL 更新语句。     |
| `@DeleteProvider` | 使用提供的类或方法生成动态 SQL 删除语句。     |
| `@Lang`           | 指定语言驱动，用于支持自定义的动态 SQL 语言。 |

### 4.1 if 标签

- if标签的test属性必填，该属性值是一个符合OGNL要求的判断表达式，一般只用true或false作为结果。
- 判断条件property != null 或 property == null，适用于任何类型的字段，用于判断属性值是否为空。
- 判断条件property != '' 或 property == ''，仅适用于String类型的字段，用于判断是否为空字符串。
- 当有多个判断条件时，使用and或or进行连接，嵌套的判断可以使用小括号分组。

```xml
<!-- 用户信息综合查询
    #{userCustom.sex}:取出pojo包装对象中性别值
    ${userCustom.username}：取出pojo包装对象中用户名称
 -->
<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <if test="userCustom.sex!=null and userCustom.sex != '' ">
            AND user.sex=#{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username != '' ">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </where>
</select>
```



### 4.2 choose、when、otherwise 标签

```xml
<select id="selectByIdOrUserName" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT  id,name,password,email,FROM user WHERE 1 = 1
    <choose>
        <when test="id != null">
            AND id = #{id}
        </when>
        <when test="userName != null and userName != ''">
            AND user_name = #{userName}
        </when>
        <otherwise>
            AND 1 = 2
        </otherwise>
    </choose>
</select>
```



### 4.3 trim、where、set 标签

trim 是一个比较通用的标签用于去除sql语句中多余的and关键字，逗号，或者给sql语句前拼接 “where“、“set“以及“values(“ 等前缀，或者添加“)“等后缀。

属性

- `prefix`：给sql语句拼接的前缀。
- `suffix`：给sql语句拼接的后缀
- `prefixOverrides`：去除sql语句前面的关键字或者字符。
- `suffixOverrides`：去除sql语句后面的关键字或者字符。

```xml
<select id="selectByUserWhere" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT id,
    user_name,
    user_password,
    user_email,
    create_time
    FROM sys_user
    <where>
        <if test="userName != null and userName != ''">
            AND user_name LIKE CONCAT('%',#{userName},'%')
        </if>
        <if test="userEmail != null and userEmail != ''">
            AND user_email = #{userEmail}
        </if>
    </where>
</select>

<update id="updateByIdSelectiveSet">
    UPDATE sys_user
    <set>
        <if test="userName != null and userName != ''">
            user_name = #{userName},
        </if>
        <if test="userPassword != null and userPassword != ''">
            user_password = #{userPassword},
        </if>
        <if test="userEmail != null and userEmail != ''">
            user_email = #{userEmail},
        </if>
        <if test="userInfo != null and userInfo != ''">
            user_info = #{userInfo},
        </if>
        <if test="headImg != null">
            head_img = #{headImg,jdbcType=BLOB},
        </if>
        <if test="createTime != null">
            create_time = #{createTime,jdbcType=TIMESTAMP},
        </if>
        id = #{id},
    </set>
    WHERE id = #{id}
</update>

<trim prefix="WHERE" prefixOverrides="AND">
	<if test="state != null">
	  state = #{state}
	</if> 
	<if test="title != null">
	  AND title like #{title}
	</if>
	<if test="author != null and author.name != null">
	  AND author_name like #{author.name}
	</if>
</trim>
```



### 4.4 foreach 标签

向sql传递数组或List，mybatis使用foreach解析

在用户查询列表和查询总数的statement中增加多个id输入查询。两种方法，sql语句如下：

- `SELECT * FROM USER WHERE id=1 OR id=10 OR id=16`
- `SELECT * FROM USER WHERE id IN(1,10,16)`

一个使用OR,一个使用IN


- 在输入参数类型中添加`List<Integer> ids`传入多个id

foreach包含属性讲解：

- open：整个循环内容开头的字符串。
- close：整个循环内容结尾的字符串。
- separator：每次循环的分隔符。
- item：从迭代对象中取出的每一个值。
- index：如果参数为集合或者数组，该值为当前索引值，如果参数为Map类型时，该值为Map的key。
- collection：要迭代循环的属性名。

```xml
<if test="ids!=null">
    <!-- 使用实现下边的sql拼接：
     AND (id=1 OR id=10 OR id=16)
     -->
    <foreach collection="ids" item="user_id" open="AND (" close=")" separator="or">
        <!-- 每个遍历需要拼接的串 -->
        id=#{user_id}
    </foreach>

    <!-- 实现  “ and id IN(1,10,16)”拼接 -->
    <!-- <foreach collection="ids" item="user_id" open="and id IN(" close=")" separator=",">
        每个遍历需要拼接的串
        #{user_id}
    </foreach> -->
</if>
```



### 4.5 sql 标签

```xml
<!-- 定义sql片段
id：sql片段的唯 一标识

经验：是基于单表来定义sql片段，这样话这个sql片段可重用性才高
在sql片段中不要包括 where
 -->
<sql id="query_user_where">
    <if test="userCustom!=null">
        <if test="userCustom.sex!=null and userCustom.sex!=''">
            AND user.sex = #{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username!=''">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </if>
</sql>

<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <!-- 引用sql片段 的id，如果refid指定的id不在本mapper文件中，需要前边加namespace -->
        <include refid="query_user_where"></include>
        <!-- 在这里还要引用其它的sql片段  -->
    </where>
</select>
```



## 五、数据缓存

### 5.1 缓存种类

MyBatis提供了**一级缓存**和**二级缓存**

1. **默认**情况下，只有一级缓存（**SqlSession级别**的缓存，也称为本地缓存）开启。
2. 二级缓存（全局缓存）需要手动开启和配置，他是基于**mapper级别**的缓存。
3. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

#### 一级缓存

Mybatis中的一级缓存默认开启，是sqlsession级别的

1. 一级缓存(local cache), 即本地缓存, 作用域默认为sqlSession。
2. 一级缓存的工作机制



#### 二级缓存

在同一个**namespace下的mapper**文件中，执行相同的查询SQL，第一次会去查询数据库，并写到缓存中；第二次直接从缓存中取。当执行SQL时两次查询中间发生了增删改操作，则二级缓存清空。
使用二级缓存时，由于二级缓存的数据不一定都是存储到内存中，它的存储介质多种多样，所以需要给缓存的对象执行序列化（让pojo对象实现**Serializable接口**）。



#### 第三方缓存 EhCache

1. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来**自定义二级缓存**
2. EhCache 是一个纯Java的进程内缓存框架，具有快速、精干等特点，是Hibernate中默认的CacheProvider
3. 在mapper.xml里面配置cache标签



### 5.2 MyBatis一级缓存

一级缓存是SqlSession级别的缓存。不同的sqlSession之间的缓存数据区域（HashMap）是互相不影响的。

一级缓存的作用域是同一个SqlSession，在同一个sqlSession中两次执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据，从而提高查询效率。当一个sqlSession结束后该sqlSession中的一级缓存也就不存在了。Mybatis默认开启一级缓存。

一级缓存只是相对于同一个SqlSession而言。所以在参数和SQL完全一样的情况下，我们使用同一个SqlSession对象调用一个Mapper方法，往往只执行一次SQL。



默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存（一级缓存无法关闭，只能调整）

> 注意：一个会话DML操作只会重置当前会话的缓存，不会重置其他会话的缓存，也就是说，其他会话缓存是不会更新的！



#### 一级缓存的生命周期

- 当会话结束时，SqlSession对象及其内部的Executor对象还有PerpetualCache对象也一并释放掉。
- SqlSession调用了close()方法，会释放掉一级缓存PerpetualCache对象，一级缓存将不可用。
- SqlSession调用了clearCache()，会清空PerpetualCache对象中的数据，但是该对象仍可使用。
- SqlSession中执行了任何一个DML操作(update()、delete()、insert()) ，都会清空PerpetualCache对象的数据，但是该对象可以继续使用



**相同查询的条件**

1. 传入的statementId
2. 查询时要求的结果集中的结果范围
3. 本次查询所产生的最终要传递给JDBC的Sql语句字符串（boundSql.getSql() ）
4. 传递给java.sql.Statement要设置的参数值



**一级缓存失效的情况**
不同的sqlsession对应不同的一级缓存
同一个sqlsession但是查询的条件不同
同一个sqlsession两次查询期间执行了任意一次增删改操作
同一个sqlsession两次查询期间手动清空了缓存



**缓存一致性问题**



### 5.3 MyBatis二级缓存

MyBatis的二级缓存是Application级别的缓存，它可以提高对数据库查询的效率，以提高应用的性能。

二级缓存是mapper级别的缓存，多个SqlSession去操作同一个Mapper的sql语句，数据库得到数据会存在二级缓存区域，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。

二级缓存是多个SqlSession共享的，其作用域是mapper的同一个namespace，不同的sqlSession两次执行相同namespace下的sql语句且向sql中传递参数也相同即最终执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。Mybatis默认没有开启二级缓存需要在setting全局参数中配置开启二级缓存。

sqlSessionFactory层面上的二级缓存默认是不开启的，二级缓存的开启需要进行配置，实现二级缓存的时候，MyBatis要求返回的POJO必须是可序列化的。 也就是要求实现Serializable接口，配置方法很简单，只需要在映射XML文件使用 `<cache/>`标签。

> 读取顺序：二级缓存 => 一级缓存 => 数据库

#### 二级缓存的作用

- 映射语句文件中的所有select语句将会被缓存。
- 映射语句文件中的所有insert、update和delete语句会刷新缓存。
- 缓存会使用默认的Least Recently Used（LRU，最近最少使用的）算法来收回。
- 根据时间表，比如No Flush Interval,（CNFI没有刷新间隔），缓存不会以任何时间顺序来刷新。
- 缓存会存储列表集合或对象(无论查询方法返回什么)的1024个引用
- 缓存会被视为是read/write(可读/可写)的缓存，意味着对象检索不是共享的，而且可以安全的被调用者修改，不干扰其他调用者或线程所做的潜在修改。如果缓存中有数据就不用从数据库中获取，大大提高系统性能。





- evition：代表缓存回收策略

1. LRU，最近最少使用的，移除最长时间不用的对象。
2. FIFO，先进先出，按对象进入缓存的顺序来移除他们。
3. SOFT，软引用，移除基于垃圾回收器转台和软引用规则的对象。
4. WEAK——弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。

- size：引用数目，一个正整数，代表缓存最多可以存储多少个对象，不宜过大，容易导致内存溢出。

- readOnly：只读，意味着缓存数据只能读取而不能修改。



- eviction=“[FIFO](https://so.csdn.net/so/search?q=FIFO&spm=1001.2101.3001.7020)”：缓存回收策略：
  [LRU](https://so.csdn.net/so/search?q=LRU&spm=1001.2101.3001.7020) – 最近最少使用的：移除最长时间不被使用的对象。
  FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
  SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
  WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。
  **默认的是 LRU**。

- flushInterval：刷新间隔，单位毫秒
  默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新

- size：引用数目，正整数
  代表缓存最多可以存储多少个对象，太大容易导致内存溢出

- readOnly：只读，true/false
  true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。
  false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，因此默认是 false。



二级缓存默认是关闭状态，要开启二级缓存，我们需要在映射器XML文件中添加：

```xml
<cache
  eviction="FIFO"
  flushInterval="60000"
  size="512"
  readOnly="true"/>
```

缓存的相关属性设置

1. 全局setting的cacheEnable：
   配置二级缓存的开关，一级缓存一直是打开的。
2. select标签的useCache属性：
   配置这个select是否使用二级缓存。一级缓存一直是使用的（在全局开启二级缓存的情况下某个select标签关闭二级缓存）
3. sql标签的flushCache属性：
   增删改默认flushCache=true。sql执行以后，会同时清空一级和二级缓存。
   查询默认 flushCache=false。
4. sqlSession.clearCache()：只是用来清除一级缓存。

```xml
<!--添加useCache属性来关闭缓存 -->
<select id="getStudentBySid" resultType="Student" useCache="false">
    select * from student where sid = #{sid}
</select>

<!--使用flushCache="false"在每次执行后都清空缓存 -->
<select id="getStudentBySid" resultType="Student" flushCache="true">
    select * from student where sid = #{sid}
</select>
```



## 六、高级特性

### 6.1 高级映射



| 标签                       | 注解                 | 作用                                                   |
| -------------------------- | -------------------- | ------------------------------------------------------ |
| `<resultMap>`              | `@Results`           | 定义结果映射，将查询结果映射到 Java 对象的属性。       |
| `<result>`                 | `@Result`            | 定义单个属性的结果映射，用于 `<resultMap>` 中。        |
| `<association>`            | `@One`               | 定义一对一关联关系的结果映射。                         |
| `<collection>`             | `@Many`              | 定义一对多关联关系的结果映射。                         |
| `<constructor>`            | `@ConstructorArgs`   | 定义构造函数参数的结果映射，用于创建对象实例。         |
| `<discriminator>`          | `@TypeDiscriminator` | 定义类型鉴别器，用于根据不同的类型执行不同的映射规则。 |
| `<resultMap>`的extends属性 | `@ResultMap`         | 引用已定义的结果映射，用于复用结果映射配置。           |



#### 自定义映射

在查询标签中可以自动映射，也可以自定义映射，`ResultMap`标签可以自定义映射。

ResultMap的属性

- id当前命名空间中的一个唯一标识，用于标识一个结果映射。
- type类的完全限定名, 或者一个类型别名
- autoMapping 会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认关闭
- extends继承其他resultMap的属性



**构造映射**

`<constructor>`：用于在实例化类时，注入结果到构造方法中

- `<idArg>`：用来映射参数时数据表ID字段
- `<arg>`：用来映射普通参数





#### 嵌套查询和嵌套结果

**嵌套查询**：指通过执行另外一条SQL映射语句来返回预期的复杂类型。

- 嵌套查询是在查询SQL中嵌入一个子查询SQL
- 套查询会执行多条SQL语句                  
- 嵌套查询SOL语句编写较为简单

**嵌套结果**：使用嵌套结果映射来处理重复的联合结果的子集。

- 嵌套结果是一个嵌套的多表查询SQL
- 嵌套结果只会执行一条复杂的SQL语句
- 嵌套结果SOL语句编写比较复杂



#### 一对一映射

使用`association`标签实现一对一映射（对应注解`@One`）

属性

- `property`：映射到列结果的字段或属性。
- `column`：数据库中的列名，或者是列的别名。
- `columnPrefix`：数据库中的列名的前缀。
- `select`：嵌套查询中指定子查询的方法。
- `javaType`：一个 Java 类的完全限定名，或一个类型别名。
- `resultMap`：指定相关联的`resultMap`

**嵌套查询**

```xml
<!--嵌套查询 查询效率低 要多查一轮-->
<select id="getStudent" resultMap="studentvo">
    select * from student
</select>
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO" autoMapping="true">
    <association property="c" column="c_id" select="getClass" ></association>
</resultMap>
<select id="getClass" resultType="com.example.test.MySelect.entity.Class">
    select * from class where id=#{id}
</select>
```

**嵌套结果**

```xml
<!--嵌套结果-->
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <result property="age" column="age"></result>
    <!--方式1:缺点是要写每个字段一一对应-->
    <association property="c" >
        <id property="id" column="c_id"></id>
        <result property="name" column="cname"></result>
    </association>
    <!--方式2:自动映射 *在没有相同字段*时可以使用！！-->
    <!--  <association property="c" autoMapping="true"></association>-->
</resultMap>
```



#### 一对多映射

使用`collection`标签实现一对一映射（对应注解`@Many`）

属性与`association`标签相同

- `ofType`：指定的这个一对多的集合的所存放的实体类的类型



**嵌套查询**

```xml
<!--嵌套查询 查询效率低 要多查一轮-->
<select id="getStudent" resultMap="studentvo">
    select * from student
</select>
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO" autoMapping="true">
    <collection property="c" column="c_id" select="getClass" ></collection>
</resultMap>
<select id="getClass" resultType="com.example.test.MySelect.entity.Class">
    select * from class where id=#{id}
</select>
```

**嵌套结果**

```xml
<!--嵌套结果-->
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <result property="age" column="age"></result>
    <!--方式1:缺点是要写每个字段一一对应-->
    <collection property="c" >
        <id property="id" column="c_id"></id>
        <result property="name" column="cname"></result>
    </collection>
    <!--方式2:自动映射 *在没有相同字段*时可以使用！！-->
    <!--  <association property="c" autoMapping="true"></association>-->
</resultMap>
```



#### 鉴别器映射

`discriminator`标签可以有1个或多个case标签

case标签属性

- `value`：该值为`discriminator`标签`column`属性用来匹配的值。
- `resultMap`：当`column`的值和`value`的值匹配时，可以指定使用resultMap指定的映射。

```xml
<resultMap id="rolePrivilegeListMapChoose"
           type="com.zwwhnly.mybatisaction.model.SysRoleExtend">
    <discriminator column="enabled" javaType="int">
        <case value="1" resultMap="rolePrivilegeListMapSelect"/>
        <case value="0" resultMap="roleMapExtend"/>
    </discriminator>
</resultMap>
```



#### 延迟加载

>延迟加载的意义在于，一开始并不取出级联数据，只有当使用它了才发送SQL去取回数据。

配置延迟加载

```xml
1. 设置延迟加载
<setting name="lazyLoadingEnabled" value="true"/>
2.默认采用按层级延迟加载，当value为false时，采用按需加载
<setting name="aggressiveLazyLoading" value="true"/>


<!--
指定具体属性的加载方式
在association和collection中通过设置fetchType，先设置aggressiveLazyLoading为false
 fetchType="lazy"时，采用延迟加载。
 fetchType="eager"时，采用即时加载。
-->
```



### 6.2 分页

为了解决这个问题，MyBatis 为我们提供了一个通用的分页工具：PageHelper。

使用步骤：

1.引入依赖

```xml
<!-- 分页插件 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.4</version>
</dependency>
```

2.修改主配置文件

在 environments 标签之前添加：

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor" />
</plugins>
```

 4.测试代码

```java
@Test
  public void testGetAll(){
      // 1.获取 SqlSession 对象
      SqlSession session = MyBatisUtil.getSqlSession();
      // 2.使用 SqlSession 创建 Dao 接口的代理对象
      UserDao userDao = session.getMapper(UserDao.class);
      // 3.执行接口的方法
      Page page = PageHelper.startPage(2, 3);
      List<User> userList = userDao.getUser();
      System.out.println("当前页："+page.getPageNum());
      System.out.println("每页条数："+page.getPageSize());
      System.out.println("总条数："+page.getTotal());
      System.out.println("总页数："+page.getPages());
      System.out.println("-------------------------");
      userList.forEach(user ->{
          System.out.println("姓名："+user.getName()+",性别："+user.getSex()+",年龄："+user.getAge());
      });
      // 4.关闭 SqlSession
      MyBatisUtil.close();
  }
```

### 6.3 存储过程调用



### 6.4 自定义类型处理器



### 6.5 逆向工程

添加Maven依赖

这里其实可以添加Maven依赖的，因为跟着视频做的，所以我就建了个普通工程，直接添加了个lib文件夹，把要用的jar包直接copy进来了。

#### 使用方法

#### 运行逆向工程

还可以通过eclipse的插件生成代码

建议使用java程序方式，不依赖开发工具。

#### 生成代码配置文件


```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
	<context id="testTables" targetRuntime="MyBatis3">
		<commentGenerator>
			<!-- 是否去除自动生成的注释 true：是 ： false:否 -->
			<property name="suppressAllComments" value="true" />
		</commentGenerator>
		<!--数据库连接的信息：驱动类、连接地址、用户名、密码 -->
		<jdbcConnection driverClass="com.mysql.jdbc.Driver"
			connectionURL="jdbc:mysql://120.25.162.238:3306/mybatis001?characterEncoding=utf-8" 
			userId="root"
			password="123">
		</jdbcConnection>
		<!-- <jdbcConnection driverClass="oracle.jdbc.OracleDriver"
			connectionURL="jdbc:oracle:thin:@127.0.0.1:1521:yycg" 
			userId="yycg"
			password="yycg">
		</jdbcConnection> -->

		<!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL 和 
			NUMERIC 类型解析为java.math.BigDecimal -->
		<javaTypeResolver>
			<property name="forceBigDecimals" value="false" />
		</javaTypeResolver>

		<!-- targetProject:生成PO类的位置 -->
		<javaModelGenerator targetPackage="com.iot.ssm.po"
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
			<!-- 从数据库返回的值被清理前后的空格 -->
			<property name="trimStrings" value="true" />
		</javaModelGenerator>
        <!-- targetProject:mapper映射文件生成的位置 -->
		<sqlMapGenerator targetPackage="com.iot.ssm.mapper" 
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</sqlMapGenerator>
		<!-- targetPackage：mapper接口生成的位置 -->
		<javaClientGenerator type="XMLMAPPER"
			targetPackage="com.iot.ssm.mapper" 
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</javaClientGenerator>
		<!-- 指定数据库表 -->
		<table tableName="items"></table>
		<table tableName="orders"></table>
		<table tableName="orderdetail"></table>
		<table tableName="user"></table>
		<!-- <table schema="" tableName="sys_user"></table>
		<table schema="" tableName="sys_role"></table>
		<table schema="" tableName="sys_permission"></table>
		<table schema="" tableName="sys_user_role"></table>
		<table schema="" tableName="sys_role_permission"></table> -->
		
		<!-- 有些表的字段需要指定java类型
		 <table schema="" tableName="">
			<columnOverride column="" javaType="" />
		</table> -->
	</context>
</generatorConfiguration>
```

需要注意的位置：

- `javaModelGenerator`,生成PO类的位置
- `sqlMapGenerator`,mapper映射文件生成的位置
- `javaClientGenerator`,mapper接口生成的位置 
- `table`,指定数据库表 

#### 执行生成程序

```java
public void generator() throws Exception{

	List<String> warnings = new ArrayList<String>();
	boolean overwrite = true;
	//指定逆向工程配置文件
	File configFile = new File("generatorConfig.xml"); 
	ConfigurationParser cp = new ConfigurationParser(warnings);
	Configuration config = cp.parseConfiguration(configFile);
	DefaultShellCallback callback = new DefaultShellCallback(overwrite);
	MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config,
			callback, warnings);
	myBatisGenerator.generate(null);

} 
```

生成后的代码：



#### 使用生成的代码

需要将生成工程中所生成的代码拷贝到自己的工程中。

测试ItemsMapper中的方法

````java
package com.iot.ssm.mapper;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import com.iot.ssm.po.Items;
import com.iot.ssm.po.ItemsExample;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class ItemsMapperTest {

	private ApplicationContext applicationContext;
	
	private ItemsMapper itemsMapper;

	//在setUp这个方法得到spring容器
	@Before
	public void setUp() throws Exception {
		applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
		itemsMapper = (ItemsMapper) applicationContext.getBean("itemsMapper");
	}

	//根据主键删除 
	@Test
	public void testDeleteByPrimaryKey() {
		
	}

	//插入
	@Test
	public void testInsert() {
		//构造 items对象
		Items items = new Items();
		items.setName("手机");
		items.setPrice(999f);
		items.setCreatetime(new Date());
		itemsMapper.insert(items);
	}

	//自定义条件查询
	@Test
	public void testSelectByExample() {
		ItemsExample itemsExample = new ItemsExample();
		//通过criteria构造查询条件
		ItemsExample.Criteria criteria = itemsExample.createCriteria();
		criteria.andNameEqualTo("笔记本");
		//可能返回多条记录
		List<Items> list = itemsMapper.selectByExample(itemsExample);
		
		System.out.println(list);
		
	}

	//根据主键查询
	@Test
	public void testSelectByPrimaryKey() {
		Items items = itemsMapper.selectByPrimaryKey(1);
		System.out.println(items);
	}

	//更新数据
	@Test
	public void testUpdateByPrimaryKey() {
		
		//对所有字段进行更新，需要先查询出来再更新
		Items items = itemsMapper.selectByPrimaryKey(1);
		
		items.setName("手机");
		
		itemsMapper.updateByPrimaryKey(items);
		//如果传入字段不空为才更新，在批量更新中使用此方法，不需要先查询再更新
		//itemsMapper.updateByPrimaryKeySelective(record);
		
	}

}

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

::: tabs

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
                <property name="driver" value="${驱动类（含包名）}"/>
                <property name="url" value="${数据库连接URL}"/>
                <property name="username" value="${用户名}"/>
                <property name="password" value="${密码}"/>
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
@Data
public class User {
    private Integer id;
    private String name;
    private String password;
    private String email;
    private String phone;
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
- 此时需要手动提交事务，如果要自动提交事务，则在获取sqlSession对象时，使用`SqlSession sqlSession = sqlSessionFactory.openSession(true);`，传入一个Boolean类型的参数，值为true，这样就可以自动提交

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



### 2.2 核心配置文件详解

>核心配置文件中的标签必须按照固定的顺序(有的标签可以不写，但顺序一定不能乱)：
>properties、settings、typeAliases、typeHandlers、objectFactory、objectWrapperFactory、reflectorFactory、plugins、environments、databaseIdProvider、mappers

| 标签                                 | 作用                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `<properties>`（属性）               | 允许在 MyBatis 配置文件中定义属性，这些属性可以在配置文件中的其他地方引用。属性可以用于替换配置文件中的占位符，或者用于配置其他元素的属性。 |
| `<settings>`（设置）                 | 用于配置 MyBatis 的全局设置，例如自动映射行为、缓存配置、数据库连接池等。 |
| `<typeAliases>`（类型别名）          | 用于为 Java 类型或包设置别名，以简化在映射文件中的类型引用。 |
| `<typeHandlers>`（类型处理器）       | 用于自定义类型处理器，将数据库中的数据类型转换为 Java 对象，或将 Java 对象转换为数据库中的数据类型。 |
| `<objectFactory>`（对象工厂）        | 用于创建结果对象的包装器实例。默认情况下，MyBatis 使用默认的对象包装器工厂，但可以通过该标签配置自定义的对象包装器工厂。 |
| `<reflectorFactory>`（反射器工厂）   | 用于创建反射器的实例。默认情况下，MyBatis 使用默认的反射器工厂，但可以通过该标签配置自定义的反射器工厂。 |
| `<plugins>`（插件）                  | 用于配置 MyBatis 的插件，可以拦截并修改 MyBatis 的核心行为。 |
| `<environments>`（环境配置）         | 用于配置 MyBatis 的数据库环境，包括事务管理器和数据源的配置。 |
| `<transactionManager>`（事物管理器） | 用于配置 MyBatis 的事务管理器。                              |
| `<dataSource>`（数据源）             | 用于配置 MyBatis 的数据源，包括驱动、数据库URL、用户名和密码。 |
| `<mappers>`（映射器）                | 用于配置 MyBatis 的映射器（Mapper），即定义 SQL 语句和映射关系的接口。 |

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
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
    <!--default：设置默认使用的环境的id-->
    <environments default="mysql_test">
        <!-- id：设置环境的唯一标识，可通过environments标签中的default设置某一个环境的id，表示默认使用的环境-->
        <environment id="mysql_test">
            <!--
            属性：
             type：设置事务管理方式，type="JDBC|MANAGED"
              JDBC：设置当前环境的事务管理都必须手动处理
              MANAGED：设置事务被管理，例如spring中的AOP
            -->
            <transactionManager type="JDBC"/>
            <!--
            属性：
             type：设置数据源的类型，type="POOLED|UNPOOLED|JNDI"
              POOLED：使用数据库连接池，即会将创建的连接进行缓存，下次使用可以从缓存中直接获取，不需要重新创建
              UNPOOLED：不使用数据库连接池，即每次使用连接都需要重新创建
              JNDI：调用上下文中的数据源
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
    <mappers>
        <!-- 文件引入: <mapper resource="UserMapper.xml"/> -->
        <!-- 包名引入: <package name="com.codeam.springmvc.mapper"/> -->
        <!-- 接口引入: <mapper class="com.codeam.springmvc.mapper.PersonMapper"/> -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>
```



### 2.3 映射器（Mapper）文件详解

#### MyBatis获取参数值

`#{}`和`${}`

- `#{}`表示一个占位符号，`${}`表示一个拼接符号，会引用sql注入，所以**不建议使用`${}`**。

- 如果接收简单类型，`#{}`中可以写成value或其它名称。`${}`中只能写成value。
- `#{}`和`${}`接收输入参数，类型可以是简单类型，pojo、hashmap。
- `#{}`和`${}`接收pojo对象值，通过OGNL读取对象中的属性值，通过属性.属性.属性...的方式获取对象属性值。

### 2.4 MyBatis 开发

| 标签          | 作用                                                |
| ------------- | --------------------------------------------------- |
| `<select>`    | 定义一个查询语句，用于执行 SELECT 操作。            |
| `<insert>`    | 定义一个插入语句，用于执行 INSERT 操作。            |
| `<update>`    | 定义一个更新语句，用于执行 UPDATE 操作。            |
| `<delete>`    | 定义一个删除语句，用于执行 DELETE 操作。            |
| `<bind>`      | 将参数绑定到一个变量，可以在 SQL 语句中引用该变量。 |
| `<selectKey>` | 配置在插入语句执行后获取自动生成的主键值。          |



#### DML 语句

```xml
<!--增加: int insertUser();-->
<insert id="insertUser">
	INSERT INTO USER(id, username) VALUES (#{id},#{userName})
</insert>

<!--删除:int deleteUser();-->
 <delete id="deleteUser">
     delete from t_user where id = 6
 </delete>

<!--修改:int updateUser();-->
 <update id="updateUser">
     update t_user set username = #{username} where id = 5
 </update>
```



#### DQL 语句

```xml
<!--查询一个: User getUserById();-->  
<select id="getUserById" resultType="com.atguigu.mybatis.bean.User">  
	select * from t_user where id = 2  
</select>

<!--查询集合: List<User> getUserList();-->
<select id="getUserList" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user
</select>
```

::: tip

查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射关系  
- resultType：自动映射，用于属性名和表中字段名一致的情况  
- resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况  

:::

### 2.5 MyBatis 注解开发

| 注解         | 作用                                                        |
| ------------ | ----------------------------------------------------------- |
| `@Mapper`    | 将接口标记为 MyBatis 的映射器（Mapper），用于与数据库交互。 |
| `@Select`    | 声明一个查询语句，用于执行 SELECT 操作。                    |
| `@Insert`    | 声明一个插入语句，用于执行 INSERT 操作。                    |
| `@Update`    | 声明一个更新语句，用于执行 UPDATE 操作。                    |
| `@Delete`    | 声明一个删除语句，用于执行 DELETE 操作。                    |
| `@Param`     | 指定方法参数的名称，用于在 SQL 语句中引用参数。             |
| `@Options`   | 配置一些特殊的查询选项，如返回自动生成的主键值。            |
| `@Flush`     | 配置在方法执行后刷新缓存。                                  |
| `@SelectKey` | 配置在插入语句执行后获取自动生成的主键值。                  |



#### DML 语句

```java
@insert(insert into t_user values(null,'admin','123456',23,'男','12345@qq.com'))
int insertUser();

@delete(delete from t_user where id = 6)
int deleteUser()
    
@update(update t_user set username = '张三' where id = 5)
int updateUser()
    
    
```



#### DQL 语句

```java
@select(select * from t_user where id = 2)
User getUserById(); 
@select(select * from t_user)
List<User> getUserList();
```



## 三、查询



## 四、动态SQL

**标签方式**

| 标签          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| `<sql>`       | 定义可重用的 SQL 片段，可以在其他语句中引用。                |
| `<include>`   | 引用 `<sql>` 标签中定义的 SQL 片段。                         |
| `<if>`        | 根据条件判断是否执行 SQL 片段。                              |
| `<trim>`      | 根据条件对 SQL 语句进行修剪，去除不必要的部分。              |
| `<where>`     | 定义 WHERE 子句，用于在查询语句中添加条件。如果where后面的字符串是以AND或者OR开头的，就将它们剔除。 |
| `<set>`       | 定义 SET 子句，用于在更新语句中设置要更新的列和值。如果该标签包含的元素中有返回值，就插入一个set，如果set后面的字符串是以,结尾的，就将这个逗号剔除。 |
| `<foreach>`   | 遍历集合或数组，并将元素应用于 SQL 语句中的参数。            |
| `<choose>`    | 类似于 Java 中的 switch 语句，根据条件选择不同的 SQL 片段。  |
| `<when>`      | `<choose>` 标签中的条件分支，用于定义条件和对应的 SQL 片段。 |
| `<otherwise>` | `<choose>` 标签中的默认分支，当所有条件不满足时执行的 SQL 片段。 |



**注解方式**

| 注解              | 作用                                          |
| ----------------- | --------------------------------------------- |
| `@SelectProvider` | 使用提供的类或方法生成动态 SQL 查询语句。     |
| `@InsertProvider` | 使用提供的类或方法生成动态 SQL 插入语句。     |
| `@UpdateProvider` | 使用提供的类或方法生成动态 SQL 更新语句。     |
| `@DeleteProvider` | 使用提供的类或方法生成动态 SQL 删除语句。     |
| `@Lang`           | 指定语言驱动，用于支持自定义的动态 SQL 语言。 |

### 4.1 if 标签

- if标签的test属性必填，该属性值是一个符合OGNL要求的判断表达式，一般只用true或false作为结果。
- 判断条件property != null 或 property == null，适用于任何类型的字段，用于判断属性值是否为空。
- 判断条件property != '' 或 property == ''，仅适用于String类型的字段，用于判断是否为空字符串。
- 当有多个判断条件时，使用and或or进行连接，嵌套的判断可以使用小括号分组。

```xml
<!-- 用户信息综合查询
    #{userCustom.sex}:取出pojo包装对象中性别值
    ${userCustom.username}：取出pojo包装对象中用户名称
 -->
<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <if test="userCustom.sex!=null and userCustom.sex != '' ">
            AND user.sex=#{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username != '' ">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </where>
</select>
```



### 4.2 choose、when、otherwise 标签

```xml
<select id="selectByIdOrUserName" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT  id,name,password,email,FROM user WHERE 1 = 1
    <choose>
        <when test="id != null">
            AND id = #{id}
        </when>
        <when test="userName != null and userName != ''">
            AND user_name = #{userName}
        </when>
        <otherwise>
            AND 1 = 2
        </otherwise>
    </choose>
</select>
```



### 4.3 trim、where、set 标签

trim 是一个比较通用的标签用于去除sql语句中多余的and关键字，逗号，或者给sql语句前拼接 “where“、“set“以及“values(“ 等前缀，或者添加“)“等后缀。

属性

- `prefix`：给sql语句拼接的前缀。
- `suffix`：给sql语句拼接的后缀
- `prefixOverrides`：去除sql语句前面的关键字或者字符。
- `suffixOverrides`：去除sql语句后面的关键字或者字符。

```xml
<select id="selectByUserWhere" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT id,
    user_name,
    user_password,
    user_email,
    create_time
    FROM sys_user
    <where>
        <if test="userName != null and userName != ''">
            AND user_name LIKE CONCAT('%',#{userName},'%')
        </if>
        <if test="userEmail != null and userEmail != ''">
            AND user_email = #{userEmail}
        </if>
    </where>
</select>

<update id="updateByIdSelectiveSet">
    UPDATE sys_user
    <set>
        <if test="userName != null and userName != ''">
            user_name = #{userName},
        </if>
        <if test="userPassword != null and userPassword != ''">
            user_password = #{userPassword},
        </if>
        <if test="userEmail != null and userEmail != ''">
            user_email = #{userEmail},
        </if>
        <if test="userInfo != null and userInfo != ''">
            user_info = #{userInfo},
        </if>
        <if test="headImg != null">
            head_img = #{headImg,jdbcType=BLOB},
        </if>
        <if test="createTime != null">
            create_time = #{createTime,jdbcType=TIMESTAMP},
        </if>
        id = #{id},
    </set>
    WHERE id = #{id}
</update>

<trim prefix="WHERE" prefixOverrides="AND">
	<if test="state != null">
	  state = #{state}
	</if> 
	<if test="title != null">
	  AND title like #{title}
	</if>
	<if test="author != null and author.name != null">
	  AND author_name like #{author.name}
	</if>
</trim>
```



### 4.4 foreach 标签

向sql传递数组或List，mybatis使用foreach解析

在用户查询列表和查询总数的statement中增加多个id输入查询。两种方法，sql语句如下：

- `SELECT * FROM USER WHERE id=1 OR id=10 OR id=16`
- `SELECT * FROM USER WHERE id IN(1,10,16)`

一个使用OR,一个使用IN


- 在输入参数类型中添加`List<Integer> ids`传入多个id

foreach包含属性讲解：

- open：整个循环内容开头的字符串。
- close：整个循环内容结尾的字符串。
- separator：每次循环的分隔符。
- item：从迭代对象中取出的每一个值。
- index：如果参数为集合或者数组，该值为当前索引值，如果参数为Map类型时，该值为Map的key。
- collection：要迭代循环的属性名。

```xml
<if test="ids!=null">
    <!-- 使用实现下边的sql拼接：
     AND (id=1 OR id=10 OR id=16)
     -->
    <foreach collection="ids" item="user_id" open="AND (" close=")" separator="or">
        <!-- 每个遍历需要拼接的串 -->
        id=#{user_id}
    </foreach>

    <!-- 实现  “ and id IN(1,10,16)”拼接 -->
    <!-- <foreach collection="ids" item="user_id" open="and id IN(" close=")" separator=",">
        每个遍历需要拼接的串
        #{user_id}
    </foreach> -->
</if>
```



### 4.5 sql 标签

```xml
<!-- 定义sql片段
id：sql片段的唯 一标识

经验：是基于单表来定义sql片段，这样话这个sql片段可重用性才高
在sql片段中不要包括 where
 -->
<sql id="query_user_where">
    <if test="userCustom!=null">
        <if test="userCustom.sex!=null and userCustom.sex!=''">
            AND user.sex = #{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username!=''">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </if>
</sql>

<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <!-- 引用sql片段 的id，如果refid指定的id不在本mapper文件中，需要前边加namespace -->
        <include refid="query_user_where"></include>
        <!-- 在这里还要引用其它的sql片段  -->
    </where>
</select>
```



## 五、缓存

### 5.1 缓存种类

MyBatis提供了**一级缓存**和**二级缓存**

1. **默认**情况下，只有一级缓存（**SqlSession级别**的缓存，也称为本地缓存）开启。
2. 二级缓存（全局缓存）需要手动开启和配置，他是基于**mapper级别**的缓存。
3. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

#### 一级缓存

Mybatis中的一级缓存默认开启，是sqlsession级别的

1. 一级缓存(local cache), 即本地缓存, 作用域默认为sqlSession。
2. 一级缓存的工作机制



#### 二级缓存

在同一个**namespace下的mapper**文件中，执行相同的查询SQL，第一次会去查询数据库，并写到缓存中；第二次直接从缓存中取。当执行SQL时两次查询中间发生了增删改操作，则二级缓存清空。
使用二级缓存时，由于二级缓存的数据不一定都是存储到内存中，它的存储介质多种多样，所以需要给缓存的对象执行序列化（让pojo对象实现**Serializable接口**）。



#### 第三方缓存 EhCache

1. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来**自定义二级缓存**
2. EhCache 是一个纯Java的进程内缓存框架，具有快速、精干等特点，是Hibernate中默认的CacheProvider
3. 在mapper.xml里面配置cache标签



### 5.2 MyBatis一级缓存

一级缓存是SqlSession级别的缓存。不同的sqlSession之间的缓存数据区域（HashMap）是互相不影响的。

一级缓存的作用域是同一个SqlSession，在同一个sqlSession中两次执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据，从而提高查询效率。当一个sqlSession结束后该sqlSession中的一级缓存也就不存在了。Mybatis默认开启一级缓存。

一级缓存只是相对于同一个SqlSession而言。所以在参数和SQL完全一样的情况下，我们使用同一个SqlSession对象调用一个Mapper方法，往往只执行一次SQL。



默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存（一级缓存无法关闭，只能调整）

> 注意：一个会话DML操作只会重置当前会话的缓存，不会重置其他会话的缓存，也就是说，其他会话缓存是不会更新的！



#### 一级缓存的生命周期

- 当会话结束时，SqlSession对象及其内部的Executor对象还有PerpetualCache对象也一并释放掉。
- SqlSession调用了close()方法，会释放掉一级缓存PerpetualCache对象，一级缓存将不可用。
- SqlSession调用了clearCache()，会清空PerpetualCache对象中的数据，但是该对象仍可使用。
- SqlSession中执行了任何一个DML操作(update()、delete()、insert()) ，都会清空PerpetualCache对象的数据，但是该对象可以继续使用



**相同查询的条件**

1. 传入的statementId
2. 查询时要求的结果集中的结果范围
3. 本次查询所产生的最终要传递给JDBC的Sql语句字符串（boundSql.getSql() ）
4. 传递给java.sql.Statement要设置的参数值



**一级缓存失效的情况**
不同的sqlsession对应不同的一级缓存
同一个sqlsession但是查询的条件不同
同一个sqlsession两次查询期间执行了任意一次增删改操作
同一个sqlsession两次查询期间手动清空了缓存



**缓存一致性问题**



### 5.3 MyBatis二级缓存

MyBatis的二级缓存是Application级别的缓存，它可以提高对数据库查询的效率，以提高应用的性能。

二级缓存是mapper级别的缓存，多个SqlSession去操作同一个Mapper的sql语句，数据库得到数据会存在二级缓存区域，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。

二级缓存是多个SqlSession共享的，其作用域是mapper的同一个namespace，不同的sqlSession两次执行相同namespace下的sql语句且向sql中传递参数也相同即最终执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。Mybatis默认没有开启二级缓存需要在setting全局参数中配置开启二级缓存。

sqlSessionFactory层面上的二级缓存默认是不开启的，二级缓存的开启需要进行配置，实现二级缓存的时候，MyBatis要求返回的POJO必须是可序列化的。 也就是要求实现Serializable接口，配置方法很简单，只需要在映射XML文件使用 `<cache/>`标签。

> 读取顺序：二级缓存 => 一级缓存 => 数据库

#### 二级缓存的作用

- 映射语句文件中的所有select语句将会被缓存。
- 映射语句文件中的所有insert、update和delete语句会刷新缓存。
- 缓存会使用默认的Least Recently Used（LRU，最近最少使用的）算法来收回。
- 根据时间表，比如No Flush Interval,（CNFI没有刷新间隔），缓存不会以任何时间顺序来刷新。
- 缓存会存储列表集合或对象(无论查询方法返回什么)的1024个引用
- 缓存会被视为是read/write(可读/可写)的缓存，意味着对象检索不是共享的，而且可以安全的被调用者修改，不干扰其他调用者或线程所做的潜在修改。如果缓存中有数据就不用从数据库中获取，大大提高系统性能。





- evition：代表缓存回收策略

1. LRU，最近最少使用的，移除最长时间不用的对象。
2. FIFO，先进先出，按对象进入缓存的顺序来移除他们。
3. SOFT，软引用，移除基于垃圾回收器转台和软引用规则的对象。
4. WEAK——弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。

- size：引用数目，一个正整数，代表缓存最多可以存储多少个对象，不宜过大，容易导致内存溢出。

- readOnly：只读，意味着缓存数据只能读取而不能修改。



- eviction=“[FIFO](https://so.csdn.net/so/search?q=FIFO&spm=1001.2101.3001.7020)”：缓存回收策略：
  [LRU](https://so.csdn.net/so/search?q=LRU&spm=1001.2101.3001.7020) – 最近最少使用的：移除最长时间不被使用的对象。
  FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
  SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
  WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。
  **默认的是 LRU**。

- flushInterval：刷新间隔，单位毫秒
  默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新

- size：引用数目，正整数
  代表缓存最多可以存储多少个对象，太大容易导致内存溢出

- readOnly：只读，true/false
  true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。
  false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，因此默认是 false。



二级缓存默认是关闭状态，要开启二级缓存，我们需要在映射器XML文件中添加：

```xml
<cache
  eviction="FIFO"
  flushInterval="60000"
  size="512"
  readOnly="true"/>
```

缓存的相关属性设置

1. 全局setting的cacheEnable：
   配置二级缓存的开关，一级缓存一直是打开的。
2. select标签的useCache属性：
   配置这个select是否使用二级缓存。一级缓存一直是使用的（在全局开启二级缓存的情况下某个select标签关闭二级缓存）
3. sql标签的flushCache属性：
   增删改默认flushCache=true。sql执行以后，会同时清空一级和二级缓存。
   查询默认 flushCache=false。
4. sqlSession.clearCache()：只是用来清除一级缓存。

```xml
<!--添加useCache属性来关闭缓存 -->
<select id="getStudentBySid" resultType="Student" useCache="false">
    select * from student where sid = #{sid}
</select>

<!--使用flushCache="false"在每次执行后都清空缓存 -->
<select id="getStudentBySid" resultType="Student" flushCache="true">
    select * from student where sid = #{sid}
</select>
```



## 六、高级特性

### 6.1 高级映射



| 标签                       | 注解                 | 作用                                                   |
| -------------------------- | -------------------- | ------------------------------------------------------ |
| `<resultMap>`              | `@Results`           | 定义结果映射，将查询结果映射到 Java 对象的属性。       |
| `<result>`                 | `@Result`            | 定义单个属性的结果映射，用于 `<resultMap>` 中。        |
| `<association>`            | `@One`               | 定义一对一关联关系的结果映射。                         |
| `<collection>`             | `@Many`              | 定义一对多关联关系的结果映射。                         |
| `<constructor>`            | `@ConstructorArgs`   | 定义构造函数参数的结果映射，用于创建对象实例。         |
| `<discriminator>`          | `@TypeDiscriminator` | 定义类型鉴别器，用于根据不同的类型执行不同的映射规则。 |
| `<resultMap>`的extends属性 | `@ResultMap`         | 引用已定义的结果映射，用于复用结果映射配置。           |



#### 自定义映射

在查询标签中可以自动映射，也可以自定义映射，`ResultMap`标签可以自定义映射。

ResultMap的属性

- id当前命名空间中的一个唯一标识，用于标识一个结果映射。
- type类的完全限定名, 或者一个类型别名
- autoMapping 会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认关闭
- extends继承其他resultMap的属性



**构造映射**

`<constructor>`：用于在实例化类时，注入结果到构造方法中

- `<idArg>`：用来映射参数时数据表ID字段
- `<arg>`：用来映射普通参数





#### 嵌套查询和嵌套结果

**嵌套查询**：指通过执行另外一条SQL映射语句来返回预期的复杂类型。

- 嵌套查询是在查询SQL中嵌入一个子查询SQL
- 套查询会执行多条SQL语句                  
- 嵌套查询SOL语句编写较为简单

**嵌套结果**：使用嵌套结果映射来处理重复的联合结果的子集。

- 嵌套结果是一个嵌套的多表查询SQL
- 嵌套结果只会执行一条复杂的SQL语句
- 嵌套结果SOL语句编写比较复杂



#### 一对一映射

使用`association`标签实现一对一映射（对应注解`@One`）

属性

- `property`：映射到列结果的字段或属性。
- `column`：数据库中的列名，或者是列的别名。
- `columnPrefix`：数据库中的列名的前缀。
- `select`：嵌套查询中指定子查询的方法。
- `javaType`：一个 Java 类的完全限定名，或一个类型别名。
- `resultMap`：指定相关联的`resultMap`

**嵌套查询**

```xml
<!--嵌套查询 查询效率低 要多查一轮-->
<select id="getStudent" resultMap="studentvo">
    select * from student
</select>
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO" autoMapping="true">
    <association property="c" column="c_id" select="getClass" ></association>
</resultMap>
<select id="getClass" resultType="com.example.test.MySelect.entity.Class">
    select * from class where id=#{id}
</select>
```

**嵌套结果**

```xml
<!--嵌套结果-->
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <result property="age" column="age"></result>
    <!--方式1:缺点是要写每个字段一一对应-->
    <association property="c" >
        <id property="id" column="c_id"></id>
        <result property="name" column="cname"></result>
    </association>
    <!--方式2:自动映射 *在没有相同字段*时可以使用！！-->
    <!--  <association property="c" autoMapping="true"></association>-->
</resultMap>
```



#### 一对多映射

使用`collection`标签实现一对一映射（对应注解`@Many`）

属性与`association`标签相同

- `ofType`：指定的这个一对多的集合的所存放的实体类的类型



**嵌套查询**

```xml
<!--嵌套查询 查询效率低 要多查一轮-->
<select id="getStudent" resultMap="studentvo">
    select * from student
</select>
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO" autoMapping="true">
    <collection property="c" column="c_id" select="getClass" ></collection>
</resultMap>
<select id="getClass" resultType="com.example.test.MySelect.entity.Class">
    select * from class where id=#{id}
</select>
```

**嵌套结果**

```xml
<!--嵌套结果-->
<resultMap id="studentvo" type="com.example.test.MySelect.vo.StudentVO">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <result property="age" column="age"></result>
    <!--方式1:缺点是要写每个字段一一对应-->
    <collection property="c" >
        <id property="id" column="c_id"></id>
        <result property="name" column="cname"></result>
    </collection>
    <!--方式2:自动映射 *在没有相同字段*时可以使用！！-->
    <!--  <association property="c" autoMapping="true"></association>-->
</resultMap>
```



#### 鉴别器映射

`discriminator`标签可以有1个或多个case标签

case标签属性

- `value`：该值为`discriminator`标签`column`属性用来匹配的值。
- `resultMap`：当`column`的值和`value`的值匹配时，可以指定使用resultMap指定的映射。

```xml
<resultMap id="rolePrivilegeListMapChoose"
           type="com.zwwhnly.mybatisaction.model.SysRoleExtend">
    <discriminator column="enabled" javaType="int">
        <case value="1" resultMap="rolePrivilegeListMapSelect"/>
        <case value="0" resultMap="roleMapExtend"/>
    </discriminator>
</resultMap>
```



#### 延迟加载

>延迟加载的意义在于，一开始并不取出级联数据，只有当使用它了才发送SQL去取回数据。

配置延迟加载

```xml
1. 设置延迟加载
<setting name="lazyLoadingEnabled" value="true"/>
2.默认采用按层级延迟加载，当value为false时，采用按需加载
<setting name="aggressiveLazyLoading" value="true"/>


<!--
指定具体属性的加载方式
在association和collection中通过设置fetchType，先设置aggressiveLazyLoading为false
 fetchType="lazy"时，采用延迟加载。
 fetchType="eager"时，采用即时加载。
-->
```



### 6.2 分页

为了解决这个问题，MyBatis 为我们提供了一个通用的分页工具：PageHelper。

使用步骤：

1.引入依赖

```xml
<!-- 分页插件 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.4</version>
</dependency>
```

2.修改主配置文件

在 environments 标签之前添加：

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor" />
</plugins>
```

 4.测试代码

```java
@Test
  public void testGetAll(){
      // 1.获取 SqlSession 对象
      SqlSession session = MyBatisUtil.getSqlSession();
      // 2.使用 SqlSession 创建 Dao 接口的代理对象
      UserDao userDao = session.getMapper(UserDao.class);
      // 3.执行接口的方法
      Page page = PageHelper.startPage(2, 3);
      List<User> userList = userDao.getUser();
      System.out.println("当前页："+page.getPageNum());
      System.out.println("每页条数："+page.getPageSize());
      System.out.println("总条数："+page.getTotal());
      System.out.println("总页数："+page.getPages());
      System.out.println("-------------------------");
      userList.forEach(user ->{
          System.out.println("姓名："+user.getName()+",性别："+user.getSex()+",年龄："+user.getAge());
      });
      // 4.关闭 SqlSession
      MyBatisUtil.close();
  }
```

### 6.3 存储过程调用



### 6.4 自定义类型处理器



### 6.5 逆向工程

添加Maven依赖

这里其实可以添加Maven依赖的，因为跟着视频做的，所以我就建了个普通工程，直接添加了个lib文件夹，把要用的jar包直接copy进来了。

#### 使用方法

#### 运行逆向工程

还可以通过eclipse的插件生成代码

建议使用java程序方式，不依赖开发工具。

#### 生成代码配置文件


```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
	<context id="testTables" targetRuntime="MyBatis3">
		<commentGenerator>
			<!-- 是否去除自动生成的注释 true：是 ： false:否 -->
			<property name="suppressAllComments" value="true" />
		</commentGenerator>
		<!--数据库连接的信息：驱动类、连接地址、用户名、密码 -->
		<jdbcConnection driverClass="com.mysql.jdbc.Driver"
			connectionURL="jdbc:mysql://120.25.162.238:3306/mybatis001?characterEncoding=utf-8" 
			userId="root"
			password="123">
		</jdbcConnection>
		<!-- <jdbcConnection driverClass="oracle.jdbc.OracleDriver"
			connectionURL="jdbc:oracle:thin:@127.0.0.1:1521:yycg" 
			userId="yycg"
			password="yycg">
		</jdbcConnection> -->

		<!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL 和 
			NUMERIC 类型解析为java.math.BigDecimal -->
		<javaTypeResolver>
			<property name="forceBigDecimals" value="false" />
		</javaTypeResolver>

		<!-- targetProject:生成PO类的位置 -->
		<javaModelGenerator targetPackage="com.iot.ssm.po"
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
			<!-- 从数据库返回的值被清理前后的空格 -->
			<property name="trimStrings" value="true" />
		</javaModelGenerator>
        <!-- targetProject:mapper映射文件生成的位置 -->
		<sqlMapGenerator targetPackage="com.iot.ssm.mapper" 
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</sqlMapGenerator>
		<!-- targetPackage：mapper接口生成的位置 -->
		<javaClientGenerator type="XMLMAPPER"
			targetPackage="com.iot.ssm.mapper" 
			targetProject=".\src">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</javaClientGenerator>
		<!-- 指定数据库表 -->
		<table tableName="items"></table>
		<table tableName="orders"></table>
		<table tableName="orderdetail"></table>
		<table tableName="user"></table>
		<!-- <table schema="" tableName="sys_user"></table>
		<table schema="" tableName="sys_role"></table>
		<table schema="" tableName="sys_permission"></table>
		<table schema="" tableName="sys_user_role"></table>
		<table schema="" tableName="sys_role_permission"></table> -->
		
		<!-- 有些表的字段需要指定java类型
		 <table schema="" tableName="">
			<columnOverride column="" javaType="" />
		</table> -->
	</context>
</generatorConfiguration>
```

需要注意的位置：

- `javaModelGenerator`,生成PO类的位置
- `sqlMapGenerator`,mapper映射文件生成的位置
- `javaClientGenerator`,mapper接口生成的位置 
- `table`,指定数据库表 

#### 执行生成程序

```java
public void generator() throws Exception{

	List<String> warnings = new ArrayList<String>();
	boolean overwrite = true;
	//指定逆向工程配置文件
	File configFile = new File("generatorConfig.xml"); 
	ConfigurationParser cp = new ConfigurationParser(warnings);
	Configuration config = cp.parseConfiguration(configFile);
	DefaultShellCallback callback = new DefaultShellCallback(overwrite);
	MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config,
			callback, warnings);
	myBatisGenerator.generate(null);

} 
```

生成后的代码：



#### 使用生成的代码

需要将生成工程中所生成的代码拷贝到自己的工程中。

测试ItemsMapper中的方法

```java
package com.iot.ssm.mapper;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import com.iot.ssm.po.Items;
import com.iot.ssm.po.ItemsExample;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class ItemsMapperTest {

	private ApplicationContext applicationContext;
	
	private ItemsMapper itemsMapper;

	//在setUp这个方法得到spring容器
	@Before
	public void setUp() throws Exception {
		applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
		itemsMapper = (ItemsMapper) applicationContext.getBean("itemsMapper");
	}

	//根据主键删除 
	@Test
	public void testDeleteByPrimaryKey() {
		
	}

	//插入
	@Test
	public void testInsert() {
		//构造 items对象
		Items items = new Items();
		items.setName("手机");
		items.setPrice(999f);
		items.setCreatetime(new Date());
		itemsMapper.insert(items);
	}

	//自定义条件查询
	@Test
	public void testSelectByExample() {
		ItemsExample itemsExample = new ItemsExample();
		//通过criteria构造查询条件
		ItemsExample.Criteria criteria = itemsExample.createCriteria();
		criteria.andNameEqualTo("笔记本");
		//可能返回多条记录
		List<Items> list = itemsMapper.selectByExample(itemsExample);
		
		System.out.println(list);
		
	}

	//根据主键查询
	@Test
	public void testSelectByPrimaryKey() {
		Items items = itemsMapper.selectByPrimaryKey(1);
		System.out.println(items);
	}

	//更新数据
	@Test
	public void testUpdateByPrimaryKey() {
		
		//对所有字段进行更新，需要先查询出来再更新
		Items items = itemsMapper.selectByPrimaryKey(1);
		
		items.setName("手机");
		
		itemsMapper.updateByPrimaryKey(items);
		//如果传入字段不空为才更新，在批量更新中使用此方法，不需要先查询再更新
		//itemsMapper.updateByPrimaryKeySelective(record);
		
	}

}
```

````