# 不変なオブジェクト

# オブジェクトのメモリ空間上のアドレス
x = 0
id(x)

y = x
id(x)
id(y) # x と同じ
x == y # True
x is y # True

y += 1
x # 0
id(x)
y # 1
id(y) # x と異なる
x == y # False
x is y # False
