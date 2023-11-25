## 



# 二、Node.js 基础知识

## 2.1 模块和包管理

## CommonJS 的介绍

[CommonJS](http://www.commonjs.org/)：是 Node.js 使用的模块化规范。也就是说，Node.js 就是基于 CommonJS 这种模块化规范来编写的。

CommonJS 规范规定：每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口对象。加载某个模块，其实是加载该模块的 module.exports 对象。

在 CommonJS 中，每个文件都可以当作一个模块：

- 在服务器端：模块的加载是运行时同步加载的。
- 在浏览器端: 模块需要提前编译打包处理。首先，既然同步的，很容易引起阻塞；其次，浏览器不认识`require`语法，因此，需要提前编译打包。

### 模块的暴露和引入

Node.js 中只有模块级作用域，两个模块之间的变量、方法，默认是互不冲突，互不影响，这样就导致一个问题：模块 A 要怎样使用模块B中的变量&方法呢？这就需要通过 `exports` 关键字来实现。

Node.js中，每个模块都有一个 exports 接口对象，我们可以把公共的变量、方法挂载到这个接口对象中，其他的模块才可以使用。

接下来详细讲一讲模块的暴露、模块的引入。

### 暴露模块的方式一： exports

`exports`对象用来导出当前模块的公共方法或属性。别的模块通过 require 函数调用当前模块时，得到的就是当前模块的 exports 对象。

**语法格式**：

```js
// 相当于是：给 exports 对象添加属性
exports.xxx = value
```



这个 value 可以是任意的数据类型。

**注意**：暴露的关键词是`exports`，不是`export`。其实，这里的 exports 类似于 ES6 中的 export 的用法，都是用来导出一个指定名字的对象。

**代码举例**：

```js
const name = 'qianguyihao';

const foo = function (value) {
	return value * 2;
};

exports.name = name;
exports.foo = foo;
```



### 暴露模块的方式二： module.exports

`module.exports`用来导出一个默认对象，没有指定对象名。

语法格式：

```javascript
// 方式一：导出整个 exports 对象
module.exports = value;

// 方式二：给 exports 对象添加属性
module.exports.xxx = value;
```

这个 value 可以是任意的数据类型。

```js
// 方式1
module.exports = {
    name: '我是 module1',
    foo(){
        console.log(this.name);
    }
}

// 我们不能再继续写 module.exports = value2。因为重新赋值，会把 exports 对象 之前的赋值覆盖掉。

// 方式2
const age = 28;
module.exports.age = age;
```



`module.exports` 还可以修改模块的原始导出对象。比如当前模块原本导出的是一个对象，我们可以通过 module.exports 修改为导出一个函数。如下：

```js
module.exports = function () {
    console.log('hello world')
}
```



### exports 和 module.exports 的区别

最重要的区别：

- 使用exports时，只能单个设置属性 `exports.a = a;`
- 使用module.exports时，既单个设置属性 `module.exports.a`，也可以整个赋值 `module.exports = obj`。

其他要点：

- Node中每个模块的最后，都会执行 `return: module.exports`。
- Node中每个模块都会把 `module.exports`指向的对象赋值给一个变量 `exports`，也就是说 `exports = module.exports`。
- `module.exports = XXX`，表示当前模块导出一个单一成员，结果就是XXX。
- 如果需要导出多个成员，则必须使用 `exports.add = XXX; exports.foo = XXX`。或者使用 `module.exports.add = XXX; module.export.foo = XXX`。

### 问题: 暴露的模块到底是谁？

**答案**：暴露的本质是`exports`对象。【重要】

比如，方式一的 `exports.a = a` 可以理解成是，**给 exports 对象添加属性**。方式二的 `module.exports = a`可以理解成是给整个 exports 对象赋值。方式二的 `module.exports.c = c`可以理解成是给 exports 对象添加属性。

Node.js 中每个模块都有一个 module 对象，module 对象中的有一个 exports 属性称之为**接口对象**。我们需要把模块之间公共的方法或属性挂载在这个接口对象中，方便其他的模块使用。

## 引入模块的方式：require

require函数用来在一个模块中引入另外一个模块。传入模块名，返回模块导出对象。

**语法格式**：

```js
const module1 = require('模块名');
```

解释：

- 内置模块：require的是**包名**。
- 下载的第三方模块：require的是**包名**。
- 自定义模块：require的是**文件路径**。文件路径既可以用绝对路径，也可以用相对路径。后缀名`.js`可以省略。

**代码举例**：

```js
const module1 = require('./main.js');

const module2 = require('./main');

const module3 = require('Demo/src/main.js');
```



**require()函数的两个作用**：

- 执行导入的模块中的代码。
- 返回导入模块中的接口对象。

### 主模块

主模块是整个程序执行的入口，可以调度其他模块。

```bash
# 运行main.js启动程序。此时，main.js就是主模块
$ node main.js
```



### 模块的初始化

一个模块中的 JS 代码仅在模块**第一次被使用时**执行一次，并且在使用的过程中进行初始化，然后会被缓存起来，便于后续继续使用。

代码举例：

（1）calModule.js:

```js
var a = 1;

function add () {
  return ++a;
}

exports.add = add;
```

（2）main.js：（在 main.js 中引入 hello.js 模块）

```js
var addModule1 = require('./calModule')
var addModule2 = require('./calModule')

console.log(addModule1.add());
console.log(addModule2.add());
```

在命令行执行 `node main.js` 运行程序，打印结果：

```bash
2
3
```

从打印结果中可以看出，`calModule.js`这个模块虽然被引用了两次，但只初始化了一次。



## 2.2 文件系统

什么是 fs 文件系统模块

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



## 2.3 网络编程

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

### IP 地址

- IP 地址就是互联网上每台计算机的唯一地址，因此 IP 地址具有唯一性。如果把“个人电脑”比作“一台电话”，那么“IP 地址”就相当于 “电话号码”，只有在知道对方 IP 地址的前提下，才能与对应的电脑之间进行数据通信
- IP 地址的格式：通常用“点分十进制”表示成 （a.b.c.d） 的形式， 其中，abcd 都是 0~255 之间的十进制整数。例如：用点分十进表示的 IP 地址（192.168.1.1）
- 注意：互联网中每台 Web 服务器，都有自己的 IP 地址，例如：大家可以在 Windows 的终端中运行`ping www.baidu.com`命令，即可查看到百度服务器的 IP 地址
- 在开发期问，自己的电脑既是一台服务器，也是一个客户端，为了方便测试， 可以在自己的浏览器中输入 127.0.0.1 这个 IP 地址，就能把自己的电脑当做一台服务器进行访问了

### 域名和域名服务器

- 尽管 IP 地址能够唯一地标记网络上的计算机， 但 IP 地址是一长串数字，不直观，而且不便于记忆，于是人们又发明了另一套字符型的地址方案，即所的域名 （Domain Name） 地址。
- IP 地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器（DNS,Domainnameserver 的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现 因此，域名服务器就是提供 IP 地址和域名之间的转换服务的服务器
- 注意：单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便
- 在开发测试期间，  127.0.0.1 对应的域名是 localhost， 们都代表我们自己的这台电脑，在使用效果上没有任何区别

### 端口号

- 计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖送到你的手中
- 同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的**web 服务器**进行处理
  1. 每个端口号不能同时被多个 web 服务占用。
  2. 在实际应用中，URL 中的**80 端口可以被省略**



## 2.4 错误处理和调试