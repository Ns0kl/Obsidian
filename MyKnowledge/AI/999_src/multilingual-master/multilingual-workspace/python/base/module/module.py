# モジュールの別ファイルへの利用

import optim
#from optim import bisection, newton_raphson

def f(x):
    return x**2 + 2*x - 3

optim.bisection(f, -2, 2)
#bisection(f, -2, 2)
