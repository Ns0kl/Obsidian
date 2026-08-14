
import openai
from typing import Final
from django.conf import settings
import os

API_KEY :Final[str] = getattr(settings, 'OPEN_AI_API_KEY', None)

''' chatGPT '''
def chat_gpt(prompt):
    openai.api_key = API_KEY #API KEYをセット
    openai.models.list() #OpenAIのインスタンスを生成
  
    #APIを使ってリクエストを投げる
    response = openai.chat.completions.create(
        model = "gpt-3.5-turbo-16k-0613",
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    response_message = response.choices[0].message.content
    return response_message

''' chatGPT リクエスト '''
def create_prompt(input_text, file_name):
    prompt_file = os.path.join(getattr(settings, 'BASE_ENV_DIR', None), 'template', file_name)
    with open(prompt_file, encoding="utf-8") as f:
        file_read = f.read()
    #Chat-GTPへ投げるフォーマットに入力文をセットする。
    prompt = file_read.replace("[input]", input_text)
    return prompt
    