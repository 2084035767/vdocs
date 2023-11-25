# 三、HTML5 新特性

## 3.1 语义化标签

HTML5 引入了许多新的语义化标签，这些标签可以用于更好地描述网页内容的结构和含义，提高页面的可读性和可访问性。

### 页面结构分析

| 标签                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `<header>`                 | 表示导航或者介绍性的内容。                                   |
| `<main>`                   | 表示文章的主要内容。                                         |
| `<article>`                | 表示文章主体部分。                                           |
| `<aside>`                  | 表示跟文章主体不那么相关的部分，一般包含导航、广告等工具性质的内容。 |
| `<details> 和 <summary>`   | 表示可以查看或隐藏的其他详细信息。                           |
| `<figure> 和 <figcaption>` | 表示与文章相关的图像、照片等流内容。                         |
| `<footer>`                 | 通常出现在尾部，包含作者信息、相关链接、版权信息等。         |
| `<nav>`                    | 表示导航，在`header`中大多表示文章目录；在`aside`中大多是关联页面或者是整站地图 |
| `<section>`                | 表示文章中的“节”或“段”                                       |
| `<time>`                   | 表示日期或时间                                               |



## 3.2 多媒体

HTML5 可以通过 `video` 和 `audio` 标签来嵌入视频和音频文件，而不需要借助第三方插件。

### 视频

HTML5通过`<video>`标签来解决视频播放的问题。

```html
<video src="video/movie.mp4" controls autoplay></video>
```

属性

- `src`：资源路径。

- `autoplay`：自动播放。写成`autoplay`。
- `controls`：控制条。（建议写上）
- `loop`：循环播放。
- `preload`：预加载，同时设置 autoplay 时，此属性将失效。
- `width`：设置播放窗口宽度。
- `height`：设置播放窗口的高度。

**兼容性写法**

```html
<!--兼容性写法-->
<video controls autoplay>
    <source src="video/movie.mp4"/>
    <source src="video/movie.ogg"/>
    <source src="video/movie.webm"/>
    抱歉，不支持此视频
</video>
```



### 音频

HTML5通过`<audio>`标签来解决音频播放的问题。

```html
<audio src="music/yinyue.mp3" autoplay controls> </audio>
```

附加属性

- `autoplay`：自动播放。写成`autoplay`。
- `controls`：控制条。（建议写上）
- `loop`：循环播放。
- `preload`：预加载 同时设置 autoplay 时，此属性将失效。

**兼容性写法**

```html
<!--为了做到多浏览器支持-->

<!--推荐的兼容写法-->
<audio controls loop>
    <source src="music/yinyue.mp3"/>
    <source src="music/yinyue.ogg"/>
    <source src="music/yinyue.wav"/>
    抱歉，你的浏览器暂不支持此音频格式
</audio>
<!--代码解释：如果识别不出音频格式，就弹出那句“抱歉”-->
```

### 字幕

`<track>`标签用于指定视频的字幕，格式是 WebVTT（`.vtt`文件），放置在`<video>`标签内部。自闭和合标签。

```html
<video controls src="sample.mp4">
   <track label="英文" kind="subtitles" src="subtitles_en.vtt" srclang="en">
   <track label="中文" kind="subtitles" src="subtitles_cn.vtt" srclang="cn" default>
</video>
```

上面代码指定视频文件的英文字幕和中文字幕。

属性

- `label`：播放器显示的字幕名称，供用户选择。
- `kind`：字幕的类型，
  - `subtitles`：表示将原始声音成翻译外国文字，比如英文视频提供中文字幕。（默认值）
  - `captions`：表示原始声音的文字描述，通常是视频原始使用的语言，比如英文视频提供英文字幕。
- `src`：vtt 字幕文件的网址。
- `srclang`：字幕的语言，必须是有效的语言代码。
- `default`：是否默认打开，布尔属性。





**下面的区域以后再来探索吧**

----

## 3.3 Canvas 绘图

Canvas 是 HTML5 中用于绘制图形的 API，它可以轻松地创建复杂的动画和交互式应用程序，同时还可以与其他 Web 技术进行集成。

## 3.4 SVG 图形

SVG（Scalable Vector Graphics）是 HTML5 中用于创建矢量图形的标准。与传统的位图不同，SVG 是基于数学方程和矢量指令来描述图像，因此可以无限放大而不失真。SVG 可以用于创建各种图形，如图标、图表和动画等。

## 3.5 地理定位

HTML5 提供了 `navigator.geolocation` 对象，可以通过浏览器获取用户的地理位置信息，这为许多应用程序提供了方便和精准的位置服务。

## 3.6 Web 存储

HTML5 引入了两种 Web 存储机制，分别是本地存储和会话存储。本地存储 API 可以让 Web 应用程序在客户端保存数据，而不需要借助服务器进行交互。会话存储 API 可以让 Web 应用程序在会话期间临时保存数据。

## 3.7 Web Workers

Web Workers 是一种新的技术，它可以让 Web 应用程序在后台执行脚本任务，而不需要影响用户界面的响应速度。这对于处理复杂计算或大量数据的应用程序非常有用。

## 3.8 Web Sockets

HTML5 中的 Web Sockets 是一种双向通信协议，可以在浏览器和服务器之间建立持久性的连接，并实现实时数据传输。Web Sockets 可以用于实现在线游戏、聊天室和协作应用程序等。

## 3.9 WebRTC

WebRTC（Web Real-Time Communications）是一种新的技术，可以在浏览器之间进行实时音视频通信。WebRTC 可以让 Web 应用程序创建点对点连接，而不需要借助中间服务器进行中转。这对于实现视频会议、在线教育和远程医疗等应用程序非常有用。
