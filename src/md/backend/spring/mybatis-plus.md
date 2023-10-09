## 一、MyBatis-plus简介

### 1.1 什么是MyBatis-plus

Mybatis属于一个半自动的ORM框架。之所以说Mybatis是一个半自动的ORM框架，原因是它还需要我们自己在注解或是映射文件中编写SQL语句，并没有实现完全的自动化。SQL语句的编写，虽然增加了项目和业务需求实现的灵活性，但对一些基本表的操作而言，无疑增加了数据库操作的复杂度，显得没有那么方便。

而Mybatis-Plus则是全自动的ORM框架，按照开闭原则，在不影响Mybatis现有功能的情况下，实现了对Mybatis的功能增强。如果你之前有过Mybatis的使用经验，现在学习Mybatis-Plus简直就是手到擒来。



### 1.2 MyBatis-plus的优点

**MP具有如下基本特点：**

**特性**

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

> 1. 通过在实体类中与数据库表进行映射；
> 2. 无需编写SQL语句，简化了CRUD操作；
> 3. 通常适用于单表。

### 1.3 Mybatis和Mybatis-Plus区别

**MyBatis:**

1. 所有SQL语句全部自己写
2. 手动解析实体关系映射转换为MyBatis内部对象注入容器
3. 不支持Lambda形式调用
4. 驼峰（属性）和下划线（字段）的映射关系 `mybatis`中默认是关闭的。

**Mybatis Plus:**

1. 强大的条件构造器,满足各类使用需求
2. 内置的Mapper,通用的Service,少量配置即可实现单表大部分CRUD操作
3. 支持Lambda形式调用
4. 提供了基本的CRUD功能,连SQL语句都不需要编写
5. 自动解析实体关系映射转换为MyBatis内部对象注入容器
6. 驼峰（属性）和下划线（字段）的映射关系`Mybatis-Plus`中 默认是开启的 ，不需要额外配置。




## 二、MyBatis-plus入门指南

### 2.1 安装MyBatis-plus



### 2.2 配置MyBatis-plus



### 2.3 创建Mapper接口和Entity实体类



### 2.4 使用Service接口操作数据库



## 三、基础功能

### 2.1 条件构造器

#### 条件构造器Wrapper

Mybatis Plus为我们提供了如下的一些条件构造器，我们可以利用它们实现查询条件、删除条件、更新条件的构造。

条件构造器用于给如下的Mapper方法传参，通常情况下

- updateWrapper用于给update方法传条件参数
- queryWrapper用于给delete和select方法传参

#### like 条件构造

```java
String name = "字母";  //name不为空
String email = "";   //email为空串
QueryWrapper<User> query = new QueryWrapper<>();
query.like(StringUtils.isNotEmpty(name), "name", name)
      //因为email为空串，该条件未生效
     .like(StringUtils.isNotEmpty(email), "email", email);    

List<User> list = userMapper.selectList(query);
list.forEach(System.out::println);
```

QueryWrapper是查询条件构造器，like是一种条件构造函数，还有很多的条件构造函数。

几乎所有的条件构造函数，都提供了condition参数实现动态SQL。也就是参数判断是否返回true，如果返回false，该条件不成立。如`email=“”`，所以`.like(StringUtils.isNotEmpty(email), "email", email);` 的条件不成立。

所以最终的执行SQL，如下(只有name LIKE条件，没有email LIKE 条件)：

```sql
SELECT id,name,age,email,create_time 
FROM user 
WHERE name LIKE %字母%
```

### allEq条件构造器

- all表示所有，Eq是equal的缩写表示相等关系

```java
//构造条件
QueryWrapper<User> query = new QueryWrapper<>();
Map<String, Object> params = new HashMap<>();
params.put("name", "字母哥");
params.put("age", 18);
params.put("email", null);

// query.allEq(params,false);
query.allEq((k, v) -> !k.equals("name"), params, false);
List<User> list = userMapper.selectList(query);
list.forEach(System.out::println);
```

- 第一个参数是过滤器（可选参数），lambda表达式表示(k, v) -> !k.equals("name")，参数的Key不能是name，所以`params.put("name", "字母哥");`这个查询条件被过滤掉
- 第二个参数表示传入所有的params查询参数
- 第三个参数（可选参数），表示如果值为null是否按IS NULL查询，false则忽略null列的查询，所以`params.put("email", null);`这个查询条件被过滤掉

最终执行的SQL如下：

```sql
SELECT id,name,age,email,create_time 
FROM user 
WHERE age = ?
```



#### lambda条件构造器

```java
// LambdaQueryWrapper<User> lambdaQ = new QueryWrapper<User>().lambda();
// LambdaQueryWrapper<User> lambdaQ = new LambdaQueryWrapper<>();
LambdaQueryWrapper<User> lambdaQ = Wrappers.lambdaQuery();
lambdaQ.like(User::getName, "字母")
       .lt(User::getAge, 18);
List<User> list = userMapper.selectList(lambdaQ);
```

lambda条件构造器，最终执行SQL如下：

```sql
SELECT id,name,age,email,create_time
FROM user 
WHERE name LIKE %字母%
AND age < 18
```



```java
List<User> list = new LambdaQueryChainWrapper<User>(userMapper)
        .likeRight(User::getName, "字母")
        .and(q -> q.lt(User::getAge, 40)
                  .or()
                  .isNotNull(User::getEmail)
        )
        .list();
list.forEach(System.out::println);
```

lambda条件构造器，最终执行SQL如下：

```sql
SELECT id,name,age,email,create_time 
FROM user 
WHERE name LIKE '字母%'
AND ( age < 18 OR email IS NOT NULL )
```



### 2.2 BaseMapper

BaseMapper接口的方法

| 方法名           | 描述                                 |
| ---------------- | ------------------------------------ |
| `insert`         | 插入记录                             |
| `deleteById`     | 通过id删除指定记录                   |
| `deleteByMap`    | 通过Map集合添加删除指定记录          |
| `delete`         | 通过添加构造器删除指定记录           |
| `deleteBatchIds` | 通过List集合批量删除记录             |
| `updateById`     | 根据id修改指定记录                   |
| `update`         | 根据条件构造器                       |
| `selectById`     | 根据id查询指定记录                   |
| `selectBatchIds` | 根据List集合批量查询记录             |
| `selectByMap`    | 根据Map集合查询记录                  |
| `selectOne`      | 根据条件构造器查询一条记录           |
| `selectCount`    | 根据条件构造器查询记录总数           |
| `selectList`     | 根据条件构造器查询全部记录           |
| `selectMaps`     | 根据条件构造器查询全部记录           |
| `selectObjs`     | 根据条件构造器查询全部记录           |
| `selectPage`     | 根据条件构造器查询全部记录（并翻页） |
| `selectMapsPage` | 根据条件构造器查询全部记录（并翻页） |





save(entity)：保存实体对象到数据库，null的属性也会保存，不会使用数据库默认值
[saveBatch](https://so.csdn.net/so/search?q=saveBatch&spm=1001.2101.3001.7020)(entityList)：批量保存实体对象列表到数据库。
saveOrUpdate(entity)：保存或更新实体对象到数据库，根据主键判断是执行保存还是更新操作。
saveOrUpdateBatch(entityList)：批量保存或更新实体对象列表到数据库。
removeById(id)：根据主键删除数据库中的记录。
removeByMap(columnMap)：根据条件删除数据库中的记录。
remove(queryWrapper)：根据条件删除数据库中的记录。
removeByIds(ids)：根据主键列表批量删除数据库中的记录。
updateById(entity)：根据主键更新数据库中的记录。
update(entity, updateWrapper)：根据条件更新数据库中的记录。
getById(id)：根据主键查询数据库中的记录。
getOne(queryWrapper)：根据条件查询数据库中的一条记录。
list(queryWrapper)：根据条件查询数据库中的记录列表。
page(page, queryWrapper)：根据条件进行分页查询，返回分页结果。



Wrapper类各方法

|                         |                                         |
| ----------------------- | --------------------------------------- |
| getEntity()             | 实体对象（子类实现）                    |
| getSqlSelectgetSqlSet() |                                         |
| getSqlComment()         |                                         |
| getSqlFirst()           |                                         |
| getExpression()         | 获取 MergeSegments                      |
| getCustomSqlSegment()   | 获取自定义SQL 简化自定义XML复杂情况     |
| isEmptyOfWhere()        | 查询条件为空(包含entity)                |
| nonEmptyOfWhere()       | 查询条件不为空(包含entity)              |
| isEmptyOfNormal()       | 查询条件为空(不包含entity)<br />        |
| nonEmptyOfNormal()      | 查询条件为空(不包含entity)              |
| nonEmptyOfEntity()      | 深层实体判断属性                        |
| fieldStrategyMatch()    | 根据实体FieldStrategy属性来决定判断逻辑 |
| isEmptyOfEntity()       | 深层实体判断属性                        |
| getTargetSql()          | 获取格式化后的执行sql                   |
| clear()                 | 条件清空                                |

### 2.3 分页插件



### 2.4 自动填充字段

##### 一、填充字段处理

在插入数据的时候自动填充createTime和updateTime为当前插入数据的时间，在数据更新的时候修改updateTime为修改数据的时间。不需要人为的手动赋值。



使用@TableField注解标记实体类中的哪些字段需要填充：

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
```

FieldFill是一个枚举，用于指定在何种情况下会自动填充

有如下几种可选值

- DEFAULT：默认不处理
- INSERT：插入时自动填充字段
- UPDATE：更新时自动填充字段
- INSERT_UPDATE：插入和更新时自动填充字段



#### 二、自定义填充默认数值

编写公共字段填充处理器类，该类继承了MetaObjectHandler类，重写 insertFill和updateFill方法，我们在这两个方法中获取需要填充的字段以及默认填充的值。

> - 填充处理器MyMetaObjectHandler在Spring Boot中需要声明@Component或@Bean注入
> - strictInsertFill和strictUpdateFill方法第二个参数写的是实体类里的属性名，不是对应数据库字段名。

是3.3.0后面的版本

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        this.fillStrategy(metaObject, "createTime", new Date());
        this.fillStrategy(metaObject, "updateTime", new Date());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.fillStrategy(metaObject, "updateTime", new Date());
    }
}
```

### 2.5 动态表名和字段名

大家在使用Mybatis进行开发的时候，经常会遇到一种情况：按照月份month将数据放在不同的表里面，查询数据的时候需要跟不同的月份month去查询不同的表。

但是我们都知道，Mybatis是ORM持久层框架，即：实体关系映射，实体Object与数据库表之间是存在一一对应的映射关系。比如：

```java
@Data
public class Student {
    private Integer id;
    private String stuName;
    private Integer age;
}
```

Student 实体类与student表是一一对应的关系，如果我们希望将学员表按照月份进行分表，比如：student_202206、student_202207、student_202208，即产生了**「一个实体类及其Mapper需要操作多个数据库分月表，这种情况在Mybatis plus下我们该如何操作数据呢？」** 其实方法有很多，我将我实践中总结出的最优方案给大家进行说明。

##### 二、动态表名处理器接口实现

为了处理上述类似的问题，mybatis plus提供了动态表名处理器接口`TableNameHandler`，我们只需要实现这个接口，并将这个接口应用配置生效，即可实现动态表名。

> 需要注意的是：
>
> - 在mybatis plus 3.4版本之前，动态表名处理器接口是`ITableNameHandler`, 需要配合mybatis plus分页插件一起使用才能生效。我们这里只介绍3.4版本之后的实现方式。
> - 在mybatis plus 3.4.3.2 作废该的方式：dynamicTableNameInnerInterceptor.setTableNameHandlerMap(map); 大家如果见到这种方式实现的动态表名，也是过时的实现方法，新版本中该方法已经删除。

经过我一段时间的实践总结，我的实现类如下（基于mybatis plus 3.4.3.2之后的版本）：

```java
import com.baomidou.mybatisplus.extension.plugins.handler.TableNameHandler;

import java.util.Arrays;
import java.util.List;

/**
 * 按月份参数，组成动态表名
 */
public class MonthTableNameHandler implements TableNameHandler {

    //用于记录哪些表可以使用该月份动态表名处理器（即哪些表按月分表）
    private List<String> tableNames;
    //构造函数，构造动态表名处理器的时候，传递tableNames参数
    public MonthTableNameHandler(String ...tableNames) {
        this.tableNames = Arrays.asList(tableNames);
    }

    //每个请求线程维护一个month数据，避免多线程数据冲突。所以使用ThreadLocal
    private static final ThreadLocal<String> MONTH_DATA = new ThreadLocal<>();
    //设置请求线程的month数据
    public static void setData(String month) {
        MONTH_DATA.set(month);
    }
    //删除当前请求线程的month数据
    public static void removeData() {
        MONTH_DATA.remove();
    }

    //动态表名接口实现方法
    @Override
    public String dynamicTableName(String sql, String tableName) {
        if (this.tableNames.contains(tableName)){
            return tableName + "_" + MONTH_DATA.get();  //表名增加月份后缀
        }else{
            return tableName;   //表名原样返回
        }
    }
}
```

大家先对上面的代码有一个基础了解，看了下面的测试过程，再回头看上面的代码中的注释，就比较好理解了。表名处理器写好了之后，我们要让它生效，还需要做如下的配置。配置内容照葫芦画瓢就可以了。需要关注的部分，我都已经给大家添加了注释。

```java
@Configuration
@MapperScan("com.zimug")
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        DynamicTableNameInnerInterceptor dynamicTableNameInnerInterceptor = new DynamicTableNameInnerInterceptor();
        dynamicTableNameInnerInterceptor.setTableNameHandler(
                //可以传多个表名参数，指定哪些表使用MonthTableNameHandler处理表名称
                new MonthTableNameHandler("student","teacher") 
        );
        //以拦截器的方式处理表名称
        interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        //可以传递多个拦截器，即：可以传递多个表名处理器TableNameHandler
        //interceptor.addInnerInterceptor(dynamicTableNameInnerInterceptor);
        return interceptor;
    }
}
```

## 四、 高级功能

### 3.2 自定义SQL片段

#### 自定义接口方法使用Wrapper条件构造器

如果我们想在自定义的方法中，使用Wrapper条件构造器。可以参考下面的方式实现。这种方式虽然简单，但仍然只适用于单表（可以是多表关联查询，但查询条件也是基于单表的）。

- 使用注解方式 + Wrapper ，

  ```
  ${ew.customSqlSegment}
  ```

  是一个查询条件占位符，代表Wapper查询条件。

  ```java
  @Select("select * from `user` ${ew.customSqlSegment}")
  List<User> selectAll(@Param(Constants.WRAPPER) Wrapper wrapper);
  ```

- 使用xml 配置方式 + Wrapper

  ```java
  List<User> selectAll(@Param(Constants.WRAPPER) Wrapper wrapper);
  ```
  
  ```java
  <select id="selectAll" resultType="com.zimug.example.model.User">
  select * from `user` ${ew.customSqlSegment}
  </select>
  ```

#### 通过Wapper传递查询参数

上面两种方式任意选择一种，参数都是Wrapper

```java
@Test
public void testCustomSQL2() {
  LambdaQueryWrapper<User> query = new LambdaQueryWrapper<>();
  query.eq(User::getName, "字母");

  List<User> list = userMapper.selectAll(query);
  list.forEach(System.out::println);
}
```

最终执行的SQL为（和上文原始的XML动态SQL实现效果一致，但是查询条件的构造是针对单表的）

```sql
SELECT id,name,age,email 
FROM user 
WHERE name = ? 
```

### 3.3 SQL注入器

如何实现SQL注入器？

1. 写一个方法类（就是你要定义的方法要有一个对应类，mp封装的每一个方法都要定义一个对应的类），在类中写SQL模板，需继承AbstractMethod类
2. 写一个SQL注入类，将你定义的方法注入MP
3. 写一个用于被继承的Mapper接口（比如MyBaseMapper）,该接口需继承BaseMapper接口
4. 写一个配置类，把我们写的注入类装进Spring容器
5. 写你的业务Mapper层，继承自定义的MyBaseMapper



**为什么需要做注入**

MybatisPlus的方法是有限的，因为都是继承于 `BaseMapper` 父接口，这个父接口中的方法，虽然方法丰富，但有时可能无法满足我们更加多样的需求。

因此，需要使用SQL注入器来自定义全局方法，将其注入到全局中，这样所有的 Mapper 类都能调用到该方法。

以需要创建的方法为 `selectAll()` 为例进行说明。

##### 2 创建注入方法类

注入方法类，需要继承自 `AbstractMethod` 抽象类，并实现该类中的抽象方法 `injectMappedStatement()`。

在该抽象方法中：

- 我们可以自定义需要用到的SQL语句；
- 自定义调用的方法名；
- 构建`SqlSource`，将SQL语句传递到数据库中；
- 构建查询方法，此处用到了查询，所以使用的是 `addSelectMappedStatementForTable()` 方法
  （可以根据我们的需要，构建增、删、改、查各种类型的方法）。

```java
import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlSource;


public class MyMethods extends AbstractMethod{
    @Override
    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> modelClass, TableInfo tableInfo) {
        //定义SQL语句
        String sql = "select * from " + tableInfo.getTableName();
        //方法名
        String methodName = "selectAll";
        //构建SqlSource，将SQL语句传递到数据库中
        SqlSource sqlSource = this.languageDriver.createSqlSource(this.configuration, sql, modelClass);
        //构建查询方法
        return this.addSelectMappedStatementForTable(mapperClass, methodName, sqlSource, tableInfo);
    }
}
```

##### 3 创建SQL注入器

##### 3.1 继承AbstractSqlInjector

创建自定义注入器并继承抽象类 `AbstractSqlInjector`，实现抽象方法 `getMethodList()`，在该方法中，将上一步创建的自定义方法添加到MybatisPlus 中。

所有用到的方法都需要在这里重新添加，未在此添加的方法，都无法使用。

```java
import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.injector.AbstractSqlInjector;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MySQLInject extends AbstractSqlInjector {
    @Override
    public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
        List<AbstractMethod> methods = new ArrayList<>();
        methods.add(new MyMethods());
        return methods;
    }
}
```

##### 3.2 继承DefaultSqlInjector

创建自定义注入器并继承普通类 `DefaultSqlInjector`，重写方法 `getMethodList()`，在该方法中，通过`super.getMethodList()`继承父类中所有方法，并将上一步创建的自定义方法添加到MybatisPlus 中。

这样，我们就能使用新建的方法及父类中的所有方法。

```java
import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.injector.DefaultSqlInjector;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MySQLInject extends DefaultSqlInjector {
    @Override
    public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
        List<AbstractMethod> methods = super.getMethodList(mapperClass, tableInfo);
        methods.add(new MyMethods());
        return methods;
    }
}
```



### 3.4 多租户支持

##### 一、什么是多租户

多租户技术或称多重租赁技术，简称多租户。是一种软件架构技术，是实现如何在多用户环境下（此处的多用户一般是面向企业用户）共用相同的系统或程序组件，并且可确保各用户间数据的隔离性。

简单讲：在一台服务器上运行单个应用实例，它为多个租户（客户）提供服务。从定义中我们可以理解：多租户是一种架构，目的是为了让多用户环境下使用同一套程序，且保证用户间数据隔离。那么重点就很浅显易懂了，多租户的重点就是同一套程序下实现多用户数据的隔离。`SaaS`应用基于此实现。

##### 二、数据隔离有三种方案

1. 独立数据库：简单来说就是一个租户使用一个数据库，这种数据隔离级别最高，安全性最好，但是提高成本。
2. 共享数据库、隔离数据架构：多租户使用同一个数据库，但是每个租户对应一个Schema(数据库user)。
3. 共享数据库、共享数据架构：使用同一个数据库，同一个Schema，但是在表中增加了`租户ID`的字段，这种共享数据程度最高，隔离级别最低。

这里采用方案三，即共享数据库，共享数据架构，因为这种方案服务器成本最低，但是提高了开发成本。

##### 三、Mybatis-plus实现多租户方案

> 为什么选择MyBatisPlus？
> 除了一些系统共用的表以外，其他租户相关的表，我们都需要在sql不厌其烦的加上`AND t.tenant_id = ?`查询条件，稍不注意就会导致数据越界，数据安全问题让人担忧。好在有了MybatisPlus这个神器，可以极为方便的实现多租户SQL解析器。

Mybatis-plus就提供了一种多租户的解决方案，实现方式是基于分页插件(拦截器)进行实现的。

##### 3.1 第一步：

在应用添加维护一张sys_tenant（租户管理表），在需要进行隔离的数据表上新增租户id；

##### 3.2 第二步：

创建表：

```go
CREATE TABLE `orders_1`.`tenant`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `expire_date` datetime(0) COMMENT '协议到期时间',
  `amount` decimal(8, 2) COMMENT '金额',
  `tenant_id` int(0) COMMENT '租户ID',
  PRIMARY KEY (`id`)
);
```

自定义系统的上下文，存储从cookie等方式获取的租户ID，在后续的getTenantId()使用。

```java
package com.erbadagang.mybatis.plus.tenant.config;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @description 系统的上下文帮助类。ConcurrentHashMap设置租户ID，供后续的MP的getTenantId()取出
 * @ClassName: ApiContext
 * @author: 郭秀志 jbcode@126.com
 * @date: 2020/7/12 21:50
 * @Copyright:
 */
@Component
public class ApiContext {
    private static final String KEY_CURRENT_TENANT_ID = "KEY_CURRENT_TENANT_ID";
    private static final Map<String, Object> mContext = new ConcurrentHashMap<>();

    public void setCurrentTenantId(Long providerId) {
        mContext.put(KEY_CURRENT_TENANT_ID, providerId);
    }

    public Long getCurrentTenantId() {
        return (Long) mContext.get(KEY_CURRENT_TENANT_ID);
    }
}
```

核心类——`MyBatisPlusConfig`通过分页插件配置MP多租户。

```java
package com.erbadagang.mybatis.plus.tenant.config;

import com.baomidou.mybatisplus.core.parser.ISqlParser;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantHandler;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantSqlParser;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.LongValue;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

/**
 * @description MyBatisPlus配置类，分页插件，多租户也是使用的分页插件进行的配置。
 * @ClassName: MyBatisPlusConfig
 * @author: 郭秀志 jbcode@126.com
 * @date: 2020/7/12 21:34
 * @Copyright:
 */
@Configuration
@MapperScan("com.erbadagang.mybatis.plus.tenant.mapper")//配置扫描的mapper包
public class MyBatisPlusConfig {

    @Autowired
    private ApiContext apiContext;

    /**
     * 分页插件
     *
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();

        // 创建SQL解析器集合
        List<ISqlParser> sqlParserList = new ArrayList<>();

        // 创建租户SQL解析器
        TenantSqlParser tenantSqlParser = new TenantSqlParser();

        // 设置租户处理器
        tenantSqlParser.setTenantHandler(new TenantHandler() {

            // 设置当前租户ID，实际情况你可以从cookie、或者缓存中拿都行
            @Override
            public Expression getTenantId(boolean select) {
                // 从当前系统上下文中取出当前请求的服务商ID，通过解析器注入到SQL中。
                Long currentProviderId = apiContext.getCurrentTenantId();
                if (null == currentProviderId) {
                    throw new RuntimeException("Get CurrentProviderId error.");
                }
                return new LongValue(currentProviderId);
            }

            @Override
            public String getTenantIdColumn() {
                // 对应数据库中租户ID的列名
                return "tenant_id";
            }

            @Override
            public boolean doTableFilter(String tableName) {
                // 是否需要需要过滤某一张表
              /*  List<String> tableNameList = Arrays.asList("sys_user");
                if (tableNameList.contains(tableName)){
                    return true;
                }*/
                return false;
            }
        });

        sqlParserList.add(tenantSqlParser);
        paginationInterceptor.setSqlParserList(sqlParserList);

        return paginationInterceptor;
    }

}
```

####  方式二：

通过租户注解的形式，目前只能作用于Mapper的方法上。特定sql过滤 过滤特定的方法 也可以在userMapper需要排除的方法上加入注解SqlParser(filter=true) 排除 SQL 解析。

```java
package com.erbadagang.mybatis.plus.tenant.mapper;

import com.baomidou.mybatisplus.annotation.SqlParser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.erbadagang.mybatis.plus.tenant.entity.Tenant;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author 郭秀志 jbcode@126.com
 * @since 2020-07-12
 */
public interface TenantMapper extends BaseMapper<Tenant> {
    /**
     * 自定Wrapper, @SqlParser(filter = true)注解代表不进行SQL解析也就没有租户的附加条件。
     *
     * @return
     */
    @SqlParser(filter = true)
    @Select("SELECT count(5) FROM t_tenant ")
    public Integer myCount();
}
```



### 3.5 动态数据源

##### 什么需要动态数据源

当一个应用需要根据不同的情况，连接不同的数据库处理相同的业务逻辑时就需要使用动态数据源技术

##### 2. 动态数据源和多数据源的区别

- 多数据源：是属于静态的数据源切换，一个业务处理往往只能定义一个数据源，如果需要在不同的数据库上执行此处理，就需要些两个相同的数据来连接不同的数据源。
- 动态数据源：是在多数源基础上的一次升级，数据源可以在同一个处理中来回切换，达到相同的业务代码可以运行在多个数据源上，这样就可以减少了冗余的开发量，而且将来的扩展性会变得更加强大。

##### 3. 动态数据源的实现

数据库配置文件大致如下:

```yml
spring:
  datasource: #数据库配置
    primary: #数据库1
      driver-class-name: com.mysql.cj.jdbc.Driver
      jdbc-url: jdbc:mysql://
      username: root
      password: 3
      type: com.alibaba.druid.pool.DruidDataSource
    second: #数据库2
      driver-class-name: com.mysql.cj.jdbc.Driver
      jdbc-url: jdbc:mysql://
      username: root
      password: 3
      type: com.alibaba.druid.pool.DruidDataSource
    third: #数据库3
      driver-class-name: com.mysql.cj.jdbc.Driver
      jdbc-url: jdbc:mysql://
      username: root
      password: 3
      type: com.alibaba.druid.pool.DruidDataSource
```



#### 3.2 代码实现

- 先新建 数据源的枚举

```java
public enum DataSourceEnums {

    PRIMARY("primaryDataSource"),
    SECOND("secondDataSource"),
    THIRD("thirdDataSource");

    private String value;

    DataSourceEnums(String value){this.value=value;}

    public String getValue() {
        return value;
    }

}
```

- 用来标记数据源的 注解（在哪里使用哪个数据源）

```java
/**
 * @author zhaww
 * @date 2020/4/14
 * @Description .自定义 - 区分数据源的注解
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyDataSource {
    DataSourceEnums value() default DataSourceEnums.PRIMARY;
}
```

- 动态数据源管理器，继承 AbstractRoutingDataSource

```java
/**
 * @author zhaww
 * @date 2020/4/10
 * @Description .动态数据源管理器
 */public class DataSourceContextHolder extends AbstractRoutingDataSource {

    private static final ThreadLocal<String> contextHolder = new InheritableThreadLocal<>();

    /**
     * 重写这个方法，这里返回使用的数据源 key 值
     * @return
     */
    @Override
    protected Object determineCurrentLookupKey() {
//        log.info("动态切换数据源：" + DataSourceContextHolder.getDataSource());
        return contextHolder.get();
    }

    /**
     *  设置数据源
     * @param db
     */
    public static void setDataSource(String db){
        contextHolder.set(db);
    }

    /**
     * 取得当前数据源
     * @return
     */
    public static String getDataSource(){
        return contextHolder.get();
    }

    /**
     * 清除上下文数据
     */
    public static void clear(){
        contextHolder.remove();
    }

}
```

- mybatis-plus 的配置类

```java
//@EnableTransactionManagement //开启事务
@Configuration
@MapperScan(value = {"com.zydd.admin.dao"}) //扫描Mapper 层的类
public class MybatisPlusConfig {

    @Bean(name = "primaryDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "secondDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.second")
    public DataSource secondDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "thirdDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.third")
    public DataSource thirdDataSource() {
        return DataSourceBuilder.create().build();
    }


    @Bean(name = "multipleTransactionManager")
    @Primary
    public DataSourceTransactionManager multipleTransactionManager(@Qualifier("multipleDataSource") DataSource dataSource) {
        //        return new MyDataSourceTransactionManager(dataSource);
        return new DataSourceTransactionManager(dataSource);
    }

    /**
     * 动态数据源配置
     *
     * @return
     */
    @Bean(name = "multipleDataSource")
    @Primary
    public DataSource multipleDataSource(@Qualifier("primaryDataSource") DataSource primaryDataSource,
                                         @Qualifier("secondDataSource") DataSource secondDataSource,
                                         @Qualifier("thirdDataSource") DataSource thirdDataSource) {
        DataSourceContextHolder dynamicDataSource = new DataSourceContextHolder();
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DataSourceEnums.PRIMARY.getValue(), primaryDataSource);
        targetDataSources.put(DataSourceEnums.SECOND.getValue(), secondDataSource);
        targetDataSources.put(DataSourceEnums.THIRD.getValue(), thirdDataSource);
        dynamicDataSource.setTargetDataSources(targetDataSources);
        dynamicDataSource.setDefaultTargetDataSource(thirdDataSource); // 默认使用的数据源
        return dynamicDataSource;
    }

    @Bean("sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(multipleDataSource(primaryDataSource(), secondDataSource(), thirdDataSource()));
        //mybatis-plus yml 配置不生效，要在这里代码里配置
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        //是否使用转驼峰
        configuration.setMapUnderscoreToCamelCase(false);
        configuration.setCacheEnabled(false);
        sqlSessionFactory.setConfiguration(configuration);

        //添加分页功能
        Interceptor[] plugins = {paginationInterceptor()};
        sqlSessionFactory.setPlugins(plugins);

        //扫描 mapper 路径
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resource = resolver.getResources("classpath:mapper/**/*.xml");
        sqlSessionFactory.setMapperLocations(resource);
        return sqlSessionFactory.getObject();
    }

    /**
     * @Description : mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        paginationInterceptor.setOverflow(true);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
        //        paginationInterceptor.setLimit(30);
        return paginationInterceptor;
    }

}
```

注意：我们不但默认通过 Mapper 的路径来切换数据源，还通过 Service 方法层来切换数据源。
因为如果 service 有事务的话，进入service方法的时候，DataSourceTransactionManager 就设置好了默认数据源，就算通过Mapper层重新设置数据源，DataSourceTransactionManager 的默认数据源还是没有变。
所以在 事务管理器 设置默认数据源之前，就切换数据源，实现动态事务+动态数据源。

### 3.6 逻辑删除

#### 逻辑删除实现



给数据库表对应的实体类字段上加上@TableLogic注解

当我们查询数据时，查询结果不希望包含逻辑删除字段，可以加如下的注解

```java
@TableLogic
@TableField(select = false)
private Integer deleted;
```



通常在一个比较正规的管理项目中，逻辑删除字段不允许随意命名，所有表的逻辑删除字段使用相同的名称（比如：deleted）。我们可以在application.yml中添加全局配置，这样就不需要在每一个实体类上面都添加 @TableLogic注解了：

> 注意：当全局配置和`@TableLogic`局部配置同时存在，则以实体上注解为准，优先级更高。

```yml
#全局逻辑删除字段值
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted
```

默认情况下，逻辑已删除值为1，逻辑未删除值为0。我们也可以在application.yml中进行修改：

```yml
#逻辑已删除值(默认为 1)
#逻辑未删除值(默认为 0)
mybatis-plus:
  global-config:
    db-config:
      logic-delete-value: 1
      logic-not-delete-value: 0
```

## 五、代码生成器

### 5.1 什么是代码生成器

### 5.2 如何使用代码生成器

#### 4.1.添加依赖

添加 代码生成器 依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.3.2</version>
</dependency>
```

添加 模板引擎 依赖，MyBatis-Plus 支持 Velocity（默认）、Freemarker、Beetl，用户可以选择自己熟悉的模板引擎。

Velocity（默认）：

```xml
<dependency>
      <groupId>org.apache.velocity</groupId>
      <artifactId>velocity-engine-core</artifactId>
      <version>2.2</version>
  </dependency>
```

注意！如果您选择了非默认引擎，需要在 AutoGenerator 中 设置模板引擎。

```java
AutoGenerator generator = new AutoGenerator();

// set freemarker engine
generator.setTemplateEngine(new FreemarkerTemplateEngine());

// set beetl engine
generator.setTemplateEngine(new BeetlTemplateEngine());

// set custom engine (reference class is your custom engine class)
generator.setTemplateEngine(new CustomTemplateEngine());

// other config
```

#### 4.2 代码生成配置

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

执行下面的这个测试用例，Mybatis Plus就可以帮助我们实现以上各层的代码生成到对应的package路径下面

```java
public class CodeGenerator {

    @Test
    public void startGenerator() {
        //1、全局配置
        GlobalConfig config = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        config.setActiveRecord(true)//开启AR模式
            .setAuthor("zimug")//设置作者
            .setOutputDir(projectPath + "/src/main/java")//生成路径(一般在此项目的src/main/java下)
            .setFileOverride(true)//第二次生成会把第一次生成的覆盖掉
            .setOpen(true)//生成完毕后是否自动打开输出目录
            //.setSwagger2(true)//实体属性 Swagger2 注解
            //.setIdType(IdType.AUTO)//主键策略
            .setServiceName("%sService")//生成的service接口名字首字母是否为I，这样设置就没有I
            .setBaseResultMap(true)//生成resultMap
            .setBaseColumnList(true);//在xml中生成基础列
        //2、数据源配置
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL)//数据库类型
            .setDriverName("com.mysql.jdbc.Driver")
            .setUrl("jdbc:mysql://localhost:3306/zimug")
            .setUsername("root")
            .setPassword("zimug3456");
        //3、策略配置
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setCapitalMode(true)//开启全局大写命名
            .setNaming(NamingStrategy.underline_to_camel)//表名映射到实体的命名策略(下划线到驼峰)
            //表字段映射属性名策略(未指定按naming)
            .setColumnNaming(NamingStrategy.underline_to_camel)
            //.setTablePrefix("tb_")//表名前缀
            //.setSuperEntityClass("你自己的父类实体,没有就不用设置!")
            //.setSuperEntityColumns("id");//写于父类中的公共字段
            //.setSuperControllerClass("自定义继承的Controller类全称，带包名,没有就不用设置!")
            .setRestControllerStyle(true) //生成 @RestController 控制器
            .setEntityLombokModel(true)//使用lombok
            .setInclude("sys_user","sys_role");//逆向工程使用的表
        //4、包名策略配置
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.zimug.example")//设置包名的parent
            .setMapper("mapper")
            .setService("service")
            .setController("controller")
            .setEntity("entity")
            .setXml("mapper");//设置xml文件的目录
        //5、整合配置
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(config)
            .setDataSource(dataSourceConfig)
            .setStrategy(strategyConfig)
            .setPackageInfo(packageConfig);
        //6、执行
        autoGenerator.execute();
    }
}
```

### 5.3 代码生成器的高级功能



## 六、常用注解使用

| 注解        | 描述     |
| ----------- | -------- |
| @TableName  | 表名映射 |
| @TableField | 字段映射 |
| @TableId    | 主键类型 |
| @Version    | 乐观锁   |
| @TableLogic | 逻辑删除 |



#### 6.1 @TableName 表名映射

表名注解，标识当前实体类与数据库表的对应关系

```java
@TableName("sys_user")
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| value            | ==数据库表名==                                               |
| schema           | schema                                                       |
| keepGlobalPrefix | 是否保持使用全局的 tablePrefix 的值（当全局 tablePrefix 生效时）默认为false |
| resultMap        | xml 中 resultMap 的 id（用于满足特定类型的实体类对象绑定）   |
| autoResultMap    | 是否自动构建 resultMap 并使用（如果设置 resultMap 则不会进行 resultMap 的自动构建与注入）默认为false |
| excludeProperty  | 需要排除的属性名 @since 3.3.1                                |

#### 6.2 @TableField 字段映射

设置当前对应数据库表中的字段关系

```java
@TableName("sys_user")
public class User {
    @TableId
    private Long id;
    @TableField("nickname")
    private String name;
    private Integer age;
    private String email;
}
```

数据库中未定义属性

```java
@TableField(exist=false)
private Integer result;
exist:设置属性在数据库表字段中是否存在,默认为true.此属性无法与value合并使用
```

密码不想被查询

```java
@TableField(value = "pwd",select = false)
private String password;
select:设置属性是否参与查询,此属性与select()映射配置不冲突
```

注解属性如下

| 属性             | 描述                                      |
| ---------------- | ----------------------------------------- |
| value            | 数据库字段名                              |
| exist            | 是否为数据库表字段，默认为true            |
| condition        |                                           |
| update           | 是否进行 update 更新                      |
| insertStrategy   | 查询策略                                  |
| updateStrategy   | 更新策略                                  |
| whereStrategy    | 添加策略                                  |
| fill             | 字段自动填充策略                          |
| select           | 是否进行 select 查询                      |
| keepGlobalFormat | 是否保持使用全局的 format 进行处理        |
| jdbcType         | JDBC 类型 (该默认值不代表会按照该值生效)  |
| typeHandler      | 类型处理器 (该默认值不代表会按照该值生效) |
| numericScale     | 指定小数点后保留的位数                    |

#### 6.3 @TableId 主键类型

主键注解

```java
@TableName("sys_user")
public class User {
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

| 属性  | 描述         |
| ----- | ------------ |
| value | 主键字段名   |
| type  | 指定主键类型 |

**IdType**

| 值            | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| AUTO          | 数据库 ID 自增                                               |
| NONE          | 无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT） |
| INPUT         | insert 前自行 set 主键值                                     |
| ASSIGN_ID     | 分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
| ASSIGN_UUID   | 分配 UUID,主键类型为 String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认 default 方法) |
| ID_WORKER     | 分布式全局唯一 ID 长整型类型(please use `ASSIGN_ID`)         |
| UUID          | 32 位 UUID 字符串(please use `ASSIGN_UUID`)                  |
| ID_WORKER_STR | 分布式全局唯一 ID 字符串类型(please use `ASSIGN_ID`)         |

#### 6.1 @Version 乐观锁

第一步 :表中增加乐观锁标记

实体类中添加对应字段

```java
@Data
public class User {
 
    @Version
    private Integer version;
}
```

配置乐观锁拦截器

```java
@Configuration
public class MpConfig {

    @Bean
    public MybatisPlusInterceptor pageInterceptor(){
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        //分页插件
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        //乐观锁
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }
}
```

`使用乐观锁在修改前必须先获取对应version字段数据`

#### 9.1 @TableLogic 逻辑删除

```java
public class User{
	@TableLogic(value = "0",delval = "1")
	private Integer isDelete;
}
```

或者`配置文件全局配置`

```yaml
mybatis-plus:
 global-config:
   db-config:
     logic-delete-field: isDelete
     #逻辑未删除值
     logic-not-delete-value: 0
     #逻辑已删除值
     logic-delete-value: 1
```



- [字母哥博客](https://link.juejin.cn/?target=http%3A%2F%2Fzimug.com%2F)
