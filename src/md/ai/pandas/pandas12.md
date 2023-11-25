# 十二、分箱操作

分箱操作就是将连续数据转换为分类对应物的过程。⽐如将连续的身⾼数据划分为：矮中⾼。 分箱操作分为等距分箱和等频分箱。 分箱操作也叫⾯元划分或者离散化。

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,150,size = (100,3)),
                  columns=['Python','Tensorflow','Keras'])
# 1、等宽分箱
pd.cut(df.Python,bins = 3)
# 指定宽度分箱
pd.cut(df.Keras,#分箱数据
       bins = [0,60,90,120,150],#分箱断点
       right = False,# 左闭右开
       labels=['不及格','中等','良好','优秀'])# 分箱后分类
# 2、等频分箱
pd.qcut(df.Python,q = 4,# 4等分
        labels=['差','中','良','优']) # 分箱后分类

```

#