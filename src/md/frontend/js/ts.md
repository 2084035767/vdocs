# TypeScript 笔记

## 一、ts 简介

### 1.1 什么是ts?

### 1.2 ts 的历史

### 1.3 ts 的作用和特点

## 二、类型检测

### 2.1 基础类型

#### 值与类型

TypeScript 有“值”（value）和“类型”（type）两个概念。

“类型”是针对“值”的，可以视为是后者的一个元属性。每一个值在 TypeScript 里面都是有类型的。比如，`3`是一个值，它的类型是`number`。

TypeScript 代码只涉及类型，不涉及值。所有跟“值”相关的处理，都由 JavaScript 完成。



这一点务必牢记。TypeScript 项目里面，其实存在两种代码，一种是底层的“值代码”，另一种是上层的“类型代码”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法。它们是可以分离的，TypeScript 的编译过程，实际上就是把“类型代码”全部拿掉，只保留“值代码”。





 TypeScript 继承了js的类型，在此基础上还增添了特别类型

| 类型      | 归属        | 例子 |
| --------- | ----------- | ---- |
| boolean   | 原始类型    |      |
| string    | 原始类型    |      |
| number    | 原始类型    |      |
| bigint    | 原始类型    |      |
| symbol    | 原始类型    |      |
| undefined | 独立类型    |      |
| null      | 独立类型    |      |
| object    | object 类型 |      |
| Array     | object 类型 |      |
| Function  | object 类型 |      |
| Tuple     | object 类型 |      |
| enum      | object 类型 |      |
| class     | object 类型 |      |
| void      | 特殊类型    |      |
| any       | 特殊类型    |      |
| unknown   | 特殊类型    |      |
| never     | 特殊类型    |      |

#### Function 类型

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。

Function 类型的函数可以接受任意数量的参数，每个参数的类型都是`any`，返回值的类型也是`any`，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。

```typescript
function doSomething(f:Function) {
  return f(1, 2, 3);
}
```



#### any 类型

- any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。
- 变量类型一旦设为`any`，TypeScript 实际上会关闭这个变量的类型检查。
- `any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。TypeScript 将这种类型称为“顶层类型”（top type）



1. 类型推断问题
   对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。
2. 污染问题
   `any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。



#### unknown 类型

`unknown`类型解决了`any`类型“污染”其他变量的问题。

与`any`含义相同，表示类型不确定，但是它的使用有一些限制，可以视为严格版的`any`。



`unknown`类型，它不能直接使用。主要有以下几个限制。

- `unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

- `unknown`类型变量能够进行的运算是有限的，只能进行比较运算、取反运算、`typeof`运算符和`instanceof`运算符，其他运算都会报错。



只有经过“类型收窄”，`unknown`类型变量才可以使用。

```typescript
let a:unknown = 1;

if (typeof a === 'number') {
  let r = a + 10; // 正确
}
```



#### never 类型

- never 类型，不存在任何属于“空类型”的值，即不可能有这样的值。
- `never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。





### 2.2 类型声明

类型声明是TypeScript为实现类型检测的方法

类型声明的写法，一律为在标识符后面添加“冒号 + 类型”。

```typescript
let foo:string;
```



### 2.3 类型推断

类型声明并不是必需的，如果没有，TypeScript 会自己推断类型。

```typescript
let foo = 123;
```



### 2.4 类型扩展

#### 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```



#### 联合类型

联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示。

联合类型`A|B`表示，任何一个类型只要属于`A`或`B`，就属于联合类型`A|B`。

```typescript
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';
```

#### 类型收窄

“类型收窄”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先收窄类型，再进行处理。实际上，联合类型本身可以看成是一种“类型扩展”（type widening），处理时就需要“类型收窄”（type narrowing）。

> 简单理解：在处理参数时，进行类型判断。

```typescript
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```



#### 交叉类型

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号`&`表示。

交叉类型`A&B`表示，任何一个类型必须同时属于`A`和`B`，才属于交叉类型`A&B`，即交叉类型同时满足`A`和`B`的特征。

交叉类型的主要用途是表示对象的合成。

```typescript
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```





**type 命令**

`type`命令用来定义一个类型的别名。

`type`命令为`number`类型定义了一个别名`Age`。这样就能像使用`number`一样，使用`Age`作为类型

```typescript
type Age = number;

let age:Age = 55;
```





**typeof 运算符**

JavaScript 语言中，typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型。

- "string"
- "number"
- "bigInt"
- "boolean"
- "symbol"
- "undefined"
- "object"
- "function"

```typescript
typeof 'foo'; // 'string'
```



### 2.5 类型断言

对于没有类型声明的值，TypeScript 会进行类型推断，很多时候得到的结果，未必是开发者想要的。

TypeScript 提供了“类型断言”这样一种手段，允许开发者在代码中“断言”某个值的类型，告诉编译器此处的值是什么类型。TypeScript 一旦发现存在类型断言，就不再对该值进行类型推断，而是直接采用断言给出的类型。

```typescript
type T = 'a'|'b'|'c';
let foo = 'a';

let bar:T = foo; // 报错

// 断言变量
type T = 'a'|'b'|'c';

let foo = 'a';
let bar:T = foo as T; // 正确
```



```typescript
let bar:T = foo as T;
```



上面示例中，等号右侧是一个对象字面量，多出了属性`y`，导致报错。解决方法就是使用类型断言，可以用两种不同的断言。

```
// 正确
const p0:{ x: number } =
  { x: 0, y: 0 } as { x: number };

// 正确
const p1:{ x: number } =
  { x: 0, y: 0 } as { x: number; y: number };
```



类型断言不应滥用，因为它改变了 TypeScript 的类型检查，很可能埋下错误的隐患。

类型断言的一大用处是，指定 unknown 类型的变量的具体类型。

另外，类型断言也适合指定联合类型的值的具体类型。

#### 类型断言的条件

类型断言并不意味着，可以把某个值断言为任意类型。

```typescript
const n = 1;
const m:string = n as string; // 报错
```

类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件。

```typescript
expr as T
```

上面代码中，`expr`是实际的值，`T`是类型断言，它们必须满足下面的条件：`expr`是`T`的子类型，或者`T`是`expr`的子类型。

也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。



#### as const 断言

如果没有声明变量类型，let 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一；const 命令声明的变量，则被推断为值类型常量。

```typescript
// 类型推断为基本类型 string
let s1 = 'JavaScript';

// 类型推断为字符串 “JavaScript”
const s2 = 'JavaScript';
```

有些时候，let 变量会出现一些意想不到的报错，变更成 const 变量就能消除报错。

另一种解决方法是使用类型断言。TypeScript 提供了一种特殊的类型断言`as const`，用于告诉编译器，推断类型时，可以将这个值推断为常量，即把 let 变量断言为 const 变量，从而把内置的基本类型变更为值类型。

使用了`as const`断言以后，let 变量就不能再改变值了。

```typescript
let s = 'JavaScript' as const;
s = 'Python'; // 报错
```

注意，`as const`断言只能用于字面量，不能用于变量。

另外，`as const`也不能用于表达式。



`as const`也可以写成前置的形式。

```
// 后置形式
expr as const

// 前置形式
<const>expr
```

`as const`断言可以用于整个对象，也可以用于对象的单个属性，这时它的类型缩小效果是不一样的。

```typescript
const v1 = {
  x: 1,
  y: 2,
}; // 类型是 { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
}; // 类型是 { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const; // 类型是 { readonly x: 1; readonly y: 2; }
```

总之，`as const`会将字面量的类型断言为不可变类型，缩小成 TypeScript 允许的最小类型。



#### 非空断言

对于那些可能为空的变量（即可能等于`undefined`或`null`），TypeScript 提供了非空断言，保证这些变量不会为空，写法是在变量名后面加上感叹号`!`。

```
function f(x?:number|null) {
  validateNumber(x); // 自定义函数，确保 x 是数值
  console.log(x!.toFixed());
}

function validateNumber(e?:number|null) {
  if (typeof e !== 'number')
    throw new Error('Not a number');
}
```



不过，非空断言会造成安全隐患，只有在确定一个表达式的值不为空时才能使用。比较保险的做法还是手动检查一下是否为空。

### 2.6 类型兼容

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。

TypeScript 为这种情况定义了一个专门术语。如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的子类型（subtype）。在上例中，类型`number`就是类型`number|string`的子类型。

TypeScript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

```typescript
type T = number|string;

let a:number = 1;
let b:T = a;
```





## 三、基本使用

### 3.1 数组

TypeScript 数组有一个根本特征：所有成员的类型必须相同，但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员。

正是由于成员数量可以动态变化，所以 TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

数组的类型有两种写法。

第一种写法是在数组成员的类型后面，加上一对方括号。

```typescript
let arr:number[] = [1, 2, 3];

// 如果数组成员的类型比较复杂，可以写在圆括号里面
let arr:(number|string)[];
```



第二种写法是使用 TypeScript 内置的 Array 接口。

```typescript
let arr:Array<number> = [1, 2, 3];

// 对于成员类型比较复杂的数组，代码可读性会稍微好一些
let arr:Array<number|string>;
```



如果变量的初始值是空数组，那么 TypeScript 会推断数组类型是`any[]`。

但是，类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。

```typescript
// 推断为 any[]
const arr = [];
```



#### 只读数组

JavaScript 规定，`const`命令声明的数组变量是可以改变成员的。但是，很多时候确实有声明为只读数组的需求，即不允许变动数组成员。

TypeScript 允许声明只读数组，方法是在数组类型前面加上`readonly`关键字。

> `readonly`关键字可以用在很多地方，表示只读。

::: warning

注意，`readonly`关键字不能与数组的泛型写法一起使用。

:::

```typescript
const arr:readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错
```

这是因为只读数组没有`pop()`、`push()`之类会改变原数组的方法，所以`number[]`的方法数量要多于`readonly number[]`，这意味着`number[]`其实是`readonly number[]`的子类型。



只读数组还有一种声明方法，就是使用“const 断言”。

`as const`告诉 TypeScript，推断类型时要把变量`arr`推断为只读数组，从而使得数组成员无法改变。

```typescript
const arr = [0, 1] as const;

arr[0] = [2]; // 报错 
```

### 3.2 函数

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

>  返回值的类型通常可以不写，因为 TypeScript 自己会推断出来。

```typescript
function hello(txt:string):void {
    console.log('hello ' + txt);
}
```

如果不指定参数类型（比如上例不写`txt`的类型），TypeScript 就会推断参数类型，如果缺乏足够信息，就会推断该参数的类型为`any`。



如果变量被赋值为一个函数，变量的类型有两种写法。

```typescript
// 写法一
const hello = function (txt:string) {
    console.log('hello ' + txt);
}

// 写法二
const hello:(txt:string) => void = function (txt) {
    console.log('hello ' + txt);
};
```

写法一是通过等号右边的函数类型，推断出变量`hello`的类型；写法二则是使用箭头函数的形式，为变量`hello`指定类型，参数的类型写在箭头左侧，返回值的类型写在箭头右侧。



写法二有两个地方需要注意。

- 函数的参数要放在圆括号里面，不放会报错。
- 类型里面的参数名（本例是`txt`）是必须的。



如果函数的类型定义很冗长，或者多个函数使用同一种类型，写法二用起来就很麻烦。

因此，往往用`type`命令为函数类型定义一个别名，便于指定给其他变量。

```typescript
type MyFunc = (txt:string) => void;

const hello:MyFunc = function (txt) {
    console.log('hello ' + txt);
};
```



如果一个变量要套用另一个函数类型，有一个小技巧，就是使用`typeof`运算符。

> 这是一个很有用的技巧，任何需要类型的地方，都可以使用`typeof`运算符从一个值获取类型。

```typescript
function add(x:number,y:number) {
    return x + y;
}

const myAdd:typeof add = function (x, y) {
    return x + y;
}
```

上面示例中，函数`myAdd()`的类型与函数`add()`是一样的，那么就可以定义成`typeof add`。因为函数名`add`本身不是类型，而是一个值，所以要用`typeof`运算符返回它的类型。



#### 箭头函数

箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。

> 注意，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同。

```typescript
const repeat = (str:string,times:number):string => str.repeat(times);
```



#### 可选参数

如果函数的某个参数可以省略，则在参数名后面加问号表示。

```typescript
function f(x?:number) {
  // ...
}

f(); // OK
f(10); // OK
```

参数名带有问号，表示该参数的类型实际上是`原始类型|undefined`，它有可能为`undefined`。比如，上例的`x`虽然类型声明为`number`，但是实际上是`number|undefined`。

> 但是，反过来就不成立，类型显式设为`undefined`的参数，就不能省略。
>
> 函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。

```typescript
function f(x?:number) {
  return x;
}

f(undefined) // 正确
```

上面示例中，参数`x`是可选的，等同于说`x`可以赋值为`undefined`。



函数体内部用到可选参数时，需要判断该参数是否为`undefined`。

```typescript
let myFunc:
  (a:number, b?:number) => number; 

myFunc = function (x, y) {
  if (y === undefined) {
    return x;
  }
  return x + y;
}
```



#### rest 参数

rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。

```typescript
// rest 参数为数组
function joinNumbers(...nums:number[]) {
  // ...
}

// rest 参数为元组
function f(...args:[boolean, number]) {
  // ...
}
```



rest 参数可以与变量解构结合使用。

```typescript
function repeat(
  ...[str, times]: [string, number]
):string {
  return str.repeat(times);
}

// 等同于
function repeat(
  str: string,
  times: number
):string {
  return str.repeat(times);
}
```



#### void 类型

void 类型表示函数没有返回值。

```typescript
function f():void {
  console.log('hello');
}
```



void 类型允许返回`undefined`或`null`。

```typescript
function f():void {
  return undefined; // 正确
}

function f():void {
  return null; // 正确
}
```



函数的运行结果如果是抛出错误，也允许将返回值写成`void`。

```typescript
function throwErr():void {
  throw new Error('something wrong');
}
```



#### never 类型

`never`类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

它主要有以下两种情况

**抛出错误的函数**

> 注意，只有抛出错误，才是 never 类型。如果显式用`return`语句返回一个 Error 对象，返回值就不是 never 类型。

```typescript
function fail(msg:string):never {
  throw new Error(msg);
}
```

另外，由于抛出错误的情况属于`never`类型或`void`类型，所以无法从返回值类型中获知，抛出的是哪一种错误。



**无限执行的函数**

> 注意，`never`类型不同于`void`类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回`undefined`。

```typescript
const sing = function():never {
  while (true) {
    console.log('sing');
  }
};
```



#### 函数重载

有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。

> 
>
> 这意味着，该函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。这就叫“函数重载”。

```typescript
reverse('abc') // 'cba'
reverse([1, 2, 3]) // [3, 2, 1]
```



TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。

前两行类型声明列举了重载的各种情况。第三行是函数本身的类型声明，它必须与前面已有的重载声明兼容。

```typescript
function reverse(str:string):string;
function reverse(arr:any[]):any[];
function reverse(
  stringOrArray:string|any[]
):string|any[] {
  if (typeof stringOrArray === 'string')
    return stringOrArray.split('').reverse().join('');
  else
    return stringOrArray.slice().reverse();
}
```

函数重载的每个类型声明之间，以及类型声明与函数实现的类型之间，不能有冲突。

重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。



由于重载是一种比较复杂的类型声明方法，为了降低复杂性

如果可以的话，应该优先使用联合类型替代函数重载，除非多个参数之间、或者某个参数与返回值之间，存在对应关系。

```typescript
// 写法一
function len(s:string):number;
function len(arr:any[]):number;
function len(x:any):number {
  return x.length;
}

// 写法二
function len(x:any[]|string):number {
  return x.length;
}
```

### 3.3 对象

TypeScript 对于对象类型有很多规则。

对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

> 一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。

```typescript
const obj:{
  x:number;
  y:number;
} = { x: 1, y: 1 };
```



同样地，也不能删除类型声明中存在的属性，修改属性值是可以的。

```typescript
const myUser = {
  name: "Sabrina",
};

delete myUser.name // 报错
myUser.name = "Cynthia"; // 正确
```



> 注意，TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。

```typescript
interface MyInterface {
  toString(): string; // 继承的属性
  prop: number; // 自身的属性
}

const obj:MyInterface = { // 正确
  prop: 123,
};
```

#### 解构赋值

解构赋值的类型写法，跟为对象声明类型是一样的。

```typescript
const {id, name, price}:{
  id: string;
  name: string;
  price: number
} = product;
```

注意，目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途。

```typescript
let { x: foo, y: bar } = obj;

// 等同于
let foo = obj.x;
let bar = obj.y;
```





#### 结构类型原则

只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）。

根据“结构类型”原则，TypeScript 检查某个值是否符合指定类型时，并不是检查这个值的类型名（即“名义类型”），而是检查这个值的结构是否符合要求（即“结构类型”）。

```typescript
type A = {
  x: number;
};

type B = {
  x: number;
  y: number;
};
```



### 3.4 类

类（class）是面向对象编程的基本构件，封装了属性和方法，TypeScript 给予了全面支持。

#### 属性的类型

类的属性可以在顶层声明，也可以在构造方法内部声明。

对于顶层声明的属性，可以在声明时同时给出类型。

如果不给出类型，TypeScript 会认为`x`和`y`的类型都是`any`。

```typescript
class Point {
  x:number;
  y:number;
}
```

如果不希望出现报错，可以使用非空断言。

```typescript
class Point {
  x!: number;
  y!: number;
}
```

上面示例中，属性`x`和`y`没有初值，但是属性名后面添加了感叹号，表示这两个属性肯定不会为空



类的方法就是普通函数，类型声明方式与函数一致。类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。



#### 类的继承

类（这里又称“子类”）可以使用 extends 关键字继承另一个类（这里又称“基类”）的所有属性和方法。

```typescript
class A {
  greet() {
    console.log('Hello, world!');
  }
}

class B extends A {
}

const b = new B();
b.greet() // "Hello, world!"
```



子类可以覆盖基类的同名方法。

> 但是，子类的同名方法不能与基类的类型定义相冲突。

```typescript
class B extends A {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name}`);
    }
  }
}
```



注意，`extends`关键字后面不一定是类名，可以是一个表达式，只要它的类型是构造函数就可以了。

```typescript
// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

// 例三
class A {
  greeting() {
    return 'Hello from A';
  }
}
class B {
  greeting() {
    return 'Hello from B';
  }
}

interface Greeter {
  greeting(): string;
}

interface GreeterConstructor {
  new (): Greeter;
}

function getGreeterBase():GreeterConstructor {
  return Math.random() >= 0.5 ? A : B;
}

class Test extends getGreeterBase() {
  sayHello() {
    console.log(this.greeting());
  }
}
```



#### 可访问性修饰符

类的内部成员的外部可访问性，由三个可访问性修饰符（access modifiers）控制：`public`、`private`和`protected`。

这三个修饰符的位置，都写在属性或方法的最前面。

| 修饰符                                        |                                                              |
| --------------------------------------------- | ------------------------------------------------------------ |
| public                                        | 表示这是公开成员，外部可以自由访问                           |
| private <Badge type="warning" text="不推荐"/> | 表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员 |
| #propName <Badge type="tip" text="推荐"/>     | 表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员(ES2022) |
| protected                                     | 表示该成员是保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用。 |



#### 实例属性的简写形式

实际开发中，很多实例属性的值，是通过构造方法传入的。

```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}

// 简写形式
class Point {
  constructor(
    public x:number,
    public y:number
  ) {}
}

const p = new Point(10, 10);
p.x // 10
p.y // 10
```

#### 静态成员

类的内部可以使用`static`关键字，定义静态成员。

静态成员是只能通过类本身使用的成员，不能通过实例对象使用。

```typescript
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}

MyClass.x // 0
MyClass.printX() // 0
```



`static`关键字前面可以使用 public、private、protected 修饰符。

静态私有属性也可以用 ES6 语法的`#`前缀表示



#### 抽象类，抽象成员

TypeScript 允许在类的定义前面，加上关键字`abstract`，表示该类不能被实例化，只能当作其他类的模板。这种类就叫做“抽象类”（abstract class）。

```typescript
abstract class A {
  id = 1;
}
const a = new A(); // 报错
```

抽象类只能当作基类使用，用来在它的基础上定义子类。

```typescript
abstract class A {
  id = 1;
}

class B extends A {
  amount = 100;
}

const b = new B();

b.id // 1
b.amount // 100
```

抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。

```typescript
abstract class A {
  foo:number;
}

abstract class B extends A {
  bar:string;
}
```

抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做“抽象成员”（abstract member），即属性名和方法名有`abstract`关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。

```typescript
abstract class A {
  abstract foo:string;
  bar:string = '';
}

class B extends A {
  foo = 'b';
}
```

如果抽象类的方法前面加上`abstract`，就表明子类必须给出该方法的实现。

```typescript
abstract class A {
  abstract execute():string;
}

class B extends A {
  execute() {
    return `B executed`;
  }
}
```

这里有几个注意点

1. 抽象成员只能存在于抽象类，不能存在于普通类。
2. 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加`abstract`关键字。
3. 抽象成员前也不能有`private`修饰符，否则无法在子类中实现该成员。
4. 一个子类最多只能继承一个抽象类。



#### this 问题

类的方法经常用到`this`关键字，它表示该方法当前所在的对象。

```typescript
class A {
  name = 'A';

  getName() {
    return this.name;
  }
}

const a = new A();
a.getName() // 'A'

const b = {
  name: 'b',
  getName: a.getName
};
b.getName() // 'b'
```



有些场合需要给出`this`类型，但是 JavaScript 函数通常不带有`this`参数，这时 TypeScript 允许函数增加一个名为`this`的参数，放在参数列表的第一位，用来描述函数内部的`this`关键字的类型。

```typescript
// 编译前
function fn(
  this: SomeType,
  x: number
) {
  /* ... */
}

// 编译后
function fn(x) {
  /* ... */
}
```



`this`参数的类型可以声明为各种对象。

```
function foo(
  this: { name: string }
) {
  this.name = 'Jack';
  this.name = 0; // 报错
}

foo.call({ name: 123 }); // 报错
```



在类的内部，`this`本身也可以当作类型使用，表示当前类的实例对象。

```typescript
class Box {
  contents:string = '';

  set(value:string):this {
    this.contents = value;
    return this;
  }
}
```

注意，`this`类型不允许应用于静态成员。





## 四、高级用法

### 4.1 接口

interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构。

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
// 实现该接口
const p:Person = {
  firstName: 'John',
  lastName: 'Smith',
  age: 25
};
```

interface 可以表示对象的各种语法

- 对象属性
- 对象的属性索引
- 对象方法
- 函数
- 构造函数

1. 对象属性

> 属性之间使用分号或逗号分隔，最后一个属性结尾的分号或逗号可以省略。

```typescript
interface Point {
  x: number;
  y: number;
}
```

2. 对象的方法

对象的方法共有三种写法。

```typescript
// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string;
}

// 写法三
interface C {
  f: { (x: boolean): string };
}
```



3. 函数

interface 也可以用来声明独立的函数。

```typescript
interface Add {
  (x:number, y:number): number;
}

const myAdd:Add = (x,y) => x + y;
```



#### interface 的继承

interface 可以继承其他类型，主要有下面几种情况。

interface 继承 interface

interface 可以使用`extends`关键字，继承其他 interface。

`extends`关键字会从继承的接口里面拷贝属性类型，这样就不必书写重复的属性。

```typescript
interface Shape {
  name: string;
}

interface Circle extends Shape {
  radius: number;
}
```



interface 允许多重继承。多重接口继承，实际上相当于多个父接口的合并。

如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。

多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。



interface 继承 type

interface 可以继承`type`命令定义的对象类型。

> 注意，如果`type`命令定义的类型不是对象，interface 就无法继承。

```typescript
type Country = {
  name: string;
  capital: string;
}

interface CountryWithPop extends Country {
  population: number;
}
```

interface 还可以继承 class，即继承该类的所有成员。

```typescript
class A {
  x:string = '';

  y():boolean {
    return true;
  }
}

interface B extends A {
  z: number
}
```



#### 接口合并

多个同名接口会合并成一个接口。

```typescript
interface Box {
  height: number;
  width: number;
}

interface Box {
  length: number;
}
```



#### interface 与 type 的异同

`interface`命令与`type`命令作用类似，都可以表示对象类型。

很多对象类型既可以用 interface 表示，也可以用 type 表示。

而且，两者往往可以换用，几乎所有的 interface 命令都可以改写为 type 命令。

它们的相似之处，首先表现在都能为对象类型起名。

```typescript
type Country = {
  name: string;
  capital: string;
}

interface Country {
  name: string;
  capital: string;
}
```



interface 与 type 的区别有下面几点。

（1）`type`能够表示非对象类型，而`interface`只能表示对象类型（包括数组、函数等）。

（2）`interface`可以继承其他类型，`type`不支持继承。

继承的主要作用是添加属性，`type`定义的对象类型如果想要添加属性，只能使用`&`运算符，重新定义一个类型。

```typescript
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}
```

作为比较，`interface`添加属性，采用的是继承的写法。



继承时，type 和 interface 是可以相互继承的。



这表明，interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type。



（5）`this`关键字只能用于`interface`。



（6）type 可以扩展原始数据类型，interface 不行。



（7）`interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以。



综上所述，如果有复杂的类型运算，那么没有其他选择只能使用`type`

一般情况下，`interface`灵活性比较高，便于扩充类型或自动合并，建议优先使用。



### 4.2 模块

任何包含 import 或 export 语句的文件，就是一个模块（module）。相应地，如果文件不包含 export 语句，就是一个全局的脚本文件。



模块本身就是一个作用域，不属于全局作用域。模块内部的变量、函数、类只在内部可见，对于模块外部是不可见的。暴露给外部的接口，必须用 export 命令声明；如果其他文件要使用模块的接口，必须用 import 命令来输入。



TypeScript 模块除了支持所有 ES 模块的语法，特别之处在于允许输出和输入类型。

```typescript
export type Bool = true | false;
// 等同于
type Bool = true | false;
export { Bool };

// 使用
import { Bool } from './a';

let foo:Bool = true;
```

上面示例中，import 语句加载的是一个类型。注意，加载文件写成`./a`，没有写脚本文件的后缀名。TypeScript 允许加载模块时，省略模块文件的后缀名，它会自动定位，将`./a`定位到`./a.ts`。



#### import type 语句

import 在一条语句中，可以同时输入类型和正常接口。

```typescript
// a.ts
export interface A {
  foo: string;
}

export let a = 123;

// b.ts
import { A, a } from './a';
```

第一个方法是在 import 语句输入的类型前面加上`type`关键字。

```typescript
import { type A, a } from './a';
```



第二个方法是使用 import type 语句，这个语句只能输入类型，不能输入正常接口。

```typescript
// 正确
import type { A } from './a';

// 报错
import type { a } from './a';
```



import type 语句也可以输入默认类型。

```typescript
import type DefaultType from 'moduleA';
```

import type 在一个名称空间下，输入所有类型的写法如下。

```
import type * as TypeNS from 'moduleA';
```

同样的，export 语句也有两种方法，表示输出的是类型。

```typescript
type A = 'a';
type B = 'b';

// 方法一
export {type A, type B};

// 方法二
export type {A, B};
```



下面是 export type 将一个类作为类型输出的例子。

```typescript
class Point {
  x: number;
  y: number;
}

export type { Point };

// 使用
import type { Point } from './module';

const p:Point = { x: 0, y: 0 };
```



#### CommonJS 模块

CommonJS 是 Node.js 的专用模块格式，与 ES 模块格式不兼容。

#### import = 语句

TypeScript 使用`import =`语句输入 CommonJS 模块。

```typescript
import fs = require('fs');
const code = fs.readFileSync('hello.ts', 'utf8');
```

除了使用`import =`语句，TypeScript 还允许使用`import * as [接口名] from "模块文件"`输入 CommonJS 模块。

```typescript
import * as fs from 'fs';
// 等同于
import fs = require('fs');
```



#### export = 语句

TypeScript 使用`export =`语句，输出 CommonJS 模块的对象，等同于 CommonJS 的`module.exports`对象。

```typescript
let obj = { foo: 123 };

export = obj;
```

`export =`语句输出的对象，只能使用`import =`语句加载。

```typescript
import obj = require('./a');

console.log(obj.foo); // 123
```



#### 路径映射

TypeScript 允许开发者在`tsconfig.json`文件里面，手动指定脚本模块的路径。

（1）baseUrl

`baseUrl`字段可以手动指定脚本模块的基准目录。

`baseUrl`是一个点，表示基准目录就是`tsconfig.json`所在的目录。

```json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```



（2）paths

`paths`字段指定非相对路径的模块与实际脚本的映射。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"]
    }
  }
}
```



（3）rootDirs

`rootDirs`字段指定模块定位时必须查找的其他目录。

```json
{
  "compilerOptions": {
    "rootDirs": ["src/zh", "src/de", "src/#{locale}"]
  }
}
```



### 4.3 泛型

TypeScript 就引入了“泛型”（generics）。泛型的特点就是带有“类型参数”（type parameter）。

```ty
function getFirst<T>(arr:T[]):T {
  return arr[0];
}
```

函数`getFirst()`的函数名后面尖括号的部分`<T>`，就是类型参数，参数要放在一对尖括号（`<>`）里面。本例只有一个类型参数`T`，可以将其理解为类型声明需要的变量，需要在调用时传入具体的参数类型

函数调用时，需要提供类型参数。

```typescript
getFirst<number>([1, 2, 3])
// 可省略
getFirst([1, 2, 3])
//类型参数是一个联合类型不能省略的
```



类型参数的名字，可以随便取，但是必须为合法的标识符。习惯上，类型参数的第一个字符往往采用大写字母。一般会使用`T`（type 的第一个字母）作为类型参数的名字。如果有多个类型参数，则使用 T 后面的 U、V 等字母命名，各个参数之间使用逗号（“,”）分隔。

```typescript
function map<T, U>(
  arr:T[],
  f:(arg:T) => U
):U[] {
  return arr.map(f);
}

// 用法实例
map<string, number>(
  ['1', '2', '3'],
  (n) => parseInt(n)
); // 返回 [1, 2, 3]
```



#### 类型参数的约束条件

TypeScript 提供了一种语法，允许在类型参数上面写明约束条件，如果不满足条件，编译时就会报错。这样也可以有良好的语义，对类型参数进行说明。

类型参数的约束条件采用下面的形式。

```
<TypeParameter extends ConstraintType>
```

类型参数可以同时设置约束条件和默认值，前提是默认值必须满足约束条件。

```
type Fn<A extends string, B extends string = 'world'>
  =  [A, B];

type Result = Fn<'hello'> // ["hello", "world"]
```

#### 使用注意点

泛型有一些使用注意点。

1. 尽量少用泛型
   泛型虽然灵活，但是会加大代码的复杂性，使其变得难读难写。一般来说，只要使用了泛型，类型声明通常都不太易读，容易写得很复杂。因此，可以不用泛型就不要用。
2. 类型参数越少越好
   多一个类型参数，多一道替换步骤，加大复杂性。因此，类型参数越少越好。
3. 类型参数需要出现两次
   如果类型参数在定义后只出现一次，那么很可能是不必要的。也就是说，只有当类型参数用到两次或两次以上，才是泛型的适用场合。
4. 泛型可以嵌套
   类型参数可以是另一个泛型。



### 4.4 枚举

由于 TypeScript 的定位是 JavaScript 语言的类型增强，所以官方建议谨慎使用 Enum 结构，因为它不仅仅是类型，还会为编译后的代码加入一个对象。

Enum 结构比较适合的场景是，成员的值不重要，名字更重要，从而增加代码的可读性和可维护性。



TypeScript 就设计了 Enum 结构，用来将相关常量放在一个容器里面，方便使用。

```typescript
enum Color {
  Red,     // 0
  Green,   // 1
  Blue     // 2
}
```

## 参考三三

- [ts |网道]()
