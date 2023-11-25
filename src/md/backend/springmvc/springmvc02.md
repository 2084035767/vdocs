# 二、MVC架构

## 2.1 什么是MVC

> MVC英文是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计规范。本质上也是一种解耦。

用一种业务逻辑、数据、界面显示分离的方法，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。

- **Model**（模型）是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据。
- **View**（视图）是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的。
- **Controller**（控制器）是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

MVC 是一种非常常见且常用的分层架构，主要包括；M - mode 对象层，封装到 domain 里。V - view 展示层，但因为目前都是前后端分离的项目，几乎不会在后端项目里写 JSP 文件了。C - Controller 控制层，对外提供接口实现类。DAO 算是单独拿出来用户处理数据库操作的层。

![img](https://bugstack.cn/images/roadmap/tutorial/road-map-230623-02.png?raw=true)

- 如图，在 MVC 的分层架构下。我们编程3步的所需各类对象、方法、接口，都分配到 MVC 的各个层次中去。
- 因为这样分层以后，就可以很清晰明了的知道各个层都在做什么内容，也更加方便后续的维护和迭代。
- 对于一个真正的项目来说，是没有一锤子买卖的，最开始的开发远不是成本所在。最大的开发成本是后期的维护和迭代。而架构设计的意义更多的就是在解决系统的反复的维护和迭代时，如何降低成本，这也是架构分层的意义所在。

## 调用流程

接下来我们再看下一套 MVC 架构中各个模块在调用时的串联关系；

![img](https://bugstack.cn/images/roadmap/tutorial/road-map-230623-03.png?raw=true)

- 以用户发起 HTTP 请求开始，Controller 在接收到请求后，调用由 Spring 注入到类里的 Service 方法，进入 Service 方法后有些逻辑会走数据库，有些逻辑是直接内部自己处理后就直接返回给 Controller 了。最后由 Controller 封装结果返回给 HTTP 响应。
- 同时我们也可以看到各个对象在这些请求间的一个作用，如；请求对象、库表对象、返回对象

## 初识 Spring MVC

创建第一个Spring MVC的wed项目

## 传统XML配置形式

SpringMvc项目依然支持多种配置形式，这里我们首先讲解最传统的XML配置形式。

首先我们需要添加Mvc相关依赖：

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>6.0.10</version>
</dependency>
```

接着我们需要配置一下web.xml，将DispatcherServlet替换掉Tomcat自带的Servlet，这里url-pattern需要写为`/`，即可完成替换：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0">
    <servlet>
        <servlet-name>mvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>mvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

接着需要为整个Web应用程序配置一个Spring上下文环境（也就是容器），因为SpringMVC是基于Spring开发的，它直接利用Spring提供的容器来实现各种功能，那么第一步依然跟之前一样，需要编写一个配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```

接着我们需要为DispatcherServlet配置一些初始化参数来指定刚刚创建的配置文件：

```xml
<servlet>
    <servlet-name>mvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      	<!--     指定我们刚刚创建在类路径下的XML配置文件       -->
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:application.xml</param-value>
    </init-param>
</servlet>
```

这样我们就完成了基本的配置，现在我们可以来测试一下是否配置正确，我们删除项目自带的Servlet类，创建一个Mvc中使用的Controller类，现在还没学没关系，跟着写就行了，这里我们只是测试一下：

```java
@Controller
public class HelloController {
    @ResponseBody
    @RequestMapping("/")
    public String hello(){
        return "HelloWorld!";
    }
}
```

接着我们需要将这个类注册为Bean才能正常使用，我们来编写一下Spring的配置文件，这里我们直接配置包扫描，XML下的包扫描需要这样开启：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  	<!-- 需要先引入context命名空间，然后直接配置base-package属性就可以了 -->
    <context:component-scan base-package="com.example"/>
</beans>
```

如果可以成功在浏览器中出现HelloWorld则说明配置成功：



聪明的小伙伴可能已经发现了，实际上我们上面编写的Controller就是负责Servlet基本功能的，比如这里我们返回的是HelloWorld字符串，那么我们在访问这个地址的时候，的到的就是这里返回的字符串，可以看到写法非常简洁，至于这是怎么做到的的，怎么使用，我们会在本章进行详细介绍。

## 全注解配置形式

如果你希望完完全全丢弃配置文件，使用纯注解开发，可以直接添加一个类，Tomcat会在类路径中查找实现ServletContainerInitializer 接口的类，如果发现的话，就用它来配置Servlet容器，Spring提供了这个接口的实现类 SpringServletContainerInitializer , 通过@HandlesTypes(WebApplicationInitializer.class)设置，这个类反过来会查找实现WebApplicationInitializer 的类，并将配置的任务交给他们来完成，因此直接实现接口即可：

```java
public class MainInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{WebConfiguration.class};   //基本的Spring配置类，一般用于业务层配置
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[0];  //配置DispatcherServlet的配置类、主要用于Controller等配置，这里为了教学简单，就不分这么详细了，只使用上面的基本配置类
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};    //匹配路径，与上面一致
    }
}
```

接着我们需要再配置类中添加一些必要的注解：

```java
@Configuration
@EnableWebMvc   //快速配置SpringMvc注解，如果不添加此注解会导致后续无法通过实现WebMvcConfigurer接口进行自定义配置
@ComponentScan("com.example.controller")
public class WebConfiguration {
}
```





之后为了方便，我们就统一使用全注解形式编写。

如果日志科技有报错无法显示Mvc相关的日志，请添加以下依赖：

```xml
<dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.33</version>
</dependency>
<dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-jdk14</artifactId>
      <version>1.7.33</version>
</dependency>
```

添加后就可以正常打印日志了：
