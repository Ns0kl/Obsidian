/* 関数 */
// プリミティブ
function square(number) {
    return number * number;
}

// オブジェクト
function myFunc(theObject) {
    theObject.make = "Toyota";
}
  
var mycar = { make: "Honda", model: "Accord", year: 1998 };
var x, y;
  
x = mycar.make; // x は "Honda" 
  
myFunc(mycar);
y = mycar.make; // y は "Toyota"

/* 関数式 */
// 無名
const square = function (number) {
    return number * number
}
var x = square(4)

// 名前あり (自分自身を参照することが可能)
const factorial = function fac(n) {
    return n < 2 ? 1 : n * fac(n-1);
}
console.log(factorial(3))

/* 入れ子関数とクロージャ */
// 関数の中に関数をネストできる
// 内側の関数は外側の関数の外には非公開
function A(x) {
    function B(y) {
      function C(z) {
        console.log(x + y + z);
      }
      C(3);
    }
    B(2);
}
A(1); // 6

/* arguments オブジェクトの使用 */
function myConcat(separator) {
    var result = ""; 
    var i;
    for (i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
    }
    return result;
}
// "red, orange, blue, " を返す
myConcat(", ", "red", "orange", "blue");
// "elephant; giraffe; lion; cheetah; " を返す
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");
// "sage. basil. oregano. pepper. parsley. " を返す
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");

/* 関数の引数 */
// undefind のときのデフォルト引数の設定
// デフォルト引数なし
function multiply(a, b) {
    b = typeof b !== "undefined" ? b : 1;  
    return a * b;
}  
multiply(5); // 5
  
// デフォルト引数あり
function multiply(a, b = 1) {
    return a * b;
}
multiply(5); // 5

/* 残余引数 */
// 不特定多数の引数を配列のように表すことができる
function multiply(multiplier, ...theArgs) {
    return theArgs.map((x) => multiplier * x); // 2*1 , 2*2 , 2*3
}  
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

/* アロー関数 */
// 関数式と比較して短い
// 常に無名関数
var a = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
var a2 = a.map(function (s) {
  return s.length;
});
console.log(a2); // [8, 6, 7, 9]

var a3 = a.map((s) => s.length);
console.log(a3); // [8, 6, 7, 9]

  
  