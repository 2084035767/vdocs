# JSONP

## 什么是 JSONP

JSONP（SONwithPadding）是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题

## JSONP 的实现原理

- 由于浏览器同源策略的限制，网页中无法通过 Ajax 请求非同源的接口数据。但是`<script>`标签不受浏览器同源策略的影响，可以通过 src 属性，请求非同源的 js 脚本。
- 因此，JSONP 的实现原理，就是通过`<script>`标签的 src 属性，请求跨域的数据接口，并通过函数调用的形式接收跨域接口响应回来的数据

## 实现一个简单的 JSONP

定义一个 success 回调函数：

```js
<script>
    function success(data) {
    	conso1e.1og('获取到了data数据:')'
		console.log(data)
}
</script>
```

通过`<script>`标签，请求接口数据

```js
<script src = "http://ajax.frontend.itheima.net:3006/api/jsonp?callback=success&name=zs&age=20"></script>
```

## JSONP 的缺点

- 由于 JSONP 是通过`<script>`标签的 src 属性，来实现跨域数据获取的，所以，JSONP 只支持 GET 数据请求不支持 POST 请求。
- 注意：**JSONP 和 Ajax 之间没有任何关系**，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 这个对象

## 使用 jQuery 中的 JSONP

jQuery 提供的.ajax0 函数，除了可以发起真正的 Ajax 数据请求之外，还能够发起 JSONP 数据请求，例如：

```js
$.ajax({
    ur1:"http://ajax.frontend.itheimanet:3006/api/jsonp?name=zs&age=20",
    //如果要使用$.ajax()发起 JSONP 请求，必须指定 datatype 为 jsonp
	dataType:'jsonp',
	success: function(res) {
        console.log(res)
    }
})
```

默认情况下，使用 jQuery 发起 JSONP 请求，会自动携带一个`callback=jQueryxxx`的参数，`jQueryxxx`是随机生成的一回调函数名称。

### 自定义参数及回调函数名称

在使用 jQuery 发起 JSONP 请求时，如果想要自定义 JSONP 的参数以及回调函数名称，可以通过如下两个参数来指定：

```js
$.ajax({
    url: 'http://ajax.frontend.itheima.net:3006/api/jsonp?name=zs&age=20',
	dataType: 'jsonp',
	//发送到服务端的参数名称，默认值为callback
	jsonp: 'callback',
	//自定义的回调函数名称，默认值为jQueryxxx格式
	jsonpCallback: 'abc',
	success: function(res) {
        console.log(res)
    }
})
```

### jQuery 中 JSONP 的实现过程

jQuery 中的 JSONP，也是通过`<script>`标签的 src 属性实现跨域数据访问的，只不过，jQuery 采用的是**动态创建和移除`<script>`标签**的方式，来发起 JSONP 数据请求。

- 在**发起 JSONP 请求**的时候，动态向`<header>`中 append 一个`<script>`标签
- 在**JSONP 请求成功**以后，动态从`<header>`中移除刚才 append 进去的`<script>`标签
