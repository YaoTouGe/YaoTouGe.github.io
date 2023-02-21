---
title: LeetCode die simulator
date: 2023-02-11
draft: false
tags:
- leetcode
- alg
- dp
---

刷题不只是刷题，更重要的是刷各种算法题的思路（套路），找到一个宝藏up主讲的很清楚明了[bilibili](https://www.bilibili.com/video/BV1Xj411K7oF/?vd_source=e4ee1e17d171cc432d21d8cdef407806)，茫茫刷题路呀，慢慢来吧。

今天刷每日一题，又碰到一道困难的动态规划题，一下子就懵了，跟着这位up主一起学习。一般的动态规划的步骤是：回溯 => 记忆化 => 递推。

* 回溯就是用深度优先搜索的形式把题解表示出来。
* 但一般直接dfs肯定会超时，所以会用数组把计算过的结果cache住，递归过程中直接使用。极大优化计算复杂度。
* 最后dfs是自顶向下的先递后归的过程，我们可以通过自底向上去掉“递”，只留下归的过程，也就是最终的递推关系了。

总结的步骤相当直接明了是不是，但是实际的题目千变万化，唯有勤学苦练才是。今天这道题是[模拟掷骰子](https://leetcode.cn/problems/dice-roll-simulation/)，老实说，如果不是看了大佬的步骤套路，如果直接一步到位出动态规划的转移方程，我是绝不可能想出来的，甚至最后得到转换的结果后，我依然无法从直观上去理解状态为什么这么转换。只能理解基本的回溯+记忆。

第一步先用回溯表达解题过程，很关键的一点是，虽然题目要求的是最后可能的骰子序列的数量，但我们依然要在模拟掷骰子的基础上来计算总数。所以掷骰子的过程中有两个关键点：

1. 剩余的掷骰子次数，也就是n。
2. 掷出某个点数后是否合法，这个判断依赖两个条件：上一次的点数是多少，以及上个点数的剩余连续次数是多少：如果和上次点数相同，剩余连续次数减一。否则，当前剩余次数重置为 maxRoll - 1。

当n变为0时完成一次序列生成，return 1。然后每次遍历当前可能的点数（1~6）求和得到当前的结果。由此可以写出一个比较清晰的回溯解法：

```cpp
void dfs(int n, int last, int left, vector<int> &rollMax)
{
    if (n == 0)
        return 1;

    int result = 0;
    for (int i = 0; i < 6; ++i)
    {
        if (i != last) result += dfs(n-1, i, rollMax[i]-1);
        else if (left != 0) result += dfs(n-1, i, left-1);
    }

    return result;
}

int dieRollSimulation(int n, vector<int>& rollMax)
{
    int result = 0;
    for (int i = 0; i < 6; ++i)
    {
        result += dfs(n-1, i, rollMax[i]-1);
    }

    return result;
}
```

但是这种写法肯定会超时，所以进行第二步记忆化，将计算过的结果缓存起来，python有个神奇的修饰器 @cache，可以根据函数的输入参数把运算结果缓存，自动完成这步：

```cpp
void dfs(int n, int last, int left, vector<int> &rollMax, int ***cache)
{
    if (n == 0)
        return 1;

    if (cache[n][last][left] != -1)
        return cache[n][last][left];

    int result = 0;
    for (int i = 0; i < 6; ++i)
    {
        if (i != last) result += dfs(n-1, i, rollMax[i]-1);
        else if (left != 0) result += dfs(n-1, i, left-1);
    }
    cache[n][last][left] = result;
    return result;
}
```

下一步就是直接把递归形式转化为迭代的形式，和动态规划的状态转移就能对上号了，有几个要点（这个up主总结的相当到位）：

* 回溯的边界为dp的初值。
* 把dfs的调用改为dp数组。
* 按照dfs的参数嵌套循环。

```cpp

int dieRollSimulation(int n, vector<int>& rollMax)
{
    int dp[n][6][16];
    // init value
    for (int i = 0; i < 6; ++i)
        for (int j = 0; j < 16; ++j)
            dp[0][i][j] = 1;

    // recursion are converted to nested for loop
    for (int j = 1; j < n; ++j)
        for (int last = 0; last < 6; ++last)
            for (int left = 0; left < rollMax[last]; ++left)
            {
                int result = 0;
                for (int i = 0; i < 6; ++i)
                {
                    if (i != last) result += dp[j-1][i][rollMax[i]-1];
                    else if (left != 0) result += dp[j-1][i][left-1];
                }
            }
    
    int ret = 0;
    for (int i = 0; i < 6; ++i)
    {
        ret += dp[n-1][i][rollMax[i]-1];
    }
    return ret;
}
```

递归的n=0情况直接用来初始化dp[0][i][j]了，然后dfs的三个参数被展开成三个嵌套循环，一一对应，循环的范围为0~可能的最大值（j从1开始，因为0为边界初值）。到这里其实我还有一个疑问，最内层循环中根据 i 去取 dp[j-1][i][left-1] 或者 dp[j-1][i][rollMax[i]-1] ，这些值一定都已经计算过了吗？答案是肯定的，因为 j-1 是上次最外层循环计算的结果，已经存在于 dp 数组中了。

最后看大佬题解中还有一步状态优化，能把复杂度从O(nms)降到 O(ns)，暂时还看不懂，等日后熟悉套路了再来。。。