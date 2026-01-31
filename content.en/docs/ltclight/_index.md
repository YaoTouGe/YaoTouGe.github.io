---
title: LTC Real Time Area Lights
bookCollapseSection: true
aliases:
- /posts/ltc_area_light/
---

## User Guide

[WebGL demo](https://yaotouge.github.io/imgs/LTCDemo/WebGLBuild/index.html).

[Video tutorial](https://www.youtube.com/watch?v=oFB4uncHZ5c).

This document will guide you through the usage of **Real Time Area Lights** package. This package extends Unity's lighting system with area light support. Here are showcases for different light type:

Polygon light:

{{< image src="/imgs/polygon.png" alt="polygon" title="polygon" loading="lazy" >}}

Linear light:

{{< image src="/imgs/linear.png" alt="linear" title="linear" loading="lazy" >}}

Textured light:

{{< image src="/imgs/textured.png" alt="textured" title="textured" loading="lazy" >}}

### Area Light

Traditional lighting calculation abstracts light source as a point without volume at some position (spot light, point light, etc.) or at infinite distance (directional light). This abstraction simplify calculation for real time graphics.

However, light source in real world isn't infinite small, the difference would become apparent when light source is relatively large. In order to achieve a visually correct result, the lighting algorithm would involve expensive method like Monte Carlo integration which is unaffordable for realtime application.

### Linearly Transformed Cosines
[Linearly Transformed Cosines](https://eheitzresearch.wordpress.com/415-2/) lead us a way to approximate area light with an anatical solution, we can get convincible result in constant time.

The author finds that we already have anatical solution for integrating a polygon on cosine spherical distribution, but cosine distribution is only correct for diffuse surfaces.

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_integration2.png?w=625">}}

One step further, they creatively use a matrix to transform cosine distribution to physcailly based BRDFs (approximately), in other words, we can use the inverse transform to convert PBR BRDF to cosine spherical distribution, which has anatical solution.

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_isotropic.gif?w=625">}}

And finally, we transform the polygon from PBR BRDF space into the cosine spherical space, do the anatical polygon integration.

{{<image src="https://eheitzresearch.wordpress.com/wp-content/uploads/2016/04/ltc_integration.gif?w=625">}}