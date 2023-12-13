# 三、进阶知识

## 3.1 控制指令

在 Sass 中，用于控制流程的语句有：

*   `@if`, `@else` 条件判断语句
*   `@each` 遍历一个 list ， 或 一个 map 的键值对
*   `@for` 循环一定的次数
*   `@while` 循环直到遇到 `true` 值

### @if / @else

语法为 `@if <expression> { ... }` ， 如果表达式返回 `true` 则执行代码块中的语句，否则什么都不做。

还可以搭配 `@else if` 和 `@else` 语句，`@else if` 之后写另一个判断表达式，`@else` 语句会在前面的所有条件都不满足时执行。

也就是，`@if` 返回 `false` 就执行 `@else if` ，如果没有 `@else if` 就执行 `@else` ， 如果没有 `@else` 就什么到不做。

```
$size: 100px;

@if $size > 100px {
  @debug "大于 100 px";
} @else if $size == 100px {
  @debug "等于 100px";
} @else {
  @debug "小于 100px";
}

```

注意，表达式只有返回 `false` 或 `null` 才表示不满足条件，返回其它任何类型都表示满足条件。

### @for 循环

`@for` 循环语句，可以写成：

*   `@for <variable> from start to end { ... }`
*   `@for <variable> from start through end { ... }`

也就是有 `to` 和 `through` 的区别， `to` 表示不包含结束的数字， `through` 表示包含结束的数字。

```
@for $var from 1 to 5 {
  @debug $var;
}
// 1 2 3 4

@for $var from 1 through 5 {
  @debug $var;
}
// 1 2 3 4 5

```

### @each 循环

遍历一个 list 或一个 map ，语法为 `@each $item in $list { ... }` 。

使用 `@each` 可以方便的生成大量重复却有一点小变化的样式。

```
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

```

编译后的 css ：

```
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}

```

#### 遍历 map

语法为 `@each $key, $value in $map { ... }` 。

```
$font-size: (
  "big": 20px,
  "middle": 16px,
  "small": 14px,
  "mini": 12px,
);

@each $key, $value in $font-size {
  .font-#{$key} {
    font-size: $value;
  }
}

```

编译后的 css ：

```
.font-big {
  font-size: 20px;
}

.font-middle {
  font-size: 16px;
}

.font-small {
  font-size: 14px;
}

.font-mini {
  font-size: 12px;
}

```

#### 解构 list 中的 list

如果一个 list 中的元素也是 list，那么可以使用 `@each $a, $b, ..., $n in $list` 直接将内层 list 的值依次取出来。

```
$font: (
  "small" 14px 400 #f00,
  "middle" 16px 500 #0f0,
  "big" 18px 600 #00f,
);

@each $name, $size, $weight, $color in $font {
  .font-#{$name} {
    font-size: $size;
    font-weight: $weight;
    color: $color;
  }
}

```

编译后的 css ：

```
.font-small {
  font-size: 14px;
  font-weight: 400;
  color: #f00;
}

.font-middle {
  font-size: 16px;
  font-weight: 500;
  color: #0f0;
}

.font-big {
  font-size: 18px;
  font-weight: 600;
  color: #00f;
}

```

注意，如果 `@each` 后的变量数量多余内层数组的元素数量，多出来的变量将会得到 `null` 值。

```
$font: (
  "small" 14px 400 #f00,
  "middle" 16px 500 #0f0,
  "big" 18px 600 #00f,
);

@each $name, $size, $weight, $color, $other in $font {
  @debug $name, $size, $weight, $color, $other;
}

// "small", 14px, 400, #f00, null
// "middle", 16px, 500, #0f0, null
// "big", 18px, 600, #00f, null

```

每个 map 其实都算是一个包含键值对的列表，如果将上例中的 list 改成 map 类型：

```
$font: (
  "small": 14px 400 #f00,
  "middle": 16px 500 #0f0,
  "big": 18px 600 #00f,
);

@each $name, $size, $weight, $color, $other in $font {
  @debug $name, $size, $weight, $color, $other;
}

// "small", 14px 400 #f00, null, null, null
// "middle", 16px 500 #0f0, null, null, null
// "big", 18px 600 #00f, null, null, null

```

可以看到，遍历 list 和 map 时，`@each` 后的变量数量表示的意义有一点区别：

*   遍历 list 时，`@each` 之后的每个变量依次表示内层 list 的元素
*   遍历 map 时，`@each` 之后只有两个变量可以拿到值，第一个变量表示 map 的 key，第二个变量表示 map 的 值，尽管这个值也是一个 list，之后的变量都是 `null` 值。

### @while 循环

`@while` 语句，写为 `@while <expression>{ ... }` ， 如果它的表达式返回 `true`，则一直反复运行代码块。一直持续到表达式最终返回 `false` 为止。

```
$num: 5;

@while $num <= 10 {
  @debug $num;
  $num: $num + 1;
}

// 5 6 7 8 9 10

```

注意，如果能使用 `@for` 或 `@each` 语句实现的话，尽量不使用 `@while` 语句。

## 3.2 函数和运算

### 内置函数

*   url()
*   xxx

#### `url()`

`url()` 函数在 CSS 中很常用，但是它的语法与其他函数不同，它可以接受带引号的 url ，也可以接受不带引号的 url。因为未加引号的 URL 不是有效的 SassScript 表达式，所以 Sass 需要特殊的逻辑来解析它。

如果 `url()` 的参数是一个有效的无引号的 url ，Sass 会原样解析它，当然，插值也是可以用的。

如果参数不是一个有效的无引用的 url ，例如，如果它包含变量或函数调用，它将被解析为普通的 CSS 函数调用。

```
$roboto-font-path: "../fonts/roboto";

@font-face {
  // This is parsed as a normal function call that takes a quoted string.
  src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");
}

@font-face {
  // This is parsed as a normal function call that takes an arithmetic
  // expression.
  src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");
}

@font-face {
  // This is parsed as an interpolated special function.
  src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");
}

```

编译后的 css ：

```
@font-face {
  src: url("../fonts/roboto/Roboto-Thin.woff2") format("woff2");
}

@font-face {
  src: url("../fonts/roboto/Roboto-Light.woff2") format("woff2");
}

@font-face {
  src: url(../fonts/roboto/Roboto-Regular.woff2) format("woff2");
}

```

#### `calc()` 和 `element()`

`calc()` 和 `element()` 函数是在 CSS 规范中定义的。因为 calc() 的数学表达式与 Sass 的算法冲突，而 `element()` 的 id 可以被解析为颜色，所以它们需要特殊的解析。

Sass 允许任何文本出现在这些函数调用中，包括嵌套的圆括号。

除了可以使用插值来注入动态值会被编译处理。其他任何东西都不会被解释为 SassScript 表达式进行计算，而是原样输出。

#### `progid:...()` 和 `expression()` 弃用

`expression()` 和以 `progid:` 开头的函数是使用非标准语法的 Internet Explorer 遗留特性。尽管最近的浏览器已经不再支持它们，但是 Sass 继续解析它们以实现向后兼容。

#### `min()` 和 `max()`

CSS 在 `CSS Values and Units Level 4` 中增加了对 `min()` 和 `max()` 函数的支持，Safari 很快就采用了它们来支持 iPhoneX 。

但是 Sass 在很久以前就已经有了自己的 `min()` 和 `max()` 函数，为了向后兼容所有现有的样式表。这就需要额外的句法技巧来实现。

如果一个 `min()` 或 `max()` 函数调用是有效的纯 CSS ，它将被编译为普通的 CSS 的 `min()` 或 `max()` 函数调用。

"纯 CSS" 包括嵌套调用 `calc()` ， `env()` ， `var()` ， `min()` ，或 `max()` ，以及插值。

但是，只要调用的时候包含了 SassScript 特性 (如变量或函数调用)，它就会被认为是对 Sass 自带的 `min()` 或 `max()` 函数的调用。

### 自定义函数

Sass 中的函数有些类似于 javascript 中的函数，先定义一个函数，然后调用这个函数。

*   `@return` 只能且必须在 `@function` 中使用，也就是说二者必须同时出现。
*   `@function` 只能作为一个属性的值，因为它返回的就只能是一个 css 值，而不能是样式块。

```
// 定义一个函数，指定接收的参数，使用之后返回一个结果
@function fn(a, b, ..., n) {
  // ...
  @return $result;
}

// 调用一个函数
@debug fn();

```

Sass 中还有一个和函数非常类似的东西，叫做 mixin，具体用法查看 mixin 章节。

从技术上讲，函数可能会有一些副作用，比如设置全局变量，但这是非常不鼓励的。应该使用 mixin 来产生副作用，使用函数仅仅是用来做一些值的计算。

#### 默认参数

定义函数时可以提供默认参数值，如果调用时传递了对应参数，则忽略默认参数值，如果没有传递，则使用默认参数值。

```
@function sum ($a, $b: 16px) {
  @return $a + $b;
}

.div1 {
  font-size: sum(4px);
}

.div2 {
  font-size: sum(4px, 20px);
}

```

编译后的 css ：

```
.div1 {
  font-size: 20px;
}

.div2 {
  font-size: 24px;
}

```

#### 关键词参数

调用一个函数时，传递的参数默认地会按照定义参数的顺序依次传递给各参数，如果使用关键词参数，则可以打乱顺序来传递参数。

```
@function sum ($a, $b: 16px) {
  @return $a + $b;
}

.div1 {
  font-size: sum($b: 4px, $a: 20px);
}

```

#### 接收任意参数

如果一个函数可以允许用户传递任意个参数，那么可以使用任意参数来接收，写一个变量，后面紧跟三个点 `...` 即可。

```
@function sum($numbers...) {
  @debug $numbers; // list, 10px, 20px, 30px, 40px

  $sum: 0;

  @each $number in $numbers {
    $sum: $sum + $number;
  }

  @return $sum; // 100px
}

.div1 {
  width: sum(10px, 20px, 30px, 40px);
}

```

如上所示，任意参数将是一个 list 列表类型的数据，可以通过 `@each ... in ...` 进行遍历使用。

#### 接收带关键词的任意参数

如果传递给函数的参数是带关键词的，那么任意参数需要使用 `meta.keywords()` 来处理，处理后将返回一个 map 类型的数据。

如果没有将任意参数传递给 `meta.keywords()` 函数，那么这个任意参数列表就不允许接收带有关键词的参数，编译程序会报错。

```
@use 'sass:meta';

@function sum($numbers...) {
  @debug meta.keywords($numbers); // (a: 10px, b: 20px, c: 30px, d: 40px)

  $sum: 0;

  @each $key, $value in meta.keywords($numbers) {
    @if ($key == 'a') {
      $sum: $sum + $value;
    }
  }

  @return $sum;
}

.div1 {
  width: sum($a: 10px, $b: 20px, $c: 30px, $d: 40px);
}

```

#### 传递任意参数

接收的任意参数可以是一个列表（list），那么，也可以把一个列表作为任意参数传递，同样只需要在后面加上 `...` 即可。

```
$font: 16px, 600, #f00;

@debug font($font...);

```

同样，也可以把一个 `map` 作为任意参数传递：

```
$font: (
  weight: 600,
  size: 16px,
);

@debug font($font...);

```

#### 纯 css 函数

Sass 同样兼容 css 中的函数，Sass 在编译时将会保留这些函数的调用，当然，在调用时如果使用了 Sass 表达式，这些表达式依然会被编译成返回值。

```
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;

@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)

```

### 运算符



Sass 支持的运算操作符：

*   `==`, `!=` 判断两个值是否相等或不相等
*   `<`, `<=`, `>`, `>=` 比较两个值的大小
*   `+`, `-`, `*`, `/`, `%` 对数字来说它们就是正常的数学计算, 对于单位来说，有他们特殊的行为，和科学数学中单位的使用一致。
*   `and`, `or`, `not` 且、或、非操作符。
*   `+`, `-`, `/` 可以用于字符串拼接

在 Sass 的早期版本中，支持对颜色进行数学运算。两个颜色值相加时，会让他们的 RGB 各自相加生成一个新的颜色。

这种行为并不是很有用，因为 RGB 各个通道各自运算的算法并不能很好地与人类感知颜色的方式相匹配。

所以现在 Sass 添加了更有用的颜色相关的函数，而废弃了对颜色执行运算操作的支持。

#### 操作符优先级

操作符的优先级从高到低依次为：

*   一元操作符 `not`, `+`, `-`, `/`
*   `*`, `/`, `%`
*   `+`, `-`
*   `>`, `>=`, `<`, `<=`
*   `==`, `!=`
*   `and`
*   `or`
*   `=`

所有的优先级都可以通过括号 `()` 来调整，括号内的表达式优先计算。

Sass 还支持一个特殊的 `=` 操作符，该操作符只允许在函数参数中使用，它只创建一个不带引号的字符串，其两个操作数由 `=` 分隔。这是为了向后兼容非常老的 ie 语法而存在的。

```
.transparent-blue {
  filter: chroma(color = #00f);
}

```

编译后的 css ：

```
.transparent-blue {
  filter: chroma(color=#00f);
}

```

#### 相等运算符

*   Number 比较时，具有相同的值和相同的单位，或者当它们的单位在彼此之间转换时，它们的值是相等的，则返回 `true` 。  
    
*   String 比较的特殊之处在于，有引号和无引号的字符串如果字符内容相等，则返回 `true` 。  
    
*   Color 值比较时，只要 rgba 四个值都是相等的，则返回 `true` 。  
    
*   List 比较时，如果内容相等，则返回 `true` 。逗号分隔和空格分隔的列表不相等，括起来的列表不等于不括起来的列表。  
    
*   Map 比较时， 如果 key 和 value 都相等，则返回 `true` 。  
    
*   `true`, `false`, `null` 只和他们自身的值相等。  
    
*   Function 比较时，因为是引用类型，所以是同一引用才相等，不同引用即使写成完全一样也不相等。  
    

```
// Number 比较
@debug 1px == 1px; // true
@debug 1px != 1em; // true
@debug 1 != 1px; // true
@debug 96px == 1in; // true

// String 比较
@debug "Helvetica" == Helvetica; // true
@debug "Helvetica" != "Arial"; // true

// Color 比较
@debug hsl(34, 35%, 92.1%) == #f2ece4; // true
@debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8); // true

// List 比较
@debug (5px 7px 10px) == (5px 7px 10px); // true
@debug (5px 7px 10px) != (10px 14px 20px); // true
@debug (5px 7px 10px) != (5px, 7px, 10px); // true
@debug (5px 7px 10px) != [5px 7px 10px]; // true

// Map 比较
$theme: ("venus": #998099, "nebula": #d2e1dd);

@debug $theme == ("venus": #998099, "nebula": #d2e1dd); // true
@debug $theme != ("venus": #998099, "iron": #dadbdf); // true

// Boolean 和 null
@debug true == true; // true
@debug true != false; // true
@debug null != false; // true

// Function 比较
@debug get-function("rgba") == get-function("rgba"); // true
@debug get-function("rgba") != get-function("hsla"); // true

```

##### 比较运算符

`<`, `<=`, `>`, `>=` 分别表示小于，小于等于，大于，大于等于。

特殊的地方：

*   无单位的数字可以和有单位的比较
*   不兼容的单位不能放在一起比较，会报错

```
@debug 100 > 50; // true
@debug 10px < 17px; // true
@debug 96px >= 1in; // true
@debug 1000ms <= 1s; // true

// 无单位的数字可以和有单位的比较
@debug 100 > 50px; // true
@debug 10px < 17; // true

// 不兼容的单位
@debug 100px > 10s; // Error: Incompatible units px and s.

```

##### 数学运算符

`+`, `-`, `*`, `/`, `%` 用于数学运算。

特殊的地方：

*   不同单位的数字，只要单位是兼容的则可以放在一起做运算。
*   有单位的和无单位的可以做运算。
*   不兼容的单位不能放在一起做运算。

```
@debug 10s + 15s; // 25s
@debug 1in - 10px; // 0.8958333333in
@debug 5px * 3px; // 15px*px
@debug (12px/4px); // 3
@debug 1in % 9px; // 0.0625in

// 有单位的和无单位的可以做运算
@debug 100px + 50; // 150px
@debug 4s * 10; // 40s

// 不兼容的单位不能放在一起做运算
@debug 100px + 10s; // Error: Incompatible units px and s.

```

##### `+` 和 `-`作为一元操作符使用

可以把 `+` 和 `-` 写成一元操作符，它们只接受一个值:

`+` 返回表达式的值，不做任何改变。

`-` 返回表达式的负值，正数变负数，负数变正数。

```
@debug +(5s + 7s); // 12s
@debug -(50px + 30px); // -80px
@debug -(10px - 15px); // 5px

```

注意，因为 `-` 号既可以表示减法，也可以表示一元负值操作符，所以如果负值操作符出现在用空格分隔的列表中时，很容易造成迷惑。

比如 `10px -10px -20px -10px` 这个列表，其实是用空格分隔开的四个列表元素，分别是 `10px`, `-10px`, `-20px`, `-10px` ，但这也很容易被迷惑地认成这是一个连续的减法表达式。

所以为了保证安全区分减法和负值，应该做到：

*   做减法的时候，在 `-` 号的两边都写上空格。
*   做负数或一元操作符时，只在 `-` 号前面写空格，后面不写空格。
*   做一元否定出现在空格分隔的列表中时，使用括号包裹，比如 `10px (-10px) (-20px) (-10px)`

在 Sass 中，`-` 出现时代表的含义按以下优先级从高到低排序：

*   出现在标识符中，它将被视为连字符，并作为标识符的一部分。唯一的例外是在单位中，Sass 通常允许使用任何有效的标识符作为标识符，但数字后面的单位中不能包含连字符。
*   出现在一个表达式和数字之间，则被视为减法。
*   出现在两个数字之间，则被视为减法。
*   出现在一个字面量数字的前面，则被视为负数。
*   出现在一个非字面量数字前面，视为一元操作符。

```
@debug a-1; // a-1
@debug 5px-3px; // 2px
@debug 5-3; // 2
@debug 1 -2 3; // 1 -2 3

$number: 2;

@debug 1 -$number 3; // -1 3
@debug 1 (-$number) 3; // 1 -2 3

```

##### `/` 用于斜线分隔（Slash-Separated Values）

CSS 有一些属性支持使用斜线 `/` 将一些值分隔开。这意味着 Sass 必须知道用户写的 `/` 是作为属性值分隔符还是作为除法。

为了实现这个功能，如果两个数字用 `/` 隔开，Sass 会将其作为分隔符输出，而不是用于做除法运算。

要将 `/` 作为除法运算，至少需要满足以下条件之一：

*   Either expression is anything other than a literal number.
*   将运算结果存储在变量中或是由函数返回。
*   运算表达式被括号 `()` 包裹，但如果圆括号在包含操作的列表之外依然作为分隔符。
*   结果用于另一个非 `/` 的操作表达式中

如果想强制将 `/` 作为分隔符，可以写成 `#{<expression>} / #{<expression>}` 。

```
// 表达式两边都是数值，但任意一边不是字面量数值时，即视为除法
@debug 15px / 30px; // 15px/30px
@debug (10px + 5px) / 30px; // 0.5

// 表达式有一边不是数值类型时，不视为除法
@debug #{10px + 5px} / 30px; // 15px/30px

// 运算结果保存在变量中，被视为除法
$result: 15px / 30px;

@debug $result; // 0.5

// .. 运算结果由函数返回，视为除法
@function fifteen-divided-by-thirty() {
  @return 15px / 30px;
}

@debug fifteen-divided-by-thirty(); // 0.5

// 圆括号包裹表达式，视为除法
@debug (15px/30px); // 0.5
// 圆括号在包含操作的列表之外，依然作为分隔符
@debug (bold 15px / 30px sans-serif); // bold 15px/30px sans-serif

// 结果用于另一个非 `/` 的操作表达式中，视为除法
@debug 15px / 30px + 1; // 1.5

```

##### 单位在运算中的处理

Sass 对单位的操作是基于现实世界的单位计算的。当两个数相乘时，它们的单位也相乘。当一个数除以另一个数时，结果取第一个数的分子单位和第二个数的分母单位。一个数的分子和 / 或分母可以有任意数量的单位。

```
$num1: 4px * 6px; // 24px*px (read "square pixels")
$num2: 5px / 2s; // 2.5px/s (read "pixels per second")
$num3: 5px * 30deg / 2s / 24em; // 3.125px*deg/s*em (read "pixel-degrees per second-em")
$num4: 20deg / 1s; // 20deg/s
$num5: 1 / $num4; // 0.05s/deg

```

但是，CSS 是不支持像 `square pixels` 这样的复杂单位，使用带有复杂单位的数字作为属性值将会产生错误。如果没有得到正确的单位，这通常意味着你的计算出了问题。

可以使用 `@debug` 规则来检查任何变量或表达式的单位。

Sass 将在兼容的单元之间自动转换，尽管它将为结果选择哪个单元取决于您使用的 Sass 的哪个实现版本。如果你试图组合不兼容的单位，比如 `1in + 1em` ， Sass 将抛出一个错误。

```
// CSS defines one inch as 96 pixels.
@debug 1in + 6px; // 102px or 1.0625in
@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.

```

在现实世界的单位计算中，如果分子包含与分母单位兼容的单位 (如 `96px / 1in` )，它们就会抵消。

```
$num1: (96px / 1in); // 1

```

注意，要避免使用像 `#{$number}px` 这样的插值。这实际上并没有创建一个数字，它创建了一个看起来像数字的**无引号字符串**，但不能用于任何数字操作或函数。定义 `$number` 变量时可以带上单位 `px` ，或者写为 `$number * 1px`。

Sass 的百分比和其他单位一样。它们不能与小数互换，因为在 CSS 中小数和百分比表示不同的东西。例如，`50%` 是一个以 `%` 为单位的数字，Sass 认为它与 `0.5` 不同。

可以使用单位算术在小数和百分比之间进行转换。`$percentage / 100%` 将返回相应的小数，而`$decimal * 100%` 将返回相应的百分比。还可以使用 `math.percentage()` 函数作为 `$decimal * 100%` 的更显式的写法。

##### `+`, `-`, `/` 用于字符串

Sass 中的 `+`, `-`, `/` 还可以用于操作字符串。

*   `+` 号两边都是表达式时，作为拼接功能，两侧都没有引号时，结果就没有引号，否则有引号。
*   `/` 号两侧都是表达式时，返回以 `/` 分隔的无引号字符串，两侧分别是表达式的值。
*   `-` 号两侧都是表达式时，返回以 `-` 分隔的无引号字符串，两侧分别是表达式的值。

注意，`-` 号用于表达式连接符是一个历史遗留的操作符，现在应该使用插值 `#{}` 来代替。

使用插值来创建字符串通常比依赖操作符更清晰。

```
@debug "Helvetica" + " Neue"; // "Helvetica Neue"
@debug sans- + serif; // sans-serif
@debug #{10px + 5px} / 30px; // 15px/30px
@debug sans - serif; // sans-serif
@debug "Elapsed time: " + 10; // "Elapsed time: 10s";
@debug true + " is a boolean value"; // "true is a boolean value";

```

##### 一元操作符

由于历史原因，Sass 还支持 `/` 和 `-` 作为只接受一个值的一元操作符:

*   `/表达式` 返回一个以 `/` 开头，后跟表达式值的未加引号的字符串。
*   `-表达式` 返回一个以 `-` 开头，后跟表达式值的未加引号的字符串。

```
@debug / 15px; // /15px
@debug - moz; // -moz

```

#### Boolean 操作符

与 JavaScript 等语言不同，Sass 使用单词而不是符号来表示布尔操作符。

Sass 中的布尔操作符对应的 JavaScript 中的布尔操作符：

| Sass | JavaScript | 结果 | | -- | -- | -- `and` | `&&` | 两侧为 true 才返回 true `or` | `||` | 一侧为 true 则返回 true `not` | `!` | 布尔值取反

```
// and
@debug true and true; // true
@debug true and false; // false
@debug false and true; // false

// or
@debug true or false; // true
@debug false or true; // true
@debug false or false; // false

// not
@debug not true; // false
@debug not false; // true

```

##### Truthy 和 Falsy

在 Sass 中，只有 `false` 和 `null` 会被视为 Falsy 值，其他全部是 Truthy 值，包括 `0` ，空字符串等都是 Truthy 值。

```
// Falsy
@debug if(false, true, false); // false
@debug if(null, true, false); // false

// Truthy
@debug if(0, true, false); // true
@debug if("", true, false); // true
@debug if([], true, false); // true
@debug if((), true, false); // true

```

## 3.3 子模块和导入

创建子模块
导入子模块
