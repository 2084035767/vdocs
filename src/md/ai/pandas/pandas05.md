# 五、 数据选取

## 获取数据

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(data = np.random.randint(0,150,size = [150,3]),# 计算机科⽬的考
                  试成绩
                  columns=['Python','Tensorflow','Keras'])
df['Python'] # 获取单列，Series
df.Python # 获取单列，Series
df[['Python','Keras']] # 获取多列，DataFrame
df[3:15] # ⾏切⽚
```

## 标签选择

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考试
                  成绩
                  index = list('ABCDEFGHIJ'),# ⾏标签
                  columns=['Python','Tensorflow','Keras'])
df.loc[['A','C','D','F']] # 选取指定⾏标签数据。
df.loc['A':'E',['Python','Keras']] # 根据⾏标签切⽚，选取指定列标签的数据
df.loc[:,['Keras','Tensorflow']] # :默认保留所有⾏
df.loc['E'::2,'Python':'Tensorflow'] # ⾏切⽚从标签E开始每2个中取⼀个，列标签进⾏切⽚
df.loc['A','Python'] # 选取标量值
```

## 位置选择

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考试
                  成绩
                  index = list('ABCDEFGHIJ'),# ⾏标签
                  columns=['Python','Tensorflow','Keras'])
df.iloc[4] # ⽤整数位置选择。
df.iloc[2:8,0:2] # ⽤整数切⽚，类似NumPy
df.iloc[[1,3,5],[0,2,1]] # 整数列表按位置切⽚
df.iloc[1:3,:] # ⾏切⽚
df.iloc[:,:2] # 列切⽚
df.iloc[0,2] # 选取标量值
```

## boolean索引

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考试
                  成绩
                  index = list('ABCDEFGHIJ'),# ⾏标签，⽤户
                  columns=['Python','Tensorflow','Keras']) # 考试科⽬
cond1 = df.Python > 100 # 判断Python分数是否⼤于100，返回值是boolean类型的Series
df[cond1] # 返回Python分数⼤于100分的⽤户所有考试科⽬数据
cond2 = (df.Python > 50) & (df['Keras'] > 50) # &与运算
df[cond2] # 返回Python和Keras同时⼤于50分的⽤户的所有考试科⽬数据
df[df > 50]# 选择DataFrame中满⾜条件的值，如果满⾜返回值，不然返回空数据NaN
df[df.index.isin(['A','C','F'])] # isin判断是否在数组中，返回也是boolean类型值
```

## 赋值操作

```python
import pandas as pd
import numpy as np
df = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考试
                  成绩
                  index = list('ABCDEFGHIJ'),# ⾏标签，⽤户
                  columns=['Python','Tensorflow','Keras']) # 考试科⽬
s = pd.Series(data = np.random.randint(0,150,size =
                                       9),index=list('BCDEFGHIJ'),name = 'PyTorch')
df['PyTorch'] = s # 增加⼀列，DataFrame⾏索引⾃动对⻬
df.loc['A','Python'] = 256 # 按标签赋值
df.iloc[3,2] = 512 # 按位置赋值
df.loc[:,'Python'] = np.array([128]*10) # 按NumPy数组进⾏赋值
df[df >= 128] = -df # 按照where条件进⾏赋值，⼤于等于128变成原来的负数，否则不变
df
```

#