---
title: GDC笔记 Next level render in World of Tank
date: 2023-03-2 11:01:47
draft: false
tags:
- graphics
- GDC
---

又不想刷题了，最近看了[坦克世界分享的gdc视频](https://www.gdcvault.com/play/1025207/Next-Level-Render-in-World)，里面有许多有意思的点子，记录一下。坦克世界战场内可视的范围很大，32km x 32km，但是实际游戏可达区域只有1km x 1km左右（这不能算大世界了），但渲染技术很扎实，结合多种方案，最后的效果也相当不错，主要是阴影，地形和水体。

* 阴影，Adaptive SM，ScreenSpace，material shadow（视差），cloud，semitransparent），阴影结合了很多种技术，各有不同的侧重，负责场景中的一部分效果。

![image](https://blz04pap001files.storage.live.com/y4mRF-xcFTpiCKXSRgLCQJ-EjPpCIyfB8CAut4UHbypAoRzG7HXAK_n14iqXLn3-iOY_RHRcIUlWcJA3TJcupyHfMZsj5aUB4b7I1U_Wfix11RqyOw0TZ7Pe5Lf9cZ7MOAF9TRI-OqLfgWxVAhcVZrzkp7AWiumvMbVfgUFx3hrwGuBnYHGmsHbdznpjbGVnXGO?width=1920&height=1080&cropmode=none)

Adaptive Shadow Map

![image](https://blz04pap001files.storage.live.com/y4m1VcI_CkarJliPFfMnOcusQeZLKeRqSuRiz09lCrsxjqVnFTlaLs8NRKaxxUMuNwdI_mJX0OHU6DhU3NGrENU5VobI4LJlRMdq5yg5PlOD0OALgv0iDygLb9PwZJ-HXZRbkwL0T3yaevFO6vY_mVEUafvgq_fmuL09G346eyR6Hp7xMeRj55A9UqXaDYebs3A?width=1920&height=1080&cropmode=none)

Semitransparent Shadow

![image](https://blz04pap001files.storage.live.com/y4m3DbIRPZxAaj1SJ0mcBj4Pmtxmp7KF8Q7hzIBjOnl6pqPnQ2d9eazuyXCNAVzj5csc0nGp_AVrkGR9AjPUR0V7mArk_hhSU8SiE4VVhwUrxsJFK9_jw8WeHYWEwyMaU5DlVJ1XCCy0Yi5zh5LU7z0AIpzPdfZxEl--oMvsNrs8cBA61HAEqzEwtYDHUfSrwkO?width=1920&height=1080&cropmode=none)

Screen Space Shadow(接触阴影？)

![image](https://blz04pap001files.storage.live.com/y4m0Rgnrqd9oJdCCTu8jIPA6Y59GlYXsXZg1_RiXosF1zvsnvo5f2UikyXJG_T_5FTQkEkUTIAWcBiYjdWG9N1tcGEB18M5Pfjvuj1lXLyRU26mbaoC-WyYnnwu-fy-TjzClem6G-HILnwR0uZap2PX7B7XJgiWargXoWXIQroJKTYuX2VhOe9M3klv4PZRdsfK?width=1920&height=1080&cropmode=none)

Material Shadow(视差)

![image](https://blz04pap001files.storage.live.com/y4mp43cZSaJ4IJY6S04iDNu7OpKp6vVWkuoIKhhmEFpQzePUpJoBl1SoOwPvj1dfss51bSiA3VOJ0C0jrnq2azrmViiyC4uy8Hp7B5BQOrjZImCmks-StS-Vh8hmaHvZrzf7rNoPI9H8RBUcA1zIhiweItP7QB0tUHJGPjn_iXS7AMeKek1Ye0DGCfHRZXIEbg4?width=1920&height=1080&cropmode=none)

Overview

![image](https://blz04pap001files.storage.live.com/y4m7CAAaQA5nDW9bl01QbfRZb3I8HJLGAbxFg8-E0PbNuwj_W0TycyBOuW0xW3Vcxy5zyKqZaRh0Jqh_yOyYq5SCI_7rgtxWhoeHb2fD_WCkPed8hlZ5Ld4NC56Dcdy_Yv0wcfp2BRMrP2PkS8KCiPyzi4rP5dGqnQZYFVjN9HOTjfNNgMvpQZ9AtS9CJDEuDuC?width=1920&height=1080&cropmode=none)


*  GI（还是lightprobe，但优化了摆放算法，四叉树自适应摆放，高度自适应）

Adaptive Probe Placement

![image](https://blz04pap001files.storage.live.com/y4mQHdn2HI_WQujRjvVtuPnDRxwn8dWYyOGX0tumWItkKC36Sa-n9B0rKAsLcj9H6KrJf6U-UQp8RdE6R20q0oiC5iFgQJrhCaC6iPTixFa95ym4RMudya4A1ahp4uCsfJnefpvMY_Ec0Sc7DcQktKl7oV7ya0YqzHQjbcuCIInzNrPC7OUwriE0OalJreRp-UU?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4m1OXQkEqj-KhD7wo9oTojzDxGR3Fh9x_9CL-1sjkCkkGtDl1W0edD-tm7pzz_3J-uEtf0V-Yjr0TevsMCilSVGevMoqeu7etTe3O_BOB6a2UVTiFsJad5VbqrbEBVj5pjiG5hyE_viJ0CfbXtoW3loLiH3Fv_MhHvqK5VFxLfjVu9P_eY9HlDP8G_7HRwpC-K?width=1863&height=947&cropmode=none)

Best Fit Placement

![image](https://blz04pap001files.storage.live.com/y4mVrJ1p73RbN6G5hzIMitb0RjWuI44NYKd_yXYlQjj8xW2ABtAs31lo21MeflFynaRHCPBy3qTYsJtuhSXVlzB1m4-ewVKbanUDeOMTg8BdWmM4f4xmgZsfLrcxM9Hm-JwQa_ClRWN7B6YyJ5phd43EeJxL52C4NJcRFlxOmttK3aBA6w863-vQ4OQB807AE_5?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4mRVOS35x91VaWNuno7ewttI-1Ny2Y4q95tejM5kbt7vjuK8D55BiQucQC4f_V8iZitrkxOpW3GhTjozy9nwv-wm8IFP_8mcUrkLrN--J4iPHtu_c4KxlblioAinu-y0MBwR8fa2G2-dAAIjVYiHRjpUDSHxOF2wVHU1Usf8Z1fsZeSlomKQOz45o65nsAgp9m?width=1920&height=1080&cropmode=none)

*  Terrain
    * GPU instancing，stiching（对patch 的顶点位移来缝合漏洞）

![image](https://blz04pap001files.storage.live.com/y4mfXW4zu21t5W3D7Kmc6Gk8lZlSWsyz1GNKdUyaLJaPGINcmNCAqfnl7n6L90mt1TV7csgc7In9E3QMhNBD2uIwdtYECt1ByNXa4zJ1fwjI_6b5BGjBnWgNZNge-IPw3EHFRhqmgS9cKSCj70Gzd73Vshai2CQcwSNUm1EKYRS0LL1u4Nfd8r-PjmPHcM77-kX?width=1920&height=1080&cropmode=none)

    * 用距离当作metrics，对地形的基础geometry做LOD，然后根据斜率等对近景做adaptive tesselation（近景可能会有石头，贴花等各种改变近景高度的元素）。highly frequency 高度数据存在（近景地上的石头等）材质中，细分时采样，density map来防止过度的细分导致过高的quad overdraw。

![iamge](https://blz04pap001files.storage.live.com/y4m5zBvdr7YflQuOD0i93sccd7QgGJnD3u40b5I8tJEItH_ecgo9n-57ZVZSEuUz3S8gN3F1Q7_w4Y70LUkcDjc8_46qfu_ln-3bhVIMxFw-bZRwfkez8TDiHWRxStzV0hLmIZeETSvf8NYqgzCtdOYeSH3wgJitd8Gsy7-lZyVaR7kwlslcpMT9F6GwWgLfZGY?width=1920&height=1080&cropmode=none)

![iamge](https://blz04pap001files.storage.live.com/y4my4gflDtwTr9PxtMQlke4fCmwQD0byVzJEWubuLEkJcZwNPrr2Z8QqmhM4DWX6Iuc2dEnacnfbM0sWowp6kBALog1w_yjcuc93EcGYw0NKnuU6Yg_lNlSqAFYxUs1SNjQN1cLB0Vd5wFLOM0KA9iiWYY7TxX4V2eL10D_J9CXjGK0OMhaYP1UoGshgctraB0o?width=1920&height=1080&cropmode=none)

    * 坦克履带和地形碰撞，由于细节的高度图是渲染时用到，存在GPU中，所以CPU这边碰撞时需要从GPU回读。有N帧的延迟

![image](https://blz04pap001files.storage.live.com/y4mGrFnIq5QR5krMSNx1ekfnyLLNDie0VtWvD27-6Y6ceeveZ5ueushqchPYTkpVSouEUvGASoUMRs6vGbS0UF30lwyEL9pJbjLsVJ95RlIWLFkr9ogx9sSzzxRdwo7AyM_zs8_f8nWeGByuwljU7CSXjhlAO8pB_XTOhs8oDFzud1tcneYwYFuJChrWBwZ9svB?width=1920&height=1080&cropmode=none)

    * 优化terrain的纹理重复pattern，用了micro，macro，global三个层级的纹理混合，有点类似分形噪声？要注意的是，混合时要用当前层级颜色-上一层级的平均，比如macro - avg micro，否则颜色会有问题。

![image](https://blz04pap001files.storage.live.com/y4mQ_bjMCZyu6Cy4hZ85606RIxBPvmC6ZJBN2FjBEP2AOxnykOUdiyL4NPAdh_Pj-QS4KBa7hg81EEXs8lpSkc_EE2hWHMLsRZ4T0smANz28YbZtT17TuT1STquPNiQqmFQQC1Ecd-2Q7r0_dvM8ZwOwxDd8BeYHaPo6AqaOqUYet3h6K1ahylW0B_M1X600iE7?width=1920&height=1080&cropmode=none)

    * Height based texture blending。但还是很费，最后用的procedural VT（就是RVT？）实现雪地轨迹等动态贴画效果,实时在GPU上压缩为DXT(1/5)格式。

![image](https://blz04pap001files.storage.live.com/y4mIjoQgVrzVzaUt7T0kMn0q12LTiaEqggamnMi00S1vebCMcDGcq--J1v0lwvPaOaIpywHt9n6qAx3Dle67eWvZFs-fO5HSt-UDfrBMdZTaRQNM-Vf5PNbbv2JLQ2YqXeXnvLC2kMZ1sPuYdJ6wAueo1Bv-ntik7RIwfm0jhgcGXqGyyXYBit4n1zbIk03zu6N?width=1920&height=1080&cropmode=none)

    * Indirect Map（page table），并没有全部在内存中，而是分了upper level和 bottom level两个层级，就像以前做HLOD那样。

![image](https://blz04pap001files.storage.live.com/y4mE5ZJ5hS9R_-zaC7P-CedA4mvvnxk7hhCA7F-gWm50f9Ytd41ZhCDO0tzNhMkR0_y39V6WAyzlNjYeC1bu3q0SxtqEvMjknczyR_Iwa_S-Wjng8lDK0pO5uaUckkacKAFGw_lKNm3Ib00c3FN1jh9dicKH88Vla6WZbQNnAOcdetZllbqAYf0IHm4wufoUlJX?width=1920&height=1080&cropmode=none)

    * 远景 outland，可玩区域只有1km^2（所以这个场景其实还不算很大。。。），整个可视场景是32km^2， inner terrain与outland的模型做混合，用了特殊的材质，模型。

![image](https://blz04pap001files.storage.live.com/y4mkH8KjrPfWFsw_67aFyt8oj0bKecPBxxNHsdAkcPJZdip5MNSJJNXkJhCzO-ONgcbOUeXsPtqj7RVnjNPVwtI-OiNPc9NkE5N8RdU46F9FMp7waC4DH3bN0SZEKnWrmPiXBH0BtiD6PYIlJ4DOc2tz7OidV_vXdmnmC_mPJHlri29kf9dZTWdiR_kGy8Md6aV?width=1920&height=1080&cropmode=none)

*  Water
    * Clipmap+static quad tree(preprocess)

![image](https://blz04pap001files.storage.live.com/y4mSE6X7_3Sg-qo7mcPDuR2Pu6RnySCvHeDo4-DduuNHFZqoaWDOxkdhpvC7yNje2ggQ9zMgB0wWYWUVE-uy9BlldYf0ZGmelYXAZ8qhP56sToaGQLOC8dH7RdDd60skaBKvQa8cHmbszmcIaRwSmH2acUOTOUIC9uche-5G-P0UDl3dt7yZtiEwC_4lWYQr5Ek?width=1920&height=1080&cropmode=none)

    * Adaptive tesselation(like terrain)

![image](https://blz04pap001files.storage.live.com/y4mpiUyk5fZ_6QTAE0PvtghO8uygXDUgww3uh-6fa-LAVNPdgtOnG_fbskKOPk101CKVkNPNJJA3vELvUWSCGD-dQaZhqME3KbMCn3J7YXPCEAGACKQO-ns1a_zQgnDccESnHNA1YPcAculG6Eahg02Q1t9umNpgWesKD0SE5y1bhcpSzV5g005Lhsb_6znQ9l3?width=1920&height=1080&cropmode=none)

    * Tiled animation sequences of normal height and caustic

![image](https://blz04pap001files.storage.live.com/y4mUE94rVUgKWXpDmd8V5W_byhUPGhWZRi2Hzah6bX3NCHm9RiE6lk0d_ot5g7p8qnrG7wNvHhTQvMVJtzoUIn_VqB2M1qomannptrK9R3ea9uEjWC6HSKUb-9ILnJ4goHEuCHyHa1sWgL3XyLgP5Emp1rDKr4PhhNv3Kvv_f6GmHmBAgDc_fnI0cZB-mtAStjz?width=1920&height=1080&cropmode=none)

    * Refaction based on water normal and depth

![image](https://blz04pap001files.storage.live.com/y4mI31oZC_uUuo3O2UkJ70-U8kf14gP82lJUZQK9ez4SNdSY2QO-tnxWRb1-bFR97BXchpsXjg58Q8AKkDwAIDQ-TBYo9-LNsHFREUlg7MrJ4Saf9n_dZBq1xWN5QHC6oWbUHCRNVLN5-GCookK5qIS4ecpcAYWFgKMYewBxEChTfTnQxTQUWoMFnXc7SHcrosM?width=1920&height=1080&cropmode=none)

    * Reflection mixes parallax corrected reflection probe and SSR（SSPR？）, 而不是 planar reflection （特指从反射的角度重新渲染一遍整个场景），SSR会优先覆盖probe的颜色。

![image](https://blz04pap001files.storage.live.com/y4mTMo4sGbMWpHr1AQHVdLk6dVm92IVisAoeRZz3BkOc1E6veKQrRjgoXGjzaQEo7KuvvmgYGD4nl3mYV8trc0T5XorGXbFGi9m1wri3MG6y_Dg4A4jRViV3f5HLyF1jp7hmz-G4eujoA0tYAejgJqnCzyEKCvTXgNE6Bq2EuvR0kT51XEcn2YdQcuCXcbCMYMg?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4mjeispfWsPrrWvtCKUMidszjzemafi6xWEJ_y-YUrq8mZ3IzinVkfD636vac0-t9Esjy2id9u8dalPucegeKRINQA-HDUdp_b5wSCtaFF3ibsNVcMczZ-5e0333mD7T8b5vCnFXwXIJFMZOQNfVMjjmlGDjO-DBbwkLNfAXWuyluPQnkTIzceqGvPQJOy4EXC?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4moDqSjPOrcH1HPXtJENw4ReYyx7Zq4OVlkEVH-Svm7JG4D4ooYNRrhgHViOmZ89ac3Ts0Cm7QEhegkT8B_FRvZyL_2ncvudK9AJAhreV0zIXrjXHhEP3mkSAP4T36Y8haR2Y-FtkJnZSAlUbhVw8dAHMOycuZ-5LZeOxj8BFsVmMBVyAJZdlTmfxvHDSjyN6i?width=1920&height=1080&cropmode=none)

    * Reflection mipmap 用来模拟水面不同粗糙度（normal density and amplitude）的反射。

![image](https://blz04pap001files.storage.live.com/y4m26GYsbJfL3UkcvPH5BO9VQXTi4WBJ6haGS2qEFyypa9pxvoEhfkEV2SxR9_idXlEz65OjdVANfJO9SUsup53cHwd4stkgSYT0hKudxH9PHi24PBUv0LiuQw1TqUPnTH6SpBkC3iUanOn0jSxyda5m3oEU126xhwnLzkG9W-O34YEAYYOgfUL_Fhy_DdRLAoH?width=1920&height=1080&cropmode=none)

    * 用water surface 得到wetness mask，来改变水底以及岸边的wetness

![image](https://blz04pap001files.storage.live.com/y4mio4kmKyKBY7OXafaKQtjpifSCE12S36_GbVnjvvCIO8zaxyk1KunutBDb3ZBa45pKCoeL7yWPisQQZ_1Ny7K7p9GQIdzOttYe0s1_eQ1oX5mG5EL2XITdv5u38eV6YOz3Vn_u6wNGFN1sYUfcrHjKaX5gGLPIQzVpGxNpo4yYhrkieAPB3xm8G7yTBw90Dae?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4mJkdewPhIqkjwyhWv0ue9F6mGz744NryB417gCCo4aHiVHiVfjj81nxDKp3amfIlX8isE52KqtgeTxPJEDMrGLjRxmi3_02LjwciAH6Z0C7hJmW28lCzy5oBUhbNt8zKD2UjfIvQPLMJbvStxN4DA4hElJg5i1HKG4lWF8Vkt2pAzv8EhQguHj2JzMkiNn2Ur?width=1920&height=1080&cropmode=none)

![image](https://blz04pap001files.storage.live.com/y4mf1GCOcJgCd_bqRDor-f9bp3T7gSHQ59iMvv2bog9NV7HbQrEwPATzlMFH0GpdGWMkMX1KxbglJJ4_DewBUw19FZqNbjfEuwpEf43PlLfR5hl186YrENgC2gkVi-wg3h5vVbCCLLMgIIk6zjcBVRNwfT2ZLhjz1tmSa_MCUR2TcsBQCxkpjy6xmDx6-hyJ5K4?width=1920&height=1080&cropmode=none)

    * particles，foam，underwater（气泡，水花之类的），deformation（涡流，阻挡物造成的波浪等）水面的形变也是用粒子实现的，平行于水平面，但在渲染的过程中并不输出颜色，而是改变水面的高度，这个想法很有意思！Fully artist control相比于程序化的方法。


![image](https://blz04pap001files.storage.live.com/y4mjBWz_YHRskQBiPl-ChC1Amyjz3Pktnbf9uCu_WE4bCkGb1XJS7Snr8x0WCYqYNyYlgiNXUGG9XZMkFa5HwE9AqdfAtSSduXAgnWDb0gFxeYzhG_Y8JQCobPzW-7g3i162eQkSNP5kli9lzeTO-3hVEeioyYCCWLW5S3B4XOqHUk5zX2_73uhjRDiyo94R4vi?width=1920&height=1080&cropmode=none)
