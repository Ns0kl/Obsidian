// 次の例では select を用いて、ゴルーチン funcA() と funcB() 双方の待ち合わせを行います。

func funcA(chA chan<- string) {
	time.Sleep(1 * time.Second)
	chA <- "funcA Finished"
}

func funcB(chB chan<- string) {
	time.Sleep(2 * time.Second)
	chB <- "funcB Finished"
}

func main() {
	chA := make(chan string)
	chB := make(chan string)
	defer close(chA)
	defer close(chB)
	finflagA := false
	finflagB := false
	go funcA(chA)
	go funcB(chB)
	for {
		select {
		case msg := <-chA:
			finflagA = true
			fmt.Println(msg)
		case msg := <-chB:
			finflagB = true
			fmt.Println(msg)
		}
		if finflagA && finflagB {
			break
		}
	}
}