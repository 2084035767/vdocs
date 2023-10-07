# Sass 笔记





```scss
 ______     ______     ______     ______    
/\  ___\   /\  __ \   /\  ___\   /\  ___\   
\ \___  \  \ \  __ \  \ \___  \  \ \___  \  
 \/\_____\  \ \_\ \_\  \/\_____\  \/\_____\ 
  \/_____/   \/_/\/_/   \/_____/   \/_____/ 
                                            
```

## 一、简介

### 1.1 什么是 Sass？

Sass（Syntactically Awesome Style Sheets）是一种 CSS 预处理器，可以简化 CSS 的编写。它使用类似于 CSS 的语法，并且可以嵌套规则、使用变量和混合器（mixin）、进行函数调用等等。通过这些功能，Sass 可以让开发者更加高效地编写 CSS 代码，并且使得 CSS 代码更具可维护性和可读性。Sass 提供了两种语法格式：缩进格式（Indented Syntax）和 SCSS（Sassy CSS）格式。其中 SCSS 更接近于标准的 CSS 语法，而缩进格式则更加简洁。无论选择哪种格式，Sass 都需要通过编译器将其转换为标准的 CSS 代码以在网页上使用。

### 1.2 Sass 与 CSS 的关系

Sass 是 CSS 的扩展语言，它使用类似于 CSS 的语法，并且可以在 CSS 中使用。也就是说，任何有效的 CSS 文件都可以直接作为 Sass 的输入。

Sass 扩展了 CSS 的语法，使得开发者可以使用变量、嵌套规则、混合器、函数等高级功能，这些功能可以让 CSS 更加易于维护和扩展。同时，Sass 还提供了一些特性，如导入、条件语句等，这些能够帮助开发者更加轻松地管理样式表。

需要注意的是，Sass 编写的代码需要通过编译器转换为标准的 CSS 代码才能在浏览器中运行。因此，在使用 Sass 的时候，我们需要将 Sass 编译成 CSS，并将生成的 CSS 文件链接到 HTML 页面中。

## 二、基础知识

### 2.1 安装和配置环境

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

### 2.2 基本语法

#### 变量

变量是存储信息并在将来重复利用的一种方式，在整个样式表中都可访问。 你可以在变量中存储颜色、字体 或任何 CSS 值，并在将来重复利用。Sass 使用 `$` 符号 作为变量的标志。例如：

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
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







### 2.3 选择器列表

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

### 2.4 选择器组合器

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

### 2.5 高级嵌套



#### 混合器（Mixin）

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

要创建 mixin，您可以使用@mixin 指令并为其命名。我们将 mixin 命名为 theme。我们还在括号中使用了变量$theme，以便我们可以传递任何想要的主题。创建 mixin 之后，您可以将其用作 CSS 声明，从@include 开始，后跟 mixin 的名称。

#### 继承（@extend）

使用@extend 指令可以让您将一个选择器中的一组 CSS 属性共享到另一个选择器中。在我们的示例中，我们将使用与 extend 相辅相成的另一个功能——占位符类，创建一个简单的错误、警告和成功消息系列。占位符类是一种特殊类型的类，只有在被继承时才会打印出来，可以帮助保持编译后的 CSS 整洁和清晰。

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

以上代码告诉.message、.success、.error 和.warning 使其行为与%message-shared 完全相同。这意味着任何地方出现%message-shared，.message、.success、.error 和.warning 也会出现。神奇的事情发生在生成的 CSS 中，每个类都将获得与%message-shared 相同的 CSS 属性。这有助于避免在 HTML 元素上编写多个类名。

在 Sass 中，除了占位符类之外，您还可以扩展大多数简单的 CSS 选择器；但是使用占位符类是确保您不会扩展样式中其他地方嵌套的类的最简单方法，这可能导致您的 CSS 中存在意外的选择器。

请注意，%equal-heights 中的 CSS 未生成，因为从未扩展%equal-heights。

#### 占位符（%placeholder）







## 二、进阶知识

### 2.1 控制指令

#### @if / @else

#### @for 循环

#### @each 循环

#### @while 循环

### 2.2 函数和运算

#### 内置函数

#### 自定义函数

#### 运算符

### 2.3 子模块和导入

创建子模块
导入子模块

## 三、高级技巧

### 3.1 变量作用域
全局变量
局部变量

### 3.2 颜色函数
RGB 和 RGBA 颜色转换
色号颜色（#RRGGBB）和 HSL 颜色的转换

### 3.3 组件化开发
打造自己的 UI 库
如何管理组件库

## 四、最佳实践

### 4.1 代码结构
文件和目录结构
命名规则

### 4.2 性能优化
减少选择器的复杂度
合理使用 @extend 和混合器
合并 CSS 文件
使用 autoprefixer 自动添加浏览器前缀

### 4.3 调试技巧
使用 source maps

使用插件
