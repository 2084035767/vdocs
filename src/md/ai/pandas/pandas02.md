# 二、数据结构

##  Series

⽤列表⽣成 Series时，Pandas 默认⾃动⽣成整数索引，也可以指定索引

```python
l = [0,1,7,9,np.NAN,None,1024,512]
# ⽆论是numpy中的NAN还是Python中的None在pandas中都以缺失数据NaN对待
s1 = pd.Series(data = l) # pandas⾃动添加索引
s2 = pd.Series(data = l,index = list('abcdefhi'),dtype='float32') # 指定⾏索引
# 传⼊字典创建，key⾏索引
s3 = pd.Series(data = {'a':99,'b':137,'c':149},name = 'Python_score')
display(s1,s2,s3)
```

##  DataFrame

DataFrame是由多种类型的列构成的⼆维标签数据结构，类似于 Excel 、SQL 表，或 Series 对象构成的 字典。

```python
import numpy as np
import pandas as pd
# index 作为⾏索引，字典中的key作为列索引，创建了3*3的DataFrame表格⼆维数组
df1 = pd.DataFrame(data = {'Python':[99,107,122],'Math':								[111,137,88],'En': [68,108,43]},# key作为列索引
                   index = ['张三','李四','Michael']) # ⾏索引
df2 = pd.DataFrame(data = np.random.randint(0,151,size = (5,3)),
                   index = ['Danial','Brandon','softpo','Ella','Cindy'],# ⾏索引
                   columns=['Python','Math','En'])# 列索引
```

#