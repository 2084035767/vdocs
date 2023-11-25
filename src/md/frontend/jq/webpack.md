# 一、入门

### 1.1 简介

- 什么是 webpack？

  webpack 是一个流行的前端项目构建工具（打包工具），可以解决当前 web 开发中所面临的困境 webpack 提供了友好的模块化支持，以及代码压缩混滑、处理 js 兼容问题、性能优化等强大的功能，从而让程序员把工作的重心放到具体的功能实现上，提高了开发效率和项目的可维护性目前绝大多数企业中的前端项目，都是基于 webpack 进行打包构建的。

- webpack 能做什么？

### 1.2 安装 webpack

全局安装和本地安装



安装指定版本的 webpack

### 1.3 初步使用 webpack

#### 创建一个简单的项目

1. 运行`npm install webpack webpack-cli -D`命令，安装 webpack 相关的包

2. 在项目根目录中，创建名为 webpack.config.js 的 webpack 配置文件

3. 在 webpack 的配置文件中，初始化如下基本配置

   ```js
   module.exports = {
       mode: 'development' //mode用来指定构建模式
   }
   ```

4. 在 package.json 配置文件中的 scripts 节点下，新增 dev 脚本如下：

   ```js
   "scripts": {
   "dev": "webpack" //script节点下的脚本，可以通过npm run 执行
   }
   ```

   

5. 在终端中运行`npm run dev`命令，启动 webpack 进行项目打包

#### 配置文件

配置打包的入口与出口

webpack 的 4.x 版本中默认约定

- 打包的入口文件为 src -> index.js
- 打包的输出文件为 dist -> main.js

如果要修改打包的入口与出口，可以在 webpack.config.js 中新增如下配置信息

```js
const path = require('path') //导入node.js中专门操作路径的模块
module.exports = {
    entry:path.join(_dirname, './src/index.js'), //打包入口文件的路径
	output: {
        path: path.join(dirname, './dist'), //输出文件的存放路径
		filename: 'bundle.js' //输出文件的名称
    }	
}
```

#### 配置 webpack 的自动打包功能

1. 运行`npm install webpack-dev-server -D`命令，安装支持项目自动打包的工具

2. 修改 package.json -> scripts 中的 dev 命令如下：

   ```js
   "scripts": {
   "dev": "webpack-dev-server" //script节点下的脚本，可以通过npm run 执行
   }
   ```

   

3. src -> index.html 中 ，Script 脚本的引用路径，修改为“/buldle.js"

4. 运行`npm run dev`命令，重新进行打包

5. 在浏览器中访问http://1ocahost:8080 地址，查看自动打包效果

注意：

- `webpack-dev-server`  会启动一个实时打包的 http 服务器
- `webpack-dev-server` 打包生成的输出文件，默认放到了项目根目录中，而且是虚拟的、看不见的

#### 配置 html-webpack-plugin 生成预览页面

1. 运行`npm install html-webpack-plugin -D`命令，安装生成预览页面的插件

2. 修改 webpack.config.js 文件头部区域，添加如下配置信息

   ```js
   // 导入生成预览页面的插件，得到一个构造函数
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const htmlPlugin = new HtmlWebpackPlugin({ //创建插件的实例对象
   	template: './src/index.htm', //指定要用到的模板文件
   	filename: 'index.htm1' //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
   })
   ```

   

3. 修改 webpack.config.js 文件中向外暴露的配置对象，新增如下配置节点

   ```js
   module.exports = {
       plugins: [ htmlPlugin] //plugins数组是webpack打包期间会用到的一些插件列表
   }
   ```

#### 配置自动打包相关的参数

```js
//package.json中的配置
//--open打包完成后自动打开浏览器页面
//--host配置IP地址
//--port配置端口
"scripts": {
    "dev": "webpack-dev-server  --open --host 127.0.0.1 --port 8888"
},
```

## 

#### 执行构建命令



## 二、配置

### 2.1 基础配置

#### Entry 和 Output

#### Loader

## webpack 中的加载器

### 通过 loader 打包非 js 模块

在实际开发过程中，webpack 默认只能打包处理以 js 名结尾的模块，其他非 js 后名结尾的模块，webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！

loader 加载器可以协助 webpack 打包处理特定的文件模块，比如：

- less-loader 可以打包处理 .less 相关的文件
- sass=1oade 可以打包处理 .scss 相关的文件
- url-loader   可以打包处理 css 中与 url 路径相关的文件

### webpack 中的加载器的基本使用

#### 打包处理 css 文件

1. 运行 `npm i style-1oader css-1oader -D`命令，安装处理 css 文件的 loader
2. 在 webpack.config.js 的 module => rules 数组中，添加 loader 规则如下：

```js
//所有第三方文件模块的匹配规则
module:{
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
}
```

其中，test 表示匹配的文件类型， use 表示对应要调用的 loader

注意

- use 数组中指定的 loader 顺序是固定的
- 多个 loader 的调用顺序是：从后往前调用

#### 打包处理 less 文件

1. 运行`npm i less-loader less -D`命令

2. 在 webpack.config.js 的 module  => rules 数组中，添加 loader 规则如下：

   ```js
   //所有第三方文件模块的匹配规则
   module:{
       rules: [
           { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
       ]
   }
   ```

   #### 打包处理 scss 文件

   1. 运行`npm i sass-loader node-sass -D`命令

   2. 在 webpack.config.js 的 module => rules 数组中，添加 loader 规则如下

      ```js
      //所有第三方文件模块的匹配规则
      module:{
          rules: [
              { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
          ]
      }
      ```

      

#### 配置 postcss 自动添加 css 的兼容前

1. 运行`npm i postcss-loader autoprefixer -D`命令

2. 在项目根目录中创建 postcss 的配文件 postcss.config.js，开初始化如下配置

   ```js
   const autoprefixer = require('autoprefixer') //导入自动添加前的插件
   module.exports = {
       plugins: [ autoprefixer] //挂载插件
   }
   ```

3. 在 webpack.config.js 的 module => rules 数组中，修改 css 的 loader 规则如下：

   ```js
   module:{
       rules: [
           { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']}
       ]
   }
   ```

   #### 打包样式表中的图片和字体文件

   1. 运行 `npm i url-loader file-loader -D`命令

   2. webpack.config.jsE 的 module => rules 数组中，添加 loader 规则如下：

      ```js
      module:{
          rules: [
              { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|wOff2$/,
               use: 'url-loader?limit=16940'}
          ]
      }
      module：
             rules
                  test：/.jpglpnglgifbmplttfleotlsvglwoffIwOff2/
                                  ur1-1oader？1imit=16940
      ```

      其中?之后的是 loader 的参数项。
limit 用来指定图片的大小，单位是字节（byte），只有小于 limit 大小的图片，才会被转为 base64 图片

#### 打包处理 js 文件中的高级语法

1. 安装 babel 转换器相关的包：`npm i babel-loader @babel/core @babel/runtime -D`

2. 安装 babel 语法插件相关的包：`npm i @babel/preset-env @babel/plugin-transformruntime @babel/plugin-proposal-class-properties -D`

3. 在项目根目录中，创建 babel 配置文件 babel.config.js 并初始化基本配置如下：

   ```js
   module.exports = {
       presets:  ['@babel/preset-env'],
   	plugins:  ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
   }
   ```

4. 在 webpack.config.js 的 module => rules 数组中，添加 loader 规则如下：

   ```js
   // exclude 为排除项，表示 babel-loader不需要处理node_modules中的js文件
   {test: /\.js$/, use: 'babel-loader', exclude: /node modules/}
   ```

   

#### Plugin

### 2.2 高级配置
   plain 2.2.1 DevServer
    2.2.2 Resolve
    2.2.3 Externals
    2.2.4 Performance
    2.2.5 Optimization

## 三、进阶

### 3.1 模块热替换（HMR）
### 3.2 Tree Shaking
### 3.3 Code Splitting
### 3.4 懒加载（Lazy Load）
### 3.5 处理图片和字体
### 3.6 处理样式

## 四、实战应用

### 4.1 创建一个 React 应用
### 4.2 创建一个 Vue 应用
### 4.3 使用 webpack 打包多页面应用
### 4.4 基于 webpack 的工程化实践

## 五、优化与调试

### 5.1 性能优化
   plain 5.1.1 优化构建速度
    5.1.2 优化代码体积

### 5.2 调试 webpack
   plain 5.2.1 Source Map
    5.2.2 Chrome DevTools
