# 八、数据转换

## 轴和元素替

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,10,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
df.iloc[4,2] = None # 空数据
#1、重命名轴索引
df.rename(index = {'A':'AA','B':'BB'},columns = {'Python':'⼈⼯智能'})
# 2、替换值
df.replace(3,1024) #将3替换为1024
df.replace([0,7],2048) # 将0和7替换为2048
df.replace({0:512,np.nan:998}) # 根据字典键值对进⾏替换
df.replace({'Python':2},-1024) # 将Python这⼀列中等于2的，替换为-1024
```



## map Series元素改变

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,10,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
df.iloc[4,2] = None # 空数据
# 1、map批量元素改变，Series专有
df['Keras'].map({1:'Hello',5:'World',7:'AI'}) # 字典映射
df['Python'].map(lambda x:True if x >=5 else False) # 隐式函数映射
def convert(x): # 显示函数映射
    if x%3 == 0:
        return True
    elif x%3 == 1:
        return False
    df['Tensorflow'].map(convert)
```

## apply元素改变。既⽀持 Series，也⽀持 DataFrame

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,10,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
df.iloc[4,2] = None # 空数据
# 1、apply 应⽤方法数据转换，通⽤
# Series，其中x是Series中元素
df['Keras'].apply(lambda x:True if x >5 else False)
# DataFrame，其中的x是DataFrame中列或者⾏，是Series
df.apply(lambda x : x.median(),axis = 0) # 列的中位数
def convert(x): # ⾃定义方法
    return (x.mean().round(1),x.count())
df.apply(convert,axis = 1) # ⾏平均值，计数
# 2、applymap DataFrame专有
df.applymap(lambda x : x + 100) # 计算DataFrame中每个元素
```

## transform变形⾦刚

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,10,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
df.iloc[4,2] = None # 空数据
# 1、⼀列执⾏多项计算
df['Python'].transform([np.sqrt,np.exp]) # Series处理
def convert(x):
    if x.mean() > 5:
        x *= 10
    else:
        x *= -10
        return x
    # 2、多列执⾏不同计算
    df.transform({'Python':convert,'Tensorflow':np.max,'Keras':np.min}) # DataFrame
    处理
```

## 重排随机抽样哑变量

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,10,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
ran = np.random.permutation(10) # 随机重排
df.take(ran) # 重排DataFrame
df.take(np.random.randint(0,10,size = 15)) # 随机抽样
# 哑变量，独热编码，1表示有，0表示没有
df = pd.DataFrame({'key':['b','b','a','c','a','b']})
pd.get_dummies(df,prefix='',prefix_sep='')
```

#