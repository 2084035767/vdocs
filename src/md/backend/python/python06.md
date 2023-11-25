# 六、模块与异常

为此 Python 提供了一个办法，把这些定义存放在文件中，为一些脚本或者交互式的解释器实例使用，这个文件被称为模块。

模块是一个包含所有你定义的函数和变量的文件，其后缀名是.py。模块可以被别的程序引入，以使用该模块中的函数等功能。这也是使用 python 标准库的方法。

```python
# 文件名: using_sys.py
import sys
print('命令行参数如下:')
for i in sys.argv:
    print(i)
    print('\n\nPython 路径为：', sys.path, '\n')
```

- 1、import sys 引入 python 标准库中的 sys.py 模块；这是引入某一模块的方法。
- 2、sys.argv 是一个包含命令行参数的列表。
- 3、sys.path 包含了一个 Python 解释器自动查找所需模块的路径的列表。



### import 语句

想使用 Python 源文件，只需在另一个源文件里执行 import 语句

```python
import module1[, module2[,... moduleN]
```

当解释器遇到 import 语句，如果模块在当前的搜索路径就会被导入。

搜索路径是一个解释器会先进行搜索的所有目录的列表。如想要导入模块 support，需要把命令放在脚本的顶端



一个模块只会被导入一次，不管你执行了多少次 import。这样可以防止导入模块被一遍又一遍地执行。



当我们使用 import 语句的时候，Python 解释器是怎样找到对应的文件的呢？

这就涉及到 Python 的搜索路径，搜索路径是由一系列目录名组成的，Python 解释器就依次从这些目录中去寻找所引入的模块。

这看起来很像环境变量，事实上，也可以通过定义环境变量的方式来确定搜索路径。



搜索路径是在 Python 编译或安装的时候确定的，安装新的库应该也会修改。搜索路径被存储在 sys 模块中的 path 变量



sys.path 输出是一个列表，其中第一项是空串 ''，代表当前目录（若是从一个脚本中打印出来的话，可以更清楚地看出是哪个目录），亦即我们执行python解释器的目录（对于脚本的话就是运行的脚本所在的目录）。

因此若像我一样在当前目录下存在与要引入模块同名的文件，就会把要引入的模块屏蔽掉。

了解了搜索路径的概念，就可以在脚本中修改sys.path来引入一些不在搜索路径中的模块。



如果你打算经常使用一个函数，你可以把它赋给一个本地的名称：

```
>>> fib = fibo.fib
>>> fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
```



### from … import 语句

Python 的 from 语句让你从模块中导入一个指定的部分到当前命名空间中

```python
from modname import name1[, name2[, ... nameN]]
```

例如，要导入模块 fibo 的 fib 函数，使用如下语句：

```python
>>> from fibo import fib, fib2
>>> fib(500)
```

这个声明不会把整个fibo模块导入到当前的命名空间中，它只会将fibo里的fib函数引入进来。



### from … import * 语句

把一个模块的所有内容全都导入到当前的命名空间也是可行的

```python
from modname import *
```

这提供了一个简单的方法来导入一个模块中的所有项目。然而这种声明不该被过多地使用。



### 深入模块

模块除了方法定义，还可以包括可执行的代码。这些代码一般用来初始化这个模块。这些代码只有在第一次被导入时才会被执行。

每个模块有各自独立的符号表，在模块内部为所有的函数当作全局符号表来使用。

所以，模块的作者可以放心大胆的在模块内部使用这些全局变量，而不用担心把其他用户的全局变量搞混。



从另一个方面，当你确实知道你在做什么的话，你也可以通过 modname.itemname 这样的表示法来访问模块内的函数。

模块是可以导入其他模块的。在一个模块（或者脚本，或者其他地方）的最前面使用 import 来导入一个模块，当然这只是一个惯例，而不是强制的。被导入的模块的名称将被放入当前操作的模块的符号表中。



还有一种导入的方法，可以使用 import 直接把模块内（函数，变量的）名称导入到当前操作模块。比如:

```python
from fibo import fib, fib2
fib(500)
```

这种导入的方法不会把被导入的模块的名称放在当前的字符表中（所以在这个例子里面，fibo 这个名称是没有定义的）。



这还有一种方法，可以一次性的把模块中的所有（函数，变量）名称都导入到当前模块的字符表:

```python
from fibo import *
fib(500)
```

这将把所有的名字都导入进来，但是那些由单一下划线（_）开头的名字不在此例。大多数情况， Python程序员不使用这种方法，因为引入的其它来源的命名，很可能覆盖了已有的定义。



### `__name__`属性

一个模块被另一个程序第一次引入时，其主程序将运行。如果我们想在模块被引入时，模块中的某一程序块不执行，我们可以用__name__属性来使该程序块仅在该模块自身运行时执行。

```python
if __name__ == '__main__':
   print('程序自身在运行')
else:
   print('我来自另一模块')
```

说明： 每个模块都有一个__name__属性，当其值是'__main__'时，表明该模块自身在运行，否则是被引入。



### dir() 函数

内置的函数 dir() 可以找到模块内定义的所有名称。以一个字符串列表的形式返回:

```python
import fibo, sys
dir(fibo)
['__name__', 'fib', 'fib2']
dir(sys)  
['__displayhook__', '__doc__', '__excepthook__', '__loader__', '__name__',
 '__package__', '__stderr__', '__stdin__', '__stdout__',
 '_clear_type_cache', '_current_frames', '_debugmallocstats', '_getframe',
 '_home', '_mercurial', '_xoptions', 'abiflags', 'api_version', 'argv',
 'base_exec_prefix', 'base_prefix', 'builtin_module_names', 'byteorder',
 'call_tracing', 'callstats', 'copyright', 'displayhook',
 'dont_write_bytecode', 'exc_info', 'excepthook', 'exec_prefix',
 'executable', 'exit', 'flags', 'float_info', 'float_repr_style',
 'getcheckinterval', 'getdefaultencoding', 'getdlopenflags',
 'getfilesystemencoding', 'getobjects', 'getprofile', 'getrecursionlimit',
 'getrefcount', 'getsizeof', 'getswitchinterval', 'gettotalrefcount',
 'gettrace', 'hash_info', 'hexversion', 'implementation', 'int_info',
 'intern', 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path',
 'path_hooks', 'path_importer_cache', 'platform', 'prefix', 'ps1',
 'setcheckinterval', 'setdlopenflags', 'setprofile', 'setrecursionlimit',
 'setswitchinterval', 'settrace', 'stderr', 'stdin', 'stdout',
 'thread_info', 'version', 'version_info', 'warnoptions']
```

如果没有给定参数，那么 dir() 函数会罗列出当前定义的所有名称:

```python
a = [1, 2, 3, 4, 5]
import fibo
fib = fibo.fib
dir() # 得到一个当前模块中定义的属性列表
['__builtins__', '__name__', 'a', 'fib', 'fibo', 'sys']
a = 5 # 建立一个新的变量 'a'
dir()
['__builtins__', '__doc__', '__name__', 'a', 'sys']
del a # 删除变量名a
dir()
['__builtins__', '__doc__', '__name__', 'sys']
```



### 标准模块

Python 本身带着一些标准的模块库，在 Python 库参考文档中将会介绍到（就是后面的"库参考文档"）。

有些模块直接被构建在解析器里，这些虽然不是一些语言内置的功能，但是他却能很高效的使用，甚至是系统级调用也没问题。

这些组件会根据不同的操作系统进行不同形式的配置，比如 winreg 这个模块就只会提供给 Windows 系统。

应该注意到这有一个特别的模块 sys ，它内置在每一个 Python 解析器中。变量 sys.ps1 和 sys.ps2 定义了主提示符和副提示符所对应的字符串:

```python
import sys
sys.ps1
'>>> '
sys.ps2
'... '
sys.ps1 = 'C> '
C> print('Runoob!')
Runoob!
C> 
```



### 包

包是一种管理 Python 模块命名空间的形式，采用"点模块名称"。

比如一个模块的名称是 A.B， 那么他表示一个包 A中的子模块 B 。



就好像使用模块的时候，你不用担心不同模块之间的全局变量相互影响一样，采用点模块名称这种形式也不用担心不同库之间的模块重名的情况。



这样不同的作者都可以提供 NumPy 模块，或者是 Python 图形库。



不妨假设你想设计一套统一处理声音文件和数据的模块（或者称之为一个"包"）。



现存很多种不同的音频文件格式（基本上都是通过后缀名区分的，例如： .wav，:file:.aiff，:file:.au，），所以你需要有一组不断增加的模块，用来在不同的格式之间转换。



并且针对这些音频数据，还有很多不同的操作（比如混音，添加回声，增加均衡器功能，创建人造立体声效果），所以你还需要一组怎么也写不完的模块来处理这些操作。



这里给出了一种可能的包结构（在分层的文件系统中）:

```
sound/                          顶层包
      __init__.py               初始化 sound 包
      formats/                  文件格式转换子包
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  声音效果子包
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  filters 子包
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

在导入一个包的时候，Python 会根据 sys.path 中的目录来寻找这个包中包含的子目录。



目录只有包含一个叫做 __init__.py 的文件才会被认作是一个包，主要是为了避免一些滥俗的名字（比如叫做 string）不小心的影响搜索路径中的有效模块。



最简单的情况，放一个空的 :file:__init__.py就可以了。当然这个文件中也可以包含一些初始化代码或者为（将在后面介绍的） __all__变量赋值。



用户可以每次只导入一个包里面的特定模块，比如:

```
import sound.effects.echo
```

这将会导入子模块:sound.effects.echo。 他必须使用全名去访问:

```
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

还有一种导入子模块的方法是:

```
from sound.effects import echo
```

这同样会导入子模块: echo，并且他不需要那些冗长的前缀，所以他可以这样使用:

```
echo.echofilter(input, output, delay=0.7, atten=4)
```

还有一种变化就是直接导入一个函数或者变量:

```
from sound.effects.echo import echofilter
```

同样的，这种方法会导入子模块: echo，并且可以直接使用他的 echofilter() 函数:

```
echofilter(input, output, delay=0.7, atten=4)
```

注意当使用 from package import item 这种形式的时候，对应的 item 既可以是包里面的子模块（子包），或者包里面定义的其他名称，比如函数，类或者变量。

import 语法会首先把 item 当作一个包定义的名称，如果没找到，再试图按照一个模块去导入。如果还没找到，抛出一个 :exc:ImportError 异常。

反之，如果使用形如 import item.subitem.subsubitem 这种导入形式，除了最后一项，都必须是包，而最后一项则可以是模块或者是包，但是不可以是类，函数或者变量的名字。



### 从一个包中导入*

如果我们使用 from sound.effects import \* 会发生什么呢？

Python 会进入文件系统，找到这个包里面所有的子模块，然后一个一个的把它们都导入进来。

但这个方法在 Windows 平台上工作的就不是非常好，因为 Windows 是一个不区分大小写的系统。

在 Windows 平台上，我们无法确定一个叫做 ECHO.py 的文件导入为模块是 echo 还是 Echo，或者是 ECHO。

为了解决这个问题，我们只需要提供一个精确包的索引。

导入语句遵循如下规则：如果包定义文件 __init__.py 存在一个叫做 __all__ 的列表变量，那么在使用 from package import \* 的时候就把这个列表中的所有名字作为包内容导入。



作为包的作者，可别忘了在更新包之后保证 __all__ 也更新了啊。

以下实例在 file:sounds/effects/__init__.py 中包含如下代码:

```
__all__ = ["echo", "surround", "reverse"]
```

这表示当你使用from sound.effects import *这种用法时，你只会导入包里面这三个子模块。



如果 __all__ 真的没有定义，那么使用from sound.effects import \*这种语法的时候，就不会导入包 sound.effects 里的任何子模块。他只是把包sound.effects和它里面定义的所有内容导入进来（可能运行__init__.py里定义的初始化代码）。



这会把 __init__.py 里面定义的所有名字导入进来。并且他不会破坏掉我们在这句话之前导入的所有明确指定的模块。看下这部分代码:

```
import sound.effects.echo
import sound.effects.surround
from sound.effects import *
```

这个例子中，在执行 from...import 前，包 sound.effects 中的 echo 和 surround 模块都被导入到当前的命名空间中了。（当然如果定义了 __all__ 就更没问题了）



通常我们并不主张使用 * 这种方法来导入模块，因为这种方法经常会导致代码的可读性降低。不过这样倒的确是可以省去不少敲键的功夫，而且一些模块都设计成了只能通过特定的方法导入。



记住，使用 from Package import specific_submodule 这种方法永远不会有错。事实上，这也是推荐的方法。除非是你要导入的子模块有可能和其他包的子模块重名。



如果在结构中包是一个子包（比如这个例子中对于包sound来说），而你又想导入兄弟包（同级别的包）你就得使用导入绝对的路径来导入。比如，如果模块sound.filters.vocoder 要使用包 sound.effects 中的模块 echo，你就要写成 from sound.effects import echo。

```
from . import echo
from .. import formats
from ..filters import equalizer
```

无论是隐式的还是显式的相对导入都是从当前模块开始的。主模块的名字永远是"__main__"，一个Python应用程序的主模块，应当总是使用绝对路径引用。

包还提供一个额外的属性__path__。这是一个目录列表，里面每一个包含的目录都有为这个包服务的__init__.py，你得在其他__init__.py被执行前定义哦。可以修改这个变量，用来影响包含在包里面的模块和子包。

这个功能并不常用，一般用来扩展包里面的模块。

### 错误和异常

作为 Python 初学者，在刚学习 Python 编程时，经常会看到一些报错信息，在前面我们没有提及，这章节我们会专门介绍。

Python 有两种错误很容易辨认：语法错误和异常。

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

### 语法错误

Python 的语法错误或者称之为解析错，是初学者经常碰到的

```python
while True print('Hello world')
 File "<stdin>", line 1, in ?
  while True print('Hello world')
          ^
SyntaxError: invalid syntax
```

这个例子中，函数 print() 被检查到有错误，是它前面缺少了一个冒号 **:** 。

语法分析器指出了出错的一行，并且在最先找到的错误的位置标记了一个小小的箭头。



### 异常

即便 Python 程序的语法是正确的，在运行它的时候，也有可能发生错误。运行期检测到的错误被称为异常。

大多数的异常都不会被程序处理，都以错误信息的形式展现在这里:

```python
\>>> 10 * (1/0)       # 0 不能作为除数，触发异常
Traceback (most recent call last):
 File "<stdin>", line 1, **in** ?
ZeroDivisionError: division by zero
\>>> 4 + spam*3       # spam 未定义，触发异常
Traceback (most recent call last):
 File "<stdin>", line 1, **in** ?
NameError: name 'spam' **is** **not** defined
\>>> '2' + 2        # int 不能与 str 相加，触发异常
Traceback (most recent call last):
 File "<stdin>", line 1, **in** <module>
TypeError: can only concatenate str (**not** "int") to str
```

异常以不同的类型出现，这些类型都作为信息的一部分打印出来: 例子中的类型有 ZeroDivisionError，NameError 和 TypeError。

错误信息的前面部分显示了异常发生的上下文，并以调用栈的形式显示具体信息。



### 异常处理

### try/except

异常捕捉可以使用 **try/except** 语句。



以下例子中，让用户输入一个合法的整数，但是允许用户中断这个程序（使用 Control-C 或者操作系统提供的方法）。用户中断的信息会引发一个 KeyboardInterrupt 异常。

```python
while True:
    try:
        x = int(input("请输入一个数字: "))
        break
    except ValueError:
        print("您输入的不是数字，请再次尝试输入！")
```

try 语句按照如下方式工作；

- 首先，执行 try 子句（在关键字 try 和关键字 except 之间的语句）。
- 如果没有异常发生，忽略 except 子句，try 子句执行后结束。
- 如果在执行 try 子句的过程中发生了异常，那么 try 子句余下的部分将被忽略。如果异常的类型和 except 之后的名称相符，那么对应的 except 子句将被执行。
- 如果一个异常没有与任何的 except 匹配，那么这个异常将会传递给上层的 try 中。



一个 try 语句可能包含多个except子句，分别来处理不同的特定的异常。最多只有一个分支会被执行。

处理程序将只针对对应的 try 子句中的异常进行处理，而不是其他的 try 的处理程序中的异常。

一个except子句可以同时处理多个异常，这些异常将被放在一个括号里成为一个元组，例如:

```python
except(RuntimeError, TypeError, NameError):
    pass
```



最后一个except子句可以忽略异常的名称，它将被当作通配符使用。你可以使用这种方法打印一个错误信息，然后再次把异常抛出。

```python
**import** sys

**try**:
  f = open('myfile.txt')
  s = f.readline()
  i = int(s.strip())
**except** OSError **as** err:
  **print**("OS error: {0}".format(err))
**except** ValueError:
  **print**("Could not convert data to an integer.")
**except**:
  **print**("Unexpected error:", sys.exc_info()[0])
  **raise**
```



### try/except...else

**try/except** 语句还有一个可选的 **else** 子句，如果使用这个子句，那么必须放在所有的 except 子句之后。

else 子句将在 try 子句没有发生任何异常的时候执行。



以下实例在 try 语句中判断文件是否可以打开，如果打开文件时正常的没有发生异常则执行 else 部分的语句，读取文件内容：

```python
**for** arg **in** sys.argv[1:]:
  **try**:
    f = open(arg, 'r')
  **except** IOError:
    **print**('cannot open', arg)
  **else**:
    **print**(arg, 'has', len(f.readlines()), 'lines')
    f.close()
```



使用 else 子句比把所有的语句都放在 try 子句里面要好，这样可以避免一些意想不到，而 except 又无法捕获的异常。

异常处理并不仅仅处理那些直接发生在 try 子句中的异常，而且还能处理子句中调用的函数（甚至间接调用的函数）里抛出的异常。

```python
\>>> **def** this_fails():
    x = 1/0

\>>> **try**:
    this_fails()
  **except** ZeroDivisionError **as** err:
    **print**('Handling run-time error:', err)

Handling run-time error: int division **or** modulo by zero
```



### try-finally 语句

try-finally 语句无论是否发生异常都将执行最后的代码。



以下实例中 finally 语句无论异常是否发生都会执行：

```python
**try**:
  runoob()
**except** AssertionError **as** error:
  **print**(error)
**else**:
  **try**:
    **with** open('file.log') **as** file:
      read_data = file.read()
  **except** FileNotFoundError **as** fnf_error:
    **print**(fnf_error)
**finally**:
  **print**('这句话，无论异常是否发生都会执行。')
```



### 抛出异常

Python 使用 raise 语句抛出一个指定的异常。

raise语法格式如下：

```
raise [Exception [, args [, traceback]]]
```



以下实例如果 x 大于 5 就触发异常:

```python
x = 10
**if** x > 5:
  **raise** Exception('x 不能大于 5。x 的值为: {}'.format(x))
```

执行以上代码会触发异常：

```
Traceback (most recent call last):
  File "test.py", line 3, in <module>
    raise Exception('x 不能大于 5。x 的值为: {}'.format(x))
Exception: x 不能大于 5。x 的值为: 10
```

raise 唯一的一个参数指定了要被抛出的异常。它必须是一个异常的实例或者是异常的类（也就是 Exception 的子类）。

如果你只想知道这是否抛出了一个异常，并不想去处理它，那么一个简单的 raise 语句就可以再次把它抛出。

```python
\>>> **try**:
    **raise** NameError('HiThere') # 模拟一个异常。
  **except** NameError:
    **print**('An exception flew by!')
    **raise**
  
An exception flew by!
Traceback (most recent call last):
 File "<stdin>", line 2, **in** ?
NameError: HiThere
```



### 用户自定义异常

你可以通过创建一个新的异常类来拥有自己的异常。异常类继承自 Exception 类，可以直接继承，或者间接继承

```python
\>>> **class** MyError(Exception):
    **def** __init__(self, value):
      self.value = value
    **def** __str__(self):
      **return** repr(self.value)

\>>> **try**:
    **raise** MyError(2*2)
  **except** MyError **as** e:
    **print**('My exception occurred, value:', e.value)

My exception occurred, value: 4
\>>> **raise** MyError('oops!')
Traceback (most recent call last):
 File "<stdin>", line 1, **in** ?
__main__.MyError: 'oops!'
```



在这个例子中，类 Exception 默认的 __init__() 被覆盖。

当创建一个模块有可能抛出多种不同的异常时，一种通常的做法是为这个包建立一个基础异常类，然后基于这个基础类为不同的错误情况创建不同的子类:

```python
**class** Error(Exception):
    """Base class for exceptions in this module."""
    **pass**

**class** InputError(Error):
    """Exception raised for errors in the input.

  Attributes:
    expression -- input expression in which the error occurred
    message -- explanation of the error
  """

    **def** __init__(self, expression, message):
        self.expression = expression
        self.message = message

        **class** TransitionError(Error):
            """Raised when an operation attempts a state transition that's not
  allowed.

  Attributes:
    previous -- state at beginning of transition
    next -- attempted new state
    message -- explanation of why the specific transition is not allowed
  """

            **def** __init__(self, previous, next, message):
                self.previous = previous
                self.next = next
                self.message = message
```

大多数的异常的名字都以"Error"结尾，就跟标准的异常命名一样。

### 定义清理行为

try 语句还有另外一个可选的子句，它定义了无论在任何情况下都会执行的清理行为。

```python
\>>> **try**:
...   **raise** KeyboardInterrupt
... **finally**:
...   **print**('Goodbye, world!')
...
Goodbye, world!
Traceback (most recent call last):
 File "<stdin>", line 2, **in** <module>
KeyboardInterrupt
```

以上例子不管 try 子句里面有没有发生异常，finally 子句都会执行。

如果一个异常在 try 子句里（或者在 except 和 else 子句里）被抛出，而又没有任何的 except 把它截住，那么这个异常会在 finally 子句执行后被抛出。

下面是一个更加复杂的例子（在同一个 try 语句里包含 except 和 finally 子句）:

```python
\>>> **def** divide(x, y):
    **try**:
      result = x / y
    **except** ZeroDivisionError:
      **print**("division by zero!")
    **else**:
      **print**("result is", result)
    **finally**:
      **print**("executing finally clause")
  
\>>> divide(2, 1)
result **is** 2.0
executing **finally** clause
\>>> divide(2, 0)
division by zero!
executing **finally** clause
\>>> divide("2", "1")
executing **finally** clause
Traceback (most recent call last):
 File "<stdin>", line 1, **in** ?
 File "<stdin>", line 3, **in** divide
TypeError: unsupported operand type(s) **for** /: 'str' **and** 'str'
```



### 预定义的清理行为

一些对象定义了标准的清理行为，无论系统是否成功的使用了它，一旦不需要它了，那么这个标准的清理行为就会执行。

下面这个例子展示了尝试打开一个文件，然后把内容打印到屏幕上:

```python
**for** line **in** open("myfile.txt"):
  **print**(line, end="")
```

以上这段代码的问题是，当执行完毕后，文件会保持打开状态，并没有被关闭。

关键词 with 语句就可以保证诸如文件之类的对象在使用完之后一定会正确的执行他的清理方法:



### Python with 关键字

Python 中的 **with** 语句用于异常处理，封装了 **try…except…finally** 编码范式，提高了易用性。

**with** 语句使代码更清晰、更具可读性， 它简化了文件流等公共资源的管理。

在处理文件对象时使用 with 关键字是一种很好的做法。

我们可以看下以下几种代码实例：

不使用 **with**，也不使用 **try…except…finally**

```python
file = open('./test_runoob.txt', 'w')
file.write('hello world !')
file.close()
```

以上代码如果在调用 write 的过程中，出现了异常，则 close 方法将无法被执行，因此资源就会一直被该程序占用而无法被释放。 接下来我们呢可以使用 **try…except…finally** 来改进代码：

```python
file = open('./test_runoob.txt', 'w')
**try**:
  file.write('hello world')
**finally**:
  file.close()
```

以上代码我们对可能发生异常的代码处进行 try 捕获，发生异常时执行 except 代码块，finally 代码块是无论什么情况都会执行，所以文件会被关闭，不会因为执行异常而占用资源。

使用 **with** 关键字：



```python
**with** open('./test_runoob.txt', 'w') **as** file:
  file.write('hello world !')
```



使用 **with** 关键字系统会自动调用 f.close() 方法， with 的作用等效于 try/finally 语句是一样的。

我们可以在执行 with 关键字后检验文件是否关闭：



```python
\>>> **with** open('./test_runoob.txt') **as** f:
...   read_data = f.read()

\>>> # 查看文件是否关闭
\>>> f.closed
True
```



with 语句实现原理建立在上下文管理器之上。

上下文管理器是一个实现 **__enter__** 和 **__exit__** 方法的类。

使用 with 语句确保在嵌套块的末尾调用 __exit__ 方法。

这个概念类似于 try...finally 块的使用。

```python
**with** open('./test_runoob.txt', 'w') **as** my_file:
  my_file.write('hello world!')
```



以上实例将 **hello world!** 写到 ./test_runoob.txt 文件上。

在文件对象中定义了 __enter__ 和 __exit__ 方法，即文件对象也实现了上下文管理器，首先调用 __enter__ 方法，然后执行 with 语句中的代码，最后调用 __exit__ 方法。 即使出现错误，也会调用 __exit__ 方法，也就是会关闭文件流。



### Python3 assert（断言）

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

断言可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况，例如我们的代码只能在 Linux 系统下运行，可以先判断当前系统是否符合条件。

语法格式如下：

```
assert expression
```

等价于：

```
if not expression:
    raise AssertionError
```

assert 后面也可以紧跟参数:

```
assert expression [, arguments]
```

等价于：

```
if not expression:
    raise AssertionError(arguments)
```

以下为 assert 使用实例：

```python
\>>> **assert** True   # 条件为 true 正常执行
\>>> **assert** False   # 条件为 false 触发异常
Traceback (most recent call last):
 File "<stdin>", line 1, **in** <module>
AssertionError
\>>> **assert** 1==1   # 条件为 true 正常执行
\>>> **assert** 1==2   # 条件为 false 触发异常
Traceback (most recent call last):
 File "<stdin>", line 1, **in** <module>
AssertionError

\>>> **assert** 1==2, '1 不等于 2'
Traceback (most recent call last):
 File "<stdin>", line 1, **in** <module>
AssertionError: 1 不等于 2
\>>>
```

以下实例判断当前系统是否为 Linux，如果不满足条件则直接触发异常，不必执行接下来的代码：

## 参考三三

- [Python3 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/python3/python3-tutorial.html)
- [Python教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1016959663602400)