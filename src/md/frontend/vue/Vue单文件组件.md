# Vue 单文件组件

## 传统组件的问题和解决方案

问题

- 全局定义的组件必须保证组件的名称不重复
- 字符串模板缺乏语法高亮，在 HTML 有多行的时候，需要用到丑随的\
- 不支持 CSS 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- 没有构建步骤限制，只能使用 HTML 和 ES5 JavaScript 而不能使用预处理器（如：Babel）

解决方案

- 针对传统组件的问题，Vue 提供了一个解决方案    使用 Vue 单文件组件。

3.Vue 单文件组件
3.1 传统组件的问题和解决方案
1.问题
.  全局定义的组件必须保证组件的名称不重复
字符串模板缺乏语法高亮，在 HTML 有多行的时候，需要用到丑随的\
   3. 不支持 CSS 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
4  没有构建步骤限制，只能使用 HTML 和 ES5JavaScript 而不能使用预处理器（如：Babel）
2.解决方案
针对传统组件的问题，Vue 提供了一个解决方案    使用 Vue 单文件组件。

## Vue 单文件组件的基本用法

- template 组件的模板区域
- script 业务逻辑区域
- style 样式区域

```vue
<template>
<!--这里用于定义vue组件的模板内容 -->
</template> 

<script>
//这里用于定义vue组件的业务逻辑
export default {
	data: () {return{} }, //私有数据
	methods: {} //处理函数
	//...其它业务逻辑
}
</script>

<style scoped>
/*这里用于定义组件的样式*/
</style>
```

#### webpack 中配置 vue 组件的加载器

1. 运行 `npm i vue-loader vue-template-compiler -D`命令

2. 在 webpack.config.js 配置文件中，添加 vue-loader 的配置项如下：

   ```js
   const VueLoaderPlugin = require('vue-loader/lib/plugin')
   module.exports = {
       module: {
   		rules: [
               //...其它规则
               { test: /\.vue$/, loader: 'vue-loader' }
           ]
       },
       plugins: [
   		//...其它插件
   		new VueLoaderPlugin() //请确保引入这个插件！
       ]
   }
   ```

#### 在 webpack 项目中使用 Vue

1. 运行`npm i vue -S`安装  vue

2. 在 src -> index.js 入口文件中，通过 `import Vue from'vue'`来导入 vue 构造函数

3. 创建 vue 的实例对象，并指定要控制的 e1 区域

4. 通过 render 函数染 APP 根组件
   ```js
   //1. 导入 vue 构造函数
   import Vue from  'vue'
   //2. 导入 App根组件
   import App from './components/App.vue'
   
   const vm = new Vue({
       //3.指定vm实例要控制的页面区域
   	e1: ''#app',
    	//4.通过render函数，把指定的组件染到e1区域中
   	render: h => h(App)
   })
   ```

#### webpack 打包

上线之前需要通过 webpack 将应用进行整体打包，可以通过 package.json 文件配置打包命令：

```json
// 在package.json文件中配置webpack打包命令
//该命令默认加载项目根目录中的webpack.config.js配置文件
"scripts": {
    用于打包的命令
	"build": "webpack -p",
	//用于开发调试的命令
	"dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000",
},
```