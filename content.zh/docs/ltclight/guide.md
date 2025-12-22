---
title: LTC 实时面光源
date: 2025-10-29 11:01:47
tags:
- LTC
draft: false
aliases:
- /posts/ltc_area_light_cn/
---

# 使用指南

[WebGL demo](https://yaotouge.github.io/imgs/LTCDemo/WebGLBuild/index.html).

本文档将指导你使用 LTC 光源插件，以下是几种不同光源类型的效果展示：

### 多边形光源
![图片](/imgs/polygon.png)

### 线性光源
![图片](/imgs/linear.png)

### 纹理光源
![图片](/imgs/textured.png)


## 示例项目
该资源包包含两个示例项目，你可在 PackageManager（资源包管理器）的「Samples（示例）」标签页中导入查看，若没有 Samples 标签页，也可以直接从 package 目录下的 Samples~ 拷贝到 Assets 中。

### Shader Graph 示例
此示例展示如何自定义 Shader Graph，使其能够接收 LTC 光照。  
进入Play模式后，场景会在随机位置随机生成多边形光源或线光源；同时还有一个顶点不断变化的多边形光源，演示如何在运行时设置多边形光源的形状。

### Shader 代码示例
此示例展示如何通过手写代码自定义着色器，使其能够接收 LTC 光照。  
其中一个有趣的样例：结合物理射线检测，用线性光源模拟激光束。运行时激光束会旋转，且会被障碍物遮挡。线性光源非常适合制作光剑、激光瞄准镜等效果。


## 基础使用方法
要使用 LTC 光源，场景中必须且只能存在一个 `LTCLightManager` 实例。你可直接使用预制体 `Prefabs/LTCManager.prefab`。

接下来需要设置材质，使其能够接收 LTC 光照，具体步骤分以下两种场景：

### 针对 Shader Graph 的设置
我们无法修改 Fragment graph 的光照计算，但可将额外的 LTC 光照添加到「自发光（Emission）」通道中，该通道的效果会融入最终光照结果。

![图片](/imgs/shadergraph_sample.png)

操作步骤如下：在 Shader Graph 中添加一个「LTCLighting」节点（该节点已包含在本资源包中），为其添加与 Fragment 模块几乎完全一致的输入通道，再将输出连到 Fragment 模块的自发光通道即可。你可参考 Shader Graph 示例项目中的具体设置。

### 针对 Shader 代码的设置
扩展手写着色器以支持 LTC 光照同样便捷，资源包中已提供辅助函数，可将 URP（通用渲染管线）光照着色器的输入转换为 LTC 光照的输入——实际上两者的输入格式基本一致。

以 URP Lit 着色器为例，具体步骤如下：
1. 在 `LitForwardPass.hlsl` 文件中引入 LTC 着色器：
   ```cpp
   #include "Packages/com.petabytes.ltclight/Shaders/LTC_URP.hlsl"
   ```
2. 在 URP 的 PBR（基于物理的渲染）计算完成后，添加 LTC 光照计算：
   ```cpp
   // 示例代码位于 LitForwardPass.hlsl 中
   InitializeBakedGIData(input, inputData);
   half4 color = UniversalFragmentPBR(inputData, surfaceData);

   // 在此处添加 LTC 光照
   color.rgb += CalculateFragmentLTC(inputData, surfaceData);
   ```

完成以上步骤后，最后一步是在场景中添加 LTC 光源实例。


## LTC 光源类型
目前支持三种光源类型：多边形光源、线性光源和纹理面光源。未来将新增更多类型，如贝塞尔曲线形状的面光源。

所有光源类型均包含以下通用属性：

| 属性名称 | 描述 |
|----------|------|
| Color（颜色） | 光源的 RGB 颜色 |
| Intensity（强度） | 光源的发光强度 |
| Range（范围） | 光源的影响空间范围，不同光源类型对该属性的定义不同。**此属性不受物体缩放影响，选中光源时可以通过 gizmo 可查看范围** |
| Light Mode（光照模式） | 选择仅使用漫反射光照、仅使用镜面反射光照，或两者同时使用 |
| Use World Position（使用世界坐标） | 光源形状的坐标基于物体本地空间还是世界空间 |

---

### 多边形光源的专用属性
| 属性名称 | 描述 |
|----------|------|
| Range（范围） | 包围球的半径，球外区域不受该光源影响 |
| Double Sided（双面发光） | 多边形光源是否对正反两侧物体的都产生光照效果 |
| PolygonPoints（多边形顶点） | 自定义多边形形状的顶点数据，顶点需构成以原点为中心的 2D 多边形 |
| Preset（预设形状） | 提供五边形、六边形等预设多边形形状，仅为编辑器内便捷操作设计，运行时无此属性 |

---

### 线性光源的专属属性
| 属性名称 | 描述 |
|----------|------|
| Range（范围） | 胶囊体的范围，定义胶囊两端半球的半径和中间圆柱的长度，胶囊体外部区域不受该光源影响 |
| Start Point（起点） | 线性光源的起点，即胶囊体一端半球的球心 |
| End Point（终点） | 线性光源的终点，即胶囊体另一端半球的球心 |
| Radius（半径） | 与 **Range（范围）** 无关，仅表示线性光源的“粗细”，数值越大，光源看起来越亮 |

---

### 纹理光源的专属属性
| 属性名称 | 描述 |
|----------|------|
| IsRealTime（实时更新） | 若设为 true，纹理预过滤过程会每帧执行，会增加额外性能消耗。建议仅对视频纹理等持续变化的内容启用此选项 |
| Texture（纹理） | 光源使用的纹理，可选择静态 Texture2D 或运行时生成的 RenderTexture |
| Width（宽度） | 纹理光源的宽度 |
| Height（高度） | 纹理光源的高度 |
