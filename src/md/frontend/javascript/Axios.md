# Axios

## 什么是 axios

- Axios 是专于**网络数据请求**的库。
- 相比于原生的 XMLHttpRequest 对象，axios**简单易用**。
- 相比于 jQuery，axios 更加**轻量化**，只专注于网络数据请求。

## axios 发起 GET 请求

  axios 发起 get 请求的语法：

```js
axios.get('ur1', {params:{/*参数*/}}).then(callback)
```

具体的请求示例如下：

```js
//请求的URL地址
var url = 'http://www.liulongbin.top:3006/api/get'
//请求的参数对象
var paramsObj = { name: 'zs', age:20 }
//调用axios.get()发起GET请求
axios.get(url, {params: paramsObj}).then(function(res){
    // res.data是服务器返回的数据
	var result = res.data
	conso1e.log(result)
})
```



## axios 发起 POST 请求   

 axios 发起 post 请求的语法：

```js
axios.post('ur1', {/*参数*/}).then(callback)
```

具体的请求示例如下：

```js
//请求的URL地址
var url = 'http://www.liulongbin.top:3006/api/post'
//请求的参数对象
var paramsObj = { name: 'zs', age:20 }
//调用axios.post()发起POST请求
axios.post(url, paramsObj).then(function(res){
    // res.data是服务器返回的数据
	var result = res.data
	conso1e.log(result)
})
```



## 直接使用 axios 发起请求

axios 也提供了类似于 jQuery 中$.ajax 的函数，语法如下：

```js
axios({
    method: '请求类型',
	ur1: '请求的UR地址',
	data: { /*POST数据*/ },
	params: { /*GET参数*/ }
}).then(callback)
```

### 直接使用 axios 发起 GET 请求

```js
axios({
    method: 'GET'
	ur1: 'http://www.liulongbin.top:3006/api/get',
	params: { //GET参数要通过params 属性提供
		name: 'zs',
		age: 20
	}
}).then(function(res) {
    console.1og(res.data)
})
```

### 直接使用 axios 发起 POST 请求

```js
axios({
    method: 'POST'
	ur1: 'http://www.liulongbin.top:3006/api/post',
	data: { //POST参数要通过 data 属性提供
		name: 'zs',
		age: 20
	}
}).then(function(res) {
    console.1og(res.data)
})
```