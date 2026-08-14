// 変数

package main

func main() {

	// 「var 変数名 型」
	var a1 int
	var a1 int = 123
	var a1 = 123    // 型の省略可能
	a1 := 123       // := を用いると var も省略可能
	
	// まとめて定義
	var(
		a1 int = 123
		a2 int = 456
	)
	name, age = "Naoki", 25

	// 定数
	const foo = 100
	const(
		foo = 100
		baa = 200
	)

	// 型名に別名付けられる
	type(
		UtcTime string
		JstTime string
	)
	var t1 UtcTime = "00:00:00"
	var t2 JstTime = "09:00:00"
	t1 = t2 // エラー(型違うから)

	// 型変換
	var a1 uint16 = 1234
	var a2 uint32 = uint32(a1)

}

/*
型
bool						真偽値(true or false)
int8/int16/int32/int64		nビット整数
uint8/uint16/uint32/uint64	nビット非負整数
float32/float64				nビット浮動小数点数
complex64/complex128		nビット虚数
byte						1バイトデータ(uint8と同義)
rune						1文字(int32と同義)
uint						uint32 または uint64
int							int32 または int64
uintptr						ポインタを表現するのに十分な非負整数
string						文字列
*/

/*
演算子
x + y		加算 (文字列の連結にも利用)
x - y		減算
x * y		乗算
x / y		除算
x % y		除算の余り
x & y		論理積(AND)
x | y		論理和(OR)
x ^ y		排他的論理和(XOR)
x &^ y		x AND (NOT y)
x << y		yビット左にシフト
x >> y		yビット右にシフト
x = y		xにyを代入
x := y		xにyを代入(初期化の使用可能)
x++		x = x + 1 と同義
x--		x = x - 1 と同義
x += y		x = x + y と同義
x -= y		x = x - y と同義
x *= y		x = x * y と同義
x /= y		x = x / y と同義
x %= y		x = x % y と同義
x &= y		x = x & y と同義
x |= y		x = x | y と同義
x ^= y		x = x ^ y と同義
x &^= y		x = x &^ y と同義
x <<= y		x = x << y と同義
x >>= y		x = x >> y と同義
x && y		xかつy(AND)
x || y		xまたはy(OR)
!x		xがtrueの場合false/falseの場合true(NOT)
x == y		xとyが等しければ
x != y		xとyが等しくなければ
x < y		yがxより大きければ
x <= y		yがx以上であれば
x > y		yがxより小さければ
x >= y		yがx以下であれば
ch <- x		chチャネルにxを送信
x =<- ch	chチャネルからxに受信
*/
