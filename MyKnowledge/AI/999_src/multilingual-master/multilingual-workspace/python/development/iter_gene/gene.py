# ジェネレータ

# リスト     → 見やすい(繰返しの処理内容をまとめて記述できる)
# イテレータ → 見ずらいが、メモリ消費量少ない

# 両方の良いとこ取りできないか？
# → yield文によるジェネレータ関数 

# yield文：return文に似ているが、関数の振る舞いをイテレータに変更し、要素を順番に返すことが可能
# yield文が実行された値が、要素として呼び出し元に返される。
# 言い換えれば、yield文の実行とイテレータの__next__メソッドの返り値が対応する

# リスト
def list_combinations(n):
    v = 1
    C = []
    for k in range(n+1):
        C.append(v)
        v *= (n-k)
        v //= (k+1)
    return C

# イテレータ
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

# ジェネレータ (appendする代わりに yield文を使う)
def gen_combinations(n):
    v = 1
    for k in range(n+1):
        yield v
        v *= (n-k)
        v //= (k+1)


# 出力
s = 0
#for v in list_combinations(6):
#for v in iter_combinations(6):
for v in gen_combinations(6):
    print(f'v={v}') # 1 6 15 20 15 6 1
    s += v
print(f'総和 s={s}')


# ジェネレータ式
[n**2 for n in range(6)] # [0, 1, 4, 9, 16, 25]
sum([n**2 for n in range(6)]) # 55