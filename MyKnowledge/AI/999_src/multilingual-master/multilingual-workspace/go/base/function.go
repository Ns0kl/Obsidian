// 関数

package main

import "fmt"

func main() {
	fmt.Println(add(5, 3))

	add, minus := addMinus(5, 3)
	fmt.Println(add, minus)
	_, y := addMinus(5, 3) // 不要な戻り値ある場合、ブランク変数 _ を使う
	fmt.Println(y)

	funcA(1, 2, 3, 4, 5,)

}

func add(x int, y int) int {
	return x + y
}

// return 複数の時
func addMinus(x int, y int) (int, int) {
	return x + y, x - y
}

// 可変引数
func funcA(a int, b ... int) {
	fmt.Printf("a=%d\n", a)
	for i, num := range b {
		fmt.Printf("b[%d]=%d\n", i, num)
	}
}

