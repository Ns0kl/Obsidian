#配列 list

a = [0, 1, 2, 3, 4, 5]
print(a) # [0, 1, 2, 3, 4, 5]
print(type(a)) # list
print(len(a)) # 6

#要素
print(a[0]) # 0
print(a[-1]) # 5

# スライス a[start:end:step]
print(a[2:4]) # [2, 3, 4]
print(a[:3]) # [0, 1, 2]
print(a[3:]) # [4, 5]
print(a[1::2]) # [1, 2]

#要素の操作
wd = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
#変更
wd[1] = 'tue'
#追加(push)
wd.append('saturday')
#削除
del wd[5]
# リストの連結
d = wd + ['saturday', 'sunday']
# 末尾の要素を削除する
d.pop()
print(d) #['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

#要素の並び替え
# ソート
sorted(d) #辞書順(非破壊メソッド)
d.sort #辞書順(破壊メソッド)
# ソートの逆順
sorted(d, reverse=True)
d.sort(reverse=True)
# 比較演算でのソート
sorted(d, key=lambda x: len(x)) # 文字数
d.sort(key=lambda x: len(x))

#要素の所属検査
'sun' in d # True
'sun' not in d # False

#リストと参照
x = ['mon', 'tue', 'wed', 'thu', 'fri']
y = x # 参照
y.append('sat')
y.append('sun')
x # ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
y # ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

#コピー
x = ['mon', 'tue', 'wed', 'thu', 'fri']
y = x[:]
y.append('sat')
y.append('sun')
x # ['mon', 'tue', 'wed', 'thu', 'fri']
y # ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

#リストの様々な作成
a = list(range(10))
a # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
a = list(range(1, 10, 2))
a # [1, 3, 5, 7, 9]
a2n = [i * 2 for i in range(10)]
a2n # a2n = [i * 2 for i in range(10)]
b = [[0 for i in range(10)] for j in range(10)]
b 
# [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
b[3][5] = 2
b
# [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


