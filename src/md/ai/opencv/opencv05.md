# 五、图像分割与轮廓提取

## 5.1 基于阈值的图像分割



## 5.2 基于边缘的图像分割



## 5.3 基于区域的图像分割



## 5.4 轮廓提取与分析

轮廓是一系列相连的点组成的曲线，代表了物体的基本外形。

边缘主要是作为图像的特征使用，比如可以用边缘特征可以区分脸和手，而轮廓主要用来分析物体的形态，比如物体的周长和面积等，可以说边缘包括轮廓。

从定义上来说它是指图像中连续的曲线或边界，表示了图像中目标的形状和外观特征。



**边缘：** 零零散散的

**轮廓：** 它是一个整体



### 轮廓检测

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



### 轮廓特征

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



### 轮廓近似

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



### 外接矩形

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


