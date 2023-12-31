# 一、版本控制

**版本控制（Revision control）**是一种在开发的过程中用于管理我们对**文件**、**目录**或**工程**等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

> 简单说就是用于管理多人协同开发项目的技术。
> 
- 实现跨区域多人协同开发
- 追踪和记载一个或者多个文件的历史记录
- 组织和保护你的源代码和文档
- 统计工作量
- 并行开发、提高开发效率
- 跟踪记录整个软件的开发过程
- 减轻开发人员的负担，节省时间，同时降低人为错误

## 常见的版本控制工具

主流的版本控制器：

- **Git**
- **SVN**（Subversion）
- **CVS**（Concurrent Versions System）
- **VSS**（Micorosoft Visual SourceSafe）
- **TFS**（Team Foundation Server）
- Visual Studio Online

版本控制产品非常的多（Perforce、Rational ClearCase、RCS（GNU Revision Control System）、Serena Dimention、SVK、BitKeeper、Monotone、Bazaar、Mercurial、SourceGear Vault），现在影响力最大且使用最广泛的是 Git 与 SVN

## 版本控制分类

## 1. **本地版本控制 RCS**

记录文件每次的更新，可以对每个版本做一个快照，或是记录补丁文件，适合个人用

## 2. **集中版本控制 SVN**

所有的版本数据都存在服务器上，用户的本地只有自己以前所同步的版本，

如果不连网的话，用户就看不到历史版本，也无法切换版本验证问题，或在不同分支工作。而且，所有数据都保存在单一的服务器上，有很大的风险这个服务器会损坏，这样就会丢失所有的数据，当然可以定期备份。代表产品：SVN、CVS、VSS

## 3.**分布式版本控制 Git**

> 安全隐患：每个人都拥有全部的代码！
> 

所有版本信息仓库全部同步到本地的每个用户，这样就可以在本地查看所有版本历史，可以离线在本地提交，只需在连网时 push 到相应的服务器或其他用户那里。由于每个用户那里保存的都是所有的版本数据，只要有一个用户的设备没有问题就可以恢复所有的数据，但这增加了本地存储空间的占用。

不会因为服务器损坏或者网络问题，造成不能工作的情况！

## Git 与 SVN 的主要区别

- SVN 是**集中式版本控制系统**，版本库是集中放在中央服务器的，而工作的时候，用的都是自己的电脑，所以首先要从中央服务器得到最新的版本，然后工作，完成工作后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，对网络带宽要求较高。
- Git 是**分布式版本控制系统**，没有中央服务器，每个人的电脑就是一个完整的版本库，工作的时候不需要联网，因为版本都在本地。协同的方法：比如说自己在电脑上改了文件 A，其他人也在电脑上改了文件 A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。Git 可以直接看到更新了哪些代码和文件！Git 是目前世界上最先进的分布式版本控制系统。
