# 项目搭建

## 创建工作目录与常用指令

**工作目录（WorkSpace)**一般就是你希望 Git 帮助你管理的文件夹

> 可以是你项目的目录，也可以是一个空目录
>
>
> 建议不要有中文

日常使用只要记住下图 6 个命令：

![https://tvax3.sinaimg.cn/large/005SZA4oly1h104wk1oldj30w80g574y.jpg](https://tvax3.sinaimg.cn/large/005SZA4oly1h104wk1oldj30w80g574y.jpg)

## 本地仓库搭建

1. 创建全新的仓库，需要用 Git 管理的项目的根目录执行

```plain
 # 在当前目录新建一个Git代码库
 $ git init
```

1. 执行后可以看到，仅仅在项目目录多出了一个.git 目录

> .git 目录：有关于版本等的所有信息

## 克隆远程仓库

1. 另一种方式是克隆远程目录，由于是将远程服务器上的仓库完全镜像一份至本地

```plain
 # 克隆一个项目和它的整个代码历史(版本信息)
 $ git clone [url]
```
