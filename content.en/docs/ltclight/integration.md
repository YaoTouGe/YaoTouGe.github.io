---
title: Integration
weight: 2
---

## Integration

In order to usage LTC lights, there must exist one and only one LTCLightManager instance in scene. You can use the Prefabs/LTCManager.prefab directly.

The next step is to make materials' receiving LTC lighting:

### For Shader Graph
There is no way for us to intercept the lighting process of Fragment block, but we can just add our additional LTC lighting to the emission channel, which will be added to the final lighting result. 

![img](/imgs/shadergraph_sample.png)

So what we need is add a LTCLighting node (inclued in this package) in shader graph, add input channels which is almost identical with Fragment block, and link output to Fragment block's emission. You can just refer to the ShaderGraph sample.

### For Shader Code

It's also convenient to extend your hand written shaders to receive LTC lighting, there already exists helper functions to convert URP's lit shader input to LTC lighting input, actually they are quite the same. 

Use URP lit as an example, firstly we should include LTC shaders in LitForwardPass.hlsl:

``` cpp
#include "Packages/com.petabytes.ltclight/Shaders/LTC_URP.hlsl"
```

Then add LTC lighting after URP's pbr calculation:

``` cpp
// For example in LitForwardPass.hlsl
InitializeBakedGIData(input, inputData);
half4 color = UniversalFragmentPBR(inputData, surfaceData);

// Add LTC lighting here
color.rgb += CalculateFragmentLTC(inputData, surfaceData);
```

That's all!

The last step is adding LTC light instances in your scene.
