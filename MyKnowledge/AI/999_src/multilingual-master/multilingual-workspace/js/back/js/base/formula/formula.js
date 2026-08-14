// 式と演算子


/*
 * 代入演算子
 * 
 * 代入                    x = f() 
 * 加算代入                x += f()
 * 減算代入                x  -= f()
 * 乗算代入                x *= f()
 * 除算代入                x /= f()
 * 剰余代入                x %= f()
 * べき乗代入              x **= f()
 * 左シフト代入            x <<= f()
 * 右シフト代入            x >>= f()
 * 符号なし右シフト代入    x >>>= f()
 * AND代入                 x &= f()
 * XOR代入                 x ^= f()
 * OR代入                  x |= f()
 * 論理積代入              x &&= f()
 * 論理和代入              x ||= f()
 * Null合体代入            x ??= f()
 */

/* 分割代入 */
var foo = ['one', 'two', 'three']
// 分割代入を行わない代入
var one = foo[0];
var two = foo[1];
var three = foo[2];
// 分割代入
const [one, two, three] = foo

/*
 * 比較演算子
 *
 * 等価         オペランドが等しい場合 true
 * 厳密等価     オペランドが等しいかつ同じ型である場合 true   
 */

/* 条件演算子 */
const status = age >= 18 ? "adult" : "minor"

/* カンマ演算子 */
const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const a = [x, x, x, x, x];
for (let i = 0, j = 9; i <= j; i++, j--) {
  console.log(`a[${i}][${j}]= ${a[i][j]}`);
}
// a[0][9]= 9
// a[1][8]= 8
// a[2][7]= 7
// a[3][6]= 6
// a[4][5]= 5

/* 単項演算子 */
// delete
delete Math.PI;
const myObj = {h: 4};
delete myObj.h;
// 配列要素の削除
// → 配列もオブジェクトであるため、delete することは可能だが、
//   配列のlength は影響を受けないため、推奨されない
//   → undefindで上書きする方がはるかに良い
//     splice のような配列のメソッドを推奨

// typeof
const myFun = new Function("5 + 2");
const shape = "round";
const size = 1;
const foo = ["Apple", "Mango", "Orange"];
const today = new Date();
typeof myFun;       // "function" を返す
typeof shape;       // "string" を返す
typeof size;        // "number" を返す
typeof foo;         // "object" を返す
typeof today;       // "object" を返す
typeof doesntExist; // "undefined" を返す

// void
// 値を返さずに評価する式を指定

/* 関係演算子 */
// in
// 指定したプロパティが指定のオブジェクトにある場合、true
// 配列
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees; // true
3 in trees; // true
6 in trees; // false
"bay" in trees; // false
"length" in trees; // true
// 定義済みオブジェクト
"PI" in Math; // true
const myString = new String("coral");
"length" in myString; // true
// ユーザ定義オブジェクト
const mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar;    // true
"model" in mycar;   // true

// instanceof
// 指定されたオブジェクトが指定されたオブジェクトの種類である場合、true
const theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
  // 実行する文
}

// this
// 現在のオブジェクトの参照
function validate(obj, lowval, hival) {
    if (obj.value < lowval || obj.value > hival) {
      console.log("Invalid Value!");
    }
}
  
