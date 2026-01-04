---
title: LTC 光源类型
weight: 4
---

## LTC 面光源

当前该资源包支持多边形光源、线性光源和带纹理面光源。未来还将新增更多光源类型，例如贝塞尔曲线形状的面光源。

### 属性说明

以下是所有光源类型的通用属性：

{{<image src="/imgs/common_attrib.png" title="Common Attributes" alt="Common Attributes" loading="lazy">}}

**`Color（颜色）`**

光源的 RGB 颜色值。

> [!TIP]
> 对于带纹理的光源，该颜色会与纹理自身的颜色进行相乘叠加。
> 
> {{<image src="/imgs/textured_color.png" title="Multiply Color" alt="Multiply Color" loading="lazy">}}

**`高光/漫反射强度（Specular|Diffuse Intensity）`**

光源强度是光照计算结果的乘数因子，由漫反射强度和高光强度两部分组成，二者可独立调节。

**`Range（作用范围）`**

光源影响的空间范围，该参数在不同光源类型下的含义有所区别。此范围不受对象缩放变换的影响，选中光源对象后，可在场景视图中通过 Gizmo 直观查看作用范围。

**`Light Mode（光照模式）`**

光照计算包含两个核心部分：漫反射光照与高光反射光照。尽管这两项计算结果会受材质金属度属性的调节，但你仍可根据特殊需求，选择仅启用漫反射、仅启用高光反射，或同时启用两种光照模式。

{{% columns %}}
- {{< card image="/imgs/spec_diff.png" >}}
  高光 + 漫反射模式
  {{< /card >}}

- {{< card image="/imgs/diff_only.png" >}}
  仅漫反射模式
  {{< /card >}}

- {{< card image="/imgs/spec_only.png" >}}
  仅高光反射模式
  {{< /card >}}

{{% /columns %}}

**`Use World Position（使用世界坐标）`**

设置光源顶点的坐标空间：勾选后使用世界空间，此时对象的transform 会被忽略；未勾选时使用对象局部空间。该选项适用于光源顶点基于世界空间的场景，例如 [着色器代码示例](/docs/ltclight/sample#shader-代码示例) 中的激光束效果。