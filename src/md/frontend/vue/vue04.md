#  四、Vue CLI

## 4.1 Vue CLI 简介

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

## 4.2 创建项目

安装vue-cli

::: tab-code 

@tab npm

```bash
npm install -g vue-cli
```

@tab yarn

```bash
yarn add -g vue-cli
```

@tab pnpm

```bash
pnpm add -g vue-cli
```

- 项目创建

```bash
vue create vue3-demo
```

## 4.3 项目目录结构



```bash
├── node_modules     # 项目依赖包目录，存放下载依赖的文件夹
├── public           # 存放不会变动静态的文件，它与src/assets的区别在于，public目录中的文件不被webpack打包处理，会原样拷贝到dist目录下
│   ├── favicon.ico  # 在浏览器上显示的图标
│   └── index.html   # 主页面文件
├── src              # 源码文件夹
│   ├── assets       # 存放组件中的静态资源
│   ├── components   # 存放一些公共组件
│   ├── views        # 存放所有的路由组件
│   ├── App.vue      # 应用根主组件
│   ├── main.js      # 应用入口 js
│   ├── router       # 路由配置文件
│   └── store        # vuex状态管理文件
├── .eslintrc.js     # eslint相关配置
├── .gitignore       # git 版本管制忽略的配置
├── .postcssrc.js    # postcss一种对css编译的工具，类似babel对js的处理
├── babel.config.js  # babel 的配置,即ES6语法编译配置
├── package.json     # 项目基本信息,包依赖配置信息等
└── yarn.lock        # 用于记录当前状态下实际安装的各个包的具体来源和版本号等, 保证其他人在 npm install 项目时大家的依赖能保证一致.
```

- 开发规范
  - 命名规范（文件命名，变量，函数，class， id） 驼峰， - _ 约定法
  - 目录规范（目录如何建立） 划分目录结构 约定法
