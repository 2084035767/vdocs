# Java Spring

## 一、简介

### 1.1 Spring 是什么？

**Spring的一个最大的目的就是解决企业级应用开发的复杂性，即简化Java开发**。Spring致力于提供一个以统一的、高效的方式构造整个应用，并且可以将单层框架以最佳的组合揉和在一起建立一个连贯的体系。可以说Spring是一个提供了更完善开发环境的一个框架，可以为POJO(Plain Ordinary Java Object)对象提供企业级的服务。

### 1.2 Spring的特性和优势

特性

| 非侵入式 | 控制反转 | 依赖注入 | 面向切面编程（AOP） | 组件化 | 一站式 |
| -------- | -------- | -------- | ------------------- | ------ | ------ |



好处

| 轻量级 | 松耦合 | 松耦合 | 丰富的功能模块 | 测试支持 | 社区支持 |
| ------ | ------ | ------ | -------------- | -------- | -------- |



### 1.3 spring 家族框架





上图中包含了 Spring 框架的所有模块，这些模块可以满足一切企业级应用开发的需求，在开发过程中可以根据需求有选择性地使用所需要的模块。下面分别对这些模块的作用进行简单介绍。

#### Core Container（Spring的核心容器）

Spring 的核心容器是其他模块建立的基础，由 Beans 模块、Core 核心模块、Context 上下文模块和 SpEL 表达式语言模块组成。

- **Beans 模块**：提供了框架的基础部分，包括控制反转和依赖注入。
- **Core 核心模块**：封装了 Spring 框架的底层部分，包括资源访问、类型转换及一些常用工具类。
- **Context 上下文模块**：建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加资源绑定、数据验证、国际化、Java EE 支持、容器生命周期、事件传播等。ApplicationContext 接口是上下文模块的焦点。
- **SpEL 模块**：提供了强大的表达式语言支持，支持访问和修改属性值，方法调用，支持访问及修改数组、容器和索引器，命名变量，支持算数和逻辑运算，支持从 Spring 容器获取 Bean，它也支持列表投影、选择和一般的列表聚合等。

#### Data Access/Integration（数据访问／集成）

数据访问／集成层包括 JDBC、ORM、OXM、JMS 和 Transactions 模块，具体介绍如下。

- **JDBC 模块**：提供了一个 JDBC 的样例模板，使用这些模板能消除传统冗长的 JDBC 编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。
- **ORM 模块**：提供与流行的“对象-关系”映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis 等。而且还可以使用 Spring 事务管理，无需额外控制事务。
- **OXM 模块**：提供了一个支持 Object /XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX 和 XStream。将 Java 对象映射成 XML 数据，或者将XML 数据映射成 Java 对象。
- **JMS 模块**：指 Java 消息服务，提供一套 “消息生产者、消息消费者”模板用于更加简单的使用 JMS，JMS 用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。
- **Transactions 事务模块**：支持编程和声明式事务管理。

#### Web模块

Spring 的 Web 层包括 Web、Servlet、WebSocket 和 Webflux 组件，具体介绍如下。

- **Web 模块**：提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。
- **Servlet 模块**：提供了一个 Spring MVC Web 框架实现。Spring MVC 框架提供了基于注解的请求资源注入、更简单的数据绑定、数据验证等及一套非常易用的 JSP 标签，完全无缝与 Spring 其他技术协作。
- **WebSocket 模块**：提供了简单的接口，用户只要实现响应的接口就可以快速的搭建 WebSocket Server，从而实现双向通讯。
- **Webflux 模块**： Spring WebFlux 是 Spring Framework 5.x中引入的新的响应式web框架。与Spring MVC不同，它不需要Servlet API，是完全异步且非阻塞的，并且通过Reactor项目实现了Reactive Streams规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。

- **Portlet 模块**：提供了在 Portlet 环境中使用 MVC 实现，类似 Web-Servlet 模块的功能。



#### AOP、Aspects、Instrumentation和Messaging

在 Core Container 之上是 AOP、Aspects 等模块，具体介绍如下：

- **AOP 模块**：提供了面向切面编程实现，提供比如日志记录、权限控制、性能统计等通用功能和业务逻辑分离的技术，并且能动态的把这些功能添加到需要的代码中，这样各司其职，降低业务逻辑和通用功能的耦合。
- **Aspects 模块**：提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。
- **Instrumentation 模块**：提供了类工具的支持和类加载器的实现，可以在特定的应用服务器中使用。
- **messaging 模块**：Spring 4.0 以后新增了消息（Spring-messaging）模块，该模块提供了对消息传递体系结构和协议的支持。
- **jcl 模块**： Spring 5.x中新增了日志框架集成的模块。



#### Test模块

Test 模块：Spring 支持 Junit 和 TestNG 测试框架，而且还额外提供了一些基于 Spring 的测试功能，比如在测试 Web 框架时，模拟 Http 请求的功能。

包含Mock Objects, TestContext Framework, Spring MVC Test, WebTestClient。



### 1.4 初始 spring 项目

创建一个 Maven 项目，导入 Spring 依赖

::: warning

Spring6 仅支持 Java17 及以上

:::

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.10</version>
</dependency>
```

首先我们需要在resource中创建一个Spring配置文件（在resource中创建的文件，会在编译时被一起放到类路径下），命名为test.xml，直接右键点击即可创建：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```

## 二、 IoC 容器

### IoC理论介绍

IOC（Inversion of Control），即“控制反转”，**不是什么技术，而是一种设计思想**。把复杂系统分解成相互合作的对象，这些对象类通过封装以后，内部实现对外部是透明的，从而降低了解决问题的复杂度，而且可以灵活地被重用和扩展。对象不再由我们决定，而是让程序自己决定，所有的实现类对象，全部交给容器来管理，所有对象之间的关系，也由容器来动态决定，这样就引入了IoC理论。

::: info IoC和DI是什么关系

控制反转是通过依赖注入实现的，其实它们是同一个概念的不同角度描述。通俗来说就是**IoC是设计思想，DI是实现方式**。

:::

### 2.2 Bean注册与配置



**Spring Bean是什么**

Spring框架给我们提供了一个IoC容器进行对象的的管理，一个由Spring IoC容器实例化、组装和管理的对象，我们称其为Bean。



当我们注册Bean后，容器就会根据配置进行管理了。当我们需要对象时，可以向IoC容器索要被管理的对象，IoC容器会自动进行创建并提供。然后我们就直接可以从上下文中获取到它为我们创建的对象。

#### XML 方式

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



#### Java 方式

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



#### 注解方式

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

### 2.3 生命周期与继承

#### 生命周期

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



#### 继承

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



### 2.4 工厂模式和工厂Bean

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



## 三、 DI 依赖注入

常用的注入方式主要有三种：构造方法注入（Construct注入），setter注入，基于注解的注入（接口注入）

### 3.1 setter方式

**在XML配置方式中**，property都是setter方式注入，比如下面的xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
        <property name="userDao" ref="userDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

本质上包含两步：

1. 第一步，需要new UserServiceImpl()创建对象, 所以需要默认构造函数
2. 第二步，调用setUserDao()函数注入userDao的值, 所以需要setUserDao()函数

```java
/**
 * @author pdai
 */
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private UserDaoImpl userDao;

    /**
     * init.
     */
    public UserServiceImpl() {
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

    /**
     * set dao.
     *
     * @param userDao user dao
     */
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}
```

**在注解和Java配置方式下**

```java
/**
 * @author pdai
 */
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private UserDaoImpl userDao;

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

    /**
     * set dao.
     *
     * @param userDao user dao
     */
    @Autowired
    public void setUserDao(UserDaoImpl userDao) {
        this.userDao = userDao;
    }
}
```

### 3.2 构造函数 <Badge text="官方推荐" type="tip"/>

- **在XML配置方式中**，`<constructor-arg>`是通过构造函数参数注入，比如下面的xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- services -->
    <bean id="userService" class="tech.pdai.springframework.service.UserServiceImpl">
        <constructor-arg name="userDao" ref="userDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions for services go here -->
</beans>
```

本质上是new UserServiceImpl(userDao)创建对象, 所以对应的service类是这样的：

```java
/**
 * @author pdai
 */
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private final UserDaoImpl userDao;

    /**
     * init.
     * @param userDaoImpl user dao impl
     */
    public UserServiceImpl(UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

}
```

**在注解和Java配置方式下**

```java
/**
 * @author pdai
 */
 @Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    private final UserDaoImpl userDao;

    /**
     * init.
     * @param userDaoImpl user dao impl
     */
    @Autowired // 这里@Autowired也可以省略
    public UserServiceImpl(final UserDaoImpl userDaoImpl) {
        this.userDao = userDaoImpl;
    }

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return this.userDao.findUserList();
    }

}
```

### 3.3 注解注入

以@Autowired（自动注入）注解注入为例，修饰符有三个属性：Constructor，byType，byName。默认按照byType注入。

- **constructor**：通过构造方法进行自动注入，spring会匹配与构造方法参数类型一致的bean进行注入，如果有一个多参数的构造方法，一个只有一个参数的构造方法，在容器中查找到多个匹配多参数构造方法的bean，那么spring会优先将bean注入到多参数的构造方法中。
- **byName**：被注入bean的id名必须与set方法后半截匹配，并且id名称的第一个单词首字母必须小写，这一点与手动set注入有点不同。
- **byType**：查找所有的set方法，将符合符合参数类型的bean注入。

比如：

```java
/**
 * @author pdai
 */
@Service
public class UserServiceImpl {

    /**
     * user dao impl.
     */
    @Autowired
    private UserDaoImpl userDao;

    /**
     * find user list.
     *
     * @return user list
     */
    public List<User> findUserList() {
        return userDao.findUserList();
    }

}
```



#### 三种自动注入的注解有何区别？<Badge text="常见的面试题" type="note"/>

| 区别         | @Autowired                                       | @Resource                        | @Inject                                      |
| ------------ | ------------------------------------------------ | -------------------------------- | -------------------------------------------- |
| 来源         | Spring自带                                       | JSR250规范实现                   | JSR330规范实现                               |
| 匹配方式     | 类型匹配                                         | 类型匹配                         | 名称匹配                                     |
| 实现名称匹配 | 搭配@Qualifier使用                               | 搭配@Named使用                   | 通过name属性指定                             |
| 作用对象     | 构造函数、方法、方法参数、字段、枚举的常量、注解 | 构造函数、方法、字段、枚举的常量 | 接口、类、枚举、注解、字段、枚举的常量、方法 |
| 其他         | required属性                                     | 无                               | 无                                           |



## 四、AOP 编程

**AOP概念**

::: tip 推荐

推荐阅读这篇文章了解 [AOP](https://juejin.cn/post/7235167849428926521?searchId=202310041723156A2AC093811D5A1A182D#heading-10)

:::

AOP（Aspect Oriented Programming）,即面向切面编程（也叫面向方面编程，面向方法编程）。旨在通过将横切关注点（cross-cutting concerns）从核心业务逻辑中分离出来，提供更好的模块化和可重用性。AOP提供了一种在不修改核心业务逻辑的情况下，将横切关注点模块化的方法。它通过将这些关注点抽象为称为"切面"（aspect）的模块，与核心业务逻辑分离开来。切面可以定义一组横切关注点的行为，例如在方法执行前后添加日志、在事务开始和结束时进行处理等。AOP是OOP的一个强有力的补充。



**AOP 核心概念**

在AOP中，我们将应用程序的功能划分为两个维度：主体关注点（core concerns）和横切关注点（cross-cutting concerns）。主体关注点是核心业务逻辑，而横切关注点是与主体关注点无关的功能。

AOP通过以下几个核心概念来实现：

1. 切面（Aspect）：切面是一个模块，它封装了横切关注点的行为。切面定义了在何时、何地以及如何应用横切关注点。切面可以包含通知（advice）、切点（pointcut）和引入（introduction）等元素。
2. 通知（Advice）：通知是切面定义的具体行为，它指定在何时执行横切关注点。常见的通知类型有前置通知（before advice）、后置通知（after advice）、返回通知（after-returning advice）、异常通知（after-throwing advice）和环绕通知（around advice）。
3. 切点（Pointcut）：切点定义了在应用程序中哪些位置应该应用横切关注点。通过指定切点表达式或使用注解等方式，我们可以选择性地匹配到特定的方法或类。
4. 连接点（Join Point）：连接点是应用程序执行过程中能够插入切面的点。每个连接点都表示在应用程序中的一个特定位置，如方法调用、方法执行、异常抛出等。
5. 引入（Introduction）：引入允许我们向现有的类添加新的方法和属性。通过引入，我们可以在不修改原始类的情况下，为其添加新的功能。
6. 织入（Weaving）：织入是将切面应用到目标对象中的过程。织入可以在编译时、类加载时或运行时进行，以将切面逻辑与目标对象的代码进行合并。



**AOP 主要应用场景有**

- Authentication 权限
- Caching 缓存
- Context passing 内容传递
- Error handling 错误处理
- Lazy loading 懒加载
- Debugging 调试
- logging, tracing, profiling and monitoring 记录跟踪、优化、校准
- Performance optimization 性能优化
- Persistence 持久化
- Resource pooling 资源池
- Synchronization 同步
- Transactions 事务

### 4.1 XML Schema配置方式



定义目标对象

```java
public class DemoService {
    // 符合切点表达式-连接点
    public void doMethod() {
        System.out.println("DemoServiceI.doMethod()");
    }
}
```

定义切面类

```java
public class LogAspect {

    //环绕通知
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    //前置通知
    public void doBefore() {
        System.out.println("前置通知");
    }

    //后置通知.
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    //异常通知.
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    //最终通知
    public void doAfter() {
        System.out.println("最终通知");
    }

}
```

XML配置AOP

| 属性           | 描述                                               |
| -------------- | -------------------------------------------------- |
| `expression`   | 切入的方法                                         |
| `method`       | 通知方法                                           |
| `pointcut-ref` | 指向切点                                           |
| `returning`    | 后置通知的第二个参数，用于接收目标方法的返回值     |
| `throwing`     | 异常通知第二个参数，用于接收目标方法抛出的异常对象 |

其中`expression`表达式来选择到我们需要切入的方法，Spring AOP支持以下AspectJ切点指示器（PCD）用于表达式

- `execution` <Badge text="常用" type="info"/>：用于匹配方法执行连接点。这是使用Spring AOP时使用的主要点切割指示器。
- `within`：限制匹配到某些类型的连接点（使用Spring AOP时在匹配类型中声明的方法的执行）。
- `this`：限制与连接点匹配（使用Spring AOP时方法的执行），其中bean引用（Spring AOP代理）是给定类型的实例。
- `target`：限制匹配连接点（使用Spring AOP时方法的执行），其中目标对象（正在代理的应用程序对象）是给定类型的实例。
- `args`：限制与连接点匹配（使用Spring AOP时方法的执行），其中参数是给定类型的实例。
- `@target`：限制匹配连接点（使用Spring AOP时方法的执行），其中执行对象的类具有给定类型的注释。
- `@args`：限制匹配到连接点（使用Spring AOP时方法的执行），其中传递的实际参数的运行时类型具有给定类型的注释。
- `@within`：限制与具有给定注释的类型中的连接点匹配（使用Spring AOP时在带有给定注释的类型中声明的方法的执行）。
- `@annotation`：与连接点主体（在Spring AOP中运行的方法）具有给定注释的连接点匹配的限制。



**expression 表达式**

`execution`填写格式如下：

```xml
修饰符 包名.类名.方法名称(方法参数)
```

- 修饰符：public、protected、private、包括返回值类型、static等等（使用*代表任意修饰符）
- 包名：如com.test（* 代表全部）
- 类名：使用*也可以代表包下的所有类
- 方法名称：可以使用*代表全部方法
- 方法参数：填写对应的参数即可，比如(String, String)，也可以使用*来代表任意一个参数，使用..代表所有参数。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           ">
    <!-- 开启扫描 -->
    <context:component-scan base-package="tech.pdai.springframework" />
    <!-- 启用基于AspectJ的自动代理功能 -->
    <aop:aspectj-autoproxy/>

    <!-- 注册目标类 -->
    <bean id="demoService" class="tech.pdai.springframework.service.AopDemoServiceImpl"/>

    <!-- 注册切面 -->
    <bean id="logAspect" class="tech.pdai.springframework.aspect.LogAspect"/>
    
    <!-- 配置切面 -->
    <aop:config>
        <!-- 增强方法: 指向AOP类Bean-->
        <aop:aspect ref="logAspect">
            <!-- 配置切入点 -->
            <aop:pointcut id="pointCutMethod" expression="execution(* tech.pdai.springframework.service.*.*(..))"/> 
            <!-- 环绕通知 -->
            <aop:around method="doAround" pointcut-ref="pointCutMethod"/>
            <!-- 前置通知 -->
            <aop:before method="doBefore" pointcut-ref="pointCutMethod"/>
            <!-- 后置通知；returning属性：后置通知的第二个参数的名称，类型是Object -->
            <aop:after-returning method="doAfterReturning" pointcut-ref="pointCutMethod" returning="result"/>
            <!-- 异常通知：如果没有异常，将不会执行增强；throwing属性：异常通知第二个参数的的名称、类型是Exception-->
            <aop:after-throwing method="doAfterThrowing" pointcut-ref="pointCutMethod" throwing="ex"/>
            <!-- 最终通知 -->
            <aop:after method="doAfter" pointcut-ref="pointCutMethod"/>
        </aop:aspect>
    </aop:config>
</beans>
```

**测试类**

```java
public static void main(String[] args) {
    // create and configure beans
    ApplicationContext context = new ClassPathXmlApplicationContext("aspects.xml");

    // retrieve configured instance
    AopDemoServiceImpl service = context.getBean("demoService", AopDemoServiceImpl.class);

    // use configured instance
    try {
        service.doMethod();
    } catch (Exception e) {
        // e.printStackTrace();
    }
}
```



### 4.2 AspectJ注解方式

Spring 使用了@AspectJ框架为AOP的实现提供了一套注解。为了解决基于XML的声明式AspectJ存在一些不足。

| 注解                    | 解释                                                         |
| ----------------------- | ------------------------------------------------------------ |
| @Aspect                 | 用来定义一个切面。                                           |
| @EnableAspectJAutoProxy | 启用 AspectJ 自动代理，配合@Aspect使用。                     |
| @pointcut               | 用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。 |
| @Before                 | 用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个切入点。 |
| @AfterReturning         | 用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut、value和returning属性，其中pointcut 、value这两个属性的作用一样，都用于指定切入点。 |
| @Around                 | 用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知的切入点。 |
| @After-Throwing         | 用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut、value和throwing属性。 |
| @After                  | 用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。 |
| @DeclareParents         | 用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。 |



#### 动态织入

> Spring AOP的实现方式是动态织入，动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的；**如Java JDK的动态代理(Proxy，底层通过反射实现)或者CGLIB的动态代理(底层通过继承实现)**，Spring AOP采用的就是基于运行时增强的代理技术。

**JDK代理和Cglib代理的区别**

JDK代理（基于接口）
- JDK代理是基于接口的代理技术，要求目标类实现一个接口。
- JDK代理利用Java的反射机制，在运行时动态生成代理类，代理类实现了目标接口，并将方法调用转发给实际的目标对象。
- JDK代理只能代理实现了接口的目标类，无法代理没有实现接口的类。
- JDK代理是Java标准库的一部分，不需要额外的依赖。

CGLIB代理（基于继承）
- CGLIB代理是基于继承的代理技术，不要求目标类实现接口。
- CGLIB代理通过在运行时创建目标类的子类来实现代理，代理类继承自目标类，并重写了目标类的方法。
- CGLIB代理可以代理没有实现接口的类。
- CGLIB代理需要依赖CGLIB库，因此需要将其添加到项目的依赖中。



使用JDK代理（CGLIB代理同理）

定义目标对象

```java
//接口类
public interface IJdkProxyService {

    void doMethod1();

    String doMethod2();

    String doMethod3() throws Exception;
}
//接口实现类
@Service
public class JdkProxyDemoService implements IJdkProxyService{

    @Override
    public void doMethod1() {
        System.out.println("JdkProxyServiceImpl.doMethod1()");
    }
    @Override
    public String doMethod2() {
        System.out.println("JdkProxyServiceImpl.doMethod2()");
        return "hello world";
    }
    @Override
    public String doMethod3() throws Exception {
        System.out.println("JdkProxyServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```

**定义切面**

```java
@Aspect
@Component
@EnableAspectJAutoProxy
public class LogAspect {

    @Pointcut("execution(* tech.pdai.springframework.service.*.*(..))")
    private void pointCutMethod() {
    }

    //环绕通知
    @Around("pointCutMethod()")
    // 环绕通知的连接点对象是 ProceedingJoinPoint，其他通知是 JoinPoint
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed(); //调用process方法来执行被代理的原方法，如果有返回值，可以使用value接收
        System.out.println("环绕通知: 退出方法"+value);
        return o;
    }

    //前置通知
    @Before("pointCutMethod()")
    public void doBefore() {
        System.out.println("前置通知");
    }

    //后置通知
    @AfterReturning(pointcut = "pointCutMethod()", returning = "result")
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    //异常通知
    @AfterThrowing(pointcut = "pointCutMethod()", throwing = "e")
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    //最终通知
    @After("pointCutMethod()")
    public void doAfter() {
        System.out.println("最终通知");
    }

}
```



## 五、SpringEL 表达式

SpEL 是一种强大，简洁的装配 Bean 的方式，它可以通过运行期间执行的表达式将值装配到我们的属性或构造函数当中，更可以调用 JDK 中提供的静态常量，获取外部 Properties 文件中的的配置。

### 外部属性注入

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

### SpEL简单使用

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



### 集合操作相关语法

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



## 六、Spring 高级特性

### 6.1 Bean Aware

Aware接口是Spring Framework中提供的一组标记接口，用于在Bean装配的过程中获取Spring容器中提供的一些核心组件或运行时上下文等信息。通过使用Aware接口，我们可以在Bean实例化和初始化过程中获取到Spring容器中其他组件，方便Bean类实现更复杂的业务逻辑。

常见的Spring框架中的Bean Aware接口和对应的功能

| Bean Aware 接口                  | 功能                                      |
| -------------------------------- | ----------------------------------------- |
| `BeanNameAware`                  | 获取当前Bean的名称                        |
| `BeanFactoryAware`               | 获取所属的BeanFactory                     |
| `ApplicationContextAware`        | 获取所属的ApplicationContext              |
| `MessageSourceAware`             | 获取MessageSource用于国际化               |
| `ApplicationEventPublisherAware` | 获取ApplicationEventPublisher用于发布事件 |
| `ResourceLoaderAware`            | 获取ResourceLoader用于加载资源            |
| `EnvironmentAware`               | 获取Environment用于访问配置属性           |
| `ServletConfigAware`             | 获取ServletConfig                         |
| `ServletContextAware`            | 获取ServletContext                        |
| `BeanClassLoaderAware`           | 获取加载当前Bean的ClassLoader             |
| `BeanPostProcessor`              | 在Bean的初始化前后进行自定义处理          |
| `BeanFactoryPostProcessor`       | 在BeanFactory的初始化前后进行自定义处理   |
| `InitializingBean`               | 在Bean的属性设置完成后执行初始化逻辑      |

**使用**

```java
// BeanNameAware接口获取的资源就是BeanName
@Component
public class Student implements BeanNameAware {   //我们只需要实现这个接口就可以了

    @Override
    public void setBeanName(String name) {   //Bean在加载的时候，容器就会自动调用此方法，将Bean的名称给到我们
        System.out.println("我在加载阶段获得了Bean名字："+name);
    }
}


//BeanClassLoaderAware使我们在Bean加载阶段就获取到当前Bean的类加载器
@Component
public class Student implements BeanClassLoaderAware {

    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        System.out.println(classLoader);
    }
}
```



### 6.2 任务调度

Spring框架为我们提供了更加便捷的方式进行任务调度。简单来说就是定时任务。



#### 异步任务

异步任务是指不进入主线程，而进入任务队列的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程。

| 注解           | 描述                                                 |
| -------------- | ---------------------------------------------------- |
| `@Async`       | 标记方法为异步，新开一个线程执行。                   |
| `@EnableAsync` | 开启异步任务执行，配合`@Async`使用（配置类或主类上） |

::: waring

添加`@Async`注解要求方法的返回值只能是void或Future类型

:::

```java
@Component
public class Student {
    public void syncTest() throws InterruptedException {
        System.out.println(Thread.currentThread().getName()+"我是同步执行的方法，开始...");
        Thread.sleep(3000);
        System.out.println("我是同步执行的方法，结束！");
    }

    @Async
    public void asyncTest() throws InterruptedException {
        System.out.println(Thread.currentThread().getName()+"我是异步执行的方法，开始...");
        Thread.sleep(3000);
        System.out.println("我是异步执行的方法，结束！");
    }
}
```



#### 定时任务

定时任务是一种自动化执行特定操作的方式，可以根据预定的时间、日期或间隔周期性地执行某些任务。

| 注解                | 描述                                                 |
| ------------------- | ---------------------------------------------------- |
| `@Scheduled`        | 标记方法为定时任务                                   |
| `@EnableScheduling` | 开启定时任务，配合`@Scheduled`使用（配置类或主类上） |

`@Scheduled`中几个参数如下

- `fixedDelay`：在上一次定时任务执行完之后，间隔多久继续执行。
- `fixedRate`：无论上一次定时任务有没有执行完成，两次任务之间的时间间隔。
- `cron`：使用cron表达式来指定任务计划。



::: tip 推荐

推荐阅读 [cron表达式]()

:::

```java
@Scheduled(fixedRate = 2000)   //单位是毫秒，这里是每两秒钟打印一次
public void task(){
    System.out.println("我是定时任务！"+new Date());
}
```



### 6.3 Spring 监听事件

监听器可以在使用过程时监听某些事件的发生，然后对这些事件做出响应处理。监听器对应用场景很多,用户的每一个操作都可以被定义为一个事件，通过监听器就能对某些业务场景中的事件进行监听。

#### 事件(event)

spring定义了一个标准的事件抽象类ApplicationEvent，继承了这个抽象类就是一个Application事件。

```java
// 自定义事件需要继承ApplicationEvent
public class CustomEvent extends ApplicationEvent {

    private String message;

    public CustomEvent(Object source, String message) {
        super(source);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

```

Spring常见内置事件

1. `ContextRefreshedEvent`：当应用程序上下文被初始化或刷新时触发。这通常发生在应用程序启动时或在热部署期间。
2. `ContextStartedEvent`：当应用程序上下文启动时触发。可以在这个事件中执行一些启动相关的操作。
3. `ContextStoppedEvent`：当应用程序上下文停止时触发。可以在这个事件中执行一些停止相关的操作。
4. `ContextClosedEvent`：当应用程序上下文关闭时触发。这个事件是在应用程序关闭之前触发的，可以在这个事件中执行一些清理资源的操作。
5. `RequestHandledEvent`：当HTTP请求处理完成时触发。可以在这个事件中记录请求处理的统计信息或执行其他相关的操作。



#### 监听器(listener)

spring定义了一个标准的监听器接口ApplicationListener，实现了这个接口的类就是一个Application监听器。

```java
@Component
public class CustomEventListener implements ApplicationListener<CustomEvent> {

    @Override
    public void onApplicationEvent(CustomEvent event) {
        // 在自定义事件发生时触发此方法
        String message = event.getMessage();
        System.out.println("接收到自定义事件，消息内容：" + message);
        // 在这里添加你的逻辑代码
    }
}


// 发送事件
public class SomeClass implements ApplicationEventPublisherAware {

    private ApplicationEventPublisher eventPublisher;

    public void someMethod() {
        // 在某个方法中触发自定义事件
        CustomEvent customEvent = new CustomEvent(this, "Hello, Custom Event!");
        eventPublisher.publishEvent(customEvent);
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
}
```



## 七、参考三三

- [Java 全栈知识体系](https://pdai.tech/)
- [柏码(itbaima.net)](https://itbaima.net/document)