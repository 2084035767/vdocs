# 六、进阶知识

## 6.1 CSS3 函数

常用的CSS函数

| 函数                | 描述                                                   |
| ------------------- | ------------------------------------------------------ |
| `calc()`            | 计算属性值的表达式                                     |
| `attr()`            | 返回选择元素的属性值。                                 |
| `var()`             | 使用自定义变量的值                                     |
| `max()`             | 从一个逗号分隔的表达式列表中选择最大的值作为属性的值。 |
| `min()`             | 从一个逗号分隔的表达式列表中选择最小的值作为属性的值。 |
| `rgb()`             | 使用红、绿、蓝值创建颜色                               |
| `rgba()`            | 使用红、绿、蓝和透明度值创建颜色                       |
| `hsl()`             | 使用色调、饱和度和亮度值创建颜色                       |
| `hsla()`            | 使用色调、饱和度、亮度和透明度值创建颜色               |
| `url()`             | 引用外部资源的 URL                                     |
| `minmax()`          | 定义了一个长宽范围的闭区间。                           |
| `linear-gradient()` | 创建线性渐变背景                                       |
| `radial-gradient()` | 创建径向渐变背景                                       |
| `repeat()`          | 定义背景图像的平铺方式                                 |
| `rotate()`          | 旋转元素                                               |
| `counter()`         | 设置计数器。                                           |
| `scale()`           | 缩放元素                                               |
| `translate()`       | 平移元素                                               |
| `transition()`      | 定义元素过渡效果                                       |
| `box-shadow()`      | 添加元素的阴影效果                                     |
| `transform()`       | 一组变换函数，包括旋转、缩放、平移等                   |
| `box-sizing()`      | 定义盒模型的尺寸计算方式                               |



### `var()`函数

`var()`函数用于引用和使用自定义变量的值。它允许您在CSS中定义变量，并在需要的地方引用这些变量的值。

使用`var()`函数可以实现动态的样式和主题切换。



**`var()`函数的使用**

定义变量

在`:root`伪类中定义的变量是全局变量，可以在整个文档中使用。

```css
:root {
  --primary-color: #ff0000;
  --secondary-color: #00ff00;
}
```



引用变量

在需要使用变量值的地方，使用`var()`函数引用变量。

```css
.element {
  color: var(--primary-color);
  background-color: var(--secondary-color);
}
```



变量的继承

子元素可以继承父元素中定义的变量。

```css
.child-element {
  color: var(--primary-color);
}
```



使用默认值

可以在`var()`函数中指定一个默认值。如果变量没有定义，或者变量的值无效，将使用默认值。

```css
.element {
  color: var(--primary-color, #000000);
}
```



**下面的区域以后再来探索吧**

----

## 6.2 CSS3 动画

### 默认值

```css
div {
  animation-name: none;
  animation-duration: 0s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}
```



简写为：

```css
div {
  animation: none 0s ease 0s 1 normal none running;
}
```



### 可选值

#### `animation-name: none`

- `none` 移除动画
- `<keyframes-name>` 自定义的 `@keyframes` 名称

#### `animation-duration: 0s`

- `<time>` 一个动画周期的时长，单位为秒(s)或者毫秒(ms)，无单位值无效

#### `animation-timing-function: ease;`

- `<timingfunction>`，包括:

```text
where
&lt;easing-function> = linear | &lt;cubic-bezier-timing-function> | &lt;step-timing-function>

where
&lt;cubic-bezier-timing-function> = ease | ease-in | ease-out | ease-in-out | cubic-bezier([0,1]>, &lt;number>, [0,1]>, &lt;number>)
&lt;step-timing-function> = step-start | step-end | steps(&lt;integer>[, &lt;step-position>]?)

where
&lt;step-position> = jump-start | jump-end | jump-none | jump-both | start | end
```

#### `animation-delay: 0s;` 动画延迟多久执行

- `<time>` 该值可用单位为秒(s)和毫秒(ms)。如果未设置单位，定义无效。

#### `animation-iteration-count: 1;` 执行动画的次数

- `infinite` 无限次循环执行
- `<number>` 执行多少次

#### `animation-direction: normal;` 动画执行方向

- `normal` 每个动画循环结束，动画重置到起点重新开始，这是默认属性。
- `reverse` 反向运行动画，每周期结束动画由尾到头运行。
- `alternate` 动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，`ease-in` 在反向时成为 `ease-out`。计数取决于开始时是奇数迭代还是偶数迭代
- `alternate-reverse` 反向交替， 反向开始交替

#### `animation-fill-mode: none;`

- `none` 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。
- `forwards` 目标将保留由执行期间遇到的最后一个关键帧计算值。
- `backwards` 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在animation-delay期间保留此值。
- `both` 动画将遵循forwards和backwards的规则，从而在两个方向上扩展动画属性。

#### `animation-play-state: running;`

- `running` 运行动画
- `paused` 暂停动画

## 6.3 CSS3 过渡

## 6.4 CSS3 媒体查询
