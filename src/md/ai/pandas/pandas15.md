# 十五、数据可视化

pip install matplotlib -i https://pypi.tuna.tsinghua.edu.cn/simple

```python
import numpy as np
import pandas as pd
# 1、线形图
df1 = pd.DataFrame(data = np.random.randn(1000,4),
                   index = pd.date_range(start = '27/6/2012',periods=1000),
                   columns=list('ABCD'))
df1.cumsum().plot()
# 2、条形图
df2 = pd.DataFrame(data = np.random.rand(10,4),
                   columns = list('ABCD'))
df2.plot.bar(stacked = True) # stacked 是否堆叠
# 3、饼图
df3 = pd.DataFrame(data = np.random.rand(4,2),
                   index = list('ABCD'),
                   columns=['One','Two'])
df3.plot.pie(subplots = True,figsize = (8,8))
# 4、散点图
df4 = pd.DataFrame(np.random.rand(50, 4), columns=list('ABCD'))
df4.plot.scatter(x='A', y='B') # A和B关系绘制
# 在一张图中绘制AC散点图，同时绘制BD散点图
ax = df4.plot.scatter(x='A', y='C', color='DarkBlue', label='Group 1');
df4.plot.scatter(x='B', y='D', color='DarkGreen', label='Group 2', ax=ax)
# ⽓泡图，散点有⼤⼩之分
df4.plot.scatter(x='A',y='B',s = df4['C']*200)
# 5、⾯积图
df5 = pd.DataFrame(data = np.random.rand(10, 4),
                   columns=list('ABCD'))
df5.plot.area(stacked = True);# stacked 是否堆叠
# 6、箱式图
df6 = pd.DataFrame(data = np.random.rand(10, 5),
                   columns=list('ABCDE'))
df6.plot.box()
# 7、直方图
df7 = pd.DataFrame({'A': np.random.randn(1000) + 1, 'B': np.random.randn(1000),
                    'C': np.random.randn(1000) - 1})
df7.plot.hist(alpha=0.5) #带透明度直方图
df7.plot.hist(stacked = True)# 堆叠图
df7.hist(figsize = (8,8)) # ⼦视图绘制

```

