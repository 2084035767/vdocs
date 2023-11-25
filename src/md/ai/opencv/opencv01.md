# 一、OpenCV 简介

## 1.1 OpenCV是什么？

OpenCV是一个基于BSD许可（开源）发行的跨平台计算机视觉库，可以运行在Linux、Windows、Android和Mac OS操作系统上。它轻量级而且高效——由一系列 C 函数和少量 C++ 类构成，同时提供了Python、Ruby、MATLAB等语言的接口，实现了图像处理和计算机视觉方面的很多通用算法。 OpenCV用C++语言编写，它的主要接口也是C++语言，但是依然保留了大量的C语言接口。

在计算机视觉项目的开发中，OpenCV作为较大众的开源库，拥有了丰富的常用图像处理函数库，采用C/C++语言编写，可以运行在Linux/Windows/Mac等操作系统上，能够快速的实现一些图像处理和识别的任务。此外，OpenCV还提供了Java、python、cuda等的使用接口、机器学习的基础算法调用，从而使得图像处理和图像分析变得更加易于上手，让开发人员更多的精力花在算法的设计上。

## 1.2 OpenCV的功能和应用领域



## 1.3 安装OpenCV

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
