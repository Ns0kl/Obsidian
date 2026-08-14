# ファイルの入出力

# ファイルへの書き込み
d = {
    '東京':["とうきょう","Tokyo"],
    '神奈川':["かながわ","Kanagawa"],
    '千葉':["ちば","Chiba"]
    }

# d のオブジェクト内容を表示
for ja, (yomi, en) in d.items():
    print(ja, yomi, en)

# ファイルへ書込み
fo = open('./prefecture.txt', 'w')
for ja, (yomi, en) in d.items():
    print(ja, yomi, en , file=fo)
fo.close()

# ファイル読込
with open('./prefecture.txt') as fi:
    for line in fi:
        print(line)