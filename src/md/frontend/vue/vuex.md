# vuex笔记

## 一、vuex 概述

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex 是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

这个状态自管理应用包含以下几个部分：

- state - 驱动应用的数据源
- view - 以声明方式将 state 映射到视图；
- action - 响应在 view 上的用户输入导致的状态变化。



使用 vuex 统一管理状态的优点

1. 能够在 vuex 中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

**什么样的数据适合存储到 Vuex 中**

一般情况下，只有组件之间共享的数据，才有必要存储到 vuex 中；对于组件中的私有数据，依旧存储在组件自身的 data 中即可。



## 二、核心属性

| 属性      | 描述                                                         |                |
| --------- | ------------------------------------------------------------ | -------------- |
| state     | 可以理解为一个全局的数据仓库，只要数据存放到 state 之后，任何组件都能访问 state 里面的属性。一般会把组件当中需要被共享的属性存放到 vuex 的 state 当中。 | 相当于data     |
| mutations | 可以理解为全局的方法，任何组件可以调用，需要在 mutations 里面修改 state。 | 相当于methods  |
| getters   | 相当于 state 的计算属性。                                    | 相当于computed |
| actions   | moutation 中不能异步修改 state 中的值，actions 可以。它是异步执行 mutations 里面的方法的函数 |                |
| modules   | 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。 |                |
|           |                                                              |                |



## 三、使用步骤

安装

vue2.x 对应的版本为 vuex3.x，vuex 官网目前是 4.x 版本，所以安装时需要指定版本号



```sh
npm install vuex@3
```



使用

在 src 文件夹下新建 store/index.js 文件

```js
// 导入 vue
import Vue from 'vue';
// 导入 vuex
import Vuex from 'vuex';

// 全局注册
Vue.use(Vuex);

// 创建 Vuex 实例
let store = new Vuex.Store({
    // 全局数据
    state: {
        count: 0
    }
})

// 导出实例
export default store;
```

然后再 main.js 中将 vuex 实例与 vue 实例互相绑定：

```js
// ...
// 导入 vuex 设置
import store from './store';

new Vue({
    render: h => h(app),
    // 将创建的共享数据对象，挂载到 Vue 实例中
    // 所有的组件，就可以直接从 store 中获取全局的数据了
    // store: store
    store
}).$mount('#app')
```

页面使用，如 App.vue 中使用：

```html
<template>
    <div>
    {{ $store.state.count }}
    </div>
</template>
...
```



## 四、属性的基础使用

state

在任意组件中可以通过当前组件实例的`$store`属性获取全局的 vuex 实例对象，然后通过`state`属性就可以获取到具体的数据

```vue
this.$store.state.全局数据名称
```

getters

就是全局的计算属性。

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        // 属性默认参数为 state 对象
        showNum: state => {
            return 'count + 20 = '+ (state.count + 20)
        }
    }
})
```

在组件中可以直接通过`this.$store.getters.showNum`获取，类似于`state`



mutations

```js
const store = new Vuex.Store({
    state: {
        num: 1
    },
    mutations: {
        // 第一个参数，就是 state 对象
        increment(state) {
            state.num++
        },
    }
})
```

在组件中使用：

```vue
<template>
    <p>{{ this.$store.state.num }}</p>
    <button @click="trigger">点击触发mutations方法</button>
</template>
<script>
export default {
    name: 'test',
    methods: {
        trigger(){
            // mutations 通过 $store.commit('触发的函数名', 参数) 触发
            this.$store.commit('increment')
        }
    }
}
</script>
```

> 注意：commit 发送参数时只能传递一个。多个参数可以合并为一个对象或者数组形式。

actions

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            // 如果在这里使用异步，页面内容不会同步修改
            state.count++
        }
    },
    actions: {
        // context 与 store 实例具有相同方法和属性
        asyncIncre (context) {
            // 异步执行触发 mutations 中的方法，注意不在这里直接使用 state 进行修改
            setTimeout(() => {
                context.commit('increment')；
            }, 1000)

        }
    }
})
```

在组件中使用：

```vue
<template>
    <p>{{ this.$store.state.num }}</p>
    <button @click="trigger">点击触发actions方法</button>
</template>
<script>
export default {
    name: 'test',
    methods: {
        trigger(){
            // actions 通过 store.dispatch('方法名', 参数) 触发：
            this.$store.dispatch('asyncIncre')
        }
    }
}
</script>
```



## 五、使用辅助函数

state

在组件中使用它的值时可以借助`mapState`辅助函数，让我们更方便的获取到值

```html
<template>
    <p>{{ age }}</p>
    <p>{{ num }}</p>
    <p>{{ price }}</p>
</template>
<script>
// 需要导入辅助函数
import { mapState } from 'vuex';

export default {
    name: 'test',
    data(){
        return { n: 10 }
    },
    // 在计算属性中注册，就可以直接在页面上使用了
    computed: mapState({
       // 映射获取有三种方法
       // 1. 直接获取数据属性
       age: "count",
       // 2. 普通函数，可以使用 this 代表当前实例
       price(state){
           return state.count + this.n;
       },
       // 3. 箭头函数
       num: state => {
           return state.count;
       },
    })
}
</script>
```

也可以使用下方的简写形式

```js
...
export default {
    name: 'test',
    computed: {
        ...mapState(['count'])
    }
}
```



mapMutations

直接导入后在`methods`中做映射

```html
<template>
    <p>{{ this.$store.state.num }}</p>
    <button @click="trigger">点击触发mutations方法</button>
</template>
<script>
// 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from 'vuex';

export default {
    name: 'test',
    methods: {
        ...mapMutations(['increment'])
    }
}
```



mapActions

用法同`mutations`，直接导入后在`methods`中做映射

```js
<template>
    <p>{{ this.$store.state.num }}</p>
    <button @click="trigger">点击触发mutations方法</button>
</template>
<script>
// 从 vuex 中按需导入 mapActions 函数
import { mapActions } from 'vuex';

export default {
    name: 'test',
    methods: {
        ...mapActions(['asyncIncre'])
    }
}
```



mapGetters

与`state`辅助函数用法类似，直接在`computed`中注册

```js
// 从 vuex 中按需导入 mapGetters 函数
import { mapGetters } from 'vuex';
export default {
    name: 'test',
    computed: {
        ...mapGetters(['showNum'])
    }
}
```



module

使用

（1）在 store 文件夹下新建 `moduleA.js` 和 `moduleB.js` 文件，简单定义内容

```js
// 内容与定义 vuex 的实例接收的参数一致，同样可以写5个属性
const moduleA = {
    state: { num:1 },
    mutations: {
        addNum(state){
            state.num += 2  // 调用的时候执行 this.$store.commit('addNum')
        }
    },
    actions: {
        syncAddNum(context,val){
            context.commit("addNum",val) // 调用的时候执行 this.$store.dispatch('syncAddNum')
        }
    },
    getters: {
        addNums(state){
            return state.num + "元 "  // 调用的时候执行 this.$store.getters.addNums
        }
    }
}

export default moduleA
const moduleB = {
    state: { num:2 },
    mutations: {
        addNum(state){
            state.num += 3
        }
     },
    actions: {  },
}
export default moduleB
```

（2）在 index.js 中声明 vuex 实例时添加模块

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import moduleA from "./modules/moduleA"
import moduleB from "./modules/moduleB"

export default new Vuex.Store({
    // 通过 modules 定义模块
    modules: {
        moduleA,   
        moduleB
    }
})
```

这个时候，store 中已经注入了两个子模块 `moduleA moduleB`，我们可以在组件内通过 `this.$store.state.moduleA.num`这种方式来直接访问模块中的 state 数据。如下修改：

```vue
computed: {
    ...mapState({
        name: state => state.moduleA.num
    }),
```

由此可知，模块内部的 state 是局部的，只属于模块本身所有，所以外部必须通过对应的模块名进行访问。

> 注意：模块内部的 actions、mutations 和 getters 默认可是注册在**全局命名空间**的，这样使得多个模块能够对同一 mutations 或 actions 作出响应。

如果不想要其对所有相同的 mutation 或，应该怎么办呢？

**通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。**

当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

启用命名空间之后获取 getters、mutations、actions 的写法都要变：

```js
const moduleA = {
    // 通过 namespaced 开启命名空间
    namespaced: true,
    ...
}

const moduleB = {
    namespaced: true,
    // ...
}
```

启用命名空间后辅助函数 mapState 的写法

```js
...mapState({
    a1: state => state.b.num,
}),
```

启用命名空间后的 mapGetters 的写法

```js
...mapGetters({
    a2: "b/addNum1"
}),
```

启用命名空间后的 mapMutations 的写法

```js
...mapMutations({ event : "b/addNum" })
```

启用命名空间后的mapActions的写法

```js
...mapActions({ events : "b/syncAddNum" }),
```