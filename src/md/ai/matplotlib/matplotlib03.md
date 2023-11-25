# 三、风格和样式

## 颜色、线形、点形、线宽、透明度

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,2*np.pi,20)
y1 = np.sin(x)
y2 = np.cos(x)
# 设置颜色，线型，点型
plt.plot(x,y1,color = 'indigo',ls = '-.',marker = 'p')
plt.plot(x,y2,color = '#FF00EE',ls = '--',marker = 'o')
plt.plot(x,y1 + y2,color = (0.2,0.7,0.2),marker = '*',ls = ':')
plt.plot(x,y1 + 2*y2,linewidth = 3,alpha = 0.7,color = 'orange') # 线宽、透明度
plt.plot(x,2*y1 - y2,'bo--') # 参数连用
```

## 更多属性设置

```python
import numpy as np
import pandas as pd
def f(x):
    return np.exp(-x) * np.cos(2*np.pi*x)
x = np.linspace(0,5,50)
plt.figure(figsize=(9,6))
plt.plot(x,f(x),color = 'purple',
         marker = 'o',
         ls = '--',
         lw = 2,
         alpha = 0.6,
         markerfacecolor = 'red',# 点颜色
         markersize = 10,# 点大小
         markeredgecolor = 'green',#点边缘颜色
         markeredgewidth = 3)#点边缘宽度
plt.xticks(size = 18) # 设置刻度大小
plt.yticks(size = 18)
```

