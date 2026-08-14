# 制御文

# for文
for i in range(10):
    print('W', end='') # end='' を指定して改行を抑制
    print(i, 10*i)
    
for i in range(1,10):
    print(i, i*10)
    

# if文
x:float = 37.1
if 37.5 <= x :
    print('熱がある')
elif 37.0 <= x :
    print('微熱がある')
else:
    print('熱はない')
    
# 論理演算
y:int = 10
print(not y < 100) # True

# in 演算子
n:int = 4
print(n in (2, 4, 6, 8)) # True

# 三項演算子
m:int = 5
print(s = '偶数' if m % 2 == 0 else '奇数') # '奇数'  

# while文
l:int = 36
while l != 1:
    if l % 2 == 0:
        l // 2
    else:
        l = 3 * l + 1
    print(l, end='')  #18 9 28 14 7 ... (コラッツの問題)


# break文 (以降の処理を行わずに処理終了)
# Newton-Raphson法
x = 1
while True:
    fx = x **2 - 2
    gx = 2 * 2
    print(x, fx) # 1 -1 , 1.5 0.25 ... 1.41421 4.51061
    if -1e-8 < fx < 1e-8:
        break 
    x -= fx / gx
    
# continue文 (以降の処理を行わずに反復に戻る)
N = 10
for n in range(2, N+1):
    for a in range(2, n//2 + 1):
        if n % a != 0:
            continue 
        print(n, '=', a, '*', n//a)
        break
    

    

