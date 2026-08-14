from module import module_a
from module import module_b
from module.class_a import class_a as class_a

module_a.some_function_a('a')
module_b.some_function_b('b')

# インスタンス生成
class_a_main = class_a.some_class('class')
# メソッド
class_a_main.some_function()

