---
title: Textured Light
---

## Textured Light

Textured light is an rectangular polygon light itself except that it's not monochromatic.

The radiance at each point is determined by texel in an texture. This extends polygon light a lot, since most area light source in real life is colorful, like billboard, screen.

{{< image src="/imgs/textured_radiance.png" alt="textured radiance" title="Textured Radiance" loading="lazy" >}}

In order to mimic roughness appearance, we will prefilter the texture with different gaussian blur kernel size and store them in texture mipmaps. The prefilter process can be executed **once at start up** for static textures, or **per-frame** for realtime changed render textures.

{{< image src="/imgs/prefilter.png" alt="prefilter" title="prefilter" loading="lazy" >}}

All prefiltered results are stored in an texture atlas, the altas texture is 2048 x 2048, splitted in 4 x 4 cells for each texture.

{{< image src="/imgs/prefilter_atlas.png" alt="prefilter atlas" title="prefilter atlas" loading="lazy" >}}

> [!NOTE]
> Currently the cell size is fixed for all textures, that means not matter what the original texture resolution and aspect ration is, it will be fitted into an 512 x 512 cell. Texture with resoltion higher than 512 x 512 will make no difference for textured light.
>

> [!CAUTION]
> If original texture's aspect ratio is far from 1:1, the resulted texture light may lose resolution in one dimension.
> 
> {{< image src="/imgs/stretch_alias.png" alt="stretched" title="stretched" loading="lazy" >}}
>
> A more flexible atlas allocation algorithm should be implemented for textures with different resolution and aspect ratio in the future.

### Attributes

**`IsRealTime`**

If true, the texture prefiltering process will be executed each frame, which brings additional cost. Use it for content which is always changing, such as video textures.

> [!CAUTION]
> Static textures should set IsRealTime to false, otherwise it will be prefiltered each frame even its content is the same, waste GPU resources.

**`Texture`**

The texture of this light, it can be a static Texture2D, or runtime generated RenderTexture.

> [!NOTE]
> If texture is none, textured light will use default white texture, behaves like rectangular polygon light. You can still adjust color of it.

**`Width`**

The width of textured light.

**`Height`**

The height of textured light.

**`Barn Door`**

There is a special attribute for textured light named barn door, it controls the barn door around textured light and affect how much area it can lit.

{{<image src="/imgs/barn_door_textured0.png" title="Barn Door Angle 0">}}

{{<image src="/imgs/barn_door_textured60.png" title="Barn Door Angle 60">}}

`Barn Door Length` is how long the barn door is. The longer it is, more light will be occluded.

`Barn Door Angle` is angle of barn door. it ranges from 0 to 90.