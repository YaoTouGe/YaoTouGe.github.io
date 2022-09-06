---
title: Production Volumetric Rendering 笔记
date: 2022-07-31 11:01:47
draft: true
tags:
- Volumetric
---

最近找到皮克斯的一篇体渲染的教程[Production Volumetric Rendering](https://graphics.pixar.com/library/ProductionVolumeRendering/paper.pdf)，从基本的公式到实践都很全面，值得仔细研读，自己做一个记录加深理解。

### RTE 和 VRE

对于volume我们可以认为是由无数的particle组成，从原子分子到星系中的恒星等，它的特点是粒子的密度低，粒子本身的大小相比于整个volume的尺度可以忽略不计。沙子和雪就不符合这个特点。光在volume中传播时会与粒子发生碰撞，从而决定最后radiance的分布。我们把volume看作是碰撞的概率场，而不是对每个粒子建模（也不可能），粒子与光的碰撞按照概率发生。

碰撞概率密度可以表示为\\(\sigma(x)\\)，通常表示是位置的函数（有时和波长有关）。

Volume有absorption，scattering，phase function，emission四个属性：

* Absorption表示光被Volume完全吸收，物理上转换为热能，动能等其他形式的能力，记作 \\(\sigma_a(x)\\)。
* Scattering指光
