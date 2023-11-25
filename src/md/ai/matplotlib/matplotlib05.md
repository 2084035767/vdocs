# 五、基本样式

| Pyplot函数 | API方法                      | 描述                           |
| ---------- | ---------------------------- | ------------------------------ |
| text()     | mpl.axes.Axes.text()         | 在Axes对象的任意位置添加文字   |
| xlabel()   | mpl.axes.Axes.set_xlabel()   | 为X轴添加标签                  |
| ylabel()   | mpl.axes.Axes.set_ylabel()   | 为Y轴添加标签                  |
| title()    | mpl.axes.Axes.set_title()    | 为Axes对象添加标题             |
| legend()   | mpl.axes.Axes.legend()       | 为Axes对象添加图例             |
| annotate() | mpl.axes.Axes.annotate()     | 为Axes对象添加注释（箭头可选） |
| figtext()  | mpl.figure.Figure.text()     | 在Figure对象的任意位置添加文字 |
| suptitle() | mpl.figure.Figure.suptitle() | 为Figure对象添加中心化的标题   |

## 文本

```python
import numpy as np
import matplotlib.pyplot as plt
# 字体属性
font = {'fontsize': 20,
        'family': 'Kaiti SC',
        'color': 'red',
        'weight': 'bold'}
x = np.linspace(0.0, 5.0, 100)
y = np.cos(2*np.pi*x) * np.exp(-x)
plt.figure(figsize=(9,6))
plt.plot(x, y, 'k')
plt.title('exponential decay',fontdict=font)
plt.suptitle('指数衰减',y = 1.05,fontdict = font,fontsize = 30)
plt.text(x = 2, y = 0.65, # 横纵坐标位置
         s = r'$\cos(2 \pi t) \exp(-t)$') # 文本内容
plt.xlabel('time (s)')
plt.ylabel('voltage (mV)')
plt.show()

```

## 箭头

```python
import matplotlib.pyplot as plt
import numpy
loc = np.random.randint(0,10,size = (10,2))
plt.figure(figsize=(10, 10))
plt.plot(loc[:,0], loc[:,1], 'g*', ms=20)
plt.grid(True)
# 路径
way = np.arange(10)
np.random.shuffle(way)
for i in range(0, len(way)-1):
    start = loc[way[i]]
    end = loc[way[i+1]]
    plt.arrow(start[0], start[1], end[0]-start[0], end[1]-start[1], # 坐标与距离
              head_width=0.2, lw=2,#箭头长度，箭尾线宽
              length_includes_head = True) # 长度计算包含箭头箭尾
    plt.text(start[0],start[1],s = i,fontsize = 18,color = 'red') # 文本
    if i == len(way) - 2: # 最后一个点
        plt.text(end[0],end[1],s = i + 1,fontsize = 18,color = 'red')

```

## 注释

```python
import numpy as np
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
x = np.arange(0.0, 5.0, 0.01)
y = np.cos(2*np.pi*x)
line, = ax.plot(x,y,lw=2)
ax.annotate('local max', # 文本内容
            xy=(2, 1), # 箭头指向位置
            xytext=(3, 1.5), # 文本位置
            arrowprops=dict(facecolor='black', shrink=0.05)) # 箭头
ax.annotate('local min',
            xy = (2.5,-1),
            xytext = (4,-1.8),
            arrowprops = dict(facecolor = 'black',
                              width = 2, # 箭头宽度
                              headwidth = 10,# 箭头头部宽度
                              headlength = 10, # 箭头头部长度
                              shrink = 0.1)) # 箭头两端收缩的百分比（占总长）
ax.annotate('median',
            xy = (2.25,0),
            xytext = (0.5,-1.8),
            arrowprops = dict(arrowstyle = '-|>'), # 箭头样式
            fontsize = 20)
ax.set_ylim(-2, 2)
```

## 注释箭头连接形状

```python
import matplotlib.pyplot as plt
def annotate_con_style(ax, connectionstyle):
    x1, y1 = 3,2
    x2, y2 = 8,6
    ax.plot([x1, x2], [y1, y2], ".")
    ax.annotate(s = '',
                xy=(x1, y1), # 相当于B点，arrow head
                xytext=(x2, y2), # 相当于A点，arrow tail
                arrowprops=dict(arrowstyle='->', color='red',
                                shrinkA = 5,shrinkB = 5,
                                connectionstyle=connectionstyle))
    ax.text(.05, 0.95, connectionstyle.replace(",", "\n"),
            transform=ax.transAxes, # 相对坐标
            ha="left", va="top")# 指定对齐方式
    # 常用箭头连接样式
    fig, axs = plt.subplots(3, 5, figsize=(9,6))
    annotate_con_style(axs[0, 0], "angle3,angleA=90,angleB=0")
    annotate_con_style(axs[1, 0], "angle3,angleA=0,angleB=90")
    annotate_con_style(axs[2, 0], "angle3,angleA = 0,angleB=150")
    annotate_con_style(axs[0, 1], "arc3,rad=0.")
    annotate_con_style(axs[1, 1], "arc3,rad=0.3")
    annotate_con_style(axs[2, 1], "arc3,rad=-0.3")
    annotate_con_style(axs[0, 2], "angle,angleA=-90,angleB=180,rad=0")
    annotate_con_style(axs[1, 2], "angle,angleA=-90,angleB=180,rad=5")
    annotate_con_style(axs[2, 2], "angle,angleA=-90,angleB=10,rad=5")
    annotate_con_style(axs[0, 3], "arc,angleA=-90,angleB=0,armA=30,armB=30,rad=0")
    annotate_con_style(axs[1, 3], "arc,angleA=-90,angleB=0,armA=30,armB=30,rad=5")
    annotate_con_style(axs[2, 3], "arc,angleA=-90,angleB=0,armA=0,armB=40,rad=0")
    annotate_con_style(axs[0, 4], "bar,fraction=0.3")
    annotate_con_style(axs[1, 4], "bar,fraction=-0.3")
    annotate_con_style(axs[2, 4], "bar,angle=180,fraction=-0.2")
    for ax in axs.flat:
        # 设置轴域刻度
        ax.set(xlim=(0, 10), ylim=(0, 10),xticks = [],yticks = [],aspect=1)
        fig.tight_layout(pad=0.2)
```
