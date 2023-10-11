# Spring MVC



## 一、简介

### 1.1 什么是Spring MVC

Spring Web MVC 是一种基于Java 的实现了Web MVC 设计模式的请求驱动类型的轻量级Web 框架，即使用了MVC 架 构模式的思想，将 web 层进行职责解耦，基于请求驱动指的就是使用请求-响应模型，框架的目的就是帮助我们简化开 发，Spring Web MVC 也是要简化我们日常Web 开发的。

## 二、MVC架构

### 2.1 什么是MVC

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

### 调用流程

接下来我们再看下一套 MVC 架构中各个模块在调用时的串联关系；

![img](https://bugstack.cn/images/roadmap/tutorial/road-map-230623-03.png?raw=true)

- 以用户发起 HTTP 请求开始，Controller 在接收到请求后，调用由 Spring 注入到类里的 Service 方法，进入 Service 方法后有些逻辑会走数据库，有些逻辑是直接内部自己处理后就直接返回给 Controller 了。最后由 Controller 封装结果返回给 HTTP 响应。
- 同时我们也可以看到各个对象在这些请求间的一个作用，如；请求对象、库表对象、返回对象

### 初识 Spring MVC

创建第一个Spring MVC的wed项目

### 传统XML配置形式

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

### 全注解配置形式

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



## 三、控制器

SpringMVC使用`DispatcherServlet`替代Tomcat为我们提供的默认的静态资源Servlet，也就是说，现在所有的请求（除了jsp，因为Tomcat还提供了一个jsp的Servlet）都会经过`DispatcherServlet`进行处理。





我们的请求到达Tomcat服务器之后，会交给当前的Web应用程序进行处理，而SpringMVC使用`DispatcherServlet`来处理所有的请求，也就是说它被作为一个统一的访问点，所有的请求全部由它来进行调度。

当一个请求经过`DispatcherServlet`之后，会先走`HandlerMapping`，它会将请求映射为`HandlerExecutionChain`，依次经过`HandlerInterceptor`有点类似于之前我们所学的过滤器，不过在SpringMVC中我们使用的是拦截器，然后再交给`HandlerAdapter`，根据请求的路径选择合适的控制器进行处理，控制器处理完成之后，会返回一个`ModelAndView`对象，包括数据模型和视图，通俗的讲就是页面中数据和页面本身（只包含视图名称即可）。

返回`ModelAndView`之后，会交给`ViewResolver`（视图解析器）进行处理，视图解析器会对整个视图页面进行解析，SpringMVC自带了一些视图解析器，但是只适用于JSP页面，我们也可以像之前一样使用Thymeleaf作为视图解析器，这样我们就可以根据给定的视图名称，直接读取HTML编写的页面，解析为一个真正的View。

解析完成后，就需要将页面中的数据全部渲染到View中，最后返回给`DispatcherServlet`一个包含所有数据的成形页面，再响应给浏览器，完成整个过程。

因此，实际上整个过程我们只需要编写对应请求路径的的Controller以及配置好我们需要的ViewResolver即可，之后还可以继续补充添加拦截器，而其他的流程已经由SpringMVC帮助我们完成了。

### 3.1 配置视图解析器和控制器

配置视图解析器，导入需要的依赖

```xml
<!--使用Thymeleaf视图解析器-->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring6</artifactId>
    <version>3.1.1.RELEASE</version>
</dependency>
```

将对应的`ViewResolver`注册为Bean

```java
@Configuration
@EnableWebMvc
@ComponentScan("com.example.controller")
public class WebConfiguration implements WebMvcConfigurer{
    // 静态资源访问,放行静态资源
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();   //开启默认的Servlet
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/static/");
        //配置静态资源的访问路径
    }
    //我们需要使用ThymeleafViewResolver作为视图解析器，并解析我们的HTML页面
    @Bean
    public ThymeleafViewResolver thymeleafViewResolver(SpringTemplateEngine springTemplateEngine){
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setOrder(1);   //可以存在多个视图解析器，并且可以为他们设定解析顺序
        resolver.setCharacterEncoding("UTF-8");   //编码格式是重中之重
        //和之前JavaWeb阶段一样，需要使用模板引擎进行解析，所以这里也需要设定一下模板引擎
        resolver.setTemplateEngine(springTemplateEngine);
        return resolver;
    }

    //配置模板解析器
    @Bean
    public SpringResourceTemplateResolver templateResolver(){
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setSuffix(".html");   //需要解析的后缀名称
        //需要解析的HTML页面文件存放的位置，默认是webapp目录下，如果是类路径下需要添加classpath:前缀
        resolver.setPrefix("/");
        return resolver;
    }

    //配置模板引擎Bean
    @Bean
    public SpringTemplateEngine springTemplateEngine(ITemplateResolver resolver){
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(resolver);   //模板解析器，默认即可
        return engine;
    }


}
```

创建Controller

```java
@Controller   //直接添加@Controller注解
public class HelloController {

    @RequestMapping("/index")   //直接填写访问路径
    public ModelAndView index(){
        return new ModelAndView("index");  //返回ModelAndView对象，这里填入了视图的名称
      	//返回后会经过视图解析器进行处理
    }
}
```

接着我们在类路径根目录下创建一个简单html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试</title>
</head>
<body>
    <p>欢迎来到GayHub全球最大同性交友网站</p>
</body>
</html>
```



直接向Model模型层进行提供数据

```java
@RequestMapping(value = "/index")
public ModelAndView index(){
    ModelAndView modelAndView = new ModelAndView("index");
    modelAndView.getModel().put("name", "啊这");   //将name传递给Model
    return modelAndView;
}

// 可以直接返回View名称，SpringMVC会将其自动包装为ModelAndView对象
@RequestMapping(value = "/index")
public String index(){
    return "index";
}

//可以添加一个Model作为形参进行设置，SpringMVC通过依赖注入会自动帮助我们传递实例对象
@RequestMapping(value = "/index")
public String index(Model model){  //这里不仅仅可以是Model，还可以是Map、ModelMap
    model.addAttribute("name", "yyds");
    return "index";
}
```

Thymeleaf对传递的数据进行解析

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 引用静态资源，这里使用Thymeleaf的网址链接表达式，Thymeleaf会自动添加web应用程序的名称到链接前面 -->
    <script th:src="@{/static/test.js}"></script>
</head>
<body>
    HelloWorld！
    <div th:text="${name}"></div>
</body>
</html>
```



### Bean的Web作用域

在学习Spring时我们讲解了Bean的作用域，包括`singleton`和`prototype`，Bean分别会以单例和多例模式进行创建，而在SpringMVC中，它的作用域被继续细分

- `request`：对于每次HTTP请求，使用request作用域定义的Bean都将产生一个新实例，请求结束后Bean也消失。
- `session`：对于每一个会话，使用session作用域定义的Bean都将产生一个新实例，会话过期后Bean也消失。
- `global session`：<Badge text="不常用" type="danger"/> 仅了解。

| 注解            | 描述                |
| --------------- | ------------------- |
| `@RequestScope` | Bean的request作用域 |
| `@SessionScope` | Bean的session作用域 |



## 四、视图解析器

::: tip

这里使用 [Thymeleaf](./thymeleaf.md)

:::

## 五、数据处理

### 5.1 请求处理

| 注解                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| `@RequestMapping`   | 用于将任意HTTP 请求映射到控制器方法，可以在控制器类上和控制器类中的方法上使用。 |
| `@RequestParam`     | 用于将请求参数绑定到方法的参数上。可以用来获取请求中的查询参数或表单参数。 |
| `@RequestHeader`    | 用于将请求头信息绑定到方法的参数上。可以用来获取特定的请求头信息。 |
| `@PathVariable`     | 用于将URL路径中的变量绑定到方法的参数上。可以用来获取RESTful风格的URL中的路径参数。 |
| `@CookieValue`      | 用于将请求中的Cookie值绑定到方法的参数上。可以用来获取特定的Cookie值。 |
| `@SessionAttrbutie` | 用于将Session中的属性值绑定到方法的参数上。可以用来获取Session中存储的属性值。 |



#### 处理请求

前面我们已经了解了如何创建一个控制器来处理我们的请求，接着我们只需要在控制器添加一个方法用于处理对应的请求即可，之前我们需要完整地编写一个Servlet来实现，而现在我们只需要添加一个`@RequestMapping`即可实现

属性

- `path`：当前方法处理的请求路径，注意路径必须全局唯一，任何路径只能有一个方法进行处理，它是一个数组（等价于value）
- `method`：请求的方法类型，可以使用衍生注解指定类型的请求映射，如：`@GetMapping`，`@PostMapping`···
- `params`：携带请求参数
- `header`：请求头中需要携带内容
- `produces`：指定返回值类型，可以设定返回值的字符编码



路径还支持使用通配符

- ?：表示任意一个字符
- *：表示任意0-n个字符
- **：表示当前目录或基于当前目录的多级目录



请求头中携带了`Connection`属性，将无法访问这两个属性

- consumes： 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;
- produces: 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；

```java
@RequestMapping({"/index", "/test"})
public ModelAndView index(){
    return new ModelAndView("index");
}
// 使用衍生注解
@PostMapping(value = "/index")
public ModelAndView index(){
    return new ModelAndView("index");
}

// 携带哪些请求参数
@RequestMapping(value = "/index", params = {"!username", "password=123"})
public ModelAndView index(){
    return new ModelAndView("index");
}

// 请求头中需要携带什么内容
@RequestMapping(value = "/index", headers = "!Connection")
public ModelAndView index(){
    return new ModelAndView("index");
}
```

#### 参数处理

> `@RequestHeader`与`@RequestParam`用法一致

在形式参数前面添加`@RequestParam`注解，为方法添加一个形式参数

在`@RequestParam`中填写参数名称，参数的值会自动传递给形式参数，如果参数名称与形式参数名称相同，可省略。

```java
@RequestMapping(value = "/index")
public ModelAndView index(@RequestParam("username") String username){
    System.out.println("接受到请求参数："+username);
    return new ModelAndView("index");
}

// 将require属性设定为false来将属性设定为非必须
@RequestMapping(value = "/index")
public ModelAndView index(@RequestParam(value = "username", required = false) String username){
    System.out.println("接受到请求参数："+username);
    return new ModelAndView("index");
}

// 设定默认值，当请求参数缺失时，可以直接使用默认值
@RequestMapping(value = "/index")
public ModelAndView index(@RequestParam(value = "username", required = false, defaultValue = "伞兵一号") String username){
    System.out.println("接受到请求参数："+username);
    return new ModelAndView("index");
}
```

使用Servlet原本的类，只需添加为形参，SpringMVC会自动传递该请求原本的对象

- `HttpServletRequest`
- `HttpServletResponse`
- `HttpSession`
- `HttpCookie`

```java
@RequestMapping(value = "/index")
public ModelAndView index(HttpSession session){
    System.out.println(session.getAttribute("test"));
    session.setAttribute("test", "鸡你太美");
    return new ModelAndView("index");
}
```



使用`@PathVariable`注解需要在请求路径中，添加占位符和路径参数,其他与@RequestParam用法一样

```java
@RequestMapping(value = "/index/{id}")
public ModelAndView index(@PathVariable String id){
    System.out.println("接受到请求参数："+username);
    return new ModelAndView("index");
}
```



请求参数传递给一个实体类

> 注意必须携带set方法或是构造方法中包含所有参数，请求参数会自动根据类中的字段名称进行匹配

```java
@Data
public class User {
    String username;
    String password;
}

@RequestMapping(value = "/index")
public ModelAndView index(User user){
    System.out.println("获取到cookie值为："+user);
    return new ModelAndView("index");
}
```



#### 处理会话

通过使用`@CookieValue`注解，可以快速获取请求携带的Cookie信息

```java
@RequestMapping(value = "/index")
public ModelAndView index(HttpServletResponse response,
                          @CookieValue(value = "test", required = false) String test){
    System.out.println("获取到cookie值为："+test);
    response.addCookie(new Cookie("test", "lbwnb"));
    return new ModelAndView("index");
}
```

通过使用`@@SessionAttribute`注解，可以快速获取请求携带的Session信息

```java
@RequestMapping(value = "/index")
public ModelAndView index(@SessionAttribute(value = "test", required = false) String test,
                          HttpSession session){
    session.setAttribute("test", "xxxx");
    System.out.println(test);
    return new ModelAndView("index");
}
```



### 5.2 响应处理

| 注解              | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| `@ResponseBody`   | 将java对象转为json格式的                                     |
| `@RestController` | `@Controller`+`@ResponseBody`的组合注解，表示是RESTful风格的控制器 |



#### JSON数据格式



它直接包括了属性的名称和属性的值，与JavaScript的对象极为相似，它到达前端后，可以直接转换为对象，以对象的形式进行操作和内容的读取，相当于以字符串形式表示了一个JS对象，我们可以直接在控制台窗口中测试：

我们后端就可以以JSON字符串的形式向前端返回数据，这样前端在拿到数据之后，就可以快速获取，非常方便。

JSON解析框架有很多种，比较常用的是Jackson和FastJSON，这里我们使用阿里巴巴的FastJSON进行解析，这是目前号称最快的JSON解析框架，并且现在已经强势推出 FastJSON2 版本。

导入以下依赖

```xml
<dependency>
      <groupId>com.alibaba.fastjson2</groupId>
      <artifactId>fastjson2</artifactId>
      <version>2.0.34</version>
</dependency>
```

JSONObject和Map的使用方法一样，并且是有序的

```java
@RequestMapping(value = "/index")
public String index(){
    JSONObject object = new JSONObject();
    object.put("name", "杰哥");
    object.put("age", 18);
    System.out.println(object.toJSONString());   //以JSON格式输出JSONObject字符串
    return "index";
}

// {"name": "杰哥", "age": 18}
```

JSONArray表示一个数组，用法和List一样，数组中可以嵌套其他的JSONObject或是JSONArray。

```java
@RequestMapping(value = "/index")
public String index(){
    JSONObject object = new JSONObject();
    object.put("name", "杰哥");
    object.put("age", 18);
    JSONArray array = new JSONArray();
    array.add(object);
    System.out.println(array.toJSONString());
    return "index";
}
//[{"name": "杰哥", "age": 18}]
```

当出现循环引用时，会按照以下语法来解析

| 语法                               | 描述           |
| ---------------------------------- | -------------- |
| `{"$ref":"$"}`                     | 引用根对象     |
| `{"$ref":"@"}`                     | 引用自己       |
| `{"$ref":".."}`                    | 引用父对象     |
| `{"$ref":"../.."}`                 | 引用祖父对象   |
| `{"$ref":"$.members[0].reportTo"}` | 基于路径的引用 |



实体类转换为JSON格式

```java
@RequestMapping(value = "/index", produces = "application/json")
@ResponseBody
public String data(){
    Student student = new Student();
    student.setName("杰哥");
    student.setAge(18);
    return JSON.toJSONString(student);
}
```



#### 响应 JSON 数据

SpringMVC可以将对象类型自动转换为JSON字符串格式

```java
@RequestMapping(value = "/data", produces = "application/json")
@ResponseBody
public Student data(){
    Student student = new Student();
    student.setName("杰哥");
    student.setAge(18);
    return student;
}
```

注意需要在配置类中添加一下FastJSON转换器，这里需要先添加一个依赖：

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2-extension-spring6</artifactId>
    <version>2.0.34</version>
</dependency>
```

然后编写配置：

```java
@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    converters.add(new FastJsonHttpMessageConverter());
}
```

### 5.3 重定向和请求转发

在视图名称前面添加`redirect:`前缀,即可重定向

```java
@RequestMapping("/index")
public String index(){
    return "redirect:home";
}

@RequestMapping("/home")
public String home(){
    return "home";
}
```



在视图名称前面添加`forward:`前缀,即可请求转发

```java
@RequestMapping("/index")
public String index(){
    return "forward:home";
}

@RequestMapping("/home")
public String home(){
    return "home";
}
```

### 六、拦截器

拦截器是整个SpringMVC的一个重要内容，拦截器与过滤器类似，都是用于拦截一些非法请求，但是我们之前讲解的过滤器是作用于Servlet之前，只有经过层层的过滤器才可以成功到达Servlet，而拦截器并不是在Servlet之前，它在Servlet与RequestMapping之间，相当于DispatcherServlet在将请求交给对应Controller中的方法之前进行拦截处理，它只会拦截所有Controller中定义的请求映射对应的请求（不会拦截静态资源），这里一定要区分两者的不同。

#### 创建拦截器

创建一个拦截器需要实现`HandlerInterceptor`接口

> 如果处理过程中抛出异常，那么久不会执行处理后`postHandle`方法，但是会执行`afterCompletion`方法，我们可以在此方法中获取到抛出的异常。

```java
public class MainInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("我是处理之前！");
        return true;   //只有返回true才会继续，否则直接结束
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("我是处理之后！");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
      	//在DispatcherServlet完全处理完请求后被调用
        System.out.println("我是完成之后！");
    }
}
```

接着我们需要在配置类中进行注册

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new MainInterceptor())
      .addPathPatterns("/**")    //添加拦截器的匹配路径，只要匹配一律拦截
      .excludePathPatterns("/home");   //拦截器不进行拦截的路径
}
```

得到整理拦截器的执行顺序

```
我是处理之前！
我是处理！
我是处理之后！
我是完成之后！
```



#### 多级拦截器

如果存在多个拦截器会如何执行，我们以同样的方式创建二号拦截器

> 如果一号拦截器在处理前就返回了false，一、二号拦截器都不会起作用。

```java
public class SubInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("二号拦截器：我是处理之前！");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("二号拦截器：我是处理之后！");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("二号拦截器：我是完成之后！");
    }
}
```

注册二号拦截器

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
  	//一号拦截器
    registry.addInterceptor(new MainInterceptor()).addPathPatterns("/**").excludePathPatterns("/home");
  	//二号拦截器
    registry.addInterceptor(new SubInterceptor()).addPathPatterns("/**");
}
```

注意拦截顺序就是注册的顺序，因此拦截器会根据注册顺序依次执行

和多级Filter相同，在处理之前，是按照顺序从前向后进行拦截的，但是处理完成之后，就按照倒序执行处理后方法，而完成后是在所有的`postHandle`执行之后再同样的以倒序方式执行。

```
一号拦截器：我是处理之前！
二号拦截器：我是处理之前！
我是处理！
二号拦截器：我是处理之后！
一号拦截器：我是处理之后！
二号拦截器：我是完成之后！
一号拦截器：我是完成之后！
```



## 七、文件上传下载

### 7.1 实现文件上传

在MainInitializer中添加一个新的方法

```java
public class MainInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    ...

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
      	// 直接通过registration配置Multipart相关配置，必须配置临时上传路径，建议选择方便打开的
        // 同样可以设置其他属性：maxFileSize, maxRequestSize, fileSizeThreshold
        registration.setMultipartConfig(new MultipartConfigElement("/Users/nagocoler/Download"));
    }
}
```

接着我们直接编写Controller即可

```java
@RequestMapping(value = "/upload", method = RequestMethod.POST)
@ResponseBody
public String upload(@RequestParam MultipartFile file) throws IOException {
    File fileObj = new File("test.png");
    file.transferTo(fileObj);
    System.out.println("用户上传的文件已保存到："+fileObj.getAbsolutePath());
    return "文件上传成功！";
}
```

最后在前端添加一个文件的上传点

```html
<div>
    <form action="upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit">
    </form>
</div>
```

### 7.2 实现文件下载

使用HttpServletResponse，并向输出流中传输数据即可。

```java
@RequestMapping(value = "/download", method = RequestMethod.GET)
@ResponseBody
public void download(HttpServletResponse response){
    response.setContentType("multipart/form-data");
    try(OutputStream stream = response.getOutputStream();
        InputStream inputStream = new FileInputStream("test.png")){
        IOUtils.copy(inputStream, stream);
    }catch (IOException e){
        e.printStackTrace();
    }
}
```

在前端页面中添加一个下载点

```html
<a href="download" download="test.png">下载最新资源</a>
```

## 八、参考三三

- [Java 全栈知识体系](https://pdai.tech/)

- 
