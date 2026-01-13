---
title: Global Configuration
weight: 5
---
## Global Configuration

After this package is imported, a configuration asset will be created automatically at `Assets/RealTimeAreaLights/ltcconfig.asset`, and a hlsl header file named `ltcconfig.hlsl`.

{{<image src="/imgs/ltcconfig_dir.png" title="config asset path">}}


There are some options on ltcconfig.asset to let you turn on/off the functionality or effects.

{{<image src="/imgs/ltcconfig_inspector.png" title="config asset options">}}

`ltcconfig.hlsl` is generated according to ltcconfig.asset options, make sure click the `Regenerate Config HLSL` button after you change options.

> [!CAUTION]
> `ltcconfig.hlsl` is included by shader of this package, don't remove it or change its directory. Otherwise shader may compile failed.

### Enable Polygon/Linear/Textured Light

If some light types will never be used in your scene, you can turn off them by uncheck the option, part of the shader code will be eliminated by macro defines. In this way you can keep the shader instructions as small as possible, which may improve GPU performance.

### Textured Flip Horizontal

This option controls horizontal flip of textured light, adjust it if you find your textured reflection is inversed horizontally with the textured rectangular mesh.

### Use Perceptual Roughness

It affects which roughness is used in Physically Based Rendering process, perceptual roughness is power of 2 of roughness, it changes more rapidly when smoothness changes from 1 to 0.