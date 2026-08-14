# クラス
# 変数(メンバ変数) と 関数(メソッド)をまとめて管理できるオブジェクト

#　インスタンス化
class Point:
    def __init__(self):
        self.x = 0.
        self.y = 0.

p = Point()
type(p) # __main__.Point
p.x # 0.0
p.y # 0.0

# メンバ変数の初期化
class Point:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

p = Point(1,2)
p.x # 1
p.y # 2

# メソッド
class Point:
    def __init__(self, x=0., y=0.):
        self.x = x
        self.y = y
    # setter    
    def set(self, x, y):
        self.x = x
        self.y = y
    # x と y の値を入れ替える    
    def transpose(self):
        self.x, self.y = self.y, self.x
     # x と y の値を足して返す   
    def hamming(self):
        return self.x + self.y
    # メンバ関数を引数として別のオブジェクトを渡す
    def dot(self, other):
        return self.x * other.x + self.y * other.y
    
p = Point() # インスタンス生成
p.set(1,2) # 値をセット
Point.set(p, 2, 3) # 値のセット２
p.transpose() # x = 3 , y = 2
p.hamming() # 5
p = Point(2, 3)
q = Point(5, 4)
p.dot(q) # 2*5 + 3*4 = 22

# あるオブジェクトがどのようなメンバ変数・関数をもつのか確認
dir(p) 
# ['__class__', '__delattr__', '__dict__',  '__dir__',  '__doc__',
#  '__eq__',  '__format__',  '__ge__',  '__getattribute__',  '__gt__',
#  '__hash__',  '__init__',  '__init_subclass__',  '__le__',  '__lt__',
#  '__module__',  '__ne__',  '__new__',  '__reduce__',  '__reduce_ex__',
#  '__repr__',  '__setattr__',  '__sizeof__',  '__str__',  '__subclasshook__',
#  '__weakref__',  'dot',  'hamming',  'set',  'transpose',
#  'x',  'y']

# 継承
class Point3D(Point):
    def __init__(self, x=0., y=0., z=0.):
        super().__init__(x, y)
        self.z = z

p = Point3D(3, 4, 2)
p.hamming() # 7  

# z も考慮した ハミング距離
class Point3D(Point):
    def __init__(self, x=0., y=0., z=0.):
        super().__init__(x, y)
        self.z = z
        
    def hamming(self):
        return self.x + self.y + self.z

p = Point3D(3, 4, 2)
p.hamming() # 9
