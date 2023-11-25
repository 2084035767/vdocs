# 七、3D图形

## 三维折线图散点图

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.axes3d import Axes3D # 3D引擎
x = np.linspace(0,60,300)
y = np.sin(x)
z = np.cos(x)
fig = plt.figure(figsize=(9,6)) # 二维图形
ax3 = Axes3D(fig) # 二维变成了三维
ax3.plot(x,y,z) # 3维折线图
# 3维散点图
ax3.scatter(np.random.rand(50)*60,np.random.rand(50),np.random.rand(50),
            color = 'red',s = 100)
```

## 三维柱状图

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.axes3d import Axes3D # 3D引擎
month = np.arange(1,5)
# 每个月 4周 每周都会产生数据
# 三个维度：月、周、销量
fig = plt.figure(figsize=(9,6))
ax3 = Axes3D(fig)
for m in month:
    ax3.bar(np.arange(4),
            np.random.randint(1,10,size = 4),
            zs = m ,
            zdir = 'x',# 在哪个方向上，一排排排列
            alpha = 0.7,# alpha 透明度
            width = 0.5)
    ax3.set_xlabel('X',fontsize = 18,color = 'red')
    ax3.set_ylabel('Y',fontsize = 18,color = 'red')
    ax3.set_zlabel('Z',fontsize = 18,color = 'green')
```