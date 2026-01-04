---
title: 集成到项目
weight: 2
---

## 集成到项目

无论你使用的是自定义渲染管线（SRP） 还是官方的通用渲染管线（URP），本工具在Shader Graph 和手写着色器代码两种开发方式下的集成流程都极为简便。

> [!NOTE]
> 本工具集在多数情况下是独立于渲染管线运行的。其工作原理是从渲染管线中提取粗糙度、法线、金属度等表面参数，完成光照计算后，再将计算结果叠加到原始渲染输出上。

{{% steps %}}
1. ### 添加 LTCLightManager
   
    若要使用 LTC 光照，场景中必须且只能存在一个`LTCLightManager`实例。你可以创建一个空游戏对象，然后为其添加`LTCLightManager`组件。
    
    {{< image src="/imgs/LTCLightManager.png" alt="LTCLightManager" title="LTCLightManager" loading="lazy" >}}
    
    PrefilterTexture着色器的路径如下：
    
    `Real Time Area Lights/Shaders/PrefilterTexture.shader`. 该着色器用于纹理面光源功能，需将其指定给LTCLightManager组件。
    
    你也可以直接使用预制件 Prefabs/LTCManager.prefab，无需额外配置。
    
    {{< image src="/imgs/LTCLightManager_prefab.png" alt="LTCLightManager Prefab" title="LTCLightManager Prefab" loading="lazy" >}}

2. ### 着色器修改
    
    下一步需要对着色器进行简单修改，使材质能够接收 LTC 光照。

    #### Shader Graph
    目前无法直接拦截片段着色器阶段的光照计算流程，但可以将 LTC 附加光照的计算结果连接到自发光通道（Emission Channel），该通道的输出最终会叠加到整体光照结果中。

    {{< image src="/imgs/shadergraph_sample.png" alt="shadergraphsample" title="shadergraphsample" loading="lazy" >}}

    操作方法：在 Shader Graph 中创建一个 LTCLighting 节点（该节点已包含在本工具集中），为其接入与Fragment block 几乎完全一致的输入，最后将节点输出连接 Fragment Block 的自发光端口。 [参考 ShaderGraph 示例](/docs/ltclight/sample#shader-graph-示例).

    #### Shader 代码

    对于手写的着色器，扩展 LTC 光照支持同样便捷。工具集已提供辅助函数，可将 URP 标准光照着色器的输入参数转换为 LTC 光照所需的格式 —— 实际上二者的参数结构基本一致。

    以 URP 标准光照着色器为例，首先在LitForwardPass.hlsl文件中引入 LTC 着色器头文件：

    ``` cpp
    #include "Packages/com.petabytes.ltclight/Shaders/LTC_URP.hlsl"
    ```

    然后在 URP 的 PBR 光照计算完成后，添加 LTC 光照的计算逻辑：

    ``` cpp
    // For example in LitForwardPass.hlsl
    InitializeBakedGIData(input, inputData);
    half4 color = UniversalFragmentPBR(inputData, surfaceData);

    // Add LTC lighting here
    color.rgb += CalculateFragmentLTC(inputData, surfaceData);
    ```

    [参考 Shader 代码示例](/docs/ltclight/sample#着色器代码示例).


3. ### 添加 LTC 光照组件

    最后一步，在场景中创建所需的 LTC 光源即可。

{{% /steps %}}

> [!NOTE]
> ### 自定义渲染管线适配说明
> 若使用自定义渲染管线，你需要提供与 URP 中`inputData`和`surfaceData`数据结构一致的参数，然后参照[Shader 代码](#shader-代码)的方式修改着色器。


### Specular 和 Metallic 工作流适配

在资源制作过程中，你可能会使用高光工作流或金属度工作流，本工具集对两种工作流均提供良好支持：

{{< tabs >}}
{{% tab "URP Shader Graph" %}}

若在 URP 着色器图中集成，需根据当前使用的工作流，将 LTC 光照节点连接到对应的输入通道。

{{< image src="/imgs/shadergraph_workflow.png" alt="specular metallic workflow" title="specular metallic workflow" loading="lazy" >}}

{{% /tab %}}
{{% tab "URP Shader Code" %}}

若在 URP 着色器代码中集成，URP 标准着色器已内置对两种工作流的兼容逻辑，无需额外操作。

{{% /tab %}}
{{%tab "Customized Render Pipeline"%}}

若使用自定义渲染管线，在向 LTC 光照计算函数传递表面参数时，需自行完成金属度与高光参数之间的格式转换，可参考 URP 的`InitializeBRDFData`函数的实现逻辑。

{{%/tab%}}
{{< /tabs >}}
