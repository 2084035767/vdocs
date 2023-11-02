# Docker 入门

## Docker 简介

- Docker 是一个开源的应用容器引擎，基于 [Go 语言](https://www.runoob.com/go/go-tutorial.html) 并遵从 Apache2.0 协议开源。

- Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

- 容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。

## 基本概念

Docker 包括三个基本概念

- 镜像（`Image`）
  - 镜像定制文件（Dockerfile）
- 容器（`Container`）
- 仓库（`Repository`）

### 镜像

**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

镜像使用了 Union FS 的技术，将其设计为分层存储的架构，镜像只是一个虚拟的概念，其实际体现并非由一个文件组成，而是由一组文件系统组成，或者说，由多层文件系统联合组成。

#### 镜像定制文件

**Docker 镜像定制文件** 可以定制自己所需项目工程的镜像，文件名称一般为 Dockerfile。在文件中需要 Docker 特殊的命令进行定制

### 容器

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。

### 仓库

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，[Docker Registry](https://example.com) 就是这样的服务。

一个 **Docker Registry** 中可以包含多个 **仓库**（`Repository`）；每个仓库可以包含多个 **标签**（`Tag`）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 `<仓库名>:<标签>` 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。

以 [Ubuntu 镜像](https://hub.docker.com/_/ubuntu) 为例，`ubuntu` 是仓库的名字，其内包含有不同的版本标签，如，`16.04`, `18.04`。我们可以通过 `ubuntu:16.04`，或者 `ubuntu:18.04` 来具体指定所需哪个版本的镜像。如果忽略了标签，比如 `ubuntu`，那将视为 `ubuntu:latest`。

仓库名经常以 *两段式路径* 形式出现，比如 `jwilder/nginx-proxy`，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。但这并非绝对，取决于所使用的具体 Docker Registry 的软件或服务。



## 基本命令

> 参数 `<container>` 可以是容器 id 或名称

容器基本命令

|             命令              |      说明      |
| :---------------------------: | :------------: |
|  `docker start <container>`  |      开始      |
| `docker stop <container>` |      停止      |
| `docker restart <container>` |      重启      |
|  `docker pause <container>`  |      暂停      |
| `docker unpause <container>` |    取消暂停    |
| `docker wait <container>` |    阻塞容器    |
| `docker kill <container>` |  发送 SIGKILL  |
| `docker attach <container>` | 连接到现有容器 |
| `docker ps`                   | 列出正在运行的容器   |
| `docker ps -a`                | 列出所有容器         |
| `docker logs <container>` | 容器日志             |
| `docker inspect <container>` | 检查容器             |
| `docker events <container>` | 容器事件             |
| `docker port <container>` | 公共端口             |
| `docker top <container>` | 运行进程             |
| `docker stats <container>` | 容器资源使用         |
| `docker diff <container>` | 列出对容器所做的更改 |

镜像基本命令

|                命令                |          说明          |
| :--------------------------------: | :--------------------: |
|          `docker images`           |        列出镜像        |
|         `docker rmi nginx`         |        删除镜像        |
|   `docker load < ubuntu.tar.gz`    | 加载一个 tarred 存储库 |
|  `docker load --input ubuntu.tar`  | 加载一个 tarred 存储库 |
| `docker save busybox > ubuntu.tar` | 将镜像保存到 tar 存档  |
|          `docker history`          |     显示镜像的历史     |
|       `docker commit nginx`        |   将容器另存为镜像。   |
|   `docker tag nginx eon01/nginx`   |        标记镜像        |
|     `docker push eon01/nginx`      |        推送镜像        |
|          `docker build .`          |        构建镜像        |

**拉取镜像**：`$ docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`

> - Docker 镜像仓库地址：地址的格式一般是 `<域名/IP>[:端口号]`。默认地址是 Docker Hub(`docker.io`)。
>
> - 仓库名：如之前所说，这里的仓库名是两段式名称，即 `<用户名>/<软件名>`。对于 Docker Hub，如果不给出用户名，则默认为 `library`，也就是官方镜像。

**运行容器**：`$ docker run [选项] 80:80 nginx`

- `-d` - 以分离模式运行容器
- `-p 80:80` - 将端口 80 映射到容器中的端口 80

- `-it` - 交互式 bash 模式
- `--rm` - 容器终止运行后自动删除容器文件
- `--name+名称` - 指定名称
- `nginx` - 要使用的镜像

## 定制文件

> 在 Dockerfile 的目录中可以创建`.dockerignore`文件来忽略不需要的文件

==Dockerfile 中 FROM 是必备的指令，并且必须是第一条指令==

主要命令

|                      命令                       |                     说明                      |
| :---------------------------------------------: | :-------------------------------------------: |
|                  `FROM image`                   |                构建的基础镜像                 |
| `COPY [--chown=<user>:<group>] <src>... <dest>` |  将上下文中的路径复制到位置 `dest` 的容器中   |
| `ADD [--chown=<user>:<group>] <src>... <dest>`  | 与 `COPY` 相同，但解压缩存档并接受 http url。 |
|                 `RUN <command>`                 |            在容器内运行任意命令。             |
|             `USER <user>[:<group>]`             |               设置默认用户名。                |
|           `WORKDIR /path/to/workdir`            |              设置默认工作目录。               |
|           `CMD command param1 param2`           |                 设置默认命令                  |
|             `ENV <key>=<value> ...`             |                 设置环境变量                  |
|     `EXPOSE <port> [<port>/<protocol>...]`      |           运行时侦听指定的网络端口            |

### Dockerfile 示例

today-in-history 项目

```txt
FROM python:3.8-slim-buster
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt
CMD ["python3", "app.py"]
```
