# OpenCV

## 一、简介

### 1.1 OpenCV是什么？

OpenCV是一个基于BSD许可（开源）发行的跨平台计算机视觉库，可以运行在Linux、Windows、Android和Mac OS操作系统上。它轻量级而且高效——由一系列 C 函数和少量 C++ 类构成，同时提供了Python、Ruby、MATLAB等语言的接口，实现了图像处理和计算机视觉方面的很多通用算法。 OpenCV用C++语言编写，它的主要接口也是C++语言，但是依然保留了大量的C语言接口。

在计算机视觉项目的开发中，OpenCV作为较大众的开源库，拥有了丰富的常用图像处理函数库，采用C/C++语言编写，可以运行在Linux/Windows/Mac等操作系统上，能够快速的实现一些图像处理和识别的任务。此外，OpenCV还提供了Java、python、cuda等的使用接口、机器学习的基础算法调用，从而使得图像处理和图像分析变得更加易于上手，让开发人员更多的精力花在算法的设计上。

### 1.2 OpenCV的功能和应用领域



### 1.3 安装OpenCV



安装 opencv-python

::: code-tabs#opencv

@tab pip

```pip
pip install opencv-python
```

@tab conda 

```conda
conda install opencv
```

:::



安装测试

查看 OpenCV 的版本

```python
print(cv2.__version__)
```



## 二、图像处理基础

### 2.1 图像的基本操作

#### 图像加载和保存

彩色图是以 RGB(红-绿-蓝，Red-Green-Blue) 颜色模式显示的，而 OpenCV 中彩色图是**以 B-G-R 通道顺序存储**的，灰度图只有一个通道。



**加载图片**

`retval=cv2.imread(filename[,flags])`

- `retval`：返回值，其值是读到的图像。如果未读到图像，则返回“None”。
- `filename`：图像的路径。
- `flag`：读取标记，省略即采用默认值。

|                        | 含义                                              | 数值 |
| ---------------------- | :------------------------------------------------ | :--- |
| `cv2.IMREAD_UNCHANGED` | 包含透明通道的彩色图，原格式。                    | -1   |
| `cv2.IMREAD_GRAYSCALE` | 灰度图。                                          | 0    |
| `cv2.IMREAD_COLOR`     | 彩色图，默认值。                                  | 1    |
|                        | 图像深度为16 or 32返回灰度图像，否则转换为8位图像 | 2    |
|                        | 以任何可能颜色格式读取图像                        | 4    |

```python
import cv2
#读取图像，支持 bmp、jpg、png、tiff 等常用格式
img = cv2.imread('lena.png',0)
```



**显示图片**

`cv2.imshow(winname,img)`

- `winname`：窗口的名称。不同窗口之间用窗口名区分。
- `img`：加载获取的图像。

> 注意：使用`cv2.imshow()`显示图片，窗口会自适应图片的大小。

```python
cv2.imshow('lena', img)
cv2.waitKey(0)
```



`cv2.waitKey()`是让程序暂停的意思，参数是等待时间（毫秒 ms）。传入 0 的话表示一直等待。等待期间也可以获取用户的按键输入：`k = cv2.waitKey(0)`



`cv2.namedWindow()`创建一个窗口，之后再显示图片：

```python
# 先定义窗口，后显示图片
cv2.namedWindow('lena2', cv2.WINDOW_NORMAL)
cv2.imshow('lena2', img)
cv2.waitKey(0)
```

`cv2.namedWindow(winname, [,flags])`

- `winname`：窗口的名称。
- `flags`：
  - `cv2.WINDOW_AUTOSIZE`，表示窗口大小自适应图片（默认值）。
  - `cv2.WINDOW_NORMAL`，表示窗口大小可调整。图片比较大的时候，可以考虑用。



**保存图片**
`retval=cv2.imwrite(filename,img[,params])`

- `retval`：返回值，保存成功返回True，否则返回False
- `filename`：是要保存的图像的完整路径名。

```python
cv2.imwrite('lena_gray.jpg', img)
```



**获取和修改像素点值**

通过行列的坐标来获取某像素点的值，彩色图：是（B,G,R）三个值的列表；灰度图或单通道图：只有一个值。

> 注意：行对应 y，列对应 x，所以其实是`img[y, x]`。

```python
(b,g,r) = img[100, 90]
print(b,g,r) # Output: 

px = img[100, 90]
print(px) # Output: [103 98 197]

# 只获取蓝色 blue 通道的值
px_blue = img[100, 90, 0]
print(px_blue) # Output: 103

# 修改像素的值
# 保存后原图被更改
img[100, 90] = [255, 255, 255]
print(img[100, 90]) # Output: [255 255 255]
```



> 经验之谈：还有一种性能更好的方式，获取：`img.item(100,100,0)`，修改：`img.itemset((100,100,0),255)`，但这种方式只能 B,G,R 逐一进行。



**图片属性**

| 属性        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `img.shape` | 获取图像的形状。彩色图：返回一个包含**行数（高度）、列数（宽度）和通道数**的元组；灰度图：只返回行数和列数。 |
| `img.dtype` | 获取图像数据类型。彩色图和灰度图都是`uint8`类型。（推荐对数据类型加以判断以健壮代码） |
| `img.size`  | 获取图像总像素数。                                           |
|             |                                                              |

```python
# 彩色图的形状中包括行数、列数和通道数
print(img.shape) # Output: (263, 247, 3)
height, width, channels = img.shape

# 灰色图的形状中包括行数和列数
print(img.shape) # Output: (263, 247)
height, width = img.shape

# 获取图像数据类型。
print(img.dtype) # Output: uint8

# 获取图像总像素数。
print(img.size) # Output: 263*247*3=194883
```



**ROI**

ROI（Region of Interest 感兴趣区域）比如我们要检测眼睛，因为眼睛肯定在脸上，所以我们感兴趣的只有脸这部分，其他都不 care，所以可以单独把脸截取出来，这样就可以大大节省计算量，提高运行速度。



截取 ROI 非常简单，指定图片的范围即可。

```python
# 截取脸部 ROI
face = img[100:200, 115:188]
cv2.imshow('face', face)
cv2.waitKey(0)
```



**通道分割与合并**

彩色图的 BGR 三个通道是可以分开单独访问的，也可以将单独的三个通道合并成一副图像。分别使用`cv2.split()`和`cv2.merge()`：

```python
b, g, r = cv2.split(img)
img = cv2.merge((b, g, r))
```



`split()`函数比较耗时，**更高效的方式是用 numpy 中的索引**，如提取 B 通道：

```python
b = img[:, :, 0]
cv2.imshow('blue', b)
cv2.waitKey(0)
```

#### 图片剪切

```python
import cv2
img = cv2.imread('image0.jpg',1)
imgInfo = img.shape
dst = img[100:200,100:300]
# 从X轴的100px到200px，y轴的100px到300px
cv2.imshow('image',img)
# 剪切前
cv2.imshow('image',dst)
# 剪切后
cv2.waitKey(0)
```

#### 图片移位

x,y是图片最终的坐标（x,y），x0，y0是图片原始坐标，∆x，∆y图片平移的大小，公式如下：
$$
\left\{\begin{matrix} x = x_0+\Delta x\\y = y_0+\Delta y\end{matrix}\right.
$$
`cv2.warpAffine(src,M,dsize[,dst[,flags[,borderMode[,borderValue]]]])`

参数:

- `SRC`：输入图像。
- `DST`：输出具有dsize大小和src相同类型的图像。 中号 2 × 3 变换矩阵。
- `DSIZE`：输出图像的大小。
- `flags`：插值方法的组合和可选标志WARP_INVERSE_MAP，这意味着M是逆变换（𝚍𝚜𝚝 → 𝚜𝚛𝚌 ）。
- `borderMode`：像素外插法; 当borderMode = BORDER_TRANSPARENT时，这意味着目标图像中与源图像中的“离群值”相对应的像素不会被该函数修改。
- `borderValue`：在边界不变的情况下使用的值; 默认情况下，它是0。

```python
import cv2
import numpy as np
img = cv2.imread('image0.jpg',1)
cv2.imshow('src',img)
imgInfo = img.shape
height = imgInfo[0]
width = imgInfo[1]

matShift = np.float32([[1,0,100],[0,1,200]])
dst = cv2.warpAffine(img,matShift,(height,width))
cv2.imshow('dst',dst)
# 平移图片
cv2.waitKey(0)
```



### 2.2 图像的色彩空间转换

#### 色彩空间转换



`cv2.cvtColor(img, flag)`用来进行颜色模型转换

- `img`：是要转换的图片，
- `flag`：是转换模式，
  - `COLOR_BGR2GRAY`表示 BGR->Gray。
  - `COLOR_BGR2HSV`表示 BGR->HSV

> 经验之谈：颜色转换其实是数学运算，如灰度化最常用的是：`gray=R*0.299+G*0.587+B*0.114`。

```python
import cv2

img = cv2.imread('lena.jpg')
# 转换为灰度图
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cv2.imshow('img', img)
cv2.imshow('gray', img_gray)
cv2.waitKey(0)
```



### 2.3 图像的滤波和平滑处理

#### 图像阈值处理（二值化）

- 阈值处理是指剔除图像内像素值高于阈值或者低于阈值得像素点。

- 阈值处理是一种常用的技术，可以将图像转换为二值图像，即只有两个像素值（一般为黑色和白色）。



**简单阈值处理（Simple Thresholding）**

- 简单阈值处理是一种基本的阈值处理方法。它将图像的每个像素与一个阈值进行比较，并根据比较结果将像素设置为两个值中的一个。
- 在图像中，越亮的地方值越大，超过阈值部分，赋值取`255`，相当于就是一个白点。否则的话就取零，因此小于阈值时我们就直接给它取零，相当于是一个黑的地方。

`cv2.threshold(input, thresh, maxval, type)`

参数说明

- `input`：输入图，只能输入单通道图像，通常来说为灰度图
- `thresh`： 阈值，一般为`127`。
- `maxval`：当像素值超过了阈值（或者小于阈值，根据type来决定），所赋予的值。一般情况下为`255`。
- `type`：二值化操作的类型，包含以下5种类型：
  - `cv2.THRESH_BINARY `：超过阈值部分取maxval（最大值），否则取0
  - `cv2.THRESH_BINARY_INV`：THRESH_BINARY的相反操作
  - `cv2.THRESH_TRUNC`：大于阈值部分设为阈值，其余不变
  - `cv2.THRESH_TOZERO `：大于阈值部分不变，否则设为0
  - `cv2.THRESH_TOZERO_INV`：THRESH_TOZERO的相反操作

```python
import cv2 # opencv读取的格式是BGR
import numpy as np
import matplotlib.pyplot as plt # Matplotlib是RGB
%matplotlib inline 
 
img=cv2.imread('yangqi.jpg') # 导入你要读取的图片路径
img_gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY) # 灰度图读取
img_gray.shape # Output: (238, 218) 可以看到此时的通道数为1

# 其中ret返回的是阈值
ret, thresh1 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY) # 超过127的取值为255，否则为0
ret, thresh2 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY_INV)# 超过127的取值为0，否则为255
ret, thresh3 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_TRUNC)# 超过阈值的设为阈值，否则不变
ret, thresh4 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_TOZERO)# 超过127的不变，否则为0
ret, thresh5 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_TOZERO_INV)# 超过127的为0，否则不变

titles = ['Original Image', 'BINARY', 'BINARY_INV', 'TRUNC', 'TOZERO', 'TOZERO_INV']
images = [img, thresh1, thresh2, thresh3, thresh4, thresh5]

for i in range(6):
    plt.subplot(2, 3, i + 1), plt.imshow(images[i], 'gray')
    plt.title(titles[i])
    plt.xticks([]), plt.yticks([])
plt.show()
```



**自适应阈值处理（Adaptive Thresholding）**

- 自适应阈值处理是一种根据图像局部区域的特性自动确定阈值的方法。它将图像分成若干个小区域，并根据每个区域内像素的统计信息来计算阈值。
- 通过自适应阈值处理，我们可以根据每个像素邻域内的统计信息来确定阈值，从而更好地适应不同区域之间的光照变化。
- 这对于处理具有不均匀光照条件的图像非常有用，例如图像中存在阴影或光源不均匀的情况。



`cv2.adaptiveThreshold(src, maxValue, adaptiveMethod, thresholdType, blockSize, C)`

- `src`：输入的灰度图像，单通道图像。
- `maxValue`：当像素超过阈值时，所设置的最大像素值。
- `adaptiveMethod`：自适应方法的类型。可以是以下两种之一：
  - `cv2.ADAPTIVE_THRESH_MEAN_C`：根据邻域块的均值计算阈值。
  - `cv2.ADAPTIVE_THRESH_GAUSSIAN_C`：根据邻域块的加权和的高斯平均值计算阈值。
- `thresholdType`：阈值处理的类型。可以是以下两种之一
  - `cv2.THRESH_BINARY`：超过阈值的像素被设置为 `maxValue`，否则设置为0。
  - `cv2.THRESH_BINARY_INV`：超过阈值的像素被设置为0，否则设置为 `maxValue`。
- `blockSize`：用于计算阈值的像素邻域大小。它必须是奇数，并且大于1。
- `C`：在计算阈值时的常数，用于对均值或加权和进行调整。

```python
thresh1 = cv2.adaptiveThreshold(img_gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,3,3) 
# 这里领域大小为3
thresh2 = cv2.adaptiveThreshold(img_gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY_INV,3,3)
# 这里领域大小为3

titles = ['Original Image', 'BINARY', 'BINARY_INV']
images = [img_gray, thresh1, thresh2]

for i in range(3):
    plt.subplot(1,3, i + 1), plt.imshow(images[i], 'gray')
    plt.title(titles[i])
    plt.xticks([]), plt.yticks([])
plt.show()
```



**Otsu's阈值处理**

`Otsu's`阈值处理是一种自动确定阈值的方法，它能够找到一个最佳的阈值，使得将图像分割为两个类别后的类别间方差最小化, 这种方法对于没有先验知识的图像分割非常有用。这对于具有不同光照条件、对比度变化或噪声存在的图像尤其有用。



`cv2.threshold()`

- `type`：二值化操作的类型
  - `cv2.THRESH_OTSU`：实现`Otsu's`阈值处理。

```python
# ret 是计算得到的最佳阈值，thresh 是通过应用 Otsu's 方法得到的二值图像。
ret, thresh = cv2.threshold(img_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

titles = ['Original Image', "Otsu's"]
images = [img_gray, thresh]

for i in range(2):
    plt.subplot(1,2, i + 1), plt.imshow(images[i], 'gray')
    plt.title(titles[i])
    plt.xticks([]), plt.yticks([])
plt.show()

ret # Output: 119.0 Otsu's 方法自动计算阈值为119，并将图像分为两个类别（黑色和白色）。
```



#### 平滑处理

- 图像去噪是一种信号滤波的方法，且是保留有用信号，去掉噪音信号。

- 处理图像时，对图像进行平滑处理，以减少噪声、去除细节或者模糊图像。它的具体计算有点类似卷积的计算。

```python
img = cv2.imread('lenaNoise.png')
cv2.imshow('Noise', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**均值滤波（Mean Filter）**

将每个像素的邻域像素的平均值作为该像素的新值。这种滤波器对于去除轻度噪声非常有效，但可能会导致图像变得模糊。

```python
# 均值滤波 使用 cv2.blur() 函数
blur = cv2.blur(img, (3, 3)) #使用3×3的滤波器
cv2.imshow('blur', blur)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**高斯滤波（Gaussian Filter）**

刚刚我们介绍的均值平衡是简单的求**算数平均**，而高斯平衡认为其邻域像素的权重不应该一样，越靠近中心的像素权重应该越重，且权重服从高斯分布，然后使用高斯权重来计算邻域像素的**加权平均值**。相比于均值滤波器，高斯滤波器能够更好地保留图像的细节信息。

```python
# 高斯滤波 使用 cv2.GaussianBlur() 函数
# 高斯模糊的卷积核里的数值是满足高斯分布，相当于更重视中间的
gaussian = cv2.GaussianBlur(img, (3,3), 1)  

cv2.imshow('gaussian', gaussian)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**中值滤波（Median Filter）**

中值滤波是一种非线性滤波器，它将每个像素的邻域像素的中值作为该像素的新值。这种滤波器对于去除椒盐噪声非常有效，同时能够保留图像边缘的细节。

```python
# 中值滤波 使用 cv2.medianBlur() 函数
# 相当于用中值代替
median = cv2.medianBlur(img, 3)  # 中值滤波

cv2.imshow('median', median)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 展示所有的
res = np.hstack((blur,gaussian,median))#按水平方向堆砌，三张图水平方向放一起

cv2.imshow('blur vs gaussian vs median', res)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



### 2.4 图像的边缘检测

假设我们想要计算出A点的梯度，我们可以发现A点位于边缘点，A点左边为黑色，右边为白色，而计算图像的梯度可以提取出图像中的边缘信息，我们常用的方法是使用`Sobel算子`或`Scharr算子`进行梯度计算。接下来我们分别来看看具体是如何做的



#### 边缘检测算子

#### Sobel算子

- Sobel算子有两个核，一个用于计算图像在水平方向上的差异（x方向梯度），另一个用于计算图像在垂直方向上的差异（y方向梯度）。这两个核可以在水平和垂直方向上检测出图像中的边缘信息。
- 在x方向为上，如果两边相差太大了，那么结果的绝对值也会比较大，说明应该在边缘点附近，如果两边值非常接近，则结果也会趋于0，此时说明不在边缘地附近。y方向也是同理。

Sobel算子的核矩阵
$$
G_x=\begin{bmatrix}
-1 & 0 & +1\\
-2 & 0 & +2\\
-1 & 0 & +1
\end{bmatrix}
\quad and \quad
G_y=\begin{bmatrix}
-1 & -2 & -1\\
0 & 0 & 0\\
+1 & +2 & +1
\end{bmatrix}
$$


`cv2.Sobel(src, ddepth, dx, dy, ksize)`函数

- `ddepth`：输出图像的深度（数据类型），一般我们指定为64位浮点数型，设为`CV_64F`
- `dx`和`dy`：分别表示水平和竖直方向
- `ksize`：Sobel算子的大小

```python
# 导入原始图
img = cv2.imread('pie.png',cv2.IMREAD_GRAYSCALE)
cv2.imshow("img",img)
cv2.waitKey()
cv2.destroyAllWindows()

# x方向计算梯度
# 定义图像展示函数
def cv_show(img,name):
    cv2.imshow(name,img)
    cv2.waitKey()
    cv2.destroyAllWindows()

sobelx = cv2.Sobel(img,cv2.CV_64F,1,0,ksize=3)
cv_show(sobelx,'sobelx')


sobelx = cv2.Sobel(img,cv2.CV_64F,1,0,ksize=3)
#实现将结果转换为无符号8位整数
sobelx = cv2.convertScaleAbs(sobelx)
cv_show(sobelx,'sobelx')


# 计算y方向的梯度
sobely = cv2.Sobel(img,cv2.CV_64F,0,1,ksize=3)
sobely = cv2.convertScaleAbs(sobely)  
cv_show(sobely,'sobely')


#求和
# 调用 cv2.addWeighted 函数
sobelxy = cv2.addWeighted(sobelx,0.5,sobely,0.5,0)
cv_show(sobelxy,'sobelxy')

# 原始图像
img = cv2.imread('yangqi.jpg',cv2.IMREAD_GRAYSCALE)
cv_show(img,'img')

# 接下来我们来看一下求梯度后的结果
img = cv2.imread('yangqi.jpg',cv2.IMREAD_GRAYSCALE)
sobelx = cv2.Sobel(img,cv2.CV_64F,1,0,ksize=3)
sobelx = cv2.convertScaleAbs(sobelx)
sobely = cv2.Sobel(img,cv2.CV_64F,0,1,ksize=3)
sobely = cv2.convertScaleAbs(sobely)
sobelxy = cv2.addWeighted(sobelx,0.5,sobely,0.5,0)
cv_show(sobelxy,'sobelxy')
```



#### Scharr算子

- Scharr算子和Sobel算子很像，但在边缘检测方面具有更好的性能。Scharr算子也是基于一阶导数的近似，和Sobel算子一样，Scharr算子也有两个3x3的核、
- Scharr算子具有更高的方向敏感性和更好的旋转不变性，能够更准确地检测到边缘，并且在边缘方向变化较大的情况下效果更好。
- 在很多应用中，Scharr算子常常被用作替代Sobel算子的选择。

Scharr算子的核矩阵
$$
G_x=\begin{bmatrix}
-3 & 0 & +3\\
-10 & 0 & +10\\
-3 & 0 & +3
\end{bmatrix}
\quad and \quad
G_y=\begin{bmatrix}
-3 & -10 & -3\\
0 & 0 & 0\\
-3 & -10 & -3
\end{bmatrix}
$$
`cv2.Scharr()`

```python
scharrx = cv2.Scharr(img,cv2.CV_64F,1,0)
scharry = cv2.Scharr(img,cv2.CV_64F,0,1)
scharrx = cv2.convertScaleAbs(scharrx)   
scharry = cv2.convertScaleAbs(scharry)  
scharrxy =  cv2.addWeighted(scharrx,0.5,scharry,0.5,0) cv_show(scharrxy,'scharr')
```



#### Laplacian算子

- Laplacian算子常用于检测图像中的边缘和纹理，但是它计算图像的二阶导数，以此捕捉到图像中的灰度变化。
- Laplacian单独使用对边缘检测的效果一般，因为它是一个二阶导数运算，所以图像中的噪声会被放大。

Laplacian算子的卷积核
$$
G=\begin{bmatrix}
 0& 1 & 0\\
1 & -4 & 1\\
0 & 1 & 0
\end{bmatrix}
$$


`cv2.Laplacian()`

因为这里只有一个核，因此不用分别计算x方向和y方向，直接计算一个即可

```python
laplacian = cv2.Laplacian(img,cv2.CV_64F)
laplacian = cv2.convertScaleAbs(laplacian)   
```



#### Canny算子

Canny边缘检测算子是John F．Canny于1986年开发出来的一个多级边缘检测算法。

最优边缘检测的三个主要评价标准

- 低错误率：标识出尽可能多的实际边缘，同时尽可能地减少噪声产生的误报。
- 高定位性：标识出的边缘要与图像中的实际边缘尽可能接近。
- 最小响应：图像中的边缘只能标识一次，并且可能存在的图像噪声不应标识为边缘。



Canny使用变分法，这是一种寻找满足特定功能的函数的方法。最优检测用4个指数函数项的和表示，但是它非常近似于高斯函数的一阶导数。

`cv2.Canny(img, threshold1, threshold2)`

- `image`：输入图像，即源图像，填Mat类的对象即可，且需为单通道8位图像。
- `threshold1`：双阈值检测的第一个滞后性阈值。通常，是`threshold2`的一半或三分之一。
- `threshold2`：双阈值检测的第二个滞后性阈值。



**Canny 边缘检测的步骤**

*1.使用高斯滤波器，以平滑图像，滤除噪声*

首先使用高斯滤波器降低图像噪声的影响。然后根据此滤波器，计算每一个像素经过高斯平滑后的值。

以下显示了一个size＝5的高斯内核示例

$k = \frac{1}{139} \begin{bmatrix} 2 & 4 & 5 & 4 & 2\\ 4 & 9 & 12 & 9 & 4\\ 5 & 12 & 15 & 12 & 5\\ 4 & 9 & 12 & 9 & 4\\ 2 & 4 & 5 & 4 & 2\end{bmatrix}$





*2.计算图像中每个像素点的梯度强度和方向*

在经过高斯滤波后的图像上，使用Sobel算子或其他梯度算子计算图像的梯度大小和方向，表示图像中每个像素的灰度变化率和方向。

- 在水平方向上计算梯度
- 在垂直方向上计算梯度

$$
G_x=\begin{bmatrix}
-1 & 0 & +1\\
-2 & 0 & +2\\
-1 & 0 & +1
\end{bmatrix}
\quad and \quad
G_y=\begin{bmatrix}
-1 & -2 & -1\\
0 & 0 & 0\\
+1 & +2 & +1
\end{bmatrix}
$$



- 计算梯度幅值和方向：根据水平和垂直梯度计算每个像素的梯度幅值和方向。

- 梯度方向4个可能的角度：0度，45度，90度，135度。

  

$$
G=\sqrt{G^2_x+G^2_y}
  \quad and \quad
  \theta = \arctan\left ( \frac{G_y}{G_x}  \right )
$$

  



*3.应用非极大值（Non-Maximum Suppression）抑制，以消除边缘检测带来的杂散响应。*

对于每个像素，判断其是否为边缘像素。具体做法是检查梯度幅值沿着梯度方向上的两侧像素，如果当前像素的梯度幅值最大，则将其保留为边缘像素，否则将其抑制为非边缘像素。



*4.应用双阈值（Double-Threshold）检测来确定真实的和潜在的边缘*

根据设定的高阈值和低阈值，对经过非极大值抑制的图像进行分类。

当minval设置的越小，我们能检测到的边缘就越多，当maxval设置的越大，我们能检测到的边缘就越少。

- 若某一像素位置的幅值超过高阈值，该像素被保留为边缘像素。

- 若某一像素位置的幅值小于低阈值，该像素被排除。

- 若某一像素位置的幅值在两个阈值之间，该像素仅仅在连接到一个高于高阈值的像素时被保留。



```python
import cv2

def cv_show(img,name):
    cv2.imshow(name,img)
    cv2.waitKey()
    cv2.destroyAllWindows()
    
img=cv2.imread("yangqi.jpg",cv2.IMREAD_GRAYSCALE)

v1=cv2.Canny(img,80,160) 
v2=cv2.Canny(img,50,100)

res = np.hstack((v1,v2)) #将图片水平堆砌
cv_show(res,'res')

```





### 2.5 图像的形态学处理

#### 腐蚀和膨胀

**腐蚀操作**

腐蚀操作是图像处理中常用的一种形态学操作，我们通常用于去除图像中的噪声、分割连通区域、减小目标物体的尺寸等。

腐蚀操作的原理是，在给定的结构元素下，遍历图像的每个像素，并将其值替换为该像素周围邻域内像素的最小值。结构元素控制了腐蚀的邻域范围和形状。邻域内的任何一个像素为黑色（0），则中心像素也将被置为黑色（0）。这样可以缩小或消除二值图像中的前景目标。



`cv2.erode(src, kernel, iterations)`

- `src`：输入的二值图像，通常为单通道灰度图像。
- `kernel`：腐蚀操作的结构元素，用于定义腐蚀的邻域大小和形状。可以使用 `cv2.getStructuringElement()` 函数创建不同形状的结构元素。
- `iterations`：腐蚀操作的迭代次数，表示应用腐蚀的重复次数。

```python
img = cv2.imread('JOJO.png')

cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
# 创建结构元素 (3x3 方框形)
kernel = np.ones((3, 3), dtype=np.uint8)

# 执行腐蚀操作
eroded = cv2.erode(img, kernel, iterations=1)

# 显示结果
cv2.imshow('Eroded Image', eroded)
cv2.waitKey(0)
cv2.destroyAllWindows()


# 我们可以更改`iterations`的值，来增加迭代次数，迭代的次数越多，则腐蚀的越严重
erosion_1 = cv2.erode(img,kernel,iterations = 1)#1次迭代
erosion_2 = cv2.erode(img,kernel,iterations = 2)#2次迭代
erosion_3 = cv2.erode(img,kernel,iterations = 3)#3次迭代
res = np.hstack((erosion_1,erosion_2,erosion_3))#水平堆砌
# 显示结果
cv2.imshow('res', res)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**膨胀操作**

腐蚀操的逆操作，膨胀操作。我们在上面的腐蚀操作中，在**消除噪声的同时，把有价值的信息也减少了**。因此我们希望将这些有价值的信息增大，这样就要利用到膨胀操作。



`cv2.dilate(src, kernel, iterations)` 

- `src`：输入的二值图像，通常为单通道灰度图像。
- `kernel`：腐蚀操作的结构元素，用于定义腐蚀的邻域大小和形状。可以使用 `cv2.getStructuringElement()` 函数创建不同形状的结构元素。
- `iterations`：腐蚀操作的迭代次数，表示应用腐蚀的重复次数。



> 结构元素可以通过 `cv2.getStructuringElement()` 函数创建，它定义了膨胀操作的邻域大小和形状。常见的结构元素形状包括`矩形、椭圆和十字形`。

```python
# 原始图像
img = cv2.imread('JOJO.png')
cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()

接下来我们使用腐蚀操作消除细线
# 腐蚀操作
kernel = np.ones((5,5),np.uint8) 
dige_erosion = cv2.erode(img,kernel,iterations = 1)

cv2.imshow('erosion', erosion)
cv2.waitKey(0)
cv2.destroyAllWindows()

我们可以看见其中字母也变小了，我们想恢复其原始信息。
# 膨胀操作
kernel = np.ones((3,3),np.uint8) 
dige_dilate = cv2.dilate(dige_erosion,kernel,iterations = 1)

cv2.imshow('dilate', dige_dilate)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



#### 开运算和闭运算

膨胀操作通常与腐蚀操作结合使用，以在图像中执行形态学处理。这种组合的方法称为**开运算（Opening）和闭运算（Closing）**

这两种方法可以用来改善图像的质量、去除噪声或者填充空洞。



**开运算**

先进行腐蚀操作，再进行膨胀操作。它主要用于去除图像中的噪点、小的干扰物或者分离连通的对象。

`cv2.morphologyEx()`函数，并指定操作类型为`cv2.MORPH_OPEN`，实现开运算

```python
# 开：先腐蚀，再膨胀
img = cv2.imread('dige.png')

kernel = np.ones((5,5),np.uint8) 
opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)

cv2.imshow('opening', opening)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**闭运算**

先进行膨胀操作，再进行腐蚀操作。它主要用于填充图像中的小洞孔或者连接分离的对象。

`cv2.morphologyEx()`函数，并指定操作类型为`cv2.MORPH_CLOSE`，实现闭运算

```python
# 闭：先膨胀，再腐蚀
img = cv2.imread('JOJO.png')

kernel = np.ones((5,5),np.uint8) 
closing = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)

cv2.imshow('closing', closing)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



#### 顶帽和底帽

通过使用顶帽和底帽操作，可以突出图像中细微的亮或暗结构，或者检测背景中的亮或暗区域。

**顶帽操作**

原始图片输入-开运算结果

 `cv2.morphologyEx()` 函数，并指定操作类型为 `cv2.MORPH_TOPHAT`，执行顶帽操作

```python
#顶帽
img = cv2.imread('JOJO.png')
tophat = cv2.morphologyEx(img, cv2.MORPH_TOPHAT, kernel)
cv2.imshow('tophat', tophat)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



**底帽操作**

闭运算-原始图片输入

底帽操作是顶帽操作的相反过程，用于突出图像中微小结构或背景中的暗区域。

`cv2.morphologyEx()` 函数，并指定操作类型为`cv2.MORPH_BLACKHAT`，执行底帽操作。

```python
#底帽
img = cv2.imread('JOJO.png')
blackhat  = cv2.morphologyEx(img,cv2.MORPH_BLACKHAT, kernel)
cv2.imshow('blackhat ', blackhat )
cv2.waitKey(0)
cv2.destroyAllWindows()
```



#### 形态学梯度

梯度运算 = 膨胀操作-腐蚀操作

```python
# 梯度=膨胀-腐蚀
img = cv2.imread('JOJO.png')
kernel = np.ones((5,5),np.uint8) 
dilate = cv2.dilate(img,kernel,iterations = 1)
erosion = cv2.erode(img,kernel,iterations = 1)

res = np.hstack((dilate,erosion))

cv2.imshow('res', res)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 梯度运算
gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)
cv2.imshow('gradient', gradient)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



### 2.6 图像金字塔和直方图

#### 图像金字塔

- 图像金字塔是一种多尺度表示的方法，用于在不同分辨率下对图像进行分析和处理。
- 图像金字塔可以将原始图像分解为一系列层级的图像，每个层级都代表了不同尺度的细节信息。
- 图像金字塔是一系列以金字塔形状排列的分辨率逐步降低，且来源于同一张原始图的图像集合。
- 图像金字塔层级越高，则图像越小，分辨率越低，反之亦然。



图像金字塔主要有两种类型：高斯金字塔和拉普拉斯金字塔。

**高斯金字塔**

高斯金字塔的每一层级都包含了原始图像的低频信息，并且每个层级的分辨率比前一层级低。高斯金字塔可用于图像的缩放、降噪以及图像融合等应用。



*向下采样法（缩小）*

向下采样法是越采样越小，不断降低图像的分辨率，使得图片越变越小，因此它的方向是朝着金字塔顶端。

构建过程如下：

1. 应用高斯滤波器对当前层级的图像进行平滑处理。
2. 将平滑后的图像进行下采样，删除所有的偶数行和列。

```python
# 查看原始图片
print (img.shape)
(238, 218, 3)

# cv2.pyrDown() 来实现下采样
down=cv2.pyrDown(img)
cv_show(down,'down')
print (down.shape) #查看下采样后的结果维度
(119, 109, 3)
# 可以看到，图片变得更小了，并且图像的行和宽都是原来的一半。
```



*向上采样法（放大）*

向下采样法是越采样越大，不断增加图像的分辨率，使得图片越变越大，因此它的方向是朝着金字塔底端。

具体做法如下：

1. 使图像在每个方向扩大为原来的两倍，新增的行和列以0填充
2. 使用相同的内核(乘以4)与放大后的图像卷积，获得 “新增像素”的近似值

> 注：向上取样和向下取样无法互逆的。

```python
# 查看原始图片
print (img.shape)
(238, 218, 3)

# cv2.pyrUP() 来实现上采样
up=cv2.pyrUp(img)
cv_show(up,'up')
print (up.shape) #查看上采样后的结果维度
(476, 436, 3)
# 可以看到，图片变得更大了，并且图像的行和宽都是原来的两倍
```



**拉普拉斯金字塔**

拉普拉斯金字塔是通过高斯金字塔构建的，可以用于重建原始图像，也可以用于实现图像的增强和压缩等操作。

拉普拉斯金字塔是通过源图像减去先缩小后再放大的图像的一系列图像构成的。保留的是残差！为图像还原做准备！

拉普拉斯公式等价于
$$
L_i = G_i - PyrUp(pyrDown(G_i)
\\
G_i \text{ ：原始图像}
\\
L_i \text{ ：拉普拉斯金字塔图像}
$$



```python
down=cv2.pyrDown(img)
down_up=cv2.pyrUp(down)
l_1=img-down_up
cv_show(l_1,'l_1')
```



#### 模板匹配

模板匹配是一项在一幅图像中寻找与另一幅模板图像最匹配(相似)部分的技术

模板匹配是一种局部匹配方法，对光照变化、旋转变换等情况比较敏感。

通过模板匹配可以得到目标的相似度，旋转角度，行列坐标，缩放大小等。

基本原理，模板在原图像上从原点开始滑动，计算模板与（图像被模板覆盖的地方）的差别程度，以此来找到最佳匹配位置。



这个差别程度的计算方法在opencv里有6种，然后将每次计算的结果放入一个矩阵里，作为结果输出。

假如原图形是`AxB`大小，而模板是`axb`大小，则输出结果的矩阵是`(A-a+1)x(B-b+1)`

```python
# 模板匹配
import cv2
img = cv2.imread('lena.jpg', 0) #目标图片
template = cv2.imread('face.jpg', 0) #要匹配的模板
h, w = template.shape[:2] #模板的大小
img.shape,template.shape


((263, 263), (110, 85))

def cv_show(img,name):
    cv2.imshow(name,img)
    cv2.waitKey()
    cv2.destroyAllWindows()

# 显示原始图片
cv_show(img,'img')

# 显示模板图片
cv_show(template,'template')
```



**获取匹配结果**

`cv2.matchTemplate(img, template, method)`函数

- `img`：传入的图片
- `template`：匹配的模板
- `method`：匹配方式
  - `TM_SQDIFF`：计算平方不同，计算出来的值越小，越相关
  - `TM_CCORR`：计算相关性，计算出来的值越大，越相关
  - `TM_CCOEFF`：计算相关系数，计算出来的值越大，越相关
  - `TM_SQDIFF_NORMED`：计算归一化平方不同，计算出来的值越接近0，越相关
  - `TM_CCORR_NORMED`：计算归一化相关性，计算出来的值越接近1，越相关
  - `TM_CCOEFF_NORMED`：计算归一化相关系数，计算出来的值越接近1，越相关

```python
res = cv2.matchTemplate(img, template, cv2.TM_SQDIFF)
res.shape

(154, 179)
# 可以看到这里的维度是（154,179），验证了我们之前所介绍的内容，等于(263-110+1,263-85+1)。
```



**获取匹配位置信息**

`cv2.minMaxLoc()` 函数获取匹配结果的最大值和最小值，以及对应的位置信息。

```python
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
min_val,max_val,min_loc,max_loc
(39168.0, 74403584.0, (107, 89), (159, 62))
```



**绘制匹配边框**

`cv2.rectangle()` 函数可以根据最佳匹配位置，在原始图像上绘制一个矩形框来标记匹配位置。

```python
ini复制代码import matplotlib.pyplot as plt

methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
           'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
for i in methods:
    img2 = img.copy()

    # 匹配方法的真值
    method = eval(i)
    print (method)
    res = cv2.matchTemplate(img, template, method)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

    # 如果是平方差匹配TM_SQDIFF或归一化平方差匹配TM_SQDIFF_NORMED，取最小值
    if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
        top_left = min_loc
    else:
        top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)

    # 绘制匹配边框
   
    cv2.rectangle(img2, top_left, bottom_right, 255, 2)

    plt.subplot(121), plt.imshow(res, cmap='gray')
    plt.xticks([]), plt.yticks([])  #
    plt.subplot(122), plt.imshow(img2, cmap='gray')
    plt.xticks([]), plt.yticks([])
    plt.suptitle(i)
    plt.show()
```



#### 图像直方图

- 直方图是一种用于可视化数据分布的图表形式，它显示了数据在各个数值范围内的频率或数量。直方图可以帮助我们了解数据的分布情况、寻找异常值和识别数据模式。
- 在计算机视觉中，直方图也经常用于图像处理和分析。通过统计图像中不同灰度级别的像素数量，可以获得图像的灰度分布，进而进行图像增强、对比度调整、颜色校正等操作。
- 首先每个图像单独拿出来其实就是一堆像素点，范围在`0-255`之间，而直方图就是统计这一张图片各个像素点值的个数，如下图所示，横坐标代表不同像素点取值，纵坐标代表出现的次数。

`cv2.calcHist(images,channels,mask,histSize,ranges)`

- `images`: 需要计算直方图的图像，以方括号的形式传递，表示可以处理多个图像。例如[img]
- `channels:` 指定计算直方图的通道索引，对于灰度图像，只有一个通道，因此传递0。如果是彩色图像，则传入的参数可以是 0,1,2，它们分别对应着 BGR。
- `mask`: 用于指定掩码图像，如果不需要，则设置为`None`，即统计整幅图像的直方图
- `Size`: 表示直方图的大小，即有多少个bins，例如设置为256，表示将图像像素值分成256个区间进行统计。
- `ranges`表示像素值的范围。常为 [0, 256]

```python
import cv2 #opencv读取的格式是BGR

# 定义图像显示函数
def cv_show(img,name):
    cv2.imshow(name,img)
    cv2.waitKey()
    cv2.destroyAllWindows()
    
img = cv2.imread('yangqi.jpg',0) #0表示读取灰度图

# 直方图计算
hist = cv2.calcHist([img],[0],None,[256],[0,256])
hist.shape
(256, 1)

# hist 返回每个0-255共256个像素值出现的个数，我们打印出来看一下它的分布情况
plt.hist(img.ravel(),256); 
plt.show()
```



**分通道读取**

接下来我们以彩色图为例，统计每一个通道的直方图。这里要注意的是，opencv的颜色顺序是 b、g、r。

```ini
# 读取彩色图
img = cv2.imread('yangqi.jpg') 

# 直方图
color = ('b','g','r')
for i,col in enumerate(color): 
    histr = cv2.calcHist([img],[i],None,[256],[0,256]) 
    plt.plot(histr,color = col) 
    plt.xlim([0,256]) 
```



**mask操作（掩码操作）**

直方图掩码操作是一种通过应用掩码图像来选择特定区域，并计算该区域的直方图的方法。它在图像处理和计算机视觉领域中非常常用，用于分析图像中感兴趣区域的像素分布情况。

在直方图掩码操作中，我们使用两个图像：原始图像和掩码图像。

- 原始图像：这是我们要进行操作和分析的图像。
- 掩码图像：这是一个二值图像，用于指定原始图像中我们感兴趣的区域。掩码图像通常是灰度图像，其中具有我们感兴趣的区域的像素值设为255，而其他区域的像素值为零。



`cv2.bitwise_and()`

产生一个新的图像，其中只有掩码图像非零像素对应的原始图像像素会被保留下来，其余像素置为零，相当于起到了一个捕捉特定区域的作用

```python
# 创建mast
mask = np.zeros(img.shape[:2], np.uint8)
print (mask.shape)
mask[100:200, 50:150] = 255
cv_show(mask,'mask')
masked_img = cv2.bitwise_and(img, img, mask=mask)#掩码操作
cv_show(masked_img,'masked_img')
```



计算直方图

`cv2.calcHist()`函数计算掩码后图像的直方图。可以指定通道索引，直方图大小和像素值范围等参数。

```python
hist_full = cv2.calcHist([img], [0], None, [256], [0, 256])
hist_mask = cv2.calcHist([img], [0], mask, [256], [0, 256])
```



绘制直方图

使用Matplotlib库绘制直方图，并通过`plt.show()`显示图像。

```python
plt.subplot(221), plt.imshow(img, 'gray')
plt.subplot(222), plt.imshow(mask, 'gray')
plt.subplot(223), plt.imshow(masked_img, 'gray')
plt.subplot(224), plt.plot(hist_full), plt.plot(hist_mask)
plt.xlim([0, 256])
plt.show()
```



#### 傅里叶变换

`傅里叶变换（Fourier Transform）`是一种将信号在`时域（时间域）`和`频域（频率域）`之间进行转换的数学工具，具体的数学理论不做详细探讨。它的基本思想是将一个信号分解成一组不同频率的正弦和余弦函数的叠加。

在图像处理中，傅里叶变换常被用于分析和处理图像的频域信息，通过将图像从空间域转换到频域，我们可以了解图像中各个频率成分的贡献，针对不同频率，我们有以下作用：

- 高频：变化剧烈的灰度分量，例如边界
- 低频：变化缓慢的灰度分量



**频率转换结果**

对于二维图像而言，我们常用离散傅里叶变换（Discrete Fourier Transform, DFT）



离散傅里叶变换（DFT）是将图像从空间域转换到频域的一种方法，它通过计算图像中每个像素点的频谱来描述图像的频率特征。

DFT输出的结果是一个复数数组，其中每个元素表示该频率分量的振幅和相位。因此，我们需要将这个输出结果转换成图像格式。



`cv2.dft()`

输入图形要先转换成`np.float32`的格式，此外，`cv2.dft()`返回的结果是双通道的（实部，虚部），通常还需要转换成图像格式才能展示（0,255）。

```python
import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('lena.jpg',0)

img_float32 = np.float32(img)

dft = cv2.dft(img_float32, flags = cv2.DFT_COMPLEX_OUTPUT) # 使用dft
dft_shift = np.fft.fftshift(dft)#shift转换，将频率为0的部分转换到中心位置。

# 得到灰度图能表示的形式
magnitude_spectrum = 20*np.log(cv2.magnitude(dft_shift[:,:,0],dft_shift[:,:,1])) 

plt.subplot(121),plt.imshow(img, cmap = 'gray')
plt.title('Input Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122),plt.imshow(magnitude_spectrum, cmap = 'gray')
plt.title('Magnitude Spectrum'), plt.xticks([]), plt.yticks([])
plt.show()
```



**高通和低通滤波器**

低通滤波器和高通滤波器是信号处理中常见的两种滤波器类型，用于在频域上选择特定频率范围内的信号分量。

低通滤波器（Low-pass Filter）：保留信号中较低频率的分量，并削弱或消除高频分量，相当于把边界抹除了，使得图像变得模糊。低通滤波器可以用来平滑信号、去除噪声或降低信号频率。 低通滤波器的频率响应通常是一个平坦的直线，直到截止频率，截止频率之后，频率响应开始逐渐下降。

```python
import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('lena.jpg',0)

img_float32 = np.float32(img)

dft = cv2.dft(img_float32, flags = cv2.DFT_COMPLEX_OUTPUT) #dft结果
dft_shift = np.fft.fftshift(dft) #使用shift将0转换到中心位置

rows, cols = img.shape
crow, ccol = int(rows/2) , int(cols/2)     # 中心位置

# 低通滤波
mask = np.zeros((rows, cols, 2), np.uint8) 
mask[crow-30:crow+30, ccol-30:ccol+30] = 1 #只在中心位置为1，其余位置都为0

# IDFT：DFT的逆变换，将dft的结果变换的源图像
fshift = dft_shift*mask #通过掩码操作只保留中心位置
f_ishift = np.fft.ifftshift(fshift)# 做shift的逆变换
img_back = cv2.idft(f_ishift)# 做dft的逆变换
img_back = cv2.magnitude(img_back[:,:,0],img_back[:,:,1])#处理成图像的格式

plt.subplot(121),plt.imshow(img, cmap = 'gray')
plt.title('Input Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122),plt.imshow(img_back, cmap = 'gray')
plt.title('Result'), plt.xticks([]), plt.yticks([])

plt.show()
```



高通滤波器（High-pass Filter）： 高通滤波器允许通过频率范围内的高频信号，而抑制低频信号，相当于将边界锐化，会使得图像细节增强。它的作用是保留信号中的高频分量，并减弱或消除低频信号。高通滤波器可以用来强调信号中的快速变化部分，滤除基线漂移或去除低频噪声。

```python
import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('lena.jpg',0)

img_float32 = np.float32(img)

dft = cv2.dft(img_float32, flags = cv2.DFT_COMPLEX_OUTPUT) #dft结果
dft_shift = np.fft.fftshift(dft) #使用shift将0转换到中心位置

rows, cols = img.shape
crow, ccol = int(rows/2) , int(cols/2)     # 中心位置

# 高通滤波
mask = np.ones((rows, cols, 2), np.uint8)
mask[crow-30:crow+30, ccol-30:ccol+30] = 0 #只在中心位置为0，其余位置都为1

# IDFT：DFT的逆变换，将dft的结果变换的源图像
fshift = dft_shift*mask #通过掩码操作只保留中心位置
f_ishift = np.fft.ifftshift(fshift)# 做shift的逆变换
img_back = cv2.idft(f_ishift)# 做dft的逆变换
img_back = cv2.magnitude(img_back[:,:,0],img_back[:,:,1])#处理成图像的格式

plt.subplot(121),plt.imshow(img, cmap = 'gray')
plt.title('Input Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122),plt.imshow(img_back, cmap = 'gray')
plt.title('Result'), plt.xticks([]), plt.yticks([])

plt.show()
```

## 三、特征检测与描述

### 3.1 Harris角点检测



**什么是角点**

角点还没有明确的数学定义，但普遍具有以下特征：

1. 局部小窗口沿各方向移动，窗口内的像素均产生明显变化的点。
2. 图像局部曲率(梯度)突变的点。
3. 对于同一场景，即使视角发生变化，其角点通常具备某些稳定不变性质的特征



**角点检测算法的原始思想**

我们可以从角点具有的特征出发：即选取一个局部窗口，将这个窗口沿着各个方向移动，计算移动前后窗口内像素的差异的多少进而判断窗口对应的区域是否是角点。
$$
E(u,v)=\sum_{x,y} w(x,y)[I[x+u,y+v]-I(x,y)]^2
$$

- $E(u,v)$：能量函数，u和v体现窗口的移动。
- $w(x,y)$：窗口函数，每个像素差值乘上一个权重，体现对整体的贡献程度。中值滤波或高斯滤波。
- $[I[x+u,y+v]-I(x,y)]$：移动后与移动前的灰度差。



**Harris角点的特征**

- 平坦区域：任意方向移动动，无灰度变化
- 边缘：沿着边缘方向移，无灰度变化
- 角点：沿任意方向移动，明显灰度变化



**Harris角点检测**

Harris角点检测，由Chris Harris和Mike Stephens于1988年提出。该算法通过计算图像的局部灰度变化来检测角点，并利用协方差矩阵的特征值来确定是否为角点。

Harris角点的计算方法甚至不需要用到特征值，只需要计算一个**Harris响应值R**：
$$
R = detM-k(traceM)^2\\
detM=\lambda _1\lambda _2\\
traceM=\lambda _1+\lambda _2
$$


- R只与M的特征值有关
- 角点：R为大数值正数
- 边缘：R为大数值负数
- 平坦区：R为小数值



**矩阵M的特征值**

- **平坦区域**：两个特征值都小，且近似相等，能量函数在各个方向上都较小；
- **边缘区域**：一个特征值大，另一个特征值小，能量函数在某一方向上增大，其他方向较小；
- **角点区域**：两个特征值都大，且近似相等，能量函数在所有方向上都增大。



**Harris角点算法的基本步骤**

1. 计算窗口中各像素点在x和y方向的梯度；
2. 计算两个方向梯度的乘积,即$Ix ^ 2 , Iy ^ 2 , IxIy$(可以用一些一阶梯度算子求得图像梯度)
3. 使用滤波核对窗口中的每一像素进行加权，生成矩阵M和元素A，B，C
4. 计算每个像素的Harris响应值R，并对小于某阈值T的R置0；
5. 由于角点所在区域的一定邻域内都有可能被检测为角点，所以为了防止角点聚集，最后在3×33×3或5×55×5的邻域内进行非极大值抑制，局部最大值点即为图像中的角点。

`cv2.cornerHarris()`函数实现

```python
import cv2 
import numpy as np

# 导入图片
img = cv2.imread('test_1.jpg')
print ('img.shape:',img.shape)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)#转换为float32格式
dst = cv2.cornerHarris(gray, 2, 3, 0.04)
print ('dst.shape:',dst.shape)

img.shape: (512, 512, 3)
dst.shape: (512, 512)
img[dst>0.01*dst.max()]=[0,0,255] #非极大值抑制,将边界点标红
cv2.imshow('dst',img) 
cv2.waitKey(0) 
cv2.destroyAllWindows()
```





### 3.2 SIFT特征检测与描述

**Scale Invariant Feature Transform（SIFT）** 是一种用于计算机视觉和图像处理中的特征检测和描述的算法，可以说是在计算机视觉一种非常流行和广泛使用的算法，它能够检测和描述图像中的关键点，并具有尺度、旋转和视角的不变性，适用于各种图像处理任务，例如目标识别、图像匹配、图像拼接等。SIFT算法主要包括：**尺度空间检测、特征关键点检测、特征描述**等，接下来我们来分别看一下这些概念

以下是对SIFT算法的详细介绍：

1. **特征点检测：**
   - 尺度空间极值检测：SIFT首先在不同尺度下使用高斯模糊滤波器构建尺度空间金字塔，然后通过比较每个像素与其周围像素及所处尺度上的像素进行检测，找到图像中的关键点。
   - 关键点精化：通过利用尺度空间的极值点，对关键点进行精化，计算其精确位置和尺度尺度，并根据梯度方向来确定主方向。
2. **特征描述：**
   - 局部图像描述子：以关键点为中心，在其周围的邻域内构建一个具有旋转不变性和尺度不变性的局部图像描述子。该描述子基于关键点附近的梯度方向和强度信息，通过生成一个特征向量来描述关键点周围的图像结构。
   - 方向直方图：在计算局部图像描述子之前，首先根据关键点周围的梯度方向计算一个方向直方图，用来确定主方向。
3. **特征匹配：**
   - 特征向量匹配：将两幅图像的特征向量进行匹配，通常使用最近邻匹配方法（如欧氏距离）来寻找每个特征点的最佳匹配。同时，还可以使用二次最近邻比率测试来过滤不可靠的匹配。
   - 健壮性和一致性：为了提高匹配的健壮性和一致性，可以使用诸如RANSAC（随机抽样一致性）等方法来剔除异常和错误的匹配点。

SIFT算法的关键优势在于其对尺度、旋转和视角的不变性，使得它能够在多种条件下健壮地检测和匹配图像中的特征点。此外，SIFT算法还具有以下特点：

- 独特性：SIFT特征是在图像中独一无二的，它们可以用来区分不同的图像区域。
- 不变性：SIFT特征对于有限的视角变化、尺度变化以及轻微的仿射变换都具有较好的不变性。
- 高健壮性：SIFT算法对于光照变化、噪声和部分遮挡等情况下仍能产生准确的匹配结果。
- 可扩展性：SIFT算法可以应用于各种图像尺寸和分辨率的图像，并且在大规模图像数据库中进行高效匹配。

因此在目标识别、图像匹配和图像拼接等应用中具有重要的作用。



图像尺度空间



我们知道在一定的范围内，无论物体是大还是小，我们人眼都可以分辨出来，然而计算机要有相同的能力却很难，所以要让机器能够对物体在不同尺度下有一个统一的认知，就需要考虑图像在不同的尺度下都存在的特点。

**图像尺度空间**是指在不同尺度下对图像进行分析和处理的一种表示方式。在图像尺度空间中，同一物体或结构的特征在不同尺度下具有不同的尺度信息。这是因为图像中的物体和结构可能以不同的尺度出现，例如大小、边缘和纹理等。通过在不同尺度下分析图像，我们可以获取更全面和健壮的特征表示，以适应不同尺度上的目标检测、识别和描述任务。

尺度空间的获取通常使用高斯模糊来实现



- **高斯金字塔**： 高斯金字塔是一种通过对图像进行连续的高斯滤波和下采样操作来构建图像尺度空间的方法。具体步骤如下：

  - 先对原始图像应用一个初始尺度的高斯滤波器。
  - 对滤波后的图像进行下采样（通常是进行二次减半），得到下一层金字塔图像。
  - 重复以上步骤，直到达到预定的尺度层数。

- **多分辨率金字塔**，它是通过将原始图像进行分解，得到一系列具有不同分辨率的图像层级，从而实现对图像的多尺度分析和处理通常采用逐步降采样（downsampling）和上采样（upsampling）的方法。

  - 首先，原始图像通过降采样操作被缩小为较低分辨率的图像，然后这个较低分辨率的图像再次进行降采样，直到达到所需的分辨率层级。
  - 这样就形成了一个金字塔状的层级结构，其中每个层级的图像都比上一层级的图像具有更低的分辨率。
  - 在每层进行高斯滤波器操作

  多分辨率金字塔的主要优势之一是可以在不同尺度下对图像进行分析。高层级的图像层级具有较低的分辨率，但能够捕捉到图像的整体特征和结构信息；而低层级的图像层级具有较高的分辨率，能够提供更多的细节信息。因此，通过在不同层级上对图像进行处理，可以获得更全面和准确的分析结果。

- **尺度空间差分金字塔**： 尺度空间差分金字塔是基于高斯金字塔的构建方法。它通过计算高斯金字塔相邻层之间的差分图像来获取尺度空间的特征。这样做可以捕捉到图像中的细节信息，而较高尺度的层级可以揭示出图像中的整体结构。通过在不同层级上进行差分操作，可以凸显出图像中的边缘、角点等局部结构。具体步骤如下：
  - 构建高斯金字塔，并对每一层进行高斯平滑。
  - 对相邻两层图像进行差分操作，得到差分图像。
  - 重复以上步骤，直到达到预定的尺度层数。



**DOG定义：**

**DoG空间极值检测**

为了寻找尺度空间的极值点，每个像素点要和其图像域（同一尺度空间）和尺度域（相邻的尺度空间）的所有相邻点进行比较，当其大于（或者小于）所有相邻点时，该点就是极值点。如下图所示，中间的检测点要和其所在图像的`3×3`邻域`8`个像素点，以及其相邻的上下两层的`3×3`领域`18`个像素点，共`26`个像素点进行比较。



##### 2.2 关键点定位

这些候选关键点是DOG空间的局部极值点，而且这些极值点均为离散的点，精确定位极值点的一种方法是：对尺度空间DoG函数进行曲线拟合，计算其极值点，从而实现关键点的精确定位。



##### 2.3 消除边界响应

接下来得到了这些极值点具体位置之后，我们还需要对位置进行一些过滤，这里有一个方法就是**消除边界响应**。因为之前我们通过高斯滤波器对图像进行各种操作，可能会增加一些边界的响应，此时我们需要将其消除掉。

在这里啊，修正方法和我们之前介绍边缘检测类似，当一个特征值大，一个特征值小的时候，它就是边界，这里我们定义了一个和一个。=较大特征值，=较小特征值，组成一个矩阵，具体如下：



##### 2.4 代码示例

下面我们看如何在opencv中实现SIFT特征变换

*注意：*新版本的opencv不能直接调用，需要降版本为3.4.1，安装命令如下；

```sh
pip install opencv-python==3.4.1.15
pip install opencv-contrib-python==3.4.1.15
```

下面我们来看具体代码：

首先读取图片，这里我们还是使用之前的**小狗洋气图片**

```python
import cv2
import numpy as np

img = cv2.imread('yangqi.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)#灰度图
```

**得到关键点:**

接下来调用`xfeatures2d.SIFT_create()函数`初始化SIFT 检测器对象，然后使用`detect()`函数检测关键点

```python
sift = cv2.xfeatures2d.SIFT_create()
kp = sift.detect(gray, None)#得到特征点

img = cv2.drawKeypoints(gray, kp, img) #绘制特征点

cv2.imshow('drawKeypoints', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

**计算特征**:

接下来使用`sift.compute()`函数计算关键的及其对应的特征

```python
kp, des = sift.compute(gray, kp)
```

- `kp`：关键点
- `des`：每一个关键点对应的特征

接下来我们来看一下他们的纬度

```python
print(np.array(kp).shape) #kp是一个列表，需要转换成ndarray
print(des.shape)
(605,)
(605, 128)
```

结果表示我们一共得到了605个关键点，每个关键点是一个128维的向量。

### 3.3 SURF特征检测与描述



### 3.4 FAST特征检测



### 3.5 ORB特征检测与描述

## 四、目标检测与识别

### 4.1 Haar级联检测器

### 4.2 HOG特征与SVM分类器

### 4.3 卷积神经网络（CNN）在目标检测中的应用

### 4.4 YOLO（You Only Look Once）目标检测算法

## 五、图像分割与轮廓提取

### 5.1 基于阈值的图像分割



### 5.2 基于边缘的图像分割



### 5.3 基于区域的图像分割



### 5.4 轮廓提取与分析

轮廓是一系列相连的点组成的曲线，代表了物体的基本外形。

边缘主要是作为图像的特征使用，比如可以用边缘特征可以区分脸和手，而轮廓主要用来分析物体的形态，比如物体的周长和面积等，可以说边缘包括轮廓。

从定义上来说它是指图像中连续的曲线或边界，表示了图像中目标的形状和外观特征。



**边缘：** 零零散散的

**轮廓：** 它是一个整体



#### 轮廓检测

- 寻找轮廓的操作一般用于二值化图，所以通常会使用阈值分割或 Canny 边缘检测先得到二值图。
- 可以选择不同的检索模式和轮廓逼近方法来控制轮廓的提取方式。



`cv2.findContours(image,mode,method)`

- `image`：输入图像，**为了提高准确率，使用二值图像。**
- `mode`:定义轮廓检索模式，有四种可选模式：
  - `cv2.RETR_EXTERNAL`：只检索最外面的轮廓；
  - `cv2.RETR_LIST`：检索所有轮廓，并将其保存在列表中。
  - `cv2.RETR_CCOMP`：检索所有的轮廓，并将他们组织为两层：顶层是各部分的外部边界，第二层是空洞的边界;
  - `cv2.RETR_TREE`：检索所有的轮廓，并重构嵌套轮廓的整个层次,常用这个。
- `method`：定义轮廓逼近方法，我们这里主要使用下列两种方法
  - `cv2.CHAIN_APPROX_NONE`：存储所有的边界点。
  - `cv2.CHAIN_APPROX_SIMPLE`：仅存储水平、垂直和对角线方向的端点。



**转换二值图像**

```python
import cv2
def cv_show(img,name):
    cv2.imshow(name,img)

    
# 第一步：转换为二值图
img = cv2.imread('my_contour.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
cv_show(thresh,'contours')
```



**轮廓检测**

调用`cv2.findContours()`函数

```python
binary, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
```

- binary：返回的就是二值图像
- contours：返回的是我们的轮廓信息
- hierarchy：返回的是层级结构



**绘制轮廓**

使用 `cv2.drawContours()` 函数可以将提取到的轮廓绘制在图像上，这样就可以可视化检测到的目标的形状和位置。

- `draw_img`：要在其上绘制轮廓的图像。
- `contours`：要绘制的轮廓列表。
- `contourIdx`：指定要绘制的轮廓的索引。使用 `-1` 表示绘制所有的轮廓。
- `color`：绘制轮廓的颜色，格式为 `(B, G, R)`，其中 B、G 和 R 分别表示蓝色、绿色和红色的强度。
- `thickness`：轮廓线的粗细，默认值为 `1`。

```python
# 传入绘制图像，轮廓，轮廓索引，颜色模式，线条厚度

draw_img = img.copy() #创建一个图像副本保存
res = cv2.drawContours(draw_img, contours, -1, (0, 0, 255), 2) #绘制所有轮廓
cv_show(res,'res')

# 想得到其中的某一个轮廓，我们可以指定相应的轮廓索引
draw_img = img.copy()
res = cv2.drawContours(draw_img, contours, 0, (255, 0, 0), 2)#绘制索引为0的轮廓
cv_show(res,'res')
```



#### 轮廓特征

图像轮廓提供了许多与目标形状相关的特征信息，可以用于形状分析、目标检测和图像识别等任务。以下是一些常见的轮廓特征以及计算

1. 面积（Area）：轮廓所包围的区域的面积。
   - 可以使用 `cv2.contourArea(contour)` 函数计算轮廓的面积。
2. 周长（Perimeter）：轮廓的周长，即轮廓的闭合曲线的长度。
   - 可以使用 `cv2.arcLength(contour, closed)` 函数计算轮廓的周长，其中 `closed` 参数指定轮廓是否为闭合曲线。
3. 边界框（Bounding Box）：将轮廓包围在一个矩形框中。
   - 可以使用 `cv2.boundingRect(contour)` 函数获取包围轮廓的最小矩形框的位置和大小。
4. 最小外接圆（Minimum Enclosing Circle）：包围轮廓的最小半径的圆。
   - 可以使用 `cv2.minEnclosingCircle(contour)` 函数获取包围轮廓的最小外接圆的圆心和半径。
5. 最小外接矩形（Minimum Enclosing Rectangle）：包围轮廓的最小面积的矩形。
   - 可以使用 `cv2.minAreaRect(contour)` 函数获取包围轮廓的最小外接矩形的位置、大小和旋转角度。
6. 凸包（Convex Hull）：能够完全包围轮廓的凸多边形。
   - 可以使用 `cv2.convexHull(points)` 函数获取轮廓的凸包。
7. 近似多边形（Approximation Polygon）：用直线段逼近轮廓的多边形。
   - 可以使用 `cv2.approxPolyDP(curve, epsilon, closed)` 函数对轮廓进行近似，其中 `epsilon` 是逼近精度参数。
8. 形心（Centroid）：轮廓所包围区域的重心或平均位置。
   - 可以使用 `cv2.moments(contour)` 函数计算轮廓的矩，然后通过计算质心来获取重心。



在上面我们已经得到了轮廓的信息`contours`，但是我们不能直接将其进行特征计算，因为它包含了所有的轮廓信息，因此我们要指定相应的索引再进行特征计算

```python
cnt = contours[0] #指定索引为0的轮廓
#面积
print(cv2.contourArea(cnt))
24578.0
#周长，True表示闭合的
print(cv2.arcLength(cnt,True))
586.4995617866516
```



#### 轮廓近似

轮廓近似是指用直线段或曲线段逼近实际轮廓的过程，从而减少轮廓中的点数并简化轮廓的表示。这可以帮助我们更有效地处理和分析轮廓。

`cv2.approxPolyDP(curve, epsilon, closed)` 函数来进行轮廓的近似。

- `curve`：输入的轮廓。
- `epsilon`：表示近似精度的参数。较小的值会产生更准确的逼近，但会保留更多的细节和点。较大的值会导致更粗糙的逼近，但会减少点的数量。
- `closed`：一个布尔值，指示是否闭合轮廓。



```python
img = cv2.imread('contours2.png')

# 获取轮廓特征
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
binary, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
cnt = contours[0]
# 原始轮廓
draw_img = img.copy()
original = cv2.drawContours(draw_img, [cnt], -1, (0, 0, 255), 2)

# 近似轮廓
epsilon = 0.1*cv2.arcLength(cnt,True) 
approx = cv2.approxPolyDP(cnt,epsilon,True)
draw_img = img.copy()
approx = cv2.drawContours(draw_img, [approx], -1, (0, 255, 0), 2)

res = np.hstack((original,approx))
cv_show(res,'res')
```



#### 外接矩形

用其外接矩形或外接圆来进行分析，`cv2.boundingRect()`函数得到轮廓的外接矩形信息。

```python
img = cv2.imread('contours.png')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
binary, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
cnt = contours[0]

x,y,w,h = cv2.boundingRect(cnt)
img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
cv_show(img,'img')
```



## 六、图像配准与拼接

### 6.1 特征点检测与匹配



### 6.2 图像配准



### 6.3 图像拼接



## 七、视频处理

### 7.1 视频的读取与显示

### 7.2 视频的基本操作（裁剪、缩放、旋转等）

视频中特定颜色物体追踪

HSV是一个常用于颜色识别的模型，相比 BGR 更易区分颜色，转换模式用`COLOR_BGR2HSV`表示。

> 经验之谈：OpenCV 中色调 H 范围为[0,179]，饱和度 S 是[0,255]，明度 V 是[0,255]。虽然 H 的理论数值是 0°~360°，但 8 位图像像素点的最大值是 255，所以 OpenCV 中除以了 2，某些软件可能使用不同的尺度表示，所以同其他软件混用时，记得归一化。

现在，我们实现一个使用 HSV 来只显示视频中蓝色物体的例子，步骤如下：

1. 捕获视频中的一帧
2. 从 BGR 转换到 HSV
3. 提取蓝色范围的物体
4. 只显示蓝色物体



```python
import numpy as np

capture = cv2.VideoCapture(0)

# 蓝色的范围，不同光照条件下不一样，可灵活调整
lower_blue = np.array([100, 110, 110])
upper_blue = np.array([130, 255, 255])

while(True):
    # 1.捕获视频中的一帧
    ret, frame = capture.read()

    # 2.从 BGR 转换到 HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # 3.inRange()：介于 lower/upper 之间的为白色，其余黑色
    mask = cv2.inRange(hsv, lower_blue, upper_blue)

    # 4.只保留原图中的蓝色部分
    res = cv2.bitwise_and(frame, frame, mask=mask)

    cv2.imshow('frame', frame)
    cv2.imshow('mask', mask)
    cv2.imshow('res', res)

    if cv2.waitKey(1) == ord('q'):
        break
```



其中，`bitwise_and()`函数暂时不用管，后面会讲到。那蓝色的 HSV 值的上下限 lower 和 upper 范围是怎么得到的呢？其实很简单，我们先把标准蓝色的 BGR 值用`cvtColor()`转换下：

```python
blue = np.uint8([[[255, 0, 0]]])
hsv_blue = cv2.cvtColor(blue, cv2.COLOR_BGR2HSV)
print(hsv_blue)  # [[[120 255 255]]]
```



结果是[120, 255, 255]，所以，我们把蓝色的范围调整成了上面代码那样。

> 经验之谈：[Lab](https://baike.baidu.com/item/Lab/1514615)颜色空间也经常用来做颜色识别，有兴趣的同学可以了解下

### 7.3 视频的帧差法与背景建模

### 7.4 光流法在视频中的应用

## 八、摄像头与实时图像处理

### 8.1 摄像头的读取与显示

### 8.2 实时图像处理的基本操作

### 8.3 实时目标检测与跟踪

## 九、图像处理应用案例

### 9.1 人脸识别与表情分析

### 9.2 图像风格迁移

### 9.3 图像语义分割

### 9.4 实时手势识别

## 十、高级主题

### 10.1 图像深度学习

### 10.2 目标跟踪

### 10.3 相机标定与三维重构
