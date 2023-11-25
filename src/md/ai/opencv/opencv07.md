

# 七、视频处理

## 7.1 视频的读取与显示

## 7.2 视频的基本操作（裁剪、缩放、旋转等）

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

## 7.3 视频的帧差法与背景建模

## 7.4 光流法在视频中的应用
