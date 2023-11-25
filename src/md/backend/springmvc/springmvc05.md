# 五、数据处理

## 5.1 请求处理

| 注解                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| `@RequestMapping`   | 用于将任意HTTP 请求映射到控制器方法，可以在控制器类上和控制器类中的方法上使用。 |
| `@RequestParam`     | 用于将请求参数绑定到方法的参数上。可以用来获取请求中的查询参数或表单参数。 |
| `@RequestHeader`    | 用于将请求头信息绑定到方法的参数上。可以用来获取特定的请求头信息。 |
| `@PathVariable`     | 用于将URL路径中的变量绑定到方法的参数上。可以用来获取RESTful风格的URL中的路径参数。 |
| `@CookieValue`      | 用于将请求中的Cookie值绑定到方法的参数上。可以用来获取特定的Cookie值。 |
| `@SessionAttrbutie` | 用于将Session中的属性值绑定到方法的参数上。可以用来获取Session中存储的属性值。 |



### 处理请求

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

### 参数处理

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



### 处理会话

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



## 5.2 响应处理

| 注解              | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| `@ResponseBody`   | 将java对象转为json格式的                                     |
| `@RestController` | `@Controller`+`@ResponseBody`的组合注解，表示是RESTful风格的控制器 |



### JSON数据格式



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



### 响应 JSON 数据

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

## 5.3 重定向和请求转发

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
