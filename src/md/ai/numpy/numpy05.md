# 五、复制和视图

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
