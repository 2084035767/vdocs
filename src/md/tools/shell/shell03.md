# 三、字符串和数组

## 3.1 字符串

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



### 字符串操作

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

## 3.2 数组

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



### 关联数组

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

