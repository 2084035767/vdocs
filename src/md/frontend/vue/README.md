# Vue2 笔记

```vue
 __   __   __  __     ______    
/\ \ / /  /\ \/\ \   /\  ___\   
\ \ \'/   \ \ \_\ \  \ \  __\   
 \ \__|    \ \_____\  \ \_____\ 
  \/_/      \/_____/   \/_____/ 
                                
```



## 一、Vue.js 2.x 简介

### 1.1 什么是 Vue.js？

### 1.2 Vue.js 的历史和发展

### 1.3 Vue.js 和其他前端框架的比较

## 二、基础语法

### 2.1 模板语法

### 2.2 计算属性和侦听器

### 2.3 组件基础

### 2.4 生命周期钩子函数

## 三、组件通信

### 3.1 父子组件通信

### 3.2 兄弟组件通信

### 3.3 跨级组件通信

## 四、Vue.js 中的指令

### v-text

v-text 指令可以简单地替代{{}}语法。语法格式如下：

```plain
<p v-text="message"></p>
```

它与差值表达式{{}}一样，会将 Vue 实例中的 message 数据属性渲染到视图中。

### v-html

v-html 指令可以将 Vue 实例中的数据属性解析为 HTML 代码并渲染到视图中。注意：使用 v-html 指令将字符串直接输出到页面，存在 xss 注入攻击风险。语法格式如下：

```vue
<p v-html="htmlString"></p>
```

### v-model

v-model 指令用于实现表单元素与 Vue 实例数据之间的双向数据绑定。例如：

```vue
<input v-model="username">
```

上述代码中，表单元素 input 的 value 属性与 Vue 实例的 username 数据属性绑定。此时，当用户在 input 中输入文本时，Vue 实例数据即可更新，反之亦然。

### v-if / v-else-if / v-else

v-if 指令用于条件性地渲染 DOM 元素，控制元素的显示或隐藏。可选择性添加 v-else-if 和 v-else 处理不同的条件场景。语法格式如下：

```vue
<div v-if="condition"></div>
<div v-else-if="condition2"></div>
<div v-else></div>
```

其中，v-else-if 和 v-else 可以省略。

### v-once

v-once 指令用于只渲染元素和组件一次，不再随数据的变化重新渲染。语法格式如下：

```vue
<span v-once>{{ message }}</span>
```

这对于不需要响应式地更新的内容很有用，因为它允许你从渲染开销大的组件中优化出来。

### v-cloak

v-cloak 指令用于解决 Vue 加载过程中页面闪现的问题。它与样式如下：

```vue
[v-cloak] {
  display: none;
}
```

需要在全局样式中进行定义，但不需要对它做任何操作。只需要在与 Vue 实例相邻的 HTML 元素上添加 v-cloak 属性即可，例如：

```vue
<div id="example" v-cloak>
   <!-- ... -->
</div>
```

在 Vue 实例完成渲染后，这个元素将会被自动删除。

### v-pre

v-pre 指令跳过这个元素和它子元素的编译过程，可以保留原本的 html 代码格式。语法格式如下：

```vue
<span v-pre>{{ message }}</span>
```

v-pre 指令可以用于优化渲染性能，特别是当你知道一部分的标记会在所有的渲染中都不会改变时，可以跳过这些地方的编译过程。但是，在绝大多数情况下，不建议使用 v-pre 指令。

### v-bind:class / v-bind:style

v-bind:class和 v-bind:style指令可以分别用于动态地绑定元素的 class 属性和 style 属性。语法格式如下：

```vue
<标签名 v-bind:class="{ class1: condition1, class2: condition2 }"></标签名>
<标签名 v-bind:style="{ property1: value1, property2: value2 }"></标签名>
```

在上述代码中，condition1 和 condition2 是 Vue 实例数据属性，当它们的值为真时，class1 和 class2 就会被添加到元素的 class 属性上；property1 和 property2 是 CSS 属性名称，value1 和 value2 是属性的值，当它们的值发生变化时，元素的 style 样式也会相应地更新。

### 4.1 v-bind 指令

v-bind 指令可以将 Vue 实例的数据绑定到 DOM 元素的属性上，实现数据的动态更新。语法格式如下：

```vue
<标签名 v-bind:属性名="data属性名"></标签名>
```

其中，v-bind 可以缩写为":"，例如：

```vue
<img :src="imgSrc">
```

在上述代码中，imgSrc 是 Vue 实例中一个包含图片路径的数据属性，它绑定到 img 标签的 src 属性上。当 imgSrc 数据属性发生变化时，img 标签的 src 属性即可实时更新。v-bind 指令支持多个属性同时绑定。

### 4.2 v-on 指令

v-on 指令可以监听 DOM 事件，并在特定事件触发时调用定义的方法。语法格式如下：

```vue
<button v-on:click="method"></button>
```

v-on 指令可以简写为@，例如@click。

在 Vue 实例内部定义 methods 属性，实现方法代码如下：

```vue
Copy codevar vm = new Vue({
  el: '#example',
  methods: {
    method: function () {
      //方法体
    }
  }
})
```

### 4.3 v-if 和 v-show 指令

v-if 和 v-show 指令用于控制元素的显示或隐藏。

v-if 指令会根据 Vue 实例的数据属性的值来删除或插入元素。当表达式为真时，元素会被插入到视图中，反之则被删除。例如：

```vue
<p v-if="show">这是一段文本</p>
```

v-show 指令与 v-if 不同，它不会插入或删除元素，只是根据 Vue 实例中数据属性的值来控制元素的显示或隐藏。例如：

```vue
<p v-show="show">这是一段文本</p>
```

比起 v-if 指令，v-show 指令更适合频繁切换的情况。

### 4.4 v-for 指令

v-for 指令可以遍历 Vue 实例中的数组或对象，并为每个元素执行相应的操作。语法格式如下：

```vue
<标签名 v-for="(value, index) in data数据属性"></标签名>
```

其中，value 代表当前元素的值，index 代表当前元素的索引。例如：

```plain
ul>
   <li v-for="(fruit, index) in fruits">{{ index + 1 }}. {{ fruit }}</li>
</ul>
```

上述代码中，fruits 是 Vue 实例中的一个包含水果的数组，v-for 指令会将数组中的每个元素都遍历出来，生成相应的 li 标签。

## 五、表单处理

### 5.1 表单输入绑定

### 5.2 表单修饰符

### 5.3 自定义表单控件

## 六、过滤器和混入

### 6.1 过滤器的使用和定义

### 6.2 混入的使用和定义

### 6.3 过滤器和混入的区别

## 七、插槽和动态组件

### 7.1 插槽的使用和定义

### 7.2 作用域插槽

### 7.3 动态组件的使用和定义

## 八、Vuex 状态管理

### 8.1 什么是 Vuex

### 8.2 Vuex 的核心概念

### 8.3 如何在 Vue.js 中使用 Vuex

## 九、Vue.js 中的路由

### 9.1 什么是路由

### 9.2 Vue.js 中的路由实现

### 9.3 动态路由和嵌套路由

## 十、参考三三

