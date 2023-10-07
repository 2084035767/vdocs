# XMLHttpRequest Level2

## 新特性

1. 可以设置 HTTP 请求的时限
2. 可以使用 FormData 对象管理表单数据
3. 可以上传文件
4. 可以获得数据传输的进度信息

### 设置 HTTP 请求时限

有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的`XMLHttpRequest`对象，增加了`timeout`属性，可以设置 HTTP 请求的时限：

```javascript
xhr.timeout = 3000
```

上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止 HTTP 请求。与之配套的还有一个`timeout`事件，用来指定回调函数

```js
 xhr.ontimeout = function(event){
     alert(请求超时！)
 }
```



## FormData 对象管理表单数据

 Ajax 操作往往用来提交表单数据。为了方便表单处理，HTML5 新增了一个`FormData`对象，可以模拟表单操作:

```js                                
//1.新建FormData对象
var fd = new FormData()
//2.为FormData添加表单项
fd.append('unamne','17')
fd.append('upwd','123456')
//3.创建XHR对象
var Xhr = new XMLHttpRequest()
//4.指定请求类型与UR地址
xhr.open('POST','http://www.liulongoin.top:3006/ai/formdata')
//5.直接提交FormData对象，这与提交网页表单的效果，完全一样
xhr.send(fd)
```



`FormData`对象也可以用来获取网页表单的值，示例代码如下

```javascript
//获取表单元素
var form = document.querySelector(#form)
//监听表单元素的Submit事件
form.addEventListener('suomit',function(e){
    e.preventDefault()
    //根据form表单创建FormData对象，会自动将表单数据填充到FormData对象中
    var fd = new FormData(form)
	var xhr = new XMLHttpReaquest()
	xhr.open('POST'，,'http://www.liulongbin.top:3006/api/formdata')
	xhr.send(fd)
	xhr.onreadystatechange = function(){}
})
```



## 上传文件

实现步骤：

1. 定义 UI 结构
2. 验证是否选择了文件
3. 向`FormData`中追加文件
4. 使用`xhr`发起上传文件的请求
5. 监听`onreadystatechange`事件

### 定义 UI 结构

```html
<！--1.文件选择框-->
<input type="file" id="file1" />
<！--2.上传按钮-->
<button id="btnUpload">上传文件</button>
<br/>
<！--3.显示上传到服务器上的图片-->
<img src="" alt="" id="img" width="800" />
```

### 验证是否选择了文件

```js
//1.获取上传文件的按钮
var btnUpload = document.querySelector('#btnupload')
//2.为按钮添加click事件监听
btnUpload.addEventListener('click',function(){
    //3获取到选择的文件列表
var files = document.querySelector('#file1').files
if (files.length <= 0){
    return alert('请选择要上传的文件！')
	}
//...后续业务逻
})
```

### 向`FormData`中追加文件

```js
//1.创建FormData对象
var fd = newFormData()
//2.向FormData中追加文件
fd.append('avatar', files[0])
```

### 使用`xhr`发起上传文件的请求

```js
//1.创建xhr对象
var xhr = new XMLHttpRequest()
//2.调用open函数，指定请求类型与URL地址。其中，请求类型必须为POST
xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
//3发起请求
xhr.send(fd)
```

### 监听`onreadystatechange`事件

```js
xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseTxet)
        if (data.status === 200) {//上传文件成功
             //将服务器返回的图片地址，设置为<img>标签的Src属性
            document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
        }else {//上传文件失败
            console.log(data.message)
        }

    }
}
```



## 显示文件上传进度

 新版本的`XMLHttpRequest`对象中，可以通过监听`xhr.upload.onprogress`事件，来获取到文件的上传进度。语法格式如下：

```js
//创建XHR对象
var xhr = new XMLHttpRequest()
//监听xhr.upload的onprogress事件
xhr.upload.onprogress = function(e) {
   //e.lengthComputable是一个布尔值，表示当前上传的资源是否具有可计算的长度
	if(e.lengthComputable){
    //e.1oaded 已传输的字节
    //e.total  需传输的总字节
    var percentComplete = Math.ceil((e.1oaded / e.total) * 100)
	}
}
```

### 监听上传进度的事件

```js
xhr.upload.onprogress = function(e) {
    if (e.lengthComputable)
	//1.计算出当前上传进度的百分比
	var percentComplete = Math.ceil((e.1oaded / e.total) * 100)
	$('#percent')
		//2.设置进度条的宽度
		.attr('style', 'width:' + percentComplete + '%')
		//3显示当前的上传进度百分比
		.html(percentComplete + '%')
	}
}
```

### 监听上传完成的事件

```js
xhr.upload.onload = funtion() {
    $('#percent')
	//移除上传中的类样式
	.removeClass()
	//添加上传完成的类样式
	.addClass('progress-bar progress-bar-success')
}
```

