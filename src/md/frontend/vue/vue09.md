#  九、生态系统

## Vue Test Utils

## UseVue

## 第三方库和插件

### UI组件库

| 包名           | 作用                                                     |
| :----------------- | :----------------------------------------------------------- |
| element-ui     | 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库 |
| iview          | 一套基于 Vue.js 的高质量UI 组件库                        |
| ant-design-vue | ant-design衍生的vue版本                                  |
| vuetify        | 包含手工制作的精美材料组件                               |
| vant           | 轻量、可靠的移动端 Vue 组件库                            |

### 文件处理

| 包名                     | 作用                                             |
| :--------------------------- | :--------------------------------------------------- |
| @chenfengyuan/vue-qrcode | Vue.js的QR码组件                                 |
| qrcode.vue               | vue版二维码生成组件                              |
| vue-qr                   | Awesome-qr.js的Vue 2.x组件                       |
| vue-qrcode-reader        | 一组用于检测和解码二维码的 Vue.js 组件           |
| vue-clipboard2           | 简单的vue2绑定到剪贴板                           |
| vue-simple-uploader      | 由 simple-uploader.js 提供支持的 Vue.js 上传组件 |

### 富文本

| 包名                 | 作用                                    |
| :----------------------- | :------------------------------------------ |
| @tinymce/tinymce-vue | TinyMCE Vue官方组件，富文本编辑器       |
| mavon-editor         | markdown 文档编辑器                     |
| vue-meditor          | markdown编辑器                          |
| vuep                 | 使用实时编辑器和预览呈现 Vue 组件的组件 |



### 网站交互

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

### 实用工具

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

## 常用工具函数

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