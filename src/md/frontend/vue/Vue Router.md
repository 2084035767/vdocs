# Vue Router



## 路由简介

### 什么是路由

简单来说路由就是浏览器地址栏的URL地址，设置路由就是配置每一个地址对应的页面。

URL = 源（协议 + 主机地址 + 端口号） + 路径 + 参数 + 片段

路由配置的就是URL中的路径。

Vue 在开发时对路由支持的不足，于是官方补充了 vue-router 插件。Vue 的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。

*为什么我们不能像原来一样直接用 a 标签编写链接呢？因为我们一般用 Vue 做的都是单页应用，只有一个主页面 index.html，所以你写的 a 标签是不起作用的，要使用 vue-router 来进行管理。*

**后端路由**

当用户访问一个URL时，对应的服务器会接收这个请求，然后解析URL中的路径，找到设置的URL对应的资源，返回数据（html、css、js等）。大家前面做的Node服务应该已经体会到了。

**前端路由**

前端利用hash或者HTML5的history API来模拟实现不同路由对内容的切换展示，利用ajax来实现服务器资源的更新。

> Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。我们用vue-cli开发的项目就是单页面应用。

**vue-router实现的功能**

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为



在vue项目中使用

（1）安装 vue-router 插件

```shell
npm i vue-router@3
```

> 注意：Vue2中路由使用的是 vue-router 3版本，Vue3中路由使用的是 vue-router4版本。
>
> npm 默认下载包的最新版本，所以需要手动指定插件的版本号。

（2）配置路由文件

在项目的 src 文件夹内新建 router/index.js 文件，然后填写如下代码：

```js
// 导入Vue
import Vue from 'vue'

// 1. 引入 vue-router
import VueRouter from 'vue-router'

// 2. 全局注册
Vue.use(VueRouter)

// 3. 引入路由模板组件
// 导入HomeView组件
import HomeView from '../views/HomeView.vue'
// 导入about组件
import About from '../views/AboutView.vue'


// 4. 配置路由表
const routes = [
    {
        // 指定当前的组件的对应的路径，最好是见名知意
        path: '/', 
        // 路由名字，在路径复杂时可考虑name属性替代
        name: 'Home',
        // 当前路由对应的组件
        component: HomeView 
    },
    {
        path: '/about',
        name: 'about',
        // 路由懒加载
        component: ()=>import ('../views/AboutView.vue')
    }
]

// 5. 创建路由实例
const router = new VueRouter({
    // routes:routes
    // 符合解构赋值，只写一个即可
    routes
})

// 6. 导出路由实例
export default router
```

（3）将路由文件与 vue 实例关联起来，在 main.js 中绑定路由实例

```js
// ...
// /index.js 可以省略
import router from './router'

// ...
new Vue({
    // router 属性是用来挂载路由实例的
    router,
    render: h => h(App)
}).$mount('#app')
```

（4）页面内使用路由

```html
<!-- APP.vue -->
<template>
    <!-- router-link 相当于切换路由的按钮，在页面表现为 a 标签，tag可以指定标签名 -->
    <router-link to="/" tag="span">Home</router-link> |
    <router-link to="/about">About</router-link> 

    <!-- 指定路由内容展示的位置 -->
    <router-view></router-view>
</template>
```



路由模式

hash 模式

vue-router 默认使用 hash 模式作为导航跳转，hash 模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `onhashchange` 事件。

hash 路由的特点

- 变化会触发网页跳转，即浏览器的前进和后退。
- 可以改变 `url` ，但是不会触发页面重新加载，不利于 `SEO` 优化。
- 通过 `window.onhashchange` 监听 `hash` 的改变，借此实现无刷新跳转的功能。
- `hash` 永远不会提交到 `server` 端。



history模式

vue-router 通过添加`mode: 'history'`可以修改路由模式，相比于 hash 模式，最直观的是浏览器URL地址没有`#`标识了，更好看。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

原来的路径假如是：`http://yoursite.com/#/user/id`，会变成`http://yoursite.com/user/id`。

history 的特点：

- 新的`url`可以是与当前`url`同源的任意`url`，也可以是与当前`url`一样的地址，但是这样会导致的一个问题是，会把**重复的这一次操作**记录到栈当中。
- 通过`history.state`，添加任意类型的数据到记录中。
- 可以额外设置`title`属性，以便后续使用。
- 通过`pushState`、`replaceState`来实现无刷新跳转的功能。
- 使用`history`模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果`nginx`没有匹配得到当前的`url`，就会出现`404`的页面。因此，在使用`history`模式时，需要**服务端进行404页面的设置。**



两者选择

在实际的项目中，如何对这两者进行选择。**具体如下：**

- `to B` 的系统推荐用 `hash` ，相对简单且容易使用，且因为 `hash` 对 `url` 规范不敏感；
- `to C` 的系统，可以考虑选择 `H5 history` ，但是需**要服务端支持**；
- 能先用简单的，就别用复杂的，**要考虑成本和收益**。



像 vue 这种单页面应用，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，导致出现长时间的白屏，即使做了loading 也是不利于用户体验。

此时可以运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。简单的说就是：进入首页不用一次加载过多资源造成用时过长！！！

路由使用懒加载的时候默认的会把懒加载的路由给他单独打包，这样就节省了 app.js 文件的体积，这样页面首次进入的体积就不会很大，对项目加载耗时有很大的帮助。



路由重定向

开发中我们可能会遇到将某个路径替换为另一个路径的情景，即当用户访问 /a 路径时，替换访问 /b 路径，然后匹配 /b 的路由内容。

例如我们设置访问未设定路由内容的路由时，将其变为访问首页

```js
// router.js

// ...
// 4. 配置路由表
const routes = [
    {
        // 指定当前的组件的对应的路径，最好是见名知意
        path: '/',
        // 当前路由对应的组件
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    // path: B, redirect: A  表示访问B路径，替换为A路径
    // 访问不存在的路径，替换为根路径 /
    // 由于路由表是从上往下匹配的，所以 * 一定写在路由表末尾
    {
        path: '*', // * 表示匹配所有路径
        redirect: '/' // 这里意思就是当上述匹配的路径都不成立时，将其他任意路径替换为访问 /
    }
]
// ...
```





路由别名

vue-router 提供了别名功能，让开发者可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

当出现某个页面是多个路由的模板内容时，我们可以使用路由别名的功能

```js
// router.js

// ...
// 4. 配置路由表
const routes = [
    {
        // 指定当前的组件的对应的路径，最好是见名知意
        path: '/',
        // 当前路由对应的组件
        component: HomeView,
        // alias 起别名   表示另一个路径也是用当前的组件
        // 访问 / 和 /home 都会展示 HomeView 组件
        // alias: '/home'

        // 多个别名使用数组形式展示
        alias: ['/home', '/index', '/index.html']
    }
    ...
]
// ...
```





嵌套路由

实际开发中的应用界面，通常由多层嵌套的组件组合而成。一个路由页面可以包含另一些路由页面，这就是嵌套路由。

（1）在路由表中配置子路由表

```js
// router.js

// ...
var routes = [
    {
        path: '/test',
        component: Test,
        // 通过 children 添加当前路由的子路由，所用的配置项与 routes 表一致
        children: [
            {
                // 注意，子路由路径中需要包含父路由
                path:'/test/child1',
                component: TestChild1
            },
            {
                // 注意，子路由路径中需要包含父路由
                path:'/test/child2',
                component: TestChild2
            },
        ]
    }
]
// ...
```

（2）在父路由组件中添加子路由的跳转项

```html
<template>
    <div>
        <h3>Test页面</h3>

        <!-- 子路由的跳转链接 -->
        <router-link to="/test/child1">显示child1</router-link>
        <router-link to="/user/child2">显示child2</router-link>

        <!-- 子路由的占位符 -->
        <router-view></router-view>
    </div>
</template>
```





命名式路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

简单的理解就是给路由起个名称

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      // 命名式路由  名字是唯一的，不能和其他路由的名字重复
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```javascript
<router-link :to="{ name: 'user' }">User</router-link>
```



路由传参

开发者可以通过类似GET请求的方式在路由里添加参数，然后通过 vue-router 提供的路由对象获取传递的参数。

```js
// router.js

// ...
var routes = [
    {
        path: '/movie',
        component: () => import('@/views/MoviePage.vue'),
    },
    {
        path: '/movieDetail',
        component: () => import('@/views/MovieDetail.vue')
    }
]
// ...
```

电影页面

```vue
// MoviePage.vue
<template>
    <router-link to="/movieDetail?id=123456">点击跳转到电影详情页</router-link>
</template>
```

电影详情页面

```vue
// MovieDetail.vue
<template>
    <div>接收参数 --- id --- {{ id }}</div>
</template>
<script>
export default {
    name: 'movieDetail',
    data(){
        return { id: 0 }
    },
    mounted(){
        console.log('包含路由信息的对象', this.$route);
        // query 指GET发送的参数集合对象
        this.id = this.$route.query.id
    }
}
</script>
```



动态路由

开发时会出现将某种模式匹配到的所有路由，全都映射到同个组件的场景，这时候就需要使用动态路由。

模式匹配常见于一些详情页面，例如，大家之前写过的虫虫电影项目，我们点击不同电影进入电影详情页面，这个页面的HTML结构与样式一样，不同的是展示的数据不同，那么在配置路由时如何体现呢？没错，利用模式匹配。

**（1）配置动态路由**

```javascript
{
    // 动态路由写法 ->  /路径/:变化的值
    path : "/movie/:id",
    name : "movie" ,
    component: MovieView
}
```

**（2）页面路由跳转链接后直接跟上对应 id**

```html
<router-link to="/movie/1726668">跳转到电影详情页</router-link>
<router-link to="/movie/1998765">跳转到电影详情页</router-link>
<!-- params 用于指定动态路由的参数 -->
<router-link :to="{name:'movie', params:{ id:1687463 }}">跳转到mine页</router-link>
```

> 注意：在 to 使用对象形式时，path 和 params 无法共存，只能选用 name + params 的形式

**（3）页面内接收动态路由的值**
我们可以借助组件实例的`$route`对象的`params`属性来获取

```js
export default {
    name: 'movie',
    mounted(){
        console.log(this.$router.params.id);
        // 可以根据这个id发出ajax请求获取对应的数据，在页面展示
    }
}
```



编程式路由

页面的路由切换方式除了使用`router-link`标签，我们还可以用 vue 实例提供的方法。使用方法的方式就是编程式。

方法介绍：
每个页面都可以使用 `this.$router` 访问 vue-router 实例，使用它的方法

| 属性    | 描述         | 使用                                               |
| :------ | :----------- | :------------------------------------------------- |
| push    | 跳转         | `this.$router.push({ name, path, query, params })` |
| replace | 替换当前路由 | 与 `push` 一致，只不过效果没有留存历史记录         |
| forward | 前进一页     | 与history中对应方法使用一致                        |
| back    | 后退一页     | 与history中对应方法使用一致                        |
| go      | 前进/后退N页 | 与history中对应方法使用一致                        |

想要导航到不同的 URL，则使用`router.push`方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

实际上我们使用`router-link`标签实现的跳转，本质上就是在调用`router.push`方法。

```javascript
// push 和 replace 方法都可以接收 router-link上to属性值形式的参数
// 相对路径
router.push('home')

// 绝对路径
router.push('/home')

// 对象形式
router.push({ path: 'home' })
router.push({ name: 'user', params: { userId: '123' }})

// 同样遵循 path 和 params 不能共存的特性
let userId = '123'
router.push({ name: 'user', params: { userId }})
router.push({ path: `/user/${userId}` })
```



路由元信息

定义路由的时候可以配置 meta 字段：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录。



例如，根据上面的路由配置，/foo/bar 这个 URL 将会匹配父路由记录以及子路由记录。



一个路由匹配到的所有路由记录会暴露为 `$route` 对象（还有在导航守卫中的路由对象）的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 meta 字段。

下面例子展示在全局导航守卫中检查元字段：

```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```



过渡特效

`router-view`是基本的动态组件，所以我们可以用`transition`组件给它添加一些过渡效果：

```html
<transition>
  <router-view></router-view>
</transition>
```



单个路由的过渡

上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用 并设置不同的 name。

```javascript
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```



基于路由的动态过渡

还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：

```vue
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

接着在父组件内 watch 监听 $route 决定使用哪种过渡：

```javascript
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```



按需缓存组件

在开发中，我们遇到这样的一个常见的的场景，从主页 跳转到 列表页 跳转到 详情页，详情页 返回 列表页 返回 首页。我们希望，从 详情页 返回 列表页 的时候页面的状态是缓存，不用重新请求数据，提升用户体验。从 列表页 返回 主页 的时候页面，注销掉列表页，以在进入不同的列表页的时候，获取最新的数据。

上述的按需加载的场景可以使用之前提到过的`keep-alive`标签实现：

`keep-alive`接收三个参数：

- `include`：可传`字符串、正则表达式、数组`，名称匹配成功的组件(组件名称)会被缓存
- `exclude`：可传`字符串、正则表达式、数组`，名称匹配成功的组件不会被缓存
- `max`：可传`数字`，限制缓存组件的最大数量

`include`和`exclude`，传`数组`情况居多

直接将路由占位符放进去就行了

```vue
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount">
    <router-view></router-view>
</keep-alive>
```



**动态路由实现**

（1）在`Router`里定义好需要缓存的视图组件

```js
new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./views/keep-alive/index.vue'),
            meta: {
                deepth: 0.5
            }
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./views/keep-alive/list.vue'),
            meta: {
                deepth: 1
                keepAlive: true //需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/keep-alive/detail.vue'),
            meta: {
                deepth: 2
            }
        }
    ]
})
```

（2）写2个`router-view`出口

```php+HTML
<keep-alive :include="include">
    <!-- 需要缓存的视图组件 -->
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<!-- 不需要缓存的视图组件 -->
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

（3）在 app.vue 里监听路由的变化

```js
export default {
  name: "app",
  data: () => ({
    include: []
  }),
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
};
```

 
