# 辞書

# key: value
d = {'東京':'Tokyo', '神奈川': 'Kanagawa', '千葉': 'Chiba'}
d # {'東京': 'Tokyo', '神奈川': 'Kanagawa', '千葉': 'Chiba', '埼玉': 'Saitama'}

type(d) # dict
len(d) # 4

## value 取得
d['神奈川'] # 'Kanagwa'
d['富山'] # エラー
# get を使えばエラーが出ない
d.get('東京') # 'Tokyo'
d.get('栃木') # None
d.get('栃木') is None # True

'東京' in d # True

# 追加
d['群馬'] = 'Gunma'
d['群馬'] # 'Gunma'
# 削除
del d['群馬']


