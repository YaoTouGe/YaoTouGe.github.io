---
title: LeetCode regular expression
date: 2023-02-10
draft: false
tags:
- leetcode
- alg
---

最近打算刷刷题，记录一下做题的思路。现在工作形式不同了，搞技术支持代码写的少，看得多，和人打交道多。。。其实感觉自己不太合适干这个，先凑合着，先刷刷题以后再去别的地儿呢是不是。

动态规划一直没搞明白过，先从这个入手。这是[原题链接](https://leetcode.cn/problems/regular-expression-matching/)，估计很多人都刷过了，我自己都做过几遍了。。。但老实说，之前看题解也是一知半解，过不了多久就忘。这次打算理解彻底一点吧。

动态规划的中心是状态转移方程，当前状态根据之前的状态得到，然后用一张表记录之前的结果。这题的思路：

f[i][j] 表示子串s[i]与子pattern p[j]的匹配结果，所以分如下情况：

1. p[j] == '*'，此时是0或者多次重复上一个字符，且输入保证\*前面必然有字符。这是又分两种情况：

   * p[j-1] != s[i]，意味着上个pattern字符和s[i]不同，此时只有重复0次有可能匹配成功，那也就看f[i][j-2]的结果。
   * p[j-1] == s[i]，那我们可以重复0次或者多次，只要其中有一个结果能成功。重复0次就是上面的结果。``重复多次这里比较巧妙，看作是消耗掉了一个s[i]，并且依然用p[j]去做后面的匹配，也就是f[i-1][j]，只要它能匹配，那重复多次就能匹配。``综合起来，f[i][j]=f[i][j-2] or f[i-1][j]，这里是比较绕的，想了很久。


2. p[j] == s[i] or p[j] == '.'，当前字符能匹配，所以匹配结果看f[i-1][j-1]，如果它是true，f[i][j]也是true，否则也是白瞎。
3. 字符不匹配，那么f[i][j]=false;


但即便是理解完这一些系列的状态转换后，写代码时我依然遇到很多阻碍。最麻烦的是边界条件没理解清楚，一开始我是从下标0开始，dp中0表示第一个字符，但这也导致空串并没有被表示，而且dp过程中的数组下标越界的边界情况判断总是不对。后来看了很多解析才恍悟，首先空s或者空p的情况一定要表示出来，此时字符下标从1开始就很方便了，0表示空。

2维数组申请时，维度比s，p的长度+1，这里又引入第二个重点，要把i = 0和j = 0这两边界的元素给计算好，这样dp过程中能直接访问它们的结果。dp[0][0]=true，空串配空串。dp[i][0]这一列都是false（除了0，0处）。dp[0][j]这一行也有点绕，空串和什么样的模式能匹配呢？只有\*才行了，所以一切p[j] !=\*都false，等于\*的还得看dp[0][j-2]是不是匹配成功（是否也为\*）。

最后有个地方就是，比如pattern有a*，我们把a和*都单独判断了一次，这样不会有问题是因为我们遇到\*后dp会去看j-2的结果，j-1被直接跳过了，也无法影响其他有效结果。明天继续加油，坚持刷题！

```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        // start from 1, 0 stands for empty case
        char **dp = new char*[s.length() + 1];
        for (int i = 0; i < s.length() + 1; ++i)
        {
            dp[i] = new char[p.length() + 1];
            dp[i][0] = 0; // base case for empty pattern none empty string
        }

        // empty string match with empty pattern
        dp[0][0] = 1;
        // border cases i = 0, empty string match none empty pattern
        for (int i = 1; i < p.length() + 1; ++i)
        {
            if (p[i-1] == '*') dp[0][i] = dp[0][i - 2];
            else dp[0][i] = 0;
        }

        // now start dp
        for (int i = 1; i < s.length() + 1; ++i)
        {
            for (int j = 1; j < p.length() + 1; ++j)
            {
                if (p[j-1] == '*')
                {
                    if (p[j - 2] == s[i - 1] || p[j-2] == '.')
                        dp[i][j] = dp[i-1][j] || dp[i][j-2];
                    else
                        dp[i][j] = dp[i][j-2];
                }
                else if (p[j - 1] == s[i - 1] || p[j - 1] == '.')
                {
                    dp[i][j] = dp[i-1][j-1];
                }
                else
                {
                    dp[i][j] = 0;
                }
            }
        }

        bool isSuccess = dp[s.length()][p.length()];
        for (int i = 0; i < s.length(); ++i)
        {
            delete[] dp[i];
        }
        delete[] dp;

        return isSuccess;
    }
};
```