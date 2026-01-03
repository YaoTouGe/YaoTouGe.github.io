---
title: LTC Light Types
weight: 4
---

## LTC Lights

Currently this package supports polygon light, linear light and textured area light. More types will be added in the future such as bezier curve shaped area lights.

Each light type have a corresponding component which can be added to game object, just like the built-in light components.

### Attributes

These are common attributes for all light types:

{{<image src="/imgs/common_attrib.png" title="Common Attributes" alt="Common Attributes" loading="lazy">}}

**`Color`**

Light color in RGB value.

> [!TIP]
> For textured light, this color will be multiplied with texture color.
> 
> {{<image src="/imgs/textured_color.png" title="Multiply Color" alt="Multiply Color" loading="lazy">}}

**`Specular|Diffuse Intensity`**

Light intensity is a multiplier to lighting result, it is composed of diffuse and specular, which can be controlled saperately.

**`Range`**

The space range affected by light, it has different meaning for different light types, **It will not be affected by transform scale**, can be visualized in gizmo when selected.

**`Light Mode`**

The light calculation contains two parts: **diffuse and specular**. Although they can be modulated by metallic, you can choose to use diffuse only, specular only or both of them for special use case.

{{% columns %}}
- {{< card image="/imgs/spec_diff.png" >}}
  Specular and Diffuse
  {{< /card >}}

- {{< card image="/imgs/diff_only.png" >}}
  Diffuse only
  {{< /card >}}

- {{< card image="/imgs/spec_only.png" >}}
  Specular only
  {{< /card >}}

{{% /columns %}}

**`Use World Position`**

Use object local space or world space for light vertices, transform will be ignored if true. This is useful if light vertices is in world space. Like the lazer beam in [shader code sample](/docs/ltclight/sample#shader-code-sample).