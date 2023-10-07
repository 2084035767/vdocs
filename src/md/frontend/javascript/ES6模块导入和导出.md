# ES6 模块导入和导出

使用 ES6 可以方便地导入和导出模块。在 JavaScript 中，模块是文件或代码块，用于封装和组织代码，并允许在应用程序中引用它们。

## 导出

使用`export`关键字将一个或多个值从模块中导出。这些值可以是变量，函数或类。

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

- 导出多个变量时，使用花括号`{}`将它们一起包含在内。
- 导出默认值时，使用`export default`关键字。每个模块只能有一个默认值导出。

## 导入

使用`import`关键字将模块中的值导入到另一个模块中。可以将默认值和命名导入一起使用。

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

- 模块路径可以是相对的或绝对的。
- 导出的名称必须与导入的名称匹配。
- 当导入一个默认值时，可以使用任何名称来命名它。

## 示例

下面是使用 ES6 模块导入和导出的示例：

```javascript
Copy code// myModule.js
export const myVariable = "hello"

export function myFunction(name) {
  return `Hello, ${name}!`
}

export default class MyClass {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`)
  }
}

// app.js
import MyClass, {myVariable, myFunction} from "./myModule.js"

console.log(myVariable) // output: "hello"

console.log(myFunction("world")) // output: "Hello, world!"

const myObject = new MyClass("world")
myObject.sayHello() // output: "Hello, world!"
```