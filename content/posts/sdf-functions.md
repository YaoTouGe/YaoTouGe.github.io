---
title: 理解 Inigo Quilez的 SDF 函数
date: 2022-08-01 11:01:47
draft: false
tags:
- SDF
---

Inigo Quilez 大佬的博客中有一篇[常用 SDF 函数的合集](https://iquilezles.org/articles/distfunctions/)，仔细阅读下来感觉充满了机智，所以打算写下自己的一些理解。

### Box

长方体是执念比较深的一个，因为曾经面试的时候没有答出来，直接被鄙视。。。可能这也是为什么我要写这篇文章的原因之一。

``` C
float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}
```

机智的点在于，box是一个中心对称的几何体，对于中心在原点的box，我们可以利用对称将原本八个不同的象限缩减为一个，大大简化计算（在其他的SDF中也经常利用对称性）。

b是box的extent，也就是size的一半。第一行 abs(p) - b 把八个象限的不同情况转化为只考虑第一象限中p 与八分之一box的相对位置。我们可以想象不论p在哪个象限，其SDF的计算结果只和坐标的abs有关，与符号无关。

第二行则是把在box内和在box外的距离计算合并：

* 如果p在box内,q.xyz都是负，SDF的结果应该是其与box几个面最近距离取负，即 max(q.xyz)，但如果p在box外（max(q.xyz)不为负），这一项应该为0被忽略，所以应该为 min(max(q.xyz), 0)。
* 如果p在box外，对SDF产生贡献的只有q.xyz中大于0的分量，此处可以用2D情况想象以下。 所以计算为 length(max(q, 0))，若p在box内，这一项本身就是0，很符合我们的要求。

把两项相加就是最终结果：length(max(q, 0))+min(max(q.xyz),0)。

之前面试被问的时候，我第一反应是拿if else把八个象限全写一遍，最后还被绕晕了没写出来，这里只用2行代码就搞定，只能说智力被碾压。。。

在基本的box上加以变化，还能衍生出其他形状。

Round Box：

``` C
float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}
```

唯一的变化是return的时候减r，第一反应是：这就完啦？？？细想确实如此，给box加上半径为r的圆角，如果p在box外，原本距离为d，现在距离是d-r。如果在box内，原本距离是d，现在是d + -r，都是d-r。

Box Frame：

``` C
float sdBoxFrame( vec3 p, vec3 b, float e )
{
    p = abs(p)-b;
    vec3 q = abs(p+e)-e;
    return min(min(
        length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
        length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
        length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}
```

b是extent，e是框架的粗细，这个SDF看着复杂一些，但我们可以从最简单的情况开始考虑。一个box有12条边，所以box frame可以看作由12个细长的box组成，我们只需分别对12个box求SDF取min即可。

但是这些细长box的中心并非原点，所以首先我们要对p作逆向平移，再次利用对称性对中心在xy，yz，xz三个平面上的细box作平移，分别有

$$p_1 = abs(p)-(b_x,b_y,0), p_2 = abs(p)-(b_x,0,b_z), p_3 = abs(p) - (0,b_y,b_z)$$

然后对每个细box用前面的方式求距离，细box的extent也有三种情况(x,e,e),(e,y,e),(e,e,z)，对应xy，yz，xz三个平面：
$$q_1=abs(p_1)-(e,e,b_z),q_2=abs(p_2)-(e,b_y,e),q_3=abs(p_3)-(b_x,e,e)$$
$$d_1 = len(max(q_1, 0)) + min(max(q_1.xyz,0))$$
$$d_2 = len(max(q_2, 0)) + min(max(q_2.xyz,0))$$
$$d_3 = len(max(q_3, 0)) + min(max(q_3.xyz,0))$$
$$d = min(d1,d2,d3)$$

写的更紧凑就是：

$$p=abs(p)-b,q=abs(p)-e$$
$$q_1=(p.x,q.y,q.z),q_2=(q.x,p.y,q.z),q_3=(q.x,q.y,p.z)$$

现在几乎和代码能对应上了，唯一的不同点在于第二行代码 q=abs(p+e)-e，这里的区别在于iq的代码中，e增大框架向内膨胀，而我们推导的是同时向内外膨胀，所以对p加上了额外的偏移e。