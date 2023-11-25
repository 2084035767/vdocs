# 三、基本命令

> 参数 `<container>` 可以是容器 id 或名称

容器基本命令

|             命令             |         说明         |
| :--------------------------: | :------------------: |
|  `docker start <container>`  |         开始         |
|  `docker stop <container>`   |         停止         |
| `docker restart <container>` |         重启         |
|  `docker pause <container>`  |         暂停         |
| `docker unpause <container>` |       取消暂停       |
|  `docker wait <container>`   |       阻塞容器       |
|  `docker kill <container>`   |     发送 SIGKILL     |
| `docker attach <container>`  |    连接到现有容器    |
|         `docker ps`          |  列出正在运行的容器  |
|        `docker ps -a`        |     列出所有容器     |
|  `docker logs <container>`   |       容器日志       |
| `docker inspect <container>` |       检查容器       |
| `docker events <container>`  |       容器事件       |
|  `docker port <container>`   |       公共端口       |
|   `docker top <container>`   |       运行进程       |
|  `docker stats <container>`  |     容器资源使用     |
|  `docker diff <container>`   | 列出对容器所做的更改 |

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
