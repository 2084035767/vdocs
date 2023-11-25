# 三、基础知识

## 3.1 数据类型

### 整数型

> isize 和 usize 两种整数类型是用来衡量数据大小的，它们的位长度取决于所运行的目标平台，如果是 32 位架构的处理器将使用 32 位位长度整型。

| 位长度  | 有符号 | 无符号 |
| :------ | :----- | :----- |
| 8-bit   | i8     | u8     |
| 16-bit  | i16    | u16    |
| 32-bit  | i32    | u32    |
| 64-bit  | i64    | u64    |
| 128-bit | i128   | u128   |
| arch    | isize  | usize  |

### 浮点数型

| 位长度 | 类型      |
| ------ | --------- |
| 32-bit | f32       |
| 64-bit | f64(默认) |

### 布尔型

| 位长度 | 类型  |
| ------ | ----- |
| 1-bit  | true  |
| 1-bit  | false |

### 其他型

| 长度  | 类型 |
| ----- | ---- |
| 4-B   | char |
| 1-bit | NaN  |



 

## 3.2 运算符

### 算术和逻辑二元运算符

| 符号 | 整数     | `bool`   | 浮点数    | 用于重载此运算符的 trait | 用于重载此运算符的复合赋值(Compound Assignment) Trait |
| ---- | -------- | -------- | --------- | ------------------------ | ----------------------------------------------------- |
| `+`  | 加法     |          | 加法      | `std::ops::Add`          | `std::ops::AddAssign`                                 |
| `-`  | 减法     |          | 减法      | `std::ops::Sub`          | `std::ops::SubAssign`                                 |
| `*`  | 乘法     |          | 乘法      | `std::ops::Mul`          | `std::ops::MulAssign`                                 |
| `/`  | 除法*    |          | 取余      | `std::ops::Div`          | `std::ops::DivAssign`                                 |
| `%`  | 取余     |          | Remainder | `std::ops::Rem`          | `std::ops::RemAssign`                                 |
| `&`  | 按位与   | 逻辑与   |           | `std::ops::BitAnd`       | `std::ops::BitAndAssign`                              |
| `|`  | 按位或   | 逻辑或   |           | `std::ops::BitOr`        | `std::ops::BitOrAssign`                               |
| `^`  | 按位异或 | 逻辑异或 |           | `std::ops::BitXor`       | `std::ops::BitXorAssign`                              |
| `<<` | 左移位   |          |           | `std::ops::Shl`          | `std::ops::ShlAssign`                                 |
| `>>` | 右移位** |          |           | `std::ops::Shr`          | `std::ops::ShrAssign`                                 |

\* 整数除法趋零取整。

** 有符号整数类型算术右移位，无符号整数类型逻辑右移位。

### 比较运算符

| 符号 | 含义       | 须重载方法                 |
| ---- | ---------- | -------------------------- |
| `==` | 等于       | `std::cmp::PartialEq::eq`  |
| `!=` | 不等于     | `std::cmp::PartialEq::ne`  |
| `>`  | 大于       | `std::cmp::PartialOrd::gt` |
| `<`  | 小于       | `std::cmp::PartialOrd::lt` |
| `>=` | 大于或等于 | `std::cmp::PartialOrd::ge` |
| `<=` | 小于或等于 | `std::cmp::PartialOrd::le` |

### 短路布尔运算符

| 符号 | 含义 | 须重载方法 |
| ---- | ---- | ---------- |
| `&&` | 与   |            |
| `||` | 或   |            |

## 3.3 控制流程

### 条件语句

**if 语句**

> 条件表达式不需要用小括号包括（注意，不需要不是不允许），但是 Rust 中的 if 后必须加 {} ，不允许使用一个语句代替一个块。

```rust
fn main() {
    let number = 3;
    if number < 5 { 
        println!("条件为 true");
    } else {
        println!("条件为 false");
    }
}
```



**else-if 语法**

```rust
fn main() {
    let a = 12;
    let b;
    if a > 0 {
        b = 1;
    } 
    else if a < 0 {
        b = -1;
    } 
    else {
        b = 0;
    }
    println!("b is {}", b);
}
```



### 循环语句

### while

```rust
fn main() {
  let mut number = 1;
  while number != 4 {
    println!("{}", number);
    number += 1;
  }
  println!("EXIT");
}
```

### for

```rust
fn main() {
  for i in 1..=5 {
    println!("值为 : {}", i);
  }
}
```



### loop

```rust
fn main() {
  let s = ['R', 'U', 'N', 'O', 'O', 'B'];
  let mut i = 0;
  loop {
    let ch = s[i];
    if ch == 'O' {
      break;
    }
    println!("**\'**{}**\'**", ch);
    i += 1;
  }
}
```



## 3.4 函数

函数在 Rust 语言中是普遍存在的。

> 其中 Rust 函数名称的命名风格是小写字母以下划线分割

```rust
fn main() {
  println!("Hello, world!");
  another_function();
}

fn another_function() {
  println!("Hello, runoob!");
}
```



### 函数参数

Rust 中定义函数如果需要具备参数必须声明参数名称和类型

```rust
fn main() {
  another_function(5, 6);
}

fn another_function(x: i32, y: i32) {
  println!("x 的值为 : {}", x);
  println!("y 的值为 : {}", y);
}
```



### 函数体的语句和表达式

Rust 函数体由一系列可以以表达式（Expression）结尾的语句（Statement）组成。到目前为止，我们仅见到了没有以表达式结尾的函数，但已经将表达式用作语句的一部分。

语句是执行某些操作且没有返回值的步骤。

```rust
let a = 6;
```

表达式有计算步骤且有返回值。以下是表达式（假设出现的标识符已经被定义）

```rust
a = 7
b + 2
c * (a + b)
```

Rust 中可以在一个用 **{}** 包括的块里编写一个较为复杂的表达式：

```rust
fn main() {
  let x = 5;

  let y = {
    let x = 3;
    x + 1
  };

  println!("x 的值为 : {}", x);
  println!("y 的值为 : {}", y);
}
```



这段程序中包含了一个表达式块

> 注意：**x + 1** 之后没有分号，否则它将变成一条语句！

```rust
{
    let x = 3;
    x + 1
};
```

而且在块中可以使用函数语句，最后一个步骤是表达式，此表达式的结果值是整个表达式块所代表的值。这种表达式块叫做函数体表达式。



在 Rust 中，函数定义可以嵌套

```rust
fn main() {
  fn five() -> i32 {
    5
  }
  println!("five() 的值为: {}", five());
}
```



### 函数返回值

在参数声明之后用 **->** 来声明函数返回值的类型

在函数体中，随时都可以以 return 关键字结束函数运行并返回一个类型合适的值。

> **注意：**函数体表达式并不能等同于函数体，它不能使用 **return** 关键字。

```rust
fn add(a: i32, b: i32) -> i32 {
  return a + b;
}
```

但是 Rust 不支持自动返回值类型判断！如果没有明确声明函数返回值的类型，函数将被认为是"纯过程"，不允许产生返回值，return 后面不能有返回值表达式。这样做的目的是为了让公开的函数能够形成可见的公报。

