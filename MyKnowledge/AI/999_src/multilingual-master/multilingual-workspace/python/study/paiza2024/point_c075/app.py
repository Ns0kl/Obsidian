cash, count = input().split(' ')
price_list = []

for i in range(int(count)):
    price = int(input())
    price_list.append(price)
    
point = 0
cash = int(cash)

for price in price_list:
    if point >= price:
        point -= price
    else:
        cash -= price
        point += price*0.1
    print(cash, int(point))