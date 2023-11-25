# 四、AOP 编程

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

## 4.1 XML Schema配置方式



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



## 4.2 AspectJ注解方式

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



### 动态织入

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


