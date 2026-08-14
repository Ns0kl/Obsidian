from typing import Final

# 定数
EXAMPLE: Final[str] = 'examle'

# tupleなので変更不可
EXAMPLE_TUPLE: Final[tuple[str, str]] = ('example_1', 'example_2')

# listは変更可能
EXAMPLE_LIST: Final[list[str]] = ['example_1', 'example_2']