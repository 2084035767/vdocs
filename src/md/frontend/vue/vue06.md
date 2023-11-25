# 六、进阶主题

## 6.1 Vue Devtools



## 6.2 生命周期钩子函数

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

## 6.3 组件扩展

有3种方式完成组件扩展

- Mixin
- HOC
- Renderless组件

### Mixin

缺陷

- 打破原有组件的封装，找个方法可能要全局搜索，可能忘记了在什么地方
- 增加组件复杂度
- 可能会出现命名冲突的问题
- 仅仅只是对逻辑的复用，模版不能复用

###  HOC （higher order component）高阶组件

函数接受一个组件作为参数，并返回一个新组件，可复用的逻辑在函数中实现

相比Mixin的优点

- 模版可复用
- 不会出现命名冲突（本质上是一个HOC是套了一层父组件） 不足
- 组件复杂度高，多层嵌套，调试会很痛苦

### RenderLess组件（推荐使用）

- 复用的逻辑沉淀在包含slot插槽的组件
- 接口由插槽Prop来暴露

**优点**

- 模版可复用
- 不会出现命名冲突
- 符合依赖倒置原则
- 复用的接口来源清晰



## 6.4 过渡与动画

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

### animation 实现

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

## 命名动画

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

### 使用动画插件

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
