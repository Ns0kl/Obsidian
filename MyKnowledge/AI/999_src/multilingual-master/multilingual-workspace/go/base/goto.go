// goto 文
// 指定したラベルにジャンプする
// Go言語には try catch 文 のような例外処理がないため、似たようなことをするために使う

package main

import (
	"fmt"
	"errors"
)

func main() {
	funcA()
}

func funcA() (string, error) {
	var err error
	filename := ""
	data := ""

	filename, err = GetFileName()
	if err != nil {
		fmt.Println(err)
		goto Done
	}

	data, err = ReadFile(filename)
	if err != nil {
		fmt.Println(err)
		goto Done
	}

	fmt.Println(data)

Done:
	return data, err

}

func GetFileName() (string, error) {
	return "sample.txt", nil
}

func ReadFile(filename string) (string, error) {
	return "Hello world !", error.New("Can't red file")
}