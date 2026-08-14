
# レース回数 スコア計算回数
N, K = input().split(' ')
K = int(K)
# 3頭の馬の最低のスコア
check = []

for j in range(0, 3):
    # 1レーススコア
    sum_score = 0
    # 1頭のレーススコア格納
    score = []
    # 1頭のKによるスコア
    sum_score_min = []
    for i in range(0, int(N)):
        score.append(int(input()))
        sum_score += score[i]
        if i >= K-1:
            sum_score_min.append(sum_score)
            sum_score = sum_score - score[i-K+1]
    check.append(min(sum_score_min))

print(check.index(min(check)) + 1) 