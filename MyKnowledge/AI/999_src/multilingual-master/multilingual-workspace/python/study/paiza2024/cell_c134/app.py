# 長さ
N = int(input())

alp_size26 = 26

# 数字と文字当てはめるの怠いので文字コード使う(アスキーコード(ASCll))
# 10進数 65 は A (10進数 90 は Z)    
ASC_A = 65

# for で条件絞るより、再帰分岐で条件当てはまるときに呼び出す方が楽そう
def num_to_alpha(num):
    # 1桁ケース
    if num <= alp_size26:
        return chr((ASC_A - 1) + num)
    # 余りないときだけ1桁目に'Z'埋めてあげないといけない
    elif num % alp_size26 == 0:
        return num_to_alpha(num // alp_size26 - 1) + 'Z'
    else:
        return num_to_alpha(num // alp_size26) + chr((ASC_A - 1) + num % alp_size26)
    
print(num_to_alpha(N))