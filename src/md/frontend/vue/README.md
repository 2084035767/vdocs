# Vue 2 笔记

```vue
 __   __   __  __     ______    
/\ \ / /  /\ \/\ \   /\  ___\   
\ \ \'/   \ \ \_\ \  \ \  __\   
 \ \__|    \ \_____\  \ \_____\ 
  \/_/      \/_____/   \/_____/ 
                                
```



## 一、Vue 2.x 简介

### 1.1 什么是 Vue？


### 1.2 Vue 的历史和发展


### 1.3 Vue 和其他前端框架的比较
## 二、基础知识

### 2.1 Vue 实例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>Document</title>
  </head>
  <body>
      <!-- 作用区域 -->
    <div id="app">
        <!-- 插值表达式 -->
        {{message}}
    </div>
  </body>
  <script>
    const app = new vue({
      el: '#app', // 绑定元素
      data() {
        return { // 响应式数据
          message: 'Hello Vue!', 
        }
      },
    })
  </script>
</html>
```

### 2.2 响应式数据

### 2.3 模板语法

#### 插值表达式 {{}}

插值表达式，是 vue 的基础模板语法。

花括号内的数据可以是在数据对象中声明的属性名，也可以是三元运算式、短路语句等有返回值的表达式，但不能是`if(){}`语句这种没有返回值的语法。

数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值。

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 msg 属性（msg定义在data对象中）的值。 

插值表达式在属性上更像占位符

```html
<div id="app">
    <p>展示某个属性：{{ message }}</p>
    <p>使用一个三元运算式：{{ age > 16 ? '青年' : '少年' }}</p>
    <p>普通运算：{{ 2 + 10 * 5 }}</p>
    <p>调用某个函数方法：{{ str.toUpperCase() }}</p>
    <p>错误写法：{{ if(true){ a = 10 } }}</p>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data(){
            return {
                message: '?用于展示的数据?',
                age: 20,
                str: 'hellO wOrld'
            }
        }
    })
</script>
```

### 2.4 方法属性

### 2.5 计算属性

#### 计算属性的应用

当数据多次变更时，可以使用计算属性，计算属性有缓存作用。

计算属性是在创建 vue 实例，传入参数对象中通过定义`computed`属性来设置的。

计算属性特点

- 计算属性所依赖的数据变化必然会触发计算属性的重新求值
- 计算属性的值会缓存(当多次访问计算过的结果，那么返回的将是第一次计算过的结果)；

```vue
<div id="app">
    <p>num ----- {{ num }}</p>
    <!-- 调用计算属性函数 -->
    <p>{{ count }}</p>
    <!-- 下面都是缓存的结果 -->
    <p>{{ count }}</p>
    <p>{{ count }}</p>
    <p>{{ count }}</p>

    <!-- 点击改变num的值，调用计算属性函数，count的值重新计算，但函数依然只会触发一次 -->
    <button @click="num = Math.floor(Math.random() * 70)">点击改变num的值</button>
</div>
<script type="text/javascript">
    var vm = new Vue({
        data() {
            return {
                num: 10
            }
        },
        // computed 是一个计算属性的集合对象
        computed: {
            // 书写它的 getter 函数
            count (){
                console.count('计数'); // 控制台输出：计数：1，表示只执行一次
                // `this` 指向 vm 实例
                return this.num + 20
            }
        }
    }).$mount('#app')
</script>
```



#### 计算属性的setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```vue
<div id="app">
    <p>{{ lastName }} + {{ firstName }} = {{ fullName }}</p>

    <button @click="fullName = '苏东坡'">点击修改fullName</button>
</div>
<script type="text/javascript">
    var vm = new Vue({
        data() {
            return {
                lastName: '李',
                firstName: '太白'
            }
        },
        // computed 是一个计算属性的集合对象
        computed: {
            // 定义全名
            fullName: {
                // 获取全名 = 姓氏 + 名字
                get: function () {
                    return this.lastName + this.firstName
                },
                // 设置全名 = 姓氏为全名第一个字符，名字为后面的字符
                set: function (newValue) {
                    this.firstName = newValue[0] // 苏
                    this.lastName = newValue.slice(1) // 东坡
                }
            }
        }
    }).$mount('#app')
</script>
```





### 2.6 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器，比如需要在数据变化时执行异步或开销较大的操作时，侦听器比计算属性要更加有效。

简单使用

创建实例时可以使用`watch`选项添加侦听器，侦听器的作用时监听到某个数据属性的值变化，然后触发回调函数

```vue
<div id="app">
    <input type="text" v-model="num">
</div>
<script>
    new Vue({
        data(){
            return {
                num: 0
            }
        },
        // 添加侦听器选项
        watch: {
            // 结构 - 要监听的属性: { handler回调函数 }
            num: {
                // 当num的值发生变化时，会触发的函数，默认两个参数
                handler(newVal, oldVal) {
                    // 第一个参数 : 新值
                    console.log('newVal:', newVal)
                    // 第二个参数 : 旧值,之前的值
                    console.log('oldVal:', oldVal)
                },
                // 开启即时监听，默认为 false
                immediate: true,
                // 监听的属性的值是数组或对象，可以开启深度监听，默认为 false
                deep: true
            }
        }
    }).$mount('#app')
</script>
```

虽然解决了问题，但是这样的写法对性能影响很大，修改`obj`里面任何一个属性都会触发这个监听器里的`handler`。假如我们只想监听对象中的`a`属性，我们可以做如下处理：

```javascript
watch: {
    // 直接监听对象的属性
    'obj.a': {
        handler(newName, oldName) {
            console.log('obj.a changed');
        }
    }
}
```

简写

如果我们要侦听的属性只写了`handler`函数，不需要`deep`和`immediate`两个选项，那么我们可以使用简写形式：

```js
new Vue({
    data(){
        return {
            num: 10
        }
    },
    watch: {
        // 简写 - 侦听的属性名: handler函数
        num(newValue, oldValue){
            // ...
        }
        /* 原来的写法
        num: {
          handler: function(newValue, oldValue){
            // ...
          }
        }
        */
    }
}).$mount('#app')
```

watch和computed的区别

`watch`表示监听某个属性值变化然后执行回调函数，像是一个观察者。

`computed`本质上是一个属性，只不过它可以依赖另一些属性进行变化，它的目的是返回值。

由此，当我们需要一些异步处理的数据时，`computed`无法处理，需要使用`watch`进行监听。



### 2.7 过滤器

> Vue 提供了自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

```js
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

上述代码中`|`就是管道符号，后面跟着的`capitalize`就是过滤器的名字，具体的功能需要我们去定义，定义的方式有全局和局部两种。

#### 全局过滤器

```js
/* 过滤器函数默认具有一个参数，就是管道（|）前面的值 */
Vue.filter('capitalize',(value)=> {
    // 非空判断
    if(value) {
        // 保证 value 类型是字符串
        value = value.toString()
        // 将首字母转为大写，其它不变
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
})
```

#### 局部过滤器

在创建Vue实例的时候，我们可以设置`filters`属性来添加局部过滤器，定义的过滤器**只能在当前实例中使用**。

```js
new Vue({
    // ...
    // 注意这里使用复数形式，filter后面加了s
    filters: {
        // 过滤器名：过滤器函数
        capitalize: function (value) {
            // 非空判断
            if(value) {
                // 保证 value 类型是字符串
                value = value.toString()
                // 将首字母转为大写，其它不变
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
})
```

#### 串联过滤器

过滤器函数总接收管道前的值作为第一个参数。我们可以将过滤器串联起来，后面的过滤器函数可以将前一个过滤器函数的返回值作为自己的参数

```vue
{{ message | filterA | filterB }}
```

在这个例子中，`message`的值将作为参数传入到`filterA`函数中。然后将 `filterA`的返回值传递到`filterB`中。

你也可以在后面继续跟上`filterC`、`filterD`等等，每一个过滤器函数都会将管道前的值作为自己的第一个参数。

```vue
<div id="app">
    <!-- 使用多个过滤器，将字符串 翻转然后变成小写 -->
    {{ msg | toLower | toArr | reverse | toStr }}
</div>
<script>
    new Vue({
        data(){
            return {
                // 原始数据
                msg: 'dLRoW oLlEh'
            }
        },
        filters: {
            // 字符串变小写
            toLower(str){
                return str.toLowerCase()
            },
            // 字符串变数组
            toArr(str){
                return str.split('')
            },
            // 数组翻转
            reverse(arr){
                return arr.reverse()
            },
            // 数组变字符串
            toStr(arr){
                return arr.join('')
            }
        }
    }).$mount('#app')
</script>
```

#### 过滤器参数

过滤器默认以管道前面的值作为第一个参数，我们同样可以传递第二个，第三个…，具体写法为：

```vue
<div id="app">
    <!-- 写成函数调用形式，传入额外的参数 -->
    {{ arr | toStr('-') }}
</div>
<script>
    new Vue({
        data(){
            return {
                // 原始数据
                arr: ['n', 'i', 'c', 'e']
            }
        },
        filters: {
            // 数组变字符串，接收第二个参数作为变成字符串的连接符，默认为 ''
            toStr(arr, sperator = ''){
                return arr.join(sperator)
            }
        }
    }).$mount('#app')
</script>
```



## 三、指令

### 3.1 内容指令

#### v-text

v-text 指令

```vue
<p v-text="message"></p>
```



#### v-html

v-html 指令可以将 Vue 实例中的数据属性解析为 HTML 代码并渲染到视图中。

> 注意：使用 v-html 指令将字符串直接输出到页面，存在 xss 注入攻击风险。

```vue
<p v-html="htmlString"></p>
```

### 3.2 表单指令



#### v-model

v-model 指令用于实现表单元素与 Vue 实例数据之间的双向数据绑定。

```vue
<input v-model="username">
```



### 3.3 属性指令

#### v-bind 指令

v-bind 指令可以将 Vue 实例的数据绑定到 DOM 元素的属性上，实现数据的动态更新。

```vue
<img v-bind:src="imgSrc"/>

<!--简写形式-->
<img :src="imgSrc"/>
```



#### 类与样式绑定

v-bind:class和 v-bind:style指令可以分别用于动态地绑定元素的 class 属性和 style 属性。

```vue
<p v-bind:class="{ class1: condition1, class2: condition2 }"></p>
<p v-bind:style="{ property1: value1, property2: value2 }"></p>
```



### 3.4 渲染指令

#### v-if 和 v-show 指令

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



#### v-if / v-else-if / v-else

v-if 指令用于条件性地渲染 DOM 元素，控制元素的显示或隐藏。可选择性添加 v-else-if 和 v-else 处理不同的条件场景。

```vue
<div v-if="condition"></div>
<div v-else-if="condition2"></div>
<div v-else></div>
```



#### v-once

v-once 指令用于只渲染元素和组件一次，不再随数据的变化重新渲染。

```vue
<span v-once>{{ message }}</span>
```

这对于不需要响应式地更新的内容很有用，因为它允许你从渲染开销大的组件中优化出来。



#### v-for 指令

v-for 指令可以遍历 Vue 实例中的数组或对象，并为每个元素执行相应的操作。语法格式如下：

```vue
<ul>
   <li v-for="(fruit, index) in fruits" :key="index">{{ index + 1 }}. {{ fruit }}</li>
</ul>
```

其中，value 代表当前元素的值，index 代表当前元素的索引。



### 3.5 其他指令

#### v-cloak

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



#### v-pre

v-pre 指令跳过这个元素和它子元素的编译过程，可以保留原本的 html 代码格式。

> 在绝大多数情况下，不建议使用 v-pre 指令。

```vue
<span v-pre>{{ message }}</span>
```

v-pre 指令可以用于优化渲染性能，特别是当你知道一部分的标记会在所有的渲染中都不会改变时，可以跳过这些地方的编译过程。



### 3.6 自定义指令

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



### 3.7 事件指令

#### v-on 指令

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



### 3.8 修饰符

#### 事件对象

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



#### this

在 vue 的事件处理函数中，`this`指向 vue 的实例对象，我们可以通过`this.data中的属性名`来访问在实例初始化中`data`添加的属性

#### 文本输入框修饰符

有些情况下我们需要对输入的文本内容执行简单的过滤效果，vue提供了修饰符的概念用于执行该操作。添加修饰符是在`v-model`后面跟上`.修饰符的名字`。

下方列举常见的三个修饰符：

| 修饰符 |                              |
| ------ | ---------------------------- |
| lazy   | 转变为在`change`事件中同步   |
| number | 将用户的输入值转为Number类型 |
| trim   | 自动过滤用户输入的首尾空格   |



#### 事件修饰符

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

##  四、Vue CLI

### 4.1 Vue CLI 简介

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

### 4.2 创建项目

安装vue-cli

::: tab-code 

@tab npm

```bash
npm install -g vue-cli
```

@tab yarn

```bash
yarn add -g vue-cli
```

@tab pnpm

```bash
pnpm add -g vue-cli
```

- 项目创建

```bash
vue create vue3-demo
```

### 4.3 项目目录结构



```bash
├── node_modules     # 项目依赖包目录，存放下载依赖的文件夹
├── public           # 存放不会变动静态的文件，它与src/assets的区别在于，public目录中的文件不被webpack打包处理，会原样拷贝到dist目录下
│   ├── favicon.ico  # 在浏览器上显示的图标
│   └── index.html   # 主页面文件
├── src              # 源码文件夹
│   ├── assets       # 存放组件中的静态资源
│   ├── components   # 存放一些公共组件
│   ├── views        # 存放所有的路由组件
│   ├── App.vue      # 应用根主组件
│   ├── main.js      # 应用入口 js
│   ├── router       # 路由配置文件
│   └── store        # vuex状态管理文件
├── .eslintrc.js     # eslint相关配置
├── .gitignore       # git 版本管制忽略的配置
├── .postcssrc.js    # postcss一种对css编译的工具，类似babel对js的处理
├── babel.config.js  # babel 的配置,即ES6语法编译配置
├── package.json     # 项目基本信息,包依赖配置信息等
└── yarn.lock        # 用于记录当前状态下实际安装的各个包的具体来源和版本号等, 保证其他人在 npm install 项目时大家的依赖能保证一致.
```

- 开发规范
  - 命名规范（文件命名，变量，函数，class， id） 驼峰， - _ 约定法
  - 目录规范（目录如何建立） 划分目录结构 约定法



##  五、组件

### 5.1 组件基础

> 组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码，减少项目的代码量。
>
> 组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树。

![null](http://doc.bufanui.com/uploads/vue2/images/m_c946e1e29869cdb1c295b1138fe9307b_r.png)



组件就是一个元素（HTML标签），所有的HTML标签本身就可以当做是一个组件。但是这个组件的粒度太小，不能形成一个具备独立功能的模块。

如果我们可以将这些HTML标签组件，进行一些组合，然后赋予一些逻辑，形成具备一个独立功能的部件，这就是通常所说的组件。



vue.js 对组件的描述：

- 组件可以扩展 HTML 元素，封装可重用的代码。
- 在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。
- 组件（Component）是 Vue.js 最强大的功能之一。

组件化的开发思想，需要将整个webapp，划分成若干个小的组件，然后进行组合，类似于搭积木的游戏。

```vue
<template>
<!-- 模板 -->
</template>

<script>
// 操作处理 
export default {
    
}
</script>

<style scoped>
/*样式*/
</style>
```

在 vue 项目中，我们要使用组件，步骤如下：

1. 定义组件
2. 注册组件
3. 使用组件

### 5.2 定义组件

组件可以理解为HTML结构的封装，将代表页面某个功能的节点封装成一个标签，就是组件。

我们以封装一个Header组件为例，要求页面有一个`HeadView`标签，书写后呈现官网的样式

HTML中没有这个标签，所以我们需要自定义这样一个标签，它实际代表的是一端HTML结构，这就是创建组件。

Vue 提供了两种方式创建：全局 和 局部，写法跟前面学过的自定义指令、过滤器类似，名称为：`component`和`components`。

```js
// 全局注册
Vue.component('组件名', { 配置对象 })

// 局部注册
new Vue({
    components: {
        组件名: { 配置对象 }
    }
})
```

**配置对象可写属性与Vue实例创建的可写属性除了绑定元素属性外，其余一致。**即之前所学的Vue实例创建的属性都可以在组件创建中书写。

```js
Vue.component('headview', {
    // 组件使用 template 绑定HTML代码
    template: `
        <ul>
          <li><a href="/" class="Logo"><img src="http://bufanui.com/pages/front/img/LOGO.png" alt=""></a></li>
          <li v-for="(item, i) in arr" :key="i">{{item}}</li>
        </ul>
        `,
    // 也可以绑定数据属性
    data(){
        return {
            arr: ['首页', '前端开发', 'ui设计', '不凡说', '导航']
        }
    }
})
```

项目中定义组件

在 vue 项目中，每一个`.vue`后缀名的文件其实都是一个组件，当然你要知道创建`.vue`文件仅仅是创建了组件，它还没有经过注册，无法使用。

注册的方式很简单，就是在全局和局部我们写组件配置的地方，将其改为引入的组件文件即可。

```vue
<template>
<ul>
    <li><a href="/" class="Logo"><img src="http://bufanui.com/pages/front/img/LOGO.png" alt=""></a></li>
    <li v-for="(item, i) in arr" :key="i">{{item}}</li>
    </ul>
</template>

<script>
    export default {
        name: 'Headview',
        data(){
            return {
                arr: ['首页', '前端开发', 'ui设计', '不凡说', '导航']
            }
        }
    };
</script>

<style scoped>
    /* ... */
</style>
```

> 注意：一般情况下组件的文件命名方式为大驼峰，且由两个以上单词组成

这次我们使用局部注册的方式，找到要使用该组件的页面 App.vue，修改为：

```vue
<template>
    <div id="app">
        <!-- 使用该组件 -->
        <HeadView></HeadView>
    </div>
</template>

<script>
// 根据对应地址引入组件
import HeadView from './components/HeadView'

export default {
    name: 'App',
    // 局部注册的方式
    components: {
        // 注册组件，引入的组件文件相当于组件的配置项
        // HeadView: HeadView
        // 引入的组件名一般写为标签，这样可以使用ES6简写
        HeadView
    }
}
</script>
```

如果是全局注册的方式，需要在`main.js`文件中书写全局注册代码。

```js
// main.js

// 引入
import HeadView from '地址'
// 注册
Vue.component('HeadView', HeadView);
```

### 5.3 组件通信

Vue 组件间通信有哪几种方式？

1. `props / $emit` 适用 父子组件通信
2. `ref 与 $parent / $children /.sync` 适用 父子组件通信

```html
  <!-- 父组件 -->
   <child :val.sync='foo'></child> 
   <!-- 子组件可以直接改变父组件的foo变量  -->
  this.$emit('upate:val','数据')
```



1. `EventBus （$emit / $on）` 适用于 父子、隔代、兄弟组件通信
2. `$attrs/$listeners` 适用于 隔代组件通信（2.4.0新增）

#### 父子组件通信

父传子

分成两步：

1. 在父组件中给子组件标签绑定属性，属性值为要传递的值。
2. 在子组件中，通过`props`选项接收传递的属性，然后就可以直接使用了。

> 注意：千万不要在子组件中去修改从父组件传递过来的属性。否则会报错

```html
<template>
  <!-- 直接在组件标签名上添加传递的属性与属性值 -->
  <test :propmsg="msg" :product="good"></test>
</template>

<script>
export default {
  data() {
    return {
      good: '《钢铁是怎样炼成的》',
      msg: '孩儿啊，最近过的如何啊？'
    }
  },
  components: {
    // 注册子组件
    test: {
      // 通过 props 接收父组件传递的属性
      props: ['propmsg', 'product'],
      template: "<div>我是子组件，接受来自父组件的值---{{ propmsg }} -- {{ product }}</div>"
    }
  }
}
</script>

```



因为Vue采用的是单向数据流，所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。



**prop 的命名规范**
HTML 中的属性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的`prop`名需要使用其等价的 kebab-case (短横线分隔命名) 命名，如下所示：

```javascript
// 属性名是驼峰
props: ['postTitle']
<!-- 在 HTML 中使用 短横线 -->
<blog-post post-title="hello!"></blog-post>
```

有些时候我们可能想对父组件传递的属性做出一些限制，如类型、内容、是否具有默认值、是否必填等，这时候我们可以将`props`写为对象形式：

```js
new Vue({
    // 改为对象形式，添加多种设置
    props: {
        propmsg: {
            // 控制类型，多个类型可以写为数组形式 [String, Number, ...]
            type: String,
            // 默认值
            default: '默认值',
            // 是否必填，默认false
            required: false,
            // 自己定义的校验函数，参数为父组件传递的属性值，返回false则会在控制台报错
            validator(value){
                console.log('父组件传递的值为：', value)
                return true/false
            }
        },
        // 也可以直接写为  属性名: 类型
        product: String
    }
}).$mount('#app')
```

子传父

子组件到父组件的通信，要借助Vue实例的`$emit`方法，也是需要分成两步：

1. 在子组件中，需要`$emit`一个事件
2. 父组件中，在子组件的标签上绑定它`$emit`的事件

```html
<div id="app">
    <!-- 绑定子组件 $emit 的事件名 @子传的事件名='自己的监听函数' -->
    <com @give="receive"></com>
</div>
<script>
    var vm = new Vue({
        el : "#app",
        components: {
            com: {
                template: '<button @click="trans">给父组件传值</button>',
                methods:{
                    trans(){
                        // this.$emit('事件名', 传递的值1, arg2, ...)
                        this.$emit('give', "闹，给你1000块打麻将")
                    }
                }
            }
        },
        methods: {
            // 监听函数的参数为子组件传递的值
            receive(msg){
                console.log('接收到子组件传递的信息：', msg)
            }
        }
    })
</script>
```

#### 2.1 sync 修饰符

如果确实需要在子组件中修改父组件传递过来的值，可以借助`sync`修饰符。

写法是在子组件标签上传递属性后面加上`sync`修饰符，在子组件更改该属性值的时候传一个`this.$emit('update:修改的属性名', 修改的值);`，就可以实现修改的效果。

```html
<div id="app">
    <!-- 绑定的属性添加 sync 修饰符 -->
    <com :message.sync= "message"></com>
</div>
<script>
    var vm = new Vue({
        el : "#app",
        data(){
            return {
                message: "父元素里面的值"
            }
        },
        components: {
            com: {
                props: ["message"],
                template: "<h3 @click='changeProp'>子组件 {{message}}</h3>",
                methods:{
                    changeProp(){
                        // 使用 update:属性名 作为发射的事件名，修改父组件传递的属性值
                        this.$emit('update:message', "改变之后的")
                    }
                }
            }
        }
    })
</script>
```



#### 兄弟组件通信

同级的组件通过添加`$bus`(中央事件总线)传递。

1. 我们需要添加`$bus`方法，vue 的实例上没有这个方法
2. 同级组件直接可以通过`$emit`和`$on`实现值的传递

```html
<div id="app">
    <zujian1></zujian1>
    <zujian2></zujian2>
</div>
<script>
    // 给原型添加属性，所有的Vue实例都会拥有该属性
    // 这里赋值为一个Vue实例，主要是要借用Vue实例上的 $emit 和 $on 方法
    Vue.prototype.$bus = new Vue();

    var vm = new Vue({
        components: {
            "zujian1": {
                data(){
                    return {
                        msg: ''
                    }
                }
                created () {
                    // 实例可以使用原型的属性 $bus
                    // $on 是vue提供的方法，用于接收 $emit 的值，方式为：$on('$emit的事件名', 回调函数)
                    this.$bus.$on("busevent", val =>{
                        // 参数就是$emit传递的值
                        this.msg = val;
                    });
                },
                template :"<p>zujian2 传递过来的值是 {{msg}}</p>"
            },
            "zujian2": {
                methods:{
                    send(){
                        // 类似于子传父
                        this.$bus.$emit("busevent", '好朋友，你在干什么？');
                    }
                },
                template :"<button @click='send'>给zujian1传递数据</button>"
            },
        }
    }).$mount('#app')
</script>
```



#### 跨级组件通信



### 3.3 组件插槽

插槽（Slot）是Vue提出来的一个概念，正如名字一样，插槽用于决定将所携带的内容，插入到模板template指定的某个位置，从而使模板分块，具有模块化的特质和更大的重用性。插槽显不显示、怎样显示是由父组件来控制的，而插槽在哪里显示就由子组件来进行控制。

**插槽含义：**引入子组件后，在插入子组件元素中添加信息或者标签，使得子组件的指定位置插入信息或者标签

插槽有三种：**默认插槽、具名插槽、作用域插槽.**

插槽，其实就相当于占位符。它在组件中给你的HTML模板占了一个位置，让你来传入一些东西。插槽又分为匿名插槽、具名插槽以及作用域插槽。

没有插槽的情况下在组件标签内些一些内容是不起任何作用的，当我在组件中声明了slot元素后，在组件元素内写的内容就会跑到它这里了！

> 插槽是父组件与子组件新的通讯的方式，可以将父组件里面的内容显示到子组件中（包括标签）

插槽使用

创建 product.vue 组件，然后引入 productDetail.vue 组件

```php+HTML
<template>
    <div>
        <h3>product.vue组件</h3>
        <!-- 标签内的内容 会出现在 子组件写的插槽位置 -->
        <productDetail>hello productDetail </productDetail>
    </div>
</template>
<script>
    import productDetail from "./produceDetail"
</script>
```

创建 productDetail.vue 组件

```html
<template>
    <div>
        <h3>productDetail.vue组件</h3>
        <!-- slot 标签就是插槽标签，它会被替换为 父组件使用子组件标签时写在标签内的内容 如：hello productDetail -->
        <slot></slot>
    </div>
</template>
```

当组件渲染的时候，`<slot></slot>`会被替换为`hello productDetail`



插槽内也可以包含任何模板代码，包括HTML

```html
<h3>product.vue组件</h3>
<productDetail>
    <!-- 添加标签 -->
    <h3>hello productDetail</h3>
</productDetail>
```

如果`<productDetail>`中没有包含一个`<slot>`元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。



在插槽中使用数据

插槽跟模板其他地方一样都可以访问相同的实例属性而不能访问`<productDetail>`的实例属性

```php+HTML
<template >
    <div>
        <h3>product.vue组件</h3>
        <productDetail>
            <!-- 可以访问到 product 的数据 -->
            <h3>hello productDetail--{{count}}</h3>
        </productDetail>
    </div>
</template>
<script>
    import productDetail from "./ProductDetail"
    export default {
        data() {
            return {
                count:100
            }
        },
        components:{
            productDetail
        }
    }
</script>
```

**规则：**
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。



#### 默认插槽 (匿名)

有时候我们需要给插槽设置一个具体的默认内容，当别的组件没有给你内容的时候，那么默认的内容就会被渲染

```html
<template>
  <div>
    <h3>productDetail.vue组件</h3>
    <!-- 在slot插槽里设置默认内容 hello -->
    <slot>hello</slot>
  </div>
</template>
```

在 product 组件中直接使用，默认内容 hello 将会被渲染。



#### 具名插槽

有时候我们一个组件里需要**多个插槽**，对于这样的情况，`slot`标签通过`name`属性区分不同的插槽。

默认插槽的`name`值为`default`。父组件通过在`template`标签上写`v-slot:name`属性来给对应的插槽插入内容。

>  注意：`v-slot`属性只能添加在`template`标签上。

```html
<template>
  <div>
    <h3>productDetail.vue组件</h3>
    <!-- 插槽默认名字为 default -->
    <slot></slot>

    <!-- 给插槽起名字 -->
    <slot name="title"></slot>
    <slot name="price"></slot>
  </div>
</template>
```

product.vue 组件

```html
<template >
    <div>
        <h3>product.vue组件</h3>
        <productDetail>
            <!-- 通过 template 标签添加 v-slot:插槽名 给对应的插槽赋值 -->
            <template v-slot:title>
                <h3>OPPO Reno6 Pro+ 12+256GB</h3>
            </template>
            <template v-slot:price>
                <h3>￥ 3499.00</h3>
           </template>
        </productDetail>
    </div>
</template>

<!--简写形式-->
<productDetail>
  <template #title>
     <h3>OPPO Reno6 Pro+ 12+256GB</h3>
   </template>
   <template #price>
     <h3>￥ 3499.00</h3>
   </template>
</productDetail>
```



#### 作用域插槽

如果我们想要在插槽内使用子组件的数据，可以使用作用域插槽。

1. 在子组件中将父组件使用的数据绑到 `<slot>` 上
2. 在父组件中用`v-slot`设置一个值来接收子组件传递的属性

```php+HTML
<template>
    <div>
        <h3>productDetail.vue组件</h3>
        <!-- 在子组件中添加对应的属性，将值传递给插槽 -->
        <slot name="student" :student="people"></slot>
        <slot name="goods" :goods="goodsList"></slot>
    </div>
</template>
<script setup>
    export default {
        data(){
            return {
                id:'100026761908',
                people:{
                    name:'lucky',
                    age:12
                },
                goodsList:[
                    {
                        id:1102,
                        name:'戴尔(DELL)游匣G15 15.6英寸',
                        price:'￥ 5199.00'
                    },
                    {
                        id:'1106',
                        name:'美的（Midea）S8+自动集尘扫拖机器人',
                        price:'￥ 2499.00'
                    },
                    {
                        id:'11056',
                        name:'Apple Watch SE',
                        price:'￥ 2119.00'
                    }
                ]
            }
        }
    }
</script>
```

product.vue 组件:

```html
<productDetail>
    <!-- 通过命名组件="变量" 接收子组件传递的值 -->
    <template #student="studentDetail">
        <!-- 变量的值是一个对象，属性由子组件传递的属性组成 -->
        {{studentDetail}}
        <p>
            当前学生的名字是:{{studentDetail.student.name}},
            当前学生的姓名是:{{studentDetail.student.age}}
        </p>
    </template>
</productDetail>

<!-- 解构获取 -->
<productDetail>
    <template #student={student}>
        {{student}}
        <p>
            当前学生的名字是:{{student.name}},
            当前学生的姓名是:{{student.age}}
        </p>
    </template>
</productDetail>
```



### 3.4 动态组件

> 让多个组件使用同一个挂载点，并动态切换，这就是动态组件

动态组件借助`component`标签和它的`is`属性实现：

```html
<div id="app">
    <!-- 原来的写法 -->
    <test></test>

    <!-- 改为动态组件 -->
    <component is="test"></component>
</div>
```

#### 组件缓存

把组件的引入改为动态引入后，每次加载组件都会重新渲染，出于性能考虑，为避免多次重复渲染降低性能。

Vue 提供了`keep-alive`标签用于组件缓存，切换组件后，原来的组件不会被清除，而是维持当前的状态。

```html
<div id="app">
    <keep-alive>
        <!-- 被包裹的动态组件可以被缓存 -->
        <component :is="view"></component>
    </keep-alive>
</div>
```

**应用场景**

如果未使用keep-alive组件，则在页面回退时仍然会重新渲染页面，触发created钩子，使用体验不好。 在以下场景中使用keep-alive组件会显著提高用户体验，菜单存在多级关系，多见于列表页+详情页的场景如：

- 商品列表页点击商品跳转到商品详情，返回后仍显示原有信息
- 订单列表跳转到订单详情，返回，等等场景。



#### keep-alive的生命周期

- 初次进入时：created > mounted > activated；退出后触发 deactivated
- 再次进入：会触发 activated；

事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中

### 3.5 异步组件

在Vue中，异步组件允许你延迟加载组件的代码，从而提高应用程序的性能。当你使用异步组件时，组件的代码只会在需要时才会被加载，而不是在页面加载时就立即加载所有组件的代码。

Vue提供了两种方式来定义异步组件：使用工厂函数和使用动态导入。

#### 使用工厂函数

你可以使用工厂函数定义异步组件。工厂函数返回一个Promise，该Promise在解析时会提供组件的定义。这样，组件的代码只会在需要时被加载。

```javascript
Vue.component('async-component', function (resolve, reject) {
  // 使用import()动态导入组件的定义
  import('./AsyncComponent.vue')
    .then((component) => {
      resolve(component);
    })
    .catch((error) => {
      reject(error);
    });
});
```

在上面的例子中，`import()`函数用于动态导入`AsyncComponent.vue`组件的定义。当Promise被解析时，`resolve`函数会传递组件的定义，从而使Vue可以正确地渲染该组件。

#### 使用动态导入

另一种定义异步组件的方式是使用动态导入。你可以使用`import()`函数直接在组件的`import`语句中导入组件的定义。

```javascript
Vue.component('async-component', () => import('./AsyncComponent.vue'));
```

这样，当需要渲染`async-component`组件时，Vue会自动异步加载`AsyncComponent.vue`的代码。

无论你使用哪种方式，一旦异步组件被加载，它将被缓存起来，以便在后续的渲染中重复使用，而不会重复加载。

异步组件对于优化应用程序的初始加载时间和减少不必要的网络请求非常有用，特别是当应用程序的某些组件只在特定条件下才会被使用时。



## 六、进阶主题

### 6.1 Vue Devtools



### 6.2 生命周期钩子函数

> vue 提供了从实例创建到页面内容更新完成的一系列过程监听钩子函数，我们称为 vue 的生命周期。

生命周期函数分类

vue 的生命周期包含了从开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载等一系列过程。

| **创建期间的生命周期函数** |                                                              |
| -------------------------- | ------------------------------------------------------------ |
| `beforeCreate`             | 实例刚在内存中被创建出来，此时，还没有初始化好`data`和`methods`属性 |
| `created`                  | 实例已经在内存中创建OK，此时`data`和`methods`已经创建OK，此时还没有开始 编译模板(模板 比如`{{}}`) |
| `beforeMount`              | 此时已经完成了模板的编译，但是还没有挂载到页面中             |
| `mounted`                  | 此时，已经将编译好的模板，挂载到了页面指定的容器中显示       |
| **运行期间的生命周期函数** |                                                              |
| `beforeUpdate`             | 状态更新之前执行此函数， 此时`data`中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点 |
| `updated`                  | 实例更新完毕之后调用此函数，此时`data`中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！ |
| **销毁期间的生命周期函数** |                                                              |
| `beforeDestroy`            | 实例销毁之前调用。在这一步，实例仍然完全可用。               |
| `destroyed：Vue`           | 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 |



```javascript
var vm = new Vue({
    el:'#app',
    data:{
        msg:'hello',
        list:[]
    },
    beforeCreate() {
        console.log('beforeCreate:'+this.msg);
    },
    created() {
        //数据和方法初始化完成
        //如果要调用数据和方法，最早在这里执行
        console.log('created:'+this.msg);
        // this.getmovie();

    },
    beforeMount() {
        console.log('beforeMount:',document.querySelector("p").innerHTML);
    },
    mounted() {
        //操作dom需要在这个钩子函数中
        console.log('mounted:',document.querySelector("p").innerHTML);
    },
    beforeUpdate() {
        console.log('beforeUpdate:',document.querySelector("p").innerHTML);
    },
    updated() {
        console.log('updated:',document.querySelector("p").innerHTML)
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
    methods:{
        getmovie(){
            $.ajax({
                url:'http://bufantec.com/api/douban/movie/top250',
                success:(res)=>{
                    console.log(res);
                    this.list = res.data.list;
                }
            })
        },
        remove(){
            this.$destroy();
        }

    }

})
```

**beforeCreate**

实例初始化之后、创建实例之前的执行的钩子事件。

创建实例之前，数据观察和事件配置都没好准备好。也就是数据也没有、DOM也没生成。



**created**

实例创建完成后执行的钩子。

此时实例创建完成，我们能读取到数据`data`的值，但是DOM还没生成，挂载属性el还不存在。



**beforeMount**

将编译完成的html挂载到对应的虚拟DOM时触发的钩子，此时页面并没有内容。即此阶段解读为: 即将挂载

可以发现此时的`$el`不再是`undefined`，成功关联到我们指定的DOM节点。但是此时的`{{test}}`还没有成功渲染成data中的数据，页面没有内容。



**mounted**

编译好的html挂载到页面完成后所执行的事件钩子函数。

`mounted`在整个实例中只执行一次。



**beforeUpdate**

当修改vue实例的`data`属性时，vue就会自动帮我们更新渲染视图，在这个过程中，vue提供了`beforeUpdate`的钩子给我们，在检测到我们要修改数据的时候，更新渲染视图之前就会触发钩子`beforeUpdate`。



**updated**

此阶段为更新渲染视图之后，此时再读取视图上的内容，已经是最新的内容。

1. 该钩子在服务器端渲染期间不被调用。
2. 应该避免在此期间更改状态，因为这可能会导致更新无限循环。



**beforeDestroy**

调用实例的`destroy()`方法可以销毁当前的组件，在销毁前，会触发`beforeDestroy`钩子。



**destroyed**

成功销毁之后，会触发`destroyed`钩子，此时该实例与其他实例的关联已经被清除，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。





> **ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例。**

通俗点说，`ref`就是 vue 提供的获取DOM的属性，我们在页面元素上添加`ref="自定义名"`，然后就可以在JS中通过`vue实例.$refs.自定义名` 获取到绑定的节点或组件实例对象。

```html
<html>
<body>
    <div id="app">
        <p ref="select">日照香炉生紫烟</p>
        <button @click="getEl">点击获取p标签</button>
    </div>

    <script>
        new Vue({
            el: '#app',
            methods: {
                getEl(){
                    console.log('获取的p标签', this.$refs.select); // <p>...</p>
                }
            }
        })
    </script>
</body>
</html>
```

如果我们的元素是通过`v-for`循环生成的，那么获取在循环元素上绑定的`ref`属性获取到的将是一个节点数组

```html
<html>
    <body>
        <div id="app">
            <!-- v-for ref 可以获取节点数组 -->
            <ul>
                <li v-for="n in 10" ref="list">LI_{{n}}</li>
            </ul>
            <button @click="getEl">点击获取li标签</button>
        </div>
        <script>
            new Vue({
                el: '#app',
                methods: {
                    getEl(){
                        console.log(this.$refs.list); // [li_1, li_2, ...]
                    }
                }
            })
        </script>
    </body>
</html>
```

> **将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。**

简单来说，这个API就是帮助我们在数据更新后可以立即通过页面节点获取到最新的数据

```html
<div id="app">
    <p ref="msg">{{ message }}</p>
    <button @click="change">修改msg</button>
</div>
<script src="../lib/vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data(){
            return {
                message: 'world'
            }
        },
        methods: {
            change(){
                this.message = 'hello'
                console.log('立刻获取页面更新后的数据，不成功', this.$refs.msg.innerText)

                // 可以让元素获取到 内容更新之后的值
                this.$nextTick(() => {
                    console.log('使用$nextTick', this.$refs.msg.innerText)
                })

            }
        }
    })
</script>
```

### 6.3 组件扩展

有3种方式完成组件扩展

- Mixin
- HOC
- Renderless组件

#### Mixin

缺陷

- 打破原有组件的封装，找个方法可能要全局搜索，可能忘记了在什么地方
- 增加组件复杂度
- 可能会出现命名冲突的问题
- 仅仅只是对逻辑的复用，模版不能复用

####  HOC （higher order component）高阶组件

函数接受一个组件作为参数，并返回一个新组件，可复用的逻辑在函数中实现

相比Mixin的优点

- 模版可复用
- 不会出现命名冲突（本质上是一个HOC是套了一层父组件） 不足
- 组件复杂度高，多层嵌套，调试会很痛苦

#### RenderLess组件（推荐使用）

- 复用的逻辑沉淀在包含slot插槽的组件
- 接口由插槽Prop来暴露

**优点**

- 模版可复用
- 不会出现命名冲突
- 符合依赖倒置原则
- 复用的接口来源清晰



### 6.4 过渡与动画

Vue 提供了`transition`组件，在下列情形中，可以给任何元素和组件添加进入/离开的过渡动画：

- 条件渲染 (使用`v-if`)
- 条件展示 (使用`v-show`)
- 动态组件
- 组件根节点

添加动画的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除

![null](http://doc.bufanui.com/uploads/vue2/images/m_8f1a5876dabf024f8ebd0aeffe4a3316_r.png)

transition 实现

根据上述的6个类名给元素添加切换动画的效果

（1）给元素添加动画

```html
<!-- 切换显示和隐藏 -->
<button @click="show = !show">点击显示和隐藏</button>

<!-- vue 提供了transition标签，使开发者对内部有切换状态的元素添加动画 -->
<transition>
    <p v-if="show">hello</p>
</transition>
```

（2）添加动画切换的类

```css
/* 定义入场动画起始状态的样式 */
.v-enter{
    opacity: 0;
}
/* 定义入场动画终止状态的样式 */
.v-enter-to{
    opacity: 1;
}
/* 定义入场动画过渡效果 */
.v-enter-active{
    transition: all 5s;
}
/* 定义出场动画起始状态的样式 */
.v-leave{
    opacity: 1;
}
/* 定义出场动画终止状态的样式 */
.v-leave-to{
    opacity: 0;
}
/* 定义出场动画过渡效果 */
.v-leave-active{
    transition:  all 3s;
}
```

#### animation 实现

动画的用法类似于过渡，区别是动画是在定义动画帧时书写起始到结束的状态，不借助`v-enter`，`v-enter-to`，`v-leave`，`v-leave-to`类名，只需要将定义好的动画帧通过`animation`添加到`v-enter-active`和`v-leave-active`中去即可。

在动画中`v-enter`类名在节点插入 DOM 后不会立即删除，而是在`animationend`事件触发时删除。

（1）给元素添加动画

```html
<!-- 添加显示和隐藏 -->
<button @click="show = !show">Toggle show</button>
<transition>
    <p v-if="show">hello</p>
</transition>
```

(2) 添加动画切换的类

```css
/* 定义入场动画过渡效果 */
.v-enter-active {
  animation: bounce-in .5s;
}

/* 定义出场动画过渡效果 */
.v-leave-active {
  animation: bounce-in .5s reverse;
}

/* 定义动画帧，里面有元素的起始状态和终止状态 */
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

### 命名动画

如果想让页面内有多个动画效果，我们需要给 transition 标签添加`name`属性，从而可以定义不同的动画，添加过`name`属性之后，上面提到的6个类名就更换为：`name-xxx`这种形式。

```html
...
<!-- 添加了 name 属性 -->
<transition name="fade">
    <p v-if="show">hello</p>
</transition>
/* 类名从默认的 v-xxx 改为 name-xxx 形式 */
.fade-enter{}
.fade-enter-to{}
.fade-enter-active{}
.fade-leave{}
.fade-leave-to{}
.fade-leave-active{}
```

#### 使用动画插件

在使用`animation`实现过渡动画的时候，每次都需要我们自己来定义动画。vue 允许我们使用第三方动画库如：animate.css，我们可以通过以下 attribute 来自定义过渡类名：

| 标签属性                 | 作用                                        |
| :--------------------------- | :---------------------------------------------- |
| `enter-class`            | 自定义入场起始样式类名，即 `v-enter`        |
| `enter-active-class`     | 自定义动画效果类名，即 `v-enter-active`     |
| `enter-to-class`(2.1.8+) | 自定义入场终止样式类名，即 `v-enter-to`     |
| `leave-class`            | 自定义出场起始样式类名，即 `v-leave`        |
| `leave-active-class`     | 自定义出场动画效果类名，即 `v-leave-active` |
| `leave-to-class`(2.1.8+) | 自定义出场终止样式类名，即 `v-leave-to`     |

（1）通过 npm 安装 animate.css

```sh
npm i animate.css
```

（2）在页面引入 animate.css

```js
import 'animate.css'
```

（3）在元素上直接通过类名使用

```vue
<!-- 因为是动画，所以直接使用 enter-active-class 和 leave-active-class 即可 -->
<transition enter-active-class='animate__动画名 animate__animated' leave-active-class='animate__动画名 animate__animated'>
  ...
</transition>
```

（4）也可以只借助动画库的动画名，自己定义 `animation` 样式

```vue
<transition enter-active-class='in'>
  ...
</transition>
...
// css
.in {
  animation: 动画库中动画的名字 动画时长 ease;
}
```

##  七、路由

### Vue Router

### 路由配置
### 导航守卫
### 动态路由

##  八、状态管理

### Vuex

### 状态管理基本概念
### 模块化
### 异步操作

##  九、工具和生态系统

### Vue Test Utils

### UseVue

### 第三方库和插件

#### UI组件库

| 包名           | 作用                                                     |
| :----------------- | :----------------------------------------------------------- |
| element-ui     | 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库 |
| iview          | 一套基于 Vue.js 的高质量UI 组件库                        |
| ant-design-vue | ant-design衍生的vue版本                                  |
| vuetify        | 包含手工制作的精美材料组件                               |
| vant           | 轻量、可靠的移动端 Vue 组件库                            |

#### 文件处理

| 包名                     | 作用                                             |
| :--------------------------- | :--------------------------------------------------- |
| @chenfengyuan/vue-qrcode | Vue.js的QR码组件                                 |
| qrcode.vue               | vue版二维码生成组件                              |
| vue-qr                   | Awesome-qr.js的Vue 2.x组件                       |
| vue-qrcode-reader        | 一组用于检测和解码二维码的 Vue.js 组件           |
| vue-clipboard2           | 简单的vue2绑定到剪贴板                           |
| vue-simple-uploader      | 由 simple-uploader.js 提供支持的 Vue.js 上传组件 |

#### 富文本

| 包名                 | 作用                                    |
| :----------------------- | :------------------------------------------ |
| @tinymce/tinymce-vue | TinyMCE Vue官方组件，富文本编辑器       |
| mavon-editor         | markdown 文档编辑器                     |
| vue-meditor          | markdown编辑器                          |
| vuep                 | 使用实时编辑器和预览呈现 Vue 组件的组件 |



#### 网站交互

| 包名                    | 作用                                                   |
| :-------------------------- | :--------------------------------------------------------- |
| vue-awesome-swiper      | 基于swiper的vue轮播组件库                              |
| vue-croppa              | 简单的vue图片剪辑插件                                  |
| vue-cropper             | 图片裁剪插件                                           |
| vue-fullpage.js         | 全屏翻页插件                                           |
| vue-js-modal            | 易于使用，高度可定制的Vue.js模态框库                   |
| vue-splitpane           | 使用 vue2.0 构建的 Split-Pane 组件，可以垂直或水平拆分 |
| vuescroll               | 基于vuejs2.x的虚拟滚动条                               |
| vxe-table               | 基于 vue 的 PC 端表格组件                              |
| carddragger             | 用vue实现的拖拽排列卡片组件                            |
| vuedraggable            | 允许拖放和与视图模型数组同步                           |
| awe-dnd                 | 使您的元素在 Vue 中可拖动                              |
| vue-draggable-resizable | 用于可拖动和可调整大小的元素的 Vue2 组件               |
| vue-virtual-scroll-list | vue 组件支持海量虚拟滚动数据列表，渲染性能高，效率高   |
| vue-photo-preview       | 基于photoswipe的vue图片预览插件                        |
| v-viewer                | vue的图片查看器组件，支持旋转、缩放、缩放等            |

#### 实用工具

| 包名                   | 作用                                                     |
| :------------------------- | :----------------------------------------------------------- |
| vue-class-component    | Vue类组件是一个库，可让您以类样式的语法制作Vue组件       |
| vue-property-decorator | 在Vue中使用Typescript，通过vue-property-decorator装饰器库来简化书写 |
| vuex-persist           | Vuex插件来持久存储数据                                   |
| vuex-persistedstate    | 在页面重新加载后可以持久化保存Vuex状态                   |
| vuex-class             | Binding helpers for Vuex and vue-class-component         |
| vue-i18n               | Vue.js的国际化插件                                       |
| vue-meta-info          | 修改页面或模块元信息，在组件内动态生成meta标签           |
| vue-cookie             | 在vue中如果操作cookie                                    |
| vue-lazyload           | 用于在应用程序中延迟加载图像的 Vue 模块                  |

### 常用工具函数

emptyObject

```js
// 冻结对象,使定义的对象无法进行修改,但是对象属性值中为复杂类型则可以修改其中的值
var emptyObject = Object.freeze({}); 
```

isUndef

```js
// 判断是否为undefined 或者null
function isUndef (v) {
    return v === undefined || v === null
}
```

isDef

```js
// 判断是否为undefined 或者null
function isDef (v) {
    return v !== undefined && v !== null
}
```

isTrue

```js
  // 判断是否为真
  function isTrue (v) {
    return v === true
  }
```

isFalse

```js
  // 判断是否为假
   function isFalse (v) {
     return v === false
  }
```

isPrimitive

```js
 // 判断是否为基础类型数据
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }
```

isObject

```js
 // 判断是否为复杂类型
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }
```

判断数据具体类型

```js
 // 调用对象的toString 获取[object type]
  var _toString = Object.prototype.toString;
```

toRawType

```js
 // 返回具体的数据类型
  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }
```

isPlainObject

```js
 //判断是否为单纯的Object类型
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }
```

isRegExp

```js
 // 判断是否为正则类型
  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }
```

isValidArrayIndex

```js
// 检查是否为有效的数组下标
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
```

全局 `isFinite()` 函数用来判断被传入的参数值是否为一个有限数值（finite number）。

isPromise

```js
// 检查是否为 Promise 
function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

function isDef(v) {
  return v !== undefined && v !== null
}

const promise = new Promise((resolve, reject) => {})
isPromise(promise) // true
```

toString

```js
// 将值转换为字符串
function toString(val) {
  return val == null ?
    '' :
    Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ?
    JSON.stringify(val, null, 2) :
    String(val)
}

var _toString = Object.prototype.toString;

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

toString([1, 2, 3, 4, 5]) // [
  1,
  2,
  3,
  4,
  5
]
```

toNumber

```js
// 将值转换为数值,如果转换失败则返回值本身
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

toNumber({a: 1}) // { a: 1}
toNumber(1) // 1
```

makeMap

```js
// 创建一个映射,并返回一个检查key是否包含在其中的函数
function makeMap(
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ?
    function (val) {
      return map[val.toLowerCase()];
    } :
    function (val) {
      return map[val];
    }
}

var isBuiltInTag = makeMap('slot,component', true); // [Object: null prototype] { slot: true, component: true }
isBuiltInTag('slot') // true
```

remove

```js
// 删除数组中的元素,并返回包含被删除的元素的数组
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

remove([1, 2, 3, 4], 3) // [3]
```

hasOwn

```js
// 检查对象是否含有该属性
var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

hasOwn({
  a: 1,
  b: 2
}, 'a') // true
```

cached

```js
// 缓存函数
function cached(fn) {
  var cache = Object.create(null); // 创建一个对象,并返回一个匿名函数,形成一个闭包用于存放缓存的函数
  return (function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str)) // 通过或语法短路, 检查是否已缓存,没有的话执行后半句进行缓存
  })
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  })
});

// 通过缓存,检查之前是否处理过该数据,处理过则直接返回缓存的值 否则执行回调
camelize('-d-f-s-f') // cache: {}
camelize('-d-f-s-f-d') // cache: { '-d-f-s-f': 'DFSF' }
```

camelize 连字符转小驼峰

```js
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  })
});
camelize('v-if') // vIf
```

capitalize 首字母转大写

```js
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

capitalize('hello') // Hello
```

hyphenate 小驼峰转连字符

```js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

hyphenate('vIf') // v-if
```

polyfillBind bind 的垫片

```js
/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ?
      l > 1 ?
      fn.apply(ctx, arguments) :
      fn.call(ctx, a) :
      fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind ?
  nativeBind :
  polyfillBind;
```

简单来说就是兼容了老版本浏览器不支持原生的 `bind` 函数。同时兼容写法，对参数的多少做出了判断，使用`call`和`apply`实现，据说参数多适合用 `apply`，少用 `call` 性能更好。

toArray 将类数组转为数组

```js
/*
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

function fn() {
  var arr1 = toArray(arguments);
  console.log(arr1); // [1, 2, 3, 4, 5]
  var arr2 = toArray(arguments, 2);
  console.log(arr2); // [3, 4, 5]
}
fn(1, 2, 3, 4, 5);
```

extend 合并对象

```js
/*
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

const to = {
  a: 1,
  b: 2
}
const _from = {
  c: 3,
  d: 4
}
extend(to, _from) // { a: 1, b: 2, c: 3, d: 4 }
to // { a: 1, b: 2, c: 3, d: 4 }
_from // { c: 3, d: 4 }
```

toObject 合并数组到对象中

```js
/*
 * Merge an Array of Objects into a single Object.
 */
 // 这个函数有个问题就是只会保存数组元素最后一项,并且该元素还必须得可以遍历才行
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

toObject(['你好', '今天', '周六', '你好今天周六']) // { '0': '你', '1': '好', '2': '今', '3': '天', '4': '周', '5': '六' }
```

noop 空函数

```js
/*
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) {}
```

no 返回值为false

```js
/*
 * Always return false.
 */
var no = function (a, b, c) {
  return false;
};
```

identity 返回参数相同的值

```js
/*
 * Return the same value.
 */
var identity = function (_) {
  return _;
};
```

genStaticKeys

把对象数组中的值提取出来,转成字符串

```js
/*
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

genStaticKeys([{staticKeys: 1}, {staticKeys: 2}, {staticKeys: 3}]) // 1,2,3
```

looseEqual 检查宽松相等

因为两个对象是不能完全相等的,所以都是检查值相等

```js
/*
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) { // 检查值全等
    return true
  }
  // 检查是否为引用类型
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) { // 通过检查
    try {
      // 检查是否为数组
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) { // 数组通过
        // 先检查长度 通过再调用every遍历对象 every api 作用是迭代每个元素都返回true every才为true 
        return a.length === b.length && a.every(function (e, i) {
          // 递归执行 如果元素是基本类型 等效于 if(a === b) true 不是的话 继续 递归
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) { // 检查是否为Date 对象
        return a.getTime() === b.getTime() // 转为时间戳进行检查
      } else if (!isArrayA && !isArrayB) { // 检查都不为数组
        // Object.keys 可以把对象的键提取出来用数组存放
        var keysA = Object.keys(a); 
        var keysB = Object.keys(b);
        // 与上面数组检查类似
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]) // 递归检查对象中的值
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) { // 检查都不为引用类型
    return String(a) === String(b) // 转为String 进行值判断
  } else {
    return false
  }
}
```

looseIndexOf 宽松的indexOf

```js
/*
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
 // 遍历然后调用上面的宽松检查
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i
    }
  }
  return -1
}
```

once 确保只执行一次函数

利用闭包存储状态,确保该回调函数只执行一次

```js
/* Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

const fn1 = once(function () {
  console.log('我在');
})
fn1() // 我在
fn1()
fn1()
```

## 参考

- [Vue2.x学习笔记 (zhoubichuan.github.io)](https://zhoubichuan.github.io/web-vue/)
- [vue2工具函数汇总 - 掘金 (juejin.cn)](https://juejin.cn/post/7128674279113097230#heading-0)
- [那些Vue2环境中常用的第三方库，大前端必备! - 掘金 (juejin.cn)](https://juejin.cn/post/7025085812517634062)