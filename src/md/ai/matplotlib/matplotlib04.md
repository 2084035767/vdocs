# 四、多图布局

## 子视图

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-np.pi,np.pi,50)
y = np.sin(x)
# 子视图1
plt.figure(figsize=(9,6))
ax = plt.subplot(221) # 两行两列一个子视图
ax.plot(x,y,color = 'red')
ax.set_facecolor('green') # 调用子视图设置方法，设置子视图整体属性
# 子视图2
ax = plt.subplot(2,2,2) # 两行两列二个子视图
line, = ax.plot(x,-y) # 返回绘制对象
line.set_marker('*') # 调用对象设置方法，设置属性
line.set_markerfacecolor('red')
line.set_markeredgecolor('green')
line.set_markersize(10)
# 子视图3
ax = plt.subplot(2,1,2) # 两行一列二行视图
plt.sca(ax) # 设置当前视图
x = np.linspace(-np.pi,np.pi,200)
plt.plot(x,np.sin(x*x),color = 'red')
```

## 嵌套

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-np.pi,np.pi,25)
y = np.sin(x)
fig = plt.figure(figsize=(9,6)) # 创建视图
plt.plot(x,y)
# 嵌套方式一，axes轴域（横纵坐标范围），子视图
ax = plt.axes([0.2,0.55,0.3,0.3]) # 参数含义[left, bottom, width, height]
ax.plot(x,y,color = 'g')
# 嵌套方式二
ax = fig.add_axes([0.55,0.2,0.3,0.3]) # 使用视图对象添加子视图
ax.plot(x,y,color = 'r')
```

## 多图布局分格显示

3.3.1 均匀布局

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,2*np.pi)
# sharex:所有小图共享x轴 sharey:表示所有小图共享y轴 坐标轴以所有小图中范围最大的进行显示
fig, ((ax11,ax12,ax13), (ax21,ax22,ax23),(ax31,ax32,ax33)) = plt.subplots(3, 3)
# 也可通过plt.subplot() 一个个添加子视图
fig.set_figwidth(9)
fig.set_figheight(6)
ax11.plot(x,np.sin(x))
ax12.plot(x,np.cos(x))
ax13.plot(x,np.tanh(x))
ax21.plot(x,np.tan(x))
ax22.plot(x,np.cosh(x))
ax23.plot(x,np.sinh(x))
ax31.plot(x,np.sin(x) + np.cos(x))
ax32.plot(x,np.sin(x*x) + np.cos(x*x))
ax33.plot(x,np.sin(x)*np.cos(x))
# 紧凑显示，边框会比较小，可以注释掉该行查看效果
plt.tight_layout()
plt.show()
```

3.3.2 不均匀分布

方式一

```python
import numpy as np
import matplotlib.pyplot as plt
# 需要导入gridspec模块
x = np.linspace(0,2*np.pi,200)
fig = plt.figure(figsize=(12,9))
# 使用切片方式设置子视图
ax1 = plt.subplot(3,1,1) # 视图对象添加子视图
ax1.plot(x,np.sin(10*x))
# 设置ax1的标题，xlim、ylim、xlabel、ylabel等所有属性现在只能通过set_属性名的方法设置
ax1.set_title('ax1_title') # 设置小图的标题
ax2 = plt.subplot(3,3,(4,5))
ax2.set_facecolor('green')
ax2.plot(x,np.cos(x),color = 'red')
ax3 = plt.subplot(3,3,(6,9))
ax3.plot(x,np.sin(x) + np.cos(x))
ax4 = plt.subplot(3,3,7)
ax4.plot([1,3],[2,4])
ax5 = plt.subplot(3,3,8)
ax5.scatter([1,2,3], [0,2, 4])
ax5.set_xlabel('ax5_x',fontsize = 12)
ax5.set_ylabel('ax5_y',fontsize = 12)
plt.show()

```

方式二

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,2*np.pi,100)
plt.figure(figsize=(12,9))
# 子视图1
ax1 = plt.subplot2grid(shape = (3, 3),# 布局形状
                       loc = (0, 0), # 布局绘制位置
                       colspan=3) # 跨几列
ax1.plot(x,np.sin(10*x))
# 设置ax1的标题，xlim、ylim、xlabel、ylabel等所有属性现在只能通过set_属性名的方法设置
ax1.set_title('ax1_title') # 设置小图的标题
# 子视图2
ax2 = plt.subplot2grid((3, 3), (1, 0), colspan=2) # 跨两列
ax2.set_facecolor('green')
ax2.plot(x,np.cos(x),color = 'red')
# 子视图3
ax3 = plt.subplot2grid((3, 3), (1, 2), rowspan=2) # 跨两行
ax3.plot(x,np.sin(x) + np.cos(x))
# 子视图4
ax4 = plt.subplot2grid((3, 3), (2, 0))
ax4.plot([1,3],[2,4])
# 子视图5
ax5 = plt.subplot2grid((3, 3), (2, 1))
ax5.scatter([1,2,3], [0,2, 4])
ax5.set_xlabel('ax5_x',fontsize = 12)
ax5.set_ylabel('ax5_y',fontsize = 12)
```

方式三

```python
import numpy as np
import matplotlib.pyplot as plt
# 需要导入gridspec模块
import matplotlib.gridspec as gridspec
x = np.linspace(0,2*np.pi,200)
fig = plt.figure(figsize=(12,9))
# 将整个视图分成3x3布局
gs = gridspec.GridSpec(3, 3)
# 使用切片方式设置子视图
ax1 = fig.add_subplot(gs[0,:]) # 视图对象添加子视图
ax1.plot(x,np.sin(10*x))
# 设置ax1的标题，xlim、ylim、xlabel、ylabel等所有属性现在只能通过set_属性名的方法设置
ax1.set_title('ax1_title') # 设置小图的标题
ax2 = plt.subplot(gs[1, :2]) # 模块调用
ax2.set_facecolor('green')
ax2.plot(x,np.cos(x),color = 'red')
# 从一行到最后，占1、2两行，后面的2表示只占用二列，也就是最后的一列
ax3 = plt.subplot(gs[1:, 2])
ax3.plot(x,np.sin(x) + np.cos(x))
# 倒数一行，只占0列这一列
ax4 = plt.subplot(gs[-1, 0])
ax4.plot([1,3],[2,4])
# 倒数一行，只占倒数二列，由于总共三列，所以倒数二列就是序号1的列
ax5 = plt.subplot(gs[-1, -2])
ax5.scatter([1,2,3], [0,2, 4])
ax5.set_xlabel('ax5_x',fontsize = 12)
ax5.set_ylabel('ax5_y',fontsize = 12)
plt.show()
```

## 双轴显示

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-np.pi,np.pi,100)
data1 = np.exp(x)
data2 = np.sin(x)
plt.figure(figsize=(9,6))
plt.rcParams['font.size'] = 16 # 设置整体字体大小
ax1 = plt.gca() # 获取当前轴域
ax1.set_xlabel('time (s)') # 设置x轴标签
ax1.set_ylabel('exp', color='red') # 设置y轴标签
ax1.plot(t, data1, color='red') # 数据绘制
ax1.tick_params(axis='y', labelcolor='red') # 设置y轴刻度属性
ax2 = ax1.twinx() # 创建新axes实例，共享x轴，并设置
ax2.set_ylabel('sin', color='blue')
ax2.plot(t, data2, color='blue')
ax2.tick_params(axis='y', labelcolor='blue')
plt.tight_layout() # 紧凑布局
```

