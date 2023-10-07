# python 网络爬虫与信息提取

## Requests 库入门

### Requests 库的安装

> Requests 唯一的一个非转基因的 PythomHTTP 库，人类可以安全享用
>
> 警告：非专业使用其他 HTTP 库会导致危险的副作用，包括：安全缺陷症、元余代码症、重新发明轮子症、文档症、抑郁、头疼、甚至死亡。

requests 安装

```sh
pip instal requests
```

使用测试

```python
import requests
r = requests.get('https://www.baidu.com/')
print(r.status_code)
r.encoding = 'utf-8'
print(r.text)
```

### Requests 库的 get()方法

Requests 库的 7 个主要方法

| 方法               | 说明                                           |
| ------------------ | ---------------------------------------------- |
| requests.request() | 构造一个请求，支撑以下各方法的基础方法         |
| requests.get()     | 获取 HTML 网页的主要方法，对应于 HTTP 的 GET        |
| requests.head()    | 获取 HTML 网页头信息的方法，对应于 HTTP 的 HEAD     |
| requests.post()    | 向 HTML 网页提交 POST 请求的方法，对应于 HTTP 的 POST |
| requests.put()     | 向 HTML 网页提交 PUT 请求的方法，对应于 HTTP 的 PUT   |
| requests.patch()   | 向 HTML 网页提交局部修改请求，对应于 HTTP 的 PATCH  |
| requests.delete()  | 向 HTML 页面提交删除请求，对应于 HTTP 的 DELETE     |

#### r= requests.get(url)

> 构造一个向服务器请求资源的 Request 对象
>
> 返回一个包含服务器资源的 Response 对象

#### requestsget(url, params=None，**kwargs)

- url：拟获取页面的 url 链接
- params：url 中的额外参数，字典或字节流格式，可选
- **kwargs：12 个控制访问的参数

#### Requests 库的 2 个重要对象

- Response 对象包含爬虫返回的内容
- Request 对象包含对服务器的请求内容

#### Response 对象的属性

| 属性                | 说明                                             |
| ------------------- | ------------------------------------------------ |
| r.status code       | HTTP 请求的返回状态，200 表示连接成功，404 表示失败 |
| r.text              | HTTP 响应内容的学符串形式，即，url 对应的页面内容  |
| r.encoding          | 从 HTTPheader 中测的响应内容编码方式               |
| r.apparent_encoding | 从内容中分析出的响应内容编码方式（备选编码方式） |
| r.content           | HTTP 响应内容的二进制形式                         |

#### 理解 Response 的编码

| 属性                | 说明                                             |
| ------------------- | ------------------------------------------------ |
| r.encoding          | 从 HTTPheader 中测的响应内容编码方式               |
| r.apparent_encoding | 从内容中分析出的响应内容编码方式（备选编码方式） |

- r.encoding：如果 header 中不存在 charset，则认为编码为 S-8859-1
- rapparentencoding：根据网页内容分析出的编码方式

### 爬取网页的通用代码框架

####   理解 Requests 库的异常

| 异常                      | 说明                                        |
| ------------------------- | ------------------------------------------- |
| requests.ConnectionError  | 网络连接错误异常，如 DNS 查询失败、拒绝连接等 |
| requests.HTTPError        | HTTP 错误异常                                |
| requests.URLRequired      | URL 缺失异常                                 |
| requests.TooManyRedirects | 超过最大重定向次数，产生重定向异常          |
| requests.ConnectTimeout   | 连接远程服务器超时异常                      |
| requests.Timeout          | 请求 URL 超时，产生超时异常                   |

#### 理解 Requests 库的异常

| 异常                 | 说明                                    |
| -------------------- | --------------------------------------- |
| r.raise_for_status() | 如果不是 200，产生异常 requests.HTTPError |

#### 爬取网页的通用代码框架

```python
import requests
def getHTMLText(url):
try:
	r = requests.get(url, timeout=30)
	r.raise_for_status()  #如果状态不是200，引发HTTPErrOr异常
	r.encoding = r.apparent_encoding
	return r.text
except:
	return "产生异常”
if __name__ == "__main__":
url = "http://www.baidu.com"
    print(getHTMLText(url))
```

### HTTP 协议及 Requests 库方法

#### HTTP 协议

> HTTPURL 的理解：URL 是通过 HTTP 协议存取资源的 Internet 路径，一个 URL 对应一个数据资源。

- HTTP，HypertextTransfer Protocol，i 超文本传输协议。
- HTTP 是一个基于 “请求与响应” 模式的、无状态的应用层协议。
- HTTP 协议采用 URL 作为定位网络资源的标识。

##### URL 格式

URL 格式	`http://host[:port][path]`

- host：合法的 Internet 主机域名或 IP 地址
- port：端口号，缺省端口为 80
- path：请求资源的路径

HTTP 协议对资源的操作

| 方法   | 说明                                                      |
| ------ | --------------------------------------------------------- |
| GET    | 请求获取 URL 位置的资源                                     |
| HEAD   | 请求获取 URL 位置资源的响应消息报告，即获得该资源的头部信息 |
| POST   | 请求向 URL 位置的资源后附加新的数据                         |
| PUT    | 请求向 URL 位置存储一个资源，覆盖原 URL 位置的资源            |
| PATCH  | 请求局部更新 URL 位置的资源，即改变该处资源的部分内容       |
| DELETE | 请求删除 URL 位置存储的资源                                 |

##### 理解 PATCH 和 PUT 的区别

假设 URL 位置有一组数据 UserInfo，包括 UserID、UserName
等 20 个字段。
需求：用户修改了 UserName，其他不变。

- 采用 PATCH，仅向 URL 提交 UserName 的局部更新请求。

- 采用 PUT，必须将所有 20 个字段一并提交到 URL，未提交字段被删除。

  > PATCH 的最主要好处：节省网络带宽

##### 数据的不同接收

- 向 URL POST 一个字典自动编码为 form（表单）
- 向 URL POST 一个字符串自动编码为 data

#### Requests 库的 head()方法

```python
r= requests.head('http://httpbin.org/get')
print(r.headers)
```

#### Requests 库的 post()方法

```python
payload = {'key1':'value1', 'key2':'value2'}
r = requests.post('http://httpbin.org/post', data = payload)
print(r.text)
# 返回
{ ...
	"form": {
        "key1":"value1", 
    	"key2":"value2"
    },
}
```

#### Requests 库的 post()方法

```python
r = requests.post('http://httpbin.org/post', data = 'abc')
print(r.text)
# 返回
{ ...data
	"data": "abc"
	"form": {},
}                 
```

#### Requests 库的 put()方法

```python
payload = {'key1':'value1', 'key2':'value2'}
r = requests.put('http://httpbin.org/put', data = payload)
print(r.text)
# 返回
{ ...
	"form": {
        "key1":"value1", 
    	"key2":"value2"
    },
}
```

### Requests 库主要方法解析

requests.request(method，url，**kwargs)

- method：请求方式，对应 get/put/post 等 7 种
- url：拟获取页面的 ul 链接
- **kwargs：控制访问的参数，共 13 个

#### method: 请求方式

```python
# r = requests.request('GET', url, **kwargs)
# r = requests.request('HEAD'url, **kwargs)
# r = requests.request('POST', url, **kwargs)
# r = requests.request('PUT', url, **kwargs)
# r = requests.request('PATCH', url, **kwargs)
# r = requests.request('delete', url, **kwargs)
# r = requests.request('COPTIONS', url, **kwargs)
# COPTIONS：获取一些客户端与服务器的交互参数，与获取资源并不直接相关，使用少
```

#### **kwargs: 控制访问的参数，均为可选项

1. params：字典或字节序列，作为参数增加到 url 中
   ```python
   kv = {'key1':'value1', 'key2':'value2'}
   r = requests.request('GET', 'http://python123.io/ws', params=kv)
   print(r.url)
   # 返回
   http://python123.io/ws?key1=valuel&key2=value2
   ```

2. data：字典、字节序列或文件对象，作为 Request 的内容
   ```python
   kv = {'key1':'value1', 'key2':'value2'}
   r = requests.request('POST', 'http://python123.io/ws', data=kv)
   ```

3. json：JSON 格式的数据，作为 Request 的内容

   ```python
   kv = {'key1':'value1'}
   r = requests.request('POST', 'http://python123.io/ws', json=kv)
   ```

4. headers：字典，HTTP 定制头
   ```python
   hd = {'user-agent': 'chrome/10'}
   r = requests.request('POST', 'http://python123.io/ws', headers=hd)
   ```

5. cookies：字典或 CookieJar，Request 中 cookie

6. auth：元组，支持 HTTP 认证功能

7. files：字典类型，传输文件

   ```python
   fs = {'file': open('data.xls', 'rb')}
   r = requests.request('POST', 'http://python123.io/ws', files=fs)
   ```

8. timeout：设定超时时间，秒为单位

   ```python
   r = requests.request('GET', 'http://www.baidu.com', timeout=10)
   ```

9. proxies：字典类型，设定访问代理服务器，可以增加登录认证

   ```python
   pxs = {'http': 'http://user:pass@10.10.10.1:1234',
          'https': 'https://10.10.10.1:4321'}
   
   r = requests.request('GET', 'http://www.baidu.com', proxies=pxs)
   ```

10. allow redirects：True/False，默认为 True， 重定向开关

11. stream：True/False，默认为 True，获取内容立即下载开关

12. verify：True/False，默认为 True，认证 SSL 证书开关

13. cert：本地 SSL 证书路径

讨论：Requests 库的爬取性能

## 网络爬虫的“盗亦有道”

### 网络爬虫引发的问题

#### 网络爬虫的尺寸

1. 爬取网页 玩转网页：小规模，数据量小，爬取速度不敏感，Requests 库（90%）
2. 
   爬取网站 爬取系列网站：中规模，数据规模较大，爬取速度敏感，Scrapy 库
3. 爬取全网：大规模，搜索引擎，爬取速度关键，定制开发

#### 网络爬虫引发的问题

1. 网络爬虫的“性能骚扰”

   > Web 服务器默认接收人类访问，受限于编写水平和目的，网络爬虫将会为 Web 服务器带来巨大的资源开销

2. 网络爬虫的法律风险

   > 服务器上的数据有产权归属，网络爬虫获取数据后牟利将带来法律风险

3. 网络爬虫的隐私泄露

   > 网络爬虫可能具备突破简单访问控制的能力，获得被保护数据，从而泄露个人隐私

网络爬虫的限制

- 来源审查：判断 User‐Agent 进行限制
检查来访 HTTP 协议头的 User‐Agent 域，只响应浏览器或友好爬虫的访问
- 发布公告：Robots 协议
告知所有爬虫网站的爬取策略，要求爬虫遵守

### Robots 协议

Robots Exclusion Standard，网络爬虫排除标准
作用：网站告知网络爬虫哪些页面可以抓取，哪些不行
形式：在网站根目录下的 robots.txt 文件

#### Robots 协议基本语法

```txt
注释，*代表所有，/代表根目录
User‐agent: *
Disallow: /
```

### Robots 协议的遵守方式

#### Robots 协议的使用

网络爬虫：自动或人工识别 robots.txt，再进行内容爬取
约束性：Robots 协议是建议但非约束性，网络爬虫可以不遵守，但存在法律风险

#### 对 Robots 协议的理解

原则：类人行为可不参考 Robots 协议

1. 爬取网页 玩转网页：（访问量很小：可以遵守；访问量较大：建议遵守）
2. 爬取网站 爬取系列网站：（非商业且偶尔：建议遵守；商业利益：必须遵守）
3. 爬取全网：（必须遵守）

## Beautiful Soup 库入门

### Beautiful Soup 库的安装

```sh
pip install beautifulsoup4
```

测试

````python
# 用Requests库获取demo.html源代码：
improt requests
r = requests.get('http://python123.io/ws/demo.html')
demo = r.text
from bs4 import BeautifulSoup
soup = BeautifulSoup(demo, 'html.parser')
````

### Beautiful Soup 库的基本元素

#### Beautiful Soup 库的理解

Beautiful Soup 库是解析、遍历、维护“标签树”的功能库

```html
<!--标签树-->
<html>
<body>

<p class=“title”> … </p>
<p>..</p> : 标签 Tag
p：名称 Name，成对出现
class=“title”：属性 Attributes，0个或多个

</body>
</html>
```

#### Beautiful Soup 库的引用

Beautiful Soup 库，也叫 beautifulsoup4 或 bs4，约定引用方式如下，即主要是用 BeautifulSoup 类

```python
from bs4 import BeautifulSoup

import bs4
```

#### BeautifulSoup 类

HTML <--> 标签树 <--> BeautifulSoup 类

BeautifulSoup 对应一个 HTML/XML 文档的全部内容

#### Beautiful Soup 库解析器

`soup = BeautifulSoup('<html>data</html>'，'html.parser')`其中`'html.parser'`是解析器

| 解析器           | 使用方法                        | 条件                 |
| ---------------- | ------------------------------- | -------------------- |
| bs4 的 HTML 解析器  | BeautifulSoup(mk,'html.parser') | 安装 bs4 库            |
| lxml 的 HTML 解析器 | BeautifulSoup(mk,'lxml')        | pip install lxml     |
| lxml 的 XML 解析器  | BeautifulSoup(mk,'xml')         | pip install lxml     |
| html5lib 的解析器 | BeautifulSoup(mk,'html5lib')    | pip install html5lib |

#### BeautifulSoup 类的基本元素

| 基本元素        | 说明                                                        |
| --------------- | ----------------------------------------------------------- |
| Tag             | 标签，最基本的信息组织单元，分别用<>和</>标明开头和结尾     |
| Name            | 标签的名字，`<p>……</p>`的名字是'p'，格式：`<tag>.name`      |
| Attributes      | 标签的属性，字典形式组织，格式：`<tag>.attrs`               |
| NavigableString | 标签内非属性字符串，`<>……</>`中字符串，格式：`<tag>.string` |
| Comment         | 标签内字符串的注释部分，一种特殊的 Comment 类型             |

##### Tag 标签

| 基本元素 | 说明                                                    |
| -------- | ------------------------------------------------------- |
| Tag      | 标签，最基本的信息组织单元，分别用<>和</>标明开头和结尾 |

- 任何存在于 HTML 语法中的标签都可以用 `soup.<tag>`访问获得
- 当 HTML 文档中存在多个相同`<tag>`对应内容时，`soup.<tag>`返回第一个
- 每个``<tag>``都有自己的名字，通过`<tag>.name` 获取，字符串类型
- 一个``<tag>``可以有 0 或多个属性，字典类型
- NavigableString 可以跨越多个层次
- Comment 是一种特殊类型

### 基于 bs4 库的 HTML 内容遍历方法

![](http://images.jiangtblog.top/img/Snipaste_2022-09-02_16-37-37.png)

#### 标签树的下行遍历

BeautifulSoup 类型是标签树的根节点

| 属性         | 说明                                                     |
| ------------ | -------------------------------------------------------- |
| .contents    | 子节点的列表，将`<tag>`所有儿子节点存入列表              |
| .children    | 子节点的迭代类型，与.contents 类似，用于循环遍历儿子节点 |
| .descendants | 子孙节点的迭代类型，包含所有子孙节点，用于循环遍历       |

##### 遍历儿子节点

```python
for child in soup.body.children:
	print(child)
```

##### 遍历子孙节点

```python
for child in soup.body.descendants:
	print(child)
```

#### 标签树的上行遍历

遍历所有先辈节点，包括 soup 本身，所以要区别判断

| 属性     | 说明                                         |
| -------- | -------------------------------------------- |
| .parent  | 节点的父亲标签                               |
| .parents | 节点先辈标签的迭代类型，用于循环遍历先辈节点 |

#### 标签树的平行遍历

平行遍历发生在同一个父节点下的各节点间

| 属性               | 说明                                                 |
| ------------------ | ---------------------------------------------------- |
| .next_sibling      | 返回按照 HTML 文本顺序的下一个平行节点标签             |
| .previous_sibling  | 返回按照 HTML 文本顺序的上一个平行节点标签             |
| .next_siblings     | 迭代类型，返回按照 HTML 文本顺序的后续所有平行节点标签 |
| .previous_siblings | 迭代类型，返回按照 HTML 文本顺序的前续所有平行节点标签 |

##### 遍历后续节点

```python
for sibling in soup.a.next_sibling:
	print(sibling)
```

##### 遍历前续节点

```python
for sibling in soup.a.previous_sibling:
	print(sibling)
```

### 基于 bs4 库的 HTML 格式化与编码

#### bs4 库的 prettify()方法

- .prettify()为 HTML 文本<>及其内容增加更加'\n'
- .prettify()可用于标签，方法：`<tag>.prettify()`

#### bs4 库的编码

- bs4 库将任何 HTML 输入都变成 utf‐8 编码
- Python 3.x 默认支持编码是 utf‐8,解析无障碍

## 信息组织与提取方法

### 信息标记的三种形式

#### 信息的标记

- 标记后的信息可形成信息组织结构，增加了信息维度
- 标记的结构与信息一样具有重要价值
- 标记后的信息可用于通信、存储或展示
- 标记后的信息更利于程序理解和运用

#### HTML 的信息标记

HTML 是 WWW(World Wide Web)的信息组织方式

HTML 通过预定义的<>……</>标签形式组织不同类型的信息

- 文本
- 超文本
  - 声音
  - 图像
  - 视频

#### 信息标记的三种形式

1. XML
2. JSON
3. YAML

##### XML

eXtensible Markup Language

```xml
<img src=“china.jpg” size=“10”> … </img>
<img> … </img>：标签 Tag
img：名称 Name
src=“china.jpg”：属性 Attribute

空元素的缩写形式
<img src=“china.jpg” size=“10” />
注释书写形式
<!--This is a comment, very useful-->
```

##### JSON

JavsScript Object Notation

- 有类型的键值对 key:value

```json
"name" : "北京理工大学"
" "：类型
"name"：键 key
"北京理工大学"：值 value

"name" : [ "北京理工大学", "延安自然科学院" ]
多值用[,]组织

"name" : {
"newName" : "北京理工大学",
"oldName" : "延安自然科学院"
}
键值对嵌套用{,}
```

##### YAML

YAML Ain’t Markup Language

- 无类型键值对 key:value

```yaml
name : 北京理工大学
仅字符串
name：键 key
北京理工大学：值 value

缩进表达所属关系
name :
	newName : 北京理工大学
	oldName : 延安自然科学院

‐ 表达并列关系
name :
‐北京理工大学
‐延安自然科学院

| 表达整块数据  # 表示注释
text: | #学校介绍
北京理工大学创立于1940年
```

### 三种信息标记形式的比较

#### XML

```xml
<name> … </name>
<name />
<!-- -->
```

实例

```xml
<person>
	<firstName>Tian</firstName>
	<lastName>Song</lastName>
	<address>
		<streetAddr>中关村南大街5号</streetAddr>
		<city>北京市</city>
		<zipcode>100081</zipcode>
	</address>
	<prof>Computer System</prof><prof>Security</prof>
</person>
```

#### JSON

```json
"key" : "value"
"key" : ["value1", "value2"]
"key" : {"subkey" : "subvalue"}
```

实例

```json
{
	"firstName" : "Tian" ,
	"lastName" : "Song",
	"address": {
		"streetAddr" : "中关村南大街5号" ,
		"city": "北京市" ,
		"zipcode": 100081
		} ,
	"prof": [ "Computer System", "Security" ]
}
```

#### YAML

```yaml
key : value
key : # Comment
‐value1
‐value2
key :
	subkey : subvalue
```

实例

```yaml
firstName : Tian
lastName: Song
address:
	streetAddr : 中关村南大街5号
	city: 北京市
	zipcode: 100081
prof:
‐Computer System
‐Security
```

#### 三种信息标记形式的比较

- XML：
  - 最早的通用信息标记语言，可扩展性好，但繁琐
  - Internet 上的信息交互与传递
- JSON：
  - 信息有类型，适合程序处理(js)，较 XML 简洁
  - 移动应用云端和节点的信息通信，无注释
- YAML：
  - 信息无类型，文本信息比例最高，可读性好
  - 各类系统的配置文件，有注释易读

### 信息提取的一般方法

#### 信息提取

从标记后的信息中提取所关注的内容 (标记, 信息)

#### 信息提取的一般方法

方法一：完整解析信息的标记形式，再提取关键信息（XML JSON YAML）

需要标记解析器，例如：bs4 库的标签树遍历

优点：信息解析准确

缺点：提取过程繁琐，速度慢



方法二：无视标记形式，直接搜索关键信息（搜索）

对信息的文本查找函数即可

优点：提取过程简洁，速度较快

缺点：提取结果准确性与信息内容相关

#### 融合方法

融合方法：结合形式解析与搜索方法，提取关键信息（XML JSON YAML + 搜索）

需要标记解析器及文本查找函数

实例

```python
# 提取HTML中所有URL链接
# 思路：
#	1. 搜索到所有<a>标签
#	2. 解析<a>标签格式，提取href后的链接内容
from bs4 import BeautifulSoup
soup = BeautifulSoup(demo, "html.parser")
for link in soup.find_all('a'):
    print(link.'href')
```

### 基于 bs4 库的 HTML 内容查找方法

#### .find_all()方法

`< >.find_all(name, attrs, recursive, string, **kwargs)`

> `<tag>`(..) 等价于`<tag>`.find_all(..)
soup(..)等价于 soup.find_all(..)

返回一个列表类型，存储查找的结果

- name：对标签名称的检索字符串
- attrs：对标签属性值的检索字符串，可标注属性检索
- recursive：是否对子孙全部检索，默认 True
- string：<>……</>中字符串区域的检索字符串

#### 扩展方法

| 方法                        | 说明                                                  |
| --------------------------- | ----------------------------------------------------- |
| <>.find()                   | 搜索且只返回一个结果，同.find_all()参数               |
| <>.find_parents()           | 在先辈节点中搜索，返回列表类型，同.find_all()参数     |
| <>.find_parent()            | 在先辈节点中返回一个结果，同.find()参数               |
| <>.find_next_siblings()     | 在后续平行节点中搜索，返回列表类型，同.find_all()参数 |
| <>.find_next_sibling()      | 在后续平行节点中返回一个结果，同.find()参数           |
| <>.find_previous_siblings() | 在前序平行节点中搜索，返回列表类型，同.find_all()参数 |
| <>.find_previous_sibling()  | 在前序平行节点中返回一个结果，同.find()参数           |

## Re(正则表达式)库入门

### 正则表达式的概念

正则表达式（regular expression, regex, RE）

- 正则表达式是用来简洁表达一组字符串的表达式
- 正则表达式是一种通用的字符串表达框架
- 正则表达式是一种针对字符串表达“简洁”和“特征”思想的工具
- 正则表达式可以用来判断某字符串的特征归属

正则表达式在文本处理中十分常用：

- 表达文本类型的特征（病毒、入侵等）
- 同时查找或替换一组字符串
- 匹配字符串的全部或部分
- 最主要应用在字符串匹配中

#### 正则表达式的使用

字符串 -->正则表达式 -->编译 -->特征

编译：将符合正则表达式语法的字符串转换成正则表达式特征

### 正则表达式的语法

正则表达式语法由字符和操作符构成

#### 正则表达式的常用操作符

| 操作符 | 说明                             | 实例                                    |
| ------ | -------------------------------- | --------------------------------------- |
| .      | 表示任何单个字符                 |                                         |
| [ ]    | 字符集，对单个字符给出取值范围   | [abc]表示 a、b、c，[a‐z]表示 a 到 z 单个字符 |
| [^ ]   | 非字符集，对单个字符给出排除范围 | [^abc]表示非 a 或 b 或 c 的单个字符           |
| *      | 前一个字符 0 次或无限次扩展        | abc* 表示 ab、abc、abcc、abccc 等        |
| +      | 前一个字符 1 次或无限次扩展        | abc+ 表示 abc、abcc、abccc 等            |
| ?      | 前一个字符 0 次或 1 次扩展           | abc? 表示 ab、abc                       |
| \|     | 左右表达式任意一个               | abc \| def 表示 abc、def                |
| {m}    | 扩展前一个字符 m 次                | ab{2}c 表示 abbc                          |
| {m,n}  | 扩展前一个字符 m 至 n 次（含 n）      | ab{1,2}c 表示 abc、abbc                   |
| ^      | 匹配字符串开头                   | ^abc 表示 abc 且在一个字符串的开头         |
| $      | 匹配字符串结尾                   | abc$表示 abc 且在一个字符串的结尾         |
| ( )    | 分组标记，内部只能使用 \| 操作符 | (abc)表示 abc，(abc | def)表示 abc、def  |
| \d     | 数字，等价于[0‐9]                |                                         |
| \w     | 单词字符，等价于[A‐Za‐z0‐9_]     |                                         |

#### 经典正则表达式实例

| 正则表达式                | 表示                         |
| ------------------------- | ---------------------------- |
| `^[A‐Za‐z]+$`             | 由 26 个字母组成的字符串       |
| `^[A‐Za‐z0‐9]+$`          | 由 26 个字母和数字组成的字符串 |
| `^‐?\d+$`                 | 整数形式的字符串             |
| `^[0‐9]*[1‐9][0‐9]*$`     | 正整数形式的字符串           |
| `[1‐9]\d{5}`              | 中国境内邮政编码，6 位        |
| `[\u4e00‐\u9fa5]`         | 匹配中文字符                 |
| `\d{3}‐\d{8}|\d{4}‐\d{7}` | 国内电话号码，010‐68913536   |

#### 匹配 IP 地址的正则表达式

IP 地址字符串形式的正则表达式（IP 地址分 4 段，每段 0‐255）

精确写法

- 0‐99： [1‐9]?\d
- 100‐199: 1\d{2}
- 200‐249: 2[0‐4]\d
- 250‐255: 25[0‐5]

(([1‐9]?\d|1\d{2}|2[0‐4]\d|25[0‐5]).){3}([1‐9]?\d|1\d{2}|2[0‐4]\d|25[0‐5])

### Re 库的基本使用

#### Re 库介绍

Re 库是 Python 的标准库，主要用于字符串匹配
调用方式：`import re`

#### 正则表达式的表示类型

- raw string 类型（原生字符串类型）
- re 库采用 raw string 类型表示正则表达式，表示为：r'text'
- raw string 是不包含对转义符再次转义的字符串

- re 库也可以采用 string 类型表示正则表达式，但更繁琐

#### Re 库主要功能函数

| 函数          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| re.search()   | 在一个字符串中搜索匹配正则表达式的第一个位置，返回 match 对象  |
| re.match()    | 从一个字符串的开始位置起匹配正则表达式，返回 match 对象        |
| re.findall()  | 搜索字符串，以列表类型返回全部能匹配的子串                   |
| re.split()    | 将一个字符串按照正则表达式匹配结果进行分割，返回列表类型     |
| re.finditer() | 搜索字符串，返回一个匹配结果的迭代类型，每个迭代元素是 match 对象 |
| re.sub()      | 在一个字符串中替换所有匹配正则表达式的子串，返回替换后的字符串 |

##### re.search(pattern, string, flags=0)

在一个字符串中搜索匹配正则表达式的第一个位置，返回 match 对象

- pattern：正则表达式的字符串或原生字符串表示
- string：待匹配字符串
- flags：正则表达式使用时的控制标记

| 常用标记           | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| re.I-re.IGNORECASE | 忽略正则表达式的大小写，[A‐Z]能够匹配小写字符                |
| re.M-re.MULTILINE  | 正则表达式中的^操作符能够将给定字符串的每行当作匹配开始      |
| re.S-re.DOTALL     | 正则表达式中的.操作符能够匹配所有字符，默认匹配除换行外的所有字符 |

实例

```python
import re
match = re.search(r'[1-9]\d{5}', 'BIT 100081')
if match:
    print(match.group(0))
    pass
# 输出
100081
```

##### re.match(pattern, string, flags=0)

从一个字符串的开始位置起匹配正则表达式，返回 match 对象

- pattern：正则表达式的字符串或原生字符串表示
- string：待匹配字符串
- flags：正则表达式使用时的控制标记

实例

```python
import re
match = re.match(r'[1-9]\d{5}', 'BIT 100081')
if match:
    print(match.group(0))
    pass
# 输出
error

import re
match = re.match(r'[1-9]\d{5}', '100081 BIT')
if match:
    print(match.group(0))
    pass
# 输出
100081
```

##### re.findall(pattern, string, flags=0)

搜索字符串，以列表类型返回全部能匹配的子串

- pattern：正则表达式的字符串或原生字符串表示
- string：待匹配字符串
- flags：正则表达式使用时的控制标记

实例

```python
import re
ls = re.findall(r'[1-9]\d{5}', 'BIT100081 TSU100084')
if match:
    print(ls)
    pass
# 输出
['100081', '100084']
```

##### re.split(pattern, string, maxsplit=0, flags=0)

将一个字符串按照正则表达式匹配结果进行分割，返回列表类型

- pattern：正则表达式的字符串或原生字符串表示
- string：待匹配字符串
- maxsplit：最大分割数，剩余部分作为最后一个元素输出
- flags：正则表达式使用时的控制标记

实例

```python
import re
print(re.split(r'[1-9]\d{5}', 'BIT100081 TSU100084'))
# 输出
['BIT', 'TSU', '']

print(re.split(r'[1-9]\d{5}', 'BIT100081 TSU100084', maxsplit=1))
# 输出
['BIT', 'TSU100084']
```

##### re.finditer(pattern, string, flags=0)

搜索字符串，返回一个匹配结果的迭代类型，每个迭代元素是 match 对象

- pattern 正则表达式的字符串或原生字符串表示
- string 待匹配字符串
- flags 正则表达式使用时的控制标记

实例

```python
import re
for m in re.finiter(r'[1-9]\d{5}', 'BIT100081 TSU100084')
	if m:
    	print(m.group(0))
# 输出
100081
100084
```

##### re.sub(pattern, repl, string, count=0, flags=0)

在一个字符串中替换所有匹配正则表达式的子串，返回替换后的字符串

- pattern：正则表达式的字符串或原生字符串表示
- repl：替换匹配字符串的字符串
- string：待匹配字符串
- count：匹配的最大替换次数
- flags：正则表达式使用时的控制标记

实例

```python
import re
re.sub(r'[1-9]\d{5}',':zipcode' 'BIT100081 TSU100084')
# 输出
'BIT:zipcode TSU:zipcode'
```

#### Re 库的等价用法

函数式用法：一次性操作

> rst = re.search(r'[1‐9]\d{5}', 'BIT 100081')

面向对象用法：编译后的多次操作

> pat = re.compile(r'[1‐9]\d{5}')
> rst = pat.search('BIT 100081')

##### regex = re.compile(pattern, flags=0)

将正则表达式的字符串形式编译成正则表达式对象

- pattern：正则表达式的字符串或原生字符串表示
- flags：正则表达式使用时的控制标记

实例

```python
regex = re.compile(r'[1‐9]\d{5}')
```

### Re 库的 match 对象

#### Match 对象介绍

Match 对象是一次匹配的结果，包含匹配的很多信息

```python
>>>match = re.search(r'[1‐9]\d{5}', 'BIT 100081')
>>> if match:
print(match.group(0))
>>> type(match)
<class '_sre.SRE_Match'>
```

#### Match 对象的属性

| 属性    | 说明                                 |
| ------- | ------------------------------------ |
| .string | 待匹配的文本                         |
| .re     | 匹配时使用的 patter 对象（正则表达式） |
| .pos    | 正则表达式搜索文本的开始位置         |
| .endpos | 正则表达式搜索文本的结束位置         |

#### Match 对象的方法

| 方法      | 说明                             |
| --------- | -------------------------------- |
| .group(0) | 获得匹配后的字符串               |
| .start()  | 匹配字符串在原始字符串的开始位置 |
| .end()    | 匹配字符串在原始字符串的结束位置 |
| .span()   | 返回(.start(), .end())           |

Match 对象实例

```python
>>>import re
>>>m = re.search(r'[1-9]\d{5}', 'BIT100081 TSU100084')
>>>m.string
'BIT100081 TSU100084'
>>>m.re
re.compile(r'[1-9]\d{5}')
>>>m.pos
0
>>>m.endpos
19
>>>m.group(0)
'100081'
>>>m.start
3
>>>m.end
9
>>>m.span
(3, 9)
```

### Re 库的贪婪匹配和最小匹配

#### 贪婪匹配

Re 库默认采用贪婪匹配，即输出匹配最长的子串

```python
>>> match = re.search(r'PY.*N', 'PYANBNCNDN')
>>> match.group(0)
'PYANBNCNDN'
```

#### 最小匹配

只要长度输出可能不同的，都可以通过在操作符后增加?变成最小匹配

```python
>>> match = re.search(r'PY.*?N', 'PYANBNCNDN')
>>> match.group(0)
'PYAN'
```

最小匹配操作符

| 操作符 | 说明                                  |
| ------ | ------------------------------------- |
| *?     | 前一个字符 0 次或无限次扩展，最小匹配   |
| +?     | 前一个字符 1 次或无限次扩展，最小匹配   |
| ??     | 前一个字符 0 次或 1 次扩展，最小匹配      |
| {m,n}? | 扩展前一个字符 m 至 n 次（含 n），最小匹配 |

## Scrapy 爬虫框架

### Scrapy 爬虫框架介绍

#### Scrapy

Scrapy 是一个快速功能强大的网络爬虫框架

#### Scrapy 的安装

```sh
pip install scrapy
```

测试

```sh
scrapy -h
```

#### Scrapy 爬虫框架结构

- 爬虫框架是实现爬虫功能的一个软件结构和功能组件集合。
- 爬虫框架是一个半成品，能够帮助用户实现专业网络爬虫。

分布式，数据流，“5+2”结构

图



##### 数据流的三个路径

> 1. Engine 从 Spider 处获得爬取请求(Request)
> 2. Engine 将爬取请求转发给 Scheduler，用于调度

> 3. Engine 从 Scheduler 处获得下一个要爬取的请求
> 4. Engine 将爬取请求通过中间件发送给 Downloader
> 5. 爬取网页后，Downloader 形成响应（Response），通过中间件发给 Engine
> 6. Engine 将收到的响应通过中间件发送给 Spider 处理

> 7. Spider 处理响应后产生爬取项（scraped Item）和新的爬取请求（Requests）给 Engine
> 8. Engine 将爬取项发送给 Item Pipeline（框架出口）
> 9. Engine 将爬取请求发送给 Scheduler

##### 数据流的出入口

Engine 控制各模块数据流，不间断从 Scheduler 处获得爬取请求，直至请求为空

用户编写（配置）：

> 框架入口：Spider 的初始爬取请求
框架出口：Item Pipeline

### Scrapy 爬虫框架解析

#### Engine

不需要用户修改

- 控制所有模块之间的数据流
- 根据条件触发事件

#### Downloader

不需要用户修改

- 根据请求下载网页

#### Scheduler

不需要用户修改

- 对所有爬取请求进行调度管理

#### Downloader Middleware

用户可以编写配置代码

- 目的：实施 Engine、Scheduler 和 Downloader 之间进行用户可配置的控制
- 功能：修改、丢弃、新增请求或响应

#### Spider

需要用户编写配置代码

- 解析 Downloader 返回的响应（Response）
- 产生爬取项（scraped item）
- 产生额外的爬取请求（Request）

#### Item Pipelines

需要用户编写配置代码

- 以流水线方式处理 Spider 产生的爬取项
- 由一组操作顺序组成，类似流水线，每个操作是一个 Item Pipeline 类型
- 可能操作包括：清理、检验和查重爬取项中的 HTML 数据、将数据存储到数据库

#### Spider Middleware

用户可以编写配置代码

- 目的：对请求和爬取项的再处理
- 功能：修改、丢弃、新增请求或爬取项

### requests 库和 Scarpy 爬虫的比较

#### requests vs Scrapy

相同点：

- 两者都可以进行页面请求和爬取，Python 爬虫的两个重要技术路线
- 两者可用性都好，文档丰富，入门简单
- 两者都没有处理 js、提交表单、应对验证码等功能（可扩展）

不同：

| requests                 | Scrapy                     |
| ------------------------ | -------------------------- |
| 页面级爬虫               | 网站级爬虫                 |
| 功能库                   | 框架                       |
| 并发性考虑不足，性能较差 | 并发性好，性能较高         |
| 重点在于页面下载         | 重点在于爬虫结构           |
| 定制灵活                 | 一般定制灵活，深度定制困难 |
| 上手十分简单             | 入门稍难                   |

#### 选用哪个技术路线开发爬虫呢？

- 非常小的需求，requests 库
- 不太小的需求，Scrapy 框架
- 定制程度很高的需求（不考虑规模），自搭框架，requests > Scrapy

### Scrapy 爬虫的常用命令

#### Scrapy 命令行

Scrapy 是为持续运行设计的专业爬虫框架，提供操作的 Scrapy 命令行

Scrapy 命令行格式：`scrapy <command> [options] [args]` 其中`<command>`代表 Scrapy 命令

#### Scrapy 常用命令

| 命令         | 说明               | 格式                                         |
| ------------ | ------------------ | -------------------------------------------- |
| startproject | 创建一个新工程     | `scrapy startproject <name> [dir]`           |
| genspider    | 创建一个爬虫       | `scrapy genspider [options] <name> <domain>` |
| settings     | 获得爬虫配置信息   | `scrapy settings [options]`                  |
| crawl        | 运行一个爬虫       | `scrapy crawl <spider>`                      |
| list         | 列出工程中所有爬虫 | `scrapy list`                                |
| shell        | 启动 URL 调试命令行  | `scrapy shell [url]`                         |

#### Scrapy 爬虫的命令行逻辑

为什么 Scrapy 采用命令行创建和运行爬虫？

- 命令行（不是图形界面）更容易自动化，适合脚本控制
- 本质上，Scrapy 是给程序员用的，功能（而不是界面）更重要

## Scrapy 爬虫基本使用

### Scrapy 爬虫的第一个实例

#### 演示 HTML 地址

演示 HTML 页面地址：http://python123.io/ws/demo.html
文件名称：demo.html

#### 1.产生步骤

应用 Scrapy 爬虫框架主要是编写配置型代码

步骤 1：建立一个 Scrapy 爬虫工程
选取一个目录（例如 D:\pycodes\），然后执行如下命令：

```sh
D:\pycodes>scrapy startproject python_demo
```

##### 生成的工作目录

- python_demo/：外层目录

  - scrapy.cfg：部署 Scrapy 爬虫的配置文件

  - python_demo/：Scrapy 框架的用户自定义 Python 代码

    - `__init__`.py：初始化脚本

    - items.py：Items 代码模板（继承类）

    - middlewares.py：Middlewares 代码模板（继承类）

    - pipelines.py：Pipelines 代码模板（继承类）

    - settings.py：Scrapy 爬虫的配置文件

    - spiders/：Spiders 代码模板目录（继承类）

      > 内层目录结构
      >
      > - `__init__`.py：初始文件，无需修改
      > - `__pycache__`/：缓存目录，无需修改

    - `__pycache__`/：缓存目录，无需修改

#### 2.产生步骤

步骤 2：在工程中产生一个 Scrapy 爬虫
进入工程目录（D:\pycodes\python_demo），然后执行如下命令：

```sh
D:\pycodes\python_demo>scrapy genspider demo python123.io
```

该命令作用：

> 该命令仅用于生成 demo.py，该文件也可以手工生成

1. 生成一个名称为 demo 的 spider
2. 在 spiders 目录下增加代码文件 demo.py

##### demo.py 文件

```python
# -*- coding: uft-8 -*-
improt scrapy

class DemoSpider(scrapy.Spider):
    name = "demo"
    allowed_domains = ["python123.io"]
    start_urls = ['http://python.io/']
    
    def parse (self, response):
        pass
    # parse()用于处理响应，解析内容形成字典，发现新的URL爬取请求
```

#### 3.产生步骤

步骤 3：配置产生的 spider 爬虫
配置：

1. 初始 URL 地址
2. 获取页面后的解析方式

```python
# -*- coding: uft-8 -*-
import Scrapy
class DemoSpider(scrapy.Spider):
	name= "demo"
#   allowed domains =["python123.io"] #可选
	start urls=['http://python123.io/ws/demo.html']
      def parse(self，response):
           fname = response.url.split(/)[-1]
        with open(fname, 'wb') as f:
              f.write(response.body)
         self.log("Saved file %s." %fname)
```



#### 4.产生步骤

步骤 4：运行爬虫，获取网页
在命令行下，执行如下命令：

```sh
D:\pycodes\python_demo>scrapy crawl demo
```

demo 爬虫被执行，捕获页面存储在 demo.html

##### demo.py 两个等价版本的区别

```python
import Scrapy
class DemoSpider(scrapy.Spider):
	name ='demo'
	start _rls = ['http://python123io/ws/demo.html']
    
class DemoSpider(scrapy.Spider):              
	name = 'demo'
	def startreuests(se1f):
	urls = [
        'http://python123.io/ws/demo.html'
    ]
	for url in urls:
	yield scrapy.Request(url=url, callback=self.parse)
```

### yield 关键字的使用

yield <==>生成器

- 包含 yield 语句的函数是一个生成器
- 生成器每次产生一个值（yield 语句），函数被冻结，被唤醒后再产生一个值
- 生成器是一个不断产生值的函数

生成器相比一次列出所有内容的优势：

- 更节省存储空间
- 响应更迅速
- 使用更灵活

### Scrapy 爬虫的基本使用

#### Scrapy 爬虫的使用步骤

步骤 1：创建一个工程和 Spider 模板
步骤 2：编写 Spider
步骤 3：编写 Item Pipeline
步骤 4：优化配置策略

#### Scrapy 爬虫的数据类型

- Request 类
- Response 类
- Item 类

##### Request 类

class scrapy.http.Request()

- Request 对象表示一个 HTTP 请求
- 由 Spider 生成，由 Downloader 执行

| 属性或方法 | 说明                                               |
| ---------- | -------------------------------------------------- |
| .url       | Request 对应的请求 URL 地址                           |
| .method    | 对应的请求方法，'GET' 'POST'等                     |
| .headers   | 字典类型风格的请求头                               |
| .body      | 请求内容主体，字符串类型                           |
| .meta      | 用户添加的扩展信息，在 Scrapy 内部模块间传递信息使用 |
| .copy()    | 复制该请求                                         |

##### Response 类

class scrapy.http.Response()

- Response 对象表示一个 HTTP 响应
- 由 Downloader 生成，由 Spider 处理

| 属性或方法 | 说明                               |
| ---------- | ---------------------------------- |
| .url       | Response 对应的 URL 地址              |
| .status    | HTTP 状态码，默认是 200              |
| .headers   | Response 对应的头部信息             |
| .body      | Response 对应的内容信息，字符串类型 |
| .flags     | 一组标记                           |
| .request   | 产生 Response 类型对应的 Request 对象  |
| .copy()    | 复制该响应                         |

##### Item 类

class scrapy.item.Item()

- Item 对象表示一个从 HTML 页面中提取的信息内容
- 由 Spider 生成，由 Item Pipeline 处理
- Item 类似字典类型，可以按照字典类型操作

#### Scrapy 爬虫提取信息方法

Scrapy 爬虫支持多种 HTML 信息提取方法：
• Beautiful Soup
• lxml
• re
• XPath Selector
• CSS Selector

##### CSS Selector 的基本使用

CSS Selector 由 W3C 组织维护并规范

```python
<HTML>.css('a::attr(href)').extract()
a：标签名称
href：标签属性
```

#### 如何进一步提高 scrapy 爬虫爬取速度？

setting.py 文件——配置并发连接选项

| 选项                           | 说明                                         |
| ------------------------------ | -------------------------------------------- |
| CONCURRENT_REQUESTS            | Downloader 最大并发请求下载数量，默认 32       |
| CONCURRENT_ITEMS               | Item Pipeline 最大并发 ITEM 处理数量，默认 100   |
| CONCURRENT_REQUESTS_PER_DOMAIN | 每个目标域名最大的并发请求数量，默认 8        |
| CONCURRENT_REQUESTS_PER_IP     | 每个目标 IP 最大的并发请求数量，默认 0，非 0 有效 |

