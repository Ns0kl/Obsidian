import math

# 人(人),品目(種)
M,N = input().split(' ')
# カロリー(cal/100g)リスト
c_list = list()
M = int(M)
N = int(N)

# カロリーリスト生成 
for i in range(M):
    c = int(input())
    c_list.append(c)

# 特定の人が食った量   
eat_M_list = list()
for i in range(N):
    eat_M = input()
    eat_M_list.append(eat_M)
   
# 特定の人の品目ごとのカロリー
cal_N_list = list() 
# 特定の人のカロリー
cal_M_list = list()
for i in range(N):
    eat = eat_M_list[i].split(' ')
    SUM_N = 0
    for j in range(M):
        eat_j = int(eat[j])
        eat_N = math.floor(eat_j*c_list[j]/100)
        SUM_N = SUM_N + eat_N
    cal_N_list.append(SUM_N)
    cal_M_list.append(cal_N_list[i])

for i in range(N):
        print(cal_M_list[i])
    