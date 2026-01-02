---
title: Integration
weight: 2
---

## Integration

The integration process is extreamely easy for both shader graph and shader code, no matter you are using an customized SRP render pipeline, or the offical Universal Render Pipeline.

> [!NOTE]
> This package works in isolation with render pipeline in most of the time, it extract surface parameters like roughtness, normal, metallic and so on from the render pipeline, do lighting calculation, then add the result back to the original render result.

{{% steps %}}
1. ### Add LTCLightManager
   
    In order to use LTC lights, there must exist one and only one LTCLightManager instance in scene. Create an empty game object, and add LTCLightManger component to it. 
    
    {{< image src="placeholder.svg" alt="A placeholder" title="A placeholder" loading="lazy" >}}
    
    Or you can use the Prefabs/LTCManager.prefab directly.
    
    {{< image src="placeholder.svg" alt="A placeholder" title="A placeholder" loading="lazy" >}}

2. ### Shader Modification
    
    Then you need to make materials receiving LTC lighting with minor shader modification.

    #### For Shader Graph
    There is no way for us to intercept the lighting process of Fragment block, but we can just add our additional LTC lighting to the emission channel, which will be added to the final lighting result. 

    {{< image src="/imgs/shadergraph_sample.png" alt="shadergraphsample" title="shadergraphsample" loading="lazy" >}}

    So what we need is add a LTCLighting node (inclued in this package) in shader graph, add input channels which is almost identical with Fragment block, and link output to Fragment block's emission. You can just refer to the ShaderGraph sample.

    #### For Shader Code

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


3. ### Add LTC Light Components

    The last step is adding LTC light instances in your scene.
That's all!
{{% /steps %}}


### Specular and Metallic Workflow

You may use specular or metallic workflow in asset authoring, this package adapts well for both:

{{< tabs >}}
{{% tab "URP Shader Graph" %}}

If you are integrating into URP shadergraph, connect to the corresponding input channel according to your workflow:

{{< image src="/imgs/shadergraph_spec_metallic.png" alt="specular metallic workflow" title="specular metallic workflow" loading="lazy" >}}

{{% /tab %}}
{{% tab "URP Shader Code" %}}

If you are integrating to URP shader code, the URP shader has already taken this into consideration.

{{% /tab %}}
{{%tab "Customized Render Pipeline"%}}

For customized render pipeline, you should do the conversion from metallic to specular when offering surface parameters to LTC calculate function, take URP as a reference:

{{%/tab%}}
{{< /tabs >}}
