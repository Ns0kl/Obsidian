# CSV

import csv

d = {
    '東京':["とうきょう","Tokyo"],
    '神奈川':["かながわ","Kanagawa"],
    '千葉':["ちば","Chiba"]
    }

# CSV書込み
with open('prefecture.csv', 'w') as fo:
    writer = csv.writer(fo)
    for ja, (yomi, en) in d.items():
        writer.writerow((ja, yomi, en))

# CSV読込
r = {}
with open('prefecture.csv') as fi:
    reader = csv.reader(fi)
    for row in reader:
        r[row[0]] = row[1:]
print(r)