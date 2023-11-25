# 四、定制文件

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
