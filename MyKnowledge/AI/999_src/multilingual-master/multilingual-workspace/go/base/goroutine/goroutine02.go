
//下記の例ではチャネルを用いてゴルーチンの終了を待ち合わせる例です。
// chan はチャネルを生成します。
// <- はチャネルにメッセージを送受信します。

func funcA(chA chan<- string) {
	time.Sleep(3 * time.Second)
	chA <- "Finished" // チャネルにメッセージを送信する
}

func main() {
	chA := make(chan string) // チャネルを作成する
	defer close(chA)         // 使い終わったらクローズする
	go funcA(chA)            // チャネルをゴルーチンに渡す
	msg := <-chA             // チャネルからメッセージを受信する
	fmt.Println(msg)
}