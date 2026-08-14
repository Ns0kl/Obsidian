# 道のり, サイコロ目標回数
N, M = input().split(' ')

# マスに効果付与(スタート：0, ゴール:N-1 のマスには効果なし)
a = 's'
for i in range(1, int(N)-1):
    a += input()
     
# サイコロの出た目累計
c_sum = 0  

# サイコロの出た目
for i in range(0, int(M)):
    c_sum += int(input())
    # goalで終了(N-1) 効果でのゴールは+1
    if c_sum >= int(N)-1:
        print('goal')
        print(i + 1)
        exit()
    
    # 効果
    if a[c_sum] == "+":
        c_sum = c_sum + 1
    elif a[c_sum] == "-":
        c_sum = c_sum - 1
    elif a[c_sum] == "r":
        c_sum = 0

print('still')
print(c_sum) 
