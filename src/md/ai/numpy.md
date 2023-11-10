## NumPy科学计算库

NumPy是Python的一个开源数值计算扩展，提供了多维数组对象和各种派生对象，可以高效地存储和处理大型矩阵，并支持大量的维度数组与矩阵运算。它也提供了大量的数学函数库、逻辑、形状操作、排序、选择、输入输出、离散傅立叶变换、基本线性代数、基本统计运算和随机模拟等功能，被几乎所有从事Python工作的数据分析师广泛使用。NumPy还具备强大的N维数组和成熟的广播功能，并提供了用于整合C/C++和Fortran代码的工具包，使得它在科学计算领域中得到广泛应用。

NumPy科学计算库特点：

1. 多维数组：NumPy提供了强大的多维数组对象，可以高效地存储和处理大型数据集。

2. 数学函数库：NumPy支持大量的数学函数库，包括常见的数学函数、三角函数、指数和对数函数等。

3. 矩阵运算：NumPy可以进行矩阵运算，包括加减乘除、矩阵乘积、逆矩阵、转置等。

4. 广播功能：NumPy具备强大的广播功能，可以在不增加内存的情况下对不同形状的数组进行操作。

5. 整合C/C++和Fortran代码的工具包：NumPy提供了用于整合C/C++和Fortran代码的工具包，可以通过调用这些代码来提高运行速度。

6. 随机数生成：NumPy提供了随机数生成器，可以生成各种分布的随机数。

7. 线性代数：NumPy提供了线性代数库，包括求解线性方程组、奇异值分解、特征值和特征向量等。

### 一、基本操作

#### 1.1 数组创建

1. np.array函数：创建数组的最简单的⽅法，可以从Python列表、可迭代表达式和其他类数组对象（其他ndarray实例）创建NumPy 数组。

```python
import numpy as np
li = [1,3,5,7,9] # 列表
arr = np.array(li)# 将列表转换为NumPy数组
# 或np.array([1,3,5,7,9])
arr # 数据⼀样， NumPy数组的⽅法，功能更加强⼤
# 输出为 array([1, 3, 5, 7, 9])
```

2. np.random函数：NumPy 库中用于生成随机数的模块。它提供了多种分布函数来生成不同类型的随机数。

```python
import numpy as np
# 生成随机整数，该函数可以指定生成随机整数的范围和数量
np.random.randint(0, 10, size=5)

# 生成随机浮点数，这些函数可以指定生成随机浮点数的数量。
# np.random.rand()：生成均匀分布随机数
np.random.rand(3, 4)
# np.random.randn() ：生成正态分布随机数

# 生成随机序列来打乱现有的序列
x = np.array([1, 2, 3, 4, 5])
np.random.shuffle(x)
```

3. 先用（zeros,ones,empty）函数初始化数组 ，再用（np.full,np.fill）函数填充

   > 通常np.zeros函数相比np.empty函数更安全，因此性能提升不是很明显的话，最好使用np.zeros,以减少np.empty函数生成的数组未初始化而带来的那些奇怪不可重现的错误。

```python
## 初始化数组
#np.empty()函数：创建指定形状和数据类型的未初始化数组
x = np.empty(5)
# 输出为array([2.12199579e-314, 8.45603440e-307, 5.41495948e-321, 4.88059032e-312, 6.23059726e-307])

# np.zeros()：创建指定维度和数据类型的数组，以0填充。
np.zeros((2,3)) 
# 输出为array([[0., 0., 0.],
#					  [0., 0., 0.]])

#np.ones()：创建指定维度和数据类型的数组，以1填充。
np.ones(4,dtype = 'int16') 
# 输出为array([1, 1, 1, 1], dtype=int16)


## 填充数组
#创建每个元素都是1的一维数组，将其乘以5.4
xl = 5.4*np.ones(10)
# 输出为array([5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4])

# np.full()： 创建一个给定形状的数组，并用指定的值填充它
x2 = np.full(10,5.4)
# 输出为array([5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4])

# np.fill()：填充给定数组的每个元素，而不是创建一个新的数组。
x3 = np.empty(5)
x3.fill(3.0)
# 输出为array([3., 3., 3., 3., 3.])
```

4. 创建矩阵数组：矩阵数组或二维数组是执行数值计算的重要工具。NumPy提供了一些用于生成的函数。

```python
# np.identity() 函数：使用它可以生成对角线为1，其他元素为0的方形矩阵。
np.identity(4)

#num.eye()函数：创建对角线为1的矩阵（偏移量k是可选参数）
np.eye(3,k=1)
np.eye(3,k=-1)

#np.diag()函数：创建对角线是任意一维数组的矩阵（可使用可选关键字k来设置对角线的偏移量）
np.diag(np.arange(0,20,5))
```



**用于生成数组的常用函数**

- np.array：使用类数组对象创建数组，例如(嵌套的)python列表、可迭代序列或其他的ndarray实例 
- np.zeros：创建指定维度和数据类型的数组，以0填充。 
- np.ones：创建指定维度和数据类型的数组，以1填充。 
- np.diag：创建对家数组，指定对角线的值，其他以0填充。 
- np.arange：创建均匀间隔的数组，指定开始值、结束值、以及增量值。 
- np.linspace：创建均匀间隔数值的数组，指定开始值、结束值以及元素数量。 
- np.logspace：创建等比数列，指定开始值和结束值。 
- np.meshgrid：从一维坐标向量生成坐标矩阵（和高维坐标数组） 
- np.fromfunction：创建一个二维数组，用给定函数的值进行填充，该函数将针对给定数组大小的每个索引 组合进行计算。 
- np.fromfile：借助二进制（或文本）文件中数据来创建数组。
- np.tofile,用于将 NumPy数组保存到磁盘上，后续可以使用np.fromfile进行读取。 
- np.genfromtxt,np.loadtxt：从文本文件（如CSV文件）读取数据以创建数组。np.genfromtxt 还支持处理缺失值。 
- np.random.rand：创建一个数组，元素来自于0和1之间均匀分布的随机数。也可以使用np.random模块中的 其他分布

！**numpy.array与array.array区别** 

NumPy的数组类称为ndarray，也被称为别名 array 。请注意， numpy.array这与标准Python库类不同 array.array ，后者仅处理⼀维数组且功能较少。 ndarray对象的重要属性是

#### 2. 数组的基本属性

NumPy Array 对象 

Numpy库的核心是表示同质数据的多维数组，同质数据指的是数组中的所有元素具有相同的数据类型。 Numpy中多维数组的主要数据结构是ndarray类。除了保存在数组中的数据，这种数据结果还可以包含 数据的重要元数据，例如shap，size,数据类型及其他属性。Ndarry类的基本属性及说明

- Shap：包含数组的每个维度的元素数量（长度）的元组 
- Size：数组中的元素的总数 
- Ndim：维度的数量 
- Nbytes：存储数据的字节数 
- Dtype：数组中元素的数据类型
- Itemsize：数组中每个元素的大小（以字节为单位）

```python
import numpy as np
# 创建数组
arr = np.random.randint(0,100,size = (3,4,5))
arr.ndim # 输出 3

arr.shape# 输出 (3,4,5)

arr.size # 输出 3*4*5 = 60

arr.dtype # 输出 dtype('int64')

dtype=complex# 复数

arr.itemsize #输出是 8 ，因为数据类型是int64， 64位，⼀个字节是8位，所以64/8 = 8
```

#### 3. ⽂件IO操作

##### 3.1保存数组

`np.save()` 方法将数组保存到磁盘上。保存ndarray到⼀个.npy⽂件，也可以使⽤savez将多个array保存到⼀个.npz⽂件中

```python
import numpy as np
x = np.random.randn(5)
y = np.arange(0,10,1)

#save⽅法可以存⼀个ndarray
np.save("x_arr",x)

#如果要存多个数组，要是⽤ savez⽅法，保存时以key-value形式保存，  key任意(xarr、yarr)
np.savez("some_array.npz",xarr = x,yarr=y)
```

##### 3.2 读取

`numpy.load()` 方法从磁盘中加载数组。读取存储的数组，如果是 .npz⽂件的话，读取之后相当于形成了⼀个key-value类型的变量， 通过保存时定义的key来获取相应的array

```python
np.load("x_arr.npy")# 直接加载

# 通过key获取数组数据
np.load("some_array.npz")["yarr"]
```

##### 3.3 读写csv 、txt⽂件

 ```python
 arr = np.random.randint(0,10,size = (3,4))
 #储存数组到txt⽂件
 np.savetxt("arr.csv",arr,delimiter= ',') 
 
 # ⽂件后缀是txt也是⼀样的#读取txt⽂件， delimiter为分隔符，  dtype为数据类
 np.loadtxt("arr.csv",delimiter=',',dtype=np.int32)
 ```

### 二、数据类型

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

### 三、数组运算

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

### 四、复制和视图

完全没有复制

```python
import numpy as np
a = np.random.randint(0,100,size = (4,5))
b = a
a is b # 返回True a和b是两个不同名字对应同一个内存对象
b[0,0] = 1024 # 命运共同体
display(a,b)
```

查看或浅拷贝

不同的数组对象可以共享相同的数据。该view⽅法创建⼀个查看相同数据的新数组对象

```python
import numpy as np
a = np.random.randint(0,100,size = (4,5))
b = a.view() # 使⽤ a中的数据创建⼀个新数组对象
a is b # 返回False a和b是两个不同名字对应同⼀个内存对象
b.base is a # 返回True，b视图的根数据和a⼀样
b.flags.owndata # 返回False b中的数据不是其⾃⼰的
a.flags.owndata # 返回True a中的数据是其⾃⼰的
b[0,0] = 1024 # a和b的数据都发⽣改变
display(a,b)
```

深拷贝

```python
import numpy as np
a = np.random.randint(0,100,size = (4,5))
b = a.copy()
b is a # 返回False
b.base is a # 返回False
b.flags.owndata # 返回True
a.flags.owndata # 返回True
b[0,0] = 1024 # b改变，  a不变，分道扬镳
display(a,b)
```

![img](file:///C:\Users\20840\AppData\Local\Temp\ksohtml9432\wps2.jpg)  copy应该在不再需要原来的数组情况下，切⽚后调⽤。例如，假设a是⼀个巨⼤的中间结果，⽽最

终结果b仅包含的⼀⼩部分a，则在b使⽤切⽚进⾏构造时应制作⼀个深拷贝：

```python
import numpy as np
a = np.arange(1e8)
b = a[::1000000].copy() #每100万个数据中取一个数据
a is b # 返回True a和b是两个不同名字对应同一个内存对象
del a # 不在需要a，删除占大内存的a
b.shape # shape(100,)
```

### 五、 索引、切片和迭代

#### 第⼀节 基本索引和切⽚

numpy中数组切⽚是原始数组的视图，这意味着数据不会被复制，视图上任何数据的修改都会反映到原 数组上

```python
arr = np.array([0,1,2,3,4,5,6,7,8,9])
arr[5] #索引  输出  5
arr[5:8] #切⽚输出：  array([5, 6, 7])
arr[2::2] # 从索引2开始每两个中取⼀个  输出  array([2, 4, 6, 8])
arr[::3] # 不写索引默认从0开始，每3个中取⼀个  输出为  array([0, 3, 6, 9])
arr[1:7:2] # 从索引1开始到索引7结束，左闭右开，每2个数中取⼀个  输出  array([1, 3, 5]) arr[::-1] # 倒序  输出  array([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
arr[::-2] # 倒序  每两个取⼀个  输出    array([9, 7, 5, 3, 1])
arr[5:8]=12 # 切⽚赋值会赋值到每个元素上，与列表操作不同
temp = arr[5:8]
temp[1] = 1024
arr # 输出：  array([   0,    1,    2,    3,    4,   12, 1024,   12,    8,    9])
```

对于⼆维数组或者⾼维数组，我们可以按照之前的知识来索引，当然也可以传⼊⼀个以逗号隔开的索引 列表来选区单个或多个元素

 ```python
 arr2d = np.array([[1,3,5],[2,4,6],[-2,-7,-9],[6,6,6]]) # ⼆维数组  shape(3,4) 
 arr2d[0,-1] #索引  等于arr2d[0][-1] 输出  5
 arr2d[0,2]  #索引  等于arr2d[0][2] ==  arr2d[0][-1] 输出 5
 arr2d[:2,-2:] #切⽚  第⼀维和第⼆维都进⾏切⽚  等于arr2d[:2][:,1:]
 arr2d[:2,1:] #切⽚  1 == -2 ⼀个是正序，另个⼀是倒序，对应相同的位置
 # 输出：
 #array([[3, 5],#    [4, 6]])
 ```

#### 第⼆节 花式索引和索引技巧

![img](file:///C:\Users\20840\AppData\Local\Temp\ksohtml9432\wps4.jpg) 整数数组进⾏索引即花式索引,其和切⽚不⼀样，它总是将数据复制到新数组中

```python
import numpy as np
#⼀维
arr1 = np.array([1,2,3,4,5,6,7,8,9,10])
arr2 = arr1[[1,3,3,5,7,7,7]] # 输出  array([2, 4, 4, 6, 8, 8, 8])
arr2[-1] = 1024 # 修改值，不影响arr1
#⼆维
arr2d = np.array([[1,3,5,7,9],[2,4,6,8,10],[12,18,22,23,37],
[123,55,17,88,103]]) #shape(4,5)
arr2d[[1,3]] # 获取第⼆⾏和第四⾏，索引从0开始的所以1对应第⼆⾏
# 输出  array([[  2,   4,   6,   8,  10],
#					[123,  55,  17,  88, 103]])
arr2d[([1,3],[2,4])] # 相当于arr2d[1,2]获取⼀个元素,arr2d[3,4]获取另⼀个元素 # 输出为  array([  6, 103])
# 选择⼀个区域
arr2d[np.ix_([1,3,3,3],[2,4,4])] # 相当于  arr2d[[1,3,3,3]][:,[2,4,4]] arr2d[[1,3,3,3]][:,[2,4,4]]
# ix_()函数可⽤于组合不同的向量
# 第⼀个列表存的是待提取元素的⾏标，第⼆个列表存的是待提取元素的列标 # 输出为
# array([[  6,  10,  10],
#        [ 17, 103, 103],
#        [ 17, 103, 103],
#        [ 17, 103, 103]])
```

boolean值索引

```python
names =np.array([ 'softpo', 'Brandon', 'Will', 'Michael', 'Will', 'Ella', 'Daniel', 'softpo', '
Will', 'Brandon'])
cond1 = names == 'Will'
cond1
# 输出array([False, False,  True, False,  True, False, False, False,  True,False])
names[cond1] # array(['Will', 'Will', 'Will'], dtype='<U7')
arr = np.random.randint(0,100,size = (10,8)) # 0~100随机数
cond2 = arr > 90
# 找到所有⼤于90的索引，返回boolean类型的数组  shape(10,8)，⼤于返回True，否则False arr[cond2] # 返回数据全部是⼤于90的
```

### 六、 形状操作

#### 数组变形

```python
import numpy as np
arr1 = np.random.randint(0,10,size = (3,4,5))
arr2 = arr1.reshape(12,5) # 形状改变，返回新数组
arr3 = arr1.reshape(-1,5) # ⾃动“整形”，⾃动计算
```

#### 数组转置

```python
import numpy as np
arr1 = np.random.randint(0,10,size = (3,5)) # shape(3,5)
arr1.T # shape(5,3) 转置
arr2 = np.random.randint(0,10,size = (3,6,4)) # shape(3,6,4)
np.transpose(arr2,axes=(2,0,1)) # transpose改变数组维度  shape(4,3,6)
```

#### 数组堆叠

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

#### split数组拆分

```python
import numpy as np
arr = np.random.randint(0,10,size = (6,5)) # shape(6,5)
np.split(arr,indices_or_sections=2,axis = 0) # 在第⼀维(6)平均分成两份
np.split(arr,indices_or_sections=[2,3],axis = 1) # 在第⼆维(5)以索引2，  3为断点分割
成3份
np.vsplit(arr,indices_or_sections=3) # 在竖直⽅向平均分割成3份
np.hsplit(arr,indices_or_sections=[1,4]) # 在⽔平⽅向，以索引 1，  4为断点分割成3份
```

### 七、广播机制

当两个数组的形状并不相同的时候，我们可以通过扩展数组的⽅法来实现相加、相减、相乘等操作，这 种机制叫做⼴播(broadcasting)

#### ⼀维数组⼴播

```python
import numpy as np
arr1 = np.sort(np.array([0,1,2,3]*3)).reshape(4,3) #shape(4,3) 
arr2 = np.array([1,2,3]) # shape(3,)
arr3 = arr1 + arr2 # arr2进行广播复制4份  shape(4,3)
arr3
```

#### 二维数组的广播

```python
import numpy as np
arr1 =np.sort(np.array([0,1,2,3]*3)).reshape(4,3) # shape(4,3)
arr2 =np.array([[1],[2],[3],[4]]) # shape(4,1)
arr3 =arr1 + arr2 # arr2 进行广播复制3份  shape(4,3)
arr3
```

#### 三维数组⼴播

```python
import numpy as np
arr1 =np.array([0,1,2,3,4,5,6,7]*3).reshape(3,4,2) #shape(3,4,2) 
arr2 =np.array([0,1,2,3,4,5,6,7]).reshape(4,2) #shape(4,2) 
arr3 = arr1 + arr2 # arr2数组在0维上复制3份  shape(3,4,2)
arr3
```

### 八、通用函数

### 第⼀节 通⽤函数：元素级数字函数

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

#### 第⼆节 where函数

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

#### 第三节 排序方法

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

#### 第四节 集合运算函数

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

#### 第五节 数学和统计函数

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

### 九、线性代数

矩阵乘积

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

C = A.dot(B)
print(C)
```

#### 矩阵其他计算

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

### 十、实战-用NumPy分析鸢尾花花萼属性各项指标

案列：读取iris数据集中的花萼⻓度数据(已保存为csv格式)

并对其进⾏排序、去重，并求出和、累积和、均值、标准差、⽅差、最⼩值、最⼤值。

```python
import numpy as np  # 导⼊类库  numpy
data = np.loadtxt( './iris.csv',delimiter = ',')  # 读取数据⽂件，  data是⼆维的数组 data.sort(axis = -1)  # 简单排序
print( '简单排序后：   ', data)
print('数据去重后：   ', np.unique(data)) # 去除重复数据
print('数据求和：   ', np.sum(data))  # 数组求和
print('元素求累加和 ', np.cumsum(data))  # 元素求累加和
print( '数据的均值：   ', np.mean(data))  # 均值
print('数据的标准差：   ', np.std(data))  # 标准差
print( '数据的⽅差：   ', np.var(data))  # ⽅差
print('数据的最⼩值：   ', np.min(data))  # 最⼩值
print('数据的最⼤值：   ', np.max(data))  # 最⼤值
```

