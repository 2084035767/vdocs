# 二、基础知识

## 2.1 Vue 实例

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

## 2.2 响应式数据

## 2.3 模板语法

### 插值表达式 {{}}

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

## 2.4 方法属性

## 2.5 计算属性

### 计算属性的应用

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



### 计算属性的setter

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





## 2.6 侦听器

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



## 2.7 过滤器

> Vue 提供了自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

```js
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

上述代码中`|`就是管道符号，后面跟着的`capitalize`就是过滤器的名字，具体的功能需要我们去定义，定义的方式有全局和局部两种。

### 全局过滤器

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

### 局部过滤器

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

### 串联过滤器

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

### 过滤器参数

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
