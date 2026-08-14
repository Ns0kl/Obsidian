// interface {} 型
// 関数の無いインタフェース interface {} は、any 型のように使用

func PrintOut(a interface{}) {
	// a を Printable インターフェースを呼び出す
	q, ok := a.(Printable)
	if ok {
		// 変換できたら、そのインターフェースを呼び出す
		fmt.Println(q.ToString())
	} else {
		fmt.Println("Not printable.")
	}
}

// switch 変数.(type) { ... } によって、型を判断可能
func funcA(a interface{}) {
    switch a.(type) {
    case bool:
        fmt.Printf("%t\n", a)
    case int:
        fmt.Printf("%d\n", a)
    case string:
        fmt.Printf("%s\n", a)
    }
}

// interface {} は any の様に使えるという特徴を生かし、任意の型の値を持つマップを定義することもできる
p1 := map[string]interface{} {
    "name": "Yamada",
    "age": 26,
}

// 下記の様にすれば階層構造を持つ Python の dict もどきを定義することができる
type any interface{}
type dict map[string]any

p1 := dict {
    "name": "Yamada",
    "age": 26,
    "address": dict {
        "zip": "123-4567",
        "tel": "012-3456-7890",
    },
}
name := p1["name"]
tel := p1["address"].(dict)["tel"]	// anyをdictに変換してから参照