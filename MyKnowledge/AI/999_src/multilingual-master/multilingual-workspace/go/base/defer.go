// 遅延実行(defer)

// 「defer 処理」は、関数から戻る直前に処理を遅延実行します。リソースを忘れずに解放する際によく用いられる

func funcA() {
	fp, err := os.Open("sample.txt")
	if err != nil {
		return 
	}

	defer fp.Close()

	for {
		....
	}
}