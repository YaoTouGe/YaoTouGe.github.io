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
    
    {{< image src="/imgs/LTCLightManager.png" alt="LTCLightManager" title="LTCLightManager" loading="lazy" >}}
    
    The PrefilterTexture shader is located in
    
    `Real Time Area Lights/Shaders/PrefilterTexture.shader`. It is used for Textured Light, and should be assigned to LTCLightManager.
    
    Or you can use the Prefabs/LTCManager.prefab directly without additional setup.
    
    {{< image src="/imgs/LTCLightManager_prefab.png" alt="LTCLightManager Prefab" title="LTCLightManager Prefab" loading="lazy" >}}

2. ### Shader Modification
    
    In the next step, minor shader modification is needed to make materials receiving LTC lighting with.

    #### For Shader Graph
    There is no way for us to intercept the lighting process of fragment block, but we can connect our additional lighting to the emission channel, which will be added to the final lighting result. 

    {{< image src="/imgs/shadergraph_sample.png" alt="shadergraphsample" title="shadergraphsample" loading="lazy" >}}

    So you need to create a LTCLighting node (inclued in this package) in shader graph, get input channels which is almost identical with fragment block, and link output to fragment block's emission. [Refer to the ShaderGraph sample](/docs/ltclight/sample#shader-graph-sample).

    #### For Shader Code

    It's also convenient to extend your hand written shaders to receive LTC lighting, there already exists helper functions to convert URP's lit shader input to LTC lighting input, actually they are quite the same. 

    Use URP lit as an example, firstly we should include LTC shaders in LitForwardPass.hlsl:

    ``` cpp
    #include "Packages/com.petabytes.ltclight/Shaders/LTC_URP.hlsl"
    ```

    Then add LTC lighting after URP's PBR calculation:

    ``` cpp
    // For example in LitForwardPass.hlsl
    InitializeBakedGIData(input, inputData);
    half4 color = UniversalFragmentPBR(inputData, surfaceData);

    // Add LTC lighting here
    color.rgb += CalculateFragmentLTC(inputData, surfaceData);
    ```

    [Refer to the shader code sample](/docs/ltclight/sample#shader-code-sample).


3. ### Add LTC Light Components

    The last step is adding LTC light instances in your scene.

    You can create an empty GameObject, and add LTC components to it, there three types of lights can be used directly:

    [LTC Linear Light](/docs/ltclight/light_types/linear_light) 

    [LTC Polygon Light]((/docs/ltclight/light_types/polygon_light))
    
    [LTC Textured Light]((/docs/ltclight/light_types/textured_light)):

    > [!CAUTION]
    > `LTC Light` is the base class of above three light types, it can't be used directly.

    {{<image src="/imgs/ltc_add_components.png" title="Add LTC Components">}}

    Or use the light prefabs in `Real Time Area Lights/Prefabs` directory:

    {{<image src="/imgs/prefabs_dir.png" title="Prefabs Directory">}}

{{% /steps %}}

> [!NOTE]
> ### Customized Render Pipeline
> For customized render pipeline, you need to provide the same data as URP's inputData and surfaceData.
> Then modify your shader the similar way as [For Shader Code](#for-shader-code).


### Specular and Metallic Workflow

You may use specular or metallic workflow in asset authoring, this package adapts well for both:

{{< tabs >}}
{{% tab "URP Shader Graph" %}}

If you are integrating into URP shadergraph, connect to the corresponding input channel according to your workflow:

{{< image src="/imgs/shadergraph_workflow.png" alt="specular metallic workflow" title="specular metallic workflow" loading="lazy" >}}

{{% /tab %}}
{{% tab "URP Shader Code" %}}

If you are integrating to URP shader code, the URP shader has already taken this into consideration.

{{% /tab %}}
{{%tab "Customized Render Pipeline"%}}

For customized render pipeline, you should do the conversion between metallic and specular when offering surface data to LTC calculate function, take URP `InitializeBRDFData` as a reference.

{{%/tab%}}
{{< /tabs >}}
