# 七、形状操作

## 数组变形

```python
import numpy as np
arr1 = np.random.randint(0,10,size = (3,4,5))
arr2 = arr1.reshape(12,5) # 形状改变，返回新数组
arr3 = arr1.reshape(-1,5) # ⾃动“整形”，⾃动计算
```

## 数组转置

```python
import numpy as np
arr1 = np.random.randint(0,10,size = (3,5)) # shape(3,5)
arr1.T # shape(5,3) 转置
arr2 = np.random.randint(0,10,size = (3,6,4)) # shape(3,6,4)
np.transpose(arr2,axes=(2,0,1)) # transpose改变数组维度  shape(4,3,6)
```

## 数组堆叠

```python
import numpy as np
arr1 = np.array([[1,2,3]])
arr2 = np.array([[4,5,6]])
np.concatenate([arr1,arr2],axis = 0)
# 串联合并shape(2,3) axis = 0表示第⼀维串联  输出为
# array([[1, 2, 3],
#        [4, 5, 6]])
np.concatenate([arr1,arr2],axis = 1)
# shape(1,6) axis = 1表示第⼆维串联  输出为：  array([[1, 2, 3, 4, 5, 6]])
np.hstack((arr1,arr2)) # ⽔平⽅向堆叠  输出为：  array([[1, 2, 3, 4, 5, 6]]) np.vstack((arr1,arr2))
# 竖直⽅向堆叠，输出为：
# array([[1, 2, 3],
#        [4, 5, 6]])
```

## split数组拆分

```python
import numpy as np
arr = np.random.randint(0,10,size = (6,5)) # shape(6,5)
np.split(arr,indices_or_sections=2,axis = 0) # 在第⼀维(6)平均分成两份
np.split(arr,indices_or_sections=[2,3],axis = 1) # 在第⼆维(5)以索引2，  3为断点分割
成3份
np.vsplit(arr,indices_or_sections=3) # 在竖直⽅向平均分割成3份
np.hsplit(arr,indices_or_sections=[1,4]) # 在⽔平⽅向，以索引 1，  4为断点分割成3份
```

#
