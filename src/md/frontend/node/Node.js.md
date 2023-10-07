# Node.js

## 什么是 Node.js

- Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine

- Nodejs 是一个基于 ChromeV8 引擎的 JavaScript 运行环境。

## Node.js 可以做什么

Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和 API。然而，基于 Node.js 提供的这些基础能，很多强大的工具和框架如雨后春，层出不穷，所以学会了 Node.js，可以让前端程序员胜任更多的工作和岗位：

1. 基于 Express 框架（http://www.expressis.com.cn/），可以快速构建 Web 应用
2. 基于 Electron 框架（https://electronis.org/），可以构建跨平台的桌面应用
3. 基于 restify 框架（http://restify.com/），可以快速构建 API 接口项目
4. 读写和操作数据库、 创建实用的命令行工具辅助前端开发、etc.

## 在 Node.js 环境中执行 JavaScript 代码

1. 打开终端
2. 输入 `node` `要执行的js文件的路径`

### 终端中的快捷键

在 Windows 的 powershell 或 cmd 终端中，我们可以通过如下快捷键，来提高终端的操作效率使用键，可以快速定位到上一次执行的命令

1. 使用上方向键，可以快速定位到上一次执行的命令
2. 使用`tab`键，能够快速补全路径
3. 使用`esc`键，能够快速清空当前已输入的命令
4. 输入`cls`命令，可以清空终端

## fs 文件系统模块

### 什么是 fs 文件系统模块

**fs 模块**是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作
例如：

- fs.readFile()方法，用来读取指定文件中的内容
- fs.writeFile()万法，用来向指定的文件中写入内容

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入
 ```js
   const fs = require('fs')
 ```

### fs.readFile()的语法格式

使用 fs.readFile()方法， 可以读取指定文件中的内容，语法格式如下：

```js
fs.readFile(path[, options], callback)
参数解读
	参数1：必选参数，字符串，表示文件的路径
	参数2：可选参数，表示以什么编码格式来读取文件
	参数3：必选参数，文件读取完成后，通过回调函数拿到读取的结果
```

判断文件是否读取成功：判断 callback 函数形参成功为`null`

### fs.writeFile()的语法格式

使用 fs.writeFile 方法，可以向指定的文件中写入内容，语法格式如下：

```js
fs.writeFile(file, data[, options], callback)
参数解读：
	参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
	参数2：必选参数，表示要写入的内容。
	参数3：可选参数，表示以什么格式写入文件内容，默认值是utf8
    参数4：必选参数，文件写入完成后的回调函数
```

### 路径动态拼接的问题

- 在使用 fs 模块操作文件时，如果提供的操作路径是以/或/开头的相对路径时，很容易出现路径动态拼接错误的问题
- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方案： 在使用 fs 模块操作文件时，直接提供**完整的路径**，不要提供./或../开头的相对路径，从而防止路径动态拼接的问题。
- 使用`__dirname`完美解决路径动态拼接的问题

```js
//不要使用./或../这样的相对路径
fs.readFile('./files/1.txt', 'utf8', function(err，dataStr) {
    if (err) return console.log('读取文件失败！' + err.message)
	console.log(dataStr)
})

//__dirname表示当前文件所处的目录
fs.readFile(__dirname + './files/1.txt', 'utf8', function(err，dataStr) {
    if (err) return console.log('读取文件失败！' + err.message)
	console.log(dataStr)
})
```

## path 路径模块

### 什么是 path 路径模块

**path 模块**是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径处理的需求。
例如：

- path.join()方法，用来将多个路径片段拼接成一个完整的路径字符串
- path.basename()方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入
   ```js
   const path = require(path)
   ```

### path.join()的语法格式

使用 path.join()方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下

```js
path.join([..paths])
参数解读：
  ..paths<string>路径片段的序列
  返回值：<string>
```

### path.basename()的语法格式

使用 path.basename()方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下

```js
path.basename(path[, ext])
参数解读：
	path<string>必选参数，表示一个路径的字符串
	ext<string>可选参数，表示文件扩展名
	返回：<string>表示路径中的最后一部分
```

### path.extname()的语法格式

使用 path.extname()方法，可以获取路径中的扩展名部分，语法格式如下：

```js
path.extname(path)
参数解读：
	path <string>必选参数，表示一个路径的字符串
	返回：<string>返回得到的扩展名字符串
```

## http 模块

### 什么是 http 模块

http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供 http.createServer()方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```js
 const http = require('http')
```

### 进一步理解 http 模块的作用

- 服务器和通电脑的区别在于，服务器上安装了 web 服务器软件，例如：lIS、Aoache 等。通过安装这些服务器软件就能把一台普通的电脑变成一台 web 服务器

- 在 Nodejs 中，我们不需要使用 IIS、Apache 等这些第三方 weo 服务器软件。因为我们可以基于 Node.js 提供的 http 模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供 web 服务

### 服务器相关概念

#### IP 地址

- IP 地址就是互联网上每台计算机的唯一地址，因此 IP 地址具有唯一性。如果把“个人电脑”比作“一台电话”，那么“IP 地址”就相当于 “电话号码”，只有在知道对方 IP 地址的前提下，才能与对应的电脑之间进行数据通信
- IP 地址的格式：通常用“点分十进制”表示成 （a.b.c.d） 的形式， 其中，abcd 都是 0~255 之间的十进制整数。例如：用点分十进表示的 IP 地址（192.168.1.1）
- 注意：互联网中每台 Web 服务器，都有自己的 IP 地址，例如：大家可以在 Windows 的终端中运行`ping www.baidu.com`命令，即可查看到百度服务器的 IP 地址
- 在开发期问，自己的电脑既是一台服务器，也是一个客户端，为了方便测试， 可以在自己的浏览器中输入 127.0.0.1 这个 IP 地址，就能把自己的电脑当做一台服务器进行访问了

#### 域名和域名服务器

- 尽管 IP 地址能够唯一地标记网络上的计算机， 但 IP 地址是一长串数字，不直观，而且不便于记忆，于是人们又发明了另一套字符型的地址方案，即所的域名 （Domain Name） 地址。
- IP 地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器（DNS,Domainnameserver 的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现 因此，域名服务器就是提供 IP 地址和域名之间的转换服务的服务器
- 注意：单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便
- 在开发测试期间，  127.0.0.1 对应的域名是 localhost， 们都代表我们自己的这台电脑，在使用效果上没有任何区别

#### 端口号

- 计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖送到你的手中
- 同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的**web 服务器**进行处理
  1. 每个端口号不能同时被多个 web 服务占用。
  2. 在实际应用中，URL 中的**80 端口可以被省略**

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

