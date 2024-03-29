---
title: 理解 Inigo Quilez的 SDF 函数
date: 2022-07-31 11:01:47
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

*Round Box：*

``` C
float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}
```

唯一的变化是return的时候减r，第一反应是：这就完啦？？？细想确实如此，给box加上半径为r的圆角，如果p在box外，原本距离为d，现在距离是d-r。如果在box内，原本距离是d，现在是d + -r，都是d-r。

*Box Frame：*

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

### Torus

```C
float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}
```

参数t表示半径和粗细，代码所表示的是一个在xz平面上的甜甜圈，想象一个平行于y轴经过原点的平面，与甜甜圈相截得到无数个小圆，我们要求p与小圆之间的最短距离。第一行代码将p映射到对应的截平面上以小圆的圆心为原点的二维平面上，第二行就是求点到圆的距离了。

*Capped Torus*

```C
float sdCappedTorus(in vec3 p, in vec2 sc, in float ra, in float rb)
{
  p.x = abs(p.x);
  float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
  return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
}
```

这个SDF我在shader toy上试了几下才明白参数的含义，sc表示Capped Torus的半圆心角的sin和cos，ra为半径，rb为粗细（也是末端盖子的半径）。它在xy平面上关于y轴对称。和torus不同在于需要去掉截断的部分，并加上圆盖。我们来看看这三行代码究竟在干什么。

第一行对p.x取abs，利用y轴对称。第二行又开始看不懂了，我们想想如果换自己来做该怎么做？我们需要判断p对应的那个截平面是否在半圆心角的扇区内，用cross((sin,cos),p.xy)>0就能判断。

如果在扇区内，我们用torus的方式就能求出距离。
$$d=length(length(p.xy)-r_a,p.z)-r_b$$

如果不在扇区内，则需要求p到端点的距离。
$$p_{end}=(r_a*sin,r_a*cos,0)$$
$$d=length(p-p_{end})-r_b$$

iq的代码还是一如既往的紧凑，把这两块写到一起，有兴趣的童鞋可以推一下。

*Link*

```C
float sdLink( vec3 p, float le, float r1, float r2 )
{
  vec3 q = vec3( p.x, max(abs(p.y)-le,0.0), p.z );
  return length(vec2(length(q.xy)-r1,q.z)) - r2;
}
```

Link的形状可以看成是xy平面上的矩形，上下两头分别变成半圆，然后加上粗细。le是矩形半高，r1是矩形宽（也就是两头的半径），r2是粗细。先看看返回值，还是熟悉的味道，把q投影到截平面，求length - r2。那q是什么意思呢，再看第一行，q的x，z分量与p相同，只是y做了一些变化：

$$q_y=max(abs(p_y)-le, 0)$$

这里分两种情况：

* 当abs(p.y)<le，那么截平面平行于xz平面，投影时只用p.x，p.y=0。
* 当abs(p.y)>le，截平面截到半圈区，p.y=abs(p.y)-le。


环环相扣形成锁链的代码也很有趣：

```C
// paramteres
const float le = 0.13, r1 = 0.2, r2 = 0.09;

// make a chain out of sdLink's
vec3 a = pos; a.y = fract(a.y    )-0.5;
vec3 b = pos; b.y = fract(b.y+0.5)-0.5;

// evaluate two links
return min(sdLink(a.xyz,le,r1,r2),
            sdLink(b.zyx,le,r1,r2));
```

为了连成锁链，每个Link的y方向需要加平移，并加上旋转。Link的平移是通过对pos.y做逆平移，其中fract稍微有点绕，我一直以为它是取小数部分，实则有所不同，它的计算公式是：

$$fract(x)=x-floor(x)$$

对正数而言就是小数无疑，但如果x是负数比如-0.1，floor(x)是-1而非0，所以fract(-0.1)结果是0.9，因此fract(x)区间为[0,1)，减去0.5后则是[-0.5,0.5)，这样才能显示完整的一个link。

旋转则是交换x和z分量实现的，相当于关于45度线对称了一下。

### Cone

Cylinder 相对比较简单，就是把p投影到xz平面，然后和圆作比较，我们看看复杂一些的Cone。

```C
float sdCone( in vec3 p, in vec2 c, float h )
{
  // c is the sin/cos of the angle, h is height
  // Alternatively pass q instead of (c,h),
  // which is the point at the base in 2D
  vec2 q = h*vec2(c.x/c.y,-1.0);
    
  vec2 w = vec2( length(p.xz), p.y );
  vec2 a = w - q*clamp( dot(w,q)/dot(q,q), 0.0, 1.0 );
  vec2 b = w - q*vec2( clamp( w.x/q.x, 0.0, 1.0 ), 1.0 );
  float k = sign( q.y );
  float d = min(dot( a, a ),dot(b, b));
  float s = max( k*(w.x*q.y-w.y*q.x),k*(w.y-q.y)  );
  return sqrt(d)*sign(s);
}
```

首先Cone是关于y轴对称的几何体，顶点在原点，如果h为正则Cone朝负y方向。我们可以用经过p和y轴的平面截Cone，然后判断x>0的二分之一个2D三角形和点的位置关系（再次利用对称）。

q是(h*tan,-h)，也就是2D三角形右下角的顶点，w是p投影到截平面上的2D坐标。w与三角形的距离只有两种情况：到斜边和到底边。a是到w到斜边投影点的向量，b是到底边投影点的向量。所以最终距离就是min(length(a), length(b))。

此外还要判断正负号，cross(w,q)<0意味着肯定在三角形外，否则若w.y-q.y<0，也在三角形外。这块对应的代码对二者取min（经常会有各种技巧来避免分支）。

*Not Exact Cone*

```C
float sdCone( vec3 p, vec2 c, float h )
{
  float q = length(p.xz);
  return max(dot(c.xy,vec2(q,p.y)),-h-p.y);
}
```

这个不精确的Cone又是啥呢，dot(c.xy, vec2(q,p.y))等效于垂直于oc的边做cross，也就到把垂直于oc的边作为斜边的距离，与到底边距离，二者取max。这种方式只保证最小距离的投影点在底边或斜边时，计算结果是正确的。如果投影点在顶点上，距离就不对了，但是它大多数情况下不影响渲染的结果，raymarching求交的点依然正确，虽然距离值不一定正确（这是一种不错的简化近似思路）。

*Infinite Cone*

```C
float sdCone( vec3 p, vec2 c )
{
    // c is the sin/cos of the angle
    vec2 q = vec2( length(p.xz), -p.y );
    float d = length(q-c*max(dot(q,c), 0.0));
    return d * ((q.x*c.y-q.y*c.x<0.0)?-1.0:1.0);
}
```

无限远就是把锥体的底面去掉就行，只计算到斜边（射线）的投影距离。

### Prism

*Triangular Prism bound*

```C
float sdTriPrism( vec3 p, vec2 h )
{
  vec3 q = abs(p);
  return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
}
```

h分别是底面三角形的高和侧面高，这也是一个近似的SDF，代码中出现一个magic number，先猜测和三角函数有关，0.8660254对应sin(60)或cos(30)。后面的近似和之前的cone很像，直接对到底边，侧面的距离求max。如果按照这个思路，那最后结果应该是:

```C
  return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y-h.x*0.5));
```

但原代码却把-h.x*0.5挪到了括号外面，这一步的含义是什么呢。在shader toy中测试，它影响的是底面的大小，还没搞明白（未完待续）。


*Hexagonal Prism*

```C
float sdHexPrism( vec3 p, vec2 h )
{
  const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
  p = abs(p);
  p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
  vec2 d = vec2(
       length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
       p.z-h.y );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}
```