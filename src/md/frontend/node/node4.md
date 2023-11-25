## 四、高级应用

### 4.1 实现 RESTful API

### 创建最基本的 web 服务器

#### 创建 web 服务器的基本步骤

1. 导入 http 模块
2. 创建 web 服务器实例
3. 为服务器实例绑定 request 事件，监听客户端的请求
4. 启动服务器

#### 导入 http 模块

如果希望在自己的电脑上创建一个 web 服务器，从而对外提供 web 服务，则需要导入 http 模块

```js
 const http = require('http')
```

#### 创建 web 服务器实例

调用 http.createSenver()方法，即可快速创建一个 web 服务器实例：

```js
const server = http.createServer()
```

#### 为服务器实例绑定 request 事件

为服务器实例绑定 request 事件，即可监听客户端发送过来的网络请求

```js
//使用服务器实例的.on()方法，为服务器绑定一个request事件
 srver.on('request', (req, res) => {
     //只要有客户端来请求我们自己的服务器，就会触发request事件，从而调用这个事件处理函数
     console.log('Someone visit our web server.')
 })
```

#### 启动服务器

调用服务器实例的.listen 方法，即可启动当前的 web 服务器实例 1

```js
//调用server.listen（端口号，cb回调）方法，即可启动web服务器
server.listen(80, () => {
    console.log('http serverrunning athttp://127.0.0.1')
})
```

#### req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on()为服务器绑定的 request 事件处理函数如果想在事件处理函数中，访问与客户端相关的**数据**或**属性**， 可以使用如下的方式

```js
server.on('request', (req) => {
    //req是请求对象，它包含了与客户端相关的数据和属性，例如：
	//req.url 是客户端请求的URL地址
	//req.method 是客户端的method请求类型
	const str = 'Your request url is ${req.url}， and request method is ${req.method}
	console.log(str)
})
```

#### res 响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的**数据**或**属性**， 可以使用如下的方式

```js
server.on('request', (req，res) => {
	//res是响应对象，它包含了与服务器相关的数据和属性，例如：
	//要发送到客户端的字符串
	const str= 'Your request url is ${req.url}，and request method is ${req.method}
	//res.end()方法的作用
	//向客户端发送指定的内容，并结束这次请求的处理过程
	res.end(str)
})
```

#### 解决中文乱码问题

当调用 res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动**设置内容的编码格式**

```js
server.on('request', (req res) => {
    //发送的内容包含中文
	const str= '您请求的uFl地址是${req.url}，请求的method类型是${req.method}'
	//为了防止中文显示乱码的问题，需要设置响应头Content-Type的值为text/html；charset=utf-8
	res.setHeader('Content-Type', 'text/html;charset=utf-8')
	//把包含中文的内容，响应给客户端
	res.end(str)
})
```

#### 根据不同的 url 响应不同的 html 内容

核心实现步骤

1. 获取请求的 url 地址
2. 设置默认的响应内容为 404Notfound
3. 判断用户请求的是否为/或/index.html 首页
4. 判断用户请求的是否为/about.html 关于页面
5. 设置 Content-Type 响应头，防止中文乱码
6. 使用 res.endo 把内容响应给客户端

动态响应内容

```js
sarver.on('fequest', function(req, res) {
    const url = req.url
    //1.获取请求的ur地址
	let content ='<h1>404Notfound！</h1>'
    //2.设置默认的内容为404Notfound
	if (url === '/' || === '/index.html') {
        content = '<h1>首页</h1>'
        //3，用户请求的是首页
    }else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'         
        //4用户请求的是关于页面
    }
    res.setHeader('Content-Type', 'text/htmlcharset=utf-8')
	//5.设置 Content-Type 响应头，防中文乱码
	res.end(content)
    //6把内容发送给客户端
})
```

