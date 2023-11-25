# 四、控制语句

## 4.1 条件语句

**naked**

"naked"条件判断：在条件判断语句中省略方括号或双方括号，而直接使用变量和运算符进行条件判断。

- 使用naked条件判断时，命令的退出状态码（即命令执行的结果）会决定条件的判断结果。

- 如果命令执行成功并返回0，表示条件成立；如果命令返回非零值，表示条件不成立。

### test 命令

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



### `if`条件判断

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



### `case`条件判断

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



## 4.2 循环语句

Bash 中有四种循环：`for`，`while`，`until`和`select`。

### `for`循环

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



### `while`循环

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



### `until`循环

`until`循环跟`while`循环正好相反。只要该条件为 *假* 就一直执行循环。

> 建议：一般来说，`until`用得比较少，完全可以统一都使用`while`。

```bash
until [[ condition ]]
do
  echo true
done
```



### `select`循环

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

## 4.3 中断和跳出

### `break` 和 `continue`

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

