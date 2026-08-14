//ゴルーチン(goroutine)はGo言語における並行処理を実現するもの
//スレッドよりも高速に並行処理を実現することが可能
//下記の例では、メインの処理を実行しながら、並行して funcA() ゴルーチンを go により実行
package main

import (
	"fmt"
	"time"
)

func funcA() {
	for i := 0; i < 10; i++ {
		fmt.Print("A")
		time.Sleep(10 * time.Millisecond)
	}
}

func main() {
	go funcA()
	for i := 0; i < 10; i++ {
		fmt.Print("M")
		time.Sleep(20 * time.Millisecond)
	}
}
