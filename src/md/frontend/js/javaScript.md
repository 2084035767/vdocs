## JavaScript

### 数组去重

从数组中删除所有重复值，实现方式非常多，我们这里就说最简单的方式，一行代码搞定：

```sql
const uniqueArr = (arr) => [...new Set(arr)];

console.log(uniqueArr(["前端","js","html","js","css","html"]));
// ['前端', 'js', 'html', 'css']
```

`uniqueArr`方法将数据转为Set，然后再解构为数组返回。

### 从url获取参数并转为对象

网页路径经常是：`www.baidu.com?search=js&xxx=kkk`这种形式的，我们是经常需要取参数的，可以使用第三方的`qs`包实现，如果你只是要实现去参数，这一句代码就可以实现，不用再引入`qs`了。

```php
const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
  )

getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1");
// {q: 'js+md', newwindow: '1'}
```

### 检查对象是否为空

检查对象是否为空，实际上并不那么简单，即使对象为空，每次检查对象是否等于 `{}` 也会返回 `false`。

幸运的是，下面的单行代码正是我们想要的。

```typescript
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
isEmpty({}) // true
isEmpty({a:"not empty"}) //false
```

### 反转字符串

反转字符串可以使用`split`结合`reverse`和`join`方法轻松实现。

```perl
const reverse = str => str.split('').reverse().join('');
reverse('this is reverse');
// esrever si siht
```

### 生成随机十六进制

生成随机数相信你能信手拈来，那随机生成十六进制，例如生成十六进制颜色值。

```typescript
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b
```

### 检查当前选项卡是否在后台

浏览器使用选项卡式浏览，任何网页都有可能在后台,此时对用户来说是没有在浏览的, 知道怎么快速检测到，你的网页对用户是隐藏还是可见吗？

```typescript
const isTabActive = () => !document.hidden; 

isTabActive()
// true|false
```

### 检测元素是否处于焦点

`activeElement` 属性返回文档中当前获得焦点的元素。

```typescript
onst elementIsInFocus = (el) => (el === document.activeElement);

elementIsInFocus(anyElement)
// 元素处于焦点返回true，反之返回false
```

### 检查设备类型

使用`navigator.userAgent` 判断是移动设备还是电脑设备：

```typescript
const judgeDeviceType =
      () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

judgeDeviceType()  // PC | Mobile
```

### 文字复制到剪贴板

`Clipboard API` 它的所有操作都是异步的，返回 `Promise` 对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板。

```vbnet
const copyText = async (text) => await navigator.clipboard.writeText(text)
copyText('单行代码 前端世界')
```

### 获取选定的文本

使用内置的 `getSelection` 获取用户选择的文本:

```typescript
const getSelectedText = () => window.getSelection().toString();

getSelectedText();
// 返回选中的内容
```

### 查询某天是否为工作日

我们自己写日历组件时经常会用到，判断某个日期是否为工作日；周一至周五为工作日:

```typescript
const isWeekday = (date) => date.getDay() % 6 !== 0;

isWeekday(new Date(2022, 03, 11))
// true
```

### 转换华氏/摄氏

处理温度有时会晕头转向。这两个函数则能帮助大家将华氏温度转换为摄氏温度，以及将摄氏温度转换为华氏温度。

- 将华氏温度转换为摄氏温度

```typescript
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

fahrenheitToCelsius(50);
// 10
```

- 将摄氏温度转华氏温度

```typescript
const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32;

celsiusToFahrenheit(100)
// 212
```

### 两日期之间相差的天数

日常开发中经常遇到需要显示剩余天数， 一般我们就需要计算两日期之间相差天数：

```typescript
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

dayDiff(new Date("2021-10-21"), new Date("2022-02-12"))
// Result: 114
```

### 将 RGB 转换为十六进制

```typescript
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255); 
//  #ffffff
```

### 计算数组平均值

计算平均值的方式很多，计算的逻辑都是一样的， 但是实现方式各不相同，一行代码简单实现：

```typescript
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
average([1,9,18,36]) //16
```

### JavaScript

**对象深度克隆**

```kotlin
Object.prototype.clone = function () {
    var newObj = {};
    for (var i in this) {
        console.log("i = " + i)
        if (typeof(this[i]) == 'object'|| typeof(this[i]) == 'function') {
            newObj[i] = this[i].clone()
        } else {
            newObj[i] = this[i]
        }
    }
    return newObj
}
```

**简单的克隆：**

方法一

```ini
obj = eval(uneval(o));
```

方法二(系列化对象)

```ini
obj= JSON.parse(JSON.stringify(o));
```

**数组深度克隆**

```kotlin
Array.prototype.clone = function () {
    var newArray = []
    for (var i = 0; i < this.length; i++) {
        if (typeof(this[i]) == 'object' || typeof(this[i]) == 'function') {
            newArray[i] = this[i].clone()
        } else {
            newArray[i] = this[i]
        }
    }
    return newArray
}
```

**函数深度克隆**

```javascript
Function.prototype.clone = function () {
    var that = this;
    var newFunc = function () {
        return that.apply(this, arguments);
    };
    for (var o in this) {
        newFunc[o] = this[o];
    }
    return newFunc;
}
```

**防抖（Debouncing/Debounce）**

debounce 的关注点是空闲的间隔时间,强制函数在某段时间内只执行一次。

空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行

```javascript
function debounce(fn,delay){
    var timer;
    return function(){
        var context = this;
        var args = arguments;
        timer&&clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context,args);
        },delay);
    }
}
```

**节流（Throttling/Throttle）**

throttle 的关注点是连续的执行间隔时间,强制函数以固定的速率执行。

频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay

```javascript
function throttle(fn, threshhold){
    var last;
    var timer;
    threshhold || (threshhold = 250);
    return function(){
        var context = this;
        var args = arguments;
        var now = + new Date();
        if(last && now < last + threshhold){
            timer&&clearTimeout(timer);
            timer = setTimeout(function(){
                last = now;
                fn.apply(context, args);
            },threshhold);
        }else{
            last = now;
            fn.apply(context,args);
        }
    }
}
```

#### 焦点不在当前窗口时改变标题展开目录

```javascript
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = '焦点不在当前窗口';
  } else {
    document.title = '焦点在当前窗口';
  }
});
```

#### 解除离开页面检测展开目录

```javascript
document.hasFocus = function () {
  return true;
};
```



#### 使网页内容（body）可编辑展开目录

**开启**

```javascript
document.body.contentEditable = 'true';
document.designMode = 'on';
(function () {
  let items = document.querySelectorAll('iframe');
  for (let i = 0; i < items.length; i++) {
    try {
      items[i].contentDocument.body.contentEditable = 'true';
      items[i].contentDocument.designMode = 'on';
    } catch (err) {
      console.log(err);
    }
  }
})();
```

**关闭**

```javascript
document.body.contentEditable = 'false';
document.designMode = 'off';
(function () {
  let items = document.querySelectorAll('iframe');
  for (let i = 0; i < items.length; i++) {
    try {
      items[i].contentDocument.body.contentEditable = 'false';
      items[i].contentDocument.designMode = 'off';
    } catch (err) {
      console.log(err);
    }
  }
})();
```

#### 查找元素的 Vue 对象展开目录

```javascript
/**
 * @typedef  {object} FunctionResult
 * @property {boolean}     state   是否查找成功
 * @property {HTMLElement} element Vue 对象所在的元素
 * @property {object}      data    找到的 Vue 对象
 * @property {object[]}    parents 父 Vue 对象
 */

/**
 * @description 查找元素的 Vue 对象
 * @param   {HTMLElement} el 需要查找的元素
 * @returns {FunctionResult} 返回查找结果信息
 */
function findElementVue(el) {

  /** @type {FunctionResult} */
  const result = {
    state: false,
    element: null,
    data: null,
    parents: [],
  };

  const attrName = '__vue__';

  // 查找属性
  while (el) {
    const data = el[attrName];
    if (data) {
      result.state = true;
      result.element = el;
      result.data = data;
      break;
    } else {
      el = el.parentElement;
    }
  }

  // 查找父对象
  if (result.state) {
    let attrName = '$parent';
    let parent = result.data[attrName];

    while (parent) {
      result.parents.push(parent);
      parent = parent[attrName];
    }
  }

  return result;

}
```



#### 查找字符 `char` 在 `str` 中第 `num` 次出现的位置展开目录

```javascript
function findChar(str = '', char = '', num = 1) {
  var index = str.indexOf(char);
  num = num - 1;
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      index = str.indexOf(char, index + 1);
    }
  }
  return index;
}
```



#### 格式化时间展开目录

```javascript
/**
  * @description 格式化时间
  * @param   {(number|string|Date)} [time] 要格式化的时间（默认当前）
  * @param   {string} [format] 需要的格式（默认 yyyy-mm-dd hh:ii:ss）
  * @returns {string} 格式化后的时间
  */
function formatTime(time = new Date(), format = 'yyyy-mm-dd hh:ii:ss') {

  let timeType = typeof time;

  /** @type {Date} */
  let dateObj = null;

  if (timeType == 'number' || timeType == 'string') {
    dateObj = new Date(time);
  } else if (timeType == 'object') {
    dateObj = time;
  }

  // 时间信息
  let timeInfo = {
    // 年月日
    y: dateObj.getFullYear(),
    m: dateObj.getMonth() + 1,
    d: dateObj.getDate(),
    // 时分秒
    h: dateObj.getHours(),
    i: dateObj.getMinutes(),
    s: dateObj.getSeconds(),
  };

  // 格式占位符正则
  let formatReg = {
    y: /y+/g,
    m: /m+/g,
    d: /d+/g,
    h: /h+/g,
    i: /i+/g,
    s: /s+/g,
  };

  for (let key in formatReg) {

    // 正则匹配
    let matched = format.match(formatReg[key]);

    // 获取对应的时间
    let timeValue = String(timeInfo[key]);

    // 无匹配结果
    if (!matched) {
      continue;
    }

    // 根据匹配结果（位数）进行替换
    matched.forEach(function (v) {
      let tLength = timeValue.length;
      let vLength = v.length;
      // 长度不足，补零
      if (tLength < vLength) {
        timeValue = timeValue.padStart(v.length, '0');
      }
      // 长度超出，截取
      // if (tLength > vLength) {
      //   timeValue = timeValue.substring(tLength - vLength);
      // }
      // 替换对应的值
      format = format.replace(v, timeValue);
    });

  }

  return format;

}
```



#### 获取随机的十六进制色展开目录

```javascript
/** 获取随机的十六进制色 */
function getHEXColor() {
  var codes = [
    '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
  ];
  var colors = ['#'];
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 16);
    colors.push(codes[index]);
  }
  return colors.join('');
}
```



#### 获取元素的边界信息展开目录

```javascript
/**
 * @description 获取元素的边界信息（当前元素必须在父元素内）
 * @param {Element} curr   当前 DOM 元素
 * @param {Element} parent 父 DOM 元素
 */
function getBoundaryInfo(curr, parent) {

  if (!curr || !parent) {
    console.error('获取失败，缺少参数！');
    return null;
  }

  var result = {};
  var currRect = curr.getBoundingClientRect();
  var parentRect = parent.getBoundingClientRect();

  // 当前元素四角坐标和宽高
  result.curr = {
    x0: currRect.left,
    x1: currRect.right,
    y0: currRect.top,
    y1: currRect.bottom,
    w: currRect.width,
    h: currRect.height,
  };

  // 父元素四角坐标
  result.parent = {
    x0: parentRect.left,
    x1: parentRect.right,
    y0: parentRect.top,
    y1: parentRect.bottom,
    w: parentRect.width,
    h: parentRect.height,
  };

  // 距离
  result.distance = {
    top: result.curr.y0 - result.parent.y0,
    bottom: result.parent.y1 - result.curr.y1,
    left: result.curr.x0 - result.parent.x0,
    right: result.parent.x1 - result.curr.x1,
  };

  return result;

}
```



#### 获取元素的坐标信息展开目录

```javascript
/**
 * @description 获取元素的坐标信息（四个角以及宽高）
 * @param {Element} element DOM 元素
 */
function getElemPosInfo(element) {
  if (!element) {
    console.error('获取失败，缺少参数！');
    return null;
  }
  let rect = element.getBoundingClientRect();
  let data = {
    x0: rect.left,
    x1: rect.right,
    y0: rect.top,
    y1: rect.bottom,
    w: rect.width,
    h: rect.height,
  };
  return data;
}
```



#### 获取月份第一天和最后一天的时间戳展开目录

```javascript
/**
 * @description 获取月份第一天和最后一天的时间戳
 * @param {number} year 年份
 * @param {number} month 月份
 * @returns `{ start: 第一天, end: 最后一天 }`
 */
function getTimestampOfMonth(year, month) {
  var start = new Date(year, month - 1, 1)
  var end = new Date(year, month, 0);
  var time = {
    start: start.getTime(),
    end: end.getTime()
  };
  return time;
}
```



#### 获取坐标下方的元素展开目录

```javascript
/**
 * @description 获取坐标下方的元素（从子元素到父元素）
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
function elemsFromPoint(x, y) {

  if (x === undefined || y === undefined) {
    return [];
  }

  x = Math.floor(x);
  y = Math.floor(y);

  let item = document.elementFromPoint(x, y);
  let items = [];

  if (item) {
    items.push(item);
  } else {
    return [];
  }

  while (item.parentElement) {
    item = item.parentElement;
    items.push(item);
  }

  return items;

};
```



#### 计算字符串的字符数展开目录

```javascript
/**
 * @description 计算字符串的字符数（数字英文字母 +1，其他 +3）
 * @param   {string} str 被检测的字符串
 * @returns {number} 字符数
 */
function calcChars(str) {
  var reg = /[0-9a-zA-Z]/;
  var sum = 0;
  for (let i in str) {
    if (reg.test(str.charAt(i))) {
      sum += 1;
    } else {
      sum += 3;
    }
  }
  return sum;
}
```



#### 加减法精度展开目录

```javascript
/**
 * @description 加减法精度
 * @param   {string} type 类型（plus、sub）
 * @param   {number} [num1] 数值1，默认为 0
 * @param   {number} [num2] 数值2，默认为 0
 * @returns {(number|null)} 返回两个数值相加或相减后的结果
 */
function accPlusAndSub(type, num1 = 0, num2 = 0) {

  var decimalsNum1 = (String(num1).split('.')[1] || '').length;
  var decimalsNum2 = (String(num2).split('.')[1] || '').length;
  var decimalsMax = Math.max(decimalsNum1, decimalsNum2);
  var multiplies = Math.pow(10, decimalsMax);

  if (type === 'plus') {
    return ((num1 * multiplies + num2 * multiplies) / multiplies);
  } else if (type === 'sub') {
    return ((num1 * multiplies - num2 * multiplies) / multiplies);
  } else {
    return null;
  }

}
```



#### 检测用户是否离开页面展开目录

```javascript
/**
 * @description 检测用户是否离开页面（一秒检测一次）
 * @param {object}   [options] 配置选项
 * @param {function} [options.onblur]    用户离开页面时的回调函数
 * @param {function} [options.onfocus]   用户返回页面时的回调函数
 * @param {string}   [options.blurDelay] 设定用户离开页面多久后才调用 onblur
 * - 单位为秒
 * - 默认 0
 * @param {string}   [options.timerName] 定时器名称
 * - 用于 setInterval()
 * - 默认 tCheckPageBlur
 */
function checkPageBlur(options) {

  var config = {
    onblur: null,
    onfocus: null,
    blurDelay: 0,
    timerName: 'tCheckPageBlur',
  };

  Object.assign(config, options);

  var timerName = config.timerName; // 定时器名称
  var checkDelay = 0;               // 延时
  var blurTriggered = false;        // 标记状态

  clearInterval(window[timerName]);
  window[timerName] = setInterval(function () {
    var isFocus = document.hasFocus();

    if (isFocus && blurTriggered) {
      // 在页面且触发过 blur
      blurTriggered = false;
      checkDelay = 0;
      try {
        config.onfocus && (config.onfocus());
      } catch (err) {
        console.error('[检测] 回调函数 onfocus 出错\n', err);
      }
    } else if (!isFocus && !blurTriggered) {
      // 不在页面且未触发 blur
      if (checkDelay >= config.blurDelay) {
        blurTriggered = true;
        checkDelay = 0;
        try {
          config.onblur && (config.onblur());
        } catch (err) {
          console.error('[检测] 回调函数 onblur 出错\n', err);
        }
      } else {
        checkDelay += 1;
      }
    }
  }, 1000);

}

// 调用
checkPageBlur({
  onblur: function () {
    console.log('[检测] 用户离开页面');
  },
  onfocus: function () {
    console.log('[检测] 用户返回页面');
  },
});
```



#### 解析 URL 地址的参数（?=...）为一个对象展开目录

```javascript
function queriesToObj(url = '') {
  var split = url.split('?')[1];
  var arr = split.split('&');
  var obj = {};

  arr.forEach(function (item) {
    var kv = item.split('=');
    obj[kv[0]] = kv[1];
  });

  return obj;
}
```



#### 矩形碰撞检测展开目录

```javascript
/**
 * @description 矩形碰撞检测
 * @param   {Element} elemA        当前元素
 * @param   {Element} elemB        目标元素
 * @param   {boolean} [checkAside] 是否包含边缘碰撞，默认包含
 * @returns {object} `{ error: 是否检测失败, hit: 是否碰撞 }`
 */
function rectColisionCheck(elemA, elemB, checkAside = true) {
  const result = {
    error: false,
    hit: false,
  };

  if (!(elemA && elemB)) {
    console.error('缺少参数');
    result.error = true;
    return result;
  }

  const rectA = elemA.getBoundingClientRect();
  const rectB = elemB.getBoundingClientRect();

  if (checkAside) {
    result.hit = !(
      rectA.bottom < rectB.top ||
      rectA.left > rectB.right ||
      rectA.top > rectB.bottom ||
      rectA.right < rectB.left
    );
  } else {
    result.hit = !(
      rectA.bottom <= rectB.top ||
      rectA.left >= rectB.right ||
      rectA.top >= rectB.bottom ||
      rectA.right <= rectB.left
    );
  }

  return result;
}
```



#### 设置事件对象属性展开目录

```javascript
/**
 * @description 设置事件对象属性
 * @param {Eveny}  ev 事件对象
 * @param {object} props 要设置的属性
 */
function setEvProps(ev, props = {}) {
  if (ev) {
    for (let key in props) {
      Object.defineProperty(ev, key, {
        configurable: true,
        enumerable: true,
        get: function () {
          return props[key];
        },
      });
    }
  }
}
```



#### 通过点路径访问对象属性展开目录

```javascript
/**
 * @description 通过点路径访问对象属性
 * @param {object} obj
 * @param {string} path
 */
function getObjValue(obj, path = '') {

  if (typeof obj !== 'object') {
    console.error('访问失败，参数 obj 错误！');
    return;
  }

  if (typeof path !== 'string') {
    console.error('访问失败，参数 path 错误！');
    return;
  }

  if (path === '') {
    return obj;
  }

  return path.split('.').reduce((a, b) => {
    return (a === undefined ? a : a[b]);
  }, obj);

}
```



#### 暂停执行代码一段时间展开目录

```javascript
/**
 * @description 暂停执行代码一段时间
 * @param   {number} [time] 时长（毫秒），默认 1000
 * @returns {Promise} Promise
 */
function sleep(time = 1000) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

await sleep(1000);
```



#### 字符串转文件展开目录

```javascript
/**
 * @description 字符串转文件
 * @param {string} data 字符串数据
 * @param {string} filename 文件名
 * @param {string} filetype 文件类型（MIME）
 */
function strToFile(data = '', filename = 'export.txt', filetype = 'text/plain') {

  // 转为 Blob
  var strToBlob = new Blob([data], { type: filetype });
  // URL 对象兼容性处理
  var urlObject = window.URL || window.webkitURL || window;
  // 创建对象 URL
  var blobURL = urlObject.createObjectURL(strToBlob);
  // 创建 a 元素
  var aElem = document.createElement('a');

  // 设置属性
  aElem.classList.add('hidden');
  aElem.download = filename;
  aElem.href = blobURL;
  aElem.target = '_blank';

  // 添加元素
  document.body.appendChild(aElem);

  // 模拟点击
  aElem.click();

  // 移除元素
  aElem.remove();

  // 释放对象
  urlObject.revokeObjectURL(blobURL);

}
```

## 工具函数

### 防抖与节流

```ts
/**
 * 防抖：仅执行一次
 */
const debounce = <F extends (...args: any[]) => any>(func: F, delay = 300) => {
  let timer: number | null = null;
  const ret = (...args: any) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
  return ret as (...args: Parameters<F>) => void;
};
element.onclick = debounce(myFunc);

/**
 * 节流：限制最小执行间隔
 */
const throttle = <F extends (...args: any[]) => any>(func: F, delay = 300) => {
  let timer: number | null = null;
  const ret = (...args: any) => {
    if (!timer) {
      timer = window.setTimeout(() => {
        func(...args);
        timer = null;
      }, delay);
    }
  };
  return ret as (...args: Parameters<F>) => void;
};
window.onresize = throttle(myFunc);
```

### 柯里化

将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`：

```js
/**
 * @param {Function} func
 * @return {Function}
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}
```

### 扁平化

#### 数组

```js
// 标准递归
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

// 字符串分割
function flatten(arr) {
  return Array.prototype.toString
    .call(arr)
    .split(',')
    .map((val) => Number(val));
}

// 重复扩展直至扁平
function flatten(arr) {
  while (arr.some((val) => Array.isArray(val))) {
    arr = [...arr];
  }
  return arr;
}
```

#### 对象

输入：

```js
{
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
}
/**
 * @param {Array} input
 * @param {string} name
 * @param {Object} res
 */
function _flatten(input, name, res) {
  for (let key of Object.keys(input)) {
    let baseName = name;
    const val = input[key];
    if (val === null || val === undefined) {
      continue;
    }
    if (/^[0-9]/.exec(`${key}`)) {
      baseName += `[${key}]`;
    } else if (baseName === '') {
      baseName += `${key}`;
    } else {
      baseName += `.${key}`;
    }
    if (typeof val === 'object') {
      _flatten(val, baseName, res);
    } else {
      res[baseName] = val;
    }
  }
}
/**
 * @param {Array} input
 * @return {Object}
 */
function flatten(input) {
  const res = {};
  _flatten(input, '', res);
  return res;
}
```

### 去重

```js
Array.prototype.unique = function () {
  const arr = this;
  return arr.filter((val, idx) => arr.indexOf(val) === idx);
};
```

### 深拷贝

```js
// 可以通过 WeakMap 解决循环引用问题，同时保证内存被回收
const map = new WeakMap();
function cloneDeep(src) {
  if (src && typeof src === 'object') {
    if (map.has(src)) {
      return map.get(src);
    } else {
      map.set(src, src);
    }
    const ret = Array.isArray(src) ? [] : {};
    for (let key of Object.keys(src)) {
      ret[key] = cloneDeep(src[key]);
    }
    return ret;
  } else {
    return src;
  }
}
```

## Promise

### Promise 构造函数

Promises/A+ 标准中仅指定了 Promise 对象的 then 方法的行为，其它一切我们常见的方法、函数都并没有指定。

```js
class Promise {
  constructor(func) {
    // 初始化状态
    const self = this;
    this.status = 'pending';
    this.data = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // API 函数
    function resolve(value) {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        self.onResolvedCallbacks.forEach((func) => {
          func();
        });
      }
    }
    function reject(reason) {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        self.onRejectedCallbacks.forEach((func) => {
          func();
        });
      }
    }

    // 执行同步构造器
    try {
      func(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolved, onRejected) {
    // 检查参数
    if (typeof onResolved !== 'function') {
      onResolved = function () {};
    }
    if (typeof onRejected !== 'function') {
      onRejected = function () {};
    }

    // resolve 或 reject 则执行对应回调
    if (this.status === 'resolved') {
      return new Promise((resolve, reject) => {
        try {
          resolve(onResolved(this.data));
        } catch (e) {
          reject(e);
        }
      });
    }
    if (this.status === 'rejected') {
      return new Promise((resolve, reject) => {
        try {
          resolve(onRejected(this.data));
        } catch (e) {
          reject(e);
        }
      });
    }

    // pending 状态则等待 pending 完成
    if (this.status === 'pending') {
      return new Promise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          try {
            resolve(onResolved(this.data));
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            resolve(onRejected(this.data));
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }
}
```

### Polyfill `Promise.all()`

```js
/**
 * @param {Array} arr
 * @return {Promise<any[]>}
 */
function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    let pending = arr.length;
    const results = new Array(arr.length);

    arr.forEach((p, idx) => {
      p.then(
        (res) => {
          results[idx] = res;
          if (--pending === 0) {
            resolve(results);
          }
        },
        (e) => reject(e)
      );
    });
  });
}
```

### Promise 并发限制

```js
/**
 * @param {number} limit
 * @param {Array} arr
 * @param {Function} fetch
 * @return {Promise<any[]>}
 */
async function asyncPool(limit, arr, fetch) {
  const pending = [];
  const results = [];
  let index = 0; // 入池用下标

  // 入池一个
  async function push() {
    // 若已经全部进入池子则等待全部完成
    if (index >= arr.length) {
      return;
    }

    // 获得一个 Promise
    const p = fetch(arr[index]);
    pending.push(p);
    results.push(p);
    // Promise 完成后在 pending 中删除
    p.then(() => pending.splice(pending.indexOf(p), 1));

    if (pending.length >= limit) {
      await Promise.race(pending);
    }
    index++;
    await push();
  }

  await push();
  return await Promise.all(results);
}
```

## 原生 API

### `bind()`

```js
Function.prototype.bind = function (...args) {
  const func = this; // 需要绑定的函数
  const ctx = args[0]; // 绑定的 this
  const params = args.slice(1); // bind 时传入的参数
  return (...args) => func.apply(ctx, [...params, ...args]);
};
```

### `instanceof`

```js
function instanceOf(inst, func) {
  let proto = Object.getPrototypeOf(inst);
  while (true) {
    if (!proto) {
      return false;
    }
    if (proto === func.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
```



## 语言特性

### Iterable 对象

```js
const object = {
  a: 1,
  b: 2,
  c: 3,
  // 本质是一个 Generator 函数
  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield this[key];
    }
  },
};
console.log(...object); // 1 2 3
object.d = 4;
console.log(...object); // 1 2 3 4
```

### LazyMan (事件循环)

```js
new LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

class LazyMan {
  constructor(name) {
    this.taskList = [];
    console.log(`Hi I am ${name}`);
    // 等待第一次事件循环
    // 即 tasklist 初始化完成
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const func = this.taskList.shift();
    func && func();
  }

  eat(food) {
    const func = () => {
      console.log(`I am eating ${food}`);
      this.next();
    };
    this.taskList.push(func);
    return this;
  }

  sleepFirst(time) {
    const func = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    };
    this.taskList.unshift(func);
    return this;
  }

  sleep(time) {
    const func = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    };
    this.taskList.push(func);
    return this;
  }
}
```



## 获取当前日期的前后日期

```
/**
 * getAfterDateStr 获取当前日期 的 前后日期
 * @param {number} i 正数为之后的日期 负数为之前的日期 0（不传）为当前日期
 */
export function getAfterDateStr(i = 0) {
	let date = new Date();
	const curDateAfter = date.setDate(date.getDate() + i);
	date = new Date(curDateAfter);

	const	year = date.getFullYear();
	const	month = date.getMonth() + 1;
	const	day = date.getDate();
	return `${year}-${(month < 10 ? '0' + (month) : month)}-${(day < 10 ? '0' + day : day)}`;
}
```

## js 中去除字符串中所有HTML标签

适用场景：对于获取了一大堆字符串又不想要里面的 html 标签

```
const chars = '<p align="center"><br></p><p align="center"></p><p align="center"></p><p><b>产品特点</b></p><p>主要用于基坑内支撑，采矿支柱及其他支撑设备的内力监测。</p><p><b> </b></p><p><b>技术参数</b></p><table border="1" cellspacing="0" cellpadding="0" align="left" width="423"><tbody><tr><td width="168">'

// 截取html标签,截取空格等特殊标签
const detail = chars.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"").substring(0, 55);

// 产品特点主要用于基坑内支撑，采矿支柱及其他支撑设备的内力监测...
console.log(detail);
```

## 过滤掉数组里的重复值

ES6 新特性 Set，不过它并不能很好处理非基本类型的数组，以下只针对基本数据类型

```
const chars = [
    'AAA'
    'BBB'
    'AAA'
    'CCC'
    'DDD'
]
const filter = Array.form(new Set(chars)); // chars ['AAA', 'BBB', 'CCC', 'DDD']
const filter2 = [...new Set(chars)] // chars ['AAA', 'BBB', 'CCC', 'DDD']
```

箭头函数与普通函数对比

```
return this.allLinesXY.filter((item) => item.itemIndex === 0);

return this.allLinesXY.filter(function test(item) {
	return item.itemIndex === 0;
});
```
