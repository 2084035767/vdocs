# python 爬虫入门

## 爬虫介绍

简单来说，爬虫就是获取网页并提取和保存信息的自动化程序。

## 爬虫的基本流程

### 获取网页

爬虫首先要做的工作就是获取网页，这里就是获取网页的源代码。源代码里包合了网页的部分有用信息，所以只要把源代码获取下来，就可以从中提取想要的信息了。

```python
import requests
# 待爬取得URL地址
url = 'https://www.baidu.com/'
#模拟浏览器发请求
res = requests.get(url)
#对数据编码
res.encoding = 'utf-8'
#保存数据
with open('百度.html', 'wb') as f:
	f.write(res.content)
```



### 提取信息

- 获取网页源代码后，接下来就是分析网页源代码，从中提取我们想要的数据。首先，最通用的方法便是采用正则表达式提取，这是一个万能的方法，但是在构造正则表达式时比较复杂且容易出错
- 另外，由于网页的结构有一定的规则，所以还有一些根据网页节点属性、CSS 选择器或 XPath 来提取网页信息的库，如`Beautifu soup`、  `pyquery`、`lxml`等。使用这些库，我们可以高效快速地从中提取网页信息，如节点的属性、文本值等。
- 提取信息是爬虫非常重要的部分，它可以使杂乱的数据变得条理清晰，以便我们后续处理和分析数据。

### 保存数据

提取信息后，我们一般会将提取到的数据保存到某处以便后续使用。这里保存形式有多种多样，如可以简单保存为 TXT 文本或 JSON 文本，也可以保存到数据库，如 MySQL 和 MongoDB 等，也可保存至远程服务器，如借助 SFTP 进行操作等。

## HTTP 请求过程

我们在浏览器中输入一个 URL，回车之后便会在浏览器中观到页面内容，实际上，这个过程是浏览器向网站所在的服务器发送了一个请求，网站服务器接收到这个请求后进行处理和解析，然后返回对应的响应，接着传回给浏览器。响应里包含了页面的源代码等内容，浏览器再对其进行解析，便将网页呈现了出来.

## 请求

### 请求方法

|  方法   | 描 述                                                        |
| :-----: | ------------------------------------------------------------ |
|   GET   | 请求页面，并返回页面内容                                     |
|  HEAD   | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 |
|  POST   | 大多用于提交表单或上传文件，数据包含在请求体中               |
|   PUT   | 从客户端向服务器传送的数据取代指定文档中的内容               |
| DELETE  | 请求服务器删除指定的页面                                     |
| CONNECT | 把服务器当作跳板，让服务器代替客户端访问其他网页             |
| QPTIONS | 允许客户端查看服务器的性能                                   |
|  TRACE  | 回显服务器收到的请求，主要用于测试或诊断                     |

### 请求的网址

   请求的网址，即统一资源定位符 URL，它可以唯一确定我们想请求的资源

### 请求头

- Accept
- Accept-Language
- Accept-Encoding
- Host     主机
- Cookie    会话信息身份
- Referer    记录来源
- User-Agent 浏览器得指纹信息
- Content-Type 类型

#### 请求体

   请求体一般承载的内容是 POST 请求中的表单数据，而对于 GET 请求，请求体则为空。

## 响应

响应，由服务端返回给客户端，可以分为三部分：响应状态码（Responsestatuscode）、响应头（ResponseHeaders）和响应体（ResponseBody）

响应状态码表示服务器的响应状态，如 200 代表服务器正常响应，404 代表页面未找到，500 代表服务器内部发生错误。在爬虫中，我们可以根据状态码来判断服务器响应状态，如状态码为 200，则证明成功返回数据，再进行进一步的处理，否则直接忽略。

### 常见的错误代码及错误原因

| 状态码 | 说明           | 详情                                                         |
| ------ | -------------- | ------------------------------------------------------------ |
| 100    | 继续           | 请求者应当继续提出请求。服务器已收到请求的一部分，正在等待其余部分 |
| 101    | 切换协议       | 请求者已要求服务器切换协议，服务器已确认并准备切换           |
| 200    | 成功           | 服务器已成功处理了请求                                       |
| 201    | 已创建         | 请求成功并且服务器创建了新的资源                             |
| 202    | 已接受         | 服务器已接受请求，但尚未处理                                 |
| 203    | 非授权信息     | 服务器已成功处理了请求，但返回的信息可能来自另一个源         |
| 204    | 无内容         | 服务器成功处理了请求，但没有返回任何内容                     |
| 205    | 重置内容       | 服务器成功处理了请求，内容被重置                             |
| 206    | 部分内容       | 服务器成功处理了部分请求                                     |
| 300    | 多种选择       | 针对请求，服务器可执行多种操作                               |
| 301    | 永久移动       | 请求的网页已永久移动到新位置，即永久重定向                   |
| 302    | 临时移动       | 请求的网页暂时跳转到其他页面，即暂时重定向                   |
| 303    | 查看其他位置   | 如果原来的请求是 POST，重定向目标文档应该通过 GET 提取          |
| 304    | 未修改         | 比次请求返回的网页未修改，继续使用上次的资源                 |
| 305    | 使用代理       | 请求者应该使用代理访问该网页                                 |
| 307    | 临时重定向     | 请求的资源临时从其他位置响应                                 |
| 400    | 错误请求       | 服务器无法解析该请求                                         |
| 401    | 未授权         | 请求没有进行身份验证或验证未通过                             |
| 403    | 禁止访问       | 服务器拒绝此请求                                             |
| 404    | 未找到         | 服务器找不到请求的网页                                       |
| 405    | 方法禁用       | 服务器禁用了请求中指定的方法                                 |
| 406    | 不接受         | 无法法使用请求的内容响应请求的网页                           |
| 407    | 需要代理授权   | 请求者需要使用代理授权                                       |
| 408    | 请求超时       | 服务器请求超时                                               |
| 409    | 冲突           | 服务器在完成请求时发生冲突                                   |
| 410    | 已删除         | 请求的资源已永久删除                                         |
| 411    | 需要有效长度   | 服务器不接受不含有效内容长度标头字段的请求                   |
| 412    | 未满足前提条件 | 服务器未满足请求者在请求中设置的其中一个前提条件             |
| 413    | 请求实体过大   | 请求实体过大，超出服务器的处理能力                           |
| 414    | 请求 URI 过长    | 请求网址过长，服务器无法处理                                 |
| 415    | 不支持类型     | 请求格式不被请求页面支持                                     |
| 416    | 请求范围不符   | 页面无法提供请求的范围                                       |
| 417    | 未满足期望值   | 服务器未满足期望请求标头字段的要求                           |
| 500    | 服务器内部错误 | 服务器遇到错误，无法完成请求                                 |
| 501    | 未实现         | 服务器不具备完成请求的功能                                   |
| 502    | 错误网关       | 服务器作为网关或代理，从上游服务器收到无效响应               |
| 503    | 服务不可用     | 服务器目前无法使用                                           |
| 504    | 网关超时       | 服务器作为网关或代理，但是没有及时从上游服务器收到请求       |
| 505    | HTTP 版本不支持 | 服务器不支持请求中所用的 HTTP 协议版本                         |

### 响应头

响应头包含了服务器对请求的应答信息，如 Content-Type、Server、Set-Cookie 等，下面简要说明一些常用的头信息。

- Date：标识响应产生的时间
- Last-Modified：指定资源的最后修改时间。
- Content-Encoding：指定响应内容的编码
- Server：包含服务器的信息，比如名称、版本号等
- Content-Type：文档类型，指定返回的数据类型是什么，如`text/html`代表返回 HTML 文档`application/x-javascript`则代表返回 JavaScript 文件，`image/jpeg`则代表返回图片。
- Set-Cookie：设置 Cookies。响应头中的 Set-Cookie 告诉浏览器需要将此内容放在 Cookies 中，下次请求携带 Cookies 请求。
- Expires：指定响应的过期时间，可以使代理服务器或浏览器将加载的内容更新到缓存中。如果再次访问时，就可以直接从缓存中加载，降低服务器负载，缩短加载时间

### 响应体

最重要的当属响应体的内容了。响应的正文数据都在响应体中，比如请求网页时，它的响应体就是网页的 HTML 代码；请求一张图片时它的响应体就是图片的二进制数据。我们做爬虫请求网页后，要解析的内容就是响应体.

## requests 库使用

> Requests 唯一的一个非转基因的 PythomHTTP 库，人类可以安全享用
>
> 警告：非专业使用其他 HTTP 库会导致危险的副作用，包括：安全缺陷症、元余代码症、重新发明轮子症、文档症、抑郁、头疼、甚至死亡。

环境搭建
```sh
pip instal requests
```

### 基本使用

```python
import requests
r = requests.get('https://www.baidu.com/')
print(type(r)
print(r.status_code)
print(type(r.text))
print(r.text)
print(r.cookies)
```

测试实例
```python
r = requests.post('http://httpbin.org/post')
r = requests.put('http://httpbin.org/put)
r = requests.delete('http://httpbin.org/delete')
r = requests.head('http://httpbin.org/get)
r = requests.options('http://httpbin.org/get')
```

### GET 获取参数案例

```python
import requests
data = {
    'name': 'germey',
	'age': 22
}

r = requests.get('http://httpbin.org/get', params=data)
print(r.text)
```



### 添加头部信息

```python
import requests
headers={'user-Agent': 'Mozia/5.0 (Macintosh; Intel Mac OS X 10_11_4)Applewebkit/537.36(KHTML, likeGecko)Chrome/52.0.2743.116 Safari/537.36'
r = requests.get('https://www.mzitu.com/', headers=headers)
print(r.text)
```

### post 请求

前面我们了解了最基本的 GET 请求，另外一种比较常见的请求方式是 POST。

```python
import requests
data = {'name': 'germey','age': 22}
r = requests.post('http://httpbin.org/post', data=data)
print(r.text)
```