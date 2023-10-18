## 一、ES6 简介

### 1.1 什么是 ES6？

ES6是简称，全称是ECMAScript 6.0。由于es6是2015年6月份发布的标准。又可以称之为ECMAScript 2015 或 ES2015。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

### 1.2 ES6 的历史和发展

ES6从开始制定到最后发布，整整用了15年。

1997年发布ECMAScript 1.0

1998年6月发布ECMAScript 2.0

1999年12月发布 ECMAScript 3.0（巨大成功，奠定js的基本语法）

2000年，其实有一个4.0版本，由于激进，没有获得通过。

2009年12月，ECMAScript5.0 版正式发布

2015年6月，ECMAScript 6.0 正式通过，成为国际标准。

ECMA决定：从2015年开始，每一年发布一个新的版本。

2016年6月，小幅修订的《ECMAScript 2016标准》即 ES6.1 版

根据计划，2017年6月发布 ES2017 标准。

还有es6、es7和es8的说法。

> **ES6 既是一个历史名词，也是一个泛指，含义是5.1版以后的 JavaScript 的下一代标准，涵盖了ES2015、ES2016、ES2017等等，有时也泛指“下一代 JavaScript 语言**

### 1.3 ECMAScript和JavaScript的关系

> ECMAScript是一个语言标准。JavaScript则是这个语言标准的一个具体实现。在浏览器环境中的具体实现。
> 比如，微软的Jscript。Flash中的ActionScript，服务器端的node。

> JavaScript通常是指浏览器的ECMAScript的实现，除了有ECMAScript语法之外，还有浏览器相应的接口，比如documnet.getElmentById。



## 二、let 和 const 声明变量

### 2.1 使用 let 声明变量

let的作用，和var是类似的。**是用来声明变量的**

let声明的变量有一些特性：

- 块作用域
- 不能声明提前
- 在同一个块作用域中，不允许重复声明变量
- 暂时性死区

```javascript
let a=200;
console.log(a); // 200

a=400;
console.log(a); // 400
// 从这个层面来讲，和var是一样的效果
```



### 2.2 使用 const 声明变量

const 是用于定义**常量**的。const 定义的常量是**不能修改**的。

```javascript
const PI=3.1415926;
console.log(PI);
PI=3.14; // 报错
console.log(PI)
```

- 不存在声明提前
- 只在当前的块级作用域内有效
- 不能重复声明
- 存在暂时性死区

对于引用数据类型，不能直接修改指向，但是可以修改属性

```javascript
const person = {
    name:'lucky',
    age:20,
    address:'中山西路666号'
}
person = {}; //报错
person.age=21; // 允许
console.log(person);
```

实际上，我们说const真正不变的是常量保存的内容。如果是基本数据类型，就是值。如果是引用数据类型，就是指对象的地址，地址不变就ok。

使用建议

如果这个值需要变化，就使用let。

如果这个值不会变化，就使用const

### 2.3 块级作用域

es5作用域的问题

内层变量可能会覆盖外层变量。

用来计数的循环变量泄露为全局变量。



在es5中，变量的作用域只有两种：

- 全局作用域: 全局变量
- 函数作用域: 局部变量

es6 则提供了块作用域的用法，一般{}围起来的就是一个代码块。

ES6 允许块级作用域的任意嵌套。

内层作用域可以定义外层作用域的同名变量。



```js
{
    let b = 20;
    var c = 30;
    console.log(b); // 20
    console.log(c); // 30
}
console.log(c); // 30
console.log(b); // ReferenceError: b is not defined.
//
// 在进行for循环时，使用let来声明计数器变量，如下:
for (let i = 0; i < 10; i++) {
         //.......      
 }    
 // 使用let声明的变量，只在当前块有效果
 console.log(i); // ReferenceError: i is not defined
 // 此处说明，这个i并不是一个全局变量，而是块级变量。
```

不能声明提前

```javascript
{
    console.log(s);
    let  s = "let es6"
    console.log(s)
}
```

不能重复声明

在同一个块级作用域中，不能重复声明

```js
{
    let a=100;
    let a=200;
    console.log(a);
}
```

在不同的作用域中，我们是可以声明的。
```
let a=400;  //全局的
console.log(a);
{
    let a=100;  //块级的
    console.log(a);
}    
```

暂时性死区–(面试)

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“**暂时性死区**”,temporal dead zone。

```js
var tmp = 123;

if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp = 456;
}
```

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

```javascript
var tmp = 'hello';
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束 (在这之前 tmp 不可用，有全局变量 tmp 也不行)
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

## 三、解构赋值

### 3.1 什么是解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。包括：**数组、对象、函数参数**、字符串、数值和布尔值。null和undefined不行。在实际开发时，真正使用比较多的是**数组、对象和函数参数的解构**。

解构赋值，可以理解为变量的取出，并赋值给新变量。为这样的操作提供了一种简便语法。



解构赋值允许指定默认值。

```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

上面代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。上面的代码其实等价于下面的代码。

```
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

上面最后一个表达式之所以会报错，是因为`x`用`y`做默认值时，`y`还没有声明。



### 3.2 字符串解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

### 3.3 数组解构赋值

可以从数组中提取值，`按照对应位置`，对变量赋值。本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。如果解构失败，变量的值等于undefined。

```js
let arr = [1, 2, 3];
// 有这样的需求
// let a = arr[0];
// let b = arr[1];
// let c = arr[2];

// 使用解构赋值可以快速实现
let [a, b, c] = arr;
console.log(a, b, c); // 1,2,3

let [foo, bar, baz] = [1, 2, 3];
// foo  1
// bar  2
// baz  3

let [x, , y] = [1, 2, 3];
// x  1
// y  3

let [x, y, z] = ['a'];
// x  'a'
// y  undefined
// z  undefined
```

### 3.4 对象解构赋值

解构不仅可以用于数组，还可以用于对象。对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，**变量必须与属性同名，才能取到正确的值**。如果解构失败，变量的值等于undefined。

```js
let breakfast = {
    bread: "早餐面包",
    fruit: "apple",
    egg: "鸡蛋"
}
// 想要将 对象中的 属性值取出，并赋值给某些变量
// let a = breakfast.bread;
// let b = breakfast.fruit;

// 使用解构赋值
let {
    bread: a,
    fruit: b,
    egg: c
} = breakfast;
console.log(a, b, c); // '早餐面包','apple','鸡蛋'

let {
    // 属性名: 属性值变量
    bread:bread,
    fruit:fruit,
    egg:egg
} = breakfast;
// 相当于 let bread = breakfast.bread; 取出 breakfast的bread属性,并赋值给变量 bread

console.log(bread, fruit, egg); // '早餐面包','apple','鸡蛋'

// 属性名 和 保存属性值的变量名 一样时, 对象可以简写
//let {
//    bread,
//    fruit,
//    egg
//} = breakfast;
```

我们常用到的后台数据请求

```javascript
function getmovie(){
    $.ajax({
        url:'http://bufantec.com/api/douban/movie/top250',
        success(res){
            console.log(res);
            const {data:result}=res;
            console.log(result); // 将 res.data 取出 赋值给了 result
        }
    })
}
getmovie();
```

### 3.5 函数参数的解构赋值

> 函数的参数也可以使用解构赋值

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
// 相当于 形参[x, y] = [1, 2], 数组的解构赋值语法
function move({x, y}) {
  return [x, y];
}
move({x: 3, y: 8});
// 相当于 形参{x, y} = {x: 3, y: 8} , 对象的解构赋值语法
// 取出实参当中的x属性值,  赋值给 形参变量 x
```

### 3.6 解构赋值用途

变量的解构赋值用途很多。

**（1）交换变量的值**

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

**（2）从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

**（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

**（4）提取 JSON 数据**

解构赋值对提取 JSON 对象中的数据，尤其有用。

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

**（5）函数参数的默认值**

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

**（6）遍历 Map 结构**

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

**（7）输入模块的指定方法**

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 四、字符串扩展

### 4.1 什么是模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。



上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用\反斜杠转义。

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

模板字符串甚至还能嵌套。

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 传统写法为
// 'User '
// + user.name
// + ' is not authorized to do '
// + action
// + '.'
`User ${user.name} is not authorized to do ${action}.`
```

模板字符串中嵌入变量，需要将变量名写在`${}`之中。

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。模板字符串之中还能调用函数。

由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。

```javascript
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"


function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar

`Hello ${'World'}`
// "Hello World"
```

### 3.2 字符串新增方法

#### 1.2.1 padStart()，padEnd()

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。
- `repeat`方法返回一个新字符串，表示将原字符串重复`n`次。
- 它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
- `at()`方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。

> ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

> 上面代码中，padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。



### 3.3 模板字符串的高级用法

## 五、函数扩展

### 5.1 箭头函数

ES6 允许使用 **“箭头”（=>）**定义函数。箭头函数是函数的简化。

```javascript
var fn = function(a){
    console.log(a);
}

//1.关键字 function 简化为 =>
// 参数部分依然使用 () 包裹
var fn = (a) => {
    console.log(a);
}
//2.简化参数  当参数有且只有一个的时候,()可以省略
var fn = a => {
    console.log(a);
}
//3.函数体 当函数体只有一行语句的时候可以省略{}
var fn = a => console.log(a);

fn(50);

//4.函数体中 只有一句return语句时可以省略{}和return
var f = v => v;
// 等同于
var f = function (v) {
    return v;
};
```

**箭头函数更加简洁**

```js
// 普通函数写法
var result = arr.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = arr.sort((a, b) => a - b);

setTimeout(() => {
    console.log('2s之后打印')
},2000)
```



箭头函数的特点

- 箭头函数没有arguments
- 箭头函数没有自己的this,指向外部的this
- 箭头函数不能当构造函数使用

> 有关于this指向的函数不建议使用箭头函数。

```js
var name="李白";
var obj={
    name:'张三',
    age:12,
    say:()=>{
        setTimeout(()=>{
            console.log(this.name);
        },500)
    }
}

obj.say();
```

### 5.2  rest 参数(剩余参数)

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

在函数的小括号汇总使用 `...参数名`，表示除去匹配已知形参外其它所有实参的集合，是一个数组，当没有形参的时候它就是`arguments` 的数组形式。

> 注意：剩余参数只能写在参数的末尾。

```js
function fn(a, b, ...args){
    console.log(args);
}
fn(1,2); // []
fn(1,2,3,4,5); // [3,4,5]
```

### 5.3 函数参数的默认值

参数变量是默认声明的，所以不能用`let`或`const`再次声明。

在ES6之前，不能直接为函数的参数指定默认值，只能采取变通的方法。

```js
function fn(x, y){
    y = y || 'world';
    console.log(x, y);
}
fn('hello'); //hello world

// es6 写法
//函数的默认值一般写在最右边
function foo(x , y = "world"){
    console.log(x, y);
}
foo('hello'); //hello world
```



## 六、数组扩展

### 6.1 扩展运算符

扩展运算符（spread）是三个点（…）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

该运算符主要用于函数调用。

```js
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42 
// 将 该数组 变成参数序列, 分别赋值给了 x,y
```

用于合并数组

```js
var arr1 = [1, 2]
var arr2 = [3, 4];
var newArr = [...arr1, ...arr2];
console.log(newArr) // [1,2,3,4]
```

用于合并对象

```js
var user = {
    name: '张三',
    age: 24
}
var obj = {
    course: '前端开发',
    room: '开发05',
    skill() {
        console.log('coding');
    },
    ...user
}
```

### 6.2 数组新方法

|               |                                                              |      |
| ------------- | ------------------------------------------------------------ | ---- |
| Array.isArray | 判断某个数据是否是数组 返回布尔值                            |      |
| Array.from    | 用于将`类数组对象`转为真正的数组(类数组对象比如arguments)    |      |
| Array.of      | 将一组值转换为数组                                           |      |
| find          | 用于找出`第一个符合条件的数组成员`。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出`第一个返回值为true`的成员，然后返回该成员。`如果没有符合条件的成员，则返回 undefined`。 |      |
| findIndex     | findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的下标，如果所有成员都不符合条件，则返回-1。 |      |
| every         | **every**是对数组中每一项运行给定函数，如果该函数对每一项返回true，则返回true。有任意一项返回false，则返回false。 |      |
| some          | **some**是对数组中每一项运行给定函数，如果该函数对任意一项返回true，则返回true。如果对每一项都返回false，才会返回false。 |      |
| includes      | includes 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则 false。 |      |

```js
 function fun(a,b){
    console.log(Array.isArray(arguments));  //false 伪数组
}
fun(2,3)

function fn(a, b){
    console.log(arguments) //Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    var arr = Array.from(arguments);//
    arr.push(3);
}
fn(1,2)

let arr1 = Array.of(3); // [3]
let arr2 = Array.of(3, 5); // [3, 5]
let arr3 = Array.of("3", "html"); // ['3', 'html']
console.log(arr1, arr2, arr3);

find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
var ele = [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
}) 
console.log(ele) // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}) // 2 索引


var arr = [ 1, 2, 3, 4, 5, 6 ];

console.log( arr.some( function( item, index, array ){ 
    return item > 3;
}));   // true  有>3 的元素

console.log( arr.every( function( item, index, array ){ 
    return item > 3;
}));  // false 并不是每一个都>3

[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

### 6.3 forEach

用**于遍历数组，对数组中的每一个元素进行某个操作**。没有返回值，也不需要返回值。

```javascript
数组.forEach（function（value，index，arr）{
    // 代码
}）
```

参数要求:

- value就是数组元素
- index，就是元素对应的索引
- arr就是表示当前数组，这个不常用

foreach 相当于 for循环 对数据进行 **遍历**

```javascript
var arr=[1,2,3,4,'html','css','js'];

arr.forEach(function(el,index){
    console.log(el); //1,2,3,4,'html','css','js'
    console.log(index);//0,1,2,3,4,5,6,7
})
//箭头函数的写法
arr.forEach(el => console.log(el+1));
//结果:
//2,3,4,5,'html1','css1','js1'
```

### 6.4 map

对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。对数据进行操作 返回 新的数据

```javascript
数组.map（function（value，index，arr）{
    // 代码
}）
```

参数含义和forEach一致。

```js
var list = [1,2,3,4];
var newList = list.map(ele =>{
    return ele*2
});
console.log(list,newList) // [1,2,3,4] [2,4,6,8]
```

注意:

- 在回调函数中，一定要使用return返回
- map方法调用之后，会返回一个全新的数组，原来的数组不变。

### 6.5 filter

**就是用于进行过滤，筛选出符合条件的元素，组成一个新的数组返回**。

```
数组.filter（function（value，index，arr）{
    // 代码
}）
```

参数 和 map方法一样。过滤出符合回调函数条件的所有元素。原数组不变。

```js
//(1)
var list = [1,2,3,4];
var newList = list.filter(ele => ele > 2);
console.log(list,newList) // [1,2,3,4] [3,4]

//(2)需求 大于10 的项 筛选
var arr1=[2,34,5,67,89,34];
var newArr2=arr1.filter(function(el,index){
    return el > 10;
})
console.log(newArr2);

//(3)筛选出含有宝的车
var cars=["宝马","大众","卡迪拉克","宝骏","传奇","奥迪","小鹏","特斯拉","宝时捷"];
var newcar=cars.filter(el=>el.includes("宝"));
console.log(newcar);
```

### 6.6 reduce

将**前一项**和**后一项**的值进行运算，返回累积的结果

```javascript
数组.reduce（function（prev，next）{...}）
```

回调函数中 prev表示前一项，next表示后一项。默认情况下，会把数组的第一个元素作为prev的初始值。每循环一次，把累积的结果赋给prev，next就变为下一个数组元素

```js
var arr = [10,22,23,25,50];
const total = arr.reduce(function(prev, next){
    console.log(prev + "----" + next);
    return prev + next;
})
console.log(total);
```

实际上，reduce方法还有第二个参数，***如果传递了第二个参数，就作为prev的初始值\***。同时next就是数组的第一个元素。

```js
let total = arr.reduce(function(prev,next){
    console.log(pre + "----" + next);
    return prev + next;
},100)
console.log(total);
```

## 七、对象扩展



### 7.1 对象的简洁表示

当对象的属性名与代表属性值的变量名一致的时候可以只写属性名

```js
var school = "不凡学院";
var course = "UI & H5";
var obj = {
    // school: school
    // course: course
    school,
    course
}
console.log(obj); // { school: "不凡学院", course: "UI & H5"}
```

对象属性值为函数的时候可以简写

```js
var obj = {
    sayName: function(){
        console.log("obj");
    }
    sayHello(){
        console.log("hello");
    }
}
obj.sayName(); // obj
obj.sayHello(); // hello
```

### 7.2 对象新方法



|                  |                                                              |      |
| ---------------- | ------------------------------------------------------------ | ---- |
| Object.assign    | 用于`对象的合并`，将源对象（source）的所有可枚举属性，复制到目标对象（target）。 |      |
| Object.keys()    | 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。 |      |
| Object.values()  | 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。 |      |
| Object.entries() | 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。 |      |

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。`Object.assign`有返回值 返回值是目标对象(target)

```js
let target = { a: 1 };
let source1 = { b: 2 };
let source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target) // {a:1, b:2, c:3}
```

遇到重复属性，后边的会覆盖前边的。该方法返回值就是合并之后的对象。经常使用该方法实现对象的浅拷贝。

```js
let obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]

let obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]

let obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```



### 7.3 属性遍历

ES6 一共有 5 种方法可以遍历对象的属性。

**（1）for...in**

`for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

`Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

`Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

`Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

`Reflect.ownKeys`返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

上面代码中，`Reflect.ownKeys`方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性`2`和`10`，其次是字符串属性`b`和`a`，最后是 Symbol 属性。

### 7.4 对象的解构和扩展

#### 解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量`z`是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（`a`和`b`），将它们连同值一起拷贝过来。

由于解构赋值要求等号右边是一个对象，所以如果等号右边是`undefined`或`null`，就会报错，因为它们无法转为对象。

解构赋值必须是最后一个参数，否则会报错。

注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

扩展运算符的解构赋值，不能复制继承自原型对象的属性。



解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

```
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}
```

上面代码中，原始函数`baseFunction`接受`a`和`b`作为参数，函数`wrapperFunction`在`baseFunction`的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

#### 扩展运算符

对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。

```
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```

如果扩展运算符后面是一个空对象，则没有任何效果。

```
{...{}, a: 1}
// { a: 1 }
```

如果扩展运算符后面不是对象，则会自动将其转为对象。

```
// 等同于 {...Object(1)}
{...1} // {}
```

上面代码中，扩展运算符后面是整数`1`，会自动转为数值的包装对象`Number{1}`。由于该对象没有自身属性，所以返回一个空对象。



```
// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
```

但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

对象的扩展运算符，只会返回参数对象自身的、可枚举的属性，这一点要特别小心，尤其是用于类的实例对象时。

```
class C {
  p = 12;
  m() {}
}

let c = new C();
let clone = { ...c };

clone.p; // ok
clone.m(); // 报错
```

上面示例中，`c`是`C`类的实例对象，对其进行扩展运算时，只会返回`c`自身的属性`c.p`，而不会返回`c`的方法`c.m()`，因为这个方法定义在`C`的原型对象上（详见 Class 的章节）。

对象的扩展运算符等同于使用`Object.assign()`方法。

```
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

```
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

上面代码中，写法一的`__proto__`属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。

扩展运算符可以用于合并两个对象。

```
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```

上面代码中，`a`对象的`x`属性和`y`属性，拷贝到新对象后会被覆盖掉。

这用来修改现有对象部分的属性就很方便了。

```
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};
```

上面代码中，`newVersion`对象自定义了`name`属性，其他属性全部复制自`previousVersion`对象。

如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。

```
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
```

与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

```
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```

扩展运算符的参数对象之中，如果有取值函数`get`，这个函数是会执行的。

```
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}

let aWithXGetter = { ...a }; // 报错
```

上面例子中，取值函数`get`在扩展`a`对象时会自动执行，导致报错。

## 八、新数据结构

### 8.1 Set 数据结构

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
let s = new Set(); // Set本身是一个构造函数，用来生成 Set 数据结构。

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x)); // add是set结构中添加数据的方法

// set数据结构 可以使用 for...of 遍历
for (let i of s) {
  console.log(i);
}
// 2 3 5 4  没有重复元素
```

创建 Set

```js
// 方式一
let s = new Set();

// 方式二
// 可以以一个 能够遍历的数组 作为参数
let set = new Set([1, 2, 3, 3, 4, 5, 5]); // Set {1, 2, 3, 4, 5}
console.log(set.size); // 元素个数

let set2 = new Set(document.querySelectorAll('div'));
// 去除数组的重复成员
[...new Set(array)]
Array.from(new Set(array))
```

#### Set 的方法

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员)

|          |                                                |      |
| -------- | ---------------------------------------------- | ---- |
| add()    | 添加某个值，返回 Set 结构本身。                |      |
| delete() | 删除某个值，返回一个布尔值，表示删除是否成功。 |      |
| has()    | 返回一个布尔值，表示该值是否为Set的成员。      |      |
| clear()  | 清除所有成员，没有返回值                       |      |

```js
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2) // true
s.has(2) // false
```



keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

|           |                    |      |
| --------- | ------------------ | ---- |
| keys()    | 返回键名的遍历器   |      |
| values()  | 返回键值的遍历器   |      |
| entries() | 返回键值对的遍历器 |      |

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

forEach()

实例.forEach()：使用回调函数遍历每个成员。（tips：同数组）

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
```

数组的map和filter方法也可以间接用于 Set 。

####  WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用。



弱引用：即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

```js
const ws = new WeakSet(); // 创建方式

const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

// 元素必须都是对象类型
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

方法

实例.add(value)：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身。

实例.delete(value)：清除 WeakSet 实例的指定成员，清除成功返回true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回false。

实例.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo); // false

ws.delete(window); // true
ws.has(window); // false

// WeakSet 没有size属性，没有办法遍历它的成员。
ws.size // undefined
ws.forEach // undefined
```

### 8.2 Map 数据结构

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

#### Map 的创建

方式一

```js
var m = new Map(); // 创建一个 空的 map数据结构
var o = {p: 'Hello World'};

m.set(o, 'content'); // 添加成员
m.get(o) // "content" // 获取/读取成员

m.has(o) // true // 判断是否存在该成员
m.delete(o) // true // 删除成员
m.has(o) // false
```

方式二

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```js
var map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

#### Map实例的方法

|        |      |                                                              |
| ------ | ---- | ------------------------------------------------------------ |
| size   | 属性 | 返回 Map 结构的成员总数。                                    |
| set    | 方法 | 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。 |
| get    | 方法 | 读取key对应的键值，如果找不到key，返回undefined。            |
| has    | 方法 | 返回一个布尔值，表示某个键是否在当前 Map 对象之中。          |
| delete | 方法 | 删除某个键，返回true。如果删除失败，返回false。              |
| clear  | 方法 | 清除所有成员，没有返回值。                                   |

```js
设置成员
var m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
var map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

获取成员
var m = new Map();

var hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

 成员是否存在
var m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');


m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true

删除成员
var m = new Map();
m.set(undefined, 'nah');
m.has(undefined);     // true

m.delete(undefined);
m.has(undefined);       // false

清空成员
var map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```



#### 遍历成员

|           |                    |      |
| --------- | ------------------ | ---- |
| keys()    | 返回键名的遍历器   |      |
| values()  | 返回键值的遍历器   |      |
| entries() | 返回键值对的遍历器 |      |

```js
var map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

console.log(map.keys()); // 包含 键名 的数组
console.log(map.values());// 包含 键值 的数组
console.log(map.entries()); // 包含 键值对 的数组


for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

#### WeakMap

WeakMap结构与Map结构类似，也是用于生成键值对的集合。

区别

- 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
var e1 = document.getElementById('foo');
var e2 = document.getElementById('bar');
var arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
// e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
arr [0] = null;
arr [1] = null;
// 一旦忘了写，就会造成内存泄露。
```

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

**基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。**

#### 实例的方法

WeakMap只有四个方法可用：get()、set()、has()、delete()。

没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。

因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。



## 九、异步编程

### 9.1 什么是 Promise

由于JS是单线程的，遇到耗时任务时，为防止代码阻塞，都需要异步处理该任务。比如ajax网络请求，定时器…

**传统解决方式: 回调函数**

```js
console.log('start');
setTimeout(function(){
    console.log('hello bf!!!')
},0)
console.log('end');
// 定时器就是一个需要异步处理的任务,我们以回调函数的形式,指定计时完成后要做的事情
// 文档的事件操作,也都是这样的处理方式
```

**Promise解决方式**

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

#### 基本用法

创建promise实例

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
var p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        var num=Math.ceil(Math.random()*10);
        if(num>5){
            resolve(num);
        }else{
            reject(num);
        }
    },500)
})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。由 JavaScript 引擎提供。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

#### then()方法

`Promise`实例生成以后，可以用`then`方法分别指定当`promise`实例变为`resolved`状态和`rejected`状态的回调函数。

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数

```javascript
//处理结果的第一种方式
//处理结果
p.then(function(res){
    console.log("res",res);
},function(err){
    console.log("err",err);
})

//写成箭头函数会更加简便

p.then(res=>{
    console.log("res",res);
},err=>{
    console.log("err",err);
})
```



#### catch()方法

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

```javascript
//处理结果的第2种方式
p.then(res=>{
    console.log("res",res);
}).catch(err=>{
    console.log("err",err);
})
```

如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。Promise 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。一般来说，不要在`then()`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。 **推荐使用`catch`方法。**

#### Promise 新建后就会立即执行

Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。



#### `Promise`对象有以下两个特点

1. 对象的状态不受外界影响。`Promise`对象代表一个异步操作，**有三种状态：**`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

`Promise`也**有一些缺点**。**首先**，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。**其次**，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。**第三**，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

### 9.2 promise的链式编程

Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。



上面代码中，第一个`then`方法指定的回调函数，返回的是另一个`Promise`对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。如果变为`resolved`，就调用第一个回调函数，如果状态变为`rejected`，就调用第二个回调函数。

```javascript
var status = 1,isLogin=false;
var login = (resolve , reject)=>{
    setTimeout(()=>{
        if(status == 1){
            isLogin = true
            resolve({
                code : 1,
                token:"ad31nu891nv",
                msg:"登陆成功!"
            })
        }else{
            isLogin = false
            reject("失败")
        }
    },2000)
};
var getInfo = (resolve , reject)=>{
    setTimeout(()=>{
        if(isLogin){
            resolve("获取用户信息成功!")
        }else{
            reject("获取失败")
        }
    },1000)
};
new Promise(login)
.then(res =>{
    console.log(res);
    return new Promise(getInfo);
})
.then(res =>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})
```

### 9.3 promise的其他属性



|                        |                                                          |      |
| ---------------------- | -------------------------------------------------------- | ---- |
| Promise.all()          | 用于将多个 Promise 实例，包装成一个新的 Promise 实例。   |      |
| Promise.race()         | 同样是将多个 Promise 实例，包装成一个新的 Promise 实例。 |      |
| Promise.resolve()      | 有时需要将现有对象转为 Promise 对象                      |      |
| Promise.reject(reason) | 返回一个新的 Promise 实例，该实例的状态为`rejected`。    |      |

> setTimout中传入的回调方法应该是被js引擎直接调用的，而引擎直接发出的报错，这可能就是捕获不到throw的原因。

### 10.1 什么是 Generator 函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。



然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是的遍历器对象（Iterator Object）。

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

```
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

上面代码一共调用了四次`next`方法。

第一次调用，Generator 函数开始执行，直到遇到第一个`yield`表达式为止。`next`方法返回一个对象，它的`value`属性就是当前`yield`表达式的值`hello`，`done`属性的值`false`，表示遍历还没有结束。

第二次调用，Generator 函数从上次`yield`表达式停下的地方，一直执行到下一个`yield`表达式。`next`方法返回的对象的`value`属性就是当前`yield`表达式的值`world`，`done`属性的值`false`，表示遍历还没有结束。

第三次调用，Generator 函数从上次`yield`表达式停下的地方，一直执行到`return`语句（如果没有`return`语句，就执行到函数结束）。`next`方法返回的对象的`value`属性，就是紧跟在`return`语句后面的表达式的值（如果没有`return`语句，则`value`属性的值为`undefined`），`done`属性的值`true`，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，`next`方法返回对象的`value`属性为`undefined`，`done`属性为`true`。以后再调用`next`方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。



#### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。



`yield`表达式与`return`语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。


`yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

`yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

`yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。



#### 与 Iterator 接口的关系

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。

```
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给`Symbol.iterator`属性，从而使得`myIterable`对象具有了 Iterator 接口，可以被`...`运算符遍历了。

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

上面代码中，`gen`是一个 Generator 函数，调用它会生成一个遍历器对象`g`。它的`Symbol.iterator`属性，也是一个遍历器对象生成函数，执行后返回它自己。



#### Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。



`throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。



注意，不要混淆遍历器对象的`throw`方法和全局的`throw`命令。上面代码的错误，是用遍历器对象的`throw`方法抛出的，而不是用`throw`命令抛出的。后者只能被函数体外的`catch`语句捕获。


如果 Generator 函数内部没有部署`try...catch`代码块，那么`throw`方法抛出的错误，将被外部`try...catch`代码块捕获。

如果 Generator 函数内部和外部，都没有部署`try...catch`代码块，那么程序将报错，直接中断执行。

`throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。

`throw`方法被内部捕获以后，会附带执行到下一条`yield`表达式，这种情况下等同于执行一次`next`方法。

另外，`throw`命令与`g.throw`方法是无关的，两者互不影响。



这种函数体内捕获错误的机制，大大方便了对错误的处理。多个`yield`表达式，可以只用一个`try...catch`代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次`catch`语句就可以了。

Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的`catch`捕获。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

#### Generator.prototype.return()

Generator 函数返回的遍历器对象，还有一个`return()`方法，可以返回给定的值，并且终结遍历 Generator 函数。

如果`return()`方法调用时，不提供参数，则返回值的`value`属性为`undefined`。

如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return()`方法会导致立刻进入`finally`代码块，执行完以后，整个函数才会结束。



#### next()、throw()、return() 的共同点

`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

`next()`是将`yield`表达式替换成一个值。

`throw()`是将`yield`表达式替换成一个`throw`语句。

`return()`是将`yield`表达式替换成一个`return`语句。


#### 应用

异步操作的同步化表达

控制流管理


部署 Iterator 接口

作为数据结构

### async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

```
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

上面代码的函数`gen`可以写成`async`函数，就是下面这样。

```
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

一比较就会发现，`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

`async`函数对 Generator 函数的改进，体现在以下四点。

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。

```
asyncReadFile();
```

上面的代码调用了`asyncReadFile`函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。

#### 基本用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。

```
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

上面代码是一个获取股票报价的函数，函数前面的`async`关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个`Promise`对象。

由于`async`函数返回的是 Promise 对象，可以作为`await`命令的参数。所以，上面的例子也可以写成下面的形式。

```
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

async 函数有多种使用形式。

```
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

#### 语法

`async`函数的语法规则总体上比较简单，难点是错误处理机制。

#### 返回 Promise 对象

`async`函数返回一个 Promise 对象。

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了
```

#### Promise 对象的状态变化

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

下面是一个例子。

```
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

上面代码中，函数`getTitle`内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行`then`方法里面的`console.log`。

#### await 命令

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

上面代码中，`await`命令的参数是数值`123`，这时等同于`return 123`。

另一种情况是，`await`命令后面是一个`thenable`对象（即定义了`then`方法的对象），那么`await`会将其等同于 Promise 对象。

```
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
```

上面代码中，`await`命令后面是一个`Sleep`对象的实例。这个实例不是 Promise 对象，但是因为定义了`then`方法，`await`会将其视为`Promise`处理。

这个例子还演示了如何实现休眠效果。JavaScript 一直没有休眠的语法，但是借助`await`命令就可以让程序停顿指定的时间。下面给出了一个简化的`sleep`实现。

```
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```

`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。

```
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

注意，上面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的。

任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

```
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

上面代码中，第二个`await`语句是不会执行的，因为第一个`await`语句状态变成了`reject`。

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行。

```
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```

另一种方法是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误。

```
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

### 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。

```
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了
```

上面代码中，`async`函数`f`执行后，`await`后面的 Promise 对象会抛出一个错误对象，导致`catch`方法的回调函数被调用，它的参数就是抛出的错误对象。具体的执行机制，可以参考后文的“async 函数的实现原理”。

防止出错的方法，也是将其放在`try...catch`代码块之中。

```
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

```
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

下面的例子使用`try...catch`结构，实现多次重复尝试。

```
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
```

上面代码中，如果`await`操作成功，就会使用`break`语句退出循环；如果失败，会被`catch`语句捕捉，然后进入下一轮循环。

### 使用注意点

第一点，前面已经说过，`await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中。

```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
```

第二点，多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```
let foo = await getFoo();
let bar = await getBar();
```

上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发。

```
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。

第三点，`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
```

上面代码会报错，因为`await`用在普通函数之中了。但是，如果将`forEach`方法的参数改成`async`函数，也有问题。

```
function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```

上面代码可能不会正常工作，原因是这时三个`db.post()`操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用`for`循环。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

另一种方法是使用数组的`reduce()`方法。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  await docs.reduce(async (_, doc) => {
    await _;
    await db.post(doc);
  }, undefined);
}
```

上面例子中，`reduce()`方法的第一个参数是`async`函数，导致该函数的第一个参数是前一步操作返回的 Promise 对象，所以必须使用`await`等待它操作结束。另外，`reduce()`方法返回的是`docs`数组最后一个成员的`async`函数的执行结果，也是一个 Promise 对象，导致在它前面也必须加上`await`。

上面的`reduce()`的参数函数里面没有`return`语句，原因是这个函数的主要目的是`db.post()`操作，不是返回值。而且`async`函数不管有没有`return`语句，总是返回一个 Promise 对象，所以这里的`return`是不必要的。

如果确实希望多个请求并发执行，可以使用`Promise.all`方法。当三个请求都会`resolved`时，下面两种写法效果相同。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

第四点，async 函数可以保留运行堆栈。

```
const a = () => {
  b().then(() => c());
};
```

上面代码中，函数`a`内部运行了一个异步任务`b()`。当`b()`运行的时候，函数`a()`不会中断，而是继续执行。等到`b()`运行结束，可能`a()`早就运行结束了，`b()`所在的上下文环境已经消失了。如果`b()`或`c()`报错，错误堆栈将不包括`a()`。

现在将这个例子改成`async`函数。

```
const a = async () => {
  await b();
  c();
};
```

上面代码中，`b()`运行的时候，`a()`是暂停执行，上下文环境都保存着。一旦`b()`或`c()`报错，错误堆栈将包括`a()`。



### 与其他异步处理方法的比较

我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。

假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

首先是 Promise 的写法。

```
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  let ret = null;

  // 新建一个空的Promise
  let p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}
```

虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（`then`、`catch`等等），操作本身的语义反而不容易看出来。

接着是 Generator 函数的写法。

```
function chainAnimationsGenerator(elem, animations) {

  return spawn(function*() {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });

}
```

上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在`spawn`函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的`spawn`函数就是自动执行器，它返回一个 Promise 对象，而且必须保证`yield`语句后面的表达式，必须返回一个 Promise。

最后是 async 函数的写法。

```
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```

可以看到 Async 函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将 Generator 写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用 Generator 写法，自动执行器需要用户自己提供。



[Promise、Generator、Async有什么区别？ - 掘金 (juejin.cn)](https://juejin.cn/post/7062155174436929550)



## 十、Class 类

### 10.1 什么是 Class

es5 生成实例对象的传统方法是通过构造函数。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.fn = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);


//constructor()方法，这就是构造方法，而this关键字则代表实例对象。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  fn() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
let p = new Point(1, 2); // 直接对类使用new命令, 生成实例对象, 跟构造函数使用方式一样

typeof Point; // Function
console.log(Point === Point.prototype.constructor); // true 
// ES6 的类，完全可以看作构造函数的另一种写法
```

**创建类**

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类默认有一个空的constructor()方法

类其实就是 `构造函数+原型` 的一种简化语法。都是为了批量创建某一类对象。

```js
class Animal{
    // 该方法在使用new命令生成实例对象时,会被调用
    // 其中的 this 就指向实例对象
    constructor(name,age) {
        this.name=name;
        this.age=age;
    }
    eat(){
        console.log("eating.....")
    }
    drinks(){
        console.log("drinking....")
    }
    play(){
        console.log("play....")
    }
    //静态方法
    static happy(){
        console.log("happy.....")
    }
}
let a1 = new Animal('dog',6);
let a2 = new Animal('cat',3);

// 1. 类相当于实例的原型，所有在类中定义的方法，都会被实例继承
console.log(Animal.prototype); // 具备 construcotr eat drinks play 这些方法,但不具备 happy方法

// 2.如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
Animal.happy(); // happy.....

// 3. name, age 属性被添加到了每一个实例上, 是实例自己的属性
console.log(a1.name, a1.age);
console.log(a2.name, a2.age);
// 4. a1, a2 都具备类的方法, 这些类中定义的方法都被放在了实例的原型上 a1.__proto__ == Animal.prototype
a1.eat();
a2.eat();
```

### 10.2 类的继承

所谓继承就是让 **子类** 具备 **父类** 的属性和方法。可以通过extends关键字实现继承。

super

ES6 规定，子类必须在constructor()方法中调用super()，否则就会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用super()方法，子类就得不到自己的this对象。

类的注意事项及特点

- 类里面的constructor函数, 可以看做`构造函数`
- 类里面的所有方法都是定义在`原型`上面
- new生成实例时, 就会自动调用constructor函数
- 类里面的函数 不能加function
- 类里面的多个函数之间不需要加

```js
//比如我们定义一个Bird来继承刚才定义的Animal
class Bird extends Animal{
    constructor(name,age,color,cicle) {
        // 必须先执行super() 这一步实现了 子类实例对父类属性和方法的继承
        super();
        // 加工子类实例
        this.name = name;
        this.age = age;
        this.color=color;
        this.cicle = cicle;
    }
    play(){
        console.log('飞到天上玩.....')
    }
}
var b1 = new Bird('黄鹂鸟',1,'yellow','是个球')
console.log(b1);
b1.eat();
b1.play();
```



## 十一、模块化

### 11.1 什么是模块化

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要`UMD`模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。
- 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。

本章介绍 ES6 模块的语法，下一章介绍如何在浏览器和 Node 之中，加载 ES6 模块。

#### 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。

其中，尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

#### export 命令

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。下面是一个 JS 文件，里面使用`export`命令输出变量。

```
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
等同于

// profile.js 推荐
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

`export`命令除了输出变量，还可以输出函数或类（class）。

`export`输出的变量就是本来的名字，但是可以使用`as`关键字重命名。

需要特别注意的是，`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```
export function multiply(x, y) {
  return x * y;
};

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

```

```
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

目前，export 命令能够对外输出的就是三种接口：函数（Functions）， 类（Classes），var、let、const 声明的变量（Variables）。

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新

`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

```
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

#### import 命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

`import`命令要使用`as`关键字，将输入的变量重命名。

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

import { lastName as surname } from './profile.js';

import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
```

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```
import { myMethod } from 'util';
```

注意，`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

```
foo();

import { foo } from 'my_module';
```

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

`import`语句会执行所加载的模块，因此可以有下面的写法。

```
import 'lodash';
```

如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

```
import 'lodash';
import 'lodash';
```

#### 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。



```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```



#### export default 命令

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

```
// export-default.js
export default function () {
  console.log('foo');
}
```

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

```
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

`export default`命令用在非匿名函数前，也是可以的。

`foo`函数的函数名`foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

```
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

第一组是使用`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。

正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。



````
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';




```
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

// 正确
export default 42;

// 报错
export 42;

````

有了`export default`命令，输入模块时就非常直观了，以输入 lodash 模块为例。

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

`export default`也可以用来输出类。

```
import _ from 'lodash';

import _, { each, forEach } from 'lodash';

// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

#### export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。

`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

```
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

模块的接口改名和整体输出，也可以采用这种写法。

```
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法如下
export { default } from 'foo';



export * as ns from "mod";
// 等同于
import * as ns from "mod";
export {ns};
```



#### 模块的继承

模块之间也可以继承。

```
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

上面代码中的`export *`，表示再输出`circle`模块的所有属性和方法。注意，`export *`命令会忽略`circle`模块的`default`方法。然后，上面代码又输出了自定义的`e`变量和默认方法。

加载上面模块的写法如下。

```
// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

上面代码中的`import exp`表示，将`circleplus`模块的默认方法加载为`exp`方法。

#### 跨模块常量

`const`命令的时候说过，`const`声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

```
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

如果要使用的常量非常多，可以建一个专门的`constants`目录，将各种常量写在不同的文件里面，保存在该目录下。

```
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```

然后，将这些文件输出的常量，合并在`index.js`里面。

```
// constants/index.js
export {db} from './db';
export {users} from './users';
```

使用的时候，直接加载`index.js`就可以了。

```
// script.js
import {db, users} from './constants/index';
```

#### 简介

前面介绍过，`import`命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（`import`命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代 Node 的`require`方法，这就形成了一个障碍。因为`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。



`import()`函数，支持动态加载模块。

`import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载。

`import()`返回一个 Promise 对象。下面是一个例子。

```
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同。`import()`类似于 Node.js 的`require()`方法，区别主要是前者是异步加载，后者是同步加载。

由于`import()`返回 Promise对象，所以需要使用`then()`方法指定处理函数。考虑到代码的清晰，更推荐使用`await`命令。

```
async function renderWidget() {
  const container = document.getElementById('widget');
  if (container !== null) {
    // 等同于
    // import("./widget").then(widget => {
    //   widget.render(container);
    // });
    const widget = await import('./widget.js');
    widget.render(container);
  }
}

renderWidget();
```

```
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

（2）条件加载

`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

```
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

（3）动态的模块路径

`import()`允许模块路径动态生成。

```
import(f())
.then(...);
```

#### 注意点

`import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```

如果模块有`default`输出接口，可以用参数直接获得。

```
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```

上面的代码也可以使用具名输入的形式。

```
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```

如果想同时加载多个模块，可以采用下面的写法。

```
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()`也可以用在 async 函数之中。

```
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```





### 11.3 ES6 模块导入和导出

使用 ES6 可以方便地导入和导出模块。在 JavaScript 中，模块是文件或代码块，用于封装和组织代码，并允许在应用程序中引用它们。

#### 导出

使用`export`关键字将一个或多个值从模块中导出。这些值可以是变量，函数或类。

- 导出多个变量时，使用花括号`{}`将它们一起包含在内。
- 导出默认值时，使用`export default`关键字。每个模块只能有一个默认值导出。

```javascript
// 导出单个变量
export const myVariable = "hello"
// 导出单个函数
export function myFunction() {/* ... */}
// 导出单个类
export class MyClass {/* ... */}

// 导出多个变量
const var1 = "foo"
const var2 = "bar"
export {var1, var2}

// 导出默认值
export default "hello"
export default function() {/* ... */}
export default class {/* ... */}
```



#### 导入

使用`import`关键字将模块中的值导入到另一个模块中。可以将默认值和命名导入一起使用。

- 模块路径可以是相对的或绝对的。
- 导出的名称必须与导入的名称匹配。
- 当导入一个默认值时，可以使用任何名称来命名它。

```javascript
Copy code// 导入单个默认值
import myDefault from "./myModule.js"
// 导入单个命名导出
import {myVariable} from "./myModule.js"
// 导入多个命名导出
import {var1, var2} from "./myModule.js"
// 导入所有命名导出并命名为myModule
import * as myModule from "./myModule.js"
```







## 参考三三

- [es6 |网道]()
- [js |不凡学院]()