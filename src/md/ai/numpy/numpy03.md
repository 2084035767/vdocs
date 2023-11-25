# 三、数据类型

**NumPy支持的基本数字类型**

> 请注意：NumPy数组是同质的，所有元素的数据类型都是相同的。

NumPy支持的基本数字类型如下所示，此外还支持非数字类型，如字符串、对象以及用户自定义的符合类型等

| dtype   | 变体                                | 说明                      |
| ------- | ----------------------------------- | ------------------------- |
| int     | int8，int16，int32，int64           | 整数类型                  |
| unit    | unit8，unit16，unit32，unit64       | 无符号（非负）整数类型    |
| bool    | bool                                | 布尔类型（True 或 False） |
| float   | Float16，float32，float64，float128 | 浮点类型                  |
| complex | complex64，complex128，complex256   | 负数浮点型                |

array创建时

```python
import numpy as np
np.array([1,2,5,8,2],dtype = 'float32')# 输出  ：array([1., 2., 5., 8., 2.], dtype=float32)
```

asarray转换时指定

```python
import numpy as np
arr = [1,3,5,7,,2,9,0]
# asarray将列表进行变换
np.asarray(arr,dtype = 'float32')
#输出：array([1.,3.,5.,7.,,2.,9.,0.], dtype=float32)
```

数据类型转换astype

```python
import numpy as np
arr = np.random.randint(0,10,size = 5,dtype = 'int16')
# 输出：  array([6, 6, 6, 6, 3], dtype=int16)
# 使⽤astype进⾏转换
arr.astype( 'float32') # 输出：  array([1., 4., 0., 6., 6.], dtype=float32)
```
