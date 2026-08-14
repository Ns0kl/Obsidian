
N, A, B = input().split(' ') 
# 信号機のスケジュール
N = int(N)
# Aの部品数
A = int(A)
# Bの部品数
B = int(B)

# 方向
s_N = input()
s_A = input()
s_B = input()

x = A
y = B

for i in range(0,len(s_N)):
        if x > 0 :
            if s_N[i] == s_A[A - x]:
                x = x - 1
        if y > 0 :
            if s_N[i] == s_B[B - y]:
                y = y - 1
print(x, y)