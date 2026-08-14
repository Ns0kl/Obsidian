#関数

def w(n):
    for i in range(n):
        print('w', end='')
        
def plus_one(x):
    x += 1
    return x

#可変長引数
def decimal(*args):
    v = 0
    for arg in args:
        v *= 10
        v += arg
    print(type(args), repr(args)) # <<class 'tuple'> (arg[0], arg[1], ...)
    return v


