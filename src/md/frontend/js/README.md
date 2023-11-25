# JavaScript 笔记

```javascript
   __     ______    
  /\ \   /\  ___\   
 _\_\ \  \ \___  \  
/\_____\  \/\_____\ 
\/_____/   \/_____/ 
                          
```



## 一、简介

### 1.1 什么是 JavaScript？

- JavaScript 是世界上最流行的语言之一，是一种运行在客户端的脚本语言。
- JavaScript 基于原型编程、多范式的动态脚本语言，并且支持多种编程范式。
- JavaScript 经常用在web客户端脚本语言，主要是用来给html增加动态功能。



### 1.2 JavaScript 的特点

1. 简单易用：可以使用任何文本编辑工具编写，只需要浏览器就可以执行程序。
2. 解释型语言：事先不需要被编译为机器码再执行，逐行执行、无需进行严格的变量声明。
3. 基于对象：内置大量现成对象，编写少量程序可以完成目标。
4. 面向过程。



### 1.3 JavaScript 的历史和发展

JavaScript由Brendan Eich在1995年创造，并最初命名为"LiveScript"。后来，在与Sun Microsystems合作后，改名为JavaScript，以借鉴Java的成功。

JavaScript最早被用于网页上的简单交互效果。为了解决浏览器兼容性问题，ECMA 国际成立了一个委员会，制定了JavaScript的标准规范，称为ECMAScript。第一版标准于1997年发布。

JavaScript经历了多个版本的更新和改进。其中，ECMAScript 3（1999年）引入了许多现代JavaScript的核心特性，如函数表达式、正则表达式和异常处理。ECMAScript 5（2009年）增加了严格模式、JSON对象和数组方法等功能。ECMAScript 6（2015年）是一个重大的更新，引入了类、箭头函数、模块化等特性。



### 1.4 ECMAScript

**ECMAScript** 是由 ECMA 国际（ 原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMAScript 语言的实现和扩展。

**ECMAScript**：ECMAScript 规定了 JS 的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套 JS 语法工业标准。



### 1.5 DOM 和 BOM



**DOM 文档对象模型**

**文档对象模型**（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言的标准编程接口。通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等）。



**BOM 浏览器对象模型**

**BOM** (Browser Object Model，简称 BOM) 是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过 BOM 可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。



### 1.6 JavaScript 的学习内容

- **ECMAScript**：JavaScript 的语法标准。包括变量、表达式、运算符、函数、if 语句、for 语句等。
- **DOM**：文档对象模型，操作**网页上的元素**的 API。比如让盒子移动、变色、轮播图等。
- **BOM**：浏览器对象模型，操作**浏览器部分功能**的 API。比如让浏览器自动滚动。



## 二、JS 基础知识

### 2.1 铺垫知识

#### JS的引入方式

**内嵌式**

在 html 文档中使用`script`标签嵌入``JS``代码。

```html
<script type=”text/javascript”>
	alert('hello,world');
</script>
```

**外链式**

通过设置 `src` 属性引入外部``JS``文件。一般放在`</body>`前，避免延迟。

> 注意：引入外部文件在标签体内的脚本不会执行。

```html
<script src="zs.js"></script>
```



**注释**

和大部分语言使用的注释方式相仿，有单行和多行注释。

- `//`：单行注释
- `/*...*/`：多行注释



**自动分号**

使用分号表示一段指令的结束，当没有输入分号时如果有换行符``JS``会自动添加分号，减少错误的发生。

- 但推荐每个指令都以分号结束
- 视情况而定，有些工具会自动补全分号，不需要手动写
- 在使用构建工具时，不使用分号结束可能会造成异常



#### 输入输出语句

| 方法              | 说明                           | 归属   |
| ----------------- | ------------------------------ | ------ |
| alert(msg);       | 浏览器弹出警示框               | 浏览器 |
| console.log(msg); | 浏览器控制台打印输出信息       | 浏览器 |
| prompt(info);     | 浏览器弹出输入框，用户可以输入 | 浏览器 |

**`alert()`和`console.log()`的区别**

- `alert()`：主要用来显示消息给用户
- `console.log()`：主要用来给程序员看自己运行时的消息



### 2.2 变量、常量和数据类型

#### 变量

- 变量是用于存放数据的**容器**，我们通过**变量名**获取数据，甚至数据可以修改。
- 本质：**变量是程序在内存**中申请的一块用来存放数据的空间。



**变量初始化**

`JS` 中使用`var`来声明变量。使用该关键字声明变量后，计算机会自动为变量分配内存空间。

```javascript
// 声明变量
var age; 

// 声明变量同时赋值为18
var age = 18; 

// 同时声明多个变量时，只需要写一个 var， 多个变量名之间使用英文逗号隔开。
var age = 18, address = '火影村', salary = 15000;
```



**声明变量特殊情况**

| 情况                          | 说明                     | 结果        |
| ----------------------------- | ------------------------ | ----------- |
| `var age; console.log(age);`  | 只声明，不赋值           | `undefined` |
| `console.log(age)`            | 不声明，不赋值，直接使用 | 报错        |
| `age = 10; console.log(age);` | 不声明，只赋值           | 10          |



**变量的命名规范**

1. 由字母，数字，下划线(_)和美元符号($)组成。
2. 严格区分大小写。 
3. 不能以数字开头。
4. 不能是关键字，保留字。
5. 命名语义化。
6. 遵循驼峰命名法。首字母小写，后面单词的首字母需要大写。



#### 数据类型

JS 把数据类型分为两类

- 基本数据类型(Number，String，Boolean，Undefined，Null)
- 复杂数据类型(Object，Array、Function)



>  提示：
>
> - JS 是一种弱类型或者说动态语言。这意味着不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。
> - JS 拥有动态类型，同时也意味着相同的变量可用作不同的类型



**基本数据类型**

| 简单数据类型 | 说明                                                         | 默认值      |
| ------------ | ------------------------------------------------------------ | ----------- |
| `Number`     | 数字型，包含整型值和浮点型值                                 | `0`         |
| `Boolean`    | 布尔值类型，如 true 和 false 。等价于 1 和 0                 | `false`     |
| `Undefined`  | undefined（未定义的）声明了变量，但是没有赋值，此时值为undefined。 | `undefined` |
| `string`     | 字符串类型。                                                 | `“”`        |
| `Null`       | 空值                                                         | `null`      |



#### 数字型 Number

JS 数字类型既可以用来保存整数值，也可以保存小数(浮点数）。

```javascript
var age = 12;		// 整数
var Age = 21.3747;	// 小数
```



**数字型进制**

最常见的进制有二进制、八进制、十进制、十六进制。

> 在 JS 中八进制前面加 0，十六进制前面加 0x

```javascript
// 八进制数字序列范围：0~7
var num1 = 07; 		// 对应十进制的7
var Num2 = 019;		// 对应十进制的19
var num3 = 08;		// 对应十进制的8


// 十六进制数字序列范围：0~9以及A~F
var num = 0xA;
```



**数字型范围**

- JS 中数值的最大值：`Number.MAX_VALUE`
- JS 中数值的最小值：`Number.MIN_VALUE`

```javascript
consol.log(Number.MAX_VALUE);
consol.log(Number.MIN_VALUE);
```



**数字型的三个特殊值**

- `Infinity`：代表无穷大，大于任何数值
- `-Infinity`：代表无穷小，小于任何数值
- `Nan`：`Not a Number`，代表一个非数值

```javascript
alert(Infinity); 	// Infinity(无穷大)
alert(-Infinity); 	// -Infinity(无穷小)
alert(NaN);       	// 代表任何一个非数值
```



**基本函数**

判断是否为整数

```javascript
console.log(Number.isInteger(1.2));
// Output: false
// 21不是一个非数字
```

指定返回的小数位数可以四舍五入

```javascript
console.log((16.556).toFixed(2));
// Output: false
// 21不是一个非数字
```

判断非数字

```javascript
console.log(isNan(21));		
// Output: false
// 21不是一个非数字
```



#### 字符串型 String

字符串型可以是引号中的任意文本，其语法为双引号`“”` 和单引号`’’` 。

```javascript
var strMsg = "我爱北京天安门";		// 使用双引号表示字符串
var strMsg = '我爱北京';			  // 使用单引号表示字符串
```



**字符串引号嵌套**

JS 可以用 单引号嵌套双引号，或者用 双引号嵌套单引号（外双内单，外单内双）

```javascript
var strMsg ='我是一个“高富帅”' // 可以用 ' ' 包含 " "
var strMsg2 ="我是'高富帅'" // 可以用" "  包含  ''
```



**字符串转义符**

字符串中有特殊字符，转义符都是`\`开头的，我们称之为转义符。

常用的转义符及其说明如下：

| 转义符 | 解释说明  |
| ------ | --------- |
| `\n`   | 换行符    |
| `\\`   | 斜杠 \    |
| `\’`   | ’ 单引号  |
| `\‘’`  | ‘’ 双引号 |
| `\t`   | tab 缩进  |
| `\b`   | 空格      |



**字符串长度**

字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的 length 属性可以获取整个字符串的长度。

```javascript
var strMsg = "我是高富帅！";
alert(strMsg.length);     // 显示6
```



**字符串的拼接**

多个字符串之间可以使用 + 进行拼接。

> 注意：字符串 + 任何类型 =拼接之后的新字符串。

```javascript
// 字符串相加
alert('hello' + ' ' + 'World');  // hello World

// 数值字符串相加
alert('100' + '100'); //100100

// 数值字符串+数值
alert('12'+12); // 1212

// 数值+数值
alert(12+12); // 24

// 引引加加，最终也是上面的形式
console.log('我今年'+18+'岁');
```



字符串拼接加强

使用 `+=` 在字符串上追回字符内容

```javascript
console.log('Pink老师' + 18);			// 只要有字符就会相连
var age = 18;

console.log('Pink老师' + age);		 // Pink老师18
console.log('Pink老师' + age + '岁啦');	// Pink老师18岁啦
```

- 我们经常会将字符串和变量来拼接，因为变量可以很方便地修改里面的值
- 变量是不能添加引号的，因为加引号的变量会变成字符串
- 如果变量两侧都有字符串拼接，口诀==“引引加加 ”，删掉数字==变量写加中间



**普通函数**

*获取长度*

```javascript
// 使用 length 属性可以获取字符串长度
console.log("hello,world".length) // Output: 11
```



*大小写转换*

```javascript
// 将字符转换成大写格式
console.log('hello,world'.toUpperCase());
// Output: HELLO,WORLD

// 转字符为小写格式
console.log('HELLO,WORLD'.toLowerCase()); 
// Output: hello,world
```



*移除空白*

```javascript
// 使用 trim 删除字符串左右的空白字符
var str = '   hello,world  ';
console.log(str.length); // Output: 16
console.log(str.trim().length); // Output: 11

// 使用 trimLeft 删除左边空白，使用 trimRight 删除右边空白
var name = " zs ";
console.log(name.trimLeft()); // Output: zs 
console.log(name.trimRight()); // Output:  zs 
```



*获取单字符*

```javascript
// 根据从 0 开始的位置获取字符
console.log('zs'.charAt(1)) // Output: s

// 使用数字索引获取字符串
console.log('zs'[1]) // Output: s
```



*截取字符串*

```javascript
// 使用 slice、substring 函数都可以截取字符串
// slice、substring 第二个参数为截取的结束位置

var h = 'hello,world';
console.log(h.slice(3)); // Output: lo,world
console.log(h.substring(3)); // Output: lo,world

console.log(h.slice(3, 6)); // Output: lo,
console.log(h.substring(3, 6)); // Output: lo,
console.log(h.substring(3, 0)); // Output: hel

console.log(h.slice(3, -1)); // Output: lo,worl
console.log(h.slice(-2)); // Output: ld
console.log(h.substring(3, -9)); // Output: hel
```



*查找字符串*

```javascript
//indexOf 从开始获取字符串位置，检测不到时返回 -1
console.log('hello,world'.indexOf('d')); // Output: 10
// lastIndexOf 从结尾来搜索字符串位置
console.log('hello,world'.lastIndexOf('d')); //Output: 10


// search() 方法用于检索字符串中指定的子字符串，也可以使用正则表达式搜索
var str = "hello,world";
console.log(str.search("hello")); //Output: 0
console.log(str.search(/\.hello/i)); //Output: -1

//includes 字符串中是否包含指定的值，第二个参数指查找开始位置
console.log('hello,world'.includes('o')); //Output: true
console.log('hello,world'.includes('h', 11)); //Output: false

//startsWith 是否是指定位置开始，第二个参数为查找的开始位置
console.log('hello,world'.startsWith('h')); //Output: true
console.log('hello,world'.startsWith('o', 1)); //Output: false

//endsWith 是否是指定位置结束，第二个参数为查找的结束位置
console.log('hello,world'.endsWith('com')); //Output: false
console.log('hello,world'.endsWith('o', 2)); //Output: false
```



*替换字符串*

```javascript
// replace 方法用于字符串的替换操作
var name = "hello,world";
name2 = name.replace("wo", "zs");
console.log(name2); //Output: hello,zsrld

// 默认只替换一次，如果全局替换需要使用正则
var str = "2023/02/12";
console.log(str.replace(/\//g, "-"));
//Output: 2023-02-12
```



*重复生成*

```javascript
// 根据参数重复生成星号
function star(num = 3) {
	return '*'.repeat(num);
}
console.log(star()); 
// Output: ***

// 模糊后三位电话号码
var phone = "98765432101";
console.log(phone.slice(0, -3) + "*".repeat(3));
// Output: 98765432***
```



#### 布尔型 Boolean

- 布尔类型有两个值：true 和 false。
- 布尔型和数字型相加的时候：true 的值为 1 ；false 的值为 0。

```javascript
var flag = true;
console.log(flag + 1);
// Output: 2
```



**隐式转换**

基本上所有类型都可以隐式转换为 Boolean 类型。

| 数据类型  | true             | false            |
| --------- | ---------------- | ---------------- |
| String    | 非空字符串       | 空字符串         |
| Number    | 非 0 的数值      | 0 、NaN          |
| Array     | 数组不参与比较时 | 参与比较的空数组 |
| Object    | 所有对象         |                  |
| undefined | 无               | undefined        |
| null      | 无               | null             |
| NaN       | 无               | NaN              |

```javascript
// 布尔与数值比较时，会进行隐式类型转换 true 转为 1，false 转为 0
console.log(3 == true); // Output: false
console.log(0 == false); // Output: true

// 字符串在与布尔比较时，两边都为转换为数值类型后再进行比较
console.log(Number("zs")); // Output: NaN
console.log(Boolean("zs")); // Output: true
console.log("zs" == true); // Output: false
console.log("1" == true); // Output: true

// 数组的表现与字符串原理一样，会先转换为数值
console.log(Number([])); // Output: 0
console.log(Number([3])); // Output: 3
console.log(Number([1, 2, 3])); // Output: NaN
console.log([] == false); // Output: true
console.log([1] == true); // Output: true
console.log([1, 2, 3] == true); // Output: false

// 引用类型的布尔值为真，如对象和数组
if ([]) console.log("true"); // Output: true
if ({}) console.log("true"); // Output: true
```



**显式转换**

使用 `!!` 转换布尔类型

```javascript
let hd = '';
console.log(!!hd); // Output: false
hd = 0;
console.log(!!hd); // Output: false
hd = null;
console.log(!!hd); // Output: false
hd = new Date("2020-2-22 10:33");
console.log(!!hd); // Output: true

// 使用 Boolean 函数可以显式转换为布尔类型
let hd = '';
console.log(Boolean(hd)); // Output: false
hd = 0;
console.log(Boolean(hd)); // Output: false
hd = null;
console.log(Boolean(hd)); // Output: false
hd = new Date("2020-2-22 10:33");
console.log(Boolean(hd)); // Output: true
```



**未定义 undefined**

一个**声明后没有被赋值**的变量会有一个默认值 `undefined`。

::: warn

如果进行相连或者相加时，注意结果

:::

> 注意：
>
> - undefined 和 字符串 相加，会拼接字符串
> - undefined 和 数字相加，最后结果是`NaN`

````javascript
var str;
console.log(str);
// Output: undefined

var variable = undefined;
console.log(variable + 'Pink'); 
// Output: undefinedPink

console.log(variable + 18); 
// Output: NaN 
````



**空值 null**

一个声明变量给 null 值，里面存的值为空

```javascript
ar space = null;
console.log(space + 'pink'); // Output: nullpink
console.llog(space + 1); // Output:  1
```



**typeof**

- typeof 可用来获取检测变量的数据类型

```javascript
var num = 18;
console.log(typeof num) // Output: number  
```



**字面量**

- 字面量（literal）是用于表达一个固定值的表示法。
- 字面量是在源代码中一个固定值的表示法，通俗来说，就是字面量表示如何表达这个值。
- 可以用于表示固定值，比如：数字、字符串、undefined、布尔类型的字面值等。



#### 数据类型转换

通俗来说，就是把一种数据类型的变量转换成另外一种数据类型。

> 注意：使用表单、prompt 获取过来的数据默认是字符串类型的



**转换为字符串型**

| 方式           | 说明                         |
| -------------- | ---------------------------- |
| toString()     | 转成字符串                   |
| String()       | 强制转换，转成字符串         |
| 加号拼接字符串 | 和字符串拼接的结果都是字符串 |

```javascript
// 把数字型转换为字符串型
var num = 10;
var str = num.toString();
console.log(typeof(str));
// Output: string

//强制转换
console.log(typeof(String(num)));
// Output: string

// 推荐第三种转换方式，这一方式也称为隐式转换
console.log(typeof('hello'+ 1024));
// Output: string
```



**转换为数字型**

| 方式                 | 说明                           |
| -------------------- | ------------------------------ |
| parselnt(string)     | 将 string 类型转成整数数值型   |
| parseFloat(string)   | 将 string 类型转成浮点数数值型 |
| Number()             | 将 string 类型强制转换为数值型 |
| `JS` 隐式转换(- * /) | 利用算术运算隐式转换为数值型   |

```javascript
// 整数，会取整,不会四舍五入，但会去掉单位
console.log(parseInt('3.14'));  // Output: 3
console.log(parseInt('3.94'));  // Output: 3
console.log(parseInt('120px'));  // Output: 120

// 浮点数，不会取整，但会去掉单位
console.log(parseFloat('3.14'));  // Output: 3.14
console.log(parseFloat('120px'));  // Output: 120


// 强制转换
console.log(Number('12')); // Output: 12

// 利用算术运算，隐式转换
console.log('12'-0);  // Output:  12
console.log('123' - '120');  // Output: 3
console.log('123' * 1);  // Output:  123
```



**转换为布尔型**

| 方法      | 说明               |
| --------- | ------------------ |
| Boolean() | 其他类型转成布尔值 |

- 代表空，否定的值会被转换为 false，如 ’’ , 0, NaN , null , undefined
- 其余的值都会被被转换为 true

```javascript
console.log(Boolean('')); // Output: false
console.log(Boolean(0));  // Output: false
console.log(Boolean(NaN)); // Output: false
console.log(Boolean(null)); // Output: false
console.log(Boolean(undefined)); // Output: false
console.log(Boolean('zs')); // Output: true
console.log(Boolean(12));   // Output: true
```



### 2.3 运算符和表达式

#### 算术运算符

算术运算使用的符号，用于执行两个变量或值的算术运算。

| 运算符 | 描述           |
| ------ | -------------- |
| `+`    | 加法           |
| `-`    | 减法           |
| `*`    | 乘法           |
| `/`    | 除法           |
| `%`    | 取余数（取模） |



**浮点数的精度问题**

浮点数值的最高精度是 17 位小数，但在进行算数计算时其精确度远远不如整数

**所以不要直接判断两个浮点数是否相等**

```javascript
var result = 0.1 +0.2; // Output: 结果不是0.3，0.30000000000000004
console.log(0.07 * 100); // Output: 结果不是7，而是7.000000000000001
```



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



#### 比较(关系)运算符

比较运算符是两个数据进行比较时所使用的运算符，结果会返回一个布尔值。

| 运算符名称 | 说明                         |
| ---------- | ---------------------------- |
| `<`        | 小于                         |
| `>`        | 大于                         |
| `>=`       | 大于或者等于                 |
| `<=`       | 小于或者等于                 |
| `==`       | 判等号(会转型)               |
| `!=`       | 不等号                       |
| `===`      | 全等，要求值和数据类型都一致 |



#### 逻辑运算符

逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值

| 逻辑运算符 | 说明                   |
| ---------- | ---------------------- |
| `&&`       | “逻辑与”，简称"与" and |
| `||`       | “逻辑或”，简称"或" or  |
| `!`        | “逻辑非”，简称"非" not |



##### 短路运算(逻辑中断)

短路运算的原理：当有多个表达式（值）时,左边的表达式值可以确定结果时,就不再继续运算右边的表达式的值

**逻辑与**

- 语法：表达式 1 && 表达式 2
- 如果第一个表达式的值为真，则返回表达式 2
- 如果第一个表达式的值为假，则返回表达式 1

````javascript
console.log(123 && 456);   // Output: 456
console.log(0 && 456);     // Output: 0
console.log(123 && 456 && 789);  // Output: 789
````



**逻辑或**

- 语法：表达式 1 || 表达式 2
- 如果第一个表达式的值为真，则返回表达式 1
- 如果第一个表达式的值为假，则返回表达式 2

```javascript
console.log(123 || 456); // Output: 123
console.log(0 || 456);   // Output: 456
console.log(123 || 456 || 789);  // Output: 123
```

```javascript
var num = 0;
console.log(123 || num++);
// 先返回在加，相当于 (123 || 0)
console.log(num);    // Output:  123
```



#### 运算符优先级

- 一元运算符里面的**逻辑非**优先级很高
- **逻辑与** 比 **逻辑或** 优先级高

| 优先级 | 运算符     | 顺序                      |
| ------ | ---------- | ------------------------- |
| 1      | 小括号     | `()`                      |
| 2      | 一元运算符 | `++ -- ！`                |
| 3      | 算数运算符 | `先 * / 后 + -`           |
| 4      | 关系运算符 | `> >= < <=`               |
| 5      | 相等运算符 | `== != === !==`           |
| 6      | 逻辑运算符 | `先 && 后 ||（先与后或）` |
| 7      | 赋值运算符 | `=`                       |
| 8      | 逗号运算符 | `，`                      |



### 2.4 控制流程语句

#### 分支结构

JS 语言提供了两种分支结构语句：if 语句和 switch 语句



#### if判断

**if 语句**

```javascript
var a = 1;
if (a==1) {
    console.log('a等于1');
}
```



**if else 语句**

```javascript
var a = 1;
if (a==1) {
    console.log('a等于1');
}
else{
    console.log('a不等于1');
}
```



**if else if 语句**

```javascript
var a = 1;
if (a==1) {
    console.log('a等于1');
}
else if(a==0){
    console.log('a等于0');
}
else{
    console.log('a不等于1和0');
}
```



**三元表达式**

语法结构 : `表达式 1 ? 表达式 2 : 表达式 3`

如果表达式 1 为 true，则返回表达式 2 的值,如果表达式 1 为 false，则返回表达式 3 的值

```javascript
var age = 19;
var accessAllowed = age > 18 ? true : false;
console.log(accessAllowed);
// Output:  true
```



#### switch条件

- switch 括号内可以是表达式或值， 通常是一个变量
- case 后跟一个选项的表达式或值，后面跟一个冒号
- 如果存在匹配**全等**(===) ，则与该 case 关联的代码块会被执行，并在遇到 break 时停止，整个 switch 语句代码执行结束。
- 如果所有的 case 的值都和表达式的值不匹配，则执行 default 里的代码
- 执行 case 里面的语句时，如果没有 break，则继续执行下一个 case 里面的语句

```javascript
var a = 1;
switch(){
  case 0:
     console.log('a等于0');
     break;
  case 1:
     console.log('a等于1');
     break;
  default:
     console.log('a不等于1和0');
}
```





#### 循环

**for 循环**

在程序中，一组被重复执行的语句被称之为**循环体**，能否继续重复执行，取决于循环的**终止条件**。

由循环体及循环的终止条件组成的语句，被称之为**循环语句**

```javascript
for(var a = 1; a<10; a++)
{
   console.log('a在循环');
}
```



**双重 for 循环**

循环嵌套是指在一个循环语句中再定义一个循环语句的语法结构。

> 提示：
>
> - 内层循环可以看做外层循环的语句
> - 内层循环执行的顺序也要遵循 for 循环的执行顺序
> - 外层循环执行一次，内层循环要执行全部次数

```javascript
for(var a = 1; a<10; a++)
{
   for(var i = 1; i<a; i++)
    console.log('a在循环');
}
```



**while 循环**

- 先执行条件表达式，如果结果为 true，则执行循环体代码；如果为 false，则退出循环，执行后面代码
- 执行循环体代码
- 循环体代码执行完毕后，程序会继续判断执行条件表达式，如条件仍为 true，则会继续执行循环体，直到循环条件为 false 时，整个循环过程才会结束

> 注意：
>
> - 使用 while 循环时一定要注意，它必须要有退出条件，否则会称为死循环
> - while 循环和 for 循环的不同之处在于 while 循环可以做较为复杂的条件判断，比如判断用户名和密码

````javascript
var a = 1;
while(a<10){
   console.log('a在循环');
   a++
}
````



**continue 关键字**

continue 关键字用于立即跳出本次循环，继续下一次循环。

```javascript
for (var i = 1; i <= 5; i++) {
 if (i == 3) {
     console.log('这个包子有虫子，扔掉');
     continue; // 跳出本次循环，跳出的是第3次循环 
  }
  console.log('我正在吃第' + i + '个包子呢');
}
```



**break 关键字**

break 关键字用于立即跳出整个循环。

```javascript
for (var i = 1; i <= 5; i++) {
   if (i == 3) {
       break; // 直接退出整个for 循环，跳到整个for下面的语句
   }
   console.log('我正在吃第' + i + '个包子呢');
 }

```



## 三、JS 进阶知识

### 3.1 函数和作用域

#### 函数

函数：就是封装了一段**可被重复调用执行的代码块**。通过此代码块可以实现大量代码的重复使用。



**函数的声明**

**function 命令（命名函数）**

利用函数关键字 function 自定义函数方式。

- 因为有名字，所以也被称为命名函数
- 调用函数的代码既可以放到声明函数的前面，也可以放在声明函数的后面

```javascript
//声明函数
function eat(){
     console.log('我爱吃苹果')
}

// 调用  
eat();  
```



**函数表达式（匿名函数）**

- 因为函数没有名字，所以也称为匿名函数
- 这个 fn 里面存储的是一个函数
- 函数调用的代码必须写到函数体后面

```javascript
// 这是函数表达式写法，匿名函数后面跟分号结束
var eat = function(){
    console.log('我爱吃苹果')
};

// 调用的方式，函数调用必须写到函数体下面
eat();
```



**函数的参数**

参数的作用: 在函数内部某些值不能固定，我们可以通过参数在调用函数时传递不同的值进去

| 参数 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| 形参 | 形式上的参数，函数定义的时候，传递的参数，当前并不知道是什么 |
| 实参 | 实际上的参数，函数调用的时候，传递的参数，实参是传递给形参的 |

```javascript
// 带参数的函数声明
function eat(fruit, vegetable) { // 可以定义任意多的参数，用逗号分隔
  console.log('我爱吃'+fruit+'和'+vegetable)
}


// 带参数的函数调用
eat('苹果','西红柿'); 
// Output: 我爱吃苹果和西红柿
```



形参和实参个数不匹配

注意：在 JavaScript 中，形参的默认值是 undefined

| 参数个数             | 说明                                 |
| -------------------- | ------------------------------------ |
| 实参个数等于形参个数 | 输出正确结果                         |
| 实参个数多于形参个数 | 只取到形参的个数                     |
| 实参个数小于形参个数 | 多的形参定义为 undefined，结果为 NaN |

```javascript
function sum(num1, num2) {
    console.log(num1 + num2);
}
sum(100, 200);
// 形参和实参个数相等，输出正确结果

sum(100, 400, 500, 700);
// 实参个数多于形参，只取到形参的个数

sum(200);
// 实参个数少于形参，多的形参定义为undefined，结果为NaN
```



**函数的返回值**

return 语句

- 在使用 return 语句时，函数会停止执行，并返回指定的值
- 如果函数没有 return ，返回的值是 undefined
- return 只能返回一个值。如果用逗号隔开多个值，以最后一个为准

```js
// 声明函数
function eat(){
    return '苹果';
}

// 调用函数
var fruit = eat();
console.log(fruit);    
// 可以用变量接收函数的返回值
```



**arguments 的使用**

当我们不确定有多少个参数传递的时候，可以用 arguments 来获取。

在 JavaScript 中，arguments 实际上它是当前函数的一个内置对象。

所有函数都内置了一个 arguments 对象，arguments 对象中存储了传递的所有实参。

- arguments存放的是传递过来的实参
- arguments 展示形式是一个伪数组，因此可以进行遍历。伪数组具有以下特点
  - 具有 length 属性
  - 按索引方式储存数据
  - 不具有数组的 push , pop 等方法


```javascript
// 函数声明
function fn() {
    console.log(arguments);  //里面存储了所有传递过来的实参
    console.log(arrguments.length); // 3
    console.log(arrguments[2]); // 3
}

// 函数调用
fn(1,2,3);
```





#### 作用域

限定变量的**可用性的代码范围**就是这个名字的**作用域**。

作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

JavaScript (ES6 前) 中的作用域有两种：

**全局变量**

在全局作用域下声明的变量叫做全局变量（在函数外部定义的变量）

- 全局变量在代码的任何位置都可以使用
- 在全局作用域下 var 声明的变量 是全局变量
- 特殊情况下，在函数内不使用 var 声明的变量也是全局变量（不建议使用）



**局部变量**

在局部作用域下声明的变量叫做局部变量（在函数内部定义的变量）

- 局部变量只能在该函数内部使用
- 在函数内部 var 声明的变量是局部变量
- 函数的形参实际上就是局部变量



*区别*

- 全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存
- 局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间



**作用域链**

1. 只要是代码，就至少有一个作用域
2. 写在函数内部的叫局部作用域
3. 如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域
4. 根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链
5. 作用域链：采取**就近原则**的方式来查找变量最终的值。

```javascript
// 作用域链: 内部函数访问外部函数的变量，采取的是链式查找的方式来决定取哪个值，这种结构我们称为作用域链表

var num = 10;
funtion fn() { //外部函数
    var num = 20;
    
    function fun() { //内部函数
        console.log(num);  // 20 ,一级一级访问
    }
}
12345678910
```



#### 预解析

JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。JavaScript 解析器在运行 JavaScript 代码的时候分为两步：预解析和代码执行。

- 预解析：js 引擎会把 js 里面所有的 var 还有function 提升到当前作用域的最前面
- 代码执行：从上到下执行 JS 语句



预解析只会发生在通过 var 定义的变量和 function 上。学习预解析能够让我们知道为什么在变量声明之前访问变量的值是 undefined，为什么在函数声明之前就可以调用函数。



**变量预解析(变量提升)**

变量的声明会被提升到当前作用域的最上面，变量的赋值不会提升

```javascript
console.log(num);
var num = 10;   
// undefined

//相当于执行了以下代码
var num; // 变量声明提升到当前作用域最上面
console.log(num);
num = 10; // 变量的赋值不会提升
```



**函数预解析(函数提升)**

函数的声明会被提升到**当前作用域**的最上面，但是不会调用函数。

```javascript
fn();				
//11

function fn() {
    console.log('11');
}
```



解决函数表达式声明调用问题

匿名函数的调用必须写在函数声明的下面

```javascript
// 匿名函数(函数表达式方式):若我们把函数调用放在函数声明上面
fn();
var  fn = function() {
    console.log('22'); // 报错
}


//相当于执行了以下代码
var fn;
fn(); //fn没赋值，没这个，报错
var  fn = function() {
    console.log('22'); //报错
}
```



### 3.2 面向对象编程

面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

- 对象是单个实物的抽象。
- 对象是一个容器，封装了属性（property）和方法（method）。



**生成对象**

JS 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。



构造函数的特点

- 构造函数就是一个普通的函数，但具有自己的特征和用法
- 函数体内部使用了`this`关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用`new`命令。
- 构造函数名字的第一个字母通常大写。



```javascript
var Vehicle = function () {
  this.price = 1000;
};
```



#### `new`命令

`new`命令的作用，就是执行构造函数，返回一个实例对象。

```javascript
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```



**new 命令的原理**

使用`new`命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。



使用`Object.create()`方法可以对象作为模板，生成新的实例对象。

```javascript
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```



**this**

- `this`都有一个共同点：它总是返回一个对象。
- `this`就是属性或方法“当前”所在的对象。



使用场合

全局环境

全局环境使用`this`，它指的就是顶层对象`window`。

```javascript
this === window // true

function f() {
  console.log(this === window);
}
f() // true
```



构造函数

构造函数中的`this`，指的是实例对象。

```javascript
var Obj = function (p) {
  this.p = p;
};
var o = new Obj('Hello World!');
o.p // "Hello World!"
```



对象的方法

如果对象的方法里面包含`this`，`this`的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变`this`的指向。

```javascript
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj

// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window
```



使用注意点

- 避免多层 this

- 避免数组处理方法中的 this

- 避免回调函数中的 this



### 3.3 [ES6 新增特性](../es6/README.md)

### 3.4 异步编程

## 四、JS 对象

#### 对象

在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

对象是由属性和方法组成的：

- 属性：事物的特征，在对象中用属性来表示（常用名词）
- 方法：事物的行为，在对象中用方法来表示（常用动词）



**创建对象**

在 JavaScript 中，现阶段我们可以采用三种方式创建对象（object）：

1. 利用字面量创建对象
2. 利用 new Object 创建对象
3. 利用构造函数创建对象



利用字面量创建对象

对象字面量：就是花括号 `{ }` 里面包含了表达这个具体事物（对象）的属性和方法

`{ }` 里面采取键值对的形式表示

- 键：相当于属性名
- 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）

```js
// 多个属性或者方法中间用逗号隔开
// 方法冒号后面跟的是一个匿名函数
var star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi : function(){
        alert('大家好啊~');
    }
};

// 调用名字属性
console.log(star.name)
// 调用名字属性
console.log(star['name'])
// 调用 sayHi 方法
star.sayHi();
```



变量、属性、函数、方法总结

- 变量：单独声明赋值，单独存在
- 属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征
- 函数：单独存在的，通过“函数名()”的方式就可以调用
- 方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调用，方法用来描述该对象的行为和功能。



利用 new Object 创建对象

`var 对象名 = new Object();`

```js
var obj = new Object(); //创建了一个空的对象
obj.name = '张三丰';
obj.age = 18;
obj.sex = '男';
obj.sayHi = function() {
    console.log('hi~');
}

//1.我们是利用等号赋值的方法添加对象
//2.每个属性和方法之间用分号结束
console.log(obj.name);
console.log(obj['sex']);
obj.sayHi();
```



利用构造函数创建对象

**构造函数** ：是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

在 js 中，使用构造函数要时要注意以下两点：

- 构造函数用于创建某一类对象，其首字母要大写
- 函数内的属性和方法前面需要添加 this ，表示当前对象的属性和方法。
- 构造函数中不需要 return 返回结果。
- 当我们创建对象的时候，必须用 new 来调用构造函数。

```js
function Star(uname,age,sex) {
    this.name = uname;
    this.age = age;
    this.sex = sex;
    this.sing = function(sang){
        console.log(sang);
    }
}
var ldh = new Star('刘德华',18,'男');
console.log(typeof ldh) 
// object对象，调用函数返回的是对象

console.log(ldh.name);
console.log(ldh['sex']);
ldh.sing('冰雨');
```



**new 关键字**

new 在执行时会做四件事:

1. 在内存中创建一个新的空对象。
2. 让 this 指向这个新的对象。
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象（所以构造函数里面不需要 return）



遍历对象的属性

- `for...in` 语句用于对数组或者对象的属性进行循环操作

语法中的变量是自定义的，它需要符合命名规范，通常我们会将这个变量写为 k 或者 key。

```js
for(var k in obj) {
    console.log(k);		//这里的 k 是属性名
    console.log(obj[k]);//这里的 obj[k] 是属性值
}
1234
var obj = {
    name: '秦sir',
    age: 18,
    sex: '男',
    fn:function() {};
};
console.log(obj.name);
console.log(obj.age);
console.log(obj.sex);

//for in 遍历我们的对象
//for (变量 in 对象){}
//我们使用for in 里面的变量 我们喜欢写k 或者key
for(var k in obj){
    console.log(k); // k 变量 输出得到的是属性名
    console.log(obj[k]); // obj[k] 得到的是属性值
}
```



#### 内置对象

- JavaScript 中的对象分为 3 种：自定义对象 、内置对象、 浏览器对象
- 内置对象就是指 JS 语言自带的一些对象，这些对象供开发者使用，并提供了一些常用的或是最基本而必要的功能
- JavaScript 提供了多个内置对象：Math、 Date 、Array、String 等



### 4.1 Object 对象

### 4.2 Array 对象

数组(Array)是指一组数据的集合，其中的每个数据被称作元素，在数组中可以存放任意类型的元素。数组是一种将一组数据存储在单个变量名下的优雅方式。

```javascript
//普通变量一次只能存储一个值
var num = 10;
//数组一次可以存储多个值
var arr =[1,2,3,4,5];
```

|             |                                  |      |
| ----------- | -------------------------------- | ---- |
| fill        | 填充数组元素                     | 会   |
| push        | 在末端添加一个元素。             | 会   |
| pop         | 在首端添加一个元素或多个元素。   | 会   |
| shift       | 删除数组首端的一个元素。         | 会   |
| unshift     | 从末端删除一个元素。             | 会   |
| splice      | 添加、删除、替换数组中的元素     | 会   |
| **`split`** | 将字符串分割为数组。             |      |
| slice       | 从数组中截取部分元素组合成新数组 | 不会 |
| join        | 将数组转换为字符串。             | 不会 |
| concat      | 连接多个数组。                   | 不会 |
| reverse     | 反转数组顺序                     |      |
| sort        | 使用排序函数从大到小排序         |      |





**数组的创建**

JavaScript 中创建数组有两种方式：

- 利用 new 创建数组
- 利用数组字面量创建数组



```javascript
// 利用 new 创建数组
var arr = new Array(); // 创建一个新的空数组

// 利用数组字面量创建数组
// 利用数组字面量方式创建空的数组 
var arr = [];
// 使用数组字面量方式创建带初始值的数组
var arr = ['小白','小黑','小黄','瑞奇'];
// 数组中可以存放任意类型的数据，例如字符串，数字，布尔值等
var arr = ['小白'，12,true,28.9];
```



**数组的索引**

索引 (下标) ：用来访问数组元素的序号（数组下标从 0 开始）。

```javascript
//定义数组
var arr = [1,2,3];
//获取数组中的第2个元素
alert(arr[1]);
```



**遍历数组**

我们可以通过`for`循环索引遍历数组中的每一项

```javascript
// 数组索引访问数组中的元素
var arr = ['red', 'green', 'blue'];
console.log(arr[0]) // red
console.log(arr[1]) // green
console.log(arr[2]) // blue

// for循环遍历数组
var arr = ['red','green', 'blue'];
for (var i = 0; i < arr.length; i++){
    console.log(arrStus[i]);
}
```



使用`forforEach()`函数遍历数组中的每一项

```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```



**数组的长度**

使用`length`函数可以访问数组元素的数量（数组长度）

> **注意**：
>
> - 此处数组的长度是数组元素的个数，不要和数组的索引混淆
> - 当我们数组里面的元素个数发生了变化，这个 length 属性跟着一起变化

```javascript
var arr = [1,2,3];
console.log(arr.length);  // 3
```



**数组中添加元素**

通过修改`length` 长度新增数组元素

- 可以通过修改 `length` 长度来实现数组扩容的目的
- 访问通过修改 `length` 实现扩容的索引的值为 `undefined`
- `length` 属性是可读写的

```javascript
var arr = ['red', 'green', 'blue', 'pink'];
arr.length = 7;
console.log(arr);
console.log(arr[4]);
console.log(arr[5]);
console.log(arr[6]);
```



通过修改数组索引新增数组元素 （常用）

- 可以通过修改数组索引的方式追加数组元素
- 不能直接给数组名赋值，否则会覆盖掉以前的数据

```javascript
var arr = ['red', 'green', 'blue', 'pink'];
arr[4] = 'hotpink';
console.log(arr);
```



使用 `push()` 函数

使用 `push()` 函数在数组的末端追加一个或多个元素，并返回添加新元素后的数组长度。

```javascript
var arr = [];

arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]
```

使用`unshift()`函数

使用`unshift()`函数用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。

```javascript
var a = ['a', 'b', 'c'];

a.unshift('x'); // 4
a // ['x', 'a', 'b', 'c']
```



数组合并

`concat`函数用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

```javascript
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]
```



**删除指定数组元素**

使用`pop()`函数用于删除数组的最后一个元素，并返回该元素。

```javascript
var arr = ['a', 'b', 'c'];

arr.pop() // 'c'
arr // ['a', 'b']
```



使用`shift()`函数用于删除数组的第一个元素，并返回该元素。

```
var a = ['a', 'b', 'c'];

a.shift() // 'a'
a // ['b', 'c']
```



`splice()`函数用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。

```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
```



**数组反转**

`reverse`函数用于颠倒排列数组元素，返回改变后的数组。注意，该函数将改变原数组。

```javascript
var a = ['a', 'b', 'c'];

a.reverse() // ["c", "b", "a"]
a // ["c", "b", "a"]
```



**截取数组**

`slice()`函数用于提取目标数组的一部分，返回一个新数组，原数组不变。

```javascript
arr.slice(start, end);
```



**数组排序**

`sort`函数对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

```javascript
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
```



### 4.3 Math 对象



- Math 和其他的对象不同，它不是一个构造函数，不需要创建对象。
- Math 属于一个工具类，里面封装了数学运算相关的属性和方法。



Math 对象的方法

| 方法              | 描述                    |
| :---------------- | :---------------------- |
| Math.PI           | 圆周率                  |
| Math.abs()        | **返回绝对值**          |
| Math.floor()      | **向下取整**（向小取）  |
| Math.ceil()       | **向上取整**（向大取）  |
| Math.round()      | 四舍五入取整            |
| Math.random()     | 生成 [0-1) 之间的随机数 |
| Math.max(x, y, z) | 返回多个数中的最大值    |
| Math.min(x, y, z) | 返回多个数中的最小值    |
| Math.pow(x,y)     | 返回 x 的 y 次幂        |
| Math.sqrt()       | 对一个数进行开方运算    |



```javascript
// Math.ceil  天花板函数  ,向上取整
console.log(Math.ceil(2.3)); // 3
// 注意负数的使用
console.log(Math.ceil(-2.3)); // -2

// Math.floor()  地板函数  向下取整
console.log(Math.floor(2.9)); // 2

console.log(Math.max(2, 3, 5, 7)); // 7
console.log(Math.min(2, 3, 5, 7)); // 2

// random()  范围 [0,1)
console.log(Math.random());
// 随机 0-99 范围
console.log(Math.floor(Math.random() * 100));
// 随机 5-10 范围
// Math.floor(Math.random()*数量 + min)
console.log(Math.floor(Math.random() * 6 + 5));

console.log(Math.pow(3, 4));
console.log(Math.pow(3, 300000000000000000));

console.log(10 / 0); // Infinity

// Math.round()
console.log(Math.round(2.4)); // 2
console.log(Math.round(2.5)); // 3
console.log(Math.round(2.499999999999999999999999999)); // 3
console.log(2.999999999999999999999999999 === 3);
```

### 4.4 Date 对象

- Date 对象和 Math 对象不一样，他是一个构造函数，所以我们需要实例化后才能使用
- Date 实例用来处理日期和时间

#### Date对象的创建

**写法一**：表示的是当前代码执行的时间（也可以理解成是获取当前时间对象）

```javascript
var date1 = new Date();
console.log(date1);
```

**写法二**：在参数中传递一个表示时间的字符串（兼容性最强）

```javascript
var date2 = new Date("2023/02/14 09:00:00");
console.log(date2);
```

写法三：（不常用）

```javascript
var date3 = new Date("Mon May 01 2023 12:00:00 GMT+0800 (中国标准时间)");
console.log(date3);
```

写法四：（不常用）

```javascript
var date4 = new Date(2023, 10, 1); //写法四
console.log(date4);
```

#### 获取日期和时间

Date 对象 有如下方法，可以获取日期和时间：

| 方法                | 含义                                     |
| ------------------- | ---------------------------------------- |
| `getDate()`         | 获取日 [1-31]                            |
| `getDay()`          | 获取星期 [0-6]（0 代表周日，1 代表周一） |
| `getMonth()`        | 获取月 [0-11]（0 代表一月）              |
| `getFullYear()`     | 获取年份                                 |
| `getHours()`        | 获取小时 [0-23]                          |
| `getMinutes()`      | 获取分钟 [0-59]                          |
| `getSeconds()`      | 获取秒 [0-59]                            |
| `getMilliseconds()` | 获取毫秒 （1s = 1000ms）                 |
| `getTime()：`       | 获取时间戳                               |



**时间戳**

指的是从格林威治标准时间的`1970年1月1日，0时0分0秒`到当前日期所花费的**毫秒数**（1 秒 = 1000 毫秒）。

计算机底层在保存时间时，使用的都是时间戳。时间戳的存在，就是为了**统一**时间的单位。

**利用时间戳检测代码的执行时间**：

我们可以在业务代码的前面定义 `时间戳1`，在业务代码的后面定义 `时间戳2`。把这两个时间戳相减，就能得出业务代码的执行时间。

**下面的区域以后再来探索吧**

----

## 五、JS DOM 操作

### 5.1 DOM 概述

### 5.2 获取元素和修改元素属性

### 5.3 事件处理和委托

### 5.4 动态创建和删除元素

## 六、JS BOM 操作



## 七、JS 调试技巧

### 7.1 错误类型和 Debugging 工具

#### 断点调试

1. 浏览器中按 F12–> sources -->找到需要调试的文件–>在程序的某一行设置断点(在行数点一下)
2. 刷新浏览器
3. Watch: 监视，通过 watch 可以监视变量的值的变化，非常的常用
4. F11: 程序单步执行，让程序一行一行的执行，这个时候，观察 watch 中变量的值的变化

### 7.2 常见的 JS 错误和解决方法



## 参考三三

- [JS |不凡学院](http://doc.bufanui.com/docs/html-css/html-css-1edq8db77o0f4)
- [JS |后盾人](https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/js/1%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html)
- [JS |网道](https://wangdoc.com/javascript/)
- [JS |菜鸟教程](https://www.runoob.com/js/js-tutorial.html)