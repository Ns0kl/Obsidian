# 可変なオブジェクト

x = [1]
x #[1]
id(x) # (a)

x += [1]
x # [1,1]
id(x) # (a) とは異なる

y = x
x # [1,1]
y # [1,1]
x == y # True
x is y # True

y += [1]
x # [1,1,1]
y # [1,1,1]
id(x) # (b)
id(y) # (b) と同じ
x == y # True
x is y # True

z = x[:]
x # [1,1,1]
z # [1,1,1]
id(x) # (c)
id(z) # (z) と異なる
x == z # True
x is z # False
