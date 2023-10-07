# Emmet 

## 一、简介

## 二、html缩写

Emmet使用类似于CSS选择器的语法来描述元素在生成的树和元素属性中的位置。

Emmet 使用类似于 CSS 选择器的语法来描述元素的结构与属性。

#### 元素元素

您可以使用元素的名称（如 或）来*生成* HTML 标记。Emmet没有一组预定义的可用标签名称，您可以编写任何单词并将其转换为标签：→，→等。`div``p``div``<div></div>``foo``<foo></foo>`

使用元素的名字，比如 、 来生成 HTML 标签。Emmet 没有预定义标签集合，所以可以用任意单词来生成对应的标签： → ， →`div``p``div``<div></div>``foo``<foo></foo>`

#### 嵌套运算符 嵌套操作符

嵌套运算符用于将缩写元素定位在生成的树中：是否应将其放置在上下文元素内部或附近。

#### 儿童： 子元素`>`

您可以使用运算符将元素相互嵌套：`>`

```
div>ul>li
```

...将产生

```
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

#### 兄弟姐妹： 兄弟元素`+`

使用运算符将元素彼此靠近放置在同一水平上：`+`

```
div+p+bq
```

...将输出

```
<div></div>
<p></p>
<blockquote></blockquote>
```

#### 爬上： 返回上层`^`

使用运算符，您将沿着生成的树向下下降，并且所有同级元素的位置将针对最深的元素解析：`>`

`>`操作符加深结构层次：

```
div+div>p>span+em
```

...将扩展到

```
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
```

使用运算符，您可以向上爬上树的一层，并更改应显示以下元素的上下文：`^`

`>`操作符返回上一层：

```
div+div>p>span+em^bq
```

...输出到

```
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

您可以使用任意数量的运算符，每个运算符将向上移动一个级别：`^`

多个连写将向上一层层返回：`^`

```
div+div>p>span+em^^^bq
```

...将输出到

```
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

#### 乘法： 乘法`*`

使用运算符，您可以定义元素应输出多少次：`*`

```
ul>li*5
```

...输出到

```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

#### Grouping: 分组`()`

Parenthesises are used by Emmets’ power users for grouping subtrees in complex abbreviations:

```
div>(header>ul>li*2>a)+footer>p
```

...expands to

```
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

If you’re working with browser’s DOM, you may think of groups as Document Fragments: each group contains abbreviation subtree and all the following elements are inserted at the same level as the first element of group.

可以将分组当作 Document Fragments，后续元素将与分组第一个元素同级。

You can nest groups inside each other and combine them with multiplication operator:`*`

分组嵌套，并且使用 操作法：`*`

```
(div>dl>(dt+dd)*3)+footer>p
```

...produces

```
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

With groups, you can literally write full page mark-up with a single abbreviation, but please don’t do that.

使用分组后，可以用一个缩写来生成整个页面，不过不要这么做。

#### Attribute operators 属性操作符

Attribute operators are used to modify attributes of outputted elements. For example, in HTML and XML you can quickly add attribute to generated element.`class`

#### ID and CLASS

In CSS, you use and notation to reach the elements with specified or attributes. In Emmet, you can use the very same syntax to *add* these attributes to specified element:`elem#id``elem.class``id``class`

Emmet 使用类似于 CSS 选择器的语法给元素添加属性：

```
div#header+div.page+div#footer.class1.class2.class3
```

...will output

```
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

#### Custom attributes 自定义属性

You can use notation (as in CSS) to add custom attributes to your element:`[attr]`

```
td[title="Hello world!" colspan=3]
```

...outputs

```
<td title="Hello world!" colspan="3"></td>
```

- You can place as many attributes as you like inside square brackets.
- 方括号内属性数量不限。
- You don’t have to specify attribute values: will produce with tabstops inside each empty attribute (if your editor supports them).`td[colspan title]``<td colspan="" title="">`
- 没有指定值的属性将生成插入占位（需要编辑器支持）。
- You can use single or double quotes for quoting attribute values.
- 属性值使用单引号或双引号。
- You don’t need to quote values if they don’t contain spaces: will work.`td[title=hello colspan=3]`
- 属性值如果不包含空格可以省略引号。

#### Item numbering: 编号`$`

With multiplication operator you can repeat elements, but with you can *number* them. Place operator inside element’s name, attribute’s name or attribute’s value to output current number of repeated element:`*``$``$`

```
*` 操作符可以生成重复元素，而 可以对元素编号。将 放在元素名、属性名或属性值中：`$``$
ul>li.item$*5
```

...outputs to

```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

You can use multiple in a row to pad number with zeroes:`$`

多个连写的 可以生成带有前导零的编号：`$`

```
ul>li.item$$$*5
```

...outputs to

```
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

#### Changing numbering base and direction

With modifier, you can change numbering direction (ascending or descending) and base (e.g. start value).`@`

使用 修饰符，可以改变编号的方向（升序或降序）及起点。`@`

For example, to change direction, add after :`@-``$`

例如改变方向，将 放在 后：`@-``$`

```
ul>li.item$@-*5
```

…outputs to

```
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

To change counter base value, add modifier to :`@N``$`

改变起点，将 放在 后：`@N``$`

```
ul>li.item$@3*5
```

…transforms to

```
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

You can use these modifiers together:

混合使用这几种修饰符：

```
ul>li.item$@-3*5
```

…is transformed to

```
<ul>
    <li class="item7"></li>
    <li class="item6"></li>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
</ul>
```

#### Text: 文本`{}`

You can use curly braces to add text to element:

使用大括号为元素添加文本（译注：类似于模板的插入符）

```
a{Click me}
```

...will produce

```
<a href="">Click me</a>
```

Note that is used and parsed as a separate element (like, , etc.) but has a special meaning when written right after element. For example, and will produce the same output, but and won’t:`{text}``div``p``a{click}``a>{click}``a{click}+b{here}``a>{click}+b{here}`

注意 类似于独立元素（比如, ），不过当它紧跟在元素后面时有特别的意义。比如 与 结果一样，而 与 结果不一样：`{text}``div``p``a{click}``a>{click}``a{click}+b{here}``a>{click}+b{here}`

```
<!-- a{click}+b{here} -->
<a href="">click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>
```

In second example the element is placed *inside* element. And that’s the difference: when is written right after element, it doesn’t change parent context. Here’s more complex example showing why it is important:`<b>``<a>``{text}`

第二个例子里 位于 内。这便是不同点： 当 紧跟在元素后面时，它没有改变父元素的上下文。下面用一个复杂例子来说明：`<b>``<a>``{text}`

```
p>{Click }+a{here}+{ to continue}
```

...produces

```
<p>Click <a href="">here</a> to continue</p>
```

In this example, to write inside element we have explicitly move down the tree with operator after , but in case of element we don’t have to, since we need element with word only, without changing parent context.`Click here to continue``<p>``>``p``a``<a>``here`

在这个例子中，为了让 包含 ， 后面使用了 以进入子级结构，而 只需要包含文本 ，不用改变父元素上下文，所以不需要这样做。`<p>``Click here to continue``p``>``a``here`

For comparison, here’s the same abbreviation written without child operator:`>`

下面不用 做下对比：`>`

```
p{Click }+a{here}+{ to continue}
```

...produces

```
<p>Click </p>
<a href="">here</a> to continue
```

#### Notes on abbreviation formatting 格式化缩写注意事项

When you get familiar with Emmet’s abbreviations syntax, you may want to use some formatting to make your abbreviations more readable. For example, use spaces between elements and operators, like this:

当熟悉 Emmet 的缩写语法后，你可能为了可读性而去格式化缩写。比如在元素与操作符之间插入空格：

```
(header > ul.nav > li*5) + footer
```

But it won’t work, because space is a *stop symbol* where Emmet stops abbreviation parsing.

但是这时 Emmet 失效，因为 Emmet 遇到空格后停止解析缩写。

许多用户错误地认为每个缩写都应该写在新行中，但他们错了：您可以在*文本中的任何位置*键入和扩展缩写：

许多用户错误地认为缩写应该新起一行，但是这是错的：可以在文本的任意位置书写并展开缩写。

播放演示

### 假文生成器

[“Lorem ipsum”](http://www.lipsum.com/) dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate “Lorem ipsum” text, but now you can do that right in your editor. Just expand `lorem` or `lipsum` abbreviations to get the following snippet:

[“Lorem ipsum”](http://www.lipsum.com/) 假文，许多开发者用它来测试 HTML 模板填充数据后的样子。开发者常常用第三方服务来生成假文，不过现在在编辑器里就能做到，只用展开 `lorem` 或 `lipsum` ：

```
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
```

`lorem` is not just a normal snippet—it’s actually a *generator*. Every time you expand it, it will generate a 30-words dummy text, splitted into a few sentences.

`lorem` 不是普通的代码片断——它是一个 **生成器**。每次展开将生成 30 字数的假文，分为几个句子。

You can specify how many words should be generated right in the abbreviation. For example, `lorem100` will generate a 100-words dummy text.

可以指定字数。比如 `lorem100` 将生成 100 字数的假文。

### Repeated “Lorem ipsum”重复假文

You can use `lorem` generator inside repeated elements to create tags filled with completely random sentences. For example, `p*4>lorem` abbreviation would generate something like this:

在重复元素内使用 `lorem` 填充随机文本。比如 `p*4>lorem`：

```
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
<p>Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!</p>
<p>Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!</p>
<p>Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?</p>
```

Also, `lorem` generator utilizes the [implicit tag name resolver](http://yanxyz.github.io/emmet-docs/abbreviations/implicit-names/) when `lorem` element is self-repeated so you can shorten your abbreviations:

`lorem` 也能 [解析隐式标签名](http://yanxyz.github.io/emmet-docs/abbreviations/implicit-names/)。当只重复 `lorem` 时可以简化缩写：

```
ul.generic-list>lorem10.item*4
```

...will produce

```
<ul class="generic-list">
    <li class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.</li>
    <li class="item">Laboriosam quaerat sapiente minima nam minus similique illum architecto et!</li>
    <li class="item">Incidunt vitae quae facere ducimus nostrum aliquid dolorum veritatis dicta!</li>
    <li class="item">Tenetur laborum quod cum excepturi recusandae porro sint quas soluta!</li>
</ul>
```

Even with such a powerful abbreviation engine, which can expand large HTML structures from short abbreviation, writing tag names may be very tedious.

尽管可以利用强大的缩写引擎从简短的缩写展开大段的 HTML，但是书写标签仍然可能让人烦。

In many cases you can skip typing tag names and Emmet will substitute it for you. For example, instead of `div.content` you can simply write `.content` and expand it into `<div class="content"></div>`.

在许多情况下可以省略标签名，Emmet 会妥善处理。比如不写 `div.content` 而写 `.content`，可以展开为 `<div class="content"></div>`。

## How it works 工作原理

When you expand abbreviation, Emmet tries to grab parent context, e.g. the HTML element, inside which you’re expanding the abbreviation. If the context was grabbed successfully, Emmet uses its name to resolve implicit names:

当展开缩写时，Emmet 尝试获取缩写所处位置的父元素上下文，比如 HTML 元素。如果获取成功，Emmet 使用它的名字来解析隐式标签名：

Play demoTry it yourself

```

```

As you can see from the example above, Emmet looks at the parent tag name every time you’re expanding the abbreviation with an implicit name. Here’s how it resolves the names for some parent elements:

如你所见，当展开隐式标签名时 Emmet 查找父元素标签名。下面是 Emmet 解析机制：

- `li` for `ul` and `ol`
- `tr` for `table`, `tbody`, `thead` and `tfoot`
- `td` for `tr`
- `option` for `select` and `optgroup`

Take a look at some abbreviations equivalents with implicit and explicit tag names:

下面缩写隐式与显式标签名输出一致：

| `.wrap>.content`            | `div.wrap>div.content`          |
| --------------------------- | ------------------------------- |
| `em>.info`                  | `em>span.info`                  |
| `ul>.item*3`                | `ul>li.item*3`                  |
| `table>#row$*4>[colspan=2]` | `table>tr#row$*4>td[colspan=2]` |

## 三、css 缩写

New CSS3 features are a blessing for web-developers: with a few lines of code we can do things that were nearly impossible a few years ago. But these features are also a real pain for us: we have to write the same property many times for different browsers.

新的 CSS3 特性是开发者的福音：几行代码可以做到几年前几乎做不到的事。但是同时也给我们带来一个痛苦：一个属性需要为不同的浏览器重复写几遍。

Emmet’s CSS resolver has a nice feature that can greatly improve your CSS3 experience. Every time you precede CSS property or its abbreviation with a hyphen, Emmet automatically creates vendor-prefixed copies of this property. For example, `-bdrs` abbreviation will be expanded into

Emmet 的 CSS 解析器提供一个不错的功能，可以大大提高你的 CSS3 开发体验。在属性前或缩写前放一个连字符，Emmet 会自动给这个属性添加厂商前缀。例如缩写 `-bdrs` 将展开为：

```css
-webkit-border-radius: ;
-moz-border-radius: ;
border-radius: ;
```

Moreover, in editors with tabstops support (such as Eclipse, Sublime Text 2, Espresso etc.) Emmet will create a linked value placeholder so you can type a property value and it will be automatically placed in all generated properties.

而且对于支持插入占位的编辑器（Eclipse, Sublime Text 2, Espresso 等），Emmet 将创建关联的属性值占位，输入一次将自动插入到所有生成的属性中。

## How it works? 工作原理

Whenever you expand abbreviation with a hyphen in front of it, Emmet removes the hyphen and looks for a snippet definition in `snippets.json` for the rest of the abbreviation. For example, for `-bdrs` abbreviation it will look for a `bdrs` definition. `snippet.json` has the following definition:

缩写前放一个连字符，展开时，Emmet 移除连字符，然后在 `snippets.json` 里查找缩写的定义。例如 `-bdrs` 将查找 `bdrs`：

```
"bdrs": "border-radius:|;"
```

...which means that `bdrs` will be expanded into `border-radius` property. If no definition found, the abbreviation itself will be used as a CSS property name.

`bdrs` 将展开为 `border-radius` 属性。如果没有找到定义，缩写将用作一个属性名。

After the CSS resolver figures out a property name that should be outputted, it will look for its occurrence in special *vendor catalogs*. These catalogs are defined as `css.{vendor}Properties` entries in preferences and can be overridden by user. `{vendor}` is a browser’s vendor prefix, for example, `webkit`, `moz` etc.

当 CSS 解析器知道要输出属性名后，便在“厂商分类”中查找此属性名。这些分类在配置里由 `css.{vendor}Properties` 定义。`{vendor}` 是浏览器厂商前缀，比如 `webkit`, `moz` 等。

If the expanded property was found in any of these catalogs, their vendor prefixes will be used to produce prefixed properties. Otherwise, *all prefixes* will be used.

如果在厂商分类中找到了，这些厂商前缀将用于生成带前缀的属性。如果没找到则使用所有的前缀。

For example, the `border-radius` property is defined in `css.webkitProperties` and `css.mozProperties` so this property will be outputted with `webkit` and `moz` prefixes. On the other hand, a `foo` property isn’t defined anywhere so it will be outputted with all available prefixes when you expand `-foo` abbreviation: `webkit`, `moz`, `ms` and `o`. It is especially helpful for using cutting-edge CSS properties that were recently implemented.

例如属性`border-radius` 在 `css.webkitProperties` 和 `css.mozProperties` 中有定义，这个属性输出时将带上前缀 `webkit` 和 `moz`。属性 `foo` 在所有分类中均没有定义，则展开缩写 `-foo` 时将带上所有前缀: `webkit`, `moz`, `ms` and `o`。这个功能在使用刚实现的 CSS 属性时特别有用。

Imagine that Google Chrome implemented `super-foo` property yesterday and you want to use it in your project. You can expand `-super-foo` abbreviation which results in the following snippet:

假定昨天 Google Chrome 实现了属性 `super-foo`，你打算用在项目中，展开 `-super-foo` 得到：

```css
-webkit-super-foo: ;
-moz-super-foo: ;
-ms-super-foo: ;
-o-super-foo: ;
super-foo: ;
```

## Add prefixed properties by default 默认添加厂商前缀

While writing CSS files, you may find that a “clear” CSS3 property is useless without its vendor-prefixed variants. It makes writing hyphenated abbreviations like `-trf` (`trf` is an alias to `transform` property) a bit awkward.

一个 CSS3 属性如果没有厂商前缀可能就没用，这样书写带连字符的缩写不方便。

This is why Emmet has `css.autoInsertVendorPrefixes` preference enabled by default. With this preference enabled, all CSS properties defined in vendor catalogs will be automatically supplied with matched vendor-prefixed variants.

这便是 Emmet 为什么默认启用选项 `css.autoInsertVendorPrefixes`。当启用这个选项后，所有在厂商分类里定义的 CSS 属性将自动添加相应的厂商前缀。

It means that you don’t need to use a hyphen to get valid prefixed variants for known CSS properties, simply expand abbreviations like `bdrs` or `trf` to get a valid list of vendor-prefixed properties.

这意味着不需要对已定义的 CSS 属性使用连字符去添加厂商前缀。例如展开 `bdrs` 或 `trf`，将得到一列带有厂商前缀的属性。

## Explicit vendor prefixed 显式添加厂商前缀

Sometimes you may want to output CSS properties with specified vendor prefixed properties only.

有时你只想输出指定厂商前缀的 CSS 属性。

Let’s say you want to output `transform` property with `webkit` and `moz` prefixes only. In this case you can expand the following abbreviation:

比如说输出属性 `transform`，只带有前缀 `webkit` 与 `moz`。在这种情况下展开下面缩写：

```
-wm-trf
```

As you can see, we slightly modified the abbreviation by adding a list of one-letter prefixes. In this case, these are `w` (`webkit`) and `m` (`moz`) prefixes. Emmet has the following one-letter prefixes:

如你所见，添加单字符的前缀列表可以修改缩写。这个例子中是 `w` (`webkit`) 和 `m` (`moz`)。Emmet 支持下面单字符前缀：

- `w`: `webkit`
- `m`: `moz`
- `s`: `ms`
- `o`: `o`

译注：目前的趋势是浏览器在实现新属性时不再使用厂商前缀，而是通过特性开关来启用。这样可以避免厂商前缀带来混乱。

Another hard-to-write CSS3 feature is a gradient. You have to repeat long gradient definition multiple times with different vendor prefixes. Also, if you want to cover all gradient-supported browsers, you have to use three different notations: old Webkit, currently supported (`linear-gradient(top, ...)`) and W3C-proposed (`linear-gradient(to bottom, ...)`).

另一个难写的 CSS3 特性是渐变，需要重复写几遍带有不同厂商前缀的属性。而且如果想覆盖所有支持渐变的浏览器，得使用三种写法：旧版 Webkit、当前支持的 (`linear-gradient(top, ...)`) 及 W3C 标准 (`linear-gradient(to bottom, ...)`)。

译注：查看目前的[兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)

Usually, users prefere to use third-party GUIs to generate gradients definitions, but you can do the very same thing much faster right in your editor.

通常用户喜欢使用第三方 GUI 程序来生成渐变，但是在编辑器里面做得更快。

Emmet has a CSS3 Gradient Generator that can do all the hard work for you:

Emmet 有一个 CSS3 渐变生成器替你做这些重活：

Play demoTry it yourself

```

```

As you can see from the example above, you can type regular gradient definition as `lg(...)` (or `linear-gradient(...)`) function and expand it as an abbreviation. If you write the gradient definition as a property value, Emmet will parse it and use its name as a reference for new CSS properties.

如你所见，可以输入函数 `lg(...)` (或 `linear-gradient(...)`) 函数，并且像缩写一样展开。如果用做属性值，Emmet 将使用属性名来生成新的属性。

## Fallback value 向后兼容

In preferences, you can enable `css.gradient.fallback` option to produce a fallback `background-color` CSS property whenever a gradient definition for `background-*` CSS property is expanded. This fallback property will contain a first color from gradient definition.

在配置里启用选项 `css.gradient.fallback` 后可以生成向后兼容的 `background-color`。

This option is off by default because it produces a `background-color` value that almost certainly needs to be manually updated to make sure that content is readable on this background. If you don’t really care about old browsers, you can enable this option.

这个选项默认关闭，因为它生成的 `background-color` 总是需要手工更新，以确保在这个背景色上可以阅读。如果你不关心旧浏览器，可以启用这个选项。

f you take a look at [Cheat Sheet](http://yanxyz.github.io/emmet-docs/cheat-sheet/), you’ll find that there are too many CSS snippets to remember. Also, some of them might be a bit lengthy for sake of logical separation.

看一看 [速查表](http://yanxyz.github.io/emmet-docs/cheat-sheet/)，会发现要记的 CSS 代码片断太多了。一些也可能有点长。

To make CSS writing a bit easier, Emmet implement *fuzzy search* logic for CSS snippets: every time you enter unknown abbreviation, Emmet will try to find a closest snippet definition.

为了让书写 CSS 更容易， Emmet 实现了模糊查找。每次输入未知的缩写时，Emmet 尝试查找最相近的代码片断。

For example, instead of writing `ov:h` (`overflow: hidden;`) abbreviation, you can write `ov-h`, `ovh` or even `oh`. You can play around with the fuzzy search in text editor below. Try to find as many variations as possible (use Tab key to expand abbreviations) for `bxz:cb`, `ovx:h` and `pos:a` snippets.

例如，缩写不是 `ov:h`(`overflow: hidden;`) ，而是 `ov-h`, `ovh` 甚至 `oh`。可以在下面文本框内试试。

```

```

The fuzzy search is performed against *predefined snippet names*, not snippet values or CSS properties. This results in more predictable and controllable matches. Remember that you can always [create your own snippets or redefine existing ones](http://yanxyz.github.io/emmet-docs/customization/) to fine-tune fuzzy search experience.

模糊查找搜索代码片断名，而不是值或 CSS 属性，这样对可以控制匹配。记住可以[创建自己的或覆盖已有的代码片断](http://yanxyz.github.io/emmet-docs/customization/) ，以改进模糊查找的体验。

## 四、功能

展开缩写
匹配标签
跳转到配对标签
包缩写
跳转到编辑点
选择
切换注释
分割合并标签
删除标签
合并行
更新图片尺寸
计算数学表达式
增减数字
重构CSS值
编码/解码图像为data:UR

