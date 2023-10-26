# 什么是 UnoCSS？[](https://alfred-skyblue.github.io/unocss-docs-cn/guide/#什么是-unocss)

UnoCSS 是一个即时的原子化 CSS 引擎，旨在灵活和可扩展。核心是不拘一格的，所有的 CSS 工具类都是通过预设提供的。

例如，您可以通过在您的本地 [配置文件](https://alfred-skyblue.github.io/unocss-docs-cn/guide/config-file) 中提供规则来定义自定义 CSS 工具类。

ts

```
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [['m-1', { margin: '1px' }]]
})
```

这将在您的项目中添加一个新的 CSS 工具类 `m-1`。由于 UnoCSS 是按需加载的，在您的代码库使用它之前不会产生任何作用。因此，假设我们有一个像这样的组件：

html

```
<div class="m-1">Hello</div>
```

`m-1` 将被检测到，并生成以下 CSS：

css

```
.m-1 {
  margin: 1px;
}
```

为了使其更加灵活，您可以通过将规则的第一个参数（我们称之为匹配器）更改为正则表达式，并将其主体更改为函数，从而使规则变得动态化，例如：

diff

```
// uno.config.ts
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }]
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

通过这样做，现在您可以拥有任意的 margin 工具类，如 `m-1`、`m-100` 或 `m-52.43`。并且，UnoCSS 只在您使用它们时才会生成这些工具。

html

```
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

css

```
.m-1 {
  margin: 1px;
}
.m-7.5 {
  margin: 7.5px;
}
```

## 预设[](https://alfred-skyblue.github.io/unocss-docs-cn/guide/#预设)

一旦您创建了一些规则，您可以将它们提取到一个预设中，并与他人分享。例如，您可以为您公司的设计系统创建一个预设，并与您的团队共享。

ts

```
// my-preset.ts
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-(\d+)$/, ([_, num]) => ({ padding: `${num}px` })]
  ],
  variants: [
    /* ... */
  ],
  shortcuts: [
    /* ... */
  ]
  // ...
}
```

ts

```
// uno.config.ts
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset // 您自己的预设
  ]
})
```

同样的，我们提供了一些 [官方预设](https://alfred-skyblue.github.io/unocss-docs-cn/presets/) 可以让您马上开始使用，您也可以找到很多有趣的 [社区预设](https://alfred-skyblue.github.io/unocss-docs-cn/presets/#community).



# 快捷方式[](https://alfred-skyblue.github.io/unocss-docs-cn/config/shortcuts#快捷方式)

快捷方式可以让您将多个规则组合成单个简写，受到[Windi CSS](https://windicss.org/features/shortcuts.html)的启发。

## 使用[](https://alfred-skyblue.github.io/unocss-docs-cn/config/shortcuts#使用)

ts

```
shortcuts: {
  // shortcuts to multiple utilities
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  // single utility alias
  'red': 'text-red-100'
}
```

除了普通的映射之外，UnoCSS 还允许您定义动态快捷方式。

类似于[Rules](https://alfred-skyblue.github.io/unocss-docs-cn/config/rules)，动态快捷方式是一个匹配器 RegExp 和一个处理函数的组合。

ts

```
shortcuts: [
  // you could still have object style
  {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md'
  },
  // dynamic shortcuts
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`]
]
```

有了这个，我们可以使用 `btn-green` 和 `btn-red` 来生成以下 CSS：

css

```
.btn-green {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgba(74, 222, 128, var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgba(220, 252, 231, var(--un-text-opacity));
}
.btn-red {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgba(248, 113, 113, var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgba(254, 226, 226, var(--un-text-opacity));
}
```

# 属性化预设[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#属性化预设)

这个预设可以为其他预设启用 [`attributify` 模式](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#属性化模式)。

[源码](https://github.com/unocss/unocss/tree/main/packages/preset-attributify)

## 安装[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#安装)

pnpmyarnnpm

bash

```
pnpm add -D @unocss/preset-attributify
```

ts

```
// uno.config.ts
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    })
    // ...
  ]
})
```

TIP

这个预设包含在 unocss 包中，你也可以从那里导入它：

ts

```
import { presetAttributify } from 'unocss'
```

## 属性化模式[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#属性化模式)

假设你有一个使用 Tailwind 工具类的按钮。当列表变得越来越长时，它变得很难阅读和维护。

html

```
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>
```

使用属性化模式，你可以将工具类分成属性：

html

```
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```

例如，`text-sm text-white` 可以合并为 `text="sm white"`，而无需重复相同的前缀。

## 前缀自引用[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#前缀自引用)

对于具有与前缀相同的工具类（如 `flex`、`grid`、`border`）的工具类，提供了一个特殊的 ~ 值。

例如:

html

```
<button class="border border-red">Button</button>
```

可以写为:

html

```
<button border="~ red">Button</button>
```

## 无值属性[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#无值属性)

除了 Windi CSS 的属性化模式外，这个预设还支持无值属性。

例如：

html

```
<div class="m-2 rounded text-teal-400" />
```

可以写为：

html

```
<div m-2 rounded text-teal-400 />
```

INFO

注意：如果您使用的是 JSX，`<div foo>` 可能会转换为 `<div foo={true}>`，这将使从 UnoCSS 生成的 CSS 无法匹配属性。要解决此问题，您可能需要尝试 [`transformer-attributify-jsx`](https://github.com/unocss/unocss/tree/main/packages/transformer-attributify-jsx)以及此预设。

## 属性冲突[](https://alfred-skyblue.github.io/unocss-docs-cn/presets/attributify#属性冲突)

如果属性名称与元素或组件的属性名称发生冲突，您可以在属性名称前添加 `un-` 前缀以指定为 UnoCSS 的属性模式。

例如：

html

```
<a text="red">This conflicts with links' `text` prop</a>
<!-- to -->
<a un-text="red">Text color to red</a>
```

默认情况下前缀是可选的，如果要强制使用前缀，可以设置：

ts

```
presetAttributify({
  prefix: 'un-',
  prefixedOnly: true // <--
})
```

您也可以通过以下方式禁用某些属性的扫描：

ts

```
presetAttributify({
  ignoreAttributes: [
    'text'
    // ...
  ]
})
```

# 变体组转换器[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/variant-group#变体组转换器)

为 UnoCSS 启用 Windi CSS 的 [变体组特性](https://windicss.org/features/variant-groups.html)。

## 安装[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/variant-group#安装)

pnpmyarnnpm

bash

```
pnpm add -D @unocss/transformer-variant-group
```

ts

```
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

## 使用方法[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/variant-group#使用方法)

html

```
<div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
```

将被转换为：

html

```
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
```

# 指令转换器[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#指令转换器)

`@unocss/transformer-directives` 是 UnoCSS 的指令转换器，支持 `@apply`、`@screen` 和 `theme()` 指令。

## 安装[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#安装)

pnpmyarnnpm

bash

```
pnpm add -D @unocss/transformer-directives
```

ts

```
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...
  transformers: [
    transformerDirectives(),
  ],
})
```

## 使用[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#使用)

### `@apply`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#apply)

css

```
.custom-div {
  @apply text-center my-0 font-medium;
}
```

将被转换为：

css

```
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

#### `--at-apply`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#at-apply)

为了与普通的 CSS 兼容，你可以使用 CSS 变量来替换 `@apply` 指令：

css

```
.custom-div {
  --at-apply: text-center my-0 font-medium;
}
```

如果你要使用带有 `:` 的规则，则需要将其值用引号括起来：

css

```
.custom-div {
  --at-apply: "hover:text-red";
}
```

该功能默认启用了一些别名，您可以通过以下方式配置或禁用它们：

js

```
transformerDirectives({
  // the defaults
  applyVariable: ['--at-apply', '--uno-apply', '--uno'],
  // or disable with:
  // applyVariable: false
})
```

### `@screen`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#screen)

`@screen`指令允许您创建媒体查询，通过名称引用断点，其来自于[`theme.breakpoints`](https://alfred-skyblue.github.io/unocss-docs-cn/config/theme)。

css

```
.grid {
  --uno: grid grid-cols-2;
}
@screen xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen sm {
  .grid {
    --uno: grid-cols-3;
  }
}
/* ... */
```

将被转换为：

css

```
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

#### 支持断点变体[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#支持断点变体)

`@screen`还支持`lt`、`at`变体：

#### `@screen lt-`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#screen-lt)

css

```
.grid {
  --uno: grid grid-cols-2;
}
@screen lt-xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen lt-sm {
  .grid {
    --uno: grid-cols-3;
  }
}
/* ... */
```

将被转换为：

css

```
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 319.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

#### `@screen at-`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#screen-at)

css

```
.grid {
  --uno: grid grid-cols-2;
}
@screen at-xs {
  .grid {
    --uno: grid-cols-1;
  }
}
@screen at-xl {
  .grid {
    --uno: grid-cols-3;
  }
}
@screen at-xxl {
  .grid {
    --uno: grid-cols-4;
  }
}
/* ... */
```

将被转换为：

css

```
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) and (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) and (max-width: 1535.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
/* ... */
```

### `theme()`[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#theme)

使用`theme()`函数通过点符号访问您的主题配置值。

css

```
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将被编译为：

css

```
.btn-blue {
  background-color: #3b82f6;
}
```

## License[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives#license)

# 编译类转换器[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/compile-class#编译类转换器)

将一组类编译成一个类。灵感来自于Windi CSS的[编译模式](https://windicss.org/posts/modes.html#compilation-mode)以及[@UltraCakeBakery](https://github.com/UltraCakeBakery)的[issue #948](https://github.com/unocss/unocss/issues/948)。

## 安装[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/compile-class#安装)

pnpmyarnnpm

bash

```
pnpm add -D @unocss/transformer-compile-class
```

ts

```
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'

export default defineConfig({
  // ...
  transformers: [
    transformerCompileClass(),
  ],
})
```

## 用法[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/compile-class#用法)

在类字符串的开头添加 `:uno:`，以将它们标记为编译对象。

例如：

html

```
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red"/>
</div>
```

将被编译成：

html

```
<div class="uno-qlmcrp">
  <div class="uno-0qw2gr"/>
</div>
```

css

```
.uno-qlmcrp {
  text-align: center;
}
.uno-0qw2gr {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}
.uno-0qw2gr:hover {
  --un-text-opacity: 1;
  color: rgba(248, 113, 113, var(--un-text-opacity));
}
@media (min-width: 640px) {
  .uno-qlmcrp {
    text-align: left;
  }
}
```

## 选项[](https://alfred-skyblue.github.io/unocss-docs-cn/transformers/compile-class#选项)

您可以使用选项配置编译类的触发字符串和前缀。有关详细信息，请参考[类型](https://github.com/antfu/unocss/blob/main/packages/transformer-compile-class/src/index.ts#L4)。

# Inspector[](https://alfred-skyblue.github.io/unocss-docs-cn/tools/inspector#inspector)

UnoCSS (@unocss/inspector) 的检查器 UI。 包含在 `unocss` 和 `@unocss/vite` 中。

## 用法[](https://alfred-skyblue.github.io/unocss-docs-cn/tools/inspector#用法)

在 Vite 开发服务器中访问 [localhost:3000/__unocss](http://localhost:3000/__unocss) 来查看检查器。

检查器可以让你查看每个文件生成的 CSS 规则和应用的类名，并提供一个 REPL 来测试当前配置下的实用工具。