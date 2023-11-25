# 三、指令

## 3.1 内容指令

### v-text

v-text 指令

```vue
<p v-text="message"></p>
```



### v-html

v-html 指令可以将 Vue 实例中的数据属性解析为 HTML 代码并渲染到视图中。

> 注意：使用 v-html 指令将字符串直接输出到页面，存在 xss 注入攻击风险。

```vue
<p v-html="htmlString"></p>
```

## 3.2 表单指令



### v-model

v-model 指令用于实现表单元素与 Vue 实例数据之间的双向数据绑定。

```vue
<input v-model="username">
```



## 3.3 属性指令

### v-bind 指令

v-bind 指令可以将 Vue 实例的数据绑定到 DOM 元素的属性上，实现数据的动态更新。

```vue
<img v-bind:src="imgSrc"/>

<!--简写形式-->
<img :src="imgSrc"/>
```



### 类与样式绑定

v-bind:class和 v-bind:style指令可以分别用于动态地绑定元素的 class 属性和 style 属性。

```vue
<p v-bind:class="{ class1: condition1, class2: condition2 }"></p>
<p v-bind:style="{ property1: value1, property2: value2 }"></p>
```



## 3.4 渲染指令

### v-if 和 v-show 指令

v-if 和 v-show 指令用于控制元素的显示或隐藏。

v-if 指令会根据 Vue 实例的数据属性的值来删除或插入元素。当表达式为真时，元素会被插入到视图中，反之则被删除。

```vue
<p v-if="show">这是一段文本</p>
```

v-show 指令与 v-if 不同，它不会插入或删除元素，只是根据 Vue 实例中数据属性的值来控制元素的显示或隐藏。

```vue
<p v-show="show">这是一段文本</p>
```

比起 v-if 指令，v-show 指令更适合频繁切换的情况。



### v-if / v-else-if / v-else

v-if 指令用于条件性地渲染 DOM 元素，控制元素的显示或隐藏。可选择性添加 v-else-if 和 v-else 处理不同的条件场景。

```vue
<div v-if="condition"></div>
<div v-else-if="condition2"></div>
<div v-else></div>
```



### v-once

v-once 指令用于只渲染元素和组件一次，不再随数据的变化重新渲染。

```vue
<span v-once>{{ message }}</span>
```

这对于不需要响应式地更新的内容很有用，因为它允许你从渲染开销大的组件中优化出来。



### v-for 指令

v-for 指令可以遍历 Vue 实例中的数组或对象，并为每个元素执行相应的操作。语法格式如下：

```vue
<ul>
   <li v-for="(fruit, index) in fruits" :key="index">{{ index + 1 }}. {{ fruit }}</li>
</ul>
```

其中，value 代表当前元素的值，index 代表当前元素的索引。



## 3.5 其他指令

### v-cloak

v-cloak 指令用于解决 Vue 加载过程中页面闪现的问题。

```css
[v-cloak] {
  display: none;
}
```

需要在全局样式中进行定义，但不需要对它做任何操作。只需要在与 Vue 实例相邻的 HTML 元素上添加 v-cloak 属性即可。

```vue
<div id="example" v-cloak>
   <!-- ... -->
</div>
```

在 Vue 实例完成渲染后，这个元素将会被自动删除。



### v-pre

v-pre 指令跳过这个元素和它子元素的编译过程，可以保留原本的 html 代码格式。

> 在绝大多数情况下，不建议使用 v-pre 指令。

```vue
<span v-pre>{{ message }}</span>
```

v-pre 指令可以用于优化渲染性能，特别是当你知道一部分的标记会在所有的渲染中都不会改变时，可以跳过这些地方的编译过程。



## 3.6 自定义指令

```javascript
// 第一个参数是自定义指令的名称，第二个参数对象里面包含着钩子函数 
Vue.directive('test',{
    // 只调用一次，指令第一次绑定元素的时调用
    // 在这里可以进行一次性的初始化设置
    bind：function (el,binding,vnode){},
    // 被绑定元素插入父节点时调用
    // 仅保证父节点存在，但不一定已被插入文档中
    inserted:function(el,binding,vnode){}，
    // 所有组件的Vnode更新时调用
    // 但是可能发生在其子Vnode更新之前
    // 指令的值可能发生了改变，也可能没有
    // 但是可以通过比较更新前后的值来忽略不必要的模版更新
    update：function（el，binding，vnode，oldVnod){},
    // 指令所在组件的Vnode及其子VNode全部更新后调用
    componentUpdate：function (el，binding，vnode，oldVnod){},
        // 只调用一次，指令与元素解绑时调用
        upbind:function (el,binding,vnode){},

})
```



## 3.7 事件指令

### v-on 指令

v-on 指令可以监听 DOM 事件，并在特定事件触发时调用定义的方法。绑定在 Vue 实例内部定义 methods 属性

```html
<button v-on:click="method"></button>

<!-- 简写形式-->
<button @:click="method"></button>

var vm = new Vue({
  el: '#example',
  methods: {
    method: function () {
      //方法体
    }
  }
})
```



## 3.8 修饰符

### 事件对象

vue 绑定事件的处理函数默认具有一个参数 —— 就是事件对象

```html
<div id="app">
    <button @click="logEvent">点击输出事件对象</button>
</div>
<script type="text/javascript">
    var vm = new Vue({
        methods: {
            // 绑定事件时，默认第一个参数是事件对象
            logEvent(e){
                console.log('事件对象 =>', e)
            }
        }
    }).$mount('#app')
</script>
```

> 但是如果我们在写事件处理函数时添加了额外的参数，那么我们需要显示的传入`$event`变量作为事件对象的实参



### this

在 vue 的事件处理函数中，`this`指向 vue 的实例对象，我们可以通过`this.data中的属性名`来访问在实例初始化中`data`添加的属性

### 文本输入框修饰符

有些情况下我们需要对输入的文本内容执行简单的过滤效果，vue提供了修饰符的概念用于执行该操作。添加修饰符是在`v-model`后面跟上`.修饰符的名字`。

下方列举常见的三个修饰符：

| 修饰符 |                              |
| ------ | ---------------------------- |
| lazy   | 转变为在`change`事件中同步   |
| number | 将用户的输入值转为Number类型 |
| trim   | 自动过滤用户输入的首尾空格   |



### 事件修饰符

之前我们提到了`v-model`的修饰符，用于简单的修改获取的数据，与之类似，vue 提供了事件修饰符帮助我们更容易的实现某些事件逻辑。

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为`v-on`提供了事件修饰符。与之前学到的`v-model`的修饰符类似，事件修饰符也是由点开头的指令后缀来表示的。

常用修饰符以及他们对应的功能为：

| 修饰符名字 | 作用                                             |
| :--------- | :----------------------------------------------- |
| `stop`     | 阻止事件冒泡                                     |
| `prevent`  | 阻止默认事件                                     |
| `capture`  | 进行事件捕获                                     |
| `once`     | 事件只执行一次                                   |
| `self`     | 只当在`event.target`是当前元素自身时触发处理函数 |

```vue
<div id="app">
    <!-- 阻止默认的修饰符 .prevent -->
    <a href="http://www.bufanui.com" target="_blank" @click.prevent="jump">修饰符 -- 跳转到不凡</a>
    <!-- 单纯的想要阻止，可以忽略赋值过程，不写处理函数 -->
    <a href="http://www.bufanui.com" target="_blank" @click.prevent>忽略赋值</a>

    <!-- .capture 捕获   .stop 阻止冒泡 -->
    <div class="box" @click="log" @click.capture="clog">
        <div class="inner" @click="log" @click.capture="clog">
            <div class="insert" @click.stop="log"></div>
        </div>
    </div>

    <!-- .once 让事件只执行一次 -->
    <button class="btn" @click.once="log"></button>

    <!-- .self 仅当事件是绑定事件的元素触发时才会执行 -->
    <button class="parent" @click.self="log">
        点这句话会控制台输出类名parent
        <span style="color: #0f0">点绿文字控制台不输出类名</span>
    </button>
</div>
<script type="text/javascript">
    var vm = new Vue({
        methods: {
            jump(){},
            log(e){
                console.log(e.currentTarget.className);
            },
            clog(e){
                console.log('捕获事件', e.currentTarget.className);
            }
        }
    }).$mount('#app')
</script>
```

对应的还有在键盘事件中可用的键盘事件修饰符和在鼠标按下抬起事件中使用的修饰符

| 修饰符名字                                | 作用                                           |
| :---------------------------------------- | :--------------------------------------------- |
| 按键名，如：`enter`、`.tab`、`.delete` 等 | 表示键盘事件中仅能通过对应的键触发             |
| `right`、`left`、`.middle`                | 表示在鼠标按下抬起的事件中，仅能通过对应键触发 |
