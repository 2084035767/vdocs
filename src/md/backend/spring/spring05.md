# 五、SpringEL 表达式

SpEL 是一种强大，简洁的装配 Bean 的方式，它可以通过运行期间执行的表达式将值装配到我们的属性或构造函数当中，更可以调用 JDK 中提供的静态常量，获取外部 Properties 文件中的的配置。

## 外部属性注入

有些时候，我们甚至可以将一些外部配置文件中的配置进行读取，并完成注入。

我们需要创建以`.properties`结尾的配置文件，这种配置文件格式很简单，类似于Map，需要一个Key和一个Value，中间使用等号进行连接，这里我们在resource目录下创建一个`test.properties`文件：

```properties
test.name=只因
```

以在配置类上添加`@PropertySource`注解：

```java
@Configuration
@ComponentScan("com.test.bean")
@PropertySource("classpath:test.properties")   //注意，类路径下的文件名称需要在前面加上classpath:
public class MainConfiguration{
}
```

```java
@Component
public class Student {
    
    @Value("${test.name}")   // ${ } 表示占位符
    private String name;   //String会被自动赋值为配置文件中对应属性的值


    //使用@Value进行注入构造方法中的参数
    public Student(@Value("${test.name}") String name){
        this.name = name;
    }

    public void hello(){
        System.out.println("我的名字是："+name);
    }
}
```

## SpEL简单使用

Spring官方为我们提供了一套非常高级SpEL表达式，通过使用表达式，我们可以更加灵活地使用Spring框架。

首先我们来看看如何创建一个SpEL表达式：

```java
ExpressionParser parser = new SpelExpressionParser();
//SpEL是具有运算能力的
Expression exp = parser.parseExpression("'Hello World'");  //使用parseExpression方法来创建一个表达式
System.out.println(exp.getValue());   //表达式最终的运算结果可以通过getValue()获取

//对字符串进行各种操作，比如调用方法之类的
Expression exp = parser.parseExpression("'Hello World'.toUpperCase()");   //调用String的toUpperCase方法
System.out.println(exp.getValue());

//还可以访问属性、使用构造方法等
//比如 String.getBytes() 方法，就是一个Getter，那么可以写成 bytes
Expression exp = parser.parseExpression("'Hello World'.bytes");
System.out.println(exp.getValue());

//可以链式调用
Expression exp = parser.parseExpression("'Hello World'.bytes.length");   //继续访问数组的length属性
System.out.println(exp.getValue());

//构造方法
Expression exp = parser.parseExpression("new String('hello world').toUpperCase()");
System.out.println(exp.getValue());

//使用运算符进行各种高级运算
Expression exp = parser.parseExpression("66 > 77");   //比较运算
System.out.println(exp.getValue());
Expression exp = parser.parseExpression("99 + 99 * 3");   //算数运算
System.out.println(exp.getValue());

//对于那些需要导入才能使用的类
Expression exp = parser.parseExpression("T(java.lang.Math).random()");   //由T()囊括，包含完整包名+类名
//Expression exp = parser.parseExpression("T(System).nanoTime()");   //默认导入的类可以不加包名
System.out.println(exp.getValue());
```



支持根据特定表达式，从给定对象中获取属性出来

```java
@Component
public class Student {
    private final String name;
    public Student(@Value("${test.name}") String name){
        this.name = name;
    }

    public String getName() {    //比如下面要访问name属性，那么这个属性得可以访问才行，访问权限不够是不行的
        return name;
    }
}
Student student = context.getBean(Student.class);
ExpressionParser parser = new SpelExpressionParser();
Expression exp = parser.parseExpression("name");
System.out.println(exp.getValue(student));    //直接读取对象的name属性

//调用表达式的setValue方法来设定属性的值
Expression exp = parser.parseExpression("name");
exp.setValue(student, "刻师傅");   //同样的，这个属性得有访问权限且能set才可以，否则会报错
```



## 集合操作相关语法

```java
@Component
public class Student {
    public Map<String, String> map = Map.of("test", "你干嘛");
    public List<String> list = List.of("AAA", "BBB", "CCC");
}

//使用SpEL快速取出集合中的元素
Expression exp = parser.parseExpression("map['test']");  //对于Map这里映射型，可以直接使用map[key]来取出value
System.out.println(exp.getValue(student));
Expression exp = parser.parseExpression("list[2]");   //对于List、数组这类，可以直接使用[index]
System.out.println(exp.getValue(student));

//快速创建集合
Expression exp = parser.parseExpression("{5, 2, 1, 4, 6, 7, 0, 3, 9, 8}"); //使用{}来快速创建List集合
List value = (List) exp.getValue();
value.forEach(System.out::println);
Expression exp = parser.parseExpression("{{1, 2}, {3, 4}}");   //它是支持嵌套使用的
//创建Map也很简单，只需要key:value
Expression exp = parser.parseExpression("{name: '小明', info: {address: '北京市朝阳区', tel: 10086}}");
System.out.println(exp.getValue());
```



直接根据条件获取集合中的元素

```java
@Component
public class Student {
    public List<Clazz> list = List.of(new Clazz("高等数学", 4));

    public record Clazz(String name, int score){ }
}
//现在我们希望从list中获取那些满足我们条件的元素，并组成一个新的集合，我们可以使用.?运算符
Expression exp = parser.parseExpression("list.?[name == '高等数学']");
System.out.println(exp.getValue(student));
Expression exp = parser.parseExpression("list.?[score > 3]");   //选择学分大于3分的科目
System.out.println(exp.getValue(student));

//针对某个属性创建对应的投影集合
Expression exp = parser.parseExpression("list.![name]");   //使用.!创建投影集合，这里创建的时课程名称组成的新集合
System.out.println(exp.getValue(student));

//安全导航运算符用于避免NullPointerException
Expression exp = parser.parseExpression("name?.toUpperCase()");
System.out.println(exp.getValue(student));
```



可以将SpEL配合 @Value 注解或是xml配置文件中的value属性使用

```xml
<bean id="numberGuess" class="org.spring.samples.NumberGuess">
    <property name="randomNumber" value="#{ T(java.lang.Math).random() * 100.0 }"/>
</bean>
```

或是使用注解开发

```java
public class FieldValueTestBean {
    @Value("#{ systemProperties['user.region'] }")
    private String defaultLocale;
}
```
