# 五、最佳实践

## 5.1 代码结构

### 文件和目录结构

### 命名规则

## 5.2 性能优化

### 减少选择器的复杂度

#### 合理使用 @extend 和混合器

在写样式时，经常会出现这样的情况：一个 class 会拥有另一个 class 的所有样式，以及它自己的特定样式。

例如，BEM 方法鼓励修饰符类使用与块类或元素类相同的元素。但是这可能会创建混乱的 HTML，很容易因为忘记包含这两个类而出错，并且它会给您的标记带来非语义样式的问题。

```
<div>
  Oh no! You've been hacked!
</div>
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}

```

Sass 的 `@extend` 语句解决了这个问题。它写的是 `@extend <selector>`，它告诉 Sass 一个选择器应该继承另一个选择器的样式。

```
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;

    border-width: 3px;
  }
}

```

编译后的 css ：

```
.error,
.error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}

```

可以看到，Sass 中继承并不是将继承的样式代码复制一份过来，而是将当前使用了继承的选择器添加到目标样式块上去。

这样，在元素上就可以写 `class="error--serious"` 而不需要写成 `class="error error--serious"` 了。

Sass 在继承时，不仅是继承一个选择器本身的样式，它会继承这个选择器使用的所有样式，比如伪类。

```
.error {
  color: #f00;
}

.error:hover {
  border: 1px solid #f00;
}

.error--serious {
  @extend .error;

  font-size: 20px;
}

```

编译后的 css ：

```
.error,
.error--serious {
  color: #f00;
}

.error--serious {
  font-size: 20px;
}

.error:hover,
.error--serious:hover {
  border: 1px solid #f00;
}

```

注意，继承其实是在样式表其余的所有部分编译完成之后才发生的。尤其是在 Sass 中的父选择器 `&` 已经被解析之后才会开始继承。这意味着，使用 `@extend .error` 不会影响到 `.error { &__icon { ...} }` 内的选择器，同样也意味着，父选择器 `&` 无法看到继承的结果。

#### 仅用于被继承的占位选择器

如果一个选择器只想被继承使用，如果没有被继承就仿佛不存在一样，也不会输出的 css 中。

使用 `%` 表示一个占位选择器。

```
.alert:hover,
%strong-alert {
  font-weight: 500;
}

%strong-alert:hover {
  color: #f00;
}

```

编译后的 css ：

```
.alert:hover {
  font-weight: 500;
}

```

如果想表示一个模块私有的占位选择器，在前面加上 `_` 或 `-` 即可。比如 `_%strong-alert` 。

扩展是有作用域的，如果要继承其他模块中的样式，需要使用 `@use` 或 `@forward` 加载模块。

如果使用的是 `@import` 规则，那么扩展根本就没有作用域，而是全局的。它们不仅会影响您导入的每个样式表，还会影响导入您的样式表的每个样式表，以及这些样式表导入的所有其他内容，等等。所以尽量不使用 `@import` 。

#### 可选继承

默认情况下，`@extend` 是强制继承，也就是说要继承的选择器必须存在，如果不存在则会抛出错误，这有助于检查拼写错误，或是要继承的选择器重命名后影响到其他继承了它的地方。

如果想要一个继承是可选的，也就是如果要继承的选择器不存在的话，就什么也不做，那就在 `@extend` 语句后加一个 `!optional` 表示是可选的。比如： `@extend .error !optional;`

#### `@extend` 和 `@mixin`

Sass 中复用样式可以使用 `@extend` 和 `@mixin` 。那么二者通常在什么情况下使用呢？

如果复用的样式在使用时需要传递参数，那么毫无疑问是使用 `@mixin` 了。但是如果仅仅是复用一段固定的样式代码呢？

根据经验，当您表示语义类 (或其他语义选择器) 之间的关系时，扩展是最佳选择。因为带有 `.error--serious` 这个 class 的元素表示的是一个错误，所以通过继承来复用 `.error` 是有意义的。但对于非语义的样式集合，编写 mixin 可以避免层叠问题，并使其更容易进行后续配置。

#### `@extend` 的限制

只有简单的选择器（独立的选择器）可以被继承，比如 `.info` ，像 `.message.info` 这样的选择器就不可以被继承，`@extend .message.info` 应该写成 `@extend .message, .info` ，同样地，`@extend .main .info` 应该写成 `@extend .info` 。

当 `@extend` 交叉使用复杂的选择器时，它不会生成所有可能的祖先选择器组合。因为它可能生成的许多选择器实际上不太可能与真正的 HTML 匹配，而且生成所有这些选择器会使样式表太大，实际价值很小。相反，它使用一种启发式方法（heuristic）：它假设每个选择器的祖先都是自包含的，不与任何其他选择器的祖先交叉。

```
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  @extend li;
}

```

编译过后的 css ：

```
header .warning li,
header .warning aside .notice dd,
aside .notice header .warning dd {
  font-weight: bold;
}

```

虽然 `@extend` 可以在 `@media` 和其他 CSS 的 @ 语句中使用，但不允许在 @ 语句中继承 @ 语句之外的选择器。

```
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error; // 抛出错误，不能继承 @media 外的选择器
  }
}

```

这是因为使用了 `@extend` 的选择器（这里是 `.error--serious`）只适用于给定的媒体上下文，但使用 `@extend` 不会复制样式代码到当前位置，这样会导致会在 `@media` 语句外生成 `.error, .error--serious { ... }`，进而导致 `.error--serious` 没有被限制在 `@media` 上下文中。

### 合并 CSS 文件

### Sass 编译方式及工程化使用

Sass 编译有两种工具，一种是 `Dart Sass` ，一种是 `LibSass` ，而这两种编译工具又分别对应两个 JavaScript 版本的 npm 包。

`Dart Sass` 发布成了纯 javascript 的 npm 包 `sass`，而 `LibSass` 是作为 npm 包 `node-sass` 的本地扩展发布的。

他们对应的 npm 包安装：

```
npm install -D sass
npm install -D node-sass

```

虽然实现方式不一样，但是他们暴露出的 javascript API 是完全一致的。也就是说，无论使用哪一种，我们都可以完成一个将 Sass 编译成 css 代码的 javascript 模块，在这个模块中，不管引用 `sass` 还是 `node-sass`，都可以使用完全一样的 API 来编写。

比如，在现在使用广泛的通过 webpack 构建的项目中，通常会安装一个名叫 `sass-loader` 的 npm 包来编译 Sass 代码，这个 `sass-loader` 就是使用了 Sass 暴露的 javascript API 来完成编译的，它可以依赖 `sass` 包，也可以依赖 `node-sass` 包。

在 `sass-loader` 模块源码中有如下代码：

```
function getDefaultSassImplementation() {
  let sassImplPkg = "sass";

  try {
    require.resolve("sass");
  } catch (error) {
    try {
      require.resolve("node-sass");

      sassImplPkg = "node-sass";
    } catch (ignoreError) {
      sassImplPkg = "sass";
    }
  }
  return require(sassImplPkg);
}


```

从上面的代码中可以看出，`sass-loader` 默认引用的 Sass 实现包是 `sass` 这个包，如果 检测到 `sass` 包不存在，再尝试引用 `node-sass` 包，如果也没有的话，则还是依赖 `sass` ，这时候就会抛出错误 `Cannot find module 'sass'` 告诉用户没有找到这个包，用户就需要安装这个依赖包。

注意，目前，官方已经准备废弃 `LibSass` 及 `node-sass` ，所以，应该使用 `sass` 包来编译 Sass 代码。

如果需要自己编写一个 javascript 模块来处理 sass 代码，在这里可以看到怎么使用暴露出的 API [https://sass-lang.com/documentation/js-api](https://sass-lang.com/documentation/js-api)

#### Sass 命令行编译

可以通过命令行编译 Sass 代码，但是系统是没有这个功能的，那就需要我们自己安装。

其实，上文提到的 `sass` 包是可以全局安装的，安装之后就可以在命令行使用 `sass` 命令了。

```
npm install -g sass

```

##### 基本编译命令

```
# 基本语法，输入文件和输出文件都表示文件相对或绝对路径
sass 输入文件 输出文件
sass 输入文件:输出文件
sass 输入文件1:输出文件1 输入文件2:输出文件2 输入文件3:输出文件3

# 将当前目录的 index.scss 文件编译成 index.css 并放到当前目录
sass index.scss index.css

# 也可以写成：
sass index.scss:index.css

# 同时处理多个文件，使用空格分隔
sass index.scss:index.css index1.scss:index1.css

# 处理目录，将 styles 目录全部 sass/scss 编译到 public/css 目录中
sass styles:public/css

```

##### 命令行选项

```
# 查看当前 sass 版本
sass --version


# 查看帮助
sass --help


# 从标准输入读取输入文件，此时不能手动指定输入文件，只能指定输出文件
# 处理多文件时不能使用此选项
sass --stdin index.css


# 强制使用缩进语法去解析输入文件，不管是 sass 还是 scss
# 在输入文件来自标准输入时非常有用，因此它的语法无法自动确定是 sass 还是 scss。
sass -–indented
# 强制不使用缩进语法去解析输入文件，，不管是 sass 还是 scss
sass -–no-indented


# 指定文件加载路径，避免输入文件携带太长的路径
# 可以多次传递该选项，前面的路径优先于后面的路径
# 简写 -I
sass --load-path=src/styles index.scss:public/index.css
sass -I=src/styles index.scss:public/index.css


# 控制输出文件的风格， expanded （默认）展开代码， compressed 压缩代码为一行
sass --style=compressed index.scss:index.css
# --style 简写为 -s
sass -s=compressed index.scss:index.css


# 使用 --charset 后，强制在开头加上 @charset 标记
# 默认情况下，如果出现了非 ASCII 字符，Sass 自动在开头加上 @charset 标记
sass --charset index.scss:index.css
# --no-charset 无论如何都不添加 @charset 标记
sass --no-charset index.scss:index.css


# 强制在编译错误时，生成错误信息到 css 注释 和 body::before 的 content 中
sass --error-css index.scss:index.css
# 禁用生成错误信息
sass --no-error-css index.scss:index.css


# 每次执行命令，都会去检查输入文件和输出文件的状态：
# 当输入文件的最后修改时间晚于输出文件的时间时，才会去重新编译
# 如果执行了编译，会在终端打印消息，否则没有任何操作。
# 和 --watch 的区别，--update 执行后便退出，--watch 持续监测输入文件变化
sass --update themes:public/css

# Dart Sass 默认为它发出的每个CSS文件生成源码映射文件（source map）。
# 不允许生成 source map 文件
sass --no-source-map index.scss:index.css


# 指定生成的 source map 文件和 sass 源文件的位置关系
# relative 默认，生成相对路径，absolute 生成绝对路径
sass --source-map-urls=relative index.scss:index.css


# 将 source map 文件嵌入到生成的 css 代码中，css 文件体积会很大
sass --embed-sources index.scss:index.css


# 开启监听模式，运行后终端保持运行，监听到文件变更立即重新编译
sass --watch index.scss:index.css


# --poll 只能和 --watch 一起使用
# 让 Sass 时不时地手动检查源文件更改，而不是依赖于操作系统在更改时通知它。
# 如果在操作系统通知系统无法工作的远程驱动器上编辑 Sass，这可能是必要的。
sass --watch --poll index.scss:index.css


# 遇到错误时立即停止编译
sass --stop-on-error index.scss:index.css


# sass 交互对话，执行后可以在命令行输入 sass 代码然后编译
sass --interactive
# 简写 -i
sass -i


# 简写 -c ，终端使用有颜色的信息
sass --color index.scss:index.css


# 默认，为这些消息发出非 ASCII 字符。这个标志不会影响CSS输出。
sass --unicode index.scss:index.css
# 只将 ASCII 字符作为错误消息的一部分发送到终端。
sass --no-unicode index.scss:index.css


# 静默终端，不显示 @warn 及 @debug 的信息，默认情况下，使用了废弃的功能会有警告信息
sass –quiet index.scss:index.css


# 遇到错误时打印完整的Dart或JavaScript堆栈跟踪。Sass团队使用它来调试错误。
sass --trace index.scss:index.css

```

## 5.3 调试技巧

Sass 提供了一些调试语句，有：

*   `@error`
*   `@warn`
*   `@debug`

### `@error`

当编写带有参数的 mixin 或函数时，通常希望接收到正确的参数，如果调用时没有传递正确的参数，应该通知用户并且停止运行。

Sass 通过 `@error <expression>` 。它会在控制台输出表达式返回的值（通常是一个字符串），一旦打印出错误，Sass 就停止编译，并抛出错误信息。

```
@mixin text-align ($align) {
  @if ($align != left or $align != center) {
    @error "调用 text-align 只能传递 left 或 center 值";
  }

  text-align: $align;
}

.div {
  // 传递一个不被允许的参数，会在控制台抛出错误信息
  @include text-align(right);
}

```

### `@warn`

用法与 `@error` 相同，但与 `@error` 不同的是，它不会导致 Sass 停止编译，只是在控制台抛出警告信息。

### `@debug`

通过 `@debug <expression>` 可以很方便地在控制台打印出表达式返回的值。

```
@debug "1 + 1 = #{1 + 1}"; // 1 + 1 = 2

```

使用 source maps

使用插件
