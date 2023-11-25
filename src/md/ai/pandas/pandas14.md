# 十四、 时间序列

## 时间戳操作

```python
# 1、创建方法
pd.Timestamp('2020-8-24 12')# 时刻数据
pd.Period('2020-8-24',freq = 'M') # 时期数据
index = pd.date_range('2020.08.24',periods=5,freq = 'M') # 批量时刻数据
pd.period_range('2020.08.24',periods=5,freq='M') # 批量时期数据
ts = pd.Series(np.random.randint(0,10,size = 5),index = index) # 时间戳索引Series
# 2、转换方法
pd.to_datetime(['2020.08.24','2020-08-24','24/08/2020','2020/8/24'])
pd.to_datetime([1598582232],unit='s')
dt = pd.to_datetime([1598582420401],unit = 'ms') # 世界标准时间
dt + pd.DateOffset(hours = 8) # 东⼋区时间
dt + pd.DateOffset(days = 100) # 100天后⽇期
```

## 时间戳索引

```python
index = pd.date_range("2020-8-24", periods=200, freq="D")
ts = pd.Series(range(len(index)), index=index)
# str类型索引
ts['2020-08-30'] # ⽇期访问数据
ts['2020-08-24':'2020-09-3'] # ⽇期切⽚
ts['2020-08'] # 传入年⽉
ts['2020'] # 传入年
# 时间戳索引
ts[pd.Timestamp('2020-08-30')]
ts[pd.Timestamp('2020-08-24'):pd.Timestamp('2020-08-30')] # 切⽚
ts[pd.date_range('2020-08-24',periods=10,freq='D')]
# 时间戳索引属性
ts.index.year # 获取年
ts.index.dayofweek # 获取星期⼏
ts.index.weekofyear # 一年中⼏个星期⼏
```

## 时间序列常⽤方法

在做时间序列相关的⼯作时，经常要对时间做一些移动/滞后、频率转换、采样等相关操作，我们来看下 这些操作如何使⽤

```python
index = pd.date_range('8/1/2020', periods=365, freq='D')
ts = pd.Series(np.random.randint(0, 500, len(index)), index=index)
# 1、移动
ts.shift(periods = 2) # 数据后移
ts.shift(periods = -2) # 数据前移
# ⽇期移动
ts.shift(periods = 2,freq = pd.tseries.offsets.Day()) # 天移动
ts.tshift(periods = 1,freq = pd.tseries.offsets.MonthOffset()) #⽉移动
# 2、频率转换
ts.asfreq(pd.tseries.offsets.Week()) # 天变周
ts.asfreq(pd.tseries.offsets.MonthEnd()) # 天变⽉
ts.asfreq(pd.tseries.offsets.Hour(),fill_value = 0) #天变⼩时，⼜少变多，
fill_value为填充值
# 3、重采样
# resample 表示根据⽇期维度进⾏数据聚合，可以按照分钟、⼩时、⼯作⽇、周、⽉、年等来作为⽇期维
度
ts.resample('2W').sum() # 以2周为单位进⾏汇总
ts.resample('3M').sum().cumsum() # 以季度为单位进⾏汇总
# 4、DataFrame重采样
d = dict({'price': [10, 11, 9, 13, 14, 18, 17, 19],
          'volume': [50, 60, 40, 100, 50, 100, 40, 50],
          'week_starting':pd.date_range('24/08/2020',periods=8,freq='W')})
df1 = pd.DataFrame(d)
df1.resample('M',on = 'week_starting').apply(np.sum)
df1.resample('M',on = 'week_starting').agg({'price':np.mean,'volume':np.sum})
days = pd.date_range('1/8/2020', periods=4, freq='D')
data2 = dict({'price': [10, 11, 9, 13, 14, 18, 17, 19],
              'volume': [50, 60, 40, 100, 50, 100, 40, 50]})
df2 = pd.DataFrame(data2,
                   index=pd.MultiIndex.from_product([days,
                                                     ['morning','afternoon']]))
df2.resample('D', level=0).sum()
```

## 时区表示

```python
index = pd.date_range('8/1/2012 00:00', periods=5, freq='D')
ts = pd.Series(np.random.randn(len(index)), index)
import pytz
pytz.common_timezones # 常⽤时区
# 时区表示
ts = ts.tz_localize(tz='UTC')
# 转换成其它时区
ts.tz_convert(tz = 'Asia/Shanghai')

```
