# 三、数据查看

查看DataFrame的常⽤属性和DataFrame的概览和统计信息

```python
import numpy as np
import pandas as pd
# 创建 shape(150,3)的⼆维标签数组结构DataFrame
df = pd.DataFrame(data = np.random.randint(0,151,size = (150,3)),
                  index = None,# ⾏索引默认
                  columns=['Python','Math','En'])# 列索引
# 查看其属性、概览和统计信息
df.head(10) # 显示头部10⾏，默认5个
df.tail(10) # 显示末尾10⾏，默认5个
df.shape # 查看形状，⾏数和列数
df.dtypes # 查看数据类型
df.index # ⾏索引
df.columns # 列索引
df.values # 对象值，⼆维ndarray数组
df.describe() # 查看数值型列的汇总统计,计数、平均值、标准差、最⼩值、四分位数、最⼤值
df.info() # 查看列索引、数据类型、⾮空计数和内存信息
```
