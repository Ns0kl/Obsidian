// 制御文

package main

import "fmt"

func main() {

	x := 0
	y := 1

	// if文
	if x > y {
		fmt.Println("Big")
	} else if x < y {
		fmt.Println("Small")
	} else {
		fmt.Println("Equal")
	}

	// switch文
	switch {
	case x > y:
		fmt.Println("Big")
	case x < y:
		fmt.Println("Small")
	default:
		fmt.Println("Equal")
	}
	// 他言語のような break 文は不要
	// 次の処理も実行するには fallthrough を用いる
	// dayOfWeek が "sat" もしくは "sun" であれば "Holiday" を返す
	switch dayOfWeek {
	case "sat":
		fallthrough
	case "sun":
		fmt.Println("Horiday")
	default:
		fmt.Println("Weekday")
	}

	// for 文
	for x < y {
		x++
	}
	// for 開始処理; 条件; 後処理 { 処理 }
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
	// continue ・ break 文
	n := 0
	for {
		n++
		if n > 10 {
			break
		} else if n % 2 == 1 {
			continue
		} else {
			fmt.Println(n)
		}
	}
	// forEarch 文 (配列やイテラブルなものは range を用いる)
	colors := [...]string{"Red", "Green", "Blue"}
	for i, color := range colors {
		fmt.Printf("%d: %s\n", i, color)
	}

}