# 十六、 实战

-数据分析师招聘数据分析

## 分析目标

- 各城市对数据分析岗位的需求情况
- 不同细分领域对数据分析岗的需求情况
- 数据分析岗位的薪资状况
- 工作经验与薪水的关系
- 公司都要求什么掌握什么技能
- 岗位的学历要求高吗
- 不同规模的企业对工资经验的要求以及提供的薪资水平

## 数据加载

```python
import pandas as pd
import numpy as np
job = pd.read_csv('./lagou2020.csv')
job.drop_duplicates(inplace = True) # 删除重复数据
```

## 数据清洗

过滤⾮数据分析的岗位

```python
# 数据分析相应的岗位数量
cond = job["positionName"].str.contains("数据分析") # 职位名中含有数据分析字眼
的
# 筛选出我们想要的字段，并剔除positionName
job = job[cond]
job.reset_index(inplace=True) # ⾏索引 重置
job
```

拉勾⽹爬取下来的薪⽔是一个区间，这⾥⽤薪⽔区间的均值作为相应职位的薪⽔

```python
# 处理过程
#1、将salary中的字符串均⼩写化（因为存在8k-16k和8K-16K）
#2、运⽤正则表达式提取出薪资区间
#3、将提取出来的数字转化为int型
#4、取区间的平均值
job["salary"] = job["salary"].str.lower()\
.str.extract(r'(\d+)[k]-(\d+)k')\
.applymap(lambda x:int(x))\
.mean(axis=1)

```

从job_detail中提取出技能要求 将技能分为以下⼏类 Python SQL Tableau Excel SPSS/SAS 处理方式： 如果job_detail中含有上述五类，则赋值为1，不含有则为0

```python
job["job_detail"] = job["job_detail"].str.lower().fillna("") #将字符串⼩写
化，并将缺失值赋值为空字符串
job["Python"] = job["job_detail"].map(lambda x:1 if ('python' in x) else 0)
job["SQL"] = job["job_detail"].map(lambda x:1 if ('sql' in x) or ('hive' in
                                                                  x) else 0)
job["Tableau"] = job["job_detail"].map(lambda x:1 if 'tableau' in x else
                                       0)
job["Excel"] = job["job_detail"].map(lambda x:1 if 'excel' in x else 0)
job['SPSS/SAS'] = job['job_detail'].map(lambda x:1 if ('spss' in x) or
                                        ('sas' in x) else 0)
```

处理⾏业信息 在⾏业信息中有多个标签，对其进⾏处理，筛选最显著的⾏业标签。

```python
def clean_industry(industry):
    industry = industry.split(",")
    if industry[0]=="移动互联⽹" and len(industry)>1:
        return industry[1]
    else:
        return industry[0]
    job["industryField"] = job.industryField.map(clean_industry)

```

拉勾⽹数据分析师职位的数据预处理基本完成，后续使⽤matplotlib进⾏数据可视化分析。