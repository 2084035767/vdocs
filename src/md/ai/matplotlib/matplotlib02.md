# 二、基础知识

## 图形绘制

```python
import numpy as np
import matplotlib.pyplot as plt
# 1、图形绘制
x = np.linspace(0,2*np.pi) # x轴
# y轴
y = np.sin(x) # 正弦
# 绘制线形图
# 调整尺寸
plt.figure(figsize=(9,6))
plt.plot(x,y)
# 继续调用plot绘制多条线形图
# 2、设置网格线
plt.grid(linestyle = '--',# 样式
         color = 'green',# 颜色
         alpha = 0.75) # 透明度
# 3、设置坐标轴范围
plt.axis([-1,10,-1.5,1.5])
plt.xlim([-1,10])
plt.ylim([-1.5,1.5])
```

## 坐标轴刻度、标签、标题

```python
import numpy as np
import matplotlib.pyplot as plt
# 1、图形绘制
x = np.linspace(0,2*np.pi) # x轴
# y轴
y = np.sin(x) # 正弦
plt.plot(x,y)
# 2、设置x轴y轴刻度
plt.xticks(np.arange(0,7,np.pi/2))
plt.yticks([-1,0,1])
# 3、设置x轴y轴刻度标签
_ = plt.yticks(ticks = [-1,0,1],labels=['min',' 0 ','max'],fontsize = 20,ha = 'right')
font={'family':'serif','style':'italic','weight':'normal','color':'red','size':16}
_ = plt.xticks(ticks = np.arange(0,7,np.pi/2),
               # LaTex语法，输入格式为：r'$\sigma$' #其中的sigma对应于希腊字母的σ
               labels = ['0',r'$\frac{\pi}{2}$',r'$\pi$',r'$\frac{3\pi}{2}$',r'$2\pi$'],
               fontsize = 20,
               fontweight = 'normal',
               color = 'red')
# 4、坐标轴标签，标题
plt.ylabel('y = sin(x)',rotation = 0,
           horizontalalignment = 'right',fontstyle = 'normal',fontsize = 20)
# 获取电脑上的字体库
from matplotlib.font_manager import FontManager
fm = FontManager()
mat_fonts = set(f.name for f in fm.ttflist)
# print(mat_fonts)
plt.rcParams['font.sans-serif'] = 'Songti SC' # 设置宋体，显示中文
plt.title('正弦波')
```

## 图例

```python
import numpy as np
import matplotlib.pyplot as plt
# 1、图形绘制
x = np.linspace(0,2*np.pi) # x轴
# y轴
y = np.sin(x) # 正弦
# 绘制线形图
# 调整尺寸
plt.figure(figsize=(9,6))
plt.plot(x,y)
# 2、图例
plt.plot(x,np.cos(x)) # 余弦波
plt.legend(['Sin','Cos'],fontsize = 18,loc = 'center',ncol = 2,bbox_to_anchor =
           [0,1.05,1,0.2])

```

## 脊柱移动

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-np.pi,np.pi,50)
plt.rcParams['axes.unicode_minus'] = False
plt.figure(figsize=(9,6))
plt.plot(x,np.sin(x),x,np.cos(x))
ax = plt.gca() # 获取当前视图
# 右边和上面脊柱消失
ax.spines['right'].set_color('white')
ax.spines['top'].set_color('#FFFFFF')
# 设置下面左边脊柱位置，data表示数据，axes表示相对位置0~1
ax.spines['bottom'].set_position(('data',0))
ax.spines['left'].set_position(('data',0))
plt.yticks([-1,0,1],labels=['-1','0','1'],fontsize = 18)
_ = plt.xticks([-np.pi,-np.pi/2,np.pi/2,np.pi],
               labels=[r'$-\pi$',r'$-\frac{\pi}{2}$',r'$\frac{\pi}{2}$',r'$\pi$'],
               fontsize = 18)
```

## 图片保存

```python
import numpy as np
import matplotlib.pyplot as plt
# 1、图形绘制
x = np.linspace(0,2*np.pi) # x轴
# y轴
y = np.sin(x) # 正弦波
plt.figure(linewidth = 4)
plt.plot(x,y,color = 'red')
plt.plot(x,np.cos(x),color = 'k') # 余弦波
ax = plt.gca() # 获取视图
ax.set_facecolor('lightgreen') # 设置视图背景颜色
# 2、图例
plt.legend(['Sin','Cos'],fontsize = 18,loc = 'center',ncol = 2,bbox_to_anchor =
           [0,1.05,1,0.2])
# plt.tight_layout() # 自动调整布局空间，就不会出现图片保存不完整
plt.savefig('./基础5.png', # 文件名：png、jpg、pdf
            dpi = 100, # 保存图片像素密度
            facecolor = 'violet', # 视图与边界之间颜色设置
            edgecolor = 'lightgreen', # 视图边界颜色设置
            bbox_inches = 'tight')# 保存图片完整
```

