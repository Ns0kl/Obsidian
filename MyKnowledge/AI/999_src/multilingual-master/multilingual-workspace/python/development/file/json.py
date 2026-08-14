# JSON
import json

#JavaScript Object Notation(JSON) は、オブジェクトの内容をJavaScript として解釈できる形式で表現するもの


d = {
    '東京':["とうきょう","Tokyo"],
    '神奈川':["かながわ","Kanagawa"],
    '千葉':["ちば","Chiba"]
    }

# オブジェクトを JSON形式でファイルに書き出す
with open('prefecture.json', 'w') as fo:
    json.dump(d, fo, ensure_ascii=False) # ensure_ascii : デフォルトでは日本語などのASCIIではない文字列がエスケープされてしまうので、書き出された内容が読みづらくなることがある。

# JSONファイルを読み込む
with open('prefecture.json') as fi:
    r = json.load(fi)
print(r)   