# 六、高级主题

## 6.1 函数和参数

### 定义和调用函数

bash 函数定义语法如下：

```bash
[ function ] funname [()] {
    action;
    [return int;]
}
```

> 说明：
>
> 1. 函数定义时，`function` 关键字可有可无。
> 2. 函数返回值 return 返回函数返回值，返回值类型只能为整数（0-255）。如果不加 return 语句，shell 默认将以最后一条命令的运行结果，作为函数返回值。
> 3. 函数返回值在调用该函数后通过 `$?` 来获得。
> 4. 所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。

**定义、查看和删除函数**

```bash
# 第一种定义
function fn() {
   echo "helo"
}

# 第二种定义
fn() {
  echo "helo"
}

# 查看当前 Shell 已经定义的所有函数，可以使用 declare 命令
declare -f

# 查看单个函数的定义
declare -f functionName

# 输出所有已经定义的函数名，不含函数体
declare -F

# 删除函数，可以使用 unset 命令
unset -f functionName
```



### 函数参数和返回值

### 位置参数

位置参数是在调用一个函数并传给它参数时创建的变量。

```bash
cat(){
	echo "hello,$1"
}
cat world
# Output: hello,world
```

位置参数变量表：

| 变量           | 描述                           |
| -------------- | ------------------------------ |
| `$0`           | 脚本名称                       |
| `$1 … $9`      | 第 1 个到第 9 个参数列表       |
| `${10} … ${N}` | 第 10 个到 N 个参数列表        |
| `$*` or `$@`   | 除了`$0`外的所有位置参数       |
| `$#`           | 不包括`$0`在内的位置参数的个数 |
| `$FUNCNAME`    | 函数名称（仅在函数内部有值）   |

**函数处理参数**

另外，还有几个特殊字符用来处理参数：

| 参数处理 | 说明                                            |
| -------- | ----------------------------------------------- |
| `$#`     | 返回参数个数                                    |
| `$*`     | 返回所有参数                                    |
| `$$`     | 脚本运行的当前进程 ID 号                        |
| `$!`     | 后台运行的最后一个进程的 ID 号                  |
| `$@`     | 返回所有参数                                    |
| `$-`     | 返回 bash 使用的当前选项，与 set 命令功能相同。 |
| `$?`     | 函数返回值                                      |

### return 命令

`return`命令用于从函数返回一个值。函数执行到这条命令，就不再往下执行了，直接返回了。

函数将返回值返回给调用者。如果命令行直接执行函数，下一个命令可以用`$?`拿到返回值。

如果函数没有`return`返回值，用`$?`获取的返回值是`0`

```bash
cat(){
	return 1
}
cat
echo $?
# Output: 1
```



### 全局变量和局部变量

> 小心：Bash 函数体内直接声明的变量，属于全局变量，整个脚本都可以读取。

函数体内不仅可以声明全局变量，还可以修改全局变量。

**local 命令**

函数里面可以用`local`命令声明局部变量。

`local`命令声明的变量，只在函数体内有效，函数体外没有定义。

```bash
fn () {
  local a
  foo=1
  echo "fn: a = $a"
}

fn
echo "global: a = $a"
# Output: 
#	fn: a = 1
#	global: a =
```



## 6.2 文件处理和管道

### 目录堆栈

**cd -**

Bash 可以记忆用户进入过的目录。默认情况下，只记忆前一次所在的目录，`cd -`命令可以返回前一次的目录。

```bash
# 当前目录是 /path/to/foo
$ cd bar

# 重新回到 /path/to/foo
$ cd -
```

**pushd**

如果希望记忆多重目录，可以使用`pushd`命令和`popd`命令。它们用来操作目录堆栈。

`pushd`命令的用法类似`cd`命令，可以进入指定的目录。

第一次使用`pushd`命令时，会将当前目录先放入堆栈，然后将所要进入的目录也放入堆栈，位置在前一个记录的上方。以后每次使用`pushd`命令，都会将所要进入的目录，放在堆栈的顶部。

```bash
$ pushd dirname
```

**popd**

`popd`命令不带有参数时，会移除堆栈的顶部记录，并进入新的栈顶目录（即原来的第二条目录）。

**例子**

```bash
# 当前处在主目录，堆栈为空
$ pwd
/home/me

# 进入 /home/me/foo
# 当前堆栈为 /home/me/foo /home/me
$ pushd ~/foo

# 进入 /etc
# 当前堆栈为 /etc /home/me/foo /home/me
$ pushd /etc

# 进入 /home/me/foo
# 当前堆栈为 /home/me/foo /home/me
$ popd

# 进入 /home/me
# 当前堆栈为 /home/me
$ popd

# 目录不变，当前堆栈为空
$ popd
```

**两个命令的参数**

|      |                                                              |
| ---- | ------------------------------------------------------------ |
| `-n` | 表示仅操作堆栈，不改变目录。                                 |
| 整数 | 接受一个整数作为参数，该整数表示堆栈中指定位置的记录（从0开始）。 |
| 目录 | 接受一个目录作为参数，表示将该目录放到堆栈顶部，并进入该目录。`popd`没有这个参数。 |



### dirs 命令

`dirs`命令可以显示目录堆栈的内容，一般用来查看`pushd`和`popd`操作后的结果。

```
$ dirs
~/foo/bar ~/foo ~
```

| 参数 | 作用                                                 |
| ---- | ---------------------------------------------------- |
| `-c` | 清空目录栈。                                         |
| `-l` | 用户主目录不显示波浪号前缀，而打印完整的目录。       |
| `-p` | 每行一个条目打印目录栈，默认是打印在一行。           |
| `-v` | 每行一个条目，每个条目之前显示位置编号（从0开始）。  |
| `+N` | `N`为整数，表示显示堆顶算起的第 N 个目录，从零开始。 |
| `-N` | `N`为整数，表示显示堆底算起的第 N 个目录，从零开始。 |



### 文件处理

在bash编程中，你可以使用各种命令来处理文件。

读取文件内容

```bash
# 将文件的内容输出到终端
$ cat file.txt

# 显示文件的前10行
$ head -n 10 file.txt

# 显示文件的最后5行
$ tail -n 5 file.txt
```

写入文件

```bash
# 将文本写入文件。如果文件不存在，则创建文件；如果文件已存在，则覆盖文件内容
$ echo "Hello, World!" > file.txt

# 将文本追加到文件末尾
$ echo "Hello, World!" >> file.txt
```

文件重定向

```bash
# 将命令的输出重定向到文件，覆盖文件内容
$ command > file.txt

# 将命令的输出追加到文件末尾
$ command >> file.txt

# 将文件内容作为命令的输入
$ command < file.txt
```

文件比较和搜索

```bash
# 比较两个文件的差异
$ diff file1.txt file2.txt

# 在文件中搜索匹配指定模式的行
$ grep pattern file.txt
```

文件权限和属性

```bash
# 显示文件的详细信息，包括权限、所有者等
$ ls -l file.txt

# 修改文件的权限
$ chmod permissions file.txt

# 修改文件的所有者
$ chown owner file.txt
```



### 管道

管道允许将一个命令的输出连接到另一个命令的输入，以便进行连续的数据处理。使用竖线符号`|`来创建管道。

```bash
$ command1 | command2
# `command1`的输出将成为`command2`的输入
```

使用管道将一系列命令连接在一起来处理文件的内容

> 解读：首先使用`cat`命令读取文件内容，然后将结果传递给`grep`命令进行关键字匹配，接着将结果传递给`sort`命令进行排序，最后将结果传递给`uniq`命令去除重复行。

```bash
cat file.txt | grep "keyword" | sort | uniq
```



## 6.3 扩展

Shell 接收到用户输入的命令以后，会根据空格将用户的输入，拆分成一个个词元（token）。然后，Shell 会扩展词元里面的特殊字符，扩展完成后才会调用相应的命令。

这种特殊字符的扩展，称为模式扩展（globbing）。其中有些用到通配符，又称为通配符扩展（wildcard expansion）。Bash 一共提供八种扩展。

> 注意：
>
> - Bash 是先进行扩展，再执行命令。因此，扩展的结果是由 Bash 负责的，与所要执行的命令无关。
> - 通配符是先解释，再执行。
> - 文件名扩展在不匹配时，会原样输出。
> - 只适用于单层路径。
> - 文件名可以使用通配符。
> - 

**关闭/打开扩展**

```bash
# 扩展默认开启
# 关闭扩展
set -o noglob
# 或者
set -f

# 打开扩展
set +o noglob
# 或者
set +f
```

### 八大扩展

| 扩展               | 作用                                                         |                                                              |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `~`                | 自动扩展成当前用户的主目录。`~+`会扩展成当前所在的目录，等同于`pwd`命令。 |                                                              |
| `?`                | 代表文件路径里面的任意单个字符，不包括空字符。               |                                                              |
| `*`                | 代表文件路径里面的任意数量的任意字符，包括零个字符。Bash 4.0 引入了一个参数`globstar`，当该参数打开时，允许`**`匹配零个或多个子目录。 |                                                              |
| `[...]`            | 匹配括号之中的任意一个字符。只有文件确实存在的前提下才会扩展。如果文件不存在，就会原样输出。 | 如果需要匹配`[`字符，可以放在方括号内，比如`[[aeiou]`。如果需要匹配连字号`-`，只能放在方括号内部的开头或结尾，比如`[-aeiou]`或`[aeiou-]`。 |
| 式`[start-end]`    | 表示匹配一个连续的范围。这种简写形式有一个否定形式`[!start-end]`，表示匹配不属于这个范围的字符。 |                                                              |
| 展`{...}`表        | 表示分别扩展成大括号里面的所有值，各个值之间使用逗号分隔。   |                                                              |
| 式`{start..end}`， | 表示扩展成一个连续序列。这种简写形式还可以使用第二个双点号（`start..end..step`），用来指定扩展的步长。 |                                                              |
| `$`开              | Bash 将美元符号`$`开头的词元视为变量，将其扩展成变量值       |                                                              |
| `$(...)`可         | 可以扩展成另一个命令的运行结果，该命令的所有输出都会作为返回值。另一种较老的语法，子命令放在反引号之中，也可以扩展成命令的运行结果。 |                                                              |
| `$((...))`可以     | 可以扩展成整数运算的结果                                     |                                                              |
| `[[:class:]]`表示  | 扩展成某一类特定字符之中的一个。                             |                                                              |

### 量词语法

量词语法用来控制模式匹配的次数。一般是默认打开的。

量词语法有下面几个

- `?(pattern-list)`：模式匹配零次或一次。
- `*(pattern-list)`：模式匹配零次或多次。
- `+(pattern-list)`：模式匹配一次或多次。
- `@(pattern-list)`：只匹配一次模式。
- `!(pattern-list)`：匹配给定模式以外的任何内容。

### shopt 命令

`shopt`命令可以调整 Bash 的行为。它有好几个参数跟通配符扩展有关。

**`shopt`命令的使用**

```bash
# 打开某个参数
$ shopt -s [optionname]

# 关闭某个参数
$ shopt -u [optionname]

# 查询某个参数关闭还是打开
$ shopt [optionname]
```

| 参数       |                                                              |
| ---------- | ------------------------------------------------------------ |
| dotglob    | 可以让扩展结果包括隐藏文件（即点开头的文件）。               |
| nullglob   | 可以让通配符不匹配任何文件名时，返回空字符。                 |
| failglob   | 使得通配符不匹配任何文件名时，Bash 会直接报错，而不是让各个命令去处理。 |
| extglob    | 使得 Bash 支持 ksh 的一些扩展语法。它默认应该是打开的。      |
| nocaseglob | 可以让通配符扩展不区分大小写。                               |
| globstar   | 可以使得`**`匹配零个或多个子目录。该参数默认是关闭的。       |

## 参考三三：

- [shell-tutorial](https://wangchujiang.com/shell-tutorial/index.html)
- [一篇文章让你彻底掌握 Shell](https://dunwu.github.io/waterdrop/pages/ea6ae1/#%E7%AE%80%E4%BB%8B)
- [Bash 脚本教程 | 网道](https://wangdoc.com/bash/)
