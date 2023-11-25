# 二、入门指南

## 2.1 入门程序

### 创建maven工程



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



### 创建MyBatis的核心配置文件

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

### 创建实体类

```java
@Data
public class User {
    private Integer id;
    private String name;
    private String password;
    private String email;
    private String phone;
```



### 创建Mapper接口

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

### 创建MyBatis的映射文件

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

### 通过junit测试功能

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



## 2.2 核心配置文件详解

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



## 2.3 映射器（Mapper）文件详解

### MyBatis获取参数值

`#{}`和`${}`

- `#{}`表示一个占位符号，`${}`表示一个拼接符号，会引用sql注入，所以**不建议使用`${}`**。

- 如果接收简单类型，`#{}`中可以写成value或其它名称。`${}`中只能写成value。
- `#{}`和`${}`接收输入参数，类型可以是简单类型，pojo、hashmap。
- `#{}`和`${}`接收pojo对象值，通过OGNL读取对象中的属性值，通过属性.属性.属性...的方式获取对象属性值。

## 2.4 MyBatis 开发

| 标签          | 作用                                                |
| ------------- | --------------------------------------------------- |
| `<select>`    | 定义一个查询语句，用于执行 SELECT 操作。            |
| `<insert>`    | 定义一个插入语句，用于执行 INSERT 操作。            |
| `<update>`    | 定义一个更新语句，用于执行 UPDATE 操作。            |
| `<delete>`    | 定义一个删除语句，用于执行 DELETE 操作。            |
| `<bind>`      | 将参数绑定到一个变量，可以在 SQL 语句中引用该变量。 |
| `<selectKey>` | 配置在插入语句执行后获取自动生成的主键值。          |



### DML 语句

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



### DQL 语句

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

## 2.5 MyBatis 注解开发

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



### DML 语句

```java
@insert(insert into t_user values(null,'admin','123456',23,'男','12345@qq.com'))
int insertUser();

@delete(delete from t_user where id = 6)
int deleteUser()
    
@update(update t_user set username = '张三' where id = 5)
int updateUser()
    
    
```



### DQL 语句

```java
@select(select * from t_user where id = 2)
User getUserById(); 
@select(select * from t_user)
List<User> getUserList();
```
