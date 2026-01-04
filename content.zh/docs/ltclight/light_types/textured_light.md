---
title: 纹理面光源
---

## 纹理面光源

纹理光源本质上是一种矩形面光源，区别在于它并非单色光源。

光源上每个采样点的辐射亮度由纹理中对应纹素的颜色决定。这一特性极大地拓展了面光源的应用场景，因为现实世界中绝大多数面光源都带有丰富色彩，例如广告牌、电子屏幕等。

{{< image src="/imgs/textured_radiance.png" alt="textured radiance" title="Textured Radiance" loading="lazy" >}}

为了模拟材质表面的粗糙质感，我们会采用不同尺寸的高斯模糊核对纹理进行预滤波处理，并将处理后的结果存储在纹理的 Mipmap 中。对于静态纹理，预滤波操作可在初始一次性完成；而对于实时变化的RenderTexture，则需要每帧执行预滤波。

{{< image src="/imgs/prefilter.png" alt="prefilter" title="prefilter" loading="lazy" >}}

所有经过预滤波处理的纹理结果，都会被存储在一张纹理图集内。该图集的分辨率为 2048×2048，内部划分为 4×4 的单元格网格，每个单元格用于存放一张纹理的预滤波数据。

{{< image src="/imgs/prefilter_atlas.png" alt="prefilter atlas" title="prefilter atlas" loading="lazy" >}}

> [!NOTE]
> 目前所有纹理对应的单元格尺寸均为固定值。这意味着无论原始纹理的分辨率和宽高比如何，都会被拉伸到 512×512 的单元格中。对于分辨率超过 512×512 的纹理而言，其过高的分辨率并不会对纹理光源的最终效果产生任何增益。
>

> [!CAUTION]
> 若原始纹理的宽高比与 1:1 相差过大，生成的纹理光源可能会在某一维度上出现分辨率损失的问题。
> 
> {{< image src="/imgs/stretch_alias.png" alt="stretched" title="stretched" loading="lazy" >}}
>
> 未来需实现一套更灵活的图集分配算法，以适配不同分辨率和宽高比的纹理资源。

### 属性说明

**`IsRealTime（是否实时滤波）`**

若设为 true，纹理预滤波操作将逐帧执行，这会带来额外的性能开销。该属性适用于内容持续变化的场景，例如视频纹理。

> [!CAUTION]
> 对于静态纹理，务必将 IsRealTime 设为 false，否则会造成不必要的性能浪费。

**`Texture（纹理资源）`**

指定当前纹理光源所使用的纹理，既可以是静态的 Texture2D 纹理资源，也可以是运行时动态生成的 RenderTexture 渲染纹理。

**`Width（宽度）`**

纹理光源的物理宽度。

**`Height（高度）`**

纹理光源的物理高度。