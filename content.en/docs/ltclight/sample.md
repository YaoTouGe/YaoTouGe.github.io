---
title: Samples
weight: 1
---

## Samples

There are two samples in package, you can import them from PackageManager's Samples tab and play around. 

{{<image src="/imgs/package_sample_tab.png" title="Sample Tab" alt="Sample Tab" loading="lazy">}}

If no Samples tab appears, you can also copy Realtime Area Light/Samples~ folder to Assets.

{{<image src="/imgs/package_sample_directory.png" title="Sample Dir" alt="Sample Dir" loading="lazy">}}

### Shader Graph Sample
It demonstrates how to customize a shader graph to make it receives LTC lighting.

When enter play mode, the light spawner will spawn polygon lights or linear lights randomly at random place, and there is also a polygon light whose polygon vertices is changing, shows how to set polygon light shapes at runtime.

{{<image src="/imgs/shadergraph_demo.png" title="Shader Graph Demo" alt="Shader Graph Demo" loading="lazy">}}

### Shader Code Sample
It demonstrates how to customize a hand written shader to make it receives LTC lighting.

The interesting part is the lazer beam simulated by a linear light combined with physics raycasting, which rotates around in play mode, and it will be clipped by obstacles.

{{<image src="/imgs/shadercode_demo.png" title="Shader Code Demo" alt="Shader Code Demo" loading="lazy">}}