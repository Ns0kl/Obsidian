// 構造体(struct)
// Go言語では、クラスがないため代わりに構造体
//構造体にはメンバ変数のみを定義し、クラスメソッドに相当する関数は関数名の前に (thisに相当する変数 *構造体名) をつけて定義
package main

import "fmt"

func main() {
	var p1 Person
	p1.SetPerson("Naoki", 25)
	name, age := p1.GetPerson()
	fmt.Printf("%s(%d)\n", name, age)
}

type Person struct {
	name string
	age int
}

// setter
func (p *Person) SetPerson(name string, age int) {
	p.name = name
	p.age = age
}

// getter
func (p *Person) GetPerson() (string, int) {
	return p.name, p.age
}

// privateメンバは 小文字で始める
type Person struct {
    Name string		// 外部からアクセス可能
    Age int			// 外部からアクセス可能
    status int		// 外部からアクセス不可
}
