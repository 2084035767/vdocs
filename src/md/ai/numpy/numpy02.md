# 二、基本操作

## 2.1 数组创建

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
# 初始化数组
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


# 填充数组
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

## 2.2 数组的基本属性

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

## 2.3 文件IO操作

### 保存数组

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

### 读取

`numpy.load()` 方法从磁盘中加载数组。读取存储的数组，如果是 .npz⽂件的话，读取之后相当于形成了⼀个key-value类型的变量， 通过保存时定义的key来获取相应的array

```python
np.load("x_arr.npy")# 直接加载

# 通过key获取数组数据
np.load("some_array.npz")["yarr"]
```

### 读写csv 、txt⽂件

 ```python
arr = np.random.randint(0,10,size = (3,4))
#储存数组到txt⽂件
np.savetxt("arr.csv",arr,delimiter= ',') 

# ⽂件后缀是txt也是⼀样的#读取txt⽂件， delimiter为分隔符，  dtype为数据类
np.loadtxt("arr.csv",delimiter=',',dtype=np.int32)
 ```
