---
title: Samples
weight: 1
---

## Samples

There are two samples in package, you can import them from PackageManager's Sample tab and play around. If no Sample tab appears, you can also copy Realtime Area Light/Samples~ folder to Assets.

### Shader Graph Sample
It demonstrates how to customize a shader graph to make it receives LTC lighting.

When enter play mode, the light spawner will spawn polygon lights or linear lights randomly at random place, and there is also a polygon light whose polygon vertices is changing, shows how to set polygon light shapes at runtime.

### Shader Code Sample
It demonstrates how to customize a hand written shader to make it receives LTC lighting.

The interesting part is the lazer beam simulated by a linear light combined with physics raycasting, which rotates around in play mode, and it will be occluded by obstacles. Linear lights are well suited for effects like light saber, laser scope.