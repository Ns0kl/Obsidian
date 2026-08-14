// OpenAI
// go mod 初期化 (go mod init myapp)
//OpenAI インストール( go get github.com/sashabaranov/go-openai )

package main

import (
	"context"
	"fmt"

	"github.com/sashabaranov/go-openai"
)

// $18.00 １か月かかりますと
// code:429 Error
func main() {
	// クライアント側の情報　NewClient("API KEY")
	client := openai.NewClient(" Open AI API KEY を 入力 ")
	// レスポンス
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Hello!",
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
}
