package main

import (
	"fmt"
)

func main() {
	var N int
	fmt.Scan(&N)
	fmt.Println(num_to_alp(N))
}

func num_to_alp(num int) (string) {
	// 文字コード(ASCII:アスキーコード)
	asc_start := 64
	alp_size := 26
	// １桁ケース
	if num <= alp_size {
		return string(asc_start + num)
	// 余り 0 のとき、Z を 1桁目に埋める
	} else if num % alp_size == 0 {
		return num_to_alp(num / alp_size - 1) + string("Z")
	// N進数化(互除法)
	} else {
		return num_to_alp(num / alp_size) + string(asc_start + num % alp_size)
	}
}