# 六、数据集成

pandas 提供了多种将 Series、DataFrame 对象组合在⼀起的功能

## concat数据串联

```python
import pandas as pd
import numpy as np
df1 = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考
                   试成绩
                   index = list('ABCDEFGHIJ'),# ⾏标签，⽤户
                   columns=['Python','Tensorflow','Keras']) # 考试科⽬
df2 = pd.DataFrame(data = np.random.randint(0,150,size = [10,3]),# 计算机科⽬的考
                   试成绩
                   index = list('KLMNOPQRST'),# ⾏标签，⽤户
                   columns=['Python','Tensorflow','Keras']) # 考试科⽬
df3 = pd.DataFrame(data = np.random.randint(0,150,size = (10,2)),
                   index = list('ABCDEFGHIJ'),
                   columns=['PyTorch','Paddle'])
pd.concat([df1,df2],axis = 0) # df1和df2⾏串联，df2的⾏追加df2⾏后⾯
df1.append(df2) # 在df1后⾯追加df2
pd.concat([df1,df3],axis = 1) # df1和df2列串联，df2的列追加到df1列后⾯
```



## 插入

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,151,size = (10,3)),
                  index = list('ABCDEFGHIJ'),
                  columns = ['Python','Keras','Tensorflow'])
df.insert(loc = 1,column='Pytorch',value=1024) # 插入列
df
# 对⾏的操作，使⽤追加append，默认在最后⾯，⽆法指定位置
# 如果想要在指定位置插入⾏：切割-添加-合并
```

## Join SQL风格合并

数据集的合并（merge）或连接（join）运算是通过⼀个或者多个键将数据链接起来的。这些运算是关 系型数据库的核⼼操作。pandas的merge函数是数据集进⾏join运算的主要切入点。

```python
import pandas as pd
import numpy as np
# 表⼀中记录的是name和体重信息
df1 = pd.DataFrame(data = {'name':
                           ['softpo','Daniel','Brandon','Ella'],'weight':[70,55,75,65]})
# 表⼆中记录的是name和身⾼信息
df2 = pd.DataFrame(data = {'name':
                           ['softpo','Daniel','Brandon','Cindy'],'height':[172,170,170,166]})
df3 = pd.DataFrame(data = {'名字':
                           ['softpo','Daniel','Brandon','Cindy'],'height':[172,170,170,166]})
# 根据共同的name将俩表的数据，进⾏合并
pd.merge(df1,df2,
         how = 'inner',# 内合并代表两对象交集
         on = 'name')
pd.merge(df1,df3,
         how = 'outer',# 全外连接，两对象并集
         left_on = 'name',# 左边DataFrame使⽤列标签 name进⾏合并
         right_on = '名字')# 右边DataFrame使⽤列标签 名字进⾏合并
# 创建10名学⽣的考试成绩
df4 = pd.DataFrame(data = np.random.randint(0,151,size = (10,3)),
                   index = list('ABCDEFHIJK'),
                   columns=['Python','Keras','Tensorflow'])
# 计算每位学⽣各科平均分，转换成DataFrame
score_mean = pd.DataFrame(df4.mean(axis = 1).round(1),columns=['平均分'])
# 将平均分和df3使⽤merge进⾏合并，它俩有共同的⾏索引
pd.merge(left = df4,right = score_mean,
         left_index=True,# 左边DataFrame使⽤⾏索引进⾏合并
         right_index=True)# 右边的DataFrame使⽤⾏索引进⾏合并
```

#