```shell
 ______     __  __     ______     __         __        
/\  ___\   /\ \_\ \   /\  ___\   /\ \       /\ \       
\ \___  \  \ \  __ \  \ \  __\   \ \ \____  \ \ \____  
 \/\_____\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_____\ 
  \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_____/ 
                                                       
```



## 一、简介

### 1.1 Shell 是什么

- `Shell` 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。

- `Shell` 既是一种命令语言，又是一种程序设计语言。

- `Shell` 是指一种应用程序，这个应用程序提供了一个界面供用户访问操作系统内核的服务。

### 1.2 Shell的作用

1. 提供命令行界面：`Shell` 提供了一种与操作系统进行交互的方式，用户可以通过输入命令来执行各种操作，如文件和目录管理、进程控制、系统配置等。命令行界面提供了更直接、灵活的控制方式，适用于各种场景和需求。
2. 执行脚本和自动化任务：`Shell` 脚本是一系列预定义的命令和操作的集合，通过编写脚本，可以将多个命令组合在一起，实现自动化的任务和批处理操作。脚本可以包含条件判断、循环结构和函数等，使得复杂的操作可以通过简单的脚本来完成。
3. 环境配置和管理：通过 `Shell`，用户可以设置和管理系统的环境变量，这些变量影响着系统的行为和配置。例如，可以设置 `PATH` 环境变量来指定可执行程序的搜索路径，设置 `LD_LIBRARY_PATH` 环境变量来指定共享库的搜索路径等。通过配置环境变量，可以方便地自定义系统的行为和运行环境。
4. 管理用户和权限：`Shell` 提供了管理用户和权限的功能，可以创建、删除用户账号，设置用户的权限和访问控制等。通过 `Shell`，管理员可以方便地管理系统的用户和权限，确保系统的安全性和稳定性。

### 1.3 Shell的种类

Linux 的 `Shell` 种类众多，常见的有：

- Bourne Shell（/usr/bin/sh或/bin/sh）

- Bourne Again Shell（/bin/bash）

- C Shell（/usr/bin/csh）

- K Shell（/usr/bin/ksh）

- Shell for Root（/sbin/sh）

  

> 由于 Bash 易用和免费，所以在日常工作中被广泛使用。同时，Bash 也是大多数 Linux 系统默认的 Shell。

## 二、基本知识

### 2.1 铺垫知识

#### 注释

用来解释或说明代码，解释器不解释执行

- 单行注释：以`#`开头，整行注释（行首，行尾均可）
- 多行注释：以`:<<EOF`开头，到`EOF`结束

```bash
# echo "这是单行注释"

echo "后面是注释" # 我是单行注释

:<<EOF
echo '这是多行注释'
echo '这是多行注释'
echo '这是多行注释'
EOF
```

#### shebang

在shell脚本中，`#!+解释器路径`来指定脚本的解释器，其中`#!`被称为shebang(也称为Hashbang)

常见shebang

```shell
# 指定 sh 解释器
#!/bin/sh
# 指定 bash 解释器
#!/bin/bash
# 自动在 PATH 环境变量中查找你指定的程序(推荐)
#!/usr/bin/env bash
```

#### echo命令

`echo`命令的作用是在屏幕输出一行文本，可以将该命令的参数原样输出。

| 参数 | 说明             |
| ---- | ---------------- |
| -n   | 取消末尾的回车符 |
| -e   | 开启转义         |

**输出普通字符串**

如果输出的是多行文本，即包括换行符。这时就需要把多行文本放在引号里面。

> 注意：在某些Shell环境中，echo命令默认会解释转义字符。
>
> 为了保持准确性，以下例子都使用`-e`参数。

```bash
echo "hello, world"
# Output: hello, world

echo -e "hello\nworld" # -e 开启转义
# Output: 
#	hello
#	world
```

**输出含转义的字符串**

```bash
echo -e "hello, \"world\""
# Output: hello, "world"
```

**输出含不换行符的字符串**

```bash
# 默认情况下，echo输出的文本末尾会有一个回车符。
echo "hello"
echo "world"
# Output: 
#  hello
#  world

echo -n "hello" # -n 取消末尾的回车符
echo "world"
# Output:
#	helloworld
```

**输出重定向至文件**

```bash
echo "test" > test.txt
```

**输出执行结果**

```bash
echo `pwd`
# Output:(当前目录路径)
```

#### printf命令

`printf` 用于格式化输出字符串，类似与C语言中 printf 的使用。

`printf` 默认不会自动添加换行符，如果需要换行可以手动添加 `\n`。

**输出普通字符串**

```bash
printf "%d %s\n" 1 "hello"
# Output:1 hello

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出
printf "%s\n" hello world
# Output:
#	hello
#	world
```

**输出无参数**

```bash
# 如果没有参数，那么 %s 用 NULL 代替，%d 用 0 代替
printf "%s and %d \n"
# Output:
#	and 0
```

**格式化输出**

```bash
printf "%s %s %s\n" a b c d e f g h i j
# Output:
#  a b c
#  d e f
#  g h i
#  j
```

**printf 的转义符**

| 序列    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| `\a`    | 警告字符，通常为 ASCII 的 BEL 字符                           |
| `\b`    | 后退                                                         |
| `\c`    | 抑制（不显示）输出结果中任何结尾的换行字符（只在%b 格式指示符控制下的参数字符串中有效），而且，任何留在参数里的字符、任何接下来的参数以及任何留在格式字符串中的字符，都被忽略 |
| `\f`    | 换页（formfeed）                                             |
| `\n`    | 换行                                                         |
| `\r`    | 回车（Carriage return）                                      |
| `\t`    | 水平制表符                                                   |
| `\v`    | 垂直制表符                                                   |
| `\\`    | 一个字面上的反斜杠字符                                       |
| `\ddd`  | 表示 1 到 3 位数八进制值的字符。仅在格式字符串中有效         |
| `\0ddd` | 表示 1 到 3 位的八进制值字符                                 |

#### type命令

`type`命令用来判断命令的来源。

```bash
# 内置命令
type echo
# Output: echo is a shell builtin

# 外部命令
type ls
# Output: ls is hashed (/bin/ls)
```

`type`命令本身也是内置命令。

```bash
type type
# Output: type is a shell builtin
```

**`-a`参数**

`-a`参数可以查看一个命令的所有定义

```bash
type -a echo
# Output: echo is shell builtin
# Output: echo is /usr/bin/echo
# Output: echo is /bin/echo
# echo 命令既是内置命令，也有对应的外部程序。
```

**`-t`参数**

`-t`参数可以返回一个命令的类型：别名（alias），关键词（keyword），函数（function），内置命令（builtin）和文件（file）。

```bash
type -t bash
# Output: file
type -t if
# Output: keyword
```

#### 分号

分号（`;`）是命令的结束符，使得一行可以放置多个命令。

> 注意：使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。

```bash
clear; ls
```

### 2.2 变量和变量类型

#### 变量



**变量命名原则**

- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用 bash 里的关键字（可用 help 命令查看保留关键字）。

**声明变量**

访问变量的两种语法：`${var}` 和 `$var`

变量名外面的花括号是可选的，加花括号是为了帮助解释器识别变量的边界。

> 注意：
>
> - 赋值符号两侧不能有空格
>
> - 未初始化变量的值为`null`值，表示未赋值（注意null值不等于零）。但是似乎它在算术计算中的值是零。

```bash
hell="word"
echo ${hello}
# Output: word
```

**只读变量**

使用 `readonly` 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```bash
hello="word"
readonly hello; hello="bye"
# Output: read-only variable: hello
```

**删除变量**

使用 `unset` 命令可以删除变量。变量被删除后不能再次使用。

> 注意：`unset` 命令不能删除只读变量。

```bash
hello="word"
unset hello
echo ${hello}
# Output:（空）
```

#### 输出变量、export 命令

用户创建的变量仅可用于当前 Shell，子 Shell 默认读取不到父 Shell 定义的变量。为了把变量传递给子 Shell，需要使用`export`命令。这样输出的变量，对于子 Shell 来说就是环境变量。

`export`命令用来向子 Shell 输出变量。

> 注意：子 Shell 如果修改继承的变量，不会影响父 Shell。

```bash
export NAME=hello
```



#### 变量类型

`set`命令可以显示所有变量（包括环境变量和自定义变量），以及所有的 Bash 函数。

- **局部变量**：局部变量是仅在某个脚本内部有效的变量。它们不能被其他的程序和脚本访问。
- **环境变量**：环境变量是对当前 shell 会话内所有的程序或脚本都可见的变量。创建它们跟创建局部变量类似，但使用的是 `export` 关键字，shell 脚本也可以定义环境变量。
- **shell变量**：shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行。

**常见的环境变量**

使用`env`命令或`printenv`命令，可以显示所有环境变量。

使用`printenv`命令或`echo`命令可以查看单个环境变量的值。注意：`printenv`命令后面的变量名，不用加前缀`$`。

|   变量    | 描述                                               |
| :-------: | -------------------------------------------------- |
|  `$HOME`  | 当前用户的用户目录                                 |
|  `$PATH`  | 用分号分隔的目录列表，shell 会到这些目录中查找命令 |
|  `$PWD`   | 当前工作目录                                       |
|  `$BASH`  | Bash二进制程序文件的路径                           |
| `$RANDOM` | 0 到 32767 之间的整数                              |
|  `$UID`   | 数值类型，当前用户的用户 ID                        |
|  `$PS1`   | 主要系统输入提示符                                 |
|  `$PS2`   | 次要系统输入提示符                                 |



#### 变量的默认值

Bash 提供四个特殊语法，跟变量的默认值有关，目的是保证变量不为空。

```bash
${varname:-word}
:<<EOF
如果变量 varname 存在且不为空，则返回它的值，否则返回 word。它的目的是返回一个默认值。 
EOF
。

${varname:=word}
:<<EOF
如果变量 varname 存在且不为空，则返回它的值，否则将它设为 word，并且返回 word。
EOF


${varname:+word}
:<<EOF
如果变量名存在且不为空，则返回 word，否则返回空值。它的目的是测试变量是否存在。
EOF


${varname:?message}
:<<EOF
如果变量 varname 存在且不为空，则返回它的值，否则打印出 varname: message ，并中断脚本的执行。如果省略了 message ，则输出默认的信息“parameter null or not set.”。它的目的是防止变量未定义。
EOF
```

上面四种语法如果用在脚本中，变量名的部分可以用数字`1`到`9`，表示脚本的参数。

```bash
filename=${1:?"filename missing."}
```



#### declare 命令

`declare`命令可以声明一些特殊类型的变量，为变量设置一些限制，比如声明只读类型的变量和整数类型的变量。

> 提示：
>
> - `declare`命令如果用在函数中，声明的变量只在函数内部有效，等同于`local`命令。
>
> - 不带任何参数时，`declare`命令输出当前环境的所有变量，包括函数在内，等同于不带有任何参数的`set`命令。

它的语法形式如下。

```bash
declare OPTION VARIABLE=value
```

`declare`命令的主要参数（OPTION）如下。

- `-a`：声明数组变量。
- `-f`：输出所有函数定义。
- `-F`：输出所有函数名。
- `-i`：声明整数变量。
- `-l`：声明变量为小写字母。
- `-p`：查看变量信息。
- `-r`：声明只读变量。
- `-u`：声明变量为大写字母。
- `-x`：该变量输出为环境变量。



### 2.3 表达式和运算符

#### 算术表达式

`((...))`语法可以进行整数的算术运算。

> 注意：这个语法不返回值。只要算术结果不是`0`，命令就算执行成功。如果算术结果为`0`，命令就算执行失败。

```bash
((a = 5 + 5))
echo $a
# Output: 10

# 支持使用C风格操作符来处理变量
(( a++ ))
echo $a
# Output: 11

# ((...)) 会自动忽略内部的空格
((2+2))
# 等同于 (( 2 + 2 ))

# 算数结果是 0，环境变量 $? 为 1 ，表示命令执行失败。
(( 3 - 3 ))
echo $?
# Output: 1
```

**算术表达式**

在`((...))`前面加上美元符号`$((...))`，使其变成算术表达式，返回算术运算的值。

> 注意：
>
> - `$((...))`的圆括号之中，变量名之前加不加上`$`，均可。
>
> - 在`$((...))`里面使用字符串，会 Bash 视为变量名。如不存在此变量，Bash 会视为空值 0 ，因此不会报错。
>
> - 在`$((...))`里面使用变量且为字符串，Bash 就会视该变量的字符串为变量。这使得有可能写出动态替换的代码。

```bash
echo $((2 + 2))
# Output: 4

# $((...)) 内部可以用圆括号改变运算顺序
echo $(( (2 + 3) * 4 ))
# Output: 20

# $((...)) 结构支持嵌套
echo $(((5**2) * 3))
# Output: 75
# 等同于
echo $(($((5**2)) * 3))
# Output: 75

# 这个语法只能计算整数，否则会报错
echo $((1.5 + 1))
# Output: bash: 语法错误

# 变量 a 的值是 b，而 b 也会被看作变量名
a=b
b=3
echo $(( a + 2 ))
# Output: 5
```

**其他运算**

```bash

# 三元运算
# 算术表达式支持三元运算
a = 1
echo $((a == 1?b:c ))
# Output: 0

# 赋值运算
# 算术表达式支持赋值运算
a = 1
echo $((a += 1))
# Output: 2

# 求值运算
# 逗号 , 在其内部是求值运算符，执行前后两个表达式，并返回后一个表达式的值
echo $((a = 1 + 2, 3 * 4))
# Output: 12
```



**数值的进制**

Bash 的数值默认都是十进制，但是在算术表达式中，也可以使用其他进制。

- `number`：没有任何特殊表示法的数字是十进制数（以10为底）。
- `0number`：八进制数。
- `0xnumber`：十六进制数。
- `base#number`：`base`进制的数。



```bash
# 0xff 是十六进制数，
echo $((0xff))
255

# 2#11111111 是二进制数。
echo $((2#11111111))
255
```

#### expr 命令

`expr`命令支持算术运算，可以不使用`((...))`语法。

> 注意：数字和运算符有空格，不然输出会错

```bash
expr 3 + 2
# Output: 5

# 变量运算
$ a=3
$ expr $a + 2
# Output: 5

# expr 命令不支持非整数参数
$ expr 3.5 + 2
# Output: expr: 非整数参数
```



#### let 命令

`let`命令用于将算术运算的结果，赋予一个变量。

```bash
let x=2+3
echo $x
# Output: 5
```



#### 算术运算符

| 运算符 | 说明         |
| ------ | ------------ |
| +      | 加法         |
| -      | 减法         |
| *      | 乘法         |
| /      | 除法（整除） |
| %      | 取余         |
| =      | 赋值         |



#### 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

使用格式：`[ $a -eq $b ]`

| 运算符 | 说明                                                  |
| ------ | ----------------------------------------------------- |
| `-eq`  | 检测两个数是否相等，相等返回 true。                   |
| `-ne`  | 检测两个数是否相等，不相等返回 true。                 |
| `-gt`  | 检测左边的数是否大于右边的，如果是，则返回 true。     |
| `-lt`  | 检测左边的数是否小于右边的，如果是，则返回 true。     |
| `-ge`  | 检测左边的数是否大于等于右边的，如果是，则返回 true。 |
| `-le`  | 检测左边的数是否小于等于右边的，如果是，则返回 true。 |



#### 逻辑运算符

Shell 的逻辑运算符

| 运算符  | 说明                      |
| ------- | ------------------------- |
| `&&`    | 逻辑的与（AND）等同于`-o` |
| `| |`   | 逻辑的或（OR）等同于`-a`  |
| `<`     | 小于                      |
| `>`     | 大于                      |
| `<=`    | 小于或相等                |
| `>=`    | 大于或相等                |
| `==`    | 相等                      |
| `!=`    | 不相等                    |
| `!`     | 逻辑否                    |
| `a?b:c` | 三元条件运算符            |



#### 二进制位运算符

| 运算符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| `<<`   | 位左移运算，把一个数字的所有位向左移动指定的位。             |
| `\>>`  | 位右移运算，把一个数字的所有位向右移动指定的位。             |
| `&`    | 位的“与”运算，对两个数字的所有位执行一个`AND`操作。          |
| `|`    | 位的“或”运算，对两个数字的所有位执行一个`OR`操作。           |
| `~`    | 位的“否”运算，对一个数字的所有位取反。                       |
| `^`    | 位的异或运算（exclusive or），对两个数字的所有位执行一个异或操作。 |



#### 字符串运算符

常用的字符串运算符

使用格式：`[-z $a ]`

| 运算符 | 说明                                                  |
| ------ | ----------------------------------------------------- |
| `=`    | 检测两个字符串是否相等，相等返回 true。               |
| `!=`   | 检测两个字符串是否相等，不相等返回 true。             |
| `-z`   | 检测字符串长度是否为 0，为 0 返回 true。              |
| `-n`   | 检测字符串长度是否为 0，不为 0 返回 true。            |
| `str`  | 检测字符串是否为空，不为空返回 true。使用方法`[ $a ]` |



#### 文件测试运算符

文件测试运算符用于检测 Unix 文件的各种属性。

| 操作符    | 说明                                                         | 举例                        |
| --------- | ------------------------------------------------------------ | --------------------------- |
| `-b file` | 检测文件是否是块设备文件，如果是，则返回 true。              | `[ -b $file ]` 返回 false。 |
| `-c file` | 检测文件是否是字符设备文件，如果是，则返回 true。            | `[ -c $file ]` 返回 false。 |
| `-d file` | 检测文件是否是目录，如果是，则返回 true。                    | `[ -d $file ]` 返回 false。 |
| `-f file` | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | `[ -f $file ]` 返回 true。  |
| `-g file` | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | `[ -g $file ]` 返回 false。 |
| `-k file` | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | `[ -k $file ]`返回 false。  |
| `-p file` | 检测文件是否是有名管道，如果是，则返回 true。                | `[ -p $file ]` 返回 false。 |
| `-u file` | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | `[ -u $file ]` 返回 false。 |
| `-r file` | 检测文件是否可读，如果是，则返回 true。                      | `[ -r $file ]` 返回 true。  |
| `-w file` | 检测文件是否可写，如果是，则返回 true。                      | `[ -w $file ]` 返回 true。  |
| `-x file` | 检测文件是否可执行，如果是，则返回 true。                    | `[ -x $file ]` 返回 true。  |
| `-s file` | 检测文件是否为空（文件大小是否大于 0），不为空返回 true。    | `[ -s $file ]` 返回 true。  |
| `-e file` | 检测文件（包括目录）是否存在，如果是，则返回 true。          | `[ -e $file ]` 返回 true。  |

## 三、字符串和数组

### 3.1 字符串

> Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。

**单引号和双引号**

shell 字符串可以用单引号 `''`，也可以用双引号 `“”`，也可以不用引号。推荐使用双引号。

单引号的特点：

- 单引号里不识别变量
- 单引号里不能出现单独的单引号（使用转义符也不行），但可成对出现，作为字符串拼接使用。

双引号的特点：

- 双引号里识别变量
- 双引号里可以出现转义字符



**转义**

如果想要原样输出某些特殊字符，就必须在它们前面加上反斜杠，使其变成普通字符。这就叫做“转义”（escape）。

```bash
# 转义特殊字符
echo \$date
# output：$date

# 转义反斜杠
echo \\
# output：\
```

| 其他字符 | 说明                         |
| -------- | ---------------------------- |
| `\a`     | 响铃                         |
| `\b`     | 退格                         |
| `\n`     | 换行                         |
| `\r`     | 回车                         |
| `\t`     | 制表符                       |
| `\c`     | 不换行                       |
| `\v`     | 垂直制表符                   |
| `\a`     | 表示“警告”（蜂鸣或是闪动）   |
| `\\`     | 反斜杠字符                   |
| `\0ddd`  | 将自负表示成1到3的八进制数值 |



**Here 文档**

`Here 文档`（here document）是一种输入多行字符串的方法。

> 注意：
>
> - Here 文档对于`echo`命令无效。
>
> - Here 文档也不能作为变量的值，只能用于命令的参数。

它的格式分成开始标记（`<< token`）和结束标记（`token`）。开始标记是*两个小于号 + Here 文档的名称*，名称随意，后面必须是一个换行符；结束标记是*单独一行顶格写的 Here 文档名称*，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。

```bash
<< token
text
token
```

`Here 文档`支持变量替换和反斜杠转义，但是不支持通配符扩展。双引号和单引号在其中变成了普通字符。

```bash
a='hello world'
cat << _example_
$a
"$a"
'$a'
_example_

# output：
#	hello world
#	"hello world"
#	'hello world'

# 把 Here 文档 的开始标记放在单引号之中可以拒绝变量替换
a='hello world'
cat << '_example_'
$a
"$a"
'$a'
_example_
# output：
#	$a
#	"$a"
#	'$a'
```

`Here 文档`的本质是重定向，它将字符串重定向输出给某个命令，相当于包含了`echo`命令。

```bash
command << token
  string
token
# 等同于
echo string | command
```



**Here 字符串**

`Here 文档`还有一个变体，叫 `Here 字符串`（Here string），使用`<<<`表示。

`Here 字符串`的作用是将字符串通过标准输入，传递给命令。

```bash
<<< string
```

这个语法解决了有些命令直接接受给定的参数，与通过标准输入接受参数，结果不同的问题。使得将字符串通过标准输入传递给命令更方便，

比如`cat`命令只接受标准输入传入的字符串。

```bash
cat <<< 'hi hello'
# 等同于
echo 'hi hello' | cat
```



#### 字符串操作

**拼接字符串**

```bash
# 使用单引号拼接
name1='white'
str1='hello, '${name1}''
str2='hello, ${name1}'
echo ${str1}_${str2}
# Output: hello, white_hello, ${name1}

# 使用双引号拼接
name2="black"
str3="hello, "${name2}""
str4="hello, ${name2}"
echo ${str3}_${str4}
# Output: hello, black_hello, black
```

**获取字符串长**

```bash
text="12345"
# 常规
echo ${#text}					# 5
echo `expr length ${text}`      # 5

# 使用正则表达式
echo `expr match "${text}" '.*'`# 5
echo `expr "${text}" : '.*'`    # 5
```

**截取子字符串**

```bash
# 从第 3 个字符开始，截取 2 个字符
text="12345"
echo ${text:2:2}
# Output: 34
```

**字符串移动**

```bash
String=abcABC123ABCabc
#       ├----┘     ┆
#       └----------┘

echo ${String#a*C}      # 123ABCabc
# 从$String左边开始，剥去匹配'a'到'C'之间最短的字符串.

echo ${String##a*C}     # abc
# 从$String左边开始，剥去匹配'a'到'C'之间最长的字符串.


String=abcABC123ABCabc
#       ┆           ||
#       └------------┘

echo ${String%b*c}      # abcABC123ABCa
# 从$String右边开始，剥去匹配'a'到'C'之间最短的字符串.

echo ${String%%b*c}     # a
# 从$String右边开始，剥去匹配'a'到'C'之间最长的字符串.
```

**查找子字符串**

```bash
#!/usr/bin/env bash

text="hello"
echo `expr index "${text}" ll`

# Execute: ./str-demo5.sh
# Output: 3
```

**索引**

某字符在字符串中第一次出现的数字位置。

```bash
text="12345"
echo `expr index "${text}" 2`# 2 字符的位置
# Output: 1
```



**改变大小写**

下面的语法可以改变变量的大小写。

```bash
# 转为大写
a=heLLo
echo ${a^^}
HELLO

# 转为小写
echo ${a,,}
hello
```



**用awk处理字符串**

Bash脚本可以调用awk的字符串操作功能来代替它自己内建的字符串操作符。

> 注意：Bash把字符串的第一个字符的标号称为'0'。Awk把字符串的第一个字符的标号称为'1'。

```bash
# 在awk中与Bash的${string:pos:length}等同的是substr(string,pos,length)。
echo | awk '{ 
  print substr("'"${String}"'",3,4)      # skid
}'
#  用一个空的"echo"由管道传一个空的输入给awk,
#+ 这样就不必提供一个文件名给awk。
exit 0
```

### 3.2 数组

数组中可以存放多个值。Bash Shell 只支持一维数组（不支持多维数组），初始化时不需要定义数组大小。shell数组元素的下标由 0 开始。



**创建数组**

```bash
# 创建数组的不同方式
# 逐个赋值
nums[0]=0
nums[1]=1
nums[2]=2

# 一次性赋值
colors=(red yellow "dark blue")
# 等同于
colors=(
red 
yellow 
"dark blue")

# 指定位置赋值
colors=([1]=red [0]=yellow [2]="dark blue")

# 定义数组的时候，可以使用通配符。
mp3s=( *.mp3 )
# 将当前目录的所有 MP3 文件，放进一个数组。

#declare命令数组
declare -a ARRAYNAME

# 命令行输入数组
read -a ARRAYNAME
```



**访问数组元素**

`@ `和` * `的区别：

共同的：`${colors[*]}`不放在双引号之中，跟`${colors[@]}`不放在双引号之中是一样的。

不同点：`${colors[*]}`放在双引号之中，所有成员就会变成单个字符串返回；`${colors[@]}`放在双引号，返回实际成员。

```bash
# 访问数组的单个元素
echo ${nums[1]}
# Output: 1

#访问数组的所有元素
# @ 和 * 是数组的特殊索引，表示返回数组的所有成员
echo ${colors[*]}
# Output: red yellow dark blue

echo ${colors[@]}
# Output: red yellow dark blue

# 这两个特殊索引配合 for 循环，就可以用来遍历数组
for i in "${names[@]}"; do
  echo $i
done

# 拷贝一个数组的最方便方法
hobbies=( "${activities[@]}" )
```



**截取数组的部分元素：**

```bash
echo ${nums[@]:0:2}
# Output: 0 1
```



**获取数组长度**

```bash
echo ${#nums[*]}
echo ${#nums[@]}
# Output: 3
```



**向数组中添加元素**

向数组中添加元素也非常简单：

```bash
# ${colors[@]} 扩展为整个数组，并被置换到复合赋值语句中，数组 colors 的赋值覆盖了它原来的值
colors=(white "${colors[@]}" green black)
echo ${colors[@]}

# 数组末尾追加元素，可以使用 += 赋值运算符。它能够自动地把值追加到数组末尾
colors+=(white green black)
echo ${colors[@]}

# Output: white red yellow dark blue green black
```



**提取数组序号**

`${!array[@]}`或`${!array[*]}`，可以返回数组的元素序号，即哪些位置是有值的。

```bash
$ arr=([5]=a [9]=b [23]=c)
$ echo ${!arr[@]}
# Output: 5 9 23
$ echo ${!arr[*]}
# Output: 5 9 23

# 利用这个语法，可以通过`for`循环遍历数组
arr=(a b c d)

for i in ${!arr[@]};do
  echo ${arr[i]}
done
```



**从数组中删除元素**

用`unset`命令来从数组中删除一个元素：

```bash
unset nums[0]
echo ${nums[@]}
# Output: 1 2

# 将某个元素设为空值，可以从返回值中“隐藏”这个元素
nums[0]=''
echo ${nums[@]}
# Output: 1 2
# 注意：这里是“隐藏”，而不是删除，因为这个元素仍然存在，只是值变成了空值

# unset ArrayName可以清空整个数组
unset nums
echo ${nums[@]}
# Output: (空)
```



#### 关联数组

Bash 的新版本支持关联数组。关联数组使用字符串而不是整数作为数组索引。

> 注意：
>
> - 关联数组必须用`declare -A`声明创建。
> - 整数索引的数组，可以直接使用变量名创建数组，关联数组则不行。
> - 访问关联数组元素的方式，几乎与整数索引数组相同。

```bash
declare -A colors
colors["red"]="#ff0000"
colors["green"]="#00ff00"
colors["blue"]="#0000ff"

# 访问关联数组元素
echo ${colors["blue"]}
# Output: #0000ff
```



## 四、条件和循环

### 4.1 条件语句

**naked**

"naked"条件判断：在条件判断语句中省略方括号或双方括号，而直接使用变量和运算符进行条件判断。

- 使用naked条件判断时，命令的退出状态码（即命令执行的结果）会决定条件的判断结果。

- 如果命令执行成功并返回0，表示条件成立；如果命令返回非零值，表示条件不成立。

#### test 命令

`if`结构的判断条件，一般使用`test`命令，有三种形式。

由`[[ ]]`包起来的表达式被称作 **检测命令** 或 **基元**。这些表达式帮助我们检测一个条件的结果。

```bash
# 写法一
test expression
# 实际上，[ 这个字符是 test 命令的一种简写形式，可以看作是一个独立的命令，这解释了为什么它后面必须有空格

# 写法二
[ expression ]

# 在使用方括号时，条件表达式的两端需要用空格分隔，并且条件表达式的最后一个字符必须是 ] 
# 方括号中的条件判断符号不支持通配符，通常使用单个等号=进行字符串相等判断

# 写法三
[[ expression ]]

# 在使用双方括号时，条件表达式的两端同样需要用空格分隔，并且条件表达式的最后一个字符必须是 ]]
# 双方括号支持更多的条件表达式，例如正则表达式匹配和模式匹配，支持比较符号 <, >, <=, >= 等，还支持逻辑运算符 && , || 和逻辑取反 !
```



#### `if`条件判断

**`if`语句**

如果中括号里的表达式为真，那么`then`和`fi`之间的代码会被执行。`fi`标志着条件代码块的结束。

> 注意：在单行判断中`if`表达式与`then`必须要有分号，`elif`表达式同样需要。

```bash
# 写成一行
if [[ 1 -eq 1 ]]; then echo "1 -eq 1 result is: true"; fi
# Output: 1 -eq 1 result is: true

# 写成多行
if [[ "abc" -eq "abc" ]]
then
  echo ""abc" -eq "abc" result is: true"
fi
# Output: abc -eq abc result is: true
```



**`if else` 语句**

```bash
if [[ 2 -ne 1 ]]; then
  echo "true"
else
  echo "false"
fi
# Output: true
```



**`if elif else` 语句**

```bash
x=10
y=20
if [[ ${x} > ${y} ]]; then
   echo "${x} > ${y}"
elif [[ ${x} < ${y} ]]; then
   echo "${x} < ${y}"
else
   echo "${x} = ${y}"
fi
# Output: 10 < 20
```



#### `case`条件判断

如果你需要面对很多情况，分别要采取不同的措施，那么使用`case`会比嵌套的`if`更有用。



> 提示：Bash 4.0之前，`case`结构只能匹配一个条件，然后就会退出`case`结构。Bash 4.0之后，允许匹配多个条件，这时可以用`;;&`终止每个条件块



> 注意：
>
> - 每种情况都是匹配了某个模式的表达式。`|`用来分割多个模式，`)`用来结束一个模式序列。
> - 第一个匹配上的模式对应的命令将会被执行。`*`代表任何不匹配以上给定模式的模式。命令块儿之间要用`;;`分隔。

```bash
case ${oper} in
  "+")
    val=`expr ${x} + ${y}`
    echo "${x} + ${y} = ${val}"
  ;;
  "-")
    val=`expr ${x} - ${y}`
    echo "${x} - ${y} = ${val}"
  ;;
  "*")
    val=`expr ${x} \* ${y}`
    echo "${x} * ${y} = ${val}"
  ;;
  "/")
    val=`expr ${x} / ${y}`
    echo "${x} / ${y} = ${val}"
  ;;
  *)
    echo "Unknown oper!"
  ;;
esac
```



`case`的匹配模式可以使用各种通配符，下面是一些例子。

- `a)`：匹配`a`。
- `a|b)`：匹配`a`或`b`。
- `[[:alpha:]])`：匹配单个字母。
- `???)`：匹配3个字符的单词。
- `*.txt)`：匹配`.txt`结尾。
- `*)`：匹配任意输入，通过作为`case`结构的最后一个模式。



### 4.2 循环语句

Bash 中有四种循环：`for`，`while`，`until`和`select`。

#### `for`循环

`for`循环支持通配符或者[大括号扩展](https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#大括号扩展)。

```bash
for i in 1 2 ... N
do
  echo $i
done

# 单行循环
for i in {1..5}; do echo $i; done

# C 语言语法
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```



#### `while`循环

`while`循环检测一个条件，只要这个条件为 *真*，就执行一段命令。

> 注意：
>
> - 跟`for`循环一样，表达式与`do`之间需要分号。
> - `while`可以执行任意数量的命令，但是执行只看最后一个命令的执行结果。

```bash
while [[ condition ]]
do
  echo true
done

# 多条件
while true; false; do echo 'hello，world'; done
```



#### `until`循环

`until`循环跟`while`循环正好相反。只要该条件为 *假* 就一直执行循环。

> 建议：一般来说，`until`用得比较少，完全可以统一都使用`while`。

```bash
until [[ condition ]]
do
  echo true
done
```



#### `select`循环

`select`循环帮助我们组织一个用户菜单。它的语法几乎跟`for`循环一致

1. `select`生成一个菜单，内容是列表`list`的每一项，并且每一项前面还有一个数字编号。
2. Bash 提示用户选择一项，输入它的编号。
3. 用户输入以后，Bash 会将该项的内容存在变量`name`，该项的编号存入环境变量`REPLY`。如果用户没有输入，就按回车键，Bash 会重新输出菜单，让用户选择。
4. 执行命令体`commands`。
5. 执行结束后，回到第一步，重复这个过程。

```bash
select i in 1 2 ... N
do
  echo $i
done
```



**栗子**

```bash
#!/usr/bin/env bash

PS3="Choose the package manager: "
select ITEM in bower npm gem pip
do
echo -n "Enter the package name: " && read PACKAGE
case ${ITEM} in
  bower) bower install ${PACKAGE} ;;
  npm) npm install ${PACKAGE} ;;
  gem) gem install ${PACKAGE} ;;
  pip) pip install ${PACKAGE} ;;
esac
break # 避免无限循环
done
```

运行这个脚本，会得到如下输出：

```bash
 ./my_script
1) bower
2) npm
3) gem
4) pip
Choose the package manager: 2
Enter the package name: gitbook-cli
```



`select`可以与`case`结合，针对不同项，执行不同的命令。

```bash
echo "Which Operating System do you like?"

select os in Ubuntu LinuxMint Windows8 Windows10 WindowsXP
do
  case $os in
    "Ubuntu"|"LinuxMint")
      echo "I also use $os."
    ;;
    "Windows8" | "Windows10" | "WindowsXP")
      echo "Why don't you try Linux?"
    ;;
    *)
      echo "Invalid entry."
      break
    ;;
  esac
done
```

### 4.3 中断和跳出

#### `break` 和 `continue`

> `break`语句用来提前结束当前循环。
>
> `continue`语句用来跳过某次迭代。

```bash
# 查找 10 以内第一个能整除 2 和 3 的正整数
i=1
while [[ ${i} -lt 10 ]]; do
  if [[ $((i % 3)) -eq 0 ]] && [[ $((i % 2)) -eq 0 ]]; then
    echo ${i}
    break;
  fi
  i=`expr ${i} + 1`
done
# Output: 6
```



## 五、脚本编写和调试

### 5.1 输入和输出重定向

**标准输入、输出和错误**

使用流，我们能将一个程序的输出发送到另一个程序或文件，因此，我们能方便地记录日志或做一些其它我们想做的事。

Bash 接收输入，并以字符序列或 **字符流** 的形式产生输出。这些流能被重定向到文件或另一个流中。

有三个文件描述符：

| 代码 | 描述符   | 描述         |
| ---- | -------- | ------------ |
| `0`  | `stdin`  | 标准输入     |
| `1`  | `stdout` | 标准输出     |
| `2`  | `stderr` | 标准错误输出 |



#### 文件重定向

重定向让我们可以控制一个命令的输入来自哪里，输出结果到什么地方。这些运算符在控制流的重定向时会被用到：

| Operator | Description                                                  |
| -------- | ------------------------------------------------------------ |
| `>`      | 重定向输出                                                   |
| `&>`     | 重定向输出和错误输出                                         |
| `&>>`    | 以附加的形式重定向输出和错误输出                             |
| `<`      | 重定向输入                                                   |
| `<<`     | [Here 文档](http://tldp.org/LDP/abs/html/here-docs.html)语法 |
| `<<<`    | [Here 字符串](http://www.tldp.org/LDP/abs/html/x17837.html)  |



以下是一些使用重定向的例子：

```bash
# ls的结果将会被写到list.txt中
ls -l > list.txt

# 将输出附加到list.txt中
ls -a >> list.txt

# 所有的错误信息会被写到errors.txt中
grep da * 2> errors.txt

# 从errors.txt中读取输入
less < errors.txt
```

**`/dev/null` 文件**

`/dev/null `是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。

```bash
$ command > /dev/null
# 屏蔽 stdout 和 stderr
$ command > /dev/null 2>&1
```



#### read 命令

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| `-t`           | 设置了超时的秒数。环境变量`TMOUT`也可以起到同样作用。        |
| `-p`           | 指定用户输入的提示信息。                                     |
| `-a`           | 把用户的输入赋值给一个数组，从零号位置开始。                 |
| `-n`           | 指定只读取若干个字符作为变量值，而不是整行读取。             |
| `-e`           | 允许用户输入的时候，使用`readline`库提供的快捷键。           |
| `-d delimiter` | 定义字符串`delimiter`的第一个字符作为用户输入的结束，而不是一个换行符。 |
| `-r`           | raw 模式，表示不把用户输入的反斜杠字符解释为转义字符。       |
| `-s`           | 使得用户的输入不显示在屏幕上，这常常用于输入密码或保密信息。 |
| `-u fd`        | 使用文件描述符`fd`作为输入。                                 |

`read`命令将用户的输入存入一个变量，方便后面的代码使用。用户按下回车键，就表示输入结束。（`$`表示用户标识符，详细见 Linux 一章）

```bash
echo -n "输入一些文本 > "
read text
echo "你的输入：$text"

# read 可以接受用户输入的多个值
# Output: 
$ bash demo.sh
$ 输入一些文本 > 你好，世界
$ 你的输入：你好，世界
```

**多变量赋值**

- 如果用户的输入项少于`read`命令给出的变量数目，那么额外的变量值为空。
- 如果用户的输入项多于定义的变量，那么多余的输入项会包含到最后一个变量中。
- 如果`read`命令之后没有定义变量名，那么环境变量`REPLY`会包含所有的输入。

```bash
#!/bin/bash
# read-single: read multiple values into default variable
echo -n "Enter one or more values > "
read
echo "REPLY = '$REPLY'"
# Output: 
$ read-single
$ Enter one or more values > a b c d
$ REPLY = 'a b c d'
```

**读取文件**

`read`命令除了读取键盘输入，可以用来读取文件

> 解读：通过`read`命令，读取一个文件的内容。`done`命令后面的定向符`<`，将文件内容导向`read`命令，每次读取一行，存入变量`myline`，直到文件读取完毕。

```bash
#!/bin/bash

filename='/etc/hosts'

while read myline
do
  echo "$myline"
done < $filename
```



**IFS 变量**

通过自定义环境变量`IFS`（内部字段分隔符，Internal Field Separator），修改`read`命令读取的值的分隔标志。

`IFS`的默认值是空格、Tab 符号、换行符号，通常取第一个（即空格）。

如果把`IFS`定义成冒号（`:`）或分号（`;`），就可以分隔以这两个符号分隔的值，这对读取文件很有用。



### 5.2 脚本的编写和执行

#### 脚本的编写

1. 创建脚本文件：使用文本编辑器创建一个新文件并命名。通常，Shell脚本文件的扩展名为`.sh`，但这不是强制要求。
2. 添加脚本命令：在脚本文件中添加Shell命令。Shell脚本是一系列按顺序执行的命令。你可以使用任何支持的Shell语法和命令来编写脚本。
3. 保存脚本文件：保存你的脚本文件。
4. 赋予执行权限：在执行脚本之前，你需要给脚本文件赋予执行权限。在终端中，使用`chmod`命令可以为脚本文件添加执行权限。



**交互模式**

在交互模式下可以输入 Linux 命令，解释器会立即执行。

shell 处于交互模式下：

```bash
user@host:~$
```



**非交互模式**

在非交互模式下，shell 从文件或者管道中读取命令并执行。当 shell 解释器执行完文件，shell 进程终止，并回到父进程。

 shell 以非交互模式运行：

```bash
sh /path/to/script.sh
bash /path/to/script.sh
source /path/to/script.sh
./path/to/script.sh
```



**执行自定义脚本文件**

通过`chmod`命令给文件添加可执行的权限，来直接执行脚本文件

```bash
chmod +x /path/to/test.sh # 使脚本具有执行权限
/path/to/test.sh
```



### 5.3 调试Shell脚本

#### Debug

如果想采用 debug 模式运行某脚本，可以在其 shebang 中使用一个特殊的选项：

```bash
#!/bin/bash options
```

options 是一些可以改变 shell 行为的选项。

| 参数 | 说明                                                       |
| ---- | ---------------------------------------------------------- |
| `-f` | 禁止文件名展开（globbing）                                 |
| `-i` | 让脚本以 *交互* 模式运行                                   |
| `-n` | 读取命令，但不执行（语法检查）                             |
| `-t` | 执行完第一条命令后退出                                     |
| `-v` | 在执行每条命令前，向`stderr`输出该命令                     |
| `-x` | 在执行每条命令前，向`stderr`输出该命令以及该命令的扩展参数 |

#### `set`命令

用来修改子 Shell 环境的运行参数，即定制环境。

| 参数         | 作用                                                         |
| ------------ | ------------------------------------------------------------ |
| -u           | 执行脚本时，如果遇到不存在的变量，Bash 默认忽略它。          |
| -x           | 用来在运行结果之前，先输出执行的那一行命令。                 |
| -e           | 使得脚本只要发生错误，就终止执行。                           |
| -o pipefail  | `set -e`有一个例外情况，就是不适用于管道命令。只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。 |
| -E           | 可以纠正设置了`-e`参数，会导致函数内的错误不会被`trap`命令捕获这个行为，使得函数也能继承`trap`命令。 |
| -n           | 不运行命令，只检查语法是否正确。                             |
| -f           | 表示不对通配符进行文件名扩展。可以使用`set +f`关闭。         |
| -v           | 表示打印 Shell 接收到的每一行输入。可以使用`set +v`关闭。    |
| -o noclobber | 防止使用重定向运算符`>`覆盖已经存在的文件。                  |

**`set` 命令总结**

上面重点介绍的`set`命令的几个参数，一般都放在一起使用。

> 建议：两种写法都放在所有 Bash 脚本的头部。

```bash
# 写法一
set -Eeuxo pipefail

# 写法二
set -Eeux
set -o pipefail

# 命令行传入这些参数
$ bash -euxo pipefail script.sh
```

#### shopt 命令

`shopt`命令用来调整 Shell 的参数，跟`set`命令的作用很类似。

区别：`set`是从 Ksh 继承的，属于 POSIX 规范的一部分，而`shopt`是 Bash 特有的。

```bash
# shopt 可以查看所有参数，以及它们各自打开和关闭的状态
$ shopt

# shopt 命令后面跟着参数名，可以查询该参数是否打开
$ shopt globstar
# Output: globstar  off
```

 

| 参数 | 作用                                                         |
| ---- | ------------------------------------------------------------ |
| `-s` | 用来打开某个参数。                                           |
| `-u` | 用来关闭某个参数。                                           |
| `-q` | 也是查询某个参数是否打开，但不是直接输出查询结果，而是通过命令的执行状态（`$?`）表示查询结果。如果状态为`0`，表示该参数打开；如果为`1`，表示该参数关闭。 |

**`bash`的`-x`参数**

`bash`的`-x`参数可以在执行每一行命令之前，打印该命令。一旦出错，这样就比较容易追查。



**用于除错的环境变量**

| 环境变量      | 作用                                       |
| ------------- | ------------------------------------------ |
| `LINENO`      | 返回它在脚本里面的行号。                   |
| `FUNCNAME`    | 返回一个数组，内容是当前的函数调用堆栈。   |
| `BASH_SOURCE` | 返回一个数组，内容是当前的脚本调用堆栈。   |
| `BASH_LINENO` | 返回一个数组，内容是每一轮调用对应的行号。 |



#### 临时文件的安全问题

生成临时文件应该遵循下面的规则。

> - 创建前检查文件是否已经存在。
> - 确保临时文件已成功创建。
> - 临时文件必须有权限的限制。
> - 临时文件要使用不可预测的文件名。
> - 脚本退出时，要删除临时文件（使用`trap`命令）。

#### mktemp 命令

`mktemp`命令就是为安全创建临时文件而设计的。虽然在创建临时文件之前，它不会检查临时文件是否存在，但是它支持唯一文件名和清除机制，因此可以减轻安全攻击的风险。

直接运行`mktemp`命令，就能生成一个临时文件。

**`mktemp`命令的操作**

```bash
# 生成一个临时文件
$ mktemp
# Output: /tmp/tmp.4GcsWSG4vj

# mktemp 命令后面最好使用 OR 运算符，保证创建失败时退出脚本
TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"

# 使用trap命令指定退出时的清除操作
trap 'rm -f "$TMPFILE"' EXIT

TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"
```



**`mktemp `命令的参数**

| 参数     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| `-d`参   | 可以创建一个临时目录。                                       |
| `-p`参   | 可以指定临时文件所在的目录。                                 |
| `-t`参数 | 可以指定临时文件的文件名模板，模板的末尾必须至少包含三个连续的`X`字符，表示随机字符，建议至少使用六个`X`。默认的文件名模板是`tmp.`后接十个随机字符。 |



#### trap 命令

`trap`命令用来在 Bash 脚本中响应系统信号。

最常见的系统信号就是 SIGINT（中断），即按 Ctrl + C 所产生的信号。`trap`命令的`-l`参数，可以列出所有的系统信号。

`trap`命令响应`EXIT`信号的写法如下

```bash
# 脚本遇到 EXIT 信号时，就会执行 rm -f "$TMPFILE"
$ trap 'rm -f "$TMPFILE"' EXIT
```



trap 命令的常见使用场景，就是在 Bash 脚本中指定退出时执行的清理命令。

> 注意：`trap`命令必须放在脚本的开头。否则，它上方的任何命令导致脚本退出，都不会被它捕获。

```bash
#!/bin/bash

trap 'rm -f "$TMPFILE"' EXIT

TMPFILE=$(mktemp) || exit 1
ls /etc > $TMPFILE
if grep -qi "kernel" $TMPFILE; then
  echo 'find'
fi
```



如果`trap`需要触发多条命令，可以封装一个 Bash 函数。

```bash
function egress {
  command1
  command2
  command3
}

trap egress EXIT
```



## 六、高级主题

### 6.1 函数和参数

#### 定义和调用函数

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



#### 函数参数和返回值

#### 位置参数

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

#### return 命令

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



#### 全局变量和局部变量

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



### 6.2 文件处理和管道

#### 目录堆栈

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



#### dirs 命令

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



#### 文件处理

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



#### 管道

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



### 6.3 扩展

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

#### 八大扩展

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

#### 量词语法

量词语法用来控制模式匹配的次数。一般是默认打开的。

量词语法有下面几个

- `?(pattern-list)`：模式匹配零次或一次。
- `*(pattern-list)`：模式匹配零次或多次。
- `+(pattern-list)`：模式匹配一次或多次。
- `@(pattern-list)`：只匹配一次模式。
- `!(pattern-list)`：匹配给定模式以外的任何内容。

#### shopt 命令

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

## 七、参考三三：

- [shell-tutorial](https://wangchujiang.com/shell-tutorial/index.html)
- [一篇文章让你彻底掌握 Shell](https://dunwu.github.io/waterdrop/pages/ea6ae1/#%E7%AE%80%E4%BB%8B)
- [Bash 脚本教程 | 网道](https://wangdoc.com/bash/)
