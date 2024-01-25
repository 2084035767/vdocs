### CSS

**清除默认样式**

```css
html{
    color:#000;
    background:#FFF
}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{
    margin:0;
    padding:0
}
table{
    border-collapse:collapse;
    border-spacing:0
}
fieldset,img{
    border:0
}
address,caption,cite,code,dfn,em,strong,th,var{
    font-style:normal;
    font-weight:normal
}
ol,ul{
    list-style:none
}
caption,th{
    text-align:left
}
h1,h2,h3,h4,h5,h6{
    font-size:100%;
    font-weight:normal
}
q:before,q:after{
    content:''
}
abbr,acronym{
    border:0;
    font-variant:normal
}
sup{
    vertical-align:text-top
}
sub{
    vertical-align:text-bottom
}
input,textarea,select{
    font-family:inherit;
    font-size:inherit;
    font-weight:inherit;
    *font-size:100%
}
legend{
    color:#000
}
```

**清除浮动方法**

方案一

```css
.clearfix:before,
.clearfix:after {
  content: ".";    
  display: block;    
  height: 0;    
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
```

方案二

```css
.clearfix:before, .clearfix:after {
  content:"";
  display:table;
}
.clearfix:after{
  clear:both;
  overflow:hidden;
}
.clearfix{
  zoom:1;
}
```

**文本超出省略号**

```css
display:block;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

**多行文本超出省略号**

```css
display: -webkit-box;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
overflow: hidden;
-webkit-line-clamp: 2;
```

**重置默认行为**

禁止文本选中

```sql
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
-khtml-user-select: none;
user-select: none;
```

禁用输入法

```scss
ime-mode:disabled;
```

禁用系统默认菜单

```css
-webkit-touch-callout:none;
```

禁止触发鼠标或者触屏事件

```css
pointer-events: none;
```

自定义文本选择

```ruby
::selection { background: #e2eae2; }
::-moz-selection { background: #e2eae2; }
::-webkit-selection { background: #e2eae2; }
```



