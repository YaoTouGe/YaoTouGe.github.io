---
title: LTC 实时面光源
bookCollapseSection: true
aliases:
- /posts/ltc_area_light_cn/
---

## 使用指南

[WebGL demo](https://yaotouge.github.io/imgs/LTCDemo/WebGLBuild/index.html).

[视频教程](https://www.bilibili.com/video/BV1cy6JBxEdm/?share_source=copy_web&vd_source=8103817876f93578b971b7a788e94647).

本文档将指导你使用**实时面光源**插件包。该插件包扩展了 Unity 的光照系统，使其支持面光源功能。以下是不同光源类型的效果展示：

多边形光源：
{{< image src="/imgs/polygon.png" alt="polygon" title="polygon" loading="lazy" >}}

线光源：
{{< image src="/imgs/linear.png" alt="linear" title="linear" loading="lazy" >}}

带纹理光源：
{{< image src="/imgs/textured.png" alt="textured" title="textured" loading="lazy" >}}

### 面光源
传统光照计算会将光源抽象为空间中某一位置上无体积的点（如聚光灯、点光源等），或是处于无限远处的光源（如平行光）。这种抽象简化了实时图形学的光照计算流程。

但现实世界中的光源并非无限小，当光源体积相对较大时，这种抽象模型与真实效果的差异会变得十分明显。要实现视觉上精准的光照效果，光照算法往往需要用到蒙特卡洛积分这类计算成本极高的方法，而这并不适用于实时应用场景。

### 线性变换余弦函数
[线性变换余弦函数（LTC）](https://eheitzresearch.wordpress.com/415-2/)为我们提供了一种解析解近似面光源的方法，能够在常数时间内得到可信度较高的光照计算结果。

该方法的提出者发现，我们已经拥有一套针对余弦球面分布的多边形积分解析解，但余弦分布仅适用于漫反射表面的光照计算。

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_integration2.png?w=625">}}

更进一步，他们创新性地引入矩阵变换，将余弦分布转换为基于物理的光照反射分布（PBR BRDF）（近似转换）。换句话说，我们可以通过逆变换，将基于物理的光照反射分布转换为存在解析解的余弦球面分布。

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_isotropic.gif?w=625">}}

最终，我们将多边形从基于物理的光照反射分布空间，变换到余弦球面分布空间中，再执行多边形积分的解析计算即可。

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_integration.gif?w=625">}}