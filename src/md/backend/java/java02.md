# 二、基础知识

## 2.1 铺垫知识

### 注释

注释不会通过编译，是一种解释和说明。

- `//`：单行注释
- `/* */`：多行注释
- `/** */`：Javadoc文档注释

## 2.2 变量、常量和数据类型

### 变量与常量

变量的主要作用，就是用来存储信息，然后在计算机程序中使用这些信息。



**变量的命名规则**

- 标识符可以由大小写字母、数字、下划线(_)和美元符号($)组成，但是不能以数字开头。
- 变量不能重复定义，大小写敏感，比如A和a就是两个不同的变量。
- 不能有空格、@、#、+、-、/ 等符号。
- 应该使用有意义的名称，达到见名知意的目的（一般我们采用英文单词），最好以小写字母开头。
- 不可以是 true 和 false。
- 不能与Java语言的关键字或是基本数据类型重名。

```java
public class Main {
    public static void main(String[] args) {
        
        int a = 10;   //直接在定义变量后面添加 = 10，表示这个变量的初始值为10，这里的10就是一个常量数字
        System.out.println(a);   //这里输出的就是10了
    }
}
```



**常量**

用关键字`final`修饰常量就是常量

```java
public static void main(String[] args) {
    final int a = 666;   //在变量前面添加final关键字，表示这是一个常量
    a = 777;    //常量的值不允许发生修改，常量的值只有第一次赋值可以修改
}
```



### 基本数据类型

我们的程序中可能需要表示各种各样的数据，比如整数、小数、字符等等，这一部分我们将探索Java中的八大基本数据类型。只不过在开始之前，我们还需要先补充一点简单的计算机小知识。



**计算机中的二进制表示**

在计算机中，所有的内容都是二进制形式表示。一个位也叫一个bit，8个bit称为1字节，16个bit称为一个字，32个bit称为一个双字，64个bit称为一个四字，我们一般采用字节来描述数据大小。

> 注意：bit跟MB/s是不一样的，小b代表的是bit，大B代表的是Byte字节（8bit = 1Byte字节）



**整数类形**

- `byte`：字节型 （8个bit，也就是1个字节）范围：-128~+127
- `short`：短整形（16个bit，也就是2个字节）范围：-32768~+32767
- `int`：整形（32个bit，也就是4个字节）最常用的类型：-2147483648 ~ +2147483647
- `long`：长整形（64个bit，也就是8个字节）范围：-9223372036854775808 ~ +9223372036854775807



```java
public static void main(String[] args) {
    short a = 10;
    // 其实这几种变量都可以正常表示整数
    System.out.println(a);
}

public static void main(String[] args) {
    short a = 10;
    int b = a;   //小的类型可以直接传递给表示范围更大的类型
    System.out.println(b);
}
```



**隐式类型转换**

> 隐式类型转换规则：byte→short(char)→int→long→float→double

隐式类型转换不仅可以发生在整数之间，也可以是其他基本数据类型之间。

```java
public static void main(String[] args) {
   byte b = 10; //这里的整数常量10，实际上默认情况下是int类型，但是由于正好在对应类型可以表示的范围内，所以说直接转换为了byte类型的值
}
// 整数常量值默认为 int，所以 long 型都会加上 L 标识
public static void main(String[] args) {
    long a = 922337203685477580L; //这样就可以正常编译通过了
}

// 下划线表示法
public static void main(String[] args) {
   int a = 1_000_000; //当然这里依然表示的是1000000，没什么区别，但是辨识度会更高
}

```



**其他进制**

- **十六进制：**以`0x`开头的都是十六进制表示法，十六进制满16进一。
- **八进制：**以0开头的都是八进制表示法，八进制就是满8进一。

```java
public static void main(String[] args) {
    System.out.println(0xA); // 10
    System.out.println(012); // 10
}
```





**浮点类型**

浮点类型的数就是小数，因为小数用科学计数法表示的时候，小数点是可以“浮动”的，所以称为浮点数。

Java中的两种小数类型

- `float`：单精度浮点型 （32bit，4字节）
- `double`：双精度浮点型（64bit，8字节）

```java
public static void main(String[] args) {
    // 小数类型常量默认都是 double 类型
    double a = 10.5, b = 66;   //整数类型常量也可以隐式转换到浮点类型
}

// float 类型,需要加上 F 标识
public static void main(String[] args) {
    float f = 9.9F;   //这样就可以正常编译通过了
}
```



**字符类型**

字符类型也是一个重要的基本数据类型，它可以表示计算机中的任意一个字符（包括中文、英文、标点等一切可以显示出来的字符）ASCII码

- char 字符型（16个bit，也就是2字节，它不带符号）范围是0 ~ 65535

```java
public static void main(String[] args) {
    // ASCII码
    char a = 65;
    System.out.println(a);
    
    char b = 'A';    //字符常量值需要使用单引号囊括，并且内部只能有一个字符
    System.out.println(b);
    
    int c = '淦';   //使用int类型接收字符类型常量值可以直接转换为对应的编码
    System.out.println(c);
}
```



**布尔类型**

布尔类型是Java中的一个比较特殊的类型，它并不是存放数字的，而是状态。

布尔类型（boolean）只有`true`和`false`两种值。

```java
public static void main(String[] args) {
    boolean b = true;   //值只能是true或false
    System.out.println(b);
}
```



## 2.3 运算符和表达式

### 赋值运算符

用来把数据赋值给变量的运算符。

| 运算符 | 描述                             |
| ------ | -------------------------------- |
| `+=`   | `a+=1` 等价于 `a=a+1`            |
| `-=`   | `a-=1` 等价于 `a=a-1`            |
| `*=`   | `a*=1` 等价于 `a=a*1`            |
| `/=`   | `a/=1` 等价于 `a=a/1`            |
| `%=`   | `a%=1` 等价于 `a=a%1`            |
| `++`   | 自增运算符，`a++` 等价于 `a=a+1` |
| `--`   | 自减运算符，`a--` 等价于 `a=a-1` |



### 算术运算符

算术运算使用的符号，用于执行两个变量或值的算术运算。

| 运算符 | 描述           |
| ------ | -------------- |
| `+`    | 加法           |
| `-`    | 减法           |
| `*`    | 乘法           |
| `/`    | 除法           |
| `%`    | 取余数（取模） |



### 位运算符

| 运算符 | 描述     |
| ------ | -------- |
| `&`    | 按位与   |
| `|`    | 按位或   |
| `^`    | 按位异或 |
| `~`    | 按位取反 |
| `<<`   | 左移运算 |
| `>>`   | 右移运算 |



### 关系运算符

| 运算符名称 | 说明         |
| ---------- | ------------ |
| `<`        | 小于         |
| `>`        | 大于         |
| `>=`       | 大于或者等于 |
| `<=`       | 小于或者等于 |
| `==`       | 等于         |
| `!=`       | 不等于       |



### 逻辑运算符

逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值

| 逻辑运算符 | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| `&&`       | 与运算，要求两边同时为true才能返回true                       |
| `||`       | 或运算，要求两边至少要有一个为true才能返回true               |
| `!`        | 非运算，一般放在表达式最前面，表达式用括号扩起来，表示对表达式的结果进行反转 |



**三元运算符**

三元运算符需要三个内容，第一个是判断语句，第二个是满足判断语句的值，第三个是不满足判断语句的值

```
判断语句 ? 结果1 : 结果2
```

```java
public static void main(String[] args) {
    int a = 10;
    char b = a > 10 ? 'A' : 'B';   
    
    System.out.println(b);
}
```



### 运算符优先级

| 优先级 |                            运算符                            |  结合性  |
| :----: | :----------------------------------------------------------: | :------: |
|   1    |                            `( )`                             | 从左向右 |
|   2    |             `~` `-` `+` (强制类型转换) `++` `--`             | 从右向左 |
|   3    |                         `*` `/` `%`                          | 从左向右 |
|   4    |                           `+` `-`                            | 从左向右 |
|   5    |                       `<<` `>>` `>>>`                        | 从左向右 |
|   6    |                      `>` `<` `>=` `>=`                       | 从左向右 |
|   7    |                          `==` `!=`                           | 从左向右 |
|   8    |                             `&`                              | 从左向右 |
|   9    |                             `^`                              | 从左向右 |
|   10   |                             `\|`                             | 从左向右 |
|   11   |                             `&&`                             | 从左向右 |
|   12   |                             `||`                             | 从左向右 |
|   13   |                           `?` `:`                            | 从右向左 |
|   14   | `=` `+=` `-=` `*=` `/=` `%=` `&=` `|=` `^=` `<<=` `>>=` `>>>=` | 从右向左 |



## 2.4 控制流程语句

### 代码块与作用域

- 大括号囊括起来的内容，被称为**块**（代码块），一个代码块中可以包含多行代码。

- 变量的使用范围，仅限于其定义时所处的代码块，一旦超出对应的代码块区域，就失效了。
- 目前所创建的变量都是局部变量（有范围限制）

```java
public class Main {   //外层花括号
    public static void main(String[] args) {   //内层花括号开始
       
    }  //内层花括号结束
}
```





### 选择结构

**`if`语句**

```java
public static void main(String[] args) {
    int a = 15;
    if(a == 15)    //只有当a判断等于15时，才会执行下面的打印语句
      	System.out.println("Hello World!");
  	System.out.println("我是外层");   //if只会对紧跟着的一行代码生效，后续的内容无效
}
```



**`if-else`语句**

```java
public static void main(String[] args) {
    int a = 15;
    if(a > 10) {    //只有判断成功时，才会执行下面的代码块中内容，否则直接跳过
        System.out.println("a大于10");
        System.out.println("a的值为："+a);
    } else {   //当判断不成功时，会执行else代码块中的代码
        System.out.println("a小于10");
        System.out.println("a的值为："+a);
    }
    System.out.println("我是外层");
}
```



**if else if 语句**

```java
public static void main(String[] args) {
    int score =  2;
    if(score >= 90)    //90分以上才是优秀
        System.out.println("优秀");
     else if (score >= 70)    //当上一级if判断失败时，会继续判断这一级
        System.out.println("良好");
     else if (score >= 60)
        System.out.println("及格");
     else    //当之前所有的if都判断失败时，才会进入到最后的else语句中
        System.out.println("不及格");
}
```



**嵌套`if`分支语句**

```java
public static void main(String[] args) {
    int score =  2;
    if(score < 60) {   //先判断不及格
        if(score > 30)    //在内层再嵌套一个if语句进行进一步的判断
            System.out.println("学习C++");
        else
            System.out.println("学习Java");
    }
}
```



**`switch`语句**

> `switch`可以精准匹配某个值，但是它不能进行范围判断。

```java
public static void main(String[] args) {
    char c = 'A';
    switch (c) {
        case 'A':
            System.out.println("去尖子班！");
            break;
        case 'B':
            System.out.println("去平行班！");
            break;
        case 'C':
            System.out.println("去差生班！");
            break;
        default:   //其他情况一律就是下面的代码了
            System.out.println("去读职高，分流");
    }
}
```



### 循环结构

**for循环语句**

```java
public static void main(String[] args) {
  	//比如我们希望让刚刚的打印执行3次
    for (int i = 0; i < 3; i++)    //这里我们在for语句中定义一个变量i，然后每一轮i都会自增，直到变成3为止
        System.out.println("伞兵一号卢本伟准备就绪！");   //这样，就会执行三轮循环，每轮循环都会执行紧跟着的这一句打印
}
```



**嵌套for循环**

```java
public static void main(String[] args) {
    for (int i = 0; i < 3; i++)    //外层循环执行3次
        for (int j = 0; j < 3; j++)    //内层循环也执行3次
            System.out.println("1！5！");
}
```



**标记跳出**

如果一个代码块中存在多个循环，那么直接对当前代码块的标记执行`break`时会直接跳出整个代码块

```java
outer: {    //直接对整个代码块打标签
    for (int i = 0; i < 10; i++) {
        if (i == 7){
            System.out.println("Test");
            break outer;   //执行break时，会直接跳出整个代码块，而不是第一个循环
        }
    }

    System.out.println("？？？");
}
```



**while 循环语句**

```java
public static void main(String[] args) {
    int i = 100;   //比如现在我们想看看i不断除以2得到的结果会是什么，但是循环次数我们并不明确
    while (i > 0) {   //现在唯一知道的是循环条件，只要大于0那么就可以继续除
        System.out.println(i);
        i /= 2;   //每次循环都除以2
    }
}
```



**do-while 语句**

```java
public static void main(String[] args) {
    int i = 0;   //比如现在我们想看看i不断除以2得到的结果会是什么，但是循环次数我们并不明确
    do {  //无论满不满足循环条件，先执行循环体里面的内容
        System.out.println("Hello World!");
        i++;
    } while (i < 10);   //再做判断，如果判断成功，开启下一轮循环，否则结束
}
```



**continue 关键字**

continue 关键字用于立即跳出本次循环，继续下一次循环。就近原则。

```java
public static void main(String[] args) {
    for (int i = 0; i < 3; i++) {
        if(i == 1) continue;   //比如我们希望当i等于1时跳过这一轮，不执行后面的打印
        System.out.println("伞兵一号卢本伟准备就绪！");
        System.out.println("当前i的值为："+i);
    }
}
```



**break 关键字**

break 关键字用于立即跳出整个循环。就近原则。

```java
for (int i = 0; i < 3; i++) {
    if(i == 1) break;   //我们希望当i等于1时提前结束
    System.out.println("伞兵一号卢本伟准备就绪！");
    System.out.println("当前i的值为："+i);
}
```



## 2.5 方法与方法调用

## 方法创建与使用

方法是语句的集合，是为了完成某件事情而存在的。完成某件事情，可以有结果，也可以做了就做了，不返回结果。



对象也可以做出一些行为，我们可以通过定义方法来实现（在C语言中叫做函数）

方法是语句的集合，是为了完成某件事情而存在的。



首先是返回值类型，也就是说这个方法完成任务之后，得到的结果的数据类型（可以是基本类型，也可以是引用类型）当然，如果没有返回值，那么可以使用`void`表示没有返回值

> 注意，方法名称同样可以随便起，但是规则跟变量的命名差不多，也是尽量使用小写字母开头的单词，如果是多个单词，一般使用驼峰命名法最规范。

```java
public class Person {
    String name;
    int age;
    String sex;

  	//自我介绍只需要完成就行，没有返回值，所以说使用void
    void hello(){
      	//完成自我介绍需要执行的所有代码就在这个花括号中编写
      	//这里编写代码跟我们之前在main中是一样的（实际上main就是一个函数）
      	//自我介绍需要用到当前对象的名字和年龄，我们直接使用成员变量即可，变量的值就是当前对象的存放值
        System.out.println("我叫 "+name+" 今年 "+age+" 岁了！");
    }
}
```

**方法的调用**

```java
public static void main(String[] args) {
    Person p = new Person();
    p.name = "小明";
    p.age = 18;
    p.hello();    //我们只需要使用 . 运算符，就可以执行定义好的方法了，只需要 .方法名称() 即可
}
```



**参数**

> **注意：**方法定义时编写的参数，我们一般称为形式参数，而调用方法实际传入的参数，我们成为实际参数。

```java
//我们的方法需要别人提供参与运算的值才可以
//我们可以为方法设定参数，在调用方法时，需要外部传入参数才可以
//参数的定义需要在小括号内部编写，类似于变量定义，需要填写 类型和参数名称，多个参数用逗号隔开
int sum(int a, int b){   //这里需要两个int类型的参数进行计算

}
int sum(int a, int b){   //这里的参数，相当于我们在函数中定义了两个局部变量，我们可以直接在方法中使用
    int c = a + b;   //直接c = a + b
}
```



**`return`关键字**

```java
int sum(int a, int b){
    int c = a + b;
    return c;   //return后面紧跟需要返回的结果，这样就可以将计算结果丢出去了
  	//带返回值的方法，是一定要有一个返回结果的！否则无法通过编译！
}
```



在我们使用`return`关键字之后，方法就会直接结束并返回结果，所以说在这之后编写的任何代码，都是不可到达的：





在`return`后编写代码，会导致编译不通过，因为存在不可达语句。

如果我们的程序中出现了分支语句，那么必须保证每一个分支都有返回值才可以：





只要有任何一个分支缺少了`return`语句，都无法正常通过编译，总之就是必须考虑到所有的情况，任何情况下都必须要有返回值。

当然，如果方法没有返回值，我们也可以使用`return`语句，不需要跟上任何内容，只不过这种情况下使用，仅仅是为了快速结束方法的执行：





实际上参数的传递，会在调用方法的时候，对参数的值进行复制，方法中的参数变量，不是我们传入的变量本身