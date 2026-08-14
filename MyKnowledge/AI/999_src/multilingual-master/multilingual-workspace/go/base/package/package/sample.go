package main

import "./local/mypkg"

mypkg.FuncA()		// 呼び出せる
//sample.go ファイルを次の内容で作成します。大文字で始まる FuncA() は公開されているので使用できますが、
//小文字で始まる funcB() は非公開なので使用することができません。
mypkt.funcB()		// Error