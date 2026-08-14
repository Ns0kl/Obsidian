// 領域確保(new)

/*
	new() を用いて領域を動的に確保し、その領域へのポインタを得ることができる
	確保した領域は参照されなくなった後にでガベージコレクションにより自動的に開放される
*/

package main

import "fmt"

func main() {
	bookList := []*Book{}

	for i := 0; i < 10; i++ {
		book := new(Book)
		book.title = fmt.Sprintf("Title#%d", i)
		bookList = append(bookList, book)
	}

	for _, book := range bookList {
		fmt.Println(book.title)
	}

}

type Book struct {
	title string
}