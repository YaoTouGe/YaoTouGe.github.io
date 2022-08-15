---
title: Compute Shader 计算 prefix sum
date: 2022-08-10 11:01:47
draft: true
tags:
- CUDA,Compute Shader
---

最近要对一个体数据做重新采样，具体来说就是原数据是一堆三维点+属性值，分布在空间中的任意位置。我需要根据这个数据生成空间均匀划分的真正意义上的体数据。初步的思路是对包围盒均匀划分，然后每个grid根据在该网格中的原始数据点，用某种插值方式得到grid中心的值。

由于需要查询点的空间划分，参考碰撞检测中常用的spatial hash的方法，分为三个pass：

* 对原始数据点的坐标做hash，记录每个hash值的数据点计数。
* 对hash计数的数组做前缀和
* 把前缀和的值作为数组下标，将数据点的index写入到最终数组中，同时前缀和-1

最后得到一个按照hash排好序的数据。具体可以参考 [Ten minutes physics](https://matthias-research.github.io/pages/tenMinutePhysics/)里优化碰撞检测的一章。

我打算在GPU上用compute shader实现这个过程，首先就是要实现前缀和的算法，把Nvidia的[博客](https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda)反复看了几遍，终于差不多弄懂了，特此记录一下。

首先整理一下博客里贴的CUDA代码，源代码几乎没有格式，难以阅读。

```C
#define NUM_BANKS 16
#define LOG_NUM_BANKS 4
#define CONFLICT_FREE_OFFSET(n) \
    ((n) >> NUM_BANKS + (n) >> (2 * LOG_NUM_BANKS))

__global__ void prescan(float *g_odata, float *g_idata, int n)
{
    extern __shared__ float temp[]; // allocated on invocation
    int thid = threadIdx.x;
    int offset = 1;

    // A
    int ai = thid;
    int bi = thid + (n / 2);
    int bankOffsetA = CONFLICT_FREE_OFFSET(ai);
    int bankOffsetB = CONFLICT_FREE_OFFSET(bi);
    temp[ai + bankOffsetA] = g_idata[ai];
    temp[bi + bankOffsetB] = g_idata[bi];
    temp[2 * thid] = g_idata[2 * thid]; // load input into shared memory

    // temp[2 * thid + 1] = g_idata[2 * thid + 1];

    for (int d = n >> 1; d > 0; d >>= 1) // build sum in place up the tree
    {
        __syncthreads();
        if (thid < d)
        {
            // B
            int ai = offset * (2 * thid + 1) - 1;
            int bi = offset * (2 * thid + 2) - 1;
            ai += CONFLICT_FREE_OFFSET(ai);
            bi += CONFLICT_FREE_OFFSET(bi);

            // int ai = offset * (2 * thid + 1) - 1;
            // int bi = offset * (2 * thid + 2) - 1;

            temp[bi] += temp[ai];
        }
        offset *= 2;
    }

    // C
    if (thid == 0)
    {
        temp[n - 1 + CONFLICT_FREE_OFFSET(n - 1)] = 0;
    }

    // if (thid == 0)
    // {
    //     temp[n - 1] = 0;
    // } // clear the last element

    for (int d = 1; d < n; d *= 2) // traverse down tree & build scan
    {
        offset >>= 1;
        __syncthreads();
        if (thid < d)
        {

            // D
            int ai = offset * (2 * thid + 1) - 1;
            int bi = offset * (2 * thid + 2) - 1;

            float t = temp[ai];
            temp[ai] = temp[bi];
            temp[bi] += t;
        }
    }
    __syncthreads();

    // E
    g_odata[ai] = temp[ai + bankOffsetA];
    g_odata[bi] = temp[bi + bankOffsetB];
    // g_odata[2 * thid] = temp[2 * thid]; // write results to device memory
    // g_odata[2 * thid + 1] = temp[2 * thid + 1];
}
```