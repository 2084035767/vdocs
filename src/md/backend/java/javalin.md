!> 根据 Javalin 官方文档编写

## 一、 Javalin 简介

### 1.1 什么是 Javalin？

Javalin 是一个轻量级的 Java Web 框架，用于构建高性能且易于维护的 Web 应用程序和 RESTful API。Javalin 具有简单、直观的 API，并支持 Kotlin 和 Java 8+。它使用 Jetty 服务器作为默认的嵌入式 Web 服务器，但也可以与其他服务器集成。Javalin 提供了许多便利的功能，例如 WebSocket 支持、静态文件服务、模板引擎集成、过滤器和拦截器等。Javalin 还具有可扩展的插件体系结构，允许开发人员轻松地根据自己的需求扩展框架功能。

### 1.2 Javalin 的历史和背景

Javalin 的历史可以追溯到 2017 年，当时它是由两个瑞典开发人员 Tobias 和 Emil 创建的。他们旨在为 Java 和 Kotlin 开发人员提供一种轻量级、易于使用的 Web 框架，以加快 Web 应用程序和 RESTful API 的开发速度。最初，Javalin 是作为一个小型库来构建的，但后来随着越来越多的特性被添加，它逐渐成长为一个完整的 Web 框架。

Javalin 的设计受到了其他流行的 Web 框架的影响，如 Spark 和 Ktor。但与这些框架不同的是，Javalin 专注于提供简单、直观的 API，并保持轻量级和高性能。在过去几年中，Javalin 已经逐渐赢得了越来越多的用户和支持者，成为了 Java 和 Kotlin 社区中备受欢迎的 Web 框架之一。

### 1.3 Javalin 的特点

Javalin 是一个轻量级的 Java Web 框架，具有以下特点：

1. 简单易用：Javalin 提供了简单、直观的 API，使得开发 Web 应用程序和 RESTful API 变得容易。

2. 高性能：Javalin 内置 Jetty 服务器，并使用异步 IO 处理请求，因此可以获得出色的性能表现。

3. 轻量级：Javalin 的核心库非常小，因此可以快速启动和运行，不会占用太多资源。

4. Kotlin 和 Java 8+支持：Javalin 完全支持 Kotlin，并且对 Java 8 及以上版本也提供了良好的支持。

5. 可扩展的插件体系结构：Javalin 支持可扩展的插件体系结构，开发人员可以根据自己的需求轻松地添加功能。

6. WebSocket 支持：Javalin 内置 WebSocket 支持，使得实现双向通信变得容易。

7. 静态文件服务：Javalin 可以将静态文件（如图像、CSS 和 JavaScript 文件）直接映射到 URL 路径。

8. 安全性：Javalin 提供了许多安全性功能，例如 CSRF 保护、XSS 防御和 HTTP 头部控制等。

总之，Javalin 是一款快速、简单、轻量级且易于使用的 Java Web 框架，适用于开发 RESTful API 和 Web 应用程序。

> 以上由 chatGPT 生成

## 二、 安装和初使用

### 2.1 安装 Javalin 依赖



::: tabs#javalin

@tab Gradle

```gradle
implementation("io.javalin:javalin:5.5.0")
```

@tab Maven

```XML
<dependency>
    <groupId>io.javalin</groupId>
    <artifactId>javalin</artifactId>
    <version>5.5.0</version>
</dependency>
```

:::

### 2.2 开始一个简单的 Javalin 应用程序

```java
import io.javalin.Javalin;

public class HelloWorld {
    public static void main(String[] args) {
       // 创建 Javalin 实例
      Javalin app = Javalin.create();
      // 配置路由和处理器
        app.get("/", ctx -> ctx.result("Hello World"));
      // 启动应用程序
        app.start(7000);

      //链式
        var app = Javalin.create(/*config*/)
            .get("/", ctx -> ctx.result("Hello World"))
            .start(7070);
    }
}
```

在 Javalin 中，`ctx`是 Context 的缩写，它是处理 HTTP 请求和响应的对象，封装了请求和响应的信息。您可以在处理器函数中使用 `ctx` 对象来访问请求参数、请求头、请求体、响应头等信息，并且可以使用它来设置响应内容、状态码、响应头等信息，以及进行重定向、异常处理等操作。

在 `Javalin.create(/*config*/)` 中，`/*config*/` 是一个注释，用于表示此处可以传入一个配置对象。您可以在注释中添加一些说明信息，例如指定配置对象应该包含哪些配置选项、如何设置它们等。当您在使用 Javalin 时，可以选择是否需要提供一个配置对象，或者使用默认的配置选项。

## 三、 基础知识

### 3.1 路由

路由方法的语法如下：

```java
app.METHOD(PATH, HANDLER);
```

其中，`METHOD` 是 HTTP 请求方法（GET、POST、PUT、DELETE 等），`PATH` 是路由路径，`HANDLER` 是要执行的请求处理程序。

Javalin 支持多种路由定义方式：

1. 使用 Lambda 表达式：这是处理请求的最简单方式。例如：

```java
app.get("/output", ctx -> {
    // some code
    ctx.json(object);
});
```

2. 使用方法引用：你可以将请求处理方法作为参数传递给路由方法。例如：

```java
//以下是一个包含 handleRequest 方法的类：
import io.javalin.http.Context;

public class MyController {

    public void handleRequest(Context ctx) {
        // 处理请求的代码
    }
}


//作为 GET 路由的处理程序
Javalin app = Javalin.create().start(8080);
MyController controller = new MyController();
app.get("/", controller::handleRequest);

//这里将 controller.handleRequest 作为参数传递给了路由方法 app.get，使得当接收到 GET 请求时，Javalin 就会自动调用 controller.handleRequest 方法来处理该请求。
```

3. 使用匿名类：你可以创建一个实现 Handler 接口的匿名类来处理请求。例如：

```java
app.get("/", new Handler() {
  @Override
  public void handle(Context ctx) {
    ctx.result("Hello World");
  }
});
```

最常用第一种方式，简单，快捷：

```java
//普通路由
app.get("/output", ctx -> {
    // some code
    ctx.json(object);
});
//带参路由
//ctx.pathParam("key") 获取路径参数
app.get("/hello/{name}", ctx -> { // {} 语法不允许斜杠 （'/'） 作为参数的一部分
    ctx.result("Hello: " + ctx.pathParam("name"));
});

app.get("/hello/<name>", ctx -> { // <>语法允许斜杠 （'/'） 作为参数的一部分
    ctx.result("Hello: " + ctx.pathParam("name"));
});

//通配符参数
//ctx.matchedPath() 获取已匹配路径
app.get("/path/*", ctx -> { // 将匹配以 /path/ 开头的任何内容
    ctx.result("You are here because " + ctx.path() + " matches " + ctx.matchedPath());
});

//！但是，您不能提取通配符的值。如果您需要此行为，请使用斜杠接受路径参数（<param-name>）而不是{param-name}
```

### 3.2 RESTful API 请求

```java
//GET请求
app.get("/resp", ctx -> {
    // some code
    ctx.json(object);
});

//POST请求
app.post("/resp", ctx -> {
    // some code
    ctx.json(object);
});

//PUT请求
app.put("/resp", ctx -> {
    // some code
    ctx.json(object);
});

//DELETE请求
app.delete("/resp", ctx -> {
    // some code
    ctx.json(object);
});
```

### 3.3 处理程序（处理器）

Javalin 具有三种主要的处理程序类型：前处理程序、端点处理程序和后处理程序。（还有异常处理程序和错误处理程序）

前处理程序、端点处理程序和后处理程序需要三个部分：

- 一个动词，以下之一：`before`, `get`, `post`, `put`, `patch`, `delete`, `after` (…… `head`, `options`, `trace`, `connect`)
- 路径，例如：`/`, `/hello-world`,`/hello/{name}`
- 处理程序实现，例如`ctx -> { ... }`等

`Handler`接口的返回类型是`void`。您可以使用`ctx.result(result)`、`ctx.json(obj)`或`ctx.future(future)`等方法来设置响应并将其返回给用户。

#### 前处理程序

前处理程序会在每个请求（包括静态文件）之前匹配。

您可能知道前置处理程序是来自其他库的过滤器、拦截器或中间件。

```java
app.before(ctx -> {
    // 在所有请求前运行
});

app.before("/path/*", ctx -> {
    // 在请求到/path/*前运行
});
复制
```

#### 端点处理程序

端点处理程序是主要的处理程序类型，并定义了您的 API。您可以将 GET 处理程序添加到服务器数据到客户端，或添加 POST 处理程序以接收一些数据。直接在类上支持常用方法`Javalin`（GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS），不常见的操作（TRACE、CONNECT）通过`Javalin#addHandler`.

端点处理程序按照它们定义的顺序进行匹配。

您可能知道端点处理程序是来自其他库的路由或中间件。

#### 处理程序后

后处理程序在每个请求后运行（即使发生异常）

您可能知道后处理程序是来自其他库的过滤器、拦截器或中间件。

```java
app.after(ctx -> {
    // 在所有请求后运行
});

app.after("/path/*", ctx -> {
    //在请求到/path/*后运行
});
```

### 3.4 处理器分组

您可以使用 `routes()` 和 `path()` 方法对您的端点进行分组。`routes()` 创建一个临时静态 Javalin 实例，因此您可以在处理程序之前跳过 `app.` 前缀。这等同于调用 `ApiBuilder.get(app, ...)`，它转换为 `app.get(...)`。它不是一个全局单例，不持有任何信息，因此您可以安全地在多个位置和多个线程中使用它。

您可以使用 `import static io.javalin.apibuilder.ApiBuilder.*` 导入所有 HTTP 方法。

```java
app.routes(() -> {
    path("users", () -> {
        get(UserController::getAllUsers);
        post(UserController::createUser);
        path("{id}", () -> {
            get(UserController::getUser);
            patch(UserController::updateUser);
            delete(UserController::deleteUser);
        });
      //WebSockets 此文不涉及
        ws("events", UserController::webSocketEvents);
    });
    path("name", () -> {
        get(NameController::getName);
        post(NameController::setName);
    });
});
```

注意，`path()` 会在路径前面添加 `/`（如果您不自己添加）。 这意味着 `path("api", ...)` 和 `path("/api", ...)` 是等价的。

### Crud 处理器

Crud 处理器 接口提供了一种简单的方法来实现基本的 CRUD（创建、读取、更新、删除）操作，并将这些操作添加到 Javalin 应用程序的路由中。通过将 Crud 处理器 接口与 `routes()` 方法结合使用，我们可以轻松地将 RESTful 资源与具体的业务逻辑进行分离，并使代码更容易维护和扩展。

当请求到达路由时，Javalin 会根据请求的 HTTP 方法和 URL，自动调用 Crud 处理器 接口中相应的方法（如 getAll、create、getOne、update 和 delete），并将请求的参数传递给这些方法。然后，接口的实现者可以根据传入的参数执行相应的业务逻辑，并返回一个响应对象，以便 Javalin 将其发送回客户端

`CrudHandler`是一个接口，可以在`routes()`调用中使用：

```java
app.routes(() -> {
    crud("users/{user-id}", new UserController());
});
```

它实现了五个最常见的 crud 操作：

```kotlin
interface CrudHandler {
    getAll(ctx)
    getOne(ctx, resourceId)
    create(ctx)
    update(ctx, resourceId)
    delete(ctx, resourceId)
}
```

### 3.5 上下文

该`Context`对象为您提供了处理 http 请求所需的一切。它包含底层的 `servlet-request` 和 `servlet-response`，以及一堆 `getter`和 `setter`。

```java
// 请求方法
body()                                // 请求体作为字符串
bodyAsBytes()                         // 请求体作为字节数组
bodyAsClass(clazz)                    // 请求体反序列化为指定类的对象（从 JSON 反序列化）
bodyStreamAsClass(clazz)              // 请求体反序列化为指定类的对象，内存占用更少（与 bodyAsClass 类似）
bodyValidator(clazz)                  // 请求体验证器，类型为指定类
bodyInputStream()                     // 请求体的底层输入流
uploadedFile("name")                  // 按名称获取上传的文件
uploadedFiles("name")                 // 按名称获取所有上传的文件
uploadedFiles()                       // 获取所有上传文件的列表
uploadedFileMap()                     // 以“文件名为键”的形式获取所有上传的文件列表
formParam("name")                     // 按名称获取表单参数，作为字符串
formParamAsClass("name", clazz)       // 按名称获取表单参数，作为验证器并转换成指定类对象
formParams("name")                    // 按名称获取所有表单参数的列表
formParamMap()                        // 获取所有表单参数的映射
pathParam("name")                     // 按名称获取路径参数，作为字符串
pathParamAsClass("name", clazz)       // 按名称获取路径参数，作为验证器并转换成指定类对象
pathParamMap()                        // 获取所有路径参数的映射
basicAuthCredentials()                // 基本身份验证凭据（如果没有设置，则返回 null）
attribute("name", value)              // 在请求上设置属性
attribute("name")                     // 获取请求上的属性
attributeOrCompute("name", ctx -> {}) // 如果不存在，则获取请求上的属性或根据上下文计算它
attributeMap()                        // 获取请求上所有属性的映射
contentLength()                       // 获取请求体内容长度
contentType()                         // 获取请求的内容类型
cookie("name")                        // 按名称获取请求 cookie
cookieMap()                           // 获取所有请求 cookie 的映射
header("name")                        // 按名称获取请求头（可以与 Header.HEADERNAME 一起使用）
headerAsClass("name", clazz)          // 按名称获取请求头，作为验证器并转换成指定类对象
headerMap()                           // 获取所有请求头的映射
host()                                // 获取主机名作为字符串
ip()                                  // 获取 IP 地址作为字符串
isMultipart()                         // 如果请求是多部分请求，则返回 true
isMultipartFormData()                 // 如果请求是 multipart/formdata 类型，则返回 true
method()                              // 获取请求方法（GET、POST 等）
path()                                // 获取请求路径
port()                                // 获取请求端口号
protocol()                            // 获取请求协议
queryParam("name")                    // 按名称获取查询参数，作为字符串
queryParamAsClass("name", clazz)      // 按名称获取查询参数，作为验证器并转换成指定类对象
queryParams("name")                   // 按名称列出查询参数列表
queryParamMap()                       // 所有查询参数的映射
queryString()                         // 完整的查询字符串
scheme()                              // 请求方案
sessionAttribute("name", value)       // 设置会话属性
sessionAttribute("name")              // 获取会话属性
consumeSessionAttribute("name")       // 获取会话属性，并将值设置为null
cachedSessionAttribute("name", value) // 设置会话属性，并缓存该值作为请求属性
cachedSessionAttribute("name")        // 获取会话属性，并将值缓存为请求属性
cachedSessionAttributeOrCompute(...)  // 与上面相同，但如果值不存在，则计算并设置
sessionAttributeMap()                 // 所有会话属性的映射
url()                                 // 请求的URL
fullUrl()                             // 请求的URL加上查询字符串
contextPath()                         // 请求的上下文路径
userAgent()                           // 请求的用户代理
req()                                 // 获取底层的HttpServletRequest

// 响应方法
result("result")                      // 将结果流设置为指定的字符串（覆盖任何先前设置的结果）
result(byteArray)                     // 将结果流设置为指定的字节数组（覆盖任何先前设置的结果）
result(inputStream)                   // 将结果流设置为指定的输入流（覆盖任何先前设置的结果）
future(futureSupplier)                // 将结果设置为一个future，参见异步部分（覆盖任何先前设置的结果）
writeSeekableStream(inputStream)      // 立即将内容作为可寻址流写入（适用于音频和视频）
result()                              // 将当前结果流作为字符串返回（如果可能），并重置结果流
resultInputStream()                   // 获取当前结果流
contentType("type")                   // 设置响应内容类型
header("name", "value")               // 按名称设置响应头（可与Header.HEADERNAME一起使用）
redirect("/path", code)               // 重定向到给定路径，并指定状态代码
status(code)                          // 设置响应状态代码
status()                              // 获取响应状态代码
cookie("name", "value", maxAge)       // 按名称设置响应cookie，带有值和最大年龄（可选）。
cookie(cookie)                        // 使用Javalin Cookie类设置cookie
removeCookie("name", "/path")         // 按名称和路径（可选）删除cookie
json(obj)                             // 调用result(jsonString)，并将内容类型设置为json
jsonStream(obj)                       // 调用result(jsonStream)，并将内容类型设置为json
html("html")                          // 调用result(string)，并将内容类型设置为html
render("/template.tmpl", model)       // 调用html(renderedTemplate)
res()                                 // 获取底层的HttpServletResponse

// 其他方法
async(runnable)                       // 将请求移出Jetty的线程池，并将其移动到Javalin的AsyncThreadPool中
handlerType()                         // 当前处理程序的处理程序类型（BEFORE、AFTER、GET等）
appAttribute("name")                  // 获取Javalin实例上的属性。请参见下面的应用程序属性部分
matchedPath()                         // 获取用于匹配此请求的路径（例如，“/hello/{name}”）
endpointHandlerPath()                 // 获取用于匹配此请求的端点处理程序的路径
cookieStore()                         // 请参见下面的cookie存储部分
```

也可以转换`Context`为内部 Javalin 实现。

### 3.6 Cookie Store

该类`CookieStore`提供了一种在处理程序、请求甚至服务器之间共享信息的便捷方式：

```java
ctx.cookieStore().set(key, value); // 存储任何类型的值到cookie存储
ctx.cookieStore().get(key);        // 读取任何类型的值从cookie存储
ctx.cookieStore().clear();         // 清除cookie存储
```

cookieStore 的工作原理如下：

1. 第一个匹配传入请求的处理程序将使用当前存储在 cookie 中的数据填充 cookie 存储映射（如果有）。
2. 这个映射现在可以作为同一个请求周期内处理程序之间的状态使用，基本上与 ctx.attribute() 的使用方式相同。
3. 在请求周期结束时，cookie 存储映射被序列化、base64 编码，并作为一个 cookie 写入响应。这允许您在请求和服务器之间共享映射（如果您在负载均衡器后运行多个服务器）。

```java
serverOneApp.post("/cookie-storer", ctx -> {
    ctx.cookieStore().set("string", "Hello world!");
    ctx.cookieStore().set("i", 42);
    ctx.cookieStore().set("list", Arrays.asList("One", "Two", "Three"));
});

serverTwoApp.get("/cookie-reader", ctx -> { // 运行在与serverOneApp不同的服务器上
    String string = ctx.cookieStore().get("string")
    int i = ctx.cookieStore().get("i")
    List<String> list = ctx.cookieStore().get("list")
});
```

由于客户端存储了 cookie，因此对 serverTwoApp 的 GET 请求将能够检索从 serverOneApp POST 传递的信息。

请注意，cookie 的最大大小为 4kb

### 3.7 请求生命周期

```java
Javalin#before              // 首先运行，可以抛出异常（这将跳过任何端点处理程序）
Javalin#get/post/patch/etc  // 第二运行，可以抛出异常
Javalin#error               // 第三运行，可抛出异常
Javalin#after               // 第四运行，可抛出异常
Javalin#exception           // 在处理程序抛出的任何时候运行（不能抛出异常）
JavalinConfig#requestLogger // 在响应被写入客户端后运行
JavalinConfig#accessManager // 在你选择的lambda中包装你所有的端点处理程序
```

## 四、进阶知识

### 4.1 验证

#### 4.1.1 验证器

您可以使用 Javalin 的 Validator 类来验证查询、表单和路径参数，以及标头和请求正文：

```java
ctx.queryParamAsClass("paramName", MyClass.class)   // 为 queryParam("paramName") 的值创建一个 Validator<MyClass>
ctx.formParamAsClass("paramName", MyClass.class)    // 为 formParam("paramName") 的值创建一个 Validator<MyClass>
ctx.pathParamAsClass("paramName", MyClass.class)    // 为 pathParam("paramName") 的值创建一个 Validator<MyClass>
ctx.headerAsClass("headerName", MyClass.class)      // 为 header("paramName") 的值创建一个 Validator<MyClass>
ctx.bodyValidator(MyClass.class)                    // 为 body() 的值创建一个 Validator<MyClass>
```

您还可以通过 Validator.create(clazz, value, fieldName) 手动创建自己的验证器。

#### 4.1.2 验证器 API

```java
allowNullable()                     // 将 Validator 转换为 NullableValidator（必须首先调用）
check(predicate, "error")           // 向 Validator 添加带有 ValidationError("error") 的检查
check(predicate, validationError)   // 向 Validator 添加带有 ValidationError 的检查（可以有本地化参数）
get()                               // 将已验证的值作为指定类型返回，或抛出 ValidationException
getOrThrow(exceptionFunction)       // 将已验证的值作为指定类型返回，或抛出自定义异常
getOrDefault()                      // 如果值为 null，则返回默认值，否则调用 get()
errors()                            // 获取 Validator 的所有错误（作为 map("fieldName"，List<ValidationError>)）
```

#### 4.2.3 验证示例

```java
验证一个带有默认值的查询参数
Integer myValue = ctx.queryParamAsClass("value", Integer.class).getOrDefault(788) // 验证 value
ctx.result(value) // 将已验证的值返回给客户端
// 获取 ?value=a 会导致 HTTP 400 - {"my-qp"[{"message":"TYPE_CONVERSION_FAILED","args":{},"value":"a"}]}
// 获取 ?value=1 会导致 HTTP 200 - 1（已验证的值）
// 获取 ? 会导致 HTTP 200 - 788（默认值）
// 验证两个相关的查询参数

Instant fromDate = ctx.queryParamAsClass("from", Instant.class).get();
Instant toDate = ctx.queryParamAsClass("to", Instant.class)
  .check(it -> it.isAfter(fromDate), "'to' has to be after 'from'")
  .get();

// 验证 JSON 正文
MyObject myObject = ctx.bodyValidator(MyObject.class)
  .check(obj -> obj.myObjectProperty == someValue, "THINGS_MUST_BE_EQUAL")
  .get();

// 使用自定义 ValidationError 进行验证
ctx.queryParamAsClass("param", Integer.class)
  .check({ it > 5 }, new ValidationError("OVER_LIMIT", Map.of("limit", 5)))
  .get();
// 获取 ?param=10 会导致 HTTP 400 - {"param":[{"message":"OVER_LIMIT","args":{"limit":5},"value":10}]}
```

#### 4.2.4 收集多个错误

```java
Validator<Integer> ageValidator = ctx.queryParamAsClass("age", Integer.class)
.check(n -> !n.contains("-"), "ILLEGAL_CHARACTER")

// 如果没有错误，则为空映射，否则为键为“age”的映射，其中包含列表中的失败检查消息。
Map<String, List<Integer>> errors = ageValidator.errors();

// 将所有验证器中的所有错误合并。如果没有错误存在，则为空映射。
Map<String, List<Object>> manyErrors=
  JavalinValidation.collectErrors(ageValidator, otherValidator, ...)
```

#### 4.2.5 验证异常

```java
// 当 Validator 抛出时，它将被映射为：
app.exception(ValidationException::class.java) { e, ctx ->
ctx.json(e.errors).status(400)
}

// 您可以通过以下方式覆盖它：
app.exception(ValidationException.class, (e, ctx) -> {
// 您的代码
});
```

#### 4.2.6 自定义转换器

如果需要验证非包含类，则必须注册自定义转换器：

```java
JavalinValidation.register(Instant.class, v -> Instant.ofEpochMilli(v.toLong());
```

#### 4.2.7 访问管理器

Javalin 有一个函数接口 AccessManager，它允许您设置每个端点的身份验证和/或授权。使用 before-handlers 也很常见，但强制执行每个端点角色会给您更加明确和易读的代码。您可以根据自己的需求实现访问管理器。以下是一个示例实现：

```java
// 设置 Javalin 应使用的访问管理器
config.accessManager((handler, ctx, routeRoles) -> {
  MyRole userRole = getUserRole(ctx);
  if (routeRoles.contains(userRole)) {
    handler.handle(ctx);
  }else { ctx.status(401).result("Unauthorized"); }
});

Role getUserRole(Context ctx) {
  // 基于请求确定用户角色。
  // 通常通过检查标头、Cookie 或用户会话来完成
}

enum Role implements RouteRole {
  ANYONE, ROLE_ONE, ROLE_TWO, ROLE_THREE; }

app.get("/un-secured", ctx -> ctx.result("Hello"), Role.ANYONE);
app.get("/secured", ctx -> ctx.result("Hello"), Role.ROLE_ONE);
```

访问管理器还将在 WebSocket 升级请求之前运行（如果您已将角色添加到端点），但请记住，WebSocket 的寿命很长，因此在 wsBefore 中执行检查可能是明智的。

如果要执行 less restricted 访问管理，您应该考虑使用 before 过滤器。

### 4.2 处理异常

#### 4.2.1 默认回复

Javalin 带有一个名为 的内置类`HttpResponseException`，可用于默认响应。如果客户端接受 JSON，则返回一个 JSON 对象。否则返回纯文本响应。

```java
app.post("/") { throw new ForbiddenResponse("Off limits!") }
```

如果客户端接受 JSON：

```java
{
    "title": "Off limits!",
    "status": 403,
    "type": "https://javalin.io/documentation#forbiddenresponse",
    "details": []
}
```

否则：

```txt
Plain Text Forbidden
```

`Map<String, String>`如果您愿意，可以包含详细信息。

- 重定向响应：返回带有默认标题的 302 Found`Redirected`响应。

- 错误的请求响应：返回带有默认标题的 400 Bad Request `Bad request` 响应。

- 未经授权的回应：返回带有默认标题的 401 Unauthorized `Unauthorized` 响应。

- 禁止响应：返回带有默认标题的 403 Forbidden `Forbidden` 响应。

- 未找到响应：返回带有默认标题的 404 Not Found `Not found` 响应。

- 方法不允许响应：返回带有默认标题的 405 Method Not Allowed `Method not allowed` 响应。

- 冲突反应：返回带有默认标题的 409 冲突 `Conflict` 响应。

- 消失的反应：返回带有默认标题的 410 Gone `Gone` 响应。

- 内部服务器错误响应：返回带有默认标题的 500 Internal Server Error `Internal server error` 响应。

- 不良网关响应：返回带有默认标题的 502 Bad Gateway `Bad gateway` 响应。

- 服务不可用响应：返回带有默认标题的 503 Service Unavailable `Service unavailable` 响应。

- 网关超时响应：返回带有默认标题的 504 网关超时 `Gateway timeout` 响应。

#### 4.2.2 异常映射

所有处理程序（before, endpoint, after, ws）都可以抛出`Exception` （以及 的任何子类`Exception`）。和`app.exception()`方法`app.wsException()`为您提供了一种处理这些异常的方法：

```java
// HTTP异常
app.exception(NullPointerException.class, (e, ctx) -> {
     // 在此处理空指针异常
});

app.exception(Exception.class, (e, ctx) -> {
    // 在此处理通用异常
    // 如果发现更具体的异常映射程序，则不会触发此处理程序
});

// WebSocket异常
app.wsException(NullPointerException.class, (e, ctx) -> {
    // 在此处理空指针异常
});

app.wsException(Exception.class, (e, ctx) -> {
    // 在此处理通用异常
    // 如果发现更具体的异常映射程序，则不会触发此处理程序
});
```

#### 4.2.3 错误映射

HTTP 错误映射类似于异常映射，但它对 HTTP 状态码而不是异常进行操作：

```java
Java app.error(404, ctx -> {
    ctx.result("Generic 404 message")
});
```

将它们一起使用是有意义的：

```java
app.exception(FileNotFoundException.class, (e, ctx) -> {
    ctx.status(404);
}).error(404, ctx -> {
    ctx.result("Generic 404 message")
});
```

您还可以在声明错误映射器时包含内容类型：

```java
app.error(404, "html" ctx -> {
    ctx.html("Generic 404 message")
});
```

例如，如果您想要一组用于 HTML 的错误处理程序和一组用于 JSON 的错误处理程序，这将很有用。

### 4.3 配置

您可以在创建 Javalin 的新实例时传递配置对象。Javalin 的配置分为多个子配置：

```java
Java Javalin.create(config -> {
    config.http             // 用于设置 etags、请求大小、超时等选项
        config.routing          // 用于设置上下文路径和斜杠处理方式的选项
        config.jetty            // 用于设置 Jetty 服务器的选项
        config.staticFiles      // 用于处理静态文件和 WebJars 的选项
        config.spaRoot          // 用于设置单页应用程序根目录的选项
        config.compression      // 用于设置 gzip、brotli 和禁用压缩的选项
        config.requestLogger    // 用于设置 HTTP 和 WebSocket 日志记录器的选项
        config.plugins          // 用于启用捆绑的插件或添加自定义插件的选项
        config.vue              // 用于设置 Vue 设置的选项，位于 /plugins/vue
        config.contextResolvers // 用于更改 Context 函数实现的选项
        config.accessManager()  // 配置访问管理器的方法
        config.jsonMapper()     // 配置 JSON 映射器的方法
        config.fileRenderer()   // 配置文件渲染器的方法
});
```

#### 4.3.1 压缩

"压缩"。它是一种技术，用于减少传输数据的大小，从而提高网络性能和响应速度。在 Javalin 中，你可以使用 Compression 来压缩 HTTP 响应，以减少网络带宽和提高客户端响应速度。

```java
Java Javalin.create(config -> {
    config.compression.custom(compressionStrategy);       // 设置自定义的 CompressionStrategy
    config.compression.brotliAndGzip(gzipLvl, brotliLvl); // 同时使用 gzip 和 brotli（可选级别）
    config.compression.gzipOnly(gzipLvl);                 // 仅使用 gzip（可选级别）
    config.compression.brotliOnly(brotliLvl);             // 仅使用 brotli（可选级别）
    config.compression.none();                            // 禁用压缩
});
```

#### 4.3.1 上下文解析器

中的一些方法`Context`可以通过`ContextResolvers`配置类进行配置：

```java
Java Javalin.create(config -> {
    config.contextResolver.ip = ctx -> "custom ip";           // 自定义 Context#ip() 方法的实现
    config.contextResolver.host = ctx -> "custom host";       // 自定义 Context#host() 方法的实现
    config.contextResolver.scheme = ctx -> "custom scheme";   // 自定义 Context#scheme() 方法的实现
    config.contextResolver.url = ctx -> "custom url";         // 自定义 Context#url() 方法的实现
    config.contextResolver.fullUrl = ctx -> "custom fullUrl"; // 自定义 Context#fullUrl() 方法的实现
});
```

#### 4.3.2 HTTP 配置

```java
Java Javalin.create(config -> {
    config.http.generateEtags = booleanValue;     // 是否为动态响应（非静态文件）生成 ETag
    config.http.prefer405over404 = booleanValue;  // 如果路径映射到不同的 HTTP 方法，则返回 405 而不是 404
    config.http.maxRequestSize = longValue;       // 可以在不使用 InputStream 的情况下访问的请求正文的最大大小
    config.http.defaultContentType = stringValue; // 默认的内容类型
    config.http.asyncTimeout = longValue;         // 异步请求的超时时间（毫秒）（0 表示没有超时）
});
```

#### 4.3.3 Jetty 配置

```java
Java Javalin.create(config -> {
    config.jetty.server(serverSupplier); // 设置 Javalin 运行的 Jetty Server
    config.jetty.sessionHandler(sessionHandlerSupplier); // 设置 Jetty 将用于会话的 SessionHandler
    config.jetty.contextHandlerConfig(contextHandlerConsumer); // 配置 Jetty 运行的 ServletContextHandler
    config.jetty.wsFactoryConfig(jettyWebSocketServletFactoryConsumer); // 配置 JettyWebSocketServletFactory
});
```

#### 4.3.4 多部分配置

ctrl+f 的关键字：FileUploadConfig

Javalin 使用标准的 servlet 文件上传处理来处理多部分请求。这允许配置每个单独文件的最大大小、整个请求的最大大小、通过内存上传处理的文件的最大大小以及上传文件超过此限制时要写入的缓存目录。

所有这些值都可以通过配置进行配置，如下所示

```java
Java Javalin.create(config -> {
    config.jetty.multipartConfig.cacheDirectory("c:/temp"); // 超出内存限制时用于写入文件的位置
    config.jetty.multipartConfig.maxFileSize(100, SizeUnit.MB); // 允许的最大单个文件大小
    config.jetty.multipartConfig.maxInMemoryFileSize(10, SizeUnit.MB); // 处理内存中的最大文件大小
    config.jetty.multipartConfig.maxTotalRequestSize(1, SizeUnit.GB); // 整个多部分请求的最大大小
});
```

#### 4.3.5 请求日志记录器配置

您可以通过调用 `config.requestLogger.http()` 方法来添加 HTTP 请求日志记录器。该方法接受一个 `Context` 对象和请求完成的毫秒数作为参数：

```java
Java Javalin.create(config -> {
    config.requestLogger.http((ctx, ms) -> {
        // 在这里记录日志
    });
});
```

您可以通过调用 `config.requestLogger.ws()` 方法来添加 WebSocket 日志记录器。该方法与普通的 `app.ws()` 调用接受相同的参数，并可用于记录所有类型的事件。下面的示例仅显示了 `onMessage`，但 `onConnect`、`onError` 和 `onClose` 都是可用的：

```java
Java app.create(config -> {
    config.requestLogger.ws(ws -> {
        ws.onMessage(ctx -> {
            System.out.println("Received: " + ctx.message());
        });
    });
});
```

记录器在端点的 WebSocket 处理程序之后运行。

#### 4.3.6 路由配置

```java
Java Javalin.create(config -> {
    config.routing.contextPath = stringValue; // 上下文路径（例如 '/blog'，如果您在子路径上托管应用程序，比如 'mydomain.com/blog'）
    config.routing.ignoreTrailingSlashes = booleanValue; // 将 '/path' 和 '/path/' 视为相同路径
    config.routing.treatMultipleSlashesAsSingleSlash = booleanValue; // 将 '/path//subpath' 和 '/path/subpath' 视为相同路径
});
```

#### 4.3.7 SPA 根目录配置

单页应用程序（SPA）模式类似于静态文件处理。它在端点匹配和静态文件处理之后运行。基本上是一个非常高级的 404 映射器，将任何 404 转换为指定的页面。您可以通过指定不同的根路径来为应用程序定义多个单页处理程序。

您可以通过使用 `config.spaRoot.addFile("/root", "/path/to/file.html")` 或 `config.spaRoot.addFile("/root", "/path/to/file.html", Location.EXTERNAL)` 方法来启用单页模式。

动态单页处理程序
您还可以使用处理程序来提供单页根目录（而不是静态文件）：

```java
Java config.spaRoot.addHandler("/root",  ctx -> {
    ctx.html(…);
});
```

#### 4.3.8 静态文件配置

您可以通过使用 `config.staticFiles.add("/directory", location)` 方法来启用静态文件服务。静态资源处理在端点匹配之后完成，这意味着您自己的 GET 端点具有更高的优先级。该过程如下所示：

```java
Plain Text run before-handlers run endpoint-handlers
    if no endpoint-handler found    run
        static-file-handlers
        if static-file-found
            static-file-handler sends response
            else        response is 404 run after-handlers
```

对于更高级的用例，Javalin 有一个`StaticFileConfig`类：

```java
Java Javalin.create(config -> {
    config.staticFiles.add(staticFiles -> {    staticFiles.hostedPath = "/";                   // 更改以在子路径上托管文件，如 '/assets'
                                           staticFiles.directory = "/public";              // 文件所在的目录
                                           staticFiles.location = Location.CLASSPATH;      // Location.CLASSPATH（jar）或 Location.EXTERNAL（文件系统）
                                           staticFiles.precompress = false;                // 是否应预压缩文件并将其缓存在内存中（优化）
                                           staticFiles.aliasCheck = null;                  // 您可以配置此选项以启用符号链接（= ContextHandler.ApproveAliases（））
                                           staticFiles.headers = Map.of(…);              // 将设置为文件的标头
                                           staticFiles.skipFileFunction = req -> false;    // 您可以使用此选项根据 HttpServletRequest 跳过目录中的某些文件
                                           staticFiles.mimeTypes.add(mimeType, ext);       // 您可以添加扩展名的自定义 MIME 类型
                                          });
});
```

您可以`config.staticFiles.add(...)`多次调用以设置多个处理程序。处理程序之间不共享任何配置。

WebJars 可以通过调用启用`config.staticFiles.enableWebjars()`，它们将在`/webjars/name/version/file.ext`。通过 NPM 可用的所有内容也可通过 WebJars 获得。

#### 4.3.9 记录

##### 添加记录器

Javalin 没有包含记录器，这意味着您必须添加自己的记录器。如果您不太了解/不太关心 Java 记录器，解决此问题的最简单方法是将以下依赖项添加到您的项目中：

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.6</version>
</dependency>
```

#### 4.3.10 服务器设置

Javalin 在嵌入式[Jetty](http://eclipse.org/jetty/)上运行。要启动和停止服务器，请使用`start()`and `stop`：

```java
Java Javalin app = Javalin.create()
    .start() // 启动服务器（同步/阻塞）
    .stop() // 停止服务器（同步/阻塞）
```

`app.start()` 方法会产生一个用户线程，启动服务器，然后返回。直到调用 `app.stop()` 停止该线程之前，程序将不会退出。

如果您想在程序退出时执行清除关闭操作，可以使用以下代码：

```java
Java Runtime.getRuntime()
    .addShutdownHook(new Thread(() -> {
    app.stop();
}));

app.events(event -> {
    event.serverStopping(() -> {
        /* Your code here */
    });
    event.serverStopped(() -> {
        /* Your code here */
    });
});
```

#### 4.3.11 设置主机

该`Javalin#start`方法被重载以接受主机 (IP) 作为第一个参数：

```java
Java Javalin.create().start("127.0.0.1", 1235)
```

#### 4.3.12 自定义服务器

如果需要自定义嵌入式服务器，可以调用`server()`方法：

```java
Java app.create(config -> {
    config.server(() -> {
        Server server = new Server(); // 按照您的需求进行配置
        return server;
    } });
```

#### 4.3.13 自定义会话处理器

待更新

#### 4.3.14 自定义 Jetty 处理程序

您可以使用处理程序链（示例）配置嵌入式 Jetty 服务器，并且 Javalin 将在此链的末尾附加自己的处理程序。

```java
StatisticsHandler statisticsHandler = new StatisticsHandler();

Javalin.create(config -> {
    config.server(() -> {
        Server server = new Server();
        server.setHandler(statisticsHandler);
        return server;
    })
});
```

#### 4.3.15 SSL/HTTP2

Javalin 现在有一个 SSL 插件：https://javalin.io/plugins/ssl-helpers。推荐使用这个插件来设置 SSL 和 HTTP2/3，因为它比在 Jetty 中手动配置更友好。

要在 Jetty 中手动配置 SSL 或 HTTP2，您需要使用自定义服务器

SSL 的自定义服务器的示例

```java
StatisticsHandler statisticsHandler = new StatisticsHandler();

Javalin.create(config -> {
    config.server(() -> {
        Server server = new Server();
        server.setHandler(statisticsHandler);
        return server;
    })
});
```

自定义 HTTP2 服务器的设置需要做更多的工作，但我们有一个库，其中包含 Kotlin 和 Java 中功能齐全的示例服务器：[javalin-http2-example](https://github.com/tipsy/javalin-http2-example)

## 五、 视图和模板

### 4.1 视图和模板的基本概念

### 4.2 使用 Freemarker 模板引擎

### 4.3 使用 Thymeleaf 模板引擎

## 六、 数据库集成

### 5.1 使用 JDBI 访问数据库

### 5.2 使用 Hibernate 访问数据库

## 七、 WebSocket

### 6.1 WebSocket 的概述

### 6.2 使用 Javalin 实现 WebSocket

## 八、 测试

### 7.1 单元测试

### 7.2 集成测试

## 九、 部署

### 8.1 打包 Javalin 应用程序

### 8.2 部署到 Tomcat

## 十、 Javalin 生态系统

### 9.1 Javalin 的插件

### 9.2 Javalin 的整合
