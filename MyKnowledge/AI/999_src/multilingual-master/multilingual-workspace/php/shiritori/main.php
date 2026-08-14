<?php

// 単語を格納するクラス
class WordContainer {
    
    private $words = [];

    public function addWord(string $word): void {
        $this->words[] = $word;
    }

    public function getWords(): array {
        return $this->words;
    }
}

// しりとりの判定関数
function isShiritori(array $words): bool {
    $count = count($words);

    if ($count < 2) {
        return false; 
    }

    for ($i = 1; $i < $count; $i++) {
        // 直前の単語の最後の文字と現在の単語の最初の文字が一致するか確認
        // mb_substr() の第２引数(文字を抜き出す開始位置)と第３引数(抜き出す文字数)
         if (mb_substr($words[$i-1], -1) !== mb_substr($words[$i], 0, 1)) {
             return false; 
         }
    }

    return true; 
}

// 単語数を取得
echo "単語数を入力してください: ";
$wordCount = intval(trim(fgets(STDIN)));

// 単語を入力し、配列に格納
$wordContainer = new WordContainer();

for ($i = 0; $i < $wordCount; $i++) {
    echo "単語を入力してください: ";
    $word = trim(fgets(STDIN));
    $wordContainer->addWord($word);
}

// 結果の出力
if (isShiritori($wordContainer->getWords())) {
    echo "Success\n";
} else {
    echo "False\n";
}

?>