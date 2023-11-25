# 十、线性代数

矩阵乘积

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

C = A.dot(B)
print(C)
```

## 矩阵其他计算

下⾯可以计算矩阵的逆、⾏列式、特征值和特征向量、  qr分解值，  svd分解值

```PY
#计算矩阵的逆
from numpy.linalg import inv,det,eig,qr,svd
A = np.array([[1,2,3],
              [2,3,4],
              [4,5,8]]) # shape(3,3)
inv(t) # 逆矩阵
det(t)#计算矩阵⾏列式
```

