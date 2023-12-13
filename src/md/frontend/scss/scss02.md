# 二、基础知识

## 2.1 安装和配置环境

**安装 Sass 编译器**
要安装 Sass 编译器，需要先确保计算机上已经安装了 Node.js 和 NPM（Node.js 包管理器）。在确认已经安装了 Node.js 和 NPM 后，可以按照以下步骤进行安装：

1. 打开终端或命令行窗口，运行以下命令安装 Sass：

```shell
npm install -g sass
```

2. 安装完成后，可以通过以下命令检查 Sass 是否成功安装：

```shell
sass --version
```

如果正确输出 Sass 的版本号，则表示 Sass 已经成功安装。

安装完成后，就可以使用 Sass 编译器编写 Sass 样式表并将其转换成标准的 CSS 格式。Sass 编译器可以使用命令行工具或者集成到开发工具中使用。

## 2.2 基本语法

### 注释

支持两种注释，分别是：

*   单行注释 `// 注释文字`
*   多行注释 `/* 注释文字 */`

#### 单行注释

编译的时候会直接被忽略，不会编译到 CSS 中，所以也叫做 “隐式注释”（silent comments）。

```scss
// 注释内容
```

#### 多行注释

编译时会将注释编译到 css 中，所以也叫做 “显式注释”（loud comment）

```scss
/* 这一行会出现在编译的 css 中，除非是在压缩模式下则不会 */

/* 注释中还可以包含插值:
 * 1 + 1 = #{1 + 1} */

/*! 这行注释即使在压缩模式下也会编译到 css 中 */

p /* 多行注释可以写在任何
   * 允许空白出现的地方 */ .sans {
  font-size: 16px;
}
```

#### SassDoc

文档注释，类似于 jsdoc 。使用三斜线 `///` 声明。

```scss
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent) {
  $result: 1;

  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }

  @return $result;
}
```



### 变量

在 Sass 中，声明变量必须以 `$` 开头。

```scss
$red: #f00;

div {
  color: $red;
} 
```

> 注意：和所有的 Sass 标识符一样，Sass 变量将连字符 `-` 和下划线 `_` 视为相同的字符。

#### 默认值

Sass 提供了 `!default` 标志来实现默认值。只有当变量没有定义或者它的值为 `null` 时，才会给该变量赋值。否则，将使用默认的值。

```scss
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```

#### 内置变量

内置模块定义的变量是无法被修改的。

```scss
@use "sass:math" as math;

// This assignment will fail.
math.$pi: 0;
```

#### 作用域

在 css 文件顶层声明的变量是全局变量，声明后可以在模块中的任何地方被访问。

在块（`{}`）中声明的变量是局部变量，只能在声明它们的块内访问。

```scss
// 全局变量
$red: #f00;

div {
  // 局部变量
  $black: #000;

  color: $red;
}

p {
  // 在这里引用局部变量编译时会报错
  color: $black;
}
```

当局部变量和全局变量重名时，不会覆盖全局变量，而是同时存在，在哪个作用域访问的就是哪个变量。

如果想用一个局部变量去覆盖全局变量，也就是在块中修改全局变量的值，可以使用 `!global` 来完成

> !global 将修改全局变量的值，而不是在块中新建一个局部作用域

> 注意：如果使用 `!global` 的变量不是一个全局变量，则编译时会报错。



在流程控制语句中声明的变量有一个自己的特殊作用域，它不会创建新变量去覆盖同级作用域中的同名变量，而是简单地进行原变量的赋值修改操作。

在流程控制语句中，赋值给已经存在的变量则是修改操作，如果是不存在的变量则会创建一个新的变量，但这个新的变量也只能在这个流程控制语句的作用域中使用。

#### 检测变量是否存在

Sass 核心库提供了两个用于处理变量的高级函数。

- `meta.variable-exists()` 函数返回给定名称的变量是否在当前作用域中存在， 
- `meta.global-variable-exists()` 函数做同样的事情，但仅用于全局作用域。

```scss
@debug meta.variable-exists("var1"); // false

$var1: value;

@debug meta.variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;

  @debug meta.variable-exists("var2"); // true
}
@debug meta.global-variable-exists("var1"); // false

$var1: value;

@debug meta.global-variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;

  @debug meta.global-variable-exists("var2"); // false
}

```

#### 嵌套规则

> 注意：嵌套规则非常有用，但也可能会让你难以想象你实际生成的 CSS 量。您嵌套得越深，服务器提供 CSS 所需的带宽就越多，浏览器呈现它所花费的工作也就越多。请保持选择器的浅层嵌套！

Sass 允许您嵌套 CSS 选择器，嵌套方式 与 HTML 的视觉层次结构相同。请注意，过度嵌套的规则 将导致过度限定的 CSS，这些 CSS 可能很难维护，并且 通常被认为是不好的做法。

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

你将注意到 `ul`、`li` 和 `a` 选择器嵌套在 `nav` 选择器中。这是组织 CSS 并使其更具可读性的 好方法。

### 插值

插值几乎可以在 Sass 样式表的任何地方使用，以将 SassScript 表达式的结果嵌入到 CSS 块中。

在 `#{}` 中放置一个表达式即可，比如可以用在：

- 选择器
- 属性名
- 自定义属性值
- CSS 的 `@` 语句中
- `@extends`
- CSS `@imports`
- 字符串
- 特殊函数
- CSS 函数名
- 保留注释（Loud comments ） `/* ... */`

下面展示部分用法，在选择器，属性，继承，注释语句中使用插值：

```scss
$selector: "hello";
$color: "color";

/* selector: #{$selector} */
.#{$selector} {
  background-#{$color}: #f00;
}

.#{$selector}-2 {
  @extend .#{$selector};

  border-#{$color}: #f00;
}
```



```css
/* selector: hello */
.hello,
.hello-2 {
  background-color: #f00;
}

.hello-2 {
  border-color: #f00;
}
```

在 SassScript 中，可以使用插值表达式将 SassScript 注入到未加引号的字符串中。这在动态生成名称(例如动画)或使用斜杠分隔值时特别有用。

> 注意： SassScript 中的插值永远返回一个未加引号的字符串，在上面的例子中已经看到了。



Sass 有强大的单位运算，你可以使用它来代替。例如，与其写 `#{$width}px` ，不如写 `$width * 1px`，或者更好的是，以px开头声明`$width`变量。这样，`$width` 已经有单位，你将得到一个很好的错误消息，而不是编译伪造的CSS。



## 2.3 数据类型

*   Number, 可以是有单位或没有单位的值, 比如 `12` 或 `100px` 。  
    
*   String, 可以是有引号或没有引号的值, 比如 `"Helvetica Neue"` 或 `bold` 。  
    
*   Color, 可以通过十六进制表示或名称引用，如 `#c6538c` 或 `blue` ，或从函数返回，如 `rgb(107, 113, 127)` 或 `hsl(210, 100%， 20%)`。  
    
*   List, 必须用空格或逗号隔开，可以用方括号 `[]` 括起， 也可以不用， 比如 `1.5em 1em 0 2em`， `Helvetica, Arial, sans-serif`, 或是 `[col1-start]`.  
    

Sass 特有的值类型:

*   Boolean ， `true` 或 `false`  
    
*   null  
    
*   Map 键值对映射，圆括号包裹， 比如 `("background": red, "foreground": pink)` 。  
    
*   Function ， 由 `get-function()` 返回并由 `call()` 调用的函数引用。  
    

### Number

Sass 中的数字有两个组成部分：数字本身和它的单位。例如，在 `16px` 中，数字是 `16`，单位是 `px` 。数字可以没有单位，也可以有复杂的单位。

```scss
$num1: 100; // 100
$num2: 0.8; // 0.8
$num3: 16px; // 16px
$num4: 5px * 2px; // 10px*px (read "square pixels")
```

> 注意：Sass 不区分整数和小数，所以例如 `5 / 2` 返回 `2.5` 而不是 `2` 。这与 JavaScript 的行为相同，但与许多其他编程语言不同。

### 单位

Sass 对单位的操作是基于现实世界的单位计算的。当两个数相乘时，它们的单位也相乘。当一个数除以另一个数时，结果取第一个数的分子单位和第二个数的分母单位。一个数的分子和 / 或分母可以有任意数量的单位。

```scss
$num1: 4px * 6px; // 24px*px (read "square pixels")
$num2: 5px / 2s; // 2.5px/s (read "pixels per second")
$num3: 5px * 30deg / 2s / 24em; // 3.125px*deg/s*em (read "pixel-degrees per second-em")
$num4: 20deg / 1s; // 20deg/s
$num5: 1 / $num4; // 0.05s/deg

```

> 但是，CSS 是不支持像 `square pixels` 这样的复杂单位，使用带有复杂单位的数字作为属性值将会产生错误。

> 可以使用 `@debug` 规则来检查任何变量或表达式的单位。



### 精度（Precision）

Sass 数字支持小数点后最多 10 位的精度。这意味着：

*   生成的 CSS 只包含小数点后的数字的前 10 位。
*   像 `==` 和 `>=` 这样的运算，如果两个数字在小数点之后的前 10 位都是相同的，则认为它们是相等的，小数点之后 10 位以上数字直接被忽略。
*   如果一个数字与一个整数的距离小于 0.0000000001，对于像 `list.nth()` 这样需要整数参数的函数来说，它被认为是一个整数。

```scss
$num1: 0.012345678912345; // 0.0123456789
$num2: 0.01234567891 == 0.01234567899; // true
$num3: 1.00000000009; // 1
$num4: 0.99999999991; // 1

```

### String

字符串是字符序列 (Unicode 码位)。Sass 支持两种内部结构相同但呈现方式不同的字符串：带引号的字符串，如 `"Helvetica Neue"`，以及不带引号的字符串 (也称为标识符)，如 `bold` 。

-  `string.unquote()` 函数将带引号的字符串转换为不带引号的字符串
- `string.quote()` 函数将不带引号的字符串转换为带引号的字符串。

```scss
@use "sass:string";

@debug string.unquote(".widget:hover"); // .widget:hover
@debug string.quote(bold); // "bold"

```

### 转义（Escapes）

所有 Sass 字符串都支持标准的 CSS 转义码:

*   除了所有字母和数字以外之外的任何字符都可以通过在前面写 `\` 来作为字符串的一部分
*   任何字符都可以作为字符串的一部分，方法是在 `\` 后面加上十六进制 Unicode 码，不同字符的 Unicode 码用空格分隔。

```scss
@debug "\""; // '"'
@debug \.widget; // \.widget
@debug "\a"; // 一个不可见的换行符
@debug "line1\a line2"; // "line1换行line2"
@debug "Nat + Liz \1F46D"; // "Nat + Liz  "

```

### 带引号的 string

带引号的字符串写在单引号或双引号之间，如 `"Helvetica Neue"`。可以包含插值，以及任何未转义的字符，除了:

*   `\` ， 需要使用 `\\` 来转义; `'` 或 `"`， 需要使用 `\'` 或 `\"` 来转义
*   换行, 需要写为 `\a` 并加一个空格与后面的内容隔开

带引号的字符串保证被编译成与原始 Sass 字符串内容相同的 CSS 字符串。

```scss
@debug "Helvetica Neue"; // "Helvetica Neue"
@debug "C:\\Program Files"; // "C:\\Program Files"
@debug "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
@debug "line1\a line2"; // "line1\a line2"

$roboto-variant: "Mono";

@debug "Roboto #{$roboto-variant}"; // "Roboto Mono"

```

带引号的字符串放入插值中时，它的引号将被删除。这使得编写包含选择器的字符串变得很容易，例如，选择器可以被注入到样式规则中，而不需要添加引号。

### 不带引号的字符串

不带引号的字符串就是写 CSS 标识符。它们可能包括任何地方的插值。

```scss
@debug bold; // bold
@debug -webkit-flex; // -webkit-flex
@debug --123; // --123

$prefix: ms;

@debug -#{$prefix}-flex; // -ms-flex

```

当然，并不是所有的标识符都被解析为不带引号的字符串:

*   CSS 颜色名称被解析为 color 类型。
*   `null` 被解析为 Sass 的 `null` 值。
*   `true` 和 `false` 被解析为 boolean 类型。
*   `not`, `and`, `or` 被解析为 boolean 操作符



### Color

Sass 颜色可以写成：

*   十六进制代码， 比如 `#f2ece4`，或者包含透明值的 `#b37399aa`
*   CSS 颜色名称， 比如 `midnightblue` , `transparent`
*   函数， 比如 `rgb()` 、 `rgba()` 、 `hsl()` 和 `hsla()` 。

```scss
@debug #f2ece4; // #f2ece4
@debug #b37399aa; // rgba(179, 115, 153, 67%)
@debug midnightblue; // #191970
@debug rgb(204, 102, 153); // #c69
@debug rgba(107, 113, 127, 0.8); // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%); // #dadbdf
@debug hsla(20, 20%, 85%, 0.7); // rgb(225, 215, 210, 0.7)

```

Sass 支持许多有用的 color 函数来在现有颜色的基础上创建新的颜色。可以通过混合颜色或缩放颜色的色相、饱和度或明度。

```scss
$venus: #998099;

@debug scale-color($venus, $lightness: +15%); // #a893a8
@debug mix($venus, midnightblue); // #594d85

```

### List

列表包含其他值的序列。在 Sass 中，列表中的元素可以用逗号分隔，或空格分隔，但不能混合使用空格和逗号。

与大多数其他语言不同，Sass 中的列表不需要特殊的方括号，任何用空格或逗号分隔的表达式都可以算作一个列表。当然，也允许使用方括号来编写列表

Sass 列表可以包含任意个元素，甚至是包括 0 个。

```scss
$border1: (1px solid #f00);
$border2: (1px, solid, #f00);
$border3: [1px solid #f00];
$border4: [1px, solid, #f00];

.div1 {
  border: $border1;
}

.div2 {
  border: $border2;
}

.div3 {
  border: $border3;
}

.div4 {
  border: $border4;
}

```

### 索引

Sass 的列表中第一个元素的索引为 `1`，不同于大多数语言索引从 `0` 开始。

`-1` 表示列表中的最后一个元素，`-2` 表示倒数第二个元素，以此类推。

### 访问某个元素

使用 `list.nth($list, $index)` 函数获取一个列表中的值，第一个参数表示列表，第二个参数表示要获取元素的索引。

```scss
@use 'sass:list';

@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3

```

### 遍历列表

使用 `@each $ele in $list` 语句来遍历一个列表， `$ele` 表示当前循环的列表元素， `$list` 表示要遍历的列表。

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

```



### 追加元素

使用 `list.append($list， $val)` 函数，第一个参数为目标列表，第二个参数为要追加的元素，并返回一个在末尾追加了新元素的的新的列表。注意，因为 Sass 列表是不可变的，所以它不会修改原始列表。

```scss
@use 'sass:list';
@debug list.append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug list.append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

### 查找元素的索引

使用 `list.index($list, $value)` 函数，第一个参数为目标列表，第二个参数为目标元素，找到元素返回索引值，找不到返回 `null` 。

```scss
@use 'sass:list';

@debug list.index(1px solid red, 1px);  // 1
@debug list.index(1px solid red, solid);  // 2
@debug list.index(1px solid red, dashed);  // null

```

### 列表的不可变性（Immutability）

Sass 中的列表是不可变的，这意味着列表值的内容永远不会改变。Sass 的列表函数只能返回一个新的列表，而不是修改原始列表。

不可变性有助于在各个地方共用一个列表时，避免因为列表被更改而出现一些 Bug。

所以，如果一个变量表示的列表需要修改，应该将新的列表赋值给这个变量。

```scss
@use 'sass:list';

$list: (10px 12px 16px);

$list: list.append($list, 25px);

@debug $list; // 10px 12px 16px 25px

```

### 参数列表

当你声明一个接收任意参数的 mixin 或 function 时，任意参数这个变量将会是一个特殊的列表，称为 **参数列表** 。这个变量就像是一个列表，包含传递给 mixin 或 function 的所有参数，

如果用户传递的关键字参数，可以将参数列表传递给 `meta.keywords()` 函数，将返回一个 map 类型的值。

```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  // map 类型的值 (string: #080, comment: #800, variable: #60b)
  @debug meta.keywords($args);

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)

```

### Map

`map` 用来表示键值对的映射，格式为 `(key1: value, key2: value)` ，其中 key 必须唯一。

```scss
$tag: (
  "primaryColor": #f00,
  "size": 16px
);

$empty: ();

```

与列表不同， map 必须用圆括号 `()` 括起来。空的 map 写为 `()` 。



map 允许使用任何 Sass 值作为它的 key 。 Sass 将会用 `==` 操作符来判断两个 key 是否重复。

> 大多数情况下，强烈推荐使用**带引号的字符串**作为 map 的 key 。因为有些值，比如颜色名，看起来像未加引号的字符串，但实际上不是字符串而是其他类型。为了避免混乱的问题，字符串作为 key 时都应该加上引号。

由于 map 不是合法的 CSS 值，它们自己不会做很多事情。这就是为什么 Sass 提供了一堆函数来创建 map 并访问它们包含的值。

### 访问 map 的值

通过 `map.get($map, $key)` 函数来访问值，第一个参数表示 map ，第二个参数表示对应的 key ，指定的 key 不存在时返回 `null` 。

```scss
@use "sass:map";

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null

```

### 遍历 map

通过 `@each` 语句对一个 map 进行遍历。

```scss
$colors: (
  "red": #f00,
  "green": #0f0,
  "blue": #00f,
);

@each $key, $value in $colors {
  .icon-#{$key} {
    color: $value;
  }
}

```



### 修改 map

向 map 添加新的键值对或修改已存在的键值对。使用 `map.set($map， $key， $value)` 函数， 它返回设置完成后的新的 map ，不会修改原 map 。

```scss
@use "sass:map";

$colors: (
  "red": #f00,
  "green": #0f0,
  "blue": #00f,
);

@debug map.set($colors, "red", #a11);
// ("red": #a11, "green": #0f0, "blue": #00f)

@debug map.set($colors, "warning", #ff5);
// ("red": #f00, "green": #0f0, "blue": #00f, "warning": #ff5)

```

### 合并 map

可以使用 `map.merge($map1, $map2)` 函数合并 map 并返回合并后的新 map 。

```scss
@use "sass:map";

$colors: (
  "red": #f00,
  "green": #0f0,
  "blue": #00f,
);

$colors2: (
  "yellow": #ff0,
  "skyblue": #0ff
);

@debug map.merge($colors, $colors2);
// ("red": #f00, "green": #0f0, "blue": #00f, "yellow": #ff0, "skyblue": #0ff)

```

### 不可变性

和 list 一样，Sass 中的 map 被创建后是不可变的，所以所有的 map 方法都不是直接修改原 map ， 而是操作完成后返回一个新的 map 出来。

所以通常应该将新创建的 map 赋值给原变量进行覆盖。

### Function

Sass 本身已经有很多内置的函数可供使用，比如 `rgba()` , `nth()` , `if()` 等。

`@function` 的定义方式和 `@mixin` 非常类似，但是调用的时候不需要 `@include` 而是直接调用。

```scss
@function my-color () {
  @return #f00;
}

.div {
  background-color: my-color();
}

```



> `@function` 与 `@mixin` 不同之处在于，函数返回的只能是一个值，而不是一段 css 样式代码，也就是说函数返回的结果只能作为变量值或属性值。

### Boolean

布尔值是逻辑值 `true` 和 `false` 。除了它们的字面量形式，布尔值还可以由比较运算符和关系操作符以及许多内置函数（如 `math.comparable()` 和 `map. haskey()` ）返回。

```scss
@use "sass:math";

@debug 1px == 2px; // false
@debug 1px == 1px; // true
@debug 10px < 3px; // false
@debug math.comparable(100px, 3in); // true

```

使用 boolean 操作符

```scss
@debug true and true; // true
@debug true and false; // false
@debug true or false; // true
@debug false or false; // false
@debug not true; // false
@debug not false; // true
```

### Truthy 和 Falsy

和其他语言不同的是，在 Sass 中，只有 `false` 和 `null` 被看作 Falsy 值，其他都是 Truthy 值，比如，空字符层，0 等值都是 Truthy 值。

### null

`null` 值也是该类型的唯一值。它表示没有值，通常由函数返回，表示没有结果。

```scss
@use "sass:map";
@use "sass:string";

@debug string.index("Helvetica Neue", "Roboto"); // null
@debug map.get(("large": 20px), "small"); // null
@debug &; // null

```

如果列表中包含一个空值，则生成的 CSS 中将省略这个空值。

如果属性值为空，则完全省略该属性。

## 2.4 选择器

和 css 一样，使用选择器来选择要应用样式的元素，然后通过 css 属性和属性值来控制元素看起来是什么样的。

但和 css 的子选择器不同的是，sass 中允许规则嵌套，这样在写子选择器时就不用再重复书写父选择器了。

```scss
// 后代选择器， .ancestor 内所有层级的 .descendant 都会被选中
.ancestor {
  .descendant {
    font-size: 16px;
  }
}

// 子选择器， .father 下一级中的 .son 会被选中，超过一级则不会
.father {
  > .son {
    font-size: 16px;
  }
}

// 后一个兄弟选择器， .prev 同级的后面紧邻的 .next 会被选中
.prev {
  + .next {
    font-size: 16px;
  }
}

// 后所有兄弟选择器， div 同级的后面所有的 p 元素都会被选中
div {
  ~ p {
    font-size: 16px;
  }
}

```

> 注意：嵌套规则在书写时非常有帮助，但是它们也会使你很难看到你实际生成了多少 CSS 。嵌入的越深，服务 CSS 需要的带宽就越多，浏览器渲染 CSS 需要的工作也就越多。嵌套应该尽可能浅。

选择器列表：

```scss
.alert,
.warning {
  ul,
  p {
    font-size: 16px;
  }
}

```

#### 父选择器 `&`

父选择器 `&` 是 Sass 发明的一个特殊选择器，用于嵌套选择器中引用外部选择器。它使得以更复杂的方式重用外部选择器成为可能，比如添加一个伪类或在父类之前添加一个选择器。

当一个父选择器在一个内部选择器中使用时，它会被相应的外部选择器替换。这代替了正常的嵌套行为。

```scss
.alert {

  // 用父选择器向外部选择器添加伪类。
  &:hover {
    font-weight: bold;
  }

  // 它还可以在特定的上下文中用于样式化外部选择器
  // 例如使用从右到左的语言设置主体。
  [dir=rtl] & {
    margin-left: 0;
    margin-right: 10px;
  }

  // 甚至可以将它用作伪类选择器的参数。
  :not(&) {
    opacity: 0.8;
  }

  // 将父选择器用于拼接生成一个新的选择器
  &-one {
    color: #f00;
  }
  &-two {
    color: #f00;
  }
}

```

> 注意：因为父选择器 `&` 可能被像 `h1` 这样的元素选择器（type selector）替换，所以当需要使用父选择器拼接一个复合选择器（compound selector）时，`&` 只能出现在复合选择器的开头，例如，`span&`， `.hi&` 是不允许的，只能是 `&span`， `&.hi` 这样的。



#### 添加后缀

您还可以使用父选择器向外部选择器添加额外的后缀。当使用像 BEM 这样使用高度结构化的类名的方法时，这一点特别有用。只要外部选择器以字母数字名称 (如 class、ID 和元素选择器) 结束，您就可以使用父选择器来附加额外的文本。

```scss
.container {
  font-size: 16px;

  &__switch {
    color: #f00;

    &--active {
      display: block;
    }
  }
}

```

#### In SassScript

父选择器也可以在 SassScript 中使用。它是一个特殊表达式，以选择器函数使用的相同格式返回当前的父选择器：一个逗号分隔的选择器列表，其中包含未加引号的字符串 (复合选择器)。

```scss
/* 因为这是不合法的代码，所以在注释中显示

.main aside:hover,
.sidebar p {
  parent-selector: &;
  // => ((unquote(".main") unquote("aside:hover")),
  //     (unquote(".sidebar") unquote("p")))
}

*/

```

如果 `&` 表达式在任何样式规则之外使用，它返回 `null` 。因为 `null` 是 `falsy` 值，这意味着你可以很容易地使用它来确定一个 mixin 是否在一个样式规则中被调用。



#### 高级嵌套

你可以使用 `&` 作为一个普通的 SassScript 表达式，这意味着你可以将它传递给函数或者在插值中包含它，甚至在其他选择器中! 将它与选择器函数和 `@at-root` 规则结合使用，可以以非常强大的方式嵌套选择器。

例如，假设你想写一个匹配外部选择器和元素选择器的选择器。你可以编写一个像这样的 mixin，使用 `selector. unified()` 函数来将 `&` 与用户的选择器结合起来。

```scss
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;
  }
}

.wrapper .field {
  @include unify-parent("input") {
    /* ... */
  }

  @include unify-parent("select") {
    /* ... */
  }
}

```

> 注意，当 Sass 在嵌套选择器时，它不知道使用了什么插值来生成它们。这意味着即使你使用 `&` 作为 SassScript 表达式，它也会自动将外部选择器添加到内部选择器中。这就是为什么你需要显式地使用 `@at-root` 规则来告诉 Sass 不要包含外部选择器。

```scss
.a {
  &.b {
    font-size: 16px;
  }
  #{&}.c {
    font-size: 16px;
  }

  @at-root #{&}.d {
    font-size: 16px;
  }
}

```

#### `@at-root`

通常用于嵌套的选择器中，在选择器前写下 `@at-root` 语句，用于将该选择器编译到样式表的最外层，而不是嵌套所在的位置。

```scss
.div1 {
  color: #f00;
  .div2 {
    color: #0f0;

    // 将 .div3 编译到最外层
    @at-root .div3 {
      color: #00f;
    }
  }
}
```



#### 样式属性

在 css 中，很多属性名都是以相同的前缀开始的，比如 `font-family`, `font-size` 和 `font-weight` 都是以 `font-` 开头的，sass 中可以这样写：

```scss
.div1 {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
  font: {
    family: serif;
    size: 16px;
    weight: 600;
  }
}

```



隐藏属性声明：

可以将属性值设置为 `null` 或无引号字符串，这样 Sass 在编译时就不会将他们编译到 css 中。

#### 自定义属性

CSS 自定义属性，也称为 CSS 变量，有一种不同寻常的声明语法。它允许在声明值中包含几乎任何文本。也就是说，`--color: $color` 中的 `$color` 在 css 中已经是合法的，sass 不知道用户在这里想要一个叫做 `$color` 的 sass 变量，还是就想要 `$color` 这样一个字符串。

因此，sass 遇到自定义属性统统都会按原样编译成 CSS。除非是显示使用插值表达式 `#{}` 告诉 sass 这里是一个表达式，需要被计算后输出。也就是说，插值表达式是将动态值注入自定义属性的唯一方法。

插值表达式有一点不幸的是，插值表达式中表达式计算后，会删除字符串中的引号，这使得我们没办法使用变量将一个带引号的字符串作为自定义属性的值。

```scss
$primary: #81899b;
$quoted: "hello";
:root {
  // $primary 像一个 Sass 变量，但它是有效的 CSS 代码，所以它不会被编译计算
  --other: $primary;

  // 想要插入一个变量，必须使用插值表达式
  --primary: #{$primary};

  // 插值插入一个有引号的字符串，编译后引号会被去除
  --quoted: #{$quoted};
}
```

上例中，变量中的引号在插值表达式计算后被去除了，作为一种解决方案，需要使用 `meta.inspect()` 函数来保留引号。

```
@use "sass:meta";

$quoted: "hello";
:root {
  --quoted: #{meta.inspect($quoted)};
}

```

嵌套规则在处理选择器列表（即逗号分隔的选择器）方面非常聪明。每个复合选择器（逗号之间的那些）都被单独地嵌套，然后它们被组合回一个选择器列表中。

```scss
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```

### 选择器组合器

您还可以嵌套使用组合器的选择器。您可以将组合器放置在外部选择器的末尾，在内部选择器的开头，甚至可以将其独立放置在两者之间。

```scss
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```

## 2.5 高级嵌套

### 混合器（Mixin）

CSS 中有一些东西写起来比较繁琐，特别是在处理 CSS3 和众多存在的厂商前缀时。Mixin 让您能够创建希望在整个站点上重复使用的 CSS 声明组。它有助于使您的 Sass 保持 DRY（Don't Repeat Yourself）原则。您甚至可以传递值以使 mixin 变得更加灵活。以下是一个主题示例：

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

要创建 mixin，您可以使用@mixin 指令并为其命名。我们将 mixin 命名为 theme。我们还在括号中使用了变量`$theme`，以便我们可以传递任何想要的主题。创建 mixin 之后，您可以将其用作 CSS 声明，从`@include` 开始，后跟 mixin 的名称。

### 继承（@extend）

使用`@extend` 指令可以让您将一个选择器中的一组 CSS 属性共享到另一个选择器中。在我们的示例中，我们将使用与 extend 相辅相成的另一个功能——占位符类，创建一个简单的错误、警告和成功消息系列。占位符类是一种特殊类型的类，只有在被继承时才会打印出来，可以帮助保持编译后的 CSS 整洁和清晰。

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

神奇的事情发生在生成的 CSS 中，每个类都将获得与`%message-shared` 相同的 CSS 属性。这有助于避免在 HTML 元素上编写多个类名。

请注意，`%equal-heights` 中的 CSS 未生成，因为从未扩展`%equal-heights`。

### 占位符

Sass 有一种特殊的选择符，称为 “占位符”。它的外观和行为很像一个类选择器，但是它以 `%` 开头，并且它不包含在 CSS 输出中。事实上，任何包含占位符的复杂选择器(逗号之间的) 都不会包含在 CSS 中，任何选择器都包含占位符的样式规则也不会包含在 CSS 中

```scss
.alert:hover,
%strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: #f00;
}

```

它可以被继承（extend），普通的 class 选择器不管有没有被继承都会被编译到 css 中，但占位符选择器没有被继承时，不会生成任何多余的 css。

```scss
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, 0.12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, 0.5) solid; }
}

.action-buttons {
  @extend %toolbelt;

  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;

  color: #cddc39;
}

```

根据经验，在编写 Sass 库时，占位符选择符会很有用，每个样式规则都可以使用，也可以不使用。

如果您只是为自己的应用程序编写样式表，扩展 class 选择器就行了。
