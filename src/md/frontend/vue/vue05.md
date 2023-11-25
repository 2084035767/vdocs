#  五、组件

## 5.1 组件基础

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

## 5.2 定义组件

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

## 5.3 组件通信

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

### 父子组件通信

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

### 2.1 sync 修饰符

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



### 兄弟组件通信

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



### 跨级组件通信



## 3.3 组件插槽

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



### 默认插槽 (匿名)

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



### 具名插槽

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



### 作用域插槽

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



## 3.4 动态组件

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

### 组件缓存

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



### keep-alive的生命周期

- 初次进入时：created > mounted > activated；退出后触发 deactivated
- 再次进入：会触发 activated；

事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中

## 3.5 异步组件

在Vue中，异步组件允许你延迟加载组件的代码，从而提高应用程序的性能。当你使用异步组件时，组件的代码只会在需要时才会被加载，而不是在页面加载时就立即加载所有组件的代码。

Vue提供了两种方式来定义异步组件：使用工厂函数和使用动态导入。

### 使用工厂函数

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

### 使用动态导入

另一种定义异步组件的方式是使用动态导入。你可以使用`import()`函数直接在组件的`import`语句中导入组件的定义。

```javascript
Vue.component('async-component', () => import('./AsyncComponent.vue'));
```

这样，当需要渲染`async-component`组件时，Vue会自动异步加载`AsyncComponent.vue`的代码。

无论你使用哪种方式，一旦异步组件被加载，它将被缓存起来，以便在后续的渲染中重复使用，而不会重复加载。

异步组件对于优化应用程序的初始加载时间和减少不必要的网络请求非常有用，特别是当应用程序的某些组件只在特定条件下才会被使用时。
