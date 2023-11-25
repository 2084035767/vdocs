# 五、高级特性

## 5.1 切片

取一个list或tuple的部分元素是非常常见的操作。比如，一个list如下：

```
>>> L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
```

取前3个元素，应该怎么做？

笨办法：

```
>>> [L[0], L[1], L[2]]
['Michael', 'Sarah', 'Tracy']
```

之所以是笨办法是因为扩展一下，取前N个元素就没辙了。

取前N个元素，也就是索引为0-(N-1)的元素，可以用循环：

```
>>> r = []
>>> n = 3
>>> for i in range(n):
...     r.append(L[i])
... 
>>> r
['Michael', 'Sarah', 'Tracy']
```

对这种经常取指定索引范围的操作，用循环十分繁琐，因此，Python提供了切片（Slice）操作符，能大大简化这种操作。

对应上面的问题，取前3个元素，用一行代码就可以完成切片：

```
>>> L[0:3]
['Michael', 'Sarah', 'Tracy']
```

`L[0:3]`表示，从索引`0`开始取，直到索引`3`为止，但不包括索引`3`。即索引`0`，`1`，`2`，正好是3个元素。

如果第一个索引是`0`，还可以省略：

```
>>> L[:3]
['Michael', 'Sarah', 'Tracy']
```

也可以从索引1开始，取出2个元素出来：

```
>>> L[1:3]
['Sarah', 'Tracy']
```

类似的，既然Python支持`L[-1]`取倒数第一个元素，那么它同样支持倒数切片，试试：

```
>>> L[-2:]
['Bob', 'Jack']
>>> L[-2:-1]
['Bob']
```

记住倒数第一个元素的索引是`-1`。

切片操作十分有用。我们先创建一个0-99的数列：

```
>>> L = list(range(100))
>>> L
[0, 1, 2, 3, ..., 99]
```

可以通过切片轻松取出某一段数列。比如前10个数：

```
>>> L[:10]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

后10个数：

```
>>> L[-10:]
[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
```

前11-20个数：

```
>>> L[10:20]
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

前10个数，每两个取一个：

```
>>> L[:10:2]
[0, 2, 4, 6, 8]
```

所有数，每5个取一个：

```
>>> L[::5]
[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
```

甚至什么都不写，只写`[:]`就可以原样复制一个list：

```
>>> L[:]
[0, 1, 2, 3, ..., 99]
```

tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple：

```
>>> (0, 1, 2, 3, 4, 5)[:3]
(0, 1, 2)
```

字符串`'xxx'`也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串：

```
>>> 'ABCDEFG'[:3]
'ABC'
>>> 'ABCDEFG'[::2]
'ACEG'
```

在很多编程语言中，针对字符串提供了很多各种截取函数（例如，substring），其实目的就是对字符串切片。Python没有针对字符串的截取函数，只需要切片一个操作就可以完成，非常简单。

## 5.2 迭代

如果给定一个`list`或`tuple`，我们可以通过`for`循环来遍历这个`list`或`tuple`，这种遍历我们称为迭代（Iteration）。

在Python中，迭代是通过`for ... in`来完成的，而很多语言比如C语言，迭代`list`是通过下标完成的，比如C代码：

```
for (i=0; i<length; i++) {
    n = list[i];
}
```

可以看出，Python的`for`循环抽象程度要高于C的`for`循环，因为Python的`for`循环不仅可以用在`list`或`tuple`上，还可以作用在其他可迭代对象上。

`list`这种数据类型虽然有下标，但很多其他数据类型是没有下标的，但是，只要是可迭代对象，无论有无下标，都可以迭代，比如`dict`就可以迭代：

```
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for key in d:
...     print(key)
...
a
c
b
```

因为`dict`的存储不是按照`list`的方式顺序排列，所以，迭代出的结果顺序很可能不一样。

默认情况下，`dict`迭代的是key。如果要迭代value，可以用`for value in d.values()`，如果要同时迭代key和value，可以用`for k, v in d.items()`。

由于字符串也是可迭代对象，因此，也可以作用于`for`循环：

```
>>> for ch in 'ABC':
...     print(ch)
...
A
B
C
```

所以，当我们使用`for`循环时，只要作用于一个可迭代对象，`for`循环就可以正常运行，而我们不太关心该对象究竟是`list`还是其他数据类型。

那么，如何判断一个对象是可迭代对象呢？方法是通过`collections.abc`模块的`Iterable`类型判断：

```
>>> from collections.abc import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
>>> isinstance([1,2,3], Iterable) # list是否可迭代
True
>>> isinstance(123, Iterable) # 整数是否可迭代
False
```

最后一个小问题，如果要对`list`实现类似Java那样的下标循环怎么办？Python内置的`enumerate`函数可以把一个`list`变成索引-元素对，这样就可以在`for`循环中同时迭代索引和元素本身：

```
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C
```

上面的`for`循环里，同时引用了两个变量，在Python里是很常见的，比如下面的代码：

```
>>> for x, y in [(1, 1), (2, 4), (3, 9)]:
...     print(x, y)
...
1 1
2 4
3 9
```

## 5.3 列表推导式



Python 推导式是一种独特的数据处理方式，可以从一个数据序列构建另一个新的数据序列的结构体。

Python 支持各种数据结构的推导式：

- 列表(list)推导式
- 字典(dict)推导式
- 集合(set)推导式
- 元组(tuple)推导式

### 列表推导式

列表推导式格式为：

```python
[表达式 for 变量 in 列表] 
[out_exp_res for out_exp in input_list]

或者 

[表达式 for 变量 in 列表 if 条件]
[out_exp_res for out_exp in input_list if condition]
```

- out_exp_res：列表生成元素表达式，可以是有返回值的函数。
- for out_exp in input_list：迭代 input_list 将 out_exp 传入到 out_exp_res 表达式中。
- if condition：条件语句，可以过滤列表中不符合条件的值。

过滤掉长度小于或等于3的字符串列表，并将剩下的转换成大写字母：

```python
names = ['Bob','Tom','alice','Jerry','Wendy','Smith']
new_names = [name.upper()for name in names if len(name)>3]
print(new_names)
['ALICE', 'JERRY', 'WENDY', 'SMITH']
```



计算 30 以内可以被 3 整除的整数：

```
multiples = [i for i in range(30) if i % 3 == 0]
print(multiples)
[0, 3, 6, 9, 12, 15, 18, 21, 24, 27]
```



### 字典推导式

字典推导基本格式：

```
{ key_expr: value_expr for value in collection }
或
{ key_expr: value_expr for value in collection if condition }
```

使用字符串及其长度创建字典：

```
listdemo = ['Google','Runoob', 'Taobao']
# 将列表中各字符串值为键，各字符串的长度为值，组成键值对
newdict = {key:len(key) for key in listdemo}
newdict
{'Google': 6, 'Runoob': 6, 'Taobao': 6}
```



提供三个数字，以三个数字为键，三个数字的平方为值来创建字典：

```
dic = {x: x2 for x in (2, 4, 6)}
dic
{2: 4, 4: 16, 6: 36}
type(dic)
<class 'dict'>
```



### 集合推导式

集合推导式基本格式：

```
{ expression for item in Sequence }

{ expression for item in Sequence if conditional }
```

计算数字 1,2,3 的平方数：

```
setnew = {i2 for i in (1,2,3)}
setnew
{1, 4, 9}
```



判断不是 abc 的字母并输出：

```
a = {x for x in 'abracadabra' if x not in 'abc'}
a
{'d', 'r'}
type(a)
<class 'set'>
```



### 元组推导式（生成器表达式）

元组推导式可以利用 range 区间、元组、列表、字典和集合等数据类型，快速生成一个满足指定需求的元组。

元组推导式基本格式：

```
(expression for item in Sequence )
(expression for item in Sequence if conditional )
```

元组推导式和列表推导式的用法也完全相同，只是元组推导式是用 () 圆括号将各部分括起来，而列表推导式用的是中括号 []，另外元组推导式返回的结果是一个生成器对象。

例如，我们可以使用下面的代码生成一个包含数字 1~9 的元组：

```python
a = (x for x in range(1,10))
a
<generator object <genexpr> at 0x7faf6ee20a50> # 返回的是生成器对象

tuple(a)    # 使用 tuple() 函数，可以直接将生成器对象转换成元组
(1, 2, 3, 4, 5, 6, 7, 8, 9)
```



## 5.4 生成器

在 Python 中，使用了 yield 的函数被称为生成器（generator）。

yield 是一个关键字，用于定义生成器函数，生成器函数是一种特殊的函数，可以在迭代过程中逐步产生值，而不是一次性返回所有结果。

跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。

当在生成器函数中使用 yield 语句时，函数的执行将会暂停，并将 yield 后面的表达式作为当前迭代的值返回。

然后，每次调用生成器的 next() 方法或使用 for 循环进行迭代时，函数会从上次暂停的地方继续执行，直到再次遇到 yield 语句。这样，生成器函数可以逐步产生值，而不需要一次性计算并返回所有结果。

调用一个生成器函数，返回的是一个迭代器对象。

```python
def countdown(n):    
    while n > 0:        
        yield n        
        n -= 1  
        # 创建生成器对象 
        generator = countdown(5)  
        # 通过迭代生成器获取值 
        print(next(generator))  # 输出: 5 
        print(next(generator))  # 输出: 4 
        print(next(generator))  # 输出: 3  
        # 使用 for 循环迭代生成器 
        for value in generator:    
            print(value)  # 输出: 2 1
```

以上实例中，countdown 函数是一个生成器函数。它使用 yield 语句逐步产生从 n 到 1 的倒数数字。在每次调用 yield 语句时，函数会返回当前的倒数值，并在下一次调用时从上次暂停的地方继续执行。

通过创建生成器对象并使用 next() 函数或 for 循环迭代生成器，我们可以逐步获取生成器函数产生的值。在这个例子中，我们首先使用 next() 函数获取前三个倒数值，然后通过 for 循环获取剩下的两个倒数值。

生成器函数的优势是它们可以按需生成值，避免一次性生成大量数据并占用大量内存。此外，生成器还可以与其他迭代工具（如for循环）无缝配合使用，提供简洁和高效的迭代方式。



以下实例使用 yield 实现斐波那契数列：

```python
import sys  
def fibonacci(n): 
# 生成器函数 - 斐波那契    
a, b, counter = 0, 1, 0    
while True:        
    if (counter > n):             
        return        
    yield a        
    a, b = b, a + b        
    counter += 1 f = fibonacci(10) 
    # f 是一个迭代器，由生成器返回生成  
    while True:    
        try:        
            print (next(f), end=" ")    
        except StopIteration:       
            sys.exit()
```



## 5.5 迭代器

### 迭代器

迭代是 Python 最强大的功能之一，是访问集合元素的一种方式。

迭代器是一个可以记住遍历的位置的对象。

迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。

迭代器有两个基本的方法：iter() 和 next()。

字符串，列表或元组对象都可用于创建迭代器：

```python
list=[1,2,3,4]
it = iter(list)   # 创建迭代器对象
print (next(it))  # 输出迭代器的下一个元素
print (next(it))
```



迭代器对象可以使用常规for语句进行遍历：

```python
list=[1,2,3,4] it = iter(list)    # 创建迭代器对象 
for x in it:
    print (x, end=" ")
```



也可以使用 next() 函数：

```py
import sys         
# 引入 sys 模块  
list=[1,2,3,4] 
it = iter(list)    
# 创建迭代器对象  
while True:    
    try:        
        print (next(it))    
    except StopIteration:        
        sys.exit()
```





## 创建一个迭代器

把一个类作为一个迭代器使用需要在类中实现两个方法 __iter__() 与 __next__() 。

如果你已经了解的面向对象编程，就知道类都有一个构造函数，Python 的构造函数为 __init__(), 它会在对象初始化的时候执行。

__iter__() 方法返回一个特殊的迭代器对象， 这个迭代器对象实现了 __next__() 方法并通过 StopIteration 异常标识迭代的完成。

__next__() 方法（Python 2 里是 next()）会返回下一个迭代器对象。

创建一个返回数字的迭代器，初始值为 1，逐步递增 1：

```python
class MyNumbers:  
    def __iter__(self):    
        self.a = 1    
        return self   
    def __next__(self):    
        x = self.a    
        self.a += 1    
        return x  
    myclass = MyNumbers() 
    myiter = iter(myclass)  
    print(next(myiter)) 
    print(next(myiter)) 
    print(next(myiter)) 
    print(next(myiter)) 
    print(next(myiter))
```



## StopIteration

StopIteration 异常用于标识迭代的完成，防止出现无限循环的情况，在 __next__() 方法中我们可以设置在完成指定循环次数后触发 StopIteration 异常来结束迭代。

在 20 次迭代后停止执行：

```python
class MyNumbers:  
    def __iter__(self):    
        self.a = 1    
        return self   
    def __next__(self):    
        if self.a <= 20:      
            x = self.a      
            self.a += 1      
            return x    
        else:      
            raise StopIteration  
            myclass = MyNumbers() 
            myiter = iter(myclass)  
            for x in myiter:  
                print(x)
```
