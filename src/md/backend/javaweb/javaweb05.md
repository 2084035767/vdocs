# 五、数据库操作

## 5.1 JDBC 操作数据库

**什么是 JDBC**

JDBC(Java Data Base Connectivity) 是 Java 访问数据库的标准规范.是一种用于执行 SQL 语句的 Java API，可以为 多种关系数据库提供统一访问，它由一组用 Java 语言编写的类和接口组成。是 Java 访问数据库的标准规范.

**JDBC 原理**

DBC 是接口，驱动是接口的实现，没有驱动将无法完成数据库连接，从而不能操作数据库！每个数据库厂商都需 要提供自己的驱动，用来连接自己公司的数据库，也就是说驱动一般都由数据库生成厂商提供。

### JDBC 开发

数据准备

**注册驱动**

- JDBC 规范定义驱动接口：`java.sql.Driver`

- MySql 驱动包提供了实现类：

  JDK1.8：`com.mysql.jdbc.Driver`

  JDKA11：`com.mysql.cj.jdbc.Driver`

| 加载注册驱动的方式              | 说明                                                 |
| ------------------------------- | ---------------------------------------------------- |
| Class.forName(数据库驱动实现类) | 加载和注册数据库驱动,数据库驱动由数据库厂商 MySql 提供 |

> 从 JDBC3 开始，目前已经普遍使用的版本。可以不用注册驱动而直接使用。 Class.forName 这句话可以省

**获得连接**

- Connection 接口，代表一个连接对象 ,具体的实现类由数据库的厂商实现
- 使用 DriverManager 类的静态方法,getConnection 可以获取数据库的连接

| 获取连接的静态方法                                           | 说明                                            |
| ------------------------------------------------------------ | ----------------------------------------------- |
| Connection getConnection(String url, String user, String password) | 通过连接字符串和用户名,密码来获取数据库连接对象 |

**说明：**

- `user`：登录用户名
- `password`：登录密码
- `url`：mySql URL 的格式 `jdbc:mysql://localhost:3306/数据库名称`

 **对 URL 的详细说明**

```java
jdbc:mysql://localhost:3306/db4?characterEncoding=UTF-8
```

- JDBC 规定 url 的格式由三部分组成，每个部分中间使用冒号分隔。 
  - 第一部分是协议 jdbc，这是固定的；
  - 第二部分是子协议，就是数据库名称，连接 mysql 数据库，第二部分当然是 mysql 了；
  - 第三部分是由数据库厂商规定的，我们需要了解每个数据库厂商的要求，mysql 的第三部分分别由数据 库服务器的 IP 地址（localhost）、端口号（3306），以及要使用的 数据库名称 组成。

**获取语句执行平台**

- 通过 Connection 的 createStatement 方法 获取 sql 语句执行对象

| Connection 接口中的方法      | 说明                 |
| --------------------------- | -------------------- |
| Statement createStatement() | 创建 SQL 语句执行对象 |

- Statement ： 代表一条语句对象，用于发送 SQL 语句给服务器，用于执行静态 SQL 语句并返回它所生成结 果的对象。

| Statement 类 常用方法                | 说明                                                       |
| ----------------------------------- | ---------------------------------------------------------- |
| int executeUpdate(String sql);      | 执行 insert update delete 语句.返回 int 类型,代表受影响的行 数 |
| ResultSet executeQuery(String sql); | 执行 select 语句, 返回 ResultSet 结果集对象                    |

**处理结果集**

注意：只有在进行查询操作的时候, 才会处理结果集

```java
//执行查询操作,返回的是一个 ResultSet 结果对象
String sql = "select * from user"
ResultSet resultSet = statement.executeQuery(sql);
```

**ResultSet 接口**

作用：封装数据库查询的结果集，对结果集进行遍历，取出每一条记录。

| ResultSet 接口方法          | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| boolean next()             | 1. 游标向下一行<br/>2. 返回 boolean 类型，如果还有下一条记录，返回 true，否则返回 false |
| xxx getXxx( String or int) | 1. 通过列名，参数是 String 类型。返回不同的类型<br/>2. 通过列号，参数是整数，从 1 开始。返回不同的类型 |

**5.释放资源**

1. 需要释放的对象：ResultSet 结果集，Statement 语句，Connection 连接
2. 释放原则：先开的后关，后开的先关。ResultSet ==> Statement ==> Connection
3. 放在哪个代码块中：finally 块
   - 与 IO 流一样，使用后的东西都需要关闭！关闭的顺序是先开后关, 先得到的后关闭，后得到的先关闭

### JDBC 实现增删改查

 **JDBC 工具类**

- 如果一个功能经常要用到，我们建议把这个功能做成一个工具类，可以在不同的地方重用。
- “获得数据库连接”操作，将在以后的增删改查所有功能中都存在，可以封装工具类 JDBCUtils。提供获取 连接对象的方法，从而达到代码的重复利用。
- 工具类包含的内容
  1. 可以把几个字符串定义成常量：用户名，密码，URL，驱动类
  2. 得到数据库的连接：`getConnection()`
  3. 关闭所有打开的资源：`close(resultSet,statement, connection)`

工具类代码：

```java
import java.sql.*;
/**
* JDBC 工具类
*/
public class JDBCUtils {
    
    //1. 定义字符串常量, 记录获取连接所需要的信息
    public static final String DRIVERNAME = "com.mysql.cj.jdbc.Driver";
    public static final String URL = "jdbc:mysql://localhost:3306/db?characterEncoding=UTF-8&serverTimezone=UTC";
    public static final String USERNAME = "root";
    public static final String PASSWORD = "123456";
    
	//2. 静态代码块, 随着类的加载而加载
    static {
        try {
            //注册驱动
            Class.forName(DRIVERNAME);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
	//3.获取连接的静态方法
    public static Connection getConnection() {
        Connection connection = null;
        try {
            //获取连接对象
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return connection;
    }

   //关闭资源的方法
    public static void close(Connection connection, Statement statement, ResultSet resultSet) {
        if (connection != null && statement != null && resultSet != null) {
            try {

                resultSet.close();
                statement.close();
                connection.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}

```



解决插入中文乱码问题.

```java
//characterEncoding=UTF-8 指定字符的编码、解码格式
jdbc:mysql://localhost:3306/db?characterEncoding=UTF-8
```

 预处理对象

PreparedStatement 接口介绍

- PreparedStatement 是 Statement 接口的子接口，继承于父接口中所有的方法。它是一个预编译的 SQL 语
  句对象.
- 预编译:  是指 SQL 语句被预编译,并存储在 PreparedStatement 对象中。然后可以使用此对象多次高效地执行该语句。

- PreparedStatement 特点
  - 因为有预先编译的功能，提高 SQL 的执行效率。
  - 可以有效的防止 SQL 注入的问题，安全性更高

5.3 获取 PreparedStatement 对象
通过 Connection 创建 PreparedStatement 对象

| Connection 接口中的方法                           | 说明                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `PreparedStatement prepareStatement(String sql)` | 指定预编译的 SQL 语句， SQL 语句中使用占位符 ? 创建一个语句对象 |

PreparedStatement 接口常用方法

| 常用方法                    | 说明                                   |
| --------------------------- | -------------------------------------- |
| `int executeUpdate();`      | 执行 insert update delete 语句           |
| `ResultSet executeQuery();` | 执行 select 语句. 返回结果集对象 Resulet |

使用 PreparedStatement 的步骤

1. 编写 SQL 语句，未知内容使用?占位：

   ```sql
   SELECT * FROM jdbc_user WHERE username=? AND password=?
   ```

2. 获得 PreparedStatement 对象

3. 设置实际参数：setXxx( 占位符的位置, 真实的值)

4. 执行参数化 SQL 语句

5. 关闭资源



| setXxx 重载方法                               | 说明                                |
| -------------------------------------------- | ----------------------------------- |
| void setDouble(int parameterIndex, double x) | 将指定参数设置为给定 Java double 值 |
| void setInt(int parameterIndex, int x)       | 将指定参数设置为给定 Java int 值    |
| void setString(int parameterIndex, String x) | 将指定参数设置为给定 Java String 值 |
| void setObject(int parameterIndex, Object x) | 使用给定对象设置指定参数的值        |

8 Statement 与 PreparedStatement 的区别? 

1. Statement 用于执行静态 SQL 语句，在执行时，必须指定一个事先准备好的 SQL 语句。
2. PrepareStatement 是预编译的 SQL 语句对象，语句中可以包含动态参数“?”，在执行时可以为“?”动态设置参数 值。
3. PrepareStatement 可以减少编译次数提高数据库性能。

### 事务

我们使用 Connection 中的方法实现事务管理

| 方法                                   | 说明                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| void setAutoCommit(boolean autoCommit) | 参数是 true 或 false 如果设置为 false，表示关闭自动提交，相 当于开启事务 |
| void commit()                          | 提交事务                                                     |
| void rollback()                        | 回滚事务                                                     |

## 5.2 ORM 框架使用

- [MyBatis-Plus](/md/backend/java/mybatis-plus)

## 六、JavaWeb 安全

## 6.1 身份认证和授权

## 6.2 HTTPS 和 SSL

## 6.3 XSS 和 CSRF 防护

## 七、RESTful API 设计
