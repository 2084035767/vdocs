# 七、数据清洗

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = {'color':
                          ['red','blue','red','green','blue',None,'red'],
                          'price':[10,20,10,15,20,0,np.NaN]})
# 1、重复数据过滤
df.duplicated() # 判断是否存在重复数据
df.drop_duplicates() # 删除重复数据
# 2、空数据过滤
df.isnull() # 判断是否存在空数据，存在返回True，否则返回False
df.dropna(how = 'any') # 删除空数据
df.fillna(value=1111) # 填充空数据
# 3、指定⾏或者列过滤
del df['color'] # 直接删除某列
df.drop(labels = ['price'],axis = 1)# 删除指定列
df.drop(labels = [0,1,5],axis = 0) # 删除指定⾏
# 4、函数filter使⽤
df = pd.DataFrame(np.array(([3,7,1], [2, 8, 256])),
                  index=['dog', 'cat'],
                  columns=['China', 'America', 'France'])
df.filter(items=['China', 'France'])
# 根据正则表达式删选列标签
df.filter(regex='a$', axis=1)
# 选择⾏中包含og
df.filter(like='og', axis=0)
# 5、异常值过滤
df2 = pd.DataFrame(data = np.random.randn(10000,3)) # 正态分布数据
# 3σ过滤异常值，σ即是标准差
cond = (df2 > 3*df2.std()).any(axis = 1)
index = df2[cond].index # 不满⾜条件的⾏索引
df2.drop(labels=index,axis = 0) # 根据⾏索引，进⾏数据删除
```

