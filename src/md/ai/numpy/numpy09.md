# 九、通用函数

## 9.1 通用函数：元素级数字函数

abs 、sqrt 、square 、exp 、log 、sin 、cos 、tan，  maxinmum 、minimum 、all 、any 、inner 、clip、 round 、trace 、ceil 、floor

```python
import numpy as np
arr1 = np.array([1,4,8,9,16,25])
np.sqrt(arr1) # 开平⽅
np.square(arr1) # 平⽅
np.clip(arr1,2,16) # 输出  array([ 2,  4,  8,  9, 16, 16])
x = np.array([1,5,2,9,3,6,8])
y = np.array([2,4,3,7,1,9,0])
np.maximum(x,y) # 返回两个数组中的⽐较⼤的值
arr2 = np.random.randint(0,10,size = (5,5))
np.inner(arr2[0],arr2) #返回⼀维数组向量内积
```

## 9.2 where函数

where 函数，三个参数，条件为真时选择值的数组，条件为假时选择值的数组

```python
import numpy as np
arr1 = np.array([1,3,5,7,9])
arr2 = np.array([2,4,6,8,10])
cond = np.array([True,False,True,True,False])
np.where(cond,arr1,arr2) # True选择arr1，False选择arr2的值
# 输出  array([ 1,  4,  5,  7, 10])
arr3 = np.random.randint(0,30,size = 20)
np.where(arr3 < 15,arr3,-15) # ⼩于15还是⾃身的值，⼤于15设置成-15
```

## 9.3 排序方法

np中还提供了排序⽅法，排序⽅法是就地排序，即直接改变原数组

arr.sort() 、np.sort() 、arr.argsort()

 ```python
import numpy as np
arr = np.array([9,3,11,6,17,5,4,15,1])
arr.sort() # 直接改变原数组
np.sort(arr) # 返回深拷⻉排序结果
arr = np.array([9,3,11,6,17,5,4,15,1])
arr.argsort() # 返回从⼩到⼤排序索引  array([8, 1, 6, 5, 3, 0, 2, 7, 4])
 ```

## 9.4 集合运算函数

1. unique(): 返回一个数组中的唯一元素。
2. intersect1d(): 返回两个数组中的公共元素。
3. union1d(): 返回两个数组中的所有元素，但不重复出现。
4. setdiff1d(): 返回第一个数组中存在，而第二个数组中不存在的元素。
5. setxor1d(): 返回两个数组中仅出现在其中一个数组中并且不重复的元素。

```python
import numpy as np

# 创建两个数组
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([3, 4, 5, 6, 7])

# 计算两个数组的交集
print("Intersection: ", np.intersect1d(arr1, arr2))

# 计算两个数组的并集
print("Union: ", np.union1d(arr1, arr2))

# 计算第一个数组中存在，而第二个数组中不存在的元素
print("Set difference: ", np.setdiff1d(arr1, arr2))

# 计算两个数组中仅出现在其中一个数组中并且不重复的元素
print("Symmetric difference: ", np.setxor1d(arr1, arr2))

# 查找数组中的唯一元素
arr = np.array([1, 2, 3, 1, 2, 3, 4, 5])
print("Unique elements: ", np.unique(arr))

# 输出结果如下：
#Intersection: [3 4 5]
#Union: [1 2 3 4 5 6 7]
#Set difference: [1 2]
#Symmetric difference: [1 2 6 7]
#Unique elements: [1 2 3 4 5]
```

## 9.5 数学和统计函数

1. min(): 返回数组中的最小值。
2. max(): 返回数组中的最大值。
3. mean(): 返回数组的平均值。
4. median(): 返回数组的中位数。
5. sum(): 返回数组所有元素的和。
6. std(): 返回数组元素的标准差。
7. var(): 返回数组元素的方差。
8. cumsum(): 返回一个数组，其中每个元素是原始数组中前面所有元素的累加和。
9. cumprod(): 返回一个数组，其中每个元素是原始数组中前面所有元素的累积积。
10. argmin(): 返回数组中最小值所在的索引。
11. argmax(): 返回数组中最大值所在的索引。
12. argwhere(): 返回非零元素的索引。
13. cov(): 计算数组的协方差矩阵。
14. corrcoef(): 计算数组的相关系数矩阵。

```python
import numpy as np

# 创建一个二维数组
arr = np.array([[1, 2, 3], [4, 5, 6]])

# 计算最小值、最大值、平均值、中位数、总和、标准差和方差
print("Min: ", np.min(arr))
print("Max: ", np.max(arr))
print("Mean: ", np.mean(arr))
print("Median: ", np.median(arr))
print("Sum: ", np.sum(arr))
print("Std: ", np.std(arr))
print("Var: ", np.var(arr))

# 计算累加和和累积积
print("Cumulative sum: ", np.cumsum(arr))
print("Cumulative product: ", np.cumprod(arr))

# 查找最小值和最大值所在的索引
print("Argmin: ", np.argmin(arr))
print("Argmax: ", np.argmax(arr))

# 查找非零元素的索引
print("Argwhere: ", np.argwhere(arr > 3))

# 计算协方差矩阵和相关系数矩阵
cov_mat = np.cov(arr)
corr_mat = np.corrcoef(arr)

print("Covariance matrix: \n", cov_mat)
print("Correlation matrix: \n", corr_mat)

"""
Min:  1
Max:  6
Mean:  3.5
Median:  3.5
Sum:  21
Std:  1.707825127659933
Var:  2.9166666666666665
Cumulative sum:  [ 1  3  6 10 15 21]
Cumulative product:  [  1   2   6  24 120 720]
Argmin:  0
Argmax:  5
Argwhere:  [[1 0]
 [1 1]
 [1 2]]
Covariance matrix: 
 [[1. 1.]
 [1. 1.]]
Correlation matrix: 
 [[1. 1.]
 [1. 1.]]
"""
```
