---
title: Polygon Light
weight: 1
---

## Polygon Light

Polygon light is useful to simulate monochromatic area light, such as window of indoor scene, outdoor emissive shapes.

{{< image src="placeholder.svg" alt="Polygon Light" title="Polygon Light" loading="lazy" >}}

The shape of polygon light is described by a list of polygon vertices, you can change the shape use preset polygons.

{{< image src="preset_polygon.png" alt="preset polygon" loading="lazy">}}

Or assign an customized shape to it.

{{< image src="customize_polygon.png" alt="customize polygon" loading="lazy">}}

> [!CAUTION]
> Polygon shape should be centered at transform position.

> [!CAUTION]
> It's suggested to make polygon vertices coplane (2D polygon).

### Attributes

**`Range`**

The radius of bounding sphere, places outside the sphere will not be lighted.

{{< image src="polygon_range.png" alt="polygon range" loading="lazy">}}

**`Double Sided`**

A double sided light will light up both front and back side of the polygon. Otherwise only the front side receives lighting.

{{< image src="double_sided.png" alt="double sided" loading="lazy">}}

**`PolygonPoints`**

Assign customized polygon shapes, the polygon points should be 2D polygon, and centered at transform position.

> [!NOTE]
> The front direction

**`Preset`**

Some preset polygon shapes like pentagon, hexagon, etc. It's an editor only attribute for convenience, not exist in runtime.

### Performance
