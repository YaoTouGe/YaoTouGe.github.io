---
title: 线光源
---

## 线光源

线光源用于模拟呈线条形态的光线，例如激光束、光剑、光带等。

其形态与多边形光源略有区别，线光源的形态仅由两点决定：起点和终点，光照范围呈胶囊状。

{{<image src="/imgs/tube_type.png" alt="tube light" title="tube light">}}

### 属性说明

**`Range（照射范围）`**

胶囊状区域的半径，决定了两端半球与中间柱体的半径大小，胶囊区域外的范围不会被照亮。

{{<image src="/imgs/tube_range.gif" alt="tube range" title="tube range">}}

**`Start Point（起点）`**

线光源的起始端点，同时也是起始端半球的球心。

**`End Point（终点）`**

线光源的终止端点，同时也是终止端半球的球心。

**`Radius（光源半径）`**

与**照射范围（Range）** 无关联，指的是线光源本身的粗细，光源越粗，亮度越高。

{{<image src="/imgs/tube_radius.gif" alt="linear light radius" alt="linear light radius">}}