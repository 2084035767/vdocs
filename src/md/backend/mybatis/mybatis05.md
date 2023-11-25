# 五、缓存

## 5.1 缓存种类

MyBatis提供了**一级缓存**和**二级缓存**

1. **默认**情况下，只有一级缓存（**SqlSession级别**的缓存，也称为本地缓存）开启。
2. 二级缓存（全局缓存）需要手动开启和配置，他是基于**mapper级别**的缓存。
3. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

### 一级缓存

Mybatis中的一级缓存默认开启，是sqlsession级别的

1. 一级缓存(local cache), 即本地缓存, 作用域默认为sqlSession。
2. 一级缓存的工作机制



### 二级缓存

在同一个**namespace下的mapper**文件中，执行相同的查询SQL，第一次会去查询数据库，并写到缓存中；第二次直接从缓存中取。当执行SQL时两次查询中间发生了增删改操作，则二级缓存清空。
使用二级缓存时，由于二级缓存的数据不一定都是存储到内存中，它的存储介质多种多样，所以需要给缓存的对象执行序列化（让pojo对象实现**Serializable接口**）。



### 第三方缓存 EhCache

1. 为了提高扩展性。MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来**自定义二级缓存**
2. EhCache 是一个纯Java的进程内缓存框架，具有快速、精干等特点，是Hibernate中默认的CacheProvider
3. 在mapper.xml里面配置cache标签



## 5.2 MyBatis一级缓存

一级缓存是SqlSession级别的缓存。不同的sqlSession之间的缓存数据区域（HashMap）是互相不影响的。

一级缓存的作用域是同一个SqlSession，在同一个sqlSession中两次执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据，从而提高查询效率。当一个sqlSession结束后该sqlSession中的一级缓存也就不存在了。Mybatis默认开启一级缓存。

一级缓存只是相对于同一个SqlSession而言。所以在参数和SQL完全一样的情况下，我们使用同一个SqlSession对象调用一个Mapper方法，往往只执行一次SQL。



默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存（一级缓存无法关闭，只能调整）

> 注意：一个会话DML操作只会重置当前会话的缓存，不会重置其他会话的缓存，也就是说，其他会话缓存是不会更新的！



### 一级缓存的生命周期

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



## 5.3 MyBatis二级缓存

MyBatis的二级缓存是Application级别的缓存，它可以提高对数据库查询的效率，以提高应用的性能。

二级缓存是mapper级别的缓存，多个SqlSession去操作同一个Mapper的sql语句，数据库得到数据会存在二级缓存区域，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。

二级缓存是多个SqlSession共享的，其作用域是mapper的同一个namespace，不同的sqlSession两次执行相同namespace下的sql语句且向sql中传递参数也相同即最终执行相同的sql语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。Mybatis默认没有开启二级缓存需要在setting全局参数中配置开启二级缓存。

sqlSessionFactory层面上的二级缓存默认是不开启的，二级缓存的开启需要进行配置，实现二级缓存的时候，MyBatis要求返回的POJO必须是可序列化的。 也就是要求实现Serializable接口，配置方法很简单，只需要在映射XML文件使用 `<cache/>`标签。

> 读取顺序：二级缓存 => 一级缓存 => 数据库

### 二级缓存的作用

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


