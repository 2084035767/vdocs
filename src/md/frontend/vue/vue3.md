# Vue3 笔记

## 一、Vue 3 简介

### Vue 3 的特点

### Vue3简介

2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）



#### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ……

#### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ……

#### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

#### 4.新的特性

1. Composition API（组合API）
   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ……
2. 新的内置组件
   - Fragment
   - Teleport
   - Suspense
3. 其他改变
   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ……

### Vue 3 的优势

### Vue 3 的新功能

## 二、安装和配置

### 安装 Vue 3

### 创建一个 Vue 3 项目
### Vue 3 的配置选项

## 三、基本语法和指令

### setup函数

#### 认识setup函数

`setup`，就是我们最近总是是能听到的 Composition API，组合式 API。关于这个 API 的细节，还请参阅[官方文档](https://v3.cn.vuejs.org/guide/composition-api-setup.html#参数)，这里我只期望说一下简单的内容。

`setup` 选项应该是一个接受 `props` 和 `context` 的函数。**此外，我们从 `setup` 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。**

也就是说，`setup` 中创建并 return 的所有东西，都将被得到外部的解析，无论是过去在 `data` 中创建的数据也好，还是在 `methods` 创建的方法也好，都将变成允许被响应式地使用，仿佛 Vue2 中的这些 API 都被融合在一起了一样，而实际上 Vue3 也是为了实现这个目的。

总结:

1. 理解：Vue3.0中一个新的配置项，值为一个函数。

2. setup是所有**Composition API（组合API）**书写的地方。

3. 组件中所用到的：数据、方法等等，均要配置在setup中。

4. setup函数的两种返回值：

   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）

5. 注意点：

   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed…）中**可以访问到**setup中的属性、方法。
      - 但在setup中**不能访问到**Vue2.x配置（data、methos、computed…）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（其实也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

   #### 2.setup的其他用法

   - setup执行的时机
     - 在beforeCreate之前执行一次，this是undefined。
   - setup的参数
     - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
     - context：上下文对象
       - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 `this.$attrs`。
       - slots: 收到的插槽内容, 相当于 `this.$slots`。
       - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

```javascript
 import {
        ref
    } from "vue"
    import demo from "./demo.vue"
    export default {

        //1.setup执行的时机:在beforecreate和created之前执行
        //2.setup和options api对比
        //vue3中仍然可以使用vue2中相关的语法
        //在vue2中可以获取到setup中的数据
        //在setup中不能获取到vue2的数据,没有this,是 undefined
        //如果setup中的方法或者数据和vue2中的方法和数据冲突了,优先使用setup中的数据或者方法
        data() {
            return {
                title01: "我是vue2中data中的数据!!",
                count: 1
            };
        },
        methods: {
            addCount() {
                console.log("methods---count")
                this.count++;
            },
            getVue3Data() {
                console.log(this.title02);
            }
        },
        beforeCreate() {
            //console.log("beforeCreate");
        },
        created() {
            //console.log("created");
        },
        components: {
            demo
        },
        setup(props) {
            //props是一个对象,组件外部传递过来的值,并且这个值是在组件内接受了的
            //console.log("setup!!");

            let title02 = ref("我是setup中的数据!!");
            console.log("this", this)

            function getVue2Date() {
                console.log(this.title01); //undefined
            }
            let count = ref(0);

            function addCount() {
                console.log("setup----count");
                count.value++;
            }

            return {
                title02,
                getVue2Date,
                addCount,
                count,

            }
        }
    }
```

### Vue 3 的模板语法
### Vue 3 的指令
### 响应式数据和计算属性

## 四、组件开发

### 创建组件

### 组件的生命周期钩子
### 组件之间的通信

## 五、路由和导航

### Vue Router 4 的安装和配置
### 路由的基本用法
### 嵌套路由和命名视图

## 六、状态管理

### pinio 的安装和配置

### 状态管理的基本概念
### 在 Vue 3 中使用 pinio

## 七、Vue 3 的高级特性

### Teleport 组件
### Suspense 组件
### Composition API

## 八、优化和性能调优

### Vue 3 的性能优化建议

### 懒加载组件
### 缓存和异步组件

## 九、单元测试和端到端测试

### 单元测试的基本概念
### 使用 Jest 进行单元测试
### 使用 Cypress 进行端到端测试