// print・println・printf

package main

import "fmt"

func main() {
	
	num:= 123
	str:="ABC"

	// 改行無し、空白無し、フォーマット無し
	fmt.Print("num=", num, "str=", str, "\n")
	// 改行有り、空白有り、フォーマット無し
	fmt.Println("num=", num, "str=", str)
	// 改行無し、空白無し、フォーマット有り
	fmt.Printf("num=%d str=%s^\n", num, str)
}
/*
	%v(デフォルト形式)、
	%#v(Go言語表記)、
	%t(真偽値)、
	%d(整数)、
	%s(文字列)、
	%c(文字)、
	%f(小数)、
	%F(小数)、
	%e(浮動小数点数e)、
	%E(浮動小数点数E)、
	%g(%f/%e自動選択)、
	%b(2進数)、
	%o(8進数)、
	%O(0o付き8進数)、
	%x(16進数)、
	%X(16進数大文字)、
	%U(Unicode)、
	%p(ポインタ)、
	%q("..."付き文字列)、
	%T(型表示)、
	%%(パーセント)
*/
