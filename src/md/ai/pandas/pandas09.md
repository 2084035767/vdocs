# 九、 数据重塑

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,100,size = (10,3)),
                  index = list('ABCDEFHIJK'),
                  columns=['Python','Tensorflow','Keras'])
df.T # 转置
df2 = pd.DataFrame(data = np.random.randint(0,100,size = (20,3)),
                   index = pd.MultiIndex.from_product([list('ABCDEFHIJK'),['期
                                                                           中','期末']]),#多层索引
                                                                           columns=['Python','Tensorflow','Keras'])
                                                                           df2.unstack(level = -1) # ⾏旋转成列，level指定哪⼀层，进⾏变换
                                                                           df2.stack() # 列旋转成⾏
                                                                           df2.stack().unstack(level = 1) # ⾏列互换
                                                                           # 多层索引DataFrame数学计算
                                                                           df2.mean() # 各学科平均分
                                                                           df2.mean(level=0) # 各学科，每个⼈期中期末平均分
                                                                           df2.mean(level = 1) # 各学科，期中期末所有⼈平均分
```
