// 数値

// 10進数
1234567890;
// 2進数
var FLT_SIGNBIT = 0b10000000000000000000000000000000;       // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000;      // 2139095040
var FLT_MANTISSA = 0b00000000011111111111111111111111;      // 8388607
// 8進数
var n = 0o755;  // 493
var m = 0o644;  // 420
// 16進数
0xfffffffffffffffff;    // 295147905179352830000
0x123456789abcdef;      // 81985529216486900
0xa;                    // 10
// 指数表現
1e3;    // 1000
2e6;    // 2000000
0.1e2;  // 10

/* Number オブジェクト */
// 最大値
var biggestNum = Number.MAX_VALUE;
// 最小値
var smallestNum = Number.MIN_VALUE;
// 正の無限大を表す特別な値
var infiniteNum = Number.POSITIVE_INFINITY;
// 負の無限大を表す特別な値
var negInfiniteNum = Number.NEGATIVE_INFINITY;
// javascriptで正確に扱える最大の整数値
var infiniteSafeNum = Number.MAX_SAFE_INTEGER;
// javascriptで正確に扱える最小の整数値
var negInfiniteSafeNum = Number.MIN_SAFE_INTEGER;
// Numberオブジェクトで表現可能な、ある数とそれよりも大きい最小数との差分値
var epsiron = Number.EPSILON;
// 非数を表す特別な値
var notANum = Number.NaN;

// メソッド
// 文字列 → 浮動小数
Number.parseFloat() 
// 文字列 → 整数
Number.parseInt()
// 渡された値が有限数かどうか判断
Number.isFinite()
// 渡された値が整数かどうか判断
Number.isInteger()
// 渡された値がNaNかどうか判断
Number.isNaN()
// 渡された値が正確に扱える整数かどうか判断
Number.isSafeInteger()

/* Mathオブジェクト */
// 絶対値
Math.abs()
// 三角関数(引数：ラジアン)
Math.sin()
Math.cos()
Math.tan()
//逆三角関数(戻り値：ラジアン)
Math.asin()
Math.acos()
Math.atan()
Math.atan2()
// 双曲線三角関数
Math.sinh()
Math.cosh()
Math.tanh()
// 逆双曲線三角関数
Math.asinh()
Math.acosh()
Math.atanh()
// 指数関数・対数関数
Math.pow()
Math.exp()
Math.expm1()
Math.log10()
Math.log2()
Math.log1p()
// 引数以下の最大の整数値
Math.floor()
// 引数以上の最小の整数値
Math.ceil()
// 0 から 1 の間のランダムな数値
Math.random()
// 丸めと切り捨て関数
Math.round()
Math.fround()
Math.trunc()
// 平方根・立方根・引数の2乗の和の平方根を返す
Math.sqrt()
Math.cbrt()
Math.hypot()
// 数の符号、すなわち数が正、負またはゼロかどうか判断
Math.sign()

