// 配列
// コンパイル時に個数が決まっていて変更不可のものを 配列 と呼ぶ

package main

import "fmt"

func main() {
	
	// 配列
	// コンパイル時に個数が決まっていて変更不可のものを 配列 と呼ぶ
	a1 := [3]string{}
	a1[0] = "Red"
	a1[1] = "Green"
	a1[2] = "Blue"
	// 初期化時に値設定
	a1 := [3]string{"Red", "Green", "Blue"}
	// 初期化時に個数が決まる場合
	a1 := [...]string{"Red", "Green", "Blue"}

	// スライス
	//メモリ効率や速度は若干落ちますが、個数を変更可能なものを スライス と呼ぶ
	a1 := []string{}
	a1 = append(a1, "Red")
	a1 = append(a1, "Green")
	a1 = append(a1, "Blue")
	// スライス長さ
	len(a1) 
	// メモリ容量(容量超えると、倍の容量のメモリが別に確保され、既存データコピーされる)
	cap(a1)
	// make(スライス型, 初期個数, 初期容量) を用いたメモリの確保可能
	bufa := make([]byte, 0, 1024)

	// map
	// map[キーの型]値の型 (連想配列)
	a1 := map[string] int {
		"x": 100,
		"y": 200,
	}
	// map 参照
	fmt.Println(a1["x"])
	// map に要素追加
	a1["z"] = 300
	// map の要素削除
	delete(a1, "z")
	// マップに要素存在するか検索
	_, ok := a1["z"]
	if ok {
		fmt.Println("Exist")
	} else {
		fmt.Println("Not Exist")
	}
	// ループ
	for key, value := range a1 {
		fmt.Printf("%s=%d\n", key, value)
	}

}