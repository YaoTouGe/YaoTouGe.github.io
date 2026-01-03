---
title: Polygon Light
weight: 1
---

## Polygon Light

Polygon light is useful to simulate monochromatic area light, such as window of indoor scene, outdoor emissive shapes.

{{< image src="/imgs/polygon_type.png" alt="Polygon Light" title="Polygon Light" loading="lazy" >}}

The shape of polygon light is described by a list of polygon vertices, you can change the shape use preset polygons.

{{< image src="/imgs/polygon_preset.png" alt="preset polygon" title="preset polygon" loading="lazy">}}

Or assign an customized shape to it.

{{< image src="/imgs/customize_polygon.png" alt="customize polygon" title="customize polygon" loading="lazy">}}

> [!CAUTION]
> Polygon shape should be centered at transform position.

> [!CAUTION]
> It's suggested to make polygon vertices coplanar (2D polygon).

### Attributes

**`Range`**

The radius of bounding sphere, places outside the sphere will not be lighted.

{{< image src="/imgs/polygon_range.png" title="polygon range" alt="polygon range" loading="lazy">}}

**`Double Sided`**

A double sided light will light up both front and back side of the polygon. Otherwise only the front side receives lighting.

{{< image src="/imgs/polygon_double_sided.png" alt="double sided" title="double sided" loading="lazy">}}

**`PolygonPoints`**

You can assign a list of customized polygon shapes to this attribute, the polygon points should be 2D polygon, and centered at transform position.

> [!INFO]
> The front direction {{< katex >}}\vec{f}{{< /katex >}} is calculted from center {{< katex >}}o{{< /katex >}} (transform position or origin if use world position) and polygon vertices. {{< katex >}}a{{< /katex >}} and {{< katex >}}b{{< /katex >}} are two consecutive vertices of polygon.
>
> {{< katex >}}\vec{f}=\vec{oa} \times \vec{ob} {{< /katex >}}

**`Preset`**

Some preset polygon shapes like pentagon, hexagon, etc. It's an editor only attribute for convenience, not accessable at runtime.
