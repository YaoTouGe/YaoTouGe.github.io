---
title: Linear Light
---

## Linear Light

Linear light is to simulate light with line shapes, such as laser beam, light sword, light stripes.

It's shape is slightly different from polygon light, linear light's shape is determined by only two points: start and end point, its lighting range is a capsule shape.

{{<image src="/imgs/tube_type.png" alt="tube light" title="tube light">}}

### Attributes

**`Range`**

The radius of a capsule shape, it determines the radius of caps and tube, places outside the capsule will not be lighted.

{{<image src="/imgs/tube_range.gif" alt="tube range" title="tube range">}}

**`Start Point`**

The start point of linear light, the center of start cap

**`End Point`**

The end point of linear light, the center of end cap.

**`Radius`**

It is not related to **Range**, it's the thickness of the linear light, the thicker the brighter.

{{<image src="/imgs/tube_radius.gif" alt="linear light radius" alt="linear light radius">}}