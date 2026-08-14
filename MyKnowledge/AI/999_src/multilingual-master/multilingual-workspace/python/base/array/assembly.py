# 集合

S = {'東京', '神奈川', '千葉', '埼玉'}
S # {'千葉', '埼玉', '東京', '神奈川'}

type(S) # set
len(S) # 4

'東京' in S # True

# 追加
S.add('栃木') 
'栃木' in S # True
# 削除
S.remove('栃木')
S.remove('群馬') # エラー
'栃木' in S # False
# discard はエラーが出ない
S.discard('栃木') 


