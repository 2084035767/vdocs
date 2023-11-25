# 二、Git 环境配置

1. 打开 [Git 官网](https://git-scm.com/)下载 Git 对应操作系统的版本。
2. 如果官网下载太慢，可以使用镜像下载：[http://npm.taobao.org/mirrors/git-for-windows/](http://npm.taobao.org/mirrors/git-for-windows/)
3. 下载对应的版本即可安装
4. 安装：无脑下一步即可！

## 启动 Git

安装成功后在开始菜单中会有 Git 项，Git 下有 3 个程序：

> 任意文件夹下右键也可以看到对应的程序

- **Git Bash**：Unix 与 Linux 风格的命令行，使用最多，推荐最多
- **Git CMD**：Windows 风格的命令行
- **Git GUI**：图形界面的 Git，不建议初学者使用，尽量先熟悉常用命令

## 常用的 Linux 命令

1. `cd`：改变目录
2. `cd . .`：回退到上一个目录
3. `pwd`：显示当前所在的目录路径
4. `ls(ll)`：都是列出当前目录中的所有文件，只不过`ll`列出的内容更为详细
5. `touch`：新建一个文件，如 `touch index.js` 就会在当前目录下新建一个`index.js`文件
6. `rm`：删除一个文件，如`rm index.js` 就会把`index.js`文件删除
7. `mkdir`：新建一个目录
8. `rm -r`：删除一个文件夹，如`rm -r src` 删除`src`目录

> rm -rf / 切勿在 Linux 中尝试，删除电脑中全部文件！

1. `mv`：移动文件，`mv index.html` `src` `index.html` 是我们要移动的文件，`src` 是目标文件夹
2. `reset`：重新初始化终端/清屏
3. `clear`：清屏
4. `history`：查看命令历史
5. `help`：帮助
6. `exit`：退出
7. `#`：表示注释

**配合学习 Linux 入门**

## Git 配置

> 所有的配置文件，其实都保存在本地

查看配置 `git config -l`

查看不同级别的配置文件：

```plain
 #查看系统config
 git config --system --list

 #查看当前用户（global）配置
 git config --global  --list
```

## **Git 相关的配置文件**

1. `Git\etc\gitconfig` ：Git 安装目录下的 `gitconfig --system` 系统级
2. `C:\Users\(登陆用户名目录)\ .gitconfig` 只适用于当前登录用户的配置 `-global`全局

> 可以直接编辑配置文件，通过命令设置后会响应

## 设置用户名与邮箱（必要）

> 当你安装 Git 后，首先要做的事情是配置你的用户名称和 e-mail 地址
>
>
> **这是非常重要的，因为每次 Git 提交都会使用该信息**

配置命令：

```plain
 git config --global user.name "kuangshen"  #名称
 git config --global user.email 24736743@qq.com   #邮箱
```

特别：

1. **只需要做一次这个设置**，如果你传递了`-global` 选项，因为 Git 将总是会使用该信息来处理你在系统中所做的一切操作
2. 如果你希望在一个特定的项目中使用不同的名称或 e-mail 地址，你可以在该项目中运行该命令而不要--global 选项
3. `-global`为全局配置，不加为某个项目的特定配置