import datetime

### 日付ユーティリティ

## 現在日付取得
def current_day() :
    return datetime.date.today()

## 現在日時取得
def current_now() :
    return datetime.datetime.now()

## 日付フォーマット
# yyyy/MM/dd
def change_format_yyyy_MM_dd(date: datetime) :
    return "{0:%Y/%m/%d}".format(date)
# yyyyMMdd
def change_format_yyyyMMdd(date: datetime) :
    return "{0:%Y%m%d}".format(date)
# yyyy
def change_format_yyyy(date: datetime) :
    return "{0:%Y}".format(date)
# MM
def change_format_MM(date: datetime) :
    return "{0:%M}".format(date)
# dd
def change_format_dd(date: datetime) :
    return "{0:%d}".format(date)

## 文字列型をdatetime型に変換
# 日付 → 文字列型
def change_str_from_date(date: datetime) :
    return date.strftime('%Y/%m/%d %H:%M:%S')
# 文字列型 → 日付
def change_date_from_str(str: str) :
    return datetime.datetime.strptime(str, '%Y-%m-%d %H:%M:%S')

## 日付計算
# Ex. 前日： calculate_date(datetime.date.today(), -1)
def calculate_date(date: datetime, diff_days: int) :
    calc_day = datetime.timedelta(diff_days)
    return date + calc_day

## 日付比較判定
# date_1 > date_2 -> true
def is_after_date(date_1: datetime, date_2: datetime) :
    return str(date_1 > date_2)
# date_1 < date_2 -> true
def is_before_date(date_1: datetime, date_2: datetime) :
    return str(date_1 < date_2)



    