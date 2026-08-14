// ループ

// for 文
for (let step = 0; step < 5; step++) {
    console.log("一歩西に歩く");
}  

// do...while 文
let i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5);

// while 文
let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}

// label付き文
//labelを使ってプログラム内の他の場所から参照できる識別子を組み込んだ文
markLoop: while (theMark === true) {
    doSomething();
}
  
// break 文
for (let i = 0; i < a.length; i++) {
    if (a[i] === theValue) {
      break;
    }
}
  
// continue 文
let j = 0;
let k = 0;
while (j < 5) {
  j++;
  if (j === 3) {
    continue;
  }
  k += j;
  console.log(k);
}

// for...in 文
// オブジェクトにあるすべての列挙可能なプロパティに対し指定された変数を通して反復処理
function dump_props(obj, obj_name) {
    let result = "";
    for (let i in obj) {
      result += obj_name + "." + i + " = " + obj[i] + "<br>";
    }
    result += "<hr>";
    return result;
}
// 配列に対しては、forループが良いとされる
// 配列のオブジェクトの変更を行った場合、for..in 文は配列要素に加えてユーザ定義プロパティに対しても反復処理するから
  
// for...of 文
// 反復可能オブジェクト(array, map, set, arguments)を反復処理するループを生成し、それぞれのプロパティの値に対して実行したい文をともなって作られた反復処理フックを呼び出す
const arr = [3, 5, 7];
arr.foo = "hello";
for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}
for (let i of arr) {
  console.log(i); // 3, 5, 7 
}
