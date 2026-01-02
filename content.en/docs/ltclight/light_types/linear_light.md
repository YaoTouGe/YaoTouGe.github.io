---
title: Linear Light
---

## Linear Light

Linear light is to simulate light with tube shapes, such as lazer beam, light sword, light stripes.

It's shape is slightly different from polygon light, linear light's shape is determined by only two points: start and end point, its lighting range is a capsule shape.

{{<image src="" alt="tube light">}}

### Attributes

**`Range`**

The radius of a capsule shape, it determines the radius of caps and tube, places outside the capsule will not be lighted.

**`Start Point`**

The start point of linear light, the center of start cap

**`End Point`**

The end point of linear light, the center of end cap.

**`Radius`**

It is not related to **Range**, it's the thickness of the linear light, the thicker the brighter.

{{<image src="" alt="linear light radius">}}