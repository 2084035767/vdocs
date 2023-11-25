# 二、基础知识

## 2.1 铺垫知识

### 导入方式

> 优先级：行内样式>内部样式>外部样式（就近原则）

**CSS 语法**

语法格式：（其实就是键值对）

```html
选择器{ 属性名: 属性值; 属性名: 属性值; }
```

**行内样式**

在 HTML5 的标签内使用`style`属性。

```html
<h1 style="color: red;font-size: 12px;">标题</h1>
```



**内嵌样式**

在 HTML5 头部`head`标签内使用`<style>`标签

```html
<!--在HTML头部使用-->
<style>
/* h1是HTML的标签 */
h1{    
        color: red;
        /* CSS代码 */
}
</style>
```

**外链样式**

使用 HTML 的`<link>`标签链接 <Badge text="推荐" type="tip" />

这时，CSS 是写在单独的文件中的，这个文件以 .css 结尾

> 两种引入样式方式的区别：外部样式表中不能写标签，但是可以写 import 语句。

::: tabs#css

@tab link

```html
<!--链接式-->
<link rel="stylesheet" href="style.css" />
```

@tab import

==css2.1 特有==


  ```html
<!--导入式-->
<style>
    @import url("style.css")
</style>
  ```

:::



- `rel`：是说我们引入的是什么样的文件
  - `stylesheet`：定义的样式表
  - `alternate stylesheet`：候选的样式表
- `href`：指定 CSS 文件路径。



### CSS的单位

html中的单位默认只有像素px，所以单位可以省略，但css没有默认单位。所以 **CSS中的单位是必须要写的**。

**绝对单位**

1 `in`=2.54`cm`=25.4`mm`=72`pt`=6`pc`。

**各种单位的含义**

- `in`：英寸Inches (1 英寸 = 2.54 厘米)
- `cm`：厘米Centimeters
- `mm`：毫米Millimeters
- `pt`：点Points，或者叫英镑 (1点 = 1/72英寸)
- `pc`：皮卡Picas (1 皮卡 = 12 点)

**相对单位**

`px`：像素 `em`：印刷单位相当于12个点 

`%`：百分比，相对周围的文字的大小



**空白**

在样式规则中可以随意使用空白，空白只是看不见但同样占用空间。



**注释**

css的注释是`/*...*/`,请记住css没有`//`注释。



**错误**

样式规则如果存在错误，解析器会选择忽略，并不会影响其他样式规则。



**初始样式**

有些标签默认含有内外边距，且不同浏览器大小也不一样。为了统一我们可以重置标签的 CSS 默认样式。



## 2.2 CSS 文本

### 字体属性

| 属性           | 说明             |
| :------------- | :--------------- |
| `color`        | 文本颜色         |
| `font-style`   | 字体样式         |
| `font-weight`  | 字体粗细         |
| `font-size`    | 字体大小         |
| `font-family`  | 字体系列         |
| `font-variant` | 定义小型大写字母 |
| `font`         | 字体简写         |

```css
p{	color: red;
    font-size: 12px;
    font-family: YaHei,SimHei;
    font-style: italic ; /*斜-italic 正-normal */
    font-weight: bolder; /*更粗-bolder 粗-bold 细-lighter 正-normal */
    font-variant: small-caps;/**/
}

/*字体简写*/
/*font: style weight size family;*/
/*字体大小和字体样式不可省略*/
p{   
    font: italic bolder 12px YaHei;
}
```



### 文本属性

| 属性              | 说明         |
| ----------------- | ------------ |
| `color`           | 文本颜色     |
| `letter-spacing`  | 字符间距     |
| `word-spacing`    | 单词间距     |
| `text-decoration` | 文本修饰     |
| `text-align`      | 文本对齐方式 |
| `text-transform`  | 单词大小写   |
| `text-indent`     | 文本缩进     |
| `text-shadow`     | 文本阴影     |
| `vertical-align`  | 垂直对齐方式 |
| `line-height`     | 行高         |
| `writing-mode`    | 文本排版     |

> 提示：文本行高和块的高度一致，可上下居中

```css
p{   
    text-indent：2em;
    line-height: 300px;
    text-align: center; /*左-left 中-center 右-right*/
    text-decoration: underline; 
    /*下划线-underline 中划线-line-through 上划线-overline*/
    writing-mode: horizontal-tb;
    /* 水平自上而下-horizontal-tb 垂直自右而左-vertical-rl 
    垂直内容从上到下，水平从左到右-vertical-lr 
    */
}

/*文本阴影*/
span{
    /*text-shadow: 阴影颜色 水平偏移 垂直偏移 阴影半径;*/
    text-shadow: red 5px 5px 5px;
}   

/*文本图片对齐*/
img,span{  
    vertical-align: middle;
    /*中-middle 基线-baseline 下标s-ub 上标-super*/
}
```

### 列表属性

| 属性                  | 描述                         |
| :-------------------- | :--------------------------- |
| `list-style`          | 简写属性。                   |
| `list-style-image`    | 将图像设置为列表项标志。     |
| `list-style-position` | 设置列表中列表项标志的位置。 |
| `list-style-type`     | 设置列表项标志的类型。       |

```css
ul{
    list-style-image: url('img.png');
    list-style-position: outside;
    /* 文本以内-inside 文本的左侧-outside  */
    list-style-type: disc;
    /*无标记-none 实心圆-disc 空心圆-circle 实心方块-square 数字-decimal*/	。
}

/*简写属性*/
/*list-style: type position image;*/
ul
{
    list-style: disc outside url('img.png');
}
```



## 2.3 CSS 颜色

css常用的颜色类型有三种。

- 关键词
- RGB（十六进制）
- RGBA（0，255，255，1）[a:代表透明度 0-1]



### 关键词颜色

CSS 允许使用关键字表示颜色，CSS2.1 设置了 16 个基本的颜色，CSS 3 又增加了 131 个。

以下是常用颜色的关键词

| 序号 | 颜色 | 英文单词 |
| ---- | ---- | -------- |
| 1    | 白色 | white    |
| 2    | 黑色 | black    |
| 3    | 红色 | red      |
| 4    | 蓝色 | blue     |
| 5    | 绿色 | green    |
| 6    | 黄色 | yellow   |
| 7    | 紫色 | purple   |
| 8    | 粉色 | pink     |
| 9    | 橙色 | orange   |
| 10   | 灰色 | gray     |
| 11   | 青色 | cyan     |
| 12   | 银色 | silver   |
| 13   | 金色 | gold     |
| 14   | 棕色 | brown    |



### RGB颜色

RGB颜色有两种表示形式。

::: tabs#color

@tab RGB

**RGB表示**

RGB表示：`rgb(RGB)`。其中R（红色），G（绿色）、B（蓝色）。每个颜色的数值是 `0-255`。

> 技巧：关键词颜色和RGB表示可以组合使用。

```css
p{
    color: rgb(255,255,255)
}
```

@tab 十六进制

**十六进制表示**

十六进制表示：`＃RRGGBB`。其中RR（红色），GG（绿色）、BB（蓝色）。每个颜色的数值是 `00-FF`。

```css
p{	/* # 号不可省略*/
    color: #3355FF;/*简写 #35F*/
}
```

:::

### RGBA颜色

RGBA颜色：`rgba(r, g, b, a)`（红，绿，蓝，alpha）。 Alpha参数是一个介于0.0（完全透明）和1.0（完全不透明）之间的参数。

用法与RGB表示一致。（RGBA颜色也有十六进制类似的表示方法，但不常用）



## 2.4 CSS 背景

### 背景属性

| 属性                    | 说明                             |
| ----------------------- | -------------------------------- |
| `background-color`      | 背景颜色                         |
| `background-image`      | 背景图像                         |
| `background-repeat`     | 背景图像是否及如何重复。         |
| `background-attachment` | 背景图片是否跟着滚动条一起移动。 |
| `background-position`   | 背景图像的起始位置。             |
| `background-origin  `   | 控制背景的显示位置               |
| `background-clip`       | 背景裁切                         |
| `background-size`       | 调整背景尺寸                     |
| `background`            | 背景简写                         |

```css
body{
    background-color: red;
    background-image: url(img.jpg);
    background-repeat: no-repeat;
    /*不平铺-no-repeat 横向平铺-repeat-x 纵向平铺-repeat-y*/
    background-attachment: scroll; /*滚动-scroll 固定-fixed*/
    background-position: center;
    background-size: cover;
    /*图片始终填充满容器-cover 图片完整地显示在容器中-contain*/
    background-origin: padding-box;
    /*内边距-padding-box 边框-border-box 内容区域-content-box*/
    background-clip: content-box;
    /*内边距-padding-box 边框-border-box 内容区域-content-box*/
}

/*背景简写*/
/*background: colorimage repeat position attachment ;*/
body{
    background: red url(img.jpg) no-repeat center scroll;
}
```



### 颜色渐变

渐变一般用在背景颜色中使用。

**线性渐变**

沿着某条直线朝一个方向产生渐变效果。

```css
body{
    /*linear-gradient(方向, 起始颜色, 终止颜色);*/
    background-image: linear-gradient(to right, yellow, green);
    /*方向: to left、to right、to top、to bottom、角度30deg（顺时针）*/
}

/*多个颜色渐变*/
body{
    background: linear-gradient(red, rgb(0, 0, 200), green, rgba(122, 211, 100, 0));
}
```



**径向渐变**

从一个**中心点**开始沿着**四周**产生渐变效果。

```css
body{
    /*radial-gradient(辐射的半径大小, 中心的位置, 起始颜色, 终止颜色);*/
    background-image: radial-gradient(100px at center,yellow ,green);
    /*中心点的位置: at left 、right、 center 、bottom 、top*/
}
```



### CSS Sprite

`CSS Sprites`也叫`CSS精灵`、`CSS雪碧图`，是一种网页图片应用处理方式。 

CSS Sprites(图片整合技术) 的目的就是通过整合图片，减少对服务器的请求数量，从而加快页面加载速度。



**CSS Sprite原理**

其实就是把网页中的一些背景图片整合到一张图片文件中，再利用背景属性，对这张大图进行定位。



**CSS Sprite优点**

1. 很好地减少了网页的`http`请求，从而大大的提高了页面的性能，其被广泛传播和应用的主要原因。
2. 能减少图片的字节，(网络传输以字节为单位 ，`1MB=1024千字节`)，三张图片大小的总合大于拼成一张图片的大小。
3. 解决了命名困扰，只需要对一张图片命名，而非数十个小图片命名。
