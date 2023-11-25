# 十、数学和统计方法

pandas对象拥有⼀组常⽤的数学和统计方法。它们属于汇总统计，对Series汇总计算获取mean、max 值或者对DataFrame⾏、列汇总计算返回⼀个Series。

## 简单统计指标

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,100,size = (20,3)),
                  index = list('ABCDEFHIJKLMNOPQRSTU'),
                  columns=['Python','Tensorflow','Keras'])
# 1、简单统计指标
df.count() # ⾮NA值的数量
df.max(axis = 0) #轴0最⼤值，即每⼀列最⼤值
df.min() #默认计算轴0最⼩值
df.median() # 中位数
df.sum() # 求和
df.mean(axis = 1) #轴1平均值，即每⼀⾏的平均值
df.quantile(q = [0.2,0.4,0.8]) # 分位数
df.describe() # 查看数值型列的汇总统计,计数、平均值、标准差、最⼩值、四分位数、最⼤值

```



## 索引标签、位置获取

```python
# 2、索引位置
df['Python'].argmin() # 计算最⼩值位置
df['Keras'].argmax() # 最⼤值位置
df.idxmax() # 最⼤值索引标签
df.idxmin() # 最⼩值索引标签
```

## 更多统计指标

```python
# 3、更多统计指标
df['Python'].value_counts() # 统计元素出现次数
df['Keras'].unique() # 去重
df.cumsum() # 累加
df.cumprod() # 累乘
df.std() # 标准差
df.var() # 方差
df.cummin() # 累计最⼩值
df.cummax() # 累计最⼤值
df.diff() # 计算差分
df.pct_change() # 计算百分⽐变化
```

## 高级统计指标

```python
# 4、⾼级统计指标
df.cov() # 属性的协方差
df['Python'].cov(df['Keras']) # Python和Keras的协方差
df.corr() # 所有属性相关性系数
df.corrwith(df['Tensorflow']) # 单⼀属性相关性系数
```

#