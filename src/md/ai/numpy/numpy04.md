# 四、数组运算

加减乘除幂运算

 ```python
import numpy as np
arr1 = np.array([1,2,3,4,5])
arr2 = np.array([2,3,1,5,9])
arr1 - arr2 
# 减法arr1 * arr2 # 乘法arr1 / arr2 # 除法arr1**arr2 # 两个星号表示幂运算
 ```

逻辑运算

 ```python
import numpy as np
arr1 = np.array([1,2,3,4,5])
arr2 = np.array([1,0,2,3,5])
arr1 < 5
arr1 >= 5
arr1 == 5
arr1 == arr2
arr1 > arr2
 ```

数组与标量计算

数组与标量的算术运算也会将标量值传播到各个元素

 ```python
import numpy as np
arr = np.arange(1,10)1/arr
arr+5
arr*5
 ```

*= 、+= 、-=操作

某些操作(例如+=和*=)只会修改现有数组，⽽不是创建⼀个新数组。

 ```python
import numpy as np
arr1 = np.arange(5)
arr1 +=5
arr1 -=5
arr1 *=5# arr1 /=5 不⽀持运算
 ```
