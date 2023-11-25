# 二、 IoC 容器

## IoC理论介绍

IOC（Inversion of Control），即“控制反转”，**不是什么技术，而是一种设计思想**。把复杂系统分解成相互合作的对象，这些对象类通过封装以后，内部实现对外部是透明的，从而降低了解决问题的复杂度，而且可以灵活地被重用和扩展。对象不再由我们决定，而是让程序自己决定，所有的实现类对象，全部交给容器来管理，所有对象之间的关系，也由容器来动态决定，这样就引入了IoC理论。

::: info IoC和DI是什么关系

控制反转是通过依赖注入实现的，其实它们是同一个概念的不同角度描述。通俗来说就是**IoC是设计思想，DI是实现方式**。

:::

## 2.2 Bean注册与配置



**Spring Bean是什么**

Spring框架给我们提供了一个IoC容器进行对象的的管理，一个由Spring IoC容器实例化、组装和管理的对象，我们称其为Bean。



当我们注册Bean后，容器就会根据配置进行管理了。当我们需要对象时，可以向IoC容器索要被管理的对象，IoC容器会自动进行创建并提供。然后我们就直接可以从上下文中获取到它为我们创建的对象。

### XML 方式

顾名思义，就是将bean的信息配置.xml文件里，通过Spring加载文件为我们创建bean。这种方式出现很多早前的SSM项目中，将第三方类库或者一些配置工具类都以这种方式进行配置，主要原因是由于第三方类不支持Spring注解。

- **优点**： 可以使用于任何场景，结构清晰，通俗易懂
- **缺点**： 配置繁琐，不易维护，枯燥无味，扩展性差

| 属性                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| `id`                 | 唯一标识（检查命名是否规范）                                 |
| `name`               | 唯一标识                                                     |
| `class`              | 类路径                                                       |
| `alias`              | 别名                                                         |
| `resource`           | 配置文件路径                                                 |
| `scope`              | `singleton`单例模式，容器加载配置时就被创建（默认）；`prototype`原型模式，获取对象时才会被创建。 |
| `lazy-init`          | 懒加载，默认关闭                                             |
| `depends-on`         | 设定前置加载Bean                                             |
| `autowire`           | 自动装配,一个是byName，还有一个是byType                      |
| `autowire-candidate` | 关闭自动装配候选                                             |
| `primary`            | 默认候选                                                     |



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--注册Bean-->
    <bean id="userDao" class="tech.pdai.springframework.dao.UserDaoImpl"/>
    <!--原型模式获取Bean-->
    <bean name="a" class="com.test.bean.Student" scope="prototype"/>
    <!--开启懒加载-->
    <bean class="com.test.bean.Student" lazy-init="true"/>
    <!--depends-on来设定前置加载Bean-->
    <bean name="teacher" class="com.test.bean.Teacher"/>
    <bean name="student" class="com.test.bean.Student" depends-on="teacher"/>
    <!--导入其他配置文件-->
    <import resource="test.xml"/>
    <!--给Bean起别名-->
    <alias name="a" alias="test"/>
    <!--自动装配-->
    <bean name="student" class="com.test.bean.Student" autowire="byType"/>
    <!--注入属性-->
    <bean name="student" class="com.test.bean.Student">
        <property name="name" value="卢本伟"/><!--值-->
        <property name="teacher" ref="teacher"/><!--对象-->
    </bean>

</beans>
```

```java
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("test.xml");
  	//getBean有多种形式，其中第一种就是根据类型获取对应的Bean
  	//容器中只要注册了对应类的Bean或是对应类型子类的Bean，都可以获取到
    Student student = context.getBean(Student.class);
    Student student = context.getBean("a");
    Student student = context.getBean("test");
    student.hello();
}
```



### Java 方式

| 注解                  |                                           |
| --------------------- | ----------------------------------------- |
| `@Configuration`      | 配置类                                    |
| `@Bean`               | 注册Bean                                  |
| `@Import `            | 导入其他配置类                            |
| `@Lazy(true)`         | 对应lazy-init属性                         |
| `@Scope("prototype")` | 对应scope属性                             |
| `@DependsOn`          | 对应depends-on属性                        |
| `@PostConstruct`      | 对应init-method属性(也可在@Bean中指定)    |
| `@PreDestroy`         | 对应destroy-method属性(也可在@Bean中指定) |
| `@Autowired`          | 自动装配，由IoC容器自动为其赋值           |

将类的创建交给我们配置的JavcConfig类来完成，Spring只负责维护和管理，采用纯Java创建方式。其本质上就是把在XML上的配置声明转移到Java配置类中

- **优点**：适用于任何场景，配置方便，因为是纯Java代码，扩展性高，十分灵活
- **缺点**：由于是采用Java类的方式，声明不明显，如果大量配置，可读性比较差

```java
// 创建一个配置类， 添加@Configuration注解声明为配置类

@Configuration
public class BeansConfig {

    /**
     * @return user dao
     */
    // 创建方法，方法上加上@bean，该方法用于创建实例并返回，该实例创建后会交给spring管理，方法名建议与实例名相同（首字母小写）
    @Bean("userDao")
    public UserDaoImpl userDao() {
        return new UserDaoImpl();
    }

    /**
     * @return user service
     */
    @Bean("userService")
    public UserServiceImpl userService() {
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDao(userDao());
        return userService;
    }

    /**
     * @return log aspect
     */
    @Bean("logAspect")
    public LogAspect logAspect() {
        return new LogAspect();
    }
}
```

```java
public class App {

    /**
     * main interfaces.
     *
     * @param args args
     */
    public static void main(String[] args) {
        // create and configure beans
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeansConfig.class);

        // retrieve configured instance
        UserServiceImpl service = context.getBean("userService", UserServiceImpl.class);

        // use configured instance
        List<User> userList = service.findUserList();

        // print info from beans
        userList.forEach(a -> System.out.println(a.getName() + "," + a.getAge()));
    }
}
```



### 注解方式

| 注解             | 描述                             |
| ---------------- | -------------------------------- |
| `@Component`     | 组件类                           |
| `@ComponentScan` | 开启扫描包，配合`@Component`使用 |
| `@Controller`    | 控制层                           |
| `@Service`       | 业务层                           |
| `@Repository`    | 数据层                           |

通过在类上加注解的方式，来声明一个类交给Spring管理，Spring会自动扫描带有@Component，@Controller，@Service，@Repository这四个注解的类，然后帮我们创建并管理，前提是需要先配置Spring的注解扫描器。

- **优点**：开发便捷，通俗易懂，方便维护。
- **缺点**：具有局限性，对于一些第三方资源，无法添加注解。只能采用XML或JavaConfig的方式配置

```java
// 对相关类添加@Component相关的注解，比如控制层:@Controller，业务层:@Service，数据层:@Repository
// 1.添加 @ComponentScan("tech.pdai.springframework") 指定扫描的basePackage
public class App {

    /**
     * main interfaces.
     *
     * @param args args
     */
    public static void main(String[] args) {
        //  2. AnnotationConfigApplicationContext("tech.pdai.springframework")`指定扫描的basePackage
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
                "tech.pdai.springframework");

        // retrieve configured instance
        UserServiceImpl service = context.getBean(UserServiceImpl.class);

        // use configured instance
        List<User> userList = service.findUserList();

        // print info from beans
        userList.forEach(a -> System.out.println(a.getName() + "," + a.getAge()));
    }
}
```

## 2.3 生命周期与继承

### 生命周期

通过`init-method`和`destroy-method`属性可以为Bean指定初始化方法和销毁方法，以便在对象创建和被销毁时执行一些其他的任务。

```java
public void init(){
    System.out.println("我是对象初始化时要做的事情！");    
}

public void destroy(){
    System.out.println("我是对象销毁时要做的事情！");
}

// XML 配置
// <bean name="student" class="com.test.bean.Student" init-method="init" destroy-method="destroy"/>
```



**初始化和销毁**

> 注意，如果Bean不是单例模式，而是采用的原型模式，那么就只会在获取时才创建，并调用init-method，而对应的销毁方法不会被调用（因此，对于原型模式下的Bean，Spring无法顾及其完整生命周期，而在单例模式下，Spring能够从Bean对象的创建一直管理到对象的销毁）

```java
//当容器创建时，默认情况下Bean都是单例的，那么都会在一开始就加载好，对象构造完成后，会执行init-method
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("test.xml");
//我们可以调用close方法关闭容器，此时容器内存放的Bean也会被一起销毁，会执行destroy-method
context.close();
```



### 继承

Bean之间也是具备继承关系的，只不过这里的继承并不是类的继承，而是属性的继承。*了解*

通过`parent`来指定继承Bean

> 注意，所有配置的属性，在子Bean中必须也要存在，并且可以进行注入，否则会出现错误
>
> 当然，如果子类中某些属性比较特殊，也可以在继承的基础上单独配置

```xml
<bean name="artStudent" class="com.test.bean.ArtStudent">
    <property name="name" value="小明"/>
</bean>
<!--Bean继承-->
<bean class="com.test.bean.SportStudent" parent="artStudent"/>
```

**继承抽象Bean**

果我们只是希望某一个Bean仅作为一个配置模版供其他Bean继承使用，那么我们可以将其配置为抽象Bean

> 注意：一旦声明为抽象Bean，那么就无法通过容器获取到其实例化对象了。

```xml
<bean name="artStudent" class="com.test.bean.ArtStudent" abstract="true">
    <property name="name" value="小明"/>
    <property name="id" value="1"/>
</bean>
<bean class="com.test.bean.SportStudent" parent="artStudent">
    <property name="id" value="2"/>
</bean>
```



这里最后再提一下，我们前面已经学习了各种各样的Bean配置属性，如果我们希望整个上下文中所有的Bean都采用某种配置，我们可以在最外层的beans标签中进行默认配置：这样，即使Bean没有配置某项属性，但是只要在最外层编写了默认配置，那么同样会生效，除非Bean自己进行配置覆盖掉默认配置。



## 2.4 工厂模式和工厂Bean

某些时候，我们可能希望 Spring不要直接利用反射机制通过构造方法创建Bean对象， 而是利用反射机制先找到对应的工厂类，然后利用工厂类去生成需要的Bean对象

| 属性             | 描述               |
| ---------------- | ------------------ |
| `factory-bean`   | 指定Bean的工厂Bean |
| `factory-method` | 工厂方法           |

```java
public class Student {
    Student() {
        System.out.println("我被构造了");
    }
}
public class StudentFactory {
    public static Student getStudent(){
      	System.out.println("欢迎光临电子厂");
        return new Student();
    }
}
```

通过factory-method进行指定

> 注意，这里的Bean类型需要填写为Student类的工厂类，并且添加factory-method指定对应的工厂方法，但是最后注册的是工厂方法的返回类型，所以说依然是Student的Bean



当我们采用工厂模式后，我们就无法再通过配置文件对Bean进行依赖注入等操作了，而是只能在工厂方法中完成。

```xml
<bean class="com.test.bean.StudentFactory" factory-method="getStudent"/>
<!--未注册Bean，真正注册的是工厂方法提供的东西 -->
```





某些工厂类需要构造出对象之后才能使用，我们也可以将某个工厂类直接注册为工厂Bean

```java
public class StudentFactory {
    public Student getStudent(){
        System.out.println("欢迎光临电子厂");
        return new Student();
    }
}
```

先将工厂类注册为工厂Bean，然后再使用`factory-bean`

```xml
<bean name="studentFactory" class="com.test.bean.StudentFactory"/>
<bean factory-bean="studentFactory" factory-method="getStudent"/>
```



```java
// 直接输入工厂Bean的名称,获取工厂Bean生产的Bean的实例
Student bean = (Student) context.getBean("studentFactory");
// 添加&符号,获取工厂类的实例
StudentFactory bean = (StudentFactory) context.getBean("&studentFactory");
```

注解方式
