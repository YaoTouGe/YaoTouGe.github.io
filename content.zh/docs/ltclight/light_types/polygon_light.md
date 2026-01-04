---
title: 多边形光源
weight: 1
---

## 多边形光源

多边形光源适用于模拟单色面光源，例如室内场景的窗户、室外的自发光造型等。

{{< image src="/imgs/polygon_type.png" alt="Polygon Light" title="Polygon Light" loading="lazy" >}}

多边形光源的形状由一组多边形顶点定义，你可以使用预设多边形来修改其形状。

{{< image src="/imgs/polygon_preset.png" alt="preset polygon" title="preset polygon" loading="lazy">}}

也可以为其自定义形状。

{{< image src="/imgs/customize_polygon.png" alt="customize polygon" title="customize polygon" loading="lazy">}}

> [!CAUTION]
> 多边形形状的中心应与transform 一致。

> [!CAUTION]
> 建议设置的多边形顶点为共面的（即二维多边形）。

### 属性说明

**`Range（范围）`**

指包围球的半径，球体范围外的区域不会被该光源照亮。

{{< image src="/imgs/polygon_range.png" title="polygon range" alt="polygon range" loading="lazy">}}

**`Double Sided（双面发光）`**

启用双面发光的光源会同时照亮多边形的正面和背面；若不启用，则仅正面会被照亮。

{{< image src="/imgs/polygon_double_sided.png" alt="double sided" title="double sided" loading="lazy">}}

**`PolygonPoints（多边形顶点）`**

你可以为该属性指定一组自定义多边形的顶点数据，这些顶点需构成二维多边形，且中心要与变换位置重合。

> [!INFO]
> 正面方向向量 {{< katex >}}\vec {f}{{< /katex >}} 由中心点 {{< katex >}} o {{< /katex >}}（若使用世界坐标则为原点，否则为 transform 位置）和多边形顶点计算得出。其中 {{< katex >}} a {{< /katex >}} 和 {{< katex >}} b {{< /katex >}} 是多边形上两个连续的顶点。
计算公式：
>
> {{<katex>}}\vec {f}=\vec {oa} \times \vec {ob} {{< /katex >}}

**`Preset（预设形状）`**

包含多种预设多边形形状，如五边形、六边形等。该属性是为了方便操作而设计的编辑器专属属性，在运行时不可使用。
