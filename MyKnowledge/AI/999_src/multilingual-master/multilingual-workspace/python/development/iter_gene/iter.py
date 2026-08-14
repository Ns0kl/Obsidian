# イテレータ

import sys # メモリ消費確認のため
import time # 実行時刻計測

## コンビネーションの計算
# 計算モデル
n = 6
v = 1
s = 0
for k in range(n+1):
    print(f'n={k}のとき、v={v}') # 1 6 15 20 15 6 1
    s += v
    v *= (n-k)
    v //= (k+1)
print(f'総和 s={s}') # 64


# リストで計算
def list_combinations(n):
    v = 1
    c = []
    s = 0
    for k in range(n+1):
        c.append(v)
        v *= (n-k)
        v //= (k+1)
        s += v
    return c 

print(list_combinations(n))  # [1, 6, 15, 20, 15, 6, 1]
print(f'総和 s={s}') # 64

# 計測
start_time = time.time() # 処理計測(スタート)
print(f'リストのメモリ消費量:{sys.getsizeof(list_combinations(100))}')
end_time = time.time() #　処理計測(エンド)
print(f'実行時間:{end_time - start_time}')


# イテレータで計算
class iter_combinations:
    def __init__(self, n):
        self.v = 1
        self.k = 0
        self.n = n
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.n < self.k:
            raise StopIteration
        v = self.v
        self.v *= (self.n - self.k)
        self.v //= (self.k+1)
        self.k += 1
        return v

s = 0
for v in iter_combinations(n):
    print(f'v={v}') # 1 6 15 20 15 6 1
    s += v
print(f'総和 s={s}')

# 計測
start_time = time.time() # 処理計測(スタート)
print(f'イテレータのメモリ消費量:{sys.getsizeof(iter_combinations(100))}')
end_time = time.time() #　処理計測(エンド)
print(f'実行時間:{end_time - start_time}')


# イテレータの方が、リストよりメモリ消費量少ないし、実行時間も短い

