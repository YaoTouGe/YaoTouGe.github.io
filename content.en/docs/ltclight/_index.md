---
title: LTC Real Time Area Lights
bookCollapseSection: true
aliases:
- /posts/ltc_area_light/
---

## User Guide

[WebGL demo](https://yaotouge.github.io/imgs/LTCDemo/WebGLBuild/index.html).

This document will guide you through the usage of **Real Time Area Lights** package. This package extends Unity's lighting system with area light support. Here are showcases for different light type:

Polygon light:

{{< image src="/imgs/polygon.png" alt="polygon" title="polygon" loading="lazy" >}}

Linear light:

{{< image src="/imgs/linear.png" alt="linear" title="linear" loading="lazy" >}}

Textured light:

{{< image src="/imgs/textured.png" alt="textured" title="textured" loading="lazy" >}}

### Area Light

Traditional lighting calculation abstracts light source as a point at some position (spot light, point light, etc.) or at infinite distance (directional light). This abstraction simplify calc for real time graphics.

However, this simplification 

Area light integration is difficult for real time application.

Linearly Transformed Cosines lead us a way to approximate it with an anatical solution.

### Linearly Transformed Cosines