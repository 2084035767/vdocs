# Vue.js 基础了解

Vue.js 是一个现代的 JavaScript 框架，用于构建交互式 Web 应用程序。它拥有易学易用、丰富的功能和灵活的架构等优点。在本教程中，我们将学习 Vue.js 的基础知识。

## 1. 安装 Vue.js

你可以通过 npm 或 yarn 在你的项目中安装 Vue.js，代码如下：

```npm
npm install vue
```

或

```npm
yarn add vue
```

## 2. 创建 Vue 实例

在你的 HTML 文件中，需要添加一个 Vue 实例，代码如下：

```vue
<div id="app">
  {{ message }}
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>
```

在这个选项对象中，定义了`data`、`methods`和`computed`等属性和方法。

## 3. 数据绑定

Vue.js 提供了数据绑定功能，可以将 JavaScript 对象的属性绑定到 Vue 实例中的 DOM 元素上。你可以使用双花括号（{{ }}）或 v-bind 指令来实现数据绑定。示例代码如下：

```vue
<div id="app">
  <p>{{ message }}</p>
  
  <input type="text" v-model="message">
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>
```

## 4. 事件处理

Vue.js 允许你将 JavaScript 事件绑定到 Vue 实例中的 DOM 元素上。你可以使用 v-on 指令来绑定事件处理程序。示例代码如下：

```vue
<div id="app">
  <button v-on:click="greet">Greet</button>
</div>

<script>
  var app = new Vue({
    el: '#app',
    methods: {
      greet: function () {
        alert('Hello Vue!')
      }
    }
  })
</script>
```

## 5. 条件渲染

Vue.js 提供了多种条件渲染的方式，包括 v-if、v-else-if 和 v-else 指令。这些指令允许你根据满足或不满足一定条件来动态地渲染组件。示例代码如下：

```vue
<div id="app">
  <p v-if="showMessage">Hello Vue!</p>
  
  <button v-on:click="toggleMessage">Toggle message</button>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      showMessage: true
    },
    methods: {
      toggleMessage: function () {
        this.showMessage = !this.showMessage
      }
    }
  })
</script>
```

## 6. 列表渲染

Vue.js 提供了可用于动态渲染列表的指令，包括 v-for 指令和 v-bind:key指令。示例代码如下：

```vue
<div id="app">
  <ul>
    <li v-for="item in items" v-bind:key="item.id">
      {{ item.text }}
    </li>
  </ul>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' }
      ]
    }
  })
</script>
```

## 7. 组件

Vue.js 组件是可复用的 Vue 实例，可以通过全局注册或局部注册来创建。组件允许您从大型应用程序中分离 UI 部分并使它们更易于理解和维护。示例代码如下：

```vue
<div id="app">
  <my-component></my-component>
</div>

<script>
  Vue.component('my-component', {
    template: '<div>Hello Vue!</div>'
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```