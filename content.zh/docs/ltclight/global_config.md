---
title: 全局配置
weight: 5
---
## 全局配置

在这个package 导入后，它会自动创建一个全局的配置文件 `Assets/RealTimeAreaLights/ltcconfig.asset`, 以及一个 hlsl 的头文件 `ltcconfig.hlsl`.

{{<image src="/imgs/ltcconfig_dir.png" title="config asset path">}}

ltcconfig.asset 上有一些选项用于打开关闭部分功能或者效果。

{{<image src="/imgs/ltcconfig_inspector.png" title="config asset options">}}

`ltcconfig.hlsl` 是根据 ltcconfig.asset 的选项自动生成的, 要确保点击 `Regenerate Config HLSL` 按钮来使得配置选项的修改生效。

> [!CAUTION]
> `ltcconfig.hlsl` 被本资源包的 shader 所引用，不要移除或者改变它的路径，否则会导致 shader 编译错误。

### Enable Polygon/Linear/Textured Light

如果在你的场景中从未使用某些光源类型，你可以把它们关掉，这样一部分 shader 代码会被宏定义所屏蔽。通过这个方式可以尽量减少 shader 的指令数量，有助于提升 GP U的性能。

### Textured Flip Horizontal

这个选项会在水平方向翻转纹理光源的效果，如果你发现纹理光源的反射和对应的贴图矩形相反，可以调整这个选项。

### Use Perceptual Roughness

影响粗糙度的计算，perceptual roughness 等于 roughness 的平方，它比 roughness 变化更快，根据你的习惯选择使用哪种粗糙度计算。