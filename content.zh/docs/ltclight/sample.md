---
title: 示例
weight: 1
---

## 示例
该资源包内包含两个示例，你可以在包管理器的示例标签页中导入并体验。

> [!NOTE]
> Samples 标签似乎只有是 import from disk 导入的 package 才会显示，对于直接从 Asset Store 下载的 package 没有这个标签。

{{<image src="/imgs/package_sample_tab.png" title="示例标签页" alt="示例标签页" loading="lazy">}}

若未显示示例标签页，你也可以将 `Realtime Area Lights/Samples~` 文件夹复制到 Assets 目录下。

{{<image src="/imgs/samples_dir.png" title="示例目录" alt="示例目录" loading="lazy">}}

### Shader Graph 示例

本示例展示了如何自定义Shader Graph，使其支持 LTC 光照。

进入 Play 模式后，光源生成器会在随机位置随机生成多边形光源或线性光源；同时场景中还存在一个顶点实时变化的多边形光源，以此演示如何在运行时设置多边形光源的形状。

{{<image src="/imgs/shadergraph_demo.png" title="着色器图演示" alt="着色器图演示" loading="lazy">}}

### Shader 代码示例
本示例展示了如何自定义手写着色器，使其支持 LTC 光照。

其中的亮点功能，是通过线性光源结合物理射线检测模拟实现的激光束效果。Play 模式下，激光束会进行旋转，并被障碍物遮挡截断。

{{<image src="/imgs/shadercode_demo.png" title="着色器代码演示" alt="着色器代码演示" loading="lazy">}}