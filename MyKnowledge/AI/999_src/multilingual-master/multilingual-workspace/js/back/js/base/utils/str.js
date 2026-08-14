
// 文字列リテラル
'foo';
"bar";

// String オブジェクト
const hello = "Hello, World!";
hello[0] = "L";     // 文字列は不変なので、これは効果がない
hello[0];           //"H"

// プロパティ
// 文字列を長さ
hello.length

// メソッド 
//文字列の中からn+1番目の文字を返す
hello.charAt(n)
//文字列の中からn+1番目の文字コードを返す
hello.charCodeAt(n)
//	文字列の末尾に文字列を連結
hello.concat(str)
//文字列の先頭より（strt+整数）文字目以降から文字列substrを検索して、その位置を返す。
hello.indexOf(substr, start)
//文字列の末尾より（strt+整数）文字目の前方から文字列substrを検索して、その位置を返す。
hello.lastIndexOf(substr, start)
//	正規表現のパターン（regex）で文字列を検索し、これに一致した文字列を配列として返す
hello.match(regex)
//正規表現のパターン（regex）で文字列を検索し、これに一致した文字列を文字列strに置き換える
hello.replace(regex, str)
//正規表現のパターン（regex）で文字列を検索し、これに一致した文字列の最初の文字位置のオフセット＊を示す数値を返す
hello.search(reg)
//startからendの位置までの文字列を取り出す
hello.slice(start, end)
//文字列を区切り文字として指定したstrで切り分け、結果を文字配列として返す
hello.split(str, limit)
//startからendまでの文字列を取り出す
hello.substring(start, end)
//小文字に変換
hello.toLowerCase()
//大文字に変換
hello.toUpperCase()
//Stringオブジェクトが保持している文字列を返す
hello.toString()
//半角、全角、タブを取り除く。
hello.trim()
//Stringオブジェクトが保持している文字列を返す
hello.valueOf()
