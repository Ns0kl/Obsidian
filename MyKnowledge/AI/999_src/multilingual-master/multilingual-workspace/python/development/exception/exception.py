# 例外

try:
    2. / 0
except ZeroDivisionError as e:
    print('ゼロ除算:', e) # ゼロ除算: float division by zero

# 複数
try:
    2. ** 1024
except ZeroDivisionError as e:
    print('ゼロ除算:', e)
except OverflowError as e:
    print('オーバーフロー:', e)

# 例外の送出 (raise文)
    def timestamp(hour, minute, second):
        if hour < 0 or 24 <= hour:
            raise ValueError("引数hourは0 <= hour < 24を満たす必要があります")
        if minute < 0 or 60 <= minute:
            raise ValueError("引数minuteは0 <= minute < 60を満たす必要があります")
        if second < 0 or 60 <= second:
            raise ValueError("引数secondは0 <= second < 60を満たす必要があります")
        return hour * 3600 + minute * 60 + second
timestamp(2, 43, 70)

# 例外の捕捉
try:
    timestamp(48, 0, 0)
except Exception as e:
    print('例外:', type(e), e)

# 例外の定義
    class TimestampError(Exception):
        pass

    def timestamp(hour, minute, second):
        if hour < 0 or 24 <= hour:
            raise TimestampError("引数hourは0 <= hour < 24を満たす必要があります")
        if minute < 0 or 60 <= minute:
            raise TimestampError("引数minuteは0 <= minute < 60を満たす必要があります")
        if second < 0 or 60 <= second:
            raise TimestampError("引数secondは0 <= second < 60を満たす必要があります")
        return hour * 3600 + minute * 60 + second
timestamp(1, 95, 22)

