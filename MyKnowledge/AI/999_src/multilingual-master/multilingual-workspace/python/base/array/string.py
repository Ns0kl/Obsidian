# 文字列

s = 'stress'
type(s) # str
len(s) # 6

#空文字
s = ''
s = str()

# 特殊文字列
s = 'C:\\Users\\takamatsu'
print(s) # C:\Users\takamatsu
s = "stress's"
print(s) # stress's
s = 'stress\'s'
print(s) # stress's

#複数行
s = """先頭行
2行目
3行目"""

# 数値 文字列 変換
# 数値 → 文字列
x = 10
s = str(x)
# 文字列 → 数値
# 2進数 → 文字列
bin(255)
'0b11111111'
# 16進数 → 文字列
hex(255)
'0xff'

# インデックス・スライス
s = 'stressed'
s[0] # 's'
s[-1] # 'd'
s[0:3] # 'str'
s[6:] # 'ed'
s[-2:] # 'ed'
s[::2] # 'srse'

###文字列操作
## 変換
s = "https://www.nlp.c.titech.ac.jp/search?q=Natural+Language+Processing"
#小文字変換
s.lower() #'https://www.nlp.c.titech.ac.jp/search?q=natural+language+processing'
#大文字変換
s.upper() #'HTTPS://WWW.NLP.C.TITECH.AC.JP/SEARCH?Q=NATURAL+LANGUAGE+PROCESSING'
# 文字列の置換
s.replace('search', 'find') #'https://www.nlp.c.titech.ac.jp/find?q=Natural+Language+Processing'

## 検索
#指定した文字列が最初に現れる場所を返す
s.find('/') # 6
s[:6] # 'https:'
s.find('html') # -1
# 指定した文字列が最後に現れる場所を返す
s.rfind('/') # 30

## 分割
v = s[40:].split('+')
v # ['Natural', 'Language', 'Processing']

## 連結
t = '+'.join(v)
t # 'Natural+Language+Processing'
''.join(v) # 'NaturalLanguageProcessing'

## 取り除く
# 先頭から
s = '  one, two, three, '
s.strip(' ') # 'one, two, three,'
s.strip(', ') # 'one, two, three'
# 末尾から
s.rstrip(' ') # '  one, two, three,'
s.rstrip(',') # '  one, two, three'
# 先頭から(複数指定可能)
s.lstrip(' ') # 'one, two, three, '
s.lstrip(',') # '  one, two, three, '
s.lstrip(', ') # 'one, two, three, '

## 文字列に対する条件
s = "Tokyo Institute of Technology 2020"
# 文字列の一致
s == 'TokyoTech' # False
# 辞書順による文字列比較
s < 'Tokyo Tech' # True
s > 'Tokyo Tech' # False
# 部分文字列含まないか
'University' not in s # True
# 指定した文字列で始まるかどうかチェック
s.startswith('Tokyo') # True
s.startswith('Institute') # False
# 指定した文字列で終わるかどうかチェック
s.endswith('2020') # True
s.endswith('Technology') # False
# 全て大文字かチェック
s.isupper() # False
s[0].isupper() # True
# 全て小文字かチェック
s.islower() # False
s[0].islower() # False
# 全て空文字かチェック
s.isspace() # False
s[0].isspace() # False
# 全てアルファベットかチェック
s.isalpha() # False
s[:5].isalpha() # True
# 全て数字かチェック
s.isnumeric() # False
'七十七'.isnumeric() # True

##フォーマット文字列
year = 2020
month = 'December'
date = 9
hour = 9
minute = 15
second = 43.3
## printf形式の文字列書式化
'%s %d, %d' % (month, date, year) #'December 9, 2020'
'%02d:%02d:%02.03f, %s %d, %d' % (hour, minute, second, month, date, year) # '09:15:43.300, December 9, 2020'
## 書士指定文字列
'{1} {2}, {0}'.format(year, month, date) # 'December 9, 2020'
'{2} {1}, {0}'.format(year, month, date) # '9 December, 2020'

