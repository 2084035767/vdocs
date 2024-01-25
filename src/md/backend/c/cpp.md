

## 变量和基本类型

## 一、变量

- 无符号和有符号加减会把有符号转化为无符号
- 对于有无符号只是解释方式不同，运算法则还是补码
  区别在于把最高位是否视为符号位（示例）：有符号
  $$(10001)_2=-15$$无符号
  $$(10001)_2=17$$
- 



## 二、字面值常量

### 1.进制

- 0开头八进制，所以类似于08这种会报错
- 0x | 0X开头16进制

### 2.字面值类型

- 算术类型，指针和引用——是
- 自定义类型，IO库，string——否



## 三、声明和定义

### 1.声明

extern int i;

### 2.定义

int i;

### 3.具体用法

[两个类相互调用](https://blog.csdn.net/wuchuanpingstone/article/details/52384933)



## 四、引用和指针

### 1.引用

引用并非对象,定义引用就无法绑定到另外的对象,使用就是访问最初绑定的对象

### 2.指针

指针可以改变



## 五、const

### 1.const引用类型的转化

初始化常量引用允许任意表达式作为初始值,只要该表达式结果能转换成引用类型即可

```cpp
//原理
double val = 3.14;
const int& ri = val;
		|
		V
const int temp = 3.14;
const int& ri = temp;
```

### 2.const指针

- const int *p——指向常量的指针，底层——作用指向的对象
- int* const p——常量指针，顶层——作用对象本身



## 六、处理类型

typedef，using



## 七、decltype

### 1.注意点

```cpp
int i=42,&r=i,*p=&i;
decltype(r)=int&
decltype(r+0)=int
decltype(*p)=int&----解引用指针可以得到指针所指的对象的引用
decltype((i))=int&
```

当我们使用decltype作用于某个函数时，它返回函数类型而非指针类型，因此我们需要显示的加上*已表明我们需要返回指针

### 2.与auto的区别，以及和typeid的区别

如果使用引用类型，auto会识别为其所指对象的类型，decltype则会识别为引用的类型。

```cpp
//有兴趣可以用编译器看一下类型
int x=10;
int &r=x;
auto b=r;
decltype(r) c=x;
```

typeid主要用于运行时类型识别，auto和decltype则是在编译时识别的，作用时期不同。



## 八、预处理器

字符串,向量和数组



## 一、string，vector，迭代器

### 1.string

- getline会忽略回车符
- size_type和有符号数混用会造成歧义，因为size_type是无符号的
- +两侧运算对象至少一个为string

### 2.vector

- ()构造，{}初始化列表
- 使用花括号但是提供的值不能用来列表初始化,就要考虑用这样的值构造vector对象

### 3.迭代器

迭代器不允许相加



## 二、数组与指针

**原则：从内到外,从右到左**

```cpp
int *a[10];  //a数组含有10个指针整型
int &a[10];  //错误，不存在引用的数组
int (*a)[10]; //a是一个指针，指向一个含有10个整数的数组
int (&a)[10]; //a是一个引用，引用一个含有10个整数的数组
int *(&a)[10]; // a是数组的引用，数组含有十个指针
```

1. 内置下标运算符所用的索引值是有符号类型
2. 要使用范围for语句处理多维数组,除了最内层的循环外,其他所有循环的控制变量都应该是引用类型



## 表达式和语句



## 一、表达式

1. 左右值，左值表达的是对象本身，右值则是对象的值，举个最简单的例子，int x=5;x就是左值，而常量5就是右值
2. 逗号运算符——返回的结果是右侧表达式的值

```cpp
int y = 3;
int x = (y + 4, 5 + 6, 4 + 5);
cout << x << endl;//x=9
```



## 二、语句

1. 范围for循环，因为预存了end()的值,所以不能通过范围for增加容器对象的元素，顺便复习一下，使用范围for循环，除了最内层，其余的范围for循环都需要使用引用类型

```cpp
//范围for循环
vector<int> vec{1, 2, 3, 4, 5};
for (int it:vec)
   	cout << it << endl;
```

1. 循环中需要注意的细节
   do while，do中定义的变量，while不可以使用，因为作用域的限制，do和while是不同的作用域；while和for定义的变量可以被块使用



## 函数

## 一、函数基础

### 1.局部静态变量

程序终止才被销毁,在此期间即使对象所在函数结束执行也不会对他有影响

```cpp
#include <iostream>	

using namespace std;

void fun()
{
    static int x = 0;
    x++;
    cout << x << endl;
}

int main()
{
    fun();//1
    fun();//2
    fun();//3
}
```

### 2.参数和返回类型

形参处理不同数量的实参

1. initializer_list，也是一个容器，在vector中讲过{ }初始化，实现原理就是内置的initializer_list，基本用法如下

```cpp
void fun(initializer_list<int> vec)
{
    for (int it:vec)
        cout << it << endl;
}

int main()
{
    fun({1, 2, 3, 4, 5});
}
```

1. 省略符形参...
   作用：可以暂停编译器对类型的检查
   缺点：不太安全

[代码来源](https://blog.csdn.net/alex1997222/article/details/78639991?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.add_param_isCf&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.add_param_isCf)

```cpp
int sum(int count, ...)
{  //格式:count代表参数个数, ...代表n个参数

    va_list ap;  //声明一个va_list变量
    va_start(ap, count);  //第二个参数表示形参的个数

    int sum = 0;
    for (int i = 0; i < count; i++)
    {
        sum += va_arg(ap, int);   //第二个参数表示形参类型
    }

    va_end(ap);  //用于清理

    return sum;
}
```

### 3.constexpr函数

- 定义：函数的返回类型及所有形参类型都是**字面值类型**（算术类型，引用，指针）,而且函数体中必须有且仅有一条return语句
- 作用：constexpr的声明就等于告诉编译器这是**在编译期就可以确定的值**，你可以大胆的去优化（constexpr水挺深的，建议有兴趣可以研究，这里不过多赘述）

```cpp
constexpr int fun(string &str)
{
    str = "";//正确
    str == "";//错误
    return 0;
}
```

原因就在于str的值是在运行期间确定的，而==需要知道str的值，但=不需要，可以在编译期完成，所以=是正确的，==是错误的

- 与const的区别：const并不能代表“常量”，它仅仅是对变量的一个修饰，告诉编译器这个变量只能被初始化，且不能被直接修改，同时const不一定在编译期确定，也可以在运行期确定；constexpr则是相当于告诉编译器自己可以在编译期得出常量值（但有时会被欺骗，详见[来源](https://www.jianshu.com/p/34a2a79ea947)）

```cpp
//const运行时确定值
int main()
{
    int x;
    cin >> x;
    const int y = x;
}
```



## 二、函数重载

### 1.定义

- 函数名相同，形参数量或形参类型不同（两个函数,它们的形参列表一样但是返回类型不同,则第二个函数声明错误）

```cpp
int fun(int x)
{ 
    return 1; 
}

bool fun(int x)//错误
{
    return false;
}
```

- 不同作用域中无法重载函数名，class A和class B中的同名fun函数不算重载

### 2.const形参

- 拥有顶层const形参无法和另一个没有顶层const的形参区分开来,所以两个都出现算是重复声明，底层const不算（原理：对于重载,编译器需要根据传入的参数判断调用哪一个重载,所以需要针对实参有所区别,而非形参）

```cpp
int fun(int *const x)
{
    return 1;
}

int fun(int *x)//顶层const无法通过实参匹配
{
    return 2;
}
```

### 3.匹配

- 精准匹配
- const类型转换：判别方式是判断实参是否是常量来决定选择哪个函数。指针类型的形参判别也是类似的（底层const）
- 类型提升：不是完全相同的类型，都会提升类型，char会提升为int
- 算术类型转换：该转换的级别都相同，即3.14是double，转换成long或者float都是同样等级，会产生二义性（**算术类型转换的级别都一样**，但好像char到int的级别比char到short的级别高，是我理解有问题还是C++ Primer讲错了？？？希望大佬帮忙解答一下）

```cpp
int fun(long x)
{
    return 1;
}

int fun(float x)
{
    return 2;
}

int main()
{
    double x = 3.14;
    cout << fun(x) << endl;//二义性
}
```

- 类类型转换，涉及多态



## 类



## 一、认识类

### 1.细节

- 定义在类内部的函数是隐式的inline函数
- 参数列表后的const：修改隐式this指针的类型,将其定义为const T* const this。常量对象,以及常量对象的引用或指针都只能调用常量成员函数

### 2.静态成员

- **静态成员属于类，而非对象**
- 不与任何对象绑定,不包含this指针,所以不能在static函数体内使用this指针
- 静态成员函数不能声明成const，因为const是针对对象的，但静态成员属于类

### 3.抑制构造函数定义的隐式转化

**explicit——构造函数需要显示声明**

- explicit,初始化时该关键词无影响
- explicit只对**一个实参**的构造函数有效,需要**多个实参**的构造函数不能用于执行隐式转化

```cpp
class A
{
public:
    A(int x, int y = 0)//把=0去掉，就会报错，因为多个实参的构造函数不能用于执行隐式转化
    {

    }
};

int main()
{
    A tmp = 1;
}
```

- explicit只允许出现在类内的构造函数声明或类型转换函数处
- 用于显示声明构造函数,同时也抑制拷贝构造函数（因为拷贝构造函数在返回时会构造中间对象，这里会用到隐式的构造函数）



## 二、类的特性

### 1.可变数据成员

- mutable类型的数据可在const函数内部修改它的值

```cpp
class A
{
private:
    mutable int x, y;
public:
    void fun() const
    {
        x = 3;//正确
        y = 4;//正确
    }
};
```

### 2.类定义处理

- 首先编译成员的声明，直到类全部可见是再编译函数体（所以函数定义可以写在外面）

### 3.类封装的优点

- 封装实现了类的接口和实现的分离，隐藏了类的实现细节，用户只能接触到类的接口（后续还会设计模式的总结，面向对象真的很强大！！！）



## 三、友元

### 1.特点

1. 只能出现在类定义内部,但类内出现的具体位置不限
2. **友元不是类的成员,不受区域访问控制级别的约束**
3. 在友元之外再专门对函数进行一次声明



## 总结

以上便是C基础总结的上篇，只是看完《C Primer》以后的一点小总结，内容很简陋，主要是我自己在看书过程中遇到有疑问的一些点，然后经过查阅资料以后有所收获的，在这里和大家分享一下。如果这些知识点有任何问题，欢迎大家在评论区指出，我会虚心接受......

@[TOC](https://www.chendan116.com/archives/文章目录)





## I/O库



## 一、IO类

- IO对象无拷贝或赋值,甚至不能显式构造初始化



## 二、输出缓存

### 1.矛盾

CPU和IO设备的速度之间的矛盾，就决定我们不能把每一次IO操作都单独执行，所以系统会把多个IO操作组合成一个系统级操作，从而带来性能上的优化，而这些单个操作的数据就被放在缓冲区（缓冲区分为输入缓冲区和输出缓冲区）中，等CPU需要时再从缓冲区中获取。
带来的好处：

1. 合并多次IO操作为一个系统级操作，有利于性能提升
2. IO设备与缓冲区交互时，CPU可以运行其他进程

### 2.缓冲刷新的原因（写入到文件或设备）

1. 程序结束,return,缓冲刷新被执行（所以程序结束，cout的数据会出现在显示器上）
2. 缓冲区满
3. endl,flush,ends显示刷新
4. unitbuf设置流的内部状态,清空缓冲区,cerr默认设置unitbuf

```cpp
cout << unitbuf << "hello world!" << endl;
```

1. 关联输入输出流(x.tie(&o))——任何试图从输入流读取数据的操作都会先刷新关联的输出流

```cpp
cin.tie(&cout);
```



## 顺序容器



## 一、迭代器

- 迭代器是一个公共接口，用于访问和遍历对应的容器
- forward_list迭代器不支持递减运算符(--)，因为它是单向链表



## 二、细节

1. forward_list有自己的insert和emplace，而没有push_back和emplace_back，原因是forward_list是单向链表，只记录头节点，插入到表尾时间复杂度O(n)，而list是双向链表，记录表尾，插入到表尾仅需O(1)
2. forward_list和list的迭代器不能相减，因为它们的内存分配不是连续的

```cpp
forward_list<int> vec{1, 2, 3};
cout << distance(vec.begin(), vec.end()) << endl;
```

1. vector和string不支持push_front和emplace_front，同理插入O(n)
2. emplace_back和push_back的区别：
   emplace_back会在容器管理的内存空间直接创建对象,而调用push_back则会通过构造函数创建一个局部临时变量,并调用拷贝构造函数将拷贝的对象压入容器，再释放临时变量
   [代码来源](https://blog.csdn.net/wangshubo1989/article/details/50357549?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.add_param_isCf&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.add_param_isCf)

```cpp
#include <iostream>
#include <vector>
#include<string>

using namespace std;

class CText
{
private:
    string str;
public:
    CText(string s) : str(s)
    {
    }

    void show() const
    {
        cout << str << endl;
    }

};

int main()
{
    vector<CText> vi;
    vi.emplace_back("hey");
    vi.front().show();
    vi.push_back("girl");//错误
    vi.back().show();
    return 0;
}
```

1. 容器操作可能使迭代器失效（这张图片里关于deque插入删除规律还是不太明白原理，估计得去了解一下deque的内存模型，才能知道答案，这里先留个坑，待填！）
   



## 三、容器适配器

### 1.默认

- stack和queue基于deque实现
- priority_queue基于vector实现

### 2.例子

```cpp
stack<string,vector<string>>str_stack//在vector上实现的空栈
```

### 3.扩展

- array,forward_list不能用来构造适配器。因为所有适配器具有添加,删除以及访问尾元素，array是不可变数组，不能添加和删除，而forward_list不能O(1)访问尾元素
- 表格（priority_queue具有随机访问能力，不过被隐藏了）

| 适配器类型     | 需要支持的操作                        | 满足的容器                     |
| -- | - |  |
| stack          | push_back,pop_back,back               | 除了上面两个(下面不再阐述)     |
| queue          | back,push_back,front,push_front       | list和deque都可以,但vector不行 |
| priority_queue | front,push_back,pop_back,随机访问能力 | vector,deque,不能基于list      |



## 泛式算法



## 一、标准库算法

- **对迭代器而不是容器操作,因此算法不能直接添加或删除元素,例如unique不能删除重复元素,而是将重复元素移到后面**
- 只读算法——accumulate：接受3个参数,前两个是需要求和的元素范围,第三个参数是和的初值,同时第三个参数类型决定了函数使用哪个加法运算符和返回值的类型
- 写算法——向目的位置迭代器写入数据的算法假定目的位置足够大,能容纳要写入的元素(位置足够大代表序列大小,并非可用内存大小,即reserve无效,resize才可以)



## 二、lambda

- 格式:[capture list](parameter list)->**return type**
- 尾置返回（[参考](https://www.jianshu.com/p/2d44dae53910)）
- 如果lambda函数体包含任何单一return语句之外的内容,且未指定返回类型,则返回void
- 捕获列表：捕获列表只用于局部非static变量,lambda可以直接使用局部static变量和它所在函数之外声明的名字
- 可变lambda：
  值捕获——lambda不会改变捕获的拷贝变量,加上mutable即可修改
  引用捕获——取决于此引用指向的是一个const类型还是非const类型，const类型不可修改

```cpp
int main()
{
    int x = 10;
    auto it = [&x]()//引用捕获，去掉&就是值捕获，但会报错，因为值捕获不能修改捕获的拷贝变量
    {
        x = 9;
    };
    it();
    cout << x << endl;
    return 0;
}
```



## 三、参数绑定

谓词(一元——find_if;二元——sort)

```cpp
bool check_size(const string &str, size_t sz)
{
    return str.size() >= sz;
}

int main()
{
    string str = "hello world";
    auto it = bind(check_size, placeholders::_1, 6);
    cout << it(str) << endl;
    return 0;
}
```

find_if传入的函数对象是一元，即对应函数实参只有一个，但有时需要两个，这里可以采用bind绑定部分参数，从而使真正find_if传入的只有一个实参（这时有人可能想到给形参设置默认值，但运行会报错，还是得用bind绑定）
placeholders::_1顾名思义就是待放置的孔，就是真正需要传入的实参

```cpp
vector<string> vec{"hello", "world", "C++ Primer"};
auto val = find_if(vec.begin(), vec.end(), bind(check_size, placeholders::_1, 6));
cout << *val << endl;
```

一个小问题：bind对绑定参数的处理是拷贝，但IO类无法拷贝，只能引用，需要进行的操作就是把绑定参数设置成引用的，可以使用ref()函数

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <functional>

using namespace std;

ostream &print(ostream &os, const string &str, char ch)
{
    os << str << ch;
    return os;
}

int main()
{
    vector<string> vec{"hello", "world", "C++ Primer"};
    for_each(vec.begin(), vec.end(), bind(print, ref(cout), placeholders::_1, '\n'));
    return 0;
}
```



## 四、杂例

### 1.再探迭代器

- back_inserter，创建一个使用push_back的迭代器
- front_inserter，创建一个使用push_front的迭代器
- inserter，创建一个使用insert的迭代器

```cpp
//it是调用inserter(c,iter)得到的一个迭代器
*it=val;
   |
   V
it=c.insert(it,val);//指向新添加的元素
++it;//指向原来的元素
```

### 2.list特定的容器算法

其他容器算法不会改变容器大小,但list和forward_list会改变容器大小,例如list的unique就会直接删除重复的，因为链表的内存空间不是连续的，所以可以直接删除而不破坏迭代器



## 关联容器



## 一、类型别名

- key_type——关键词类型
- mapped_type——关键词关联类型,只适用于map
- value_type——对于set,与key_value相同；对于map,为pair<const key_type,mapped_type>



## 动态内存



## 一、智能指针

### 1.shared_ptr

- 构造函数——explicit，接受指针参数,需要直接初始化

```cpp
正确例子:shared_ptr<int>p(new int(1024));//显示构造
错误例子:shared_ptr<int>p=new int(1024);//隐式构造
```

- 陷阱
  1.不使用相同的内置指针值初始化多个智能指针

```cpp
int main()
{
	/*
	这是一段错误代码，使用了相同的内置指针初始化智能指针
	这两个智能指针的引用计数都为1，也就是说第一个智能指针
	脱离作用域后，引用-1，对应那块内存被销毁，第二个智能
	指针同理，即同一块内存被析构了两次
	*/
    int y = 10;
    int *x = &y;
    shared_ptr<int> ptr(x);
    shared_ptr<int> ptr_1(x);
    cout << ptr.use_count() << endl;//1
    cout << ptr_1.use_count() << endl;//1
    return 0;
}
```

2.不delete get()返回的指针。delete get()的，智能指针又会再释放一次
3.不使用get()初始化或reset另一个智能指针。同1，get返回的也是内置指针
4.当你使用的智能指针管理的资源不是new分配的内存，记住传递一个删除器

### 2.unique_ptr

1. "拥有"所指对象
2. 直接初始化(不接受非new返回类型的指针,如*pi=&x等),不支持普通的拷贝或赋值操作

```cpp
int main()
{
    int *x = new int(10);
    unique_ptr<int> ptr(x);
    unique_ptr<int> cptr(new int(20));
    return 0;
}
```

1. 不支持普通的拷贝或赋值操作，但可以拷贝或赋值一个将要被销毁的unique_ptr，例如函数

```cpp
unique_ptr<int> fun()
{
    return unique_ptr<int>(new int(10));
}
```

### 3.weak_ptr

1. 不控制所指向对象生存期的智能指针,指向由一个shared_ptr管理的对象
2. 绑定到shared_ptr不会改变shared_ptr的引用计数
3. 引用计数为0,即使有weak_ptr指向对象,对象也还是会被释放



## 二、动态数组

### 1.构造与释放

- new可以分配大小为0的数组，返回一个合法非空指针。此指针不能解引用，因为它不指向任何元素
- 数组元素按逆序销毁，首先销毁最后一个元素

### 2.关于智能指针

1. 关于unique_ptr——
   不能使用点和箭头成员运算符，因为指向的是一个数组；
   当一个unique_ptr指向一个数组时，可以使用下标运算符来访问数组中的元素；
   总的来说就是一个数组指针。
2. 关于shared_ptr——
   不直接支持管理动态数组，除非提供自定义的删除器；
   默认情况下使用delete删除，但对象是一个动态数组（非vector），对其使用delete所产生的问题与释放一个动态数组时忘记[]产生的问题一样——行为未定义；
   访问：*(sp.get()+i)=i（需要获取一个内置指针，使用get()）



## 三、allocator类

1. 与new的不同——new将内存分配和对象构造组合在一起。allocator将内存分配和对象构造分离，所以分配的内存是原始的，未构造的
2. allocator和malloc的区别——简单的说C++中，每次malloc后都要强转一下类型，allocator就不用（肯定不止这么简单，如果有兴趣的可以再深入研究.....）



## 总结



这就是《C++ Primer》的第二部分的基础总结了，总结的很简陋，如果想更加深入的了解，还是自己看一下《C++ Primer》比较好.....

@[TOC](https://www.chendan116.com/archives/文章目录)



## 拷贝控制



## 一、拷贝构造函数

### 1.定义

- 一个构造函数的第一个参数是自身类类型的引用，且任何额外参数都有默认值，此构造函数是拷贝构造函数
- 合成拷贝构造函数是缺省的拷贝构造函数(自己未定义，编译器自动生成的)可以逐元素地拷贝一个数组类型的成员

```cpp
//逐元素拷贝，但却是浅拷贝，下面是浅拷贝的例子
#include <iostream>
#include<string>

using namespace std;

class B
{
public:
    int y;

    B(int y) : y(y)
    {

    }
};

class A
{
public:
    B *x[20];

    A()
    {
        x[0] = new B(2);
    }
};

int main()
{
    A a;
    A b = a;

    cout << b.x[0]->y << endl;
    a.x[0]->y = 6;
    cout << b.x[0]->y << endl;

    return 0;
}
```

### 2.触发条件

- 对象作为实参传递给非引用类型的形参（这也是拷贝构造函数形参为&的原因，如果不是引用，则会调用拷贝构造函数，这种行为是为定义的）
- 从返回类型为非引用类型的函数返回一个对象
- {}初始化列表——数组，聚合类（定义如下）
- 所有成员都是public
- 没有定义构造函数
- 没有类内初始值
- 没有基类，也没有虚函数
- 容器调用insert和push，进行拷贝初始化

### 3.注意

- 编译器为了优化，也会绕过拷贝构造函数，但拷贝构造必须存在且可访问



## 二、析构函数

### 1.特点

- 没有返回值，不接受参数，因此不能被重载，只有唯一一个析构函数
- 成员按初始化顺序的逆序销毁
- 内置类型没有析构函数

### 2.触发条件

- 变量离开作用域
- 对象被销毁，成员被销毁
- 容器被销毁，其元素也被销毁
- delete销毁
- 对于临时变量，当创建它的完整表达式结束时被销毁

### 3.注意

析构函数自身并不直接销毁成员，成员是在析构函数体之后隐含的析构阶段中被销毁的



## 三、对象移动

### 1.适用对象

IO类和unique_ptr类可以移动但不能拷贝

### 2.右值引用&&

- 只能绑定到临时对象，不能绑定到一个变量上
- 所引用的对象将要被销毁
- 该对象没有其他用户
- 具体到函数：
  emplcae_back 接收一个右值引用，调用其移动构造函数，将对象移动到容器中，而之前的push_back 是调用一次对象的拷贝构造函数， 容器中存储的是拷贝后的副本
- 右值引用一定不能被左值所初始化，只能用右值初始化：

```cpp
int x = 20;    // 左值
int&& rrx1 = x;   // 非法：右值引用无法被左值初始化
const int&& rrx2 = x;  // 非法：右值引用无法被左值初始化
```

- **const左值引用可以接收右值**

### 3.移动语义（例子可以看[知乎那篇文章](https://zhuanlan.zhihu.com/p/54050093?utm_source=wechatMessage_article_bottom)）

将内存的所有权从一个对象转移到另外一个对象，高效的移动用来替换效率低下的复制
通过内存所有权的接管来免去临时对象的复制操作

- 编译器不会创建默认的移动构造函数和移动赋值运算符，所以4个函数（拷贝构造，赋值构造，移动构造，移动赋值）实现了一个，最好把剩余3个都实现了
- move：左值转化为右值

```cpp
vector<int> v1{1, 2, 3, 4};
vector<int> v2 = v1;             // 此时调用复制构造函数，v2是v1的副本
vector<int> v3 = std::move(v1);  // 此时调用移动构造函数，v3与v1交换：v1为空，v3为{1, 2, 3, 4}
```

典型应用swap

```cpp
//C++11以前，拷贝构造和赋值
template <typename T>
void swap(T& a, T& b)
{
    T tmp{a};  // 调用复制构造函数
    a = b;     // 复制赋值运算符
    b = tmp;     // 复制赋值运算符
}

//C++11，移动构造和移动赋值
template <typename T>
void swap(T& a, T& b)
{
    T temp{std::move(a)};   // 调用移动构造函数
    a = std::move(b);       // 调用移动赋值运算符
    b = std::move(tmp);     // 调用移动赋值运算符
}
```

简化版move，详解见知乎文章

```cpp
template <typename T>
typename remove_reference<T>::type&& move(T&& param)
{
    using ReturnType = typename remove_reference<T>::type&&;

    return static_cast<ReturnType>(param);
}
```

- 注意：出现3个&符号的解释，我们知道C++不允许引用的引用，那么其实编译器这里进行是引用折叠（reference collapsing，大致就是后面的引用消掉）

### 4.完美转发（还不是很懂，留坑！）

定义一个函数模板，该函数模板可以接收任意类型参数，然后将参数转发给其它目标函数，且保证目标函数接受的参数其类型与传递给模板函数的类型相同



## 四、杂例

### 1.三五法则

- 需要析构函数的类也需要拷贝和赋值操作
- 需要拷贝操作的类也需要赋值操作，反之亦然

### 2.阻止拷贝（采用默认合成的拷贝）

- =delete
- 析构函数不能是删除的成员



## 运算符重载



## 一、基本概念

- , & || &&不应该被重载
  :: .* . ?:不能被重载
- 对于运算符函数来说，它或者是类的成员，或者至少含有一个类类型的参数
- 成员函数还是非成员函数
- = [] () ->必须是成员
- 复合运算符（+=）一般也是成员，并非必须
- 改变状态的运算符或者与给定类型密切相关的运算符，如++ -- &，通常是成员
- 具有对称性的运算符通常是普通的非成员函数



## 二、递增和递减运算符

- 区分前置后置运算符:后置版本接受一个额外的int类型形参（后来者排队,所以总共有两个参数，前置只有一个）
- 后置运算符应该返回对象原值返回的形式是一个值而非引用，与内置版本保持一致



## 三、函数调用运算符

- lambda是函数对象：编译器将lambda表达式翻译成一个未命名类的未命名对象，在lambda表达式产生的类中含有一个重载的函数调用运算符()，lambda产生的类当中的函数调用运算符是一个const成员函数
- 可调用对象与function：定义函数表，使用function存储，function是一个模板，function<int(int,int)>，表示接受两个int，返回一个int的可调用对象
- 可调用对象的具体作用：使不同类型具有相同的调用形式



## 四、类型转换运算符

- 没有显式返回类型，也没有形参，必须被定义成类的成员函数，且为const成员
- 显式的类型转换将被隐式执行，即表达式被用作条件，则编译器会将显式的类型转换自动应用于它
- if，while，do及语句的条件部分
- for语句头的条件表达式
- ！ || && 的运算对象
- ？ ： 的条件表达式



## 面向程序设计



## 一、虚函数

### 1.细节

基类中是虚函数，派生类中也是默认为虚函数

### 2.函数表剖析

- [函数表剖析](https://blog.csdn.net/lihao21/article/details/50688337)
- [C++虚函数详解](https://blog.csdn.net/lyztyycode/article/details/81326699?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf)

```cpp
#include <iostream>

using namespace std;

class Base1
{

public:

    virtual void f()
    { cout << "Base1::f" << endl; }

    virtual void g()
    { cout << "Base1::g" << endl; }

    virtual void h()
    { cout << "Base1::h" << endl; }

};

class Base2
{

public:

    virtual void f()
    { cout << "Base2::f" << endl; }

    virtual void g()
    { cout << "Base2::g" << endl; }

    virtual void h()
    { cout << "Base2::h" << endl; }

};

class Base3
{

public:

    virtual void f()
    { cout << "Base3::f" << endl; }

    virtual void g()
    { cout << "Base3::g" << endl; }

    virtual void h()
    { cout << "Base3::h" << endl; }

};

class Derive:
        public Base1, public Base2, public Base3
{

public:

    virtual void f()
    { cout << "Derive::f" << endl; }

    virtual void g1()
    { cout << "Derive::g1" << endl; }

};

typedef void(*Fun)(void);

int main()
{

    Fun pFun = nullptr;
    Derive d;
    long **pVtab = (long **) &d;

    //Base1's vtable

    //pFun = (Fun)*((int*)*(int*)((int*)&d+0)+0);

    pFun = (Fun) pVtab[0][0];

    pFun();

    //pFun = (Fun)*((int*)*(int*)((int*)&d+0)+1);

    pFun = (Fun) pVtab[0][1];

    pFun();

    //pFun = (Fun)*((int*)*(int*)((int*)&d+0)+2);

    pFun = (Fun) pVtab[0][2];

    pFun();

    //Derive's vtable

    //pFun = (Fun)*((int*)*(int*)((int*)&d+0)+3);

    pFun = (Fun) pVtab[0][3];

    pFun();

    //The tail of the vtable

    pFun = (Fun) pVtab[0][4];

    cout << pFun << endl;

    //Base2's vtable

    //pFun = (Fun)*((int*)*(int*)((int*)&d+1)+0);

    pFun = (Fun) pVtab[1][0];

    pFun();

    //pFun = (Fun)*((int*)*(int*)((int*)&d+1)+1);

    pFun = (Fun) pVtab[1][1];

    pFun();

    pFun = (Fun) pVtab[1][2];

    pFun();

    //The tail of the vtable

    pFun = (Fun) pVtab[1][3];

    cout << pFun << endl;

    //Base3's vtable

    //pFun = (Fun)*((int*)*(int*)((int*)&d+1)+0);

    pFun = (Fun) pVtab[2][0];

    pFun();

    //pFun = (Fun)*((int*)*(int*)((int*)&d+1)+1);

    pFun = (Fun) pVtab[2][1];

    pFun();

    pFun = (Fun) pVtab[2][2];

    pFun();

    //The tail of the vtable

    pFun = (Fun) pVtab[2][3];

    cout << pFun << endl;

    return 0;

}
```



## 二、类型转换与继承

- 不存在基类向派生类的隐式类型转换，但有显式的（后续会讲）
- 继承方式决定了在派生类中基类成员的访问权限（公有继承，保护继承，私有继承）



## 三、[虚继承](https://blog.csdn.net/jackystudio/article/details/17877219?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf)

- 类通过虚继承指出它希望共享虚基类的状态
- 主要解决菱形继承的资源浪费问题，D继承了两份相同的A，把A设置成虚基类可以解决这个问题，D中就只会有一份A的成员变量和方法
  



## 模板与泛式编程



（这个有打算专门写一片博客，主要是太菜了，没怎么学明白，后续打算补一下这块的知识......）



## 标准库特殊设施



## 一、tuple

- 任意数量成员，每个成员类型可以不同
- tuple<T1,T2,T3,...,Tn> t (v1,v2,...,vn)



## 特殊工具与技术



## 一、RTTI（运行时类型识别）

- typeid——abi::__cxa_demangle(typeid(a).name(), 0, 0, 0)使typeid获取类的完整声明

```cpp
#include <iostream>
#include <cxxabi.h>

using namespace std;

class AB
{

};

int main()
{

    AB a;
    cout << typeid(a).name() << endl;//2AB，前面的2代表类的字符串长度为2
    cout << abi::__cxa_demangle(typeid(a).name(), 0, 0, 0) << endl;//AB，这一串可以只显示类名
    return 0;

}
```

- dynamic_cast（将基类指针转化成派生类指针）
- 提供了**运行时**确定对象类型的方法（区分于auto和decltype编译时确定对象类型）



## 二、枚举类型和共用体

### 1.枚举类型

enum

### 2.共用体

union变量所占用的内存长度等于最长的成员的内存长度（可用这个性质判断大小端）[转自这位大佬](https://www.jianshu.com/p/85e60ca1ffdc)

```cpp
#include <stdio.h>

typedef union SmallBig
{

    char buf[4];
    long num;

} smallbig;

int main()
{

    smallbig sb;

    sb.num = 0x12345678;

    int i = 0;

    for (i = 0; i < 4; i++)
        printf("sb.buf[%d]=%x \n", i, sb.buf[i]);

    return 0;

}

/*
小端结果
sb.buf[0]=78 
sb.buf[1]=56 
sb.buf[2]=34 
sb.buf[3]=12 
*/
```



## 三、不可移植的特性

### 1.位域

规定变量占几个二进制位；int x:27——x占27位
充分利用内存空间

### 2.extern "C"

[大佬解析](http://www.360doc.com/content/16/0507/07/478627_556937138.shtml)



## 总结



完结撒花！接下来是暑假的一个专题总结，关于23种设计模式的总结，当然了也是像这样的简陋版本，争取在开学之前完成吧！最后附赠一张我C++总结的思维导图，内容和这三篇博客相差无几。