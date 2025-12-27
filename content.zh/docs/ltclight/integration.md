---
title: 集成到项目
weight: 2
---
## 集成到项目
要使用 LTC 光源，场景中必须且只能存在一个 `LTCLightManager` 实例。你可直接使用预制体 `Prefabs/LTCManager.prefab`。

接下来需要设置材质，使其能够接收 LTC 光照，具体步骤分以下两种场景：

### 针对 Shader Graph 的设置
我们无法修改 Fragment graph 的光照计算，但可将额外的 LTC 光照添加到「自发光（Emission）」通道中，该通道的效果会融入最终光照结果。

![图片](/imgs/shadergraph_sample.png)

操作步骤如下：在 Shader Graph 中添加一个「LTCLighting」节点（该节点已包含在本资源包中），为其添加与 Fragment 模块几乎完全一致的输入通道，再将输出连到 Fragment 模块的自发光通道即可。你可参考 Shader Graph 示例项目中的具体设置。

### 针对 Shader 代码的设置
扩展手写着色器以支持 LTC 光照同样便捷，资源包中已提供辅助函数，可将 URP（通用渲染管线）光照着色器的输入转换为 LTC 光照的输入——实际上两者的输入格式基本一致。

以 URP Lit 着色器为例，具体步骤如下：
1. 在 `LitForwardPass.hlsl` 文件中引入 LTC 着色器：
   ```cpp
   #include "Packages/com.petabytes.ltclight/Shaders/LTC_URP.hlsl"
   ```
2. 在 URP 的 PBR（基于物理的渲染）计算完成后，添加 LTC 光照计算：
   ```cpp
   // 示例代码位于 LitForwardPass.hlsl 中
   InitializeBakedGIData(input, inputData);
   half4 color = UniversalFragmentPBR(inputData, surfaceData);

   // 在此处添加 LTC 光照
   color.rgb += CalculateFragmentLTC(inputData, surfaceData);
   ```

完成以上步骤后，最后一步是在场景中添加 LTC 光源实例。

