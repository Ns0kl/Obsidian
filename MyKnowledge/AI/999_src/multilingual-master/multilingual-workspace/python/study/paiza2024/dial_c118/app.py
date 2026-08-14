
D, N, L = input().split(' ')
D = int(D)
# 最初はダイヤル0
k_before = 0
# 長さ合計
move_sum = 0

for i in range(int(N)):
    # i 番目のダイヤル
    k_current = int(input())
    # 半分より短い方を選定
    if abs(k_current - k_before) > D/2 :
        move = D - abs(k_current - k_before) 
    else :
        move = abs(k_current - k_before)
    k_before = k_current
    move_sum += move

if move_sum < int(L):
    print('Yes')
else:
    print('No')

