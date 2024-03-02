# NOSQL

## Redis

### 引入依赖

在 pom.xml 中引入依赖：

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 数据源配置

```yaml
spring:
  redis:
    host: redis的ip
    port: 6379
    password: 密码
    # jedis 实现
    #client-type: 
```



### 两种客户端实现

- lettuce（默认）

- jedis

  > 需要排除lettuce依赖，再引入jedis的相关依赖，再在配置中启用该实现



### 序列化方式

- GenericToStringSerializer: 可以将任何对象泛化为字符串并序列化
- Jackson2JsonRedisSerializer: 跟JacksonJsonRedisSerializer实际上是一样的（常用）
- JacksonJsonRedisSerializer: 序列化object对象为json字符串
- JdkSerializationRedisSerializer: 序列化java对象
- StringRedisSerializer: 简单的字符串序列化



### 两种模板



| 模板name                    | 泛型              | 序列化策略                                                   |
| --------------------------- | ----------------- | ------------------------------------------------------------ |
| RedisTemplate               | `<K,V>`           | 默认采用JDK的序列化策略，key和value都是用这种序列化策略保存的 |
| StringRedisTemplate（常用） | `<String,String>` | 默认采用String的序列化策略，key和value都是用这种序列化策略保存的 |



#### 自定义模板

RedisTemplate：`<String,Object>`，序列化为 json 格式

```java
@Configuration
// 控制配置类的加载顺序,先加载 RedisAutoConfiguration.class 再加载该类,这样才能覆盖默认的 RedisTemplate
@AutoConfigureAfter(RedisAutoConfiguration.class)
public class RedisConfig {
    /**
     * 自定义 redisTemplate （方法名一定要叫 redisTemplate 因为 @Bean 是根据方法名配置这个bean的name的）
     * 默认的 RedisTemplate<K,V> 为泛型，使用时不太方便，自定义为 <String, Object>
     * 默认序列化方式为 JdkSerializationRedisSerializer 序列化后的内容不方便阅读，改为序列化成 json
     *
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        // 配置 json 序列化器 - Jackson2JsonRedisSerializer
        Jackson2JsonRedisSerializer jacksonSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 方法过期，改为下面代码
        // objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance ,
        jacksonSerializer.setObjectMapper(objectMapper);

        // 创建并配置自定义 RedisTemplateRedisOperator
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        // 将 key 序列化成字符串
        template.setKeySerializer(new StringRedisSerializer());
        // 将 hash 的 key 序列化成字符串
        template.setHashKeySerializer(new StringRedisSerializer());
        // 将 value 序列化成 json
        template.setValueSerializer(jacksonSerializer);
        // 将 hash 的 value 序列化成 json
        template.setHashValueSerializer(jacksonSerializer);
        template.afterPropertiesSet();
        return template;
    }
}

```



### 基础操作

- [Redis]()



```java
@SpringBootTest
public class RedisTests {
    
    // 自动装配
    @Autowired
    private StringRedisTemplate redisTemplate;

    redisTemplate.opsForValue(); // 操作字符串
    redisTemplate.opsForHash(); // 操作hash
    redisTemplate.opsForList(); // 操作list
    redisTemplate.opsForSet(); // 操作set
    redisTemplate.opsForZSet(); // 操作zset
    // 等其他

}
```

### 序列化方式

- GenericToStringSerializer: 可以将任何对象泛化为字符串并序列化
- Jackson2JsonRedisSerializer: 跟JacksonJsonRedisSerializer实际上是一样的（常用）
- JacksonJsonRedisSerializer: 序列化object对象为json字符串
- JdkSerializationRedisSerializer: 序列化java对象
- StringRedisSerializer: 简单的字符串序列化



设置序列化方式（针对`RedisTemplate`）

```java
@Configuration
public class RedisConfig {
    @Bean(name = "redisTemplate")
    public RedisTemplate<String, Object> getRedisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<String, Object>();
        redisTemplate.setConnectionFactory(factory);
        
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        
        redisTemplate.setKeySerializer(stringRedisSerializer); // key的序列化类型

        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 方法过期，改为下面代码
//        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance ,
                ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
       
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer); // value的序列化类型
        redisTemplate.setHashKeySerializer(stringRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
```

## mongoDB

### 引入依赖

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
```

### 数据源配置

```yaml
# MongoDB没有开启安全协议的时候可以使用
spring:
 data:
  mongodb:
   uri: mongodb://服务器IP:端口/数据库名
# 上方为明确指定某个数据的用户进行连接
# 也可以使用admin 数据库中的用户进行连接  统一到admin 数据库进行认证
# admin 用户认证 url 写法： mongodb://账户:密码%40@ip:端口/数据库名?authSource=admin&authMechanism=SCRAM-SHA-1

# MongoDB开启安全协议有密码的情况下使用
spring:
 data:
  mongodb:
   host: localhost
   port: 27017
   database: test
   username: username
   password: password
```



### 实体类

##### 相关注解

- `@Document`
  - 修饰范围：用在类上；
  - 作用：用来映射这个类的一个对象作为MongoDB中一条数据；
  - 属性：（`value`, `collection`）用来指定操作的集合名称；
- `@ID`
  - 修饰范围：用在成员变量、方法上；
  - 作用：用来将成员变量的值映射为 `_id` 的值；
- `@Field`
  - 修饰范围：用在成员变量、方法上；
  - 作用：用来将成员变量以及值映射为文档中的一个键值对；
  - 属性：（`name`, `value`）用来指定在文档中 key 的名称，**默认为成员变量名**；
- `@Transient`
  - 修饰范围：用在成员变量、方法上；
  - 作用：用来指定改成员变量，不参与文档的序列化；

```java
@Data
@Document(collection = "user")  //指定要对应的文档名(表名）
public class User {

    /**
     * 使用 @MongoID 能更清晰的指定 _id 主键
     */
    @MongoId
    private String id;
    private String name;
    private String sex;
    private Integer salary;
    private Integer age;
    private String remake;
    private Status status;

}
```







### 基础操作

[MongoDB]()

```java
@SpringBootTest
public class MongoTests {

    // 自动装配
    @Autowired
    private MongoTemplate mongoTemplate;

    mongoTemplate.createCollection("production"); //创建集合
    mongoTemplate.dropCollection("production"); //删除集合

    mongoTemplate.save(user); // _id存在时会把旧数据进行覆盖，批量插入高效；
    mongoTemplate.insert(user); // _id存在时会提示主键重复的异常，批量插入低效；
    mongoTemplate.findAll(User.class); // 查询所有
    mongoTemplate.findById(888, User.class); // ID查询
    mongoTemplate.find(new Query(), User.class); // 条件查询
    mongoTemplate.upsert(
        new Query(
            Criteria.where("name").is("我吃饱了")
        ),
        new Update()
        .set("salary", 7758521),
        User.class
    ); // 更新文档
    mongoTemplate.remove(new Query(
        Criteria.where("name").is("我吃饱了")
    ), User.class); // 删除文档



    // 等其他

}
```



### Elasticsearch

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```



### 数据源配置

```yaml
spring:
  elasticsearch:
    uris: http://127.0.0.1:9200 # elasticsearch 连接地址
    #username: elastic # 用户名
    #password: 123456 # 密码
    connection-timeout: 10s # 连接超时时间（默认1s）
    socket-timeout: 30s # 数据读取超时时间（默认30s）
```



### 实体类

##### 注解说明

- `@Document`：在类级别应用，以指示该类是映射到数据库的候选对象。   
  - indexName：用于存储此实体的索引的名称。它可以包含SpEL模板表达式   
  - createIndex：标记是否在存储库引导中创建索引。默认值为true。
  - versionType：版本管理的配置。默认值为EXTERNAL。
- `@Id`：在字段级别应用，以标记用于标识目的的字段。
- `@Transient`：默认情况下，存储或检索文档时，所有字段都映射到文档，此注释不包括该字段。
- `@PersistenceConstructor`：标记从数据库实例化对象时要使用的给定构造函数，甚至是受保护的程序包。构造函数参数按名称映射到检索到的Document中的键值。
- `@Field`：在字段级别应用并定义字段的属性，大多数属性映射到各自的Elasticsearch映射定义
  - name：字段名称，它将在Elasticsearch文档中表示，如果未设置，则使用Java字段名称。    
  - type：字段类型，format和日期类型的pattern定义。必须为日期类型定义format    
  - store：标记是否将原始字段值存储在Elasticsearch中，默认值为false。    
  - analyzer，searchAnalyzer，normalizer用于指定自定义分析和正规化。
- `@GeoPoint`：将字段标记为geo_point数据类型。如果字段是GeoPoint类的实例，则可以省略。
- `@ValueConverter`：定义用于转换给定属性的类。与注册的 Spring 不同，Converter这仅转换带注释的属性，而不是给定类型的每个属性。
- `@Setting`：注释定义不同的索引设置。以下参数可用：    
  - useServerConfiguration 不发送任何设置参数，因此 Elasticsearch 服务器配置确定它们。    
  - settingPath 是指定义必须在类路径中解析的设置的 JSON 文件    
  - shards要使用的分片数，默认为1    
  - replicas副本数，默认为1    
  - refreshIntervall, 默认为“1s”    
  - indexStoreType, 默认为"fs"



```java
@Document(indexName = "user", shards = 3, replicas = 0)
public class User {
    @Id
    private Integer id;
    @Field(type = FieldType.Keyword)
    private String name;
    @Field(type = FieldType.Integer)
    private Integer age;
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String address;
    @Field(type = FieldType.Date, format = DateFormat.custom, pattern = "uuuu-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime createTime;
}
```

### Elasticsearch 类

- `IndexOperations` 在索引级别定义操作，例如创建或删除索引。
- `DocumentOperations` 定义根据其ID存储，更新和检索实体的操作。
- `SearchOperations` 定义使用查询搜索多个实体的动作
- `ElasticsearchOperations` 结合`DocumentOperations`和`SearchOperations`的接口
- `ElasticsearchRestTemplate` 是`ElasticsearchOperations`的实现类

### 基础操作

[Elasticsearch]()

```java
@SpringBootTest
public class MongoTests {

    // 自动装配
    @Autowired
    private ElasticsearchRestTemplate template;
    // 操作索引
    // 获取IndexOperations对象
    IndexOperations indexOperations = template.indexOps(User.class);
    boolean exists = indexOperations.exists(); // 查
    boolean delete = indexOperations.delete(); // 删
    boolean flag = indexOperations.create(); // 增
    boolean mapping = indexOperations.putMapping(); // 设置Mapping
    // 操作文档

    User user = new User();
    template.save(user); // 增/改
    List<User> userList = new ArrayList<>();
    userList.add(new User); // 批量 增/改
    Iterable<User> users = template.save(userList);
    User user = template.get("1", User.class); // 查
    String delete = template.delete("1", User.class); // 删
    // 等其他

}
```

### 持久层

```java
// 新建一个User的数据持久层
@Repositorypublic
interface UserRepository extends ElasticsearchRepository<User, Integer> {}
```

> 建立此持久层后，如果`User`实体`@Document`注解内的`createIndex`为`true`时（默认为`true`），则服务启动时会先检查索引是否存在，若不存在则会自动创建索引

#### 默认方法

```java
// 增/改
User user = new User(1, "张三", 18, "上海市闵行区", LocalDateTime.now());
User save = repository.save(user);
// 查
Optional<User> optionalUser = repository.findById(1);
// 删
repository.deleteById(1);
```

