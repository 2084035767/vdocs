# Java
```java
   __     ______     __   __   ______    
  /\ \   /\  __ \   /\ \ / /  /\  __ \   
 _\_\ \  \ \  __ \  \ \ \'/   \ \  __ \  
/\_____\  \ \_\ \_\  \ \__|    \ \_\ \_\ 
\/_____/   \/_/\/_/   \/_/      \/_/\/_/ 
                                         
```

## 一、Java 简介

### 1.1 什么是 Java？



### 1.2 Java 的历史和发展



### 1.3 Java 与其他编程语言的比较



## 二、Java 基础知识

### 2.1 铺垫知识

#### 注释

注释不会通过编译，是一种解释和说明。

- `//`：单行注释
- `/* */`：多行注释
- `/** */`：Javadoc文档注释

### 2.2 变量、常量和数据类型

#### 变量与常量

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



#### 基本数据类型

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



### 2.3 运算符和表达式

#### 赋值运算符

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



#### 算术运算符

算术运算使用的符号，用于执行两个变量或值的算术运算。

| 运算符 | 描述           |
| ------ | -------------- |
| `+`    | 加法           |
| `-`    | 减法           |
| `*`    | 乘法           |
| `/`    | 除法           |
| `%`    | 取余数（取模） |



#### 位运算符

| 运算符 | 描述     |
| ------ | -------- |
| `&`    | 按位与   |
| `|`    | 按位或   |
| `^`    | 按位异或 |
| `~`    | 按位取反 |
| `<<`   | 左移运算 |
| `>>`   | 右移运算 |



#### 关系运算符

| 运算符名称 | 说明         |
| ---------- | ------------ |
| `<`        | 小于         |
| `>`        | 大于         |
| `>=`       | 大于或者等于 |
| `<=`       | 小于或者等于 |
| `==`       | 等于         |
| `!=`       | 不等于       |



#### 逻辑运算符

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



#### 运算符优先级

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



### 2.4 控制流程语句

#### 代码块与作用域

- 大括号囊括起来的内容，被称为**块**（代码块），一个代码块中可以包含多行代码。

- 变量的使用范围，仅限于其定义时所处的代码块，一旦超出对应的代码块区域，就失效了。
- 目前所创建的变量都是局部变量（有范围限制）

```java
public class Main {   //外层花括号
    public static void main(String[] args) {   //内层花括号开始
       
    }  //内层花括号结束
}
```





#### 选择结构

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



#### 循环结构

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



### 2.5 方法与方法调用

### 方法创建与使用

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



## 三、Java 面向对象编程

### 3.1 类和对象

类，就是对一类事物的描述，是抽象的、概念上的定义。

对象是某一类事物实际存在的每个个体，因而也被称为实例（instance）我们每个人都是人类的一个实际存在的个体。



Java 使用 `class` （类）关键字来表示自定义类型。自定义类型是为了更容易抽象现实事物。

在一个类中，可以设置一静一动两种元素：属性（静）和方法（动）。

- **属性（又称为成员、字段）** - 属性抽象的是事物的状态。类属性可以是任何类型的对象。
- **方法（又称为函数）** - 方法抽象的是事物的行为。



**类的定义与对象创建**

对类进行命名时，一般使用英文单词，并且首字母大写，遵循变量命名规则。

```java
public class Person {   //这里定义的人类具有三个属性，名字、年龄、性别
    String name;   //直接在类中定义变量，表示类具有的属性
    int age;
    String sex;
    void hello(){ //直接在类中定义函数，表示类具有的方法
        System.out.println("我叫 "+name+" 今年 "+age+" 岁了！");
    }
}
```



**对象的使用**

```java
public static void main(String[] args) {
    //我们可以使用new关键字来创建某个类的对象，注意new后面需要跟上 类名()
  	//这里创建出来的，就是一个具体的人了
    new Person();   

  	//创建一个变量指代我们刚刚创建好的对象，变量的类型就是对应的类名
  	//这里的p存放的是对象的引用，而不是本体，我们可以通过对象的引用来间接操作对象
    Person p = new Person();
}
```



> 注意，不同对象的属性是分开独立存放的，每个对象都有一个自己的空间，修改一个对象的属性并不会影响到其他对象：

```java
public static void main(String[] args) {
    Person p1 = new Person();
    Person p2 = new Person();
    p1.name = "小明";   //这个修改的是第一个对象的属性
    p2.name = "大明";   //这里修改的是第二个对象的属性
    System.out.println(p1.name);  //这里我们获取的是第一个对象的属性
}
```



**方法进阶使用**

`this`关键字

同样的，我们如果想要在方法中访问到当前对象的属性，那么可以使用`this`关键字，来明确表示当前类的示例对象本身：

```java
void setName(String name) {
    this.name = name;   //让当前对象的name变量值等于参数传入的值
}
```

这样就可以修改成功了，当然，如果方法内没有变量出现重名的情况，那么默认情况下可以不使用`this`关键字来明确表示当前对象：

```java
String getName() {
    return name;    //这里没有使用this，但是当前作用域下只有对象属性的name变量，所以说直接就使用了
}
```



**方法的重载**

一个类中可以包含多个同名的方法，但是需要的形式参数不一样，方法的返回类型，可以相同，也可以不同，但是仅返回类型不同，是不允许的！

```java
int sum(int a, int b){
    return a + b;
}

double sum(double a, double b){    //为了支持小数加法，我们可以进行一次重载
    return a + b;
}

public static void main(String[] args) {
    Person p = new Person();
  	//当方法出现多个重载的情况，在调用时会自动进行匹配，选择合适的方法进行调用
    System.out.println(p.sum(1.5, 2.2));
}
```



递归调用

一个方法在它的方法体内调用它自身称为递归调用。

```java
int test(int n){
    if(n == 0) return 0;
    return test(n - 1) + n;    //返回的结果是下一层返回的结果+当前这一层的n
}
```



**构造方法**

- 构造方法是一种特殊的方法，每当一个类被实例化的时候，就会调用构造方法，而且只有构造方法被调用的时候，对象才会被分配内存空间。
- 构造方法不需要填写返回值，并且方法名称与类名相同，默认情况下每个类都会自带一个没有任何参数的无参构造方法。

```java
public class Person {
    String name;
    int age;
    String sex;

    Person(){    //构造方法不需要指定返回值，并且方法名称与类名相同
        name = "小明";   //构造方法会在对象创建时执行，我们可以将各种需要初始化的操作都在这里进行处理
        age = 18;
        sex = "男";
    }
}

public static void main(String[] args) {
    Person p = new Person();   //这里的new Person()其实就是在调用无参构造方法
    System.out.println(p.name);
}
```



构造方法设定参数

注意，在我们自己定义一个构造方法之后，会覆盖掉默认的那一个无参构造方法，除非我们手动重载一个无参构造，否则要创建这个类的对象，必须调用我们自己定义的构造方法

```java
public class Person {
    String name;
    int age;
    String sex;

    Person(String name, int age, String sex){   //跟普通方法是一样的
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}

// 这里需要特别注意，成员变量的初始化，在构造方法之前就已经完成了
public static void main(String[] args) {
    Person p = new Person("小明", 18, "男");   //调用自己定义的带三个参数的构造方法
    System.out.println(p.name);
}
```



**静态变量和静态方法**

- 静态的内容，是属于这个类的，也可以理解为是所有对象共享的内容。
- 通过使用`static`关键字来声明一个变量或一个方法为静态的。
- 一旦被声明为静态，那么通过这个类创建的所有对象，操作的都是同一个目标。

> 静态内容在类初始化时就完成了初始化

```java
public class Person {
    String name;
    int age;
    String sex;
    static String info;    //这里我们定义一个info静态变量
}

public static void main(String[] args) {
    Person.info = "让我看看";
    System.out.println(Person.info);
}

static void test(){
    System.out.println("我是静态方法");
}

但是静态方法是可以访问到静态变量的：
    static String info;

static void test(){
    System.out.println("静态变量的值为："+info);
}
```

### 3.2 包和访问控制

#### 包声明和导入

包其实就是用来区分类位置的东西，也可以用来将我们的类进行分类我们可以通过包的形式将这些类进行分类存放。

```java
package com.test;   //在放入包中，需要在类的最上面添加package关键字来指明当前类所处的包

import com.test.entity.Person;   //使用import关键字导入其他包中的类

public class Main {
    public static void main(String[] args) {
        Person person = new Person();   //只有导入之后才可以使用，否则编译器不知道这个类从哪来的
    }
}
```

`import`关键字导入我们需要使用的类，当然，只有在类不在同一个包下时才需要进行导入，如果一个包中有多个类，我们可以使用`*`表示导入这个包中全部的类：

```java
import com.test.entity.*;
```



```java
public class Main {
    public static void main(java.lang.String[] args) {   //主方法的String参数是java.lang包下的，我们需要明确指定一下，只需要在类名前面添加包名就行了
				com.test.entity.String string = new com.test.entity.String();
    }
}
```

#### 访问权限控制



Java中引入了访问权限控制（可见性），我们可以为成员变量、成员方法、静态变量、静态方法甚至是类指定访问权限，不同的访问权限，有着不同程度的访问限制：

- `private` - 私有，标记为私有的内容无法被除当前类以外的任何位置访问。
- `什么都不写` - 默认，默认情况下，只能被类本身和同包中的其他类访问。
- `protected` - 受保护，标记为受保护的内容可以能被类本身和同包中的其他类访问，也可以被子类访问（子类我们会在下一章介绍）
- `public` - 公共，标记为公共的内容，允许在任何地方被访问。

这四种访问权限，总结如下表：

|           | 当前类 | 同一个包下的类 | 不同包下的子类 | 不同包下的类 |
| :-------: | :----: | :------------: | :------------: | :----------: |
|  public   |   ✅    |       ✅        |       ✅        |      ✅       |
| protected |   ✅    |       ✅        |       ✅        |      ❌       |
|   默认    |   ✅    |       ✅        |       ❌        |      ❌       |
|  private  |   ✅    |       ❌        |       ❌        |      ❌       |





```java
public class Person {
    String name;
    int age;
    String sex;
    
    public static void test(){
        System.out.println("我是静态方法！");
    }
}
```

我们来尝试一下静态导入：

```java
import static com.test.entity.Person.test;    //静态导入test方法

public class Main {
    public static void main(String[] args) {
        test();    //直接使用就可以，就像在这个类定义的方法一样
    }
}
```



### 3.3 封装、继承和多态

封装、继承和多态是面向对象编程的三大特性。

> 封装：把对象的属性和方法结合成一个独立的整体，隐藏实现细节，并提供对外访问的接口。
>
> 继承：从已知的一个类中派生出一个新的类，叫子类。子类实现了父类所有非私有化的属性和方法，并根据实际需求扩展出新的行为。
>
> 多态：多个不同的对象对同一消息作出响应，同一消息根据不同的对象而采用各种不同的方法。

#### 类的封装

封装的目的是为了保证变量的安全性，使用者不必在意具体实现细节，而只是通过外部接口即可访问类的成员，如果不进行封装，类中的实例变量可以直接查看和修改，可能给整个代码带来不好的影响，因此在编写类时一般将成员变量私有化，外部类需要使用Getter和Setter方法来查看和设置变量。

```java
public class Person {
    private String name;    //现在类的属性只能被自己直接访问
    private int age;
    private String sex;
  
  	public Person(String name, int age, String sex) {   //构造方法也要声明为公共，否则对象都构造不了
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public String getName() {
        return name;    //想要知道这个对象的名字，必须通过getName()方法来获取，并且得到的只是名字值，外部无法修改
    }

    public String getSex() {
        return sex;
    }

    public int getAge() {
        return age;
    }
}
```



#### 类的继承

在定义不同类的时候存在一些相同属性，为了方便使用可以将这些共同属性抽象成一个父类，在定义其他子类时可以继承自该父类，减少代码的重复定义，子类可以使用父类中**非私有**的成员。

- 类的继承可以不断向下，但是同时只能继承一个类，同时，标记为`final`的类不允许被继承
- 当一个类继承另一个类时，属性会被继承，可以直接访问父类中定义的属性，除非父类中将属性的访问权限修改为`private`，那么子类将无法访问（但是依然是继承了这个属性的）

使用`extends`可以继承一个类

```java
public class Person {   //先定义一个父类
    String name;
    int age;
    String sex;
}

public class Worker extends Person{    //工人类
    
}
public class Student extends Person{   //学生类

}

public static void main(String[] args) {
    Student student = new Student();
    student.study();    //子类不仅有自己的独特技能
    student.hello();    //还继承了父类的全部技能
}
```





如果父类存在一个有参构造方法，子类必须在构造方法中调用：

既然现在父类需要三个参数才能构造，那么子类需要按照同样的方式调用父类的构造方法：

```java
public class Student extends Person{
    public Student(String name, int age, String sex) {    //因为学生职业已经确定，所以说学生直接填写就可以了
        super(name, age, sex, "学生");   //使用super代表父类，父类的构造方法就是super()
    }

    public void study(){
        System.out.println("我的名字是 "+name+"，我在学习！");
    }
}
public class Worker extends Person{
    public Worker(String name, int age, String sex) {
        super(name, age, sex, "工人");    //父类构造调用必须在最前面
        System.out.println("工人构造成功！");    //注意，在调用父类构造方法之前，不允许执行任何代码，只能在之后执行
    }
}
```



向上转型

我们在使用子类时，可以将其当做父类来使用：

虽然我们这里使用的是父类类型引用的对象，但是这并不代表子类就彻底变成父类了，这里仅仅只是当做父类使用而已。

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");    //这里使用父类类型的变量，去引用一个子类对象（向上转型）
    person.hello();    //父类对象的引用相当于当做父类来使用，只能访问父类对象的内容
}
```



向下转型

我们也可以使用强制类型转换，将一个被当做父类使用的子类对象，转换回子类：

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");
    Student student = (Student) person;   //使用强制类型转换（向下转型）
    student.study();
}
```









那么如果我们想要判断一下某个变量所引用的对象到底是什么类，那么该怎么办呢？

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");
    if(person instanceof Student) {   //我们可以使用instanceof关键字来对类型进行判断
        System.out.println("对象是 Student 类型的");
    }
    if(person instanceof Person) {
        System.out.println("对象是 Person 类型的");
    }
}
```

如果变量所引用的对象是对应类型或是对应类型的子类，那么`instanceof`都会返回`true`，否则返回`false`。





那么，在子类存在同名变量的情况下，怎么去访问父类的呢？我们同样可以使用`super`关键字来表示父类：

```java
public void work(){
    System.out.println("我是 "+super.name+"，我在工作！");   //这里使用super.name来表示需要的是父类的name变量
}
```



#### 顶层Object类

实际上所有类都默认继承自Object类，除非手动指定继承的类型，但是依然改变不了最顶层的父类是Object类。所有类都包含Object类中的方法。

这里我们可以尝试调用一下Object为我们提供的`toString()`方法：

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");
    String str = person.toString();
    System.out.println(str);
}
```



我们也可以试试看默认提供的`equals`方法：

```java
public static void main(String[] args) {
    Person p1 = new Student("小明", 18, "男");
    Person p2 = new Student("小明", 18, "男");
    System.out.println(p1.equals(p2));
}
```

因为默认比较的是两个对象是否为同一个对象，所以说这里得到的肯定是false，但是有些情况下，实际上我们所希望的情况是如果名字、年龄、性别都完全相同，那么这肯定是同一个人，但是这里却做不到这样的判断，我们需要修改一下`equals`方法的默认实现来完成，这就要用到方法的重写了。



#### 方法的重写

注意，方法的重写不同于之前的方法重载，不要搞混了，方法的重载是为某个方法提供更多种类，而方法的重写是覆盖原有的方法实现，比如我们现在不希望使用Object类中提供的`equals`方法，那么我们就可以将其重写了：

```java
public class Person{
    ...

    @Override   //重写方法可以添加 @Override 注解，有关注解我们会在最后一章进行介绍，这个注解默认情况下可以省略
    public boolean equals(Object obj) {   //重写方法要求与父类的定义完全一致
        if(obj == null) return false;   //如果传入的对象为null，那肯定不相等
        if(obj instanceof Person) {     //只有是当前类型的对象，才能进行比较，要是都不是这个类型还比什么
            Person person = (Person) obj;   //先转换为当前类型，接着我们对三个属性挨个进行比较
            return this.name.equals(person.name) &&    //字符串内容的比较，不能使用==，必须使用equals方法
                    this.age == person.age &&       //基本类型的比较跟之前一样，直接==
                    this.sex.equals(person.sex);
        }
        return false;
    }
}
```

在重写Object提供的`equals`方法之后，就会按照我们的方式进行判断了：

```java
public static void main(String[] args) {
    Person p1 = new Student("小明", 18, "男");
    Person p2 = new Student("小明", 18, "男");
    System.out.println(p1.equals(p2));   //此时由于三个属性完全一致，所以说判断结果为真，即使是两个不同的对象
}
```



注意，静态方法不支持重写，因为它是属于类本身的，但是它可以被继承。

基于这种方法可以重写的特性，对于一个类定义的行为，不同的子类可以出现不同的行为，比如考试，学生考试可以得到A，而工人去考试只能得到D：

```java
public class Person {
    ...

    public void exam(){
        System.out.println("我是考试方法");
    }
  
  	...
}
public class Student extends Person{
    ...

    @Override
    public void exam() {
        System.out.println("我是学生，我就是小镇做题家，拿个 A 轻轻松松");
    }
}
public class Worker extends Person{
    ...

    @Override
    public void exam() {
        System.out.println("我是工人，做题我并不擅长，只能得到 D");
    }
}
```





这其实就是面向对象编程中多态特性的一种体现。

注意，我们如果不希望子类重写某个方法，我们可以在方法前添加`final`关键字，表示这个方法已经是最终形态：

```java
public final void exam(){
    System.out.println("我是考试方法");
}
```



或者，如果父类中方法的可见性为`private`，那么子类同样无法访问，也就不能重写，但是可以定义同名方法：



虽然这里可以编译通过，但是并不是对父类方法的重写，仅仅是子类自己创建的一个新方法。

还有，我们在重写父类方法时，如果希望调用父类原本的方法实现，那么同样可以使用`super`关键字：

```java
@Override
public void exam() {
    super.exam();   //调用父类的实现
    System.out.println("我是工人，做题我并不擅长，只能得到 D");
}
```

然后就是访问权限的问题，子类在重写父类方法时，不能降低父类方法中的可见性：

```java
public void exam(){
    System.out.println("我是考试方法");
}
```



因为子类实际上可以当做父类使用，如果子类的访问权限比父类还低，那么在被当做父类使用时，就可能出现无视访问权限调用的情况，这样肯定是不行的，但是相反的，我们可以在子类中提升权限：

```java
protected void exam(){
    System.out.println("我是考试方法");
}
@Override
public void exam() {   //将可见性提升为public 
    System.out.println("我是工人，做题我并不擅长，只能得到 D");
}
```



### 3.4 内部类和枚举类

### 3.5 抽象类和接口

#### 抽象类

在我们学习了类的继承之后，实际上我们会发现，越是处于顶层定义的类，实际上可以进一步地进行抽象，比如我们前面编写的考试方法：

```java
protected void exam(){
    System.out.println("我是考试方法");
}
```

这个方法再子类中一定会被重写，所以说除非子类中调用父类的实现，否则一般情况下永远都不会被调用，就像我们说一个人会不会考试一样，实际上人怎么考试是一个抽象的概念，而学生怎么考试和工人怎么考试，才是具体的一个实现，所以说，我们可以将人类进行进一步的抽象，让某些方法完全由子类来实现，父类中不需要提供实现。

要实现这样的操作，我们可以将人类变成抽象类，抽象类比类还要抽象：

```java
public abstract class Person {   //通过添加abstract关键字，表示这个类是一个抽象类
    protected String name;   //大体内容其实普通类差不多
    protected int age;
    protected String sex;
    protected String profession;

    protected Person(String name, int age, String sex, String profession) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.profession = profession;
    }

    public abstract void exam();   //抽象类中可以具有抽象方法，也就是说这个方法只有定义，没有方法体
}
```

而具体的实现，需要由子类来完成，而且如果是子类，必须要实现抽象类中所有抽象方法：

```java
public class Worker extends Person{

    public Worker(String name, int age, String sex) {
        super(name, age, sex, "工人");
    }

    @Override
    public void exam() {   //子类必须要实现抽象类所有的抽象方法，这是强制要求的，否则会无法通过编译
        System.out.println("我是工人，做题我并不擅长，只能得到 D");
    }
}
```

抽象类由于不是具体的类定义（它是类的抽象）可能会存在某些方法没有实现，因此无法直接通过new关键字来直接创建对象：



要使用抽象类，我们只能去创建它的子类对象。

抽象类一般只用作继承使用，当然，抽象类的子类也可以是一个抽象类：

```java
public abstract class Student extends Person{   //如果抽象类的子类也是抽象类，那么可以不用实现父类中的抽象方法
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override   //抽象类中并不是只能有抽象方法，抽象类中也可以有正常方法的实现
    public void exam() {
        System.out.println("我是学生，我就是小镇做题家，拿个 A 轻轻松松");
    }
}
```

注意，抽象方法的访问权限不能为`private`：

因为抽象方法一定要由子类实现，如果子类都访问不了，那么还有什么意义呢？所以说不能为私有。



#### 接口

接口甚至比抽象类还抽象，他只代表某个确切的功能！也就是只包含方法的定义，甚至都不是一个类！接口一般只代表某些功能的抽象，接口包含了一些列方法的定义，类可以实现这个接口，表示类支持接口代表的功能（类似于一个插件，只能作为一个附属功能加在主体上，同时具体实现还需要由主体来实现）

接口的目标就是将类所具有某些的行为抽象出来。

```java
public interface Study {    //使用interface表示这是一个接口
    void study();    //接口中只能定义访问权限为public抽象方法，其中public和abstract关键字可以省略
}
```

我们可以让类实现这个接口：

```java
public class Student extends Person implements Study {   //使用implements关键字来实现接口
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public void study() {    //实现接口时，同样需要将接口中所有的抽象方法全部实现
        System.out.println("我会学习！");
    }
}
public class Teacher extends Person implements Study {
    protected Teacher(String name, int age, String sex) {
        super(name, age, sex, "教师");
    }

    @Override
    public void study() {
        System.out.println("我会加倍学习！");
    }
}
```

接口不同于继承，接口可以同时实现多个：

```java
public class Student extends Person implements Study, A, B, C {  //多个接口的实现使用逗号隔开
  
}
```

所以说有些人说接口其实就是Java中的多继承，但是我个人认为这种说法是错的，实际上实现接口更像是一个类的功能列表，作为附加功能存在，一个类可以附加很多个功能，接口的使用和继承的概念有一定的出入，顶多说是多继承的一种替代方案。

接口跟抽象类一样，不能直接创建对象，但是我们也可以将接口实现类的对象以接口的形式去使用：



当做接口使用时，只有接口中定义的方法和Object类的方法，无法使用类本身的方法和父类的方法。

接口同样支持向下转型：

```java
public static void main(String[] args) {
    Study study = new Teacher("小王", 27, "男");
    if(study instanceof Teacher) {   //直接判断引用的对象是不是Teacher类型
        Teacher teacher = (Teacher) study;   //强制类型转换
        teacher.study();
    }
}
```

这里的使用其实跟之前的父类是差不多的。

从Java8开始，接口中可以存在方法的默认实现：

```java
public interface Study {
    void study();

    default void test() {   //使用default关键字为接口中的方法添加默认实现
        System.out.println("我是默认实现");
    }
}
```

如果方法在接口中存在默认实现，那么实现类中不强制要求进行实现。

接口不同于类，接口中不允许存在成员变量和成员方法，但是可以存在静态变量和静态方法，在接口中定义的变量只能是：

```java
public interface Study {
    public static final int a = 10;   //接口中定义的静态变量只能是public static final的
  
  	public static void test(){    //接口中定义的静态方法也只能是public的
        System.out.println("我是静态方法");
    }
    
    void study();
}
```

跟普通的类一样，我们可以直接通过接口名.的方式使用静态内容：

```java
public static void main(String[] args) {
    System.out.println(Study.a);
    Study.test();
}
```

接口是可以继承自其他接口的：

```java
public interface A exetnds B {
  
}
```

并且接口没有继承数量限制，接口支持多继承：

```java
public interface A exetnds B, C, D {
  
}
```

接口的继承相当于是对接口功能的融合罢了。

最后我们来介绍一下Object类中提供的克隆方法，为啥要留到这里才来讲呢？因为它需要实现接口才可以使用：

```java
package java.lang;

public interface Cloneable {    //这个接口中什么都没定义
}
```

实现接口后，我们还需要将克隆方法的可见性提升一下，不然还用不了：

```java
public class Student extends Person implements Study, Cloneable {   //首先实现Cloneable接口，表示这个类具有克隆的功能
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public Object clone() throws CloneNotSupportedException {   //提升clone方法的访问权限
        return super.clone();   //因为底层是C++实现，我们直接调用父类的实现就可以了
    }

    @Override
    public void study() {
        System.out.println("我会学习！");
    }
}
```

接着我们来尝试一下，看看是不是会得到一个一模一样的对象：

```java
public static void main(String[] args) throws CloneNotSupportedException {  //这里向上抛出一下异常，还没学异常，所以说照着写就行了
    Student student = new Student("小明", 18, "男");
    Student clone = (Student) student.clone();   //调用clone方法，得到一个克隆的对象
    System.out.println(student);
    System.out.println(clone);
    System.out.println(student == clone);
}
```

可以发现，原对象和克隆对象，是两个不同的对象，但是他们的各种属性都是完全一样的

## 四、Java 进阶知识

### 4.1 基本类型包装类

### 4.2 数组

### 4.3 字符串

### 4.4 异常和注解

## 六、Java 标准库

### 6.1 Java I/O

### 6.2 Java 集合

### 6.3 多线程编程

### 6.4 泛型和反射

## 五、参考三三