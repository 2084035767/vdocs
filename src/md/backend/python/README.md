```python
   ___       __  __           
  / _ \__ __/ /_/ /  ___  ___ 
 / ___/ // / __/ _ \/ _ \/ _ \
/_/   \_, /\__/_//_/\___/_//_/
     /___/                    
```



## 一、Python 简介

### 1.1 什么是 Python？

### 1.2 Python 的历史和发展

## 二、Python 基础语法

### 2.1 前置知识

#### 注释

Python中单行注释以 **#** 开头，多行注释可以用多个 **#** 号，还有 **'''** 和 **"""**

:::tip 

**'''** 和 **"""**，本质是多行字符串，不过可以用在注释多行文本。

:::

```python
# 我是单行注释

# 我是多行
# 注释

’‘’我是多
行注释‘’‘

“”“我是多行
注释”“”
```



#### 标识符

- 第一个字符必须是字母表中字母或下划线 **_** 。
- 标识符的其他的部分由字母、数字和下划线组成。
- 标识符对大小写敏感。
- 标识符名称不能是保留字。



#### 行与缩进

:::warning 注意

不规范的空格可能引起程序运行错误 

:::

python最具特色的就是使用缩进来表示代码块，不需要使用大括号 **{}** 。

缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数，默认为四个空格。

```python
if True:
    print("Answer")
print("True") # 缩进不一致，会导致运行错误
else:
    print("Answer")
    print("False")  
```



#### 多行语句

Python 可以使用反斜杠 \\ 来实现多行语句，在 [], {}, 或 () 中的多行语句，则不需要使用反斜杠

```python
total = 'item_one + \
        item_two + \
        item_three'


total = ['item_one', 'item_two', 'item_three',
        'item_four', 'item_five']
```



#### 空行

函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。

空行与代码缩进不同，空行并不是 Python 语法的一部分。书写时不插入空行，Python 解释器运行也不会出错。但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。

**记住：**空行也是程序代码的一部分。



#### pass 语句

Python pass是空语句，是为了保持程序结构的完整性。

pass 不做任何事情，一般用做占位语句

pass 主要用来让程序不留空，避免程序出错。



#### print 输出

python 使用print来格式化输出，

**print** 默认输出是换行的，如果要实现不换行需要在变量末尾加上 **end=""**

```python
print('hello,world')
```



### 2.2 变量和常量

Python 中的变量不需要声明。每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建。

在 Python 中，变量就是变量，它没有类型，我们所说的"类型"是变量所指的内存中对象的类型。



#### 多个变量赋值

Python允许你同时为多个变量赋值。

```python
a = b = c = 1

a, b, c = 1, 2, "runoob"
```



### 2.3 基本数据类型

Python3 中常见的数据类型有：

- Number（数字）
- String（字符串）
- bool（布尔类型）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）



Python3 的六个标准数据类型中：

- **不可变数据（3 个）：**Number（数字）、String（字符串）、Tuple（元组）；
- **可变数据（3 个）：**List（列表）、Dictionary（字典）、Set（集合）。

| 文本类型:   | `str`                              |
| ----------- | ---------------------------------- |
| 数值类型:   | `int`, `float`, `complex`          |
| 序列类型:   | `list`, `tuple`, `range`           |
| 映射类型:   | `dict`                             |
| 集合类型:   | `set`, `frozenset`                 |
| 布尔类型:   | `bool`                             |
| 二进制类型: | `bytes`, `bytearray`, `memoryview` |

> **注意：**Python3 中，bool 是 int 的子类，True 和 False 可以和数字相加， `True==1、False==0` 会返回 **True**，但可以通过 **is** 来判断类型。



#### String（字符串）

Python中的字符串用单引号 **'** 或双引号 **"** 括起来，同时使用反斜杠 \\ 转义特殊字符。



加号 **+** 是字符串的连接符， 星号 ***** 表示复制当前字符串，与之结合的数字为复制的次数。

```python
str = 'hello,world'

print (str)      # 输出字符串
print (str * 2)    # 输出字符串两次，也可以写成 print (2 * str)
print (str + "TEST") # 连接字符串
```

Python 使用反斜杠 \\ 转义特殊字符，如果你不想让反斜杠发生转义，可以在字符串前面添加一个 r，表示原始字符串。





#### List（列表）

List（列表） 是 Python 中使用最频繁的数据类型。

列表可以完成大多数集合类的数据结构实现。列表中元素的类型可以不相同，它支持数字，字符串甚至可以包含列表（所谓嵌套）。

列表是写在方括号 **[]** 之间、用逗号分隔开的元素列表。

和字符串一样，列表同样可以被索引和截取，列表被截取后返回一个包含所需元素的新列表。

列表截取的语法格式如下：

```python
变量[头下标:尾下标]
```

索引值以 **0** 为开始值，**-1** 为从末尾的开始位置。

```python
list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
tinylist = [123, 'runoob']

print (list)       # 输出完整列表
print (list[0])     # 输出列表第一个元素
print (list[1:3])    # 从第二个开始输出到第三个元素
print (list[2:])     # 输出从第三个元素开始的所有元素
print (tinylist * 2)   # 输出两次列表
print (list + tinylist) # 连接列表
```



#### Tuple（元组）

元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号 **()** 里，元素之间用逗号隔开。

元组中的元素类型也可以不相同：

```python
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2 )
tinytuple = (123, 'runoob')

print (tuple)       # 输出完整元组
print (tuple[0])      # 输出元组的第一个元素
print (tuple[1:3])     # 输出从第二个元素开始到第三个元素
print (tuple[2:])     # 输出从第三个元素开始的所有元素
print (tinytuple * 2)   # 输出两次元组
print (tuple + tinytuple) # 连接元组
```

元组与字符串类似，可以被索引且下标索引从0开始，-1 为从末尾开始的位置。也可以进行截取

其实，可以把字符串看作一种特殊的元组。

```python
tup1 = ()    # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```



#### Set（集合）

Python 中的集合（Set）是一种无序、可变的数据类型，用于存储唯一的元素。

集合中的元素不会重复，并且可以进行交集、并集、差集等常见的集合操作。

在 Python 中，集合使用大括号 **{}** 表示，元素之间用逗号 **,** 分隔。

另外，也可以使用 **set()** 函数创建集合。

> 注意：创建一个空集合必须用 **set()** 而不是 **{ }**，因为 **{ }** 是用来创建一个空字典。

```python
parame = {value01,value02,...}
或者
set(value)
```



```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}

print(sites)  # 输出集合，重复的元素被自动去掉

# 成员测试
if 'Runoob' in sites :
  print('Runoob 在集合中')
else :
  print('Runoob 不在集合中')


# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')

print(a)
print(a - b)   # a 和 b 的差集
print(a | b)   # a 和 b 的并集
print(a & b)   # a 和 b 的交集
print(a ^ b)   # a 和 b 中不同时存在的元素
```



#### Dictionary（字典）

字典（dictionary）是Python中另一个非常有用的内置数据类型。

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

字典是一种映射类型，字典用 **{ }** 标识，它是一个无序的 **键(key) : 值(value)** 的集合。

键(key)必须使用不可变类型。

在同一个字典中，键(key)必须是唯一的。

```python
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2]   = "2 - 菜鸟工具"

tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}


print (dict['one'])    # 输出键为 'one' 的值
print (dict[2])      # 输出键为 2 的值
print (tinydict)      # 输出完整的字典
print (tinydict.keys())  # 输出所有键
print (tinydict.values()) # 输出所有值
```

构造函数 dict() 可以直接从键值对序列中构建字典如下：

注意：

- 1、字典是一种映射类型，它的元素是键值对。
- 2、字典的关键字必须为不可变类型，且不能重复。
- 3、创建空字典使用 **{ }**。



#### bytes 类型

在 Python3 中，bytes 类型表示的是不可变的二进制序列（byte sequence）。

与字符串类型不同的是，bytes 类型中的元素是整数值（0 到 255 之间的整数），而不是 Unicode 字符。

bytes 类型通常用于处理二进制数据，比如图像文件、音频文件、视频文件等等。在网络编程中，也经常使用 bytes 类型来传输二进制数据。

创建 bytes 对象的方式有多种，最常见的方式是使用 b 前缀：

> 使用 bytes() 函数将其他类型的对象转换为 bytes 类型。bytes() 函数的第一个参数是要转换的对象，第二个参数是编码方式，如果省略第二个参数，则默认使用 UTF-8 编码

```python
x = bytes("hello", encoding="utf-8")
```

与字符串类型类似，bytes 类型也支持许多操作和方法，同时，由于 bytes 类型是不可变的，因此在进行修改操作时需要创建一个新的 bytes 对象。

```python
x = b"hello"
y = x[1:3] # 切片操作，得到 b"el"
z = x + b"world" # 拼接操作，得到 b"helloworld"
```

> 需要注意的是，bytes 类型中的元素是整数值，因此在进行比较操作时需要使用相应的整数值。其中 ord() 函数用于将字符转换为相应的整数值。

```python
x = b"hello"
if x[0] == ord("h"):
  print("The first element is 'h'")
```





#### Python数据类型转换

有时候，我们需要对数据内置的类型进行转换，数据类型的转换，你只需要将数据类型作为函数名即可

| 函数                   | 描述                                                |
| :--------------------- | :-------------------------------------------------- |
| int(x [,base\])        | 将x转换为一个整数                                   |
| float(x)               | 将x转换到一个浮点数                                 |
| complex(real [,imag\]) | 创建一个复数                                        |
| str(x)                 | 将对象 x 转换为字符串                               |
| repr(x)                | 将对象 x 转换为表达式字符串                         |
| eval(str)              | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
| tuple(s)               | 将序列 s 转换为一个元组                             |
| list(s)                | 将序列 s 转换为一个列表                             |
| set(s)                 | 转换为可变集合                                      |
| dict(d)                | 创建一个字典。d 必须是一个 (key, value)元组序列。   |
| frozenset(s)           | 转换为不可变集合                                    |
| chr(x)                 | 将一个整数转换为一个字符                            |
| ord(x)                 | 将一个字符转换为它的整数值                          |
| hex(x)                 | 将一个整数转换为一个十六进制字符串                  |
| oct(x)                 | 将一个整数转换为一个八进制字符串                    |



### 2.4 运算符和表达式

#### Python算术运算符

| 运算符 | 描述                                            |
| :----- | :---------------------------------------------- |
| +      | 加 - 两个对象相加                               |
| -      | 减 - 得到负数或是一个数减去另一个数             |
| *      | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 |
| /      | 除 - x 除以 y                                   |
| %      | 取模 - 返回除法的余数                           |
| **     | 幂 - 返回x的y次幂                               |
| //     | 取整除 - 往小的方向取整数                       |

#### Python 比较运算符

| 运算符 | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| ==     | 等于 - 比较对象是否相等                                      |
| !=     | 不等于 - 比较两个对象是否不相等                              |
| >      | 大于 - 返回x是否大于y                                        |
| <      | 小于 - 返回x是否小于y。所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量True和False等价。注意，这些变量名的大写。 |
| >=     | 大于等于 - 返回x是否大于等于y。                              |
| <=     | 小于等于 - 返回x是否小于等于y。                              |

#### Python赋值运算符

| 运算符 | 描述                                             | 实例                                                         |
| :----- | :----------------------------------------------- | :----------------------------------------------------------- |
| =      | 简单的赋值运算符                                 | c = a + b 将 a + b 的运算结果赋值为 c                        |
| +=     | 加法赋值运算符                                   | c += a 等效于 c = c + a                                      |
| -=     | 减法赋值运算符                                   | c -= a 等效于 c = c - a                                      |
| *=     | 乘法赋值运算符                                   | c *= a 等效于 c = c * a                                      |
| /=     | 除法赋值运算符                                   | c /= a 等效于 c = c / a                                      |
| %=     | 取模赋值运算符                                   | c %= a 等效于 c = c % a                                      |
| **=    | 幂赋值运算符                                     | c **= a 等效于 c = c ** a                                    |
| //=    | 取整除赋值运算符                                 | c //= a 等效于 c = c // a                                    |
| :=     | 海象运算符，可在表达式内部为变量赋值。Python 3.8 | 在这个示例中，赋值表达式可以避免调用 len() 两次:`if (n := len(a)) > 10:    print(f"List is too long ({n} elements, expected <= 10)")` |



#### Python位运算符

按位运算符是把数字看作二进制来进行计算的。Python中的按位运算法则如下：

下表中变量 a 为 60，b 为 13二进制格式如下：

```
a = 0011 1100

b = 0000 1101

-----------------

a&b = 0000 1100

a|b = 0011 1101

a^b = 0011 0001

~a  = 1100 0011
```

| 运算符 | 描述                                                         | 实例                                                         |
| :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| &      | 按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0 | (a & b) 输出结果 12 ，二进制解释： 0000 1100                 |
| \|     | 按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1。 | (a \| b) 输出结果 61 ，二进制解释： 0011 1101                |
| ^      | 按位异或运算符：当两对应的二进位相异时，结果为1              | (a ^ b) 输出结果 49 ，二进制解释： 0011 0001                 |
| ~      | 按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1。**~x** 类似于 **-x-1** | (~a ) 输出结果 -61 ，二进制解释： 1100 0011， 在一个有符号二进制数的补码形式。 |
| <<     | 左移动运算符：运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。 | a << 2 输出结果 240 ，二进制解释： 1111 0000                 |
| >>     | 右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数 | a >> 2 输出结果 15 ，二进制解释： 0000 1111                  |

#### Python逻辑运算符

Python语言支持逻辑运算符，以下假设变量 a 为 10, b为 20:

| 运算符 | 逻辑表达式 | 描述                                                         | 实例                    |
| :----- | :--------- | :----------------------------------------------------------- | :---------------------- |
| and    | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。 | (a and b) 返回 20。     |
| or     | x or y     | 布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。 | (a or b) 返回 10。      |
| not    | not x      | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 | not(a and b) 返回 False |

#### Python成员运算符

除了以上的一些运算符之外，Python还支持成员运算符，测试实例中包含了一系列的成员，包括字符串，列表或元组。

| 运算符 | 描述                                                    | 实例                                              |
| :----- | :------------------------------------------------------ | :------------------------------------------------ |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False。     | x 在 y 序列中 , 如果 x 在 y 序列中返回 True。     |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False。 | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。 |

#### Python身份运算符

身份运算符用于比较两个对象的存储单元

| 运算符 | 描述                                        | 实例                                                         |
| :----- | :------------------------------------------ | :----------------------------------------------------------- |
| is     | is 是判断两个标识符是不是引用自一个对象     | **x is y**, 类似 **id(x) == id(y)** , 如果引用的是同一个对象则返回 True，否则返回 False |
| is not | is not 是判断两个标识符是不是引用自不同对象 | **x is not y** ， 类似 **id(x) != id(y)**。如果引用的不是同一个对象则返回结果 True，否则返回 False。 |

#### Python运算符优先级

以下表格列出了从最高到最低优先级的所有运算符， 相同单元格内的运算符具有相同优先级。 运算符均指二元运算，除非特别指出。 相同单元格内的运算符从左至右分组（除了幂运算是从右至左分组）：

| 运算符                                                       | 描述                               |
| :----------------------------------------------------------- | :--------------------------------- |
| `(expressions...)`,`[expressions...]`, `{key: value...}`, `{expressions...}` | 圆括号的表达式                     |
| `x[index]`, `x[index:index]`, `x(arguments...)`, `x.attribute` | 读取，切片，调用，属性引用         |
| await x                                                      | await 表达式                       |
| `**`                                                         | 乘方(指数)                         |
| `+x`, `-x`, `~x`                                             | 正，负，按位非 NOT                 |
| `*`, `@`, `/`, `//`, `%`                                     | 乘，矩阵乘，除，整除，取余         |
| `+`, `-`                                                     | 加和减                             |
| `<<`, `>>`                                                   | 移位                               |
| `&`                                                          | 按位与 AND                         |
| `^`                                                          | 按位异或 XOR                       |
| `|`                                                          | 按位或 OR                          |
| `in,not in, is,is not, <, <=, >, >=, !=, ==`                 | 比较运算，包括成员检测和标识号检测 |
| `not x`                                                      | 逻辑非 NOT                         |
| `and`                                                        | 逻辑与 AND                         |
| `or`                                                         | 逻辑或 OR                          |
| `if -- else`                                                 | 条件表达式                         |
| `lambda`                                                     | lambda 表达式                      |
| `:=`                                                         | 赋值表达式                         |





### 2.5 控制流程语句

#### 条件语句

#### if 语句

Python中if语句的一般形式如下所示

if语句的关键字为：**if – elif – else**。

**注意：**

- 1、每个条件后面要使用冒号 **:**，表示接下来是满足条件后要执行的语句块。
- 2、使用缩进来划分语句块，相同缩进数的语句在一起组成一个语句块。
- 3、在 Python3.10 版本添加了 **match...case**，功能也类似，详见下文。



```python
# 单分支
var1 = 100
if var1: 
    print ("1 - if 表达式条件为 true")
print (var1)

# 双分支
var2 = 0
if var2:
    print (var2) 
else：
	print ("Good bye!")
    
# 多分支
var2 = 0
if var2==1:
    print (var2) 
elif var2==0：
	print (var2+'1')
else:
    print ("Good bye!")
```



#### if 嵌套

在嵌套 if 语句中，可以把 if...elif...else 结构放在另外一个 if...elif...else 结构中。

```python
num=int(input("输入一个数字：")) 
if num%2==0:    
    if num%3==0:        
        print ("你输入的数字可以整除 2 和 3")    
    else:        
        print ("你输入的数字可以整除 2，但不能整除 3") 
    else:    
        if num%3==0:        
            print ("你输入的数字可以整除 3，但不能整除 2")    
        else:        
            print  ("你输入的数字不能整除 2 和 3")
```



#### match...case <Badge text="3.10"/>

match 后的对象会依次与 case 后的内容进行匹配，如果匹配成功，则执行匹配到的表达式，否则直接跳过，**_** 可以匹配一切。

```python
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"

mystatus=400
print(http_error(400))

# 一个 case 也可以设置多个匹配条件，条件使用 **｜** 隔开
...
    case 401|403|404:
        return "Not allowed"
```



#### 循环语句

Python 中的循环语句有 for 和 while。

#### while 循环

Python 中 while 语句的一般形式

> 同样需要注意冒号和缩进。

```python
n = 100  
sum = 0 
counter = 1 
while counter <= n:    
    sum = sum + counter    
    counter += 1  
    print("1 到 %d 之和为: %d" % (n,sum))
```



#### while 循环使用 else 语句

如果 while 后面的条件语句为 false 时，则执行 else 的语句块。

```python
count = 0 
while count < 5:   
    print (count, " 小于 5")   
    count = count + 1
else:   
    print (count, " 大于或等于 5")
```



#### for 语句

Python for 循环可以遍历任何可迭代对象，如一个列表或者一个字符串。

```python
sites = ["Baidu", "Google","Runoob","Taobao"] 
for site in sites:    
    print(site)
```



#### for...else

在 Python 中，for...else 语句用于在循环结束后执行一段代码。

```python
for x in range(6):
    print(x)
else:
    print("Finally finished!")
```

当循环执行完毕（即遍历完 iterable 中的所有元素）后，会执行 else 子句中的代码



#### range() 函数

如果你需要遍历数字序列，可以使用内置 range() 函数。它会生成数列

```python
for i in range(5):  
    print(i) 

# 可以使用 range() 指定区间的值：

for i in range(5,9):    
    print(i)

# 可以使用 range() 以指定数字开始并指定步长
    
for i in range(0, 10, 3):    
    print(i)
    
for i in range(-10, -100, -30):    
    print(i)

# 您可以结合 range() 和 len() 函数以遍历一个序列的索引
for i in range(0,len(10)):    
    print(i)
```



#### break 和 continue 语句及循环中的 else 子句

**break** 语句可以跳出 for 和 while 的循环体。如果你从 for 或 while 循环中终止，任何对应的循环 else 块将不执行。

**continue** 语句被用来告诉 Python 跳过当前循环块中的剩余语句，然后继续进行下一轮循环。





### 2.6 函数和作用域

你可以定义一个由自己想要功能的函数，以下是简单的规则：

- 函数代码块以 **def** 关键词开头，后接函数标识符名称和圆括号 **()**。
- 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
- 函数内容以冒号 **:** 起始，并且缩进。
- **return [表达式]** 结束函数，选择性地返回一个值给调用方，不带表达式的 return 相当于返回 None。



#### 语法

Python 定义函数使用 def 关键字

> 默认情况下，参数值和参数名称是按函数声明中定义的顺序匹配起来的。

```python
def hello() :
  print("Hello World!")

hello()
```



更复杂点的应用，函数中带上参数变量

```python
def max(a, b):    
    if a > b:        
        return a
    else:        
        return b  
a = 4 b = 5 
print(max(a, b))
```



#### 函数调用

定义一个函数：给了函数一个名称，指定了函数里包含的参数，和代码块结构。

这个函数的基本结构完成以后，你可以通过另一个函数调用执行，也可以直接从 Python 命令提示符执行。

```python
# 定义函数 
def printme( str ):   
    # 打印任何传入的字符串  
    print (str)   
    return  
# 调用函数 printme("我要调用用户自定义函数!") 
printme("再次调用同一函数")
```



#### 参数传递

在 python 中，类型属于对象，对象有不同类型的区分，变量是没有类型的

```python
a=[1,2,3]

a="Runoob"
```

以上代码中，**[1,2,3]** 是 List 类型，**"Runoob"** 是 String 类型，而变量 a 是没有类型，她仅仅是一个对象的引用（一个指针），可以是指向 List 类型对象，也可以是指向 String 类型对象。



#### 可更改(mutable)与不可更改(immutable)对象

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。

- **不可变类型：**变量赋值 **a=5** 后再赋值 **a=10**，这里实际是新生成一个 int 值对象 10，再让 a 指向它，而 5 被丢弃，不是改变 a 的值，相当于新生成了 a。
- **可变类型：**变量赋值 **la=[1,2,3,4]** 后再赋值 **la[2]=5** 则是将 list la 的第三个元素值更改，本身la没有动，只是其内部的一部分值被修改了。



python 函数的参数传递：

- **不可变类型：**类似 C++ 的值传递，如整数、字符串、元组。如 fun(a)，传递的只是 a 的值，没有影响 a 对象本身。如果在 fun(a) 内部修改 a 的值，则是新生成一个 a 的对象。
- **可变类型：**类似 C++ 的引用传递，如 列表，字典。如 fun(la)，则是将 la 真正的传过去，修改后 fun 外部的 la 也会受影响

python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。



#### 参数

以下是调用函数时可使用的正式参数类型：

- 必需参数
- 关键字参数
- 默认参数
- 不定长参数
-  强制位置参数

#### 必需参数

必需参数须以正确的顺序传入函数。调用时的数量必须和声明时的一样。

调用 printme() 函数，你必须传入一个参数，不然会出现语法错误

```python
#可写函数说明 
def printme( str ):   
    "打印任何传入的字符串"   
    print (str)   
    return  
# 调用 printme 函数，不加参数会报错 
printme()
```



#### 关键字参数

关键字参数和函数调用关系紧密，函数调用使用关键字参数来确定传入的参数值。

使用关键字参数允许函数调用时参数的顺序与声明时不一致，因为 Python 解释器能够用参数名匹配参数值。

```python
#可写函数说明 
def printme( str ):   
    "打印任何传入的字符串"   
    print (str)   
    return  #调用printme函数 
printme( str = "菜鸟教程")


#可写函数说明 
def printinfo( name, age ):   
    "打印任何传入的字符串"   
    print ("名字: ", name)   
    print ("年龄: ", age)   
    return  #调用printinfo函数 
printinfo( age=50, name="runoob" )
```



#### 默认参数

调用函数时，如果没有传递参数，则会使用默认参数。以下实例中如果没有传入 age 参数，则使用默认值

```python
#可写函数说明 
def printinfo( name, age = 35 ):   
    "打印任何传入的字符串"   
    print ("名字: ", name)   
    print ("年龄: ", age)   
    return  #调用printinfo函数 
printinfo( age=50, name="runoob" ) 
print ("------------------------") 
printinfo( name="runoob" )
```

#### 不定长参数

你可能需要一个函数能处理比当初声明时更多的参数。这些参数叫做不定长参数，和上述 2 种参数不同，声明时不会命名。

```python
def functionname([formal_args,] *var_args_tuple ):
    "函数_文档字符串"
    function_suite
    return [expression]
```

加了星号 \* 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数。

```python
def printinfo( arg1, *vartuple ):   
    "打印任何传入的参数"   
    print ("输出: ")   
    print (arg1)   
    print (vartuple)  
# 调用printinfo 函数 
printinfo( 70, 60, 50 )
```



如果在函数调用时没有指定参数，它就是一个空元组。我们也可以不向函数传递未命名的变量。

```python
def printinfo( arg1, *vartuple ):   
    "打印任何传入的参数"   
    print ("输出: ")   
    print (arg1)   
for var in vartuple:
    print (var)   
    return  
# 调用printinfo 函数 
printinfo( 10 ) 
printinfo( 70, 60, 50 )
```

还有一种就是参数带两个星号 \*\*

```python
def functionname([formal_args,] **var_args_dict ):
    "函数_文档字符串"
    function_suite
    return [expression]
```

加了两个星号 \*\* 的参数会以字典的形式导入。

```python
# 可写函数说明 
def printinfo( arg1, **vardict ):   
    "打印任何传入的参数"   
    print ("输出: ")   
    print (arg1)   
    print (vardict)  
# 调用printinfo 函数 
printinfo(1, a=2,b=3)
```

声明函数时，参数中星号 \* 可以单独出现

```python
def f(a,b,*,c):
    return a+b+c
```

如果单独出现星号 \*，则星号 \* 后的参数必须用关键字传入：

```python
def f(a,b,*,c): 
    return a+b+c
f(1,2,3)   # 报错
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    TypeError: f() takes 2 positional arguments but 3 were given
    f(1,2,c=3) # 正常
```

#### 强制位置参数

Python3.8 新增了一个函数形参语法 / 用来指明函数形参必须使用指定位置参数，不能使用关键字参数的形式。

在以下的例子中，形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 和 f 要求为关键字形参:

```python
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)
```



#### return 语句

**return [表达式]** 语句用于退出函数，选择性地向调用方返回一个表达式。不带参数值的 return 语句返回 None。之前的例子都没有示范如何返回数值，以下实例演示了 return 语句的用法：

```python
# 可写函数说明 
def sum( arg1, arg2 ):   
    # 返回2个参数的和."   
    total = arg1 + arg2   
    print ("函数内 : ", total)   
    return total
# 调用sum函数 
total = sum( 10, 20 ) 
print ("函数外 : ", total)
```



## 三、Python 高级语法

### 3.1 面向对象编程

Python从设计之初就已经是一门面向对象的语言，正因为如此，在Python中创建一个类和对象是很容易的。本章节我们将详细介绍Python的面向对象编程。

如果你以前没有接触过面向对象的编程语言，那你可能需要先了解一些面向对象语言的一些基本特征，在头脑里头形成一个基本的面向对象的概念，这样有助于你更容易的学习Python的面向对象编程。



面向对象技术简介

- **类(Class):** 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。
- **方法：**类中定义的函数。
- **类变量：**类变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量通常不作为实例变量使用。
- **数据成员：**类变量或者实例变量用于处理类及其实例对象的相关的数据。
- **方法重写：**如果从父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也称为方法的重写。
- **局部变量：**定义在方法中的变量，只作用于当前实例的类。
- **实例变量：**在类的声明中，属性是用变量来表示的，这种变量就称为实例变量，实例变量就是一个用 self 修饰的变量。
- **继承：**即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。
- **实例化：**创建一个类的实例，类的具体对象。
- **对象：**通过类定义的数据结构实例。对象包括两个数据成员（类变量和实例变量）和方法。

和其它编程语言相比，Python 在尽可能不增加新的语法和语义的情况下加入了类机制。

Python中的类提供了面向对象编程的所有基本功能：类的继承机制允许多个基类，派生类可以覆盖基类中的任何方法，方法中可以调用基类中的同名方法。

对象可以包含任意数量和类型的数据。

#### 类定义

语法格式如下：

```python
class ClassName:    
    <statement-1>
    <statement-N>
```

类实例化后，可以使用其属性，实际上，创建一个类之后，可以通过类名访问其属性。

#### 类对象

类对象支持两种操作：属性引用和实例化。

属性引用使用和 Python 中所有的属性引用一样的标准语法：**obj.name**。

类对象创建后，类命名空间中所有的命名都是有效属性名。

```python
class MyClass:    
    """一个简单的类实例"""    
    i = 12345    
    def f(self):        
        return 'hello world'  
    # 实例化类 
x = MyClass()  
# 访问类的属性和方法 
print("MyClass 类的属性 i 为：", x.i) 
print("MyClass 类的方法 f 输出为：", x.f())
```



类有一个名为 __init__() 的特殊方法（**构造方法**），该方法在类实例化时会自动调用，像下面这样：

```python
def __init__(self):    
    self.data = []
```

类定义了 __init__() 方法，类的实例化操作会自动调用 __init__() 方法。如下实例化类 MyClass，对应的 __init__() 方法就会被调用:

```
x = MyClass()
```

当然， __init__() 方法可以有参数，参数通过 __init__() 传递到类的实例化操作上。

```python
class Complex:    
        def __init__(self, realpart, imagpart):        
            self.r = realpart        
            self.i = imagpart 
x = Complex(3.0, -4.5) 
print(x.r, x.i)   
# 输出结果：3.0 -4.5
```



#### self代表类的实例，而非类

类的方法与普通的函数只有一个特别的区别——它们必须有一个额外的**第一个参数名称**, 按照惯例它的名称是 self。

```python
class Test:    
    def prt(self):        
        print(self)        
        print(self.__class__)  
t = Test() 
t.prt()
```



从执行结果可以很明显的看出，self 代表的是类的实例，代表当前对象的地址，而 self.class 则指向类。



self 不是 python 关键字，我们把他换成 runoob 也是可以正常执行的:

```python
class Test:    
    def prt(runoob):        
        print(runoob)        
        print(runoob.__class__)  
t = Test() 
t.prt()
```

#### 类的方法

在类的内部，使用 **def** 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 self, 且为第一个参数，self 代表的是类的实例。

```python
#类定义 
class people:    
    #定义基本属性    
    name = ''    
    age = 0    
    #定义私有属性,私有属性在类外部无法直接进行访问   
    __weight = 0    
    #定义构造方法    
    def __init__(self,n,a,w):        
        self.name = n        
        self.age = a        
        self.__weight = w    
        def speak(self):        
            print("%s 说: 我 %d 岁。" %(self.name,self.age))  
# 实例化类 
p = people('runoob',10,30) 
p.speak()
```

#### 继承

Python 同样支持类的继承，如果一种语言不支持继承，类就没有什么意义。

```python
class DerivedClassName(BaseClassName):
<statement-1>
.    .    .    
<statement-N>
```



子类（派生类 DerivedClassName）会继承父类（基类 BaseClassName）的属性和方法。

BaseClassName（实例中的基类名）必须与派生类定义在一个作用域内。除了类，还可以用表达式，基类定义在另一个模块中时这一点非常有用:

```python
class DerivedClassName(modname.BaseClassName):
    #类定义 
    class people:    
        #定义基本属性    
        name = ''    
        age = 0    
        #定义私有属性,私有属性在类外部无法直接进行访问    
        __weight = 0    
        #定义构造方法    
        def __init__(self,n,a,w):        
            self.name = n        
            self.age = a        
            self.__weight = w    
            def speak(self):        
                print("%s 说: 我 %d 岁。" %(self.name,self.age))  
                #单继承示例 
                class student(people):    
                    grade = ''    
                    def __init__(self,n,a,w,g):        
                        #调用父类的构函      
                        people.__init__(self,n,a,w)        
                        self.grade = g    
                        #覆写父类的方法    
                        def speak(self):        
                            print("%s 说: 我 %d 岁了，我在读 %d 年级"%(self.name,self.age,self.grade))    
                            s = student('ken',10,60,3) 
                            s.speak()
```



#### 多继承

Python同样有限的支持多继承形式。多继承的类定义形如下例:

```python
class DerivedClassName(Base1, Base2, Base3):    
    <statement-1>
    .    .    .    
    <statement-N>
```



需要注意圆括号中父类的顺序，若是父类中有相同的方法名，而在子类使用时未指定，python从左至右搜索 即方法在子类中未找到时，从左到右查找父类中是否包含方法。

```python
#类定义 
class people:    
#定义基本属性    
name = ''    
age = 0    
#定义私有属性,私有属性在类外部无法直接进行访问    
__weight = 0    
#定义构造方法    
def __init__(self,n,a,w):        
self.name = n        
self.age = a        
self.__weight = w    
def speak(self):        
    print("%s 说: 我 %d 岁。" %(self.name,self.age))  
    #单继承示例 
    class student(people):    
        grade = ''    
        def __init__(self,n,a,w,g):        
            #调用父类的构函        
            people.__init__(self,n,a,w)        
            self.grade = g    
            #覆写父类的方法    
            def speak(self):        
                print("%s 说: 我 %d 岁了，我在读 %d 年级"%(self.name,self.age,self.grade))  
                #另一个类，多继承之前的准备 
                class speaker():    
                    topic = ''    
                    name = ''    
                    def __init__(self,n,t):        
                        self.name = n       
                        self.topic = t    
                        def speak(self):        
                            print("我叫 %s，我是一个演说家，我演讲的主题是 %s"%(self.name,self.topic))  
                            #多继承 
                            class sample(speaker,student):
                                a =''    
                                def __init__(self,n,a,w,g,t):
                                    student.__init__(self,n,a,w,g)        
                                    speaker.__init__(self,n,t)  test = sample("Tim",25,80,4,"Python") 
                                    test.speak()   
                                    #方法名同，默认调用的是在括号中参数位置排前父类的方法
```



#### 方法重写

如果你的父类方法的功能不能满足你的需求，你可以在子类重写你父类的方法

```python
class Parent:        
    # 定义父类   
    def myMethod(self):      
        print ('调用父类方法')  
        class Child(Parent): 
            # 定义子类   
            def myMethod(self):      
                print ('调用子类方法')  
                c = Child()         
                # 子类实例 
                c.myMethod()         
                # 子类调用重写方法 
                super(Child,c).myMethod() 
                #用子类对象调用父类已被覆盖的方法
```

super() 函数是用于调用父类(超类)的一个方法。



#### 类属性与方法

#### 类的私有属性

**__private_attrs**：两个下划线开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 **self.__private_attrs**。



#### 类的方法

在类的内部，使用 def 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 **self**，且为第一个参数，**self** 代表的是类的实例。

**self** 的名字并不是规定死的，也可以使用 **this**，但是最好还是按照约定使用 **self**。



#### 类的私有方法

**__private_method**：两个下划线开头，声明该方法为私有方法，只能在类的内部调用 ，不能在类的外部调用。**self.__private_methods**。



类的私有属性实例如下：

```python
class JustCounter:    
    __secretCount = 0  
    # 私有变量    
    publicCount = 0    
    # 公开变量     
    def count(self):        
        self.__secretCount += 1        
        self.publicCount += 1        
        print (self.__secretCount)  
        counter = JustCounter() 
        counter.count() 
        counter.count() 
        print (counter.publicCount) 
        print (counter.__secretCount)  
        # 报错，实例不能访问私有变量
```



类的私有方法实例如下：

```python
class Site:    
    def __init__(self, name, url):        
        self.name = name       
        # public        
        self.__url = url   
        # private     
        def who(self):        
            print('name  : ', self.name)        
            print('url : ', self.__url)     
            def __foo(self):          
                # 私有方法        
                print('这是私有方法')     
                def foo(self):            
                    # 公共方法        
                    print('这是公共方法')        
                    self.__foo()  x = Site('菜鸟教程', 'www.runoob.com') 
                    x.who()        
                    # 正常输出 
                    x.foo()        
                    # 正常输出 
                    x.__foo()      
                    # 报错
```



#### 类专有方法：

- **__init__ :** 构造函数，在生成对象时调用
- **__del__ :** 析构函数，释放对象时使用
- **__repr__ :** 打印，转换
- **__setitem__ :** 按照索引赋值
- **__getitem__:** 按照索引获取值
- **__len__:** 获得长度
- **__cmp__:** 比较运算
- **__call__:** 函数调用
- **__add__:** 加运算
- **__sub__:** 减运算
- **__mul__:** 乘运算
- **__truediv__:** 除运算
- **__mod__:** 求余运算
- **__pow__:** 乘方



#### 运算符重载

Python同样支持运算符重载，我们可以对类的专有方法进行重载，实例如下：

```python
class Vector:   
    def __init__(self, a, b):      
        self.a = a      
        self.b = b   
        def __str__(self):      
            return 'Vector (%d, %d)' % (self.a, self.b)      
        def __add__(self,other):      
            return Vector(self.a + other.a, self.b + other.b)  
        v1 = Vector(2,10) 
        v2 = Vector(5,-2) 
        print (v1 + v2)
```



### 3.2 文件操作



