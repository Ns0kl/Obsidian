
## pattern 1
import numpy as np

# 枚数
N = int(input())
# カード
c = input().split()
c_N = [int(i) for i in c]

c_N_product = []

for i in range(N):
    c_N[i] = c_N[i] + 1
    for j in range(N):
        if i != j:
            c_N[j] = c_N[j] - 1
            c_N_product.append(np.prod(c_N))
            c_N[j] = c_N[j] + 1
    c_N[i] = c_N[i] - 1
print(np.max(c_N_product))


# ## pattern 2 (仕掛)
# import numpy as np

# # 枚数
# N = int(input())
# # カード
# c = input().split()
# c_N = [int(i) for i in c]

# # ボラが小さいやつの所在
# idx_vor_min = np.abs(np.asarray(c_N) - 0).argmax()
# # ボラが大きいやつの所在
# idx_vor_max = np.abs(np.asarray(c_N) - 0).argmin()

# # 0の個数を調べる
# zero = c_N.count(0)

# # マイナスの個数を調べる
# minus = np.count_nonzero(np.signbit(c_N)) 

# # 0 が3つ以上
# if zero > 2:
#     print(0)
#     exit()

# # 積 がプラスの時
# if minus % 2 == 0 :
#     if zero == 2:
#         print(0)
#         exit()
#     else:
#         c_N[idx_vor_min] = c_N[idx_vor_min] - 1
#         if c_N.count(-1) > 0:
#             idx_vor_min = np.abs(np.asarray(c_N) - (-1)).argmax()
#             c_N[idx_vor_max] = c_N[idx_vor_max] + 1
#             print(np.prod(c_N))
#         else:
#             c_N[idx_vor_max] = c_N[idx_vor_max] + 1
#             print(np.prod(c_N))
        
# # 積がマイナスの時
# else :      
#     # 0 にできるケース
#     if(c_N.count(1) > 0 or c_N.count > 0 or zero > 0):
#         print(0)
#     else:
#         # ボラが一番小さいやつをプラス(0 から遠いやつ)
#         c_N[idx_vor_min] = c_N[idx_vor_min] - 1
#         c_N[idx_vor_max] = c_N[idx_vor_max] + 1
#         print(np.prod(c_N))

    
        
    

