# 十一、数据排序

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(data = np.random.randint(0,30,size = (30,3)),
                  index = list('qwertyuioijhgfcasdcvbnerfghjcf'),
                  columns = ['Python','Keras','Pytorch'])
# 1、索引列名排序
df.sort_index(axis = 0,ascending=True) # 按索引排序，降序
df.sort_index(axis = 1,ascending=False) #按列名排序，升序
# 2、属性值排序
df.sort_values(by = ['Python']) #按Python属性值排序
df.sort_values(by = ['Python','Keras'])#先按Python，再按Keras排序
# 3、返回属性n⼤或者n⼩的值
df.nlargest(10,columns='Keras') # 根据属性Keras排序,返回最⼤10个数据
df.nsmallest(5,columns='Python') # 根据属性Python排序，返回最⼩5个数据
```
