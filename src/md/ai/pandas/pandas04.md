# 四、数据输入与输出

## csv

```python
import numpy as np
import pandas as pd
df = DataFrame(data = np.random.randint(0,50,size = [50,5]), # 薪资情况
               columns=['IT','化⼯','⽣物','教师','⼠兵'])
# 保存到当前路径下，⽂件命名是：salary.csv。csv逗号分割值⽂件格式
df.to_csv('./salary.csv',
          sep = ';', # ⽂本分隔符，默认是逗号
          header = True,# 是否保存列索引
          index = True) # 是否保存⾏索引，保存⾏索引，⽂件被加载时，默认⾏索引会作为⼀列
# 加载
pd.read_csv('./salary.csv',
            sep = ';',# 默认是逗号
            header = [0],#指定列索引
            index_col=0) # 指定⾏索引
pd.read_table('./salary.csv', # 和read_csv类似，读取限定分隔符的⽂本⽂件
              sep = ';',
              header = [0],#指定列索引
              index_col=1) # 指定⾏索引,IT作为⾏索引
```

## Excel

```python
import numpy as np
import pandas as pd
df1 = pd.DataFrame(data = np.random.randint(0,50,size = [50,5]), # 薪资情况
                   columns=['IT','化⼯','⽣物','教师','⼠兵'])
df2 = pd.DataFrame(data = np.random.randint(0,50,size = [150,3]),# 计算机科⽬的考
                   试成绩
                   columns=['Python','Tensorflow','Keras'])
# 保存到当前路径下，⽂件命名是：salary.xls
df1.to_excel('./salary.xls',
             sheet_name = 'salary',# Excel中⼯作表的名字
             header = True,# 是否保存列索引
             index = False) # 是否保存⾏索引，保存⾏索引
pd.read_excel('./salary.xls',
              sheet_name=0,# 读取哪⼀个Excel中⼯作表，默认⼀个
              header = 0,# 使⽤⼀⾏数据作为列索引
              names = list('ABCDE'),# 替换⾏索引
              index_col=1)# 指定⾏索引，B作为⾏索引
# ⼀个Excel⽂件中保存多个⼯作表
with pd.ExcelWriter('./data.xlsx') as writer:
    df1.to_excel(writer,sheet_name='salary',index = False)
    df2.to_excel(writer,sheet_name='score',index = False)

```

## SQL

pip install sqlalchemy -i https://pypi.tuna.tsinghua.edu.cn/simple 

pip install pymysql -i https://pypi.tuna.tsinghua.edu.cn/simple

```python
import pandas as pd
# SQLAlchemy是Python编程语⾔下的⼀款开源软件。提供了SQL⼯具包及对象关系映射（ORM）⼯具
from sqlalchemy import create_engine
df = pd.DataFrame(data = np.random.randint(0,50,size = [150,3]),# 计算机科⽬的考试
                  成绩

                  conn,# 数据库连接
                  if_exists='append')#如果表名存在，追加数据
# 从数据库中加载
pd.read_sql('select * from score limit 10', # sql
            columns=['Python','Tensorflow','Keras'])
# 数据库连接
conn = create_engine('mysql+pymysql://root:123456@localhost/pandas?
                     charset=UTF8MB4')
                     # 保存到数据库
                     df.to_sql('score',#数据库中表名
                               查询语句
                               conn, # 数据库连接
                               index_col='Python') # 指定⾏索引名

```

## HDF5

pip install tables -i https://pypi.tuna.tsinghua.edu.cn/simple 

HDF5是⼀个独特的技术套件，可以管理⾮常⼤和复杂的数据收集。 

HDF5，可以存储不同类型数据的⽂件格式，后缀通常是.h5，它的结构是层次性的。 

⼀个HDF5⽂件可以被看作是⼀个组包含了各类不同的数据集。



对于HDF5⽂件中的数据存储，有两个核⼼概念：group 和 dataset dataset 代表数据集，⼀个⽂件当中可以存放不同种类的数据集，这些数据集如何管理，就⽤到了group 最直观的理解，可以参考我们的⽂件管理系统，不同的⽂件位于不同的⽬录下。 ⽬录就是HDF5中的group, 描述了数据集dataset的分类信息，通过group 有效的将多种dataset 进⾏管 理和区分；⽂件就是HDF5中的dataset, 表示的是具体的数据

```python
import numpy as np
import pandas as pd
df1 = pd.DataFrame(data = np.random.randint(0,50,size = [50,5]), # 薪资情况
                   columns=['IT','化⼯','⽣物','教师','⼠兵'])
df2 = pd.DataFrame(data = np.random.randint(0,50,size = [150,3]),# 计算机科⽬的考
                   试成绩
                   columns=['Python','Tensorflow','Keras'])
# 保存到当前路径下，⽂件命名是：data.h5
df1.to_hdf('./data.h5',key='salary') # 保存数据的key，标记
df2.to_hdf('./data.h5',key = 'score')
pd.read_hdf('./data.h5',
            key = 'salary')#获取指定的标记、key的数据

```
