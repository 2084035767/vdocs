# 三、控制器

SpringMVC使用`DispatcherServlet`替代Tomcat为我们提供的默认的静态资源Servlet，也就是说，现在所有的请求（除了jsp，因为Tomcat还提供了一个jsp的Servlet）都会经过`DispatcherServlet`进行处理。





我们的请求到达Tomcat服务器之后，会交给当前的Web应用程序进行处理，而SpringMVC使用`DispatcherServlet`来处理所有的请求，也就是说它被作为一个统一的访问点，所有的请求全部由它来进行调度。

当一个请求经过`DispatcherServlet`之后，会先走`HandlerMapping`，它会将请求映射为`HandlerExecutionChain`，依次经过`HandlerInterceptor`有点类似于之前我们所学的过滤器，不过在SpringMVC中我们使用的是拦截器，然后再交给`HandlerAdapter`，根据请求的路径选择合适的控制器进行处理，控制器处理完成之后，会返回一个`ModelAndView`对象，包括数据模型和视图，通俗的讲就是页面中数据和页面本身（只包含视图名称即可）。

返回`ModelAndView`之后，会交给`ViewResolver`（视图解析器）进行处理，视图解析器会对整个视图页面进行解析，SpringMVC自带了一些视图解析器，但是只适用于JSP页面，我们也可以像之前一样使用Thymeleaf作为视图解析器，这样我们就可以根据给定的视图名称，直接读取HTML编写的页面，解析为一个真正的View。

解析完成后，就需要将页面中的数据全部渲染到View中，最后返回给`DispatcherServlet`一个包含所有数据的成形页面，再响应给浏览器，完成整个过程。

因此，实际上整个过程我们只需要编写对应请求路径的的Controller以及配置好我们需要的ViewResolver即可，之后还可以继续补充添加拦截器，而其他的流程已经由SpringMVC帮助我们完成了。

## 3.1 配置视图解析器和控制器

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



## Bean的Web作用域

在学习Spring时我们讲解了Bean的作用域，包括`singleton`和`prototype`，Bean分别会以单例和多例模式进行创建，而在SpringMVC中，它的作用域被继续细分

- `request`：对于每次HTTP请求，使用request作用域定义的Bean都将产生一个新实例，请求结束后Bean也消失。
- `session`：对于每一个会话，使用session作用域定义的Bean都将产生一个新实例，会话过期后Bean也消失。
- `global session`：<Badge text="不常用" type="danger"/> 仅了解。

| 注解            | 描述                |
| --------------- | ------------------- |
| `@RequestScope` | Bean的request作用域 |
| `@SessionScope` | Bean的session作用域 |


