# 六、常用视图

## 折线图

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.random.randint(0,10,size = 15)
# 一图多线
plt.figure(figsize=(9,6))
plt.plot(x,marker = '*',color = 'r')
plt.plot(x.cumsum(),marker = 'o')
# 多图布局
fig,axs = plt.subplots(2,1)
fig.set_figwidth(9)
fig.set_figheight(6)
axs[0].plot(x,marker = '*',color = 'red')
axs[1].plot(x.cumsum(),marker = 'o')
```

## 柱状图

```python
import numpy as np
import matplotlib.pyplot as plt
labels = ['G1', 'G2', 'G3', 'G4', 'G5','G6'] # 级别
men_means = np.random.randint(20,35,size = 6)
women_means = np.random.randint(20,35,size = 6)
men_std = np.random.randint(1,7,size = 6)
women_std = np.random.randint(1,7,size = 6)
width = 0.35
plt.bar(labels, # 横坐标
        men_means, # 柱高
        width, # 线宽
        yerr=4, # 误差条
        label='Men')#标签
plt.bar(labels, women_means, width, yerr=2, bottom=men_means,
        label='Women')
plt.ylabel('Scores')
plt.title('Scores by group and gender')
plt.legend()
```

分组带标签柱状图

```python
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
labels = ['G1', 'G2', 'G3', 'G4', 'G5','G6'] # 级别
men_means = np.random.randint(20,35,size = 6)
women_means = np.random.randint(20,35,size = 6)
x = np.arange(len(men_means))
plt.figure(figsize=(9,6))
rects1 = plt.bar(x - width/2, men_means, width) # 返回绘图区域对象
rects2 = plt.bar(x + width/2, women_means, width)
# 设置标签标题，图例
plt.ylabel('Scores')
plt.title('Scores by group and gender')
plt.xticks(x,labels)
plt.legend(['Men','Women'])
# 添加注释
def set_label(rects):
    for rect in rects:
        height = rect.get_height() # 获取高度
        plt.text(x = rect.get_x() + rect.get_width()/2, # 水平坐标
                 y = height + 0.5, # 竖直坐标
                 s = height, # 文本
                 ha = 'center') # 水平居中
        set_label(rects1)
        set_label(rects2)
        plt.tight_layout() # 设置紧凑布局
        plt.savefig('./分组带标签柱状图.png')
```

## 极坐标图

极坐标线形图

```python
import numpy as np
import matplotlib.pyplot as plt
r = np.arange(0, 4*np.pi, 0.01) # 弧度值
y = np.linspace(0,2,len(r)) # 目标值
ax = plt.subplot(111,projection = 'polar',facecolor = 'lightgreen') # 定义极坐标
ax.plot(r, y,color = 'red')
ax.set_rmax(3) # 设置半径最大值
ax.set_rticks([0.5, 1, 1.5, 2]) # 设置半径刻度
ax.set_rlabel_position(-22.5) # 设置半径刻度位置
ax.grid(True) # 网格线
ax.set_title("A line plot on a polar axis", va='center',ha = 'center',pad = 30)
```

极坐标柱状图

```python
import numpy as np
import matplotlib.pyplot as plt
N = 8 # 分成8份
theta = np.linspace(0.0, 2 * np.pi, N, endpoint=False)
radii = np.random.randint(3,15,size = N)
width = np.pi / 4
colors = np.random.rand(8,3) # 随机生成颜色
ax = plt.subplot(111, projection='polar') # polar表示极坐标
ax.bar(theta, radii, width=width, bottom=0.0,color = colors)
```

## 直方图

```python
import numpy as np
import matplotlib.pyplot as plt
mu = 100 # 平均值
sigma = 15 # 标准差
x = np.random.normal(loc = mu,scale = 15,size = 10000)
fig, ax = plt.subplots()
n, bins, patches = ax.hist(x, 200, density=True) # 直方图
# 概率密度函数
y = ((1 / (np.sqrt(2 * np.pi) * sigma)) *
     np.exp(-0.5 * (1 / sigma * (bins - mu))**2))
plt.plot(bins, y, '--')
plt.xlabel('Smarts')
plt.ylabel('Probability density')
plt.title(r'Histogram of IQ: $\mu=100$, $\sigma=15$')
# 紧凑布局
fig.tight_layout()
plt.savefig('./直方图.png')
```

## 箱形图

```python
import numpy as np
import matplotlib.pyplot as plt
data=np.random.normal(size=(500,4))
lables = ['A','B','C','D']
# 用Matplotlib画箱线图
plt.boxplot(data,1,'gD',labels=lables) # 红色的圆点是异常值
```

## 散点图

散点图的英文叫做 scatter plot，它将两个变量的值显示在二维坐标中，非常适合展示两个变量之间的关系

```python
import numpy as np
import matplotlib.pyplot as plt
data = np.random.randn(100,2)
s = np.random.randint(100,300,size = 100)
color = np.random.randn(100)
plt.scatter(data[:,0], # 横坐标
            data[:,1], # 纵坐标
            s = s, # 尺寸
            c = color, # 颜色
            alpha = 0.5) # 透明度
```

## 饼图

一般饼图

```python
import numpy as np
import matplotlib.pyplot as plt
# 解决中文字体乱码的问题
matplotlib.rcParams['font.sans-serif']='Kaiti SC'
labels =["五星","四星","三星","二星","一星"] # 标签
percent = [95,261,105,30,9] # 某市星级酒店数量
# 设置图片大小和分辨率
fig=plt.figure(figsize=(5,5), dpi=150)
# 偏移中心量，突出某一部分
explode = (0, 0.1, 0, 0, 0)
# 绘制饼图：autopct显示百分比，这里保留一位小数；shadow控制是否显示阴影
plt.pie(x = percent, # 数据
        explode=explode, # 偏移中心量
        labels=labels, # 显示标签
        autopct='%0.1f%%', # 显示百分比
        shadow=True) # 阴影，3D效果
plt.savefig("./饼图.jpg")
```

嵌套饼图

```python
fig=plt.figure(figsize=(5,5),dpi=100)
#数据集，p1, p2分别对应外部、内部百分比例
p1=[43,25,32]
p2=[7,22,14,5,14,6,32]
labels = ['小狗','小猫','小鸟']
def func(pct):
    return r'%0.1f'%(pct) + '%'
plt.pie(p1,
        autopct=lambda pct: func(pct),
        radius=1, # 半径
        pctdistance=0.85, # 百分比位置
        wedgeprops=dict(linewidth=3,width=0.4,edgecolor='w'),# 饼图格式：间隔线宽、饼图宽度、边
        界颜色
        labels=labels)
# 绘制内部饼图
plt.pie(p2,
        autopct='%0.1f%%',
        radius=0.7,
        pctdistance=0.7,
        wedgeprops=dict(linewidth=3,width=0.7,edgecolor='w'))
# 设置图例标题、位置，frameon控制是否显示图例边框，bbox_to_anchor控制图例显示在饼图的外面
plt.legend(labels,loc = 'upper right',bbox_to_anchor = (0.75,0,0.4,1),title = '宠物占比')

```

甜甜圈

```python
import numpy as np
import matplotlib.pyplot as plt
plt.figure(figsize=(6,6))
# 甜甜圈原料
recipe = ["225g flour",
          "90g sugar",
          "1 egg",
          "60g butter",
          "100ml milk",
          "1/2package of yeast"]
# 原料比例
data = [225, 90, 50, 60, 100, 5]
wedges, texts = plt.pie(data,startangle=40)
bbox_props = dict(boxstyle="square,pad=0.3", fc="w", ec="k", lw=0.72)
kw = dict(arrowprops=dict(arrowstyle="-"),
          bbox=bbox_props,va="center")
for i, p in enumerate(wedges):
    ang = (p.theta2 - p.theta1)/2. + p.theta1 # 角度计算
    # 角度转弧度----->弧度转坐标
    y = np.sin(np.deg2rad(ang))
    x = np.cos(np.deg2rad(ang))
    ha = {-1: "right", 1: "left"}[int(np.sign(x))] # 水平对齐方式
    connectionstyle = "angle,angleA=0,angleB={}".format(ang) # 箭头连接样式
    kw["arrowprops"].update({"connectionstyle": connectionstyle}) # 更新箭头连接方式
    plt.annotate(recipe[i], xy=(x, y), xytext=(1.35*np.sign(x), 1.4*y),
                 ha=ha,**kw,fontsize = 18,weight = 'bold')
    plt.title("Matplotlib bakery: A donut",fontsize = 18,pad = 25)
    plt.tight_layout()
```

## 热力图

```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
vegetables = ["cucumber", "tomato", "lettuce", "asparagus","potato", "wheat", "barley"]
farmers = list('ABCDEFG')
harvest = np.random.rand(7,7)*5 # 农民丰收数据
plt.rcParams['font.size'] = 18
plt.rcParams['font.weight'] = 'heavy'
plt.figure(figsize=(9,9))
im = plt.imshow(harvest)
plt.xticks(np.arange(len(farmers)),farmers,rotation = 45,ha = 'right')
plt.yticks(np.arange(len(vegetables)),vegetables)
# 绘制文本
for i in range(len(vegetables)):
    for j in range(len(farmers)):
        text = plt.text(j, i, round(harvest[i, j],1),
                        ha="center", va="center", color='r')
        plt.title("Harvest of local farmers (in tons/year)",pad = 20)
        fig.tight_layout()
        plt.savefig('./热力图.png')
```

## 面积图

```python
import matplotlib.pyplot as plt
plt.figure(figsize=(9,6))
days = [1,2,3,4,5]
sleeping =[7,8,6,11,7]
eating = [2,3,4,3,2]
working =[7,8,7,2,2]
playing = [8,5,7,8,13]
plt.stackplot(days,sleeping,eating,working,playing)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Stack Plot',fontsize = 18)
plt.legend(['Sleeping','Eating','Working','Playing'],fontsize = 18)
```

## 蜘蛛图

```python
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams['font.family'] = 'Kaiti SC'
labels=np.array(["个人能力","IQ","服务意识","团队精神","解决问题能力","持续学习"])
stats=[83, 61, 95, 67, 76, 88]
# 画图数据准备，角度、状态值
angles=np.linspace(0, 2*np.pi, len(labels), endpoint=False)
stats=np.concatenate((stats,[stats[0]]))
angles=np.concatenate((angles,[angles[0]]))
# 用Matplotlib画蜘蛛图
fig = plt.figure(figsize=(9,9))
ax = fig.add_subplot(111, polar=True)
ax.plot(angles, stats, 'o-', linewidth=2) # 连线
ax.fill(angles, stats, alpha=0.25) # 填充
# 设置角度
ax.set_thetagrids(angles*180/np.pi,#角度值
                  labels,
                  fontsize = 18)
ax.set_rgrids([20,40,60,80],fontsize = 18)
```

