---
title: LTC Light Types
weight: 4
---

## LTC Lights

Currently this package supports polygon light, linear light and textured area light. More types will be added in the future such as bezier curve shaped area lights.

Each light type have a corresponding component which can be added to game object, just like the built-in light components.

### Attributes

These are common attributes for all light types:

{{<image src="common_parameters.png" alt="common paramenters">}}

**`Color`**

Light color in RGB value.

> [!TIP]
> For textured light, this color will be multiplied with texture color.

{{<image src="color_multiply" alt="multiply" loading="lazy">}}

**`Intensity`**

Light intensity, a multiplier to lighting result.

**`Range`**

The space range affected by light, it has different meaning for different light types, **It will not be affected by transform scale, can be visualized when selected**.

**`Light Mode`**

The light calculation contains two parts: diffuse and specular.

Although they can be modulated by metallic, you can choose to to use diffuse only, specular only or both of them for special use case.

**`Use World Position`**

Use object local space or world space for light shapes, transform will be ignored if true.