
from typing import List, TypeVar

T = TypeVar('T')

# しりとり判定
def is_sort_valid(words: List[T]) -> bool:
    for i in range(1, len(words)):
        if words[i - 1][-1] != words[i][0]:
            print(words[i-1][-1], words[i][0])
            return False
    return True

def main() :
    try:
        # しりとりをしたい単語数を入力
        N = int(input("しりとりをしたい単語数を指定してください："))
        # しりとりを行う単語の配列
        word_list = []
        # しりとりを行う単語を入力
        for i in range(N) :
            word = str(input(f"{ i + 1}個目の単語を入力してください："))
            word_list.append(word)
            
        valid_sort = is_sort_valid(word_list)
        
        if valid_sort :
            print("Yes")
        else :
            print("False")
        
    except ValueError:
        print("単語は整数で指定してください")

if __name__ == "__main__" :
    main()

    