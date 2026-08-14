
// 配列
const items1 = ['イチゴ','バナナ','メロン','スイカ'];
items1[0] = 'ミカン';
console.log(items1);
// ['ミカン','バナナ','メロン','スイカ']

// 配列の入れ子
const items2 = ['イチゴ','バナナ','メロン','スイカ'];
items2[1] = [1,2,3,4,5];
items2[1][2] = [true,false];
console.log(items2);
// [ 'イチゴ', [ 1, 2, [ true, false ], 4, 5 ], 'メロン', 'スイカ' ]


// 排列リテラル
// 数字
const arr1 = [1, 2, 3]; 
 // 異なる型の要素
const arr2 = ["one", 2, "three"]; 
// 配列を要素
const arr3 = [[1, 2, 3], ["one", 2, "three"]];
// オブジェクトや配列、関数など
const arr4 = [  
    {name: "サル", type: "object", luckyNumbers: [5, 7, 13]},
    [{ name: "キジ", type: "object" },{ name: "鬼", type: "object" },],
    1,
    function() { return "配列の要素として関数を記憶することもできる"; },
    "three",
];
console.log(arr1[0]);       // 1
console.log(arr2[2]);       // three
console.log(arr3[1][0]);    // one
console.log(arr4[3]());     // 配列の要素として関数を記憶することもできる

// 配列の長さ
const num1 = arr1.length;
const num2 = arr2.length;
const num3 = arr3.length;
const num4 = arr4[3].length;
console.log(num1);          // 3
console.log(num2);          // 3
console.log(num3);          // 2
console.log(num4);          // 0

// 配列
arr1[4] = 5;
console.log(arr1);          // [ 1, 2, 3, <1 empty item>, 5 ]
console.log(arr1[3]);       // undiefind

// 要素を操作
/** 
 push：配列の最後に要素を追加
 pop：配列の最後の要素を削除
 unshift：先頭に要素を追加
 shift：先頭の要素を削除
*/
let concat_arr = ["a","b","c"];
// 最後
concat_arr.push("d");              // 最後に追加
console.log(concat_arr);           // [ 'a', 'b', 'c', 'd' ]
concat_arr.pop();                  // 最後の削除
console.log(concat_arr);           // [ 'a', 'b', 'c' ]
// 先頭
concat_arr.unshift("Z");           // 最初に追加
console.log(concat_arr);           // ['Z', 'a', 'b', 'c' ]
concat_arr.shift();                // 最初削除
console.log(concat_arr);           // [ 'a', 'b', 'c']

// 複数要素の追加
/**
 * concat：複数の要素を配列に追加し、配列のコピーを戻す
 */
let concat_arr2 = concat_arr.concat(1,2,3);
console.log(concat_arr2);         // [ 'a', 'b', 'c', 1,2,3 ]
let concat_arr3 = concat_arr.concat([1,2,3,]);
console.log(concat_arr3);         // [ 'a', 'b', 'c', 1,2,3 ]      
let concat_arr4 = concat_arr.concat([1,2],[3,4]);
console.log(concat_arr4);         // [ 'a', 'b', 'c', 1,2,3,4]
let concat_arr5 = concat_arr.concat([1,[2,3,4]]);
console.log(concat_arr5);         //[ 'a', 'b', 'c', 1, [ 2, 3, 4 ] ]


// 部分配列
/**
 * slice：ある配列の部分からなる配列を作るメソッド
 */
let slice_arr = [1,2,3,4,5];
// 要素の削除
let slice_arr2 = slice_arr.slice(2);
console.log(slice_arr2);        //[ 3, 4, 5 ]
let slice_arr3 = slice_arr.slice(1,3);
console.log(slice_arr3);        //[ 2, 3 ]
let slice_arr4 = slice_arr.slice(-2);
console.log(slice_arr4);        //[ 4, 5 ]
let slice_arr5 = slice_arr.slice(-3,-1);
console.log(slice_arr5);        //[ 3, 4 ]

// 途中の要素の追加・削除
/**
 * splice：配列の任意の場所を指定して内容を変更することができるメソッド
 * 第一引数が変更を開始する場所
 * 第二引数は削除する要素の数
 * 第三引数以降は追加する要素を指定する
 * 
 * 元の配列を破壊する → 破壊的メソッド
 *
 */
let splice_arr = [1,5,7];
let splice_arr2 = splice_arr.splice(1,0,2,3,4);
console.log(splice_arr);        // [ 1, 2, 3, 4, 5, 7 ]
console.log(splice_arr2);       // [] 何も削除されていない
splice_arr2 = splice_arr.splice(5,0,6);
console.log(splice_arr);        // [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(splice_arr2);       // [] 何も削除されていない
splice_arr2 = splice_arr.splice(1,2);
console.log(splice_arr);        //[ 1, 4, 5, 6, 7 ]
console.log(splice_arr2);        // [2,3] 削除された要素
splice_arr2 = splice_arr.splice(2,1,'a','b');
console.log(splice_arr);        // [ 1, 4, 'a', 'b', 6, 7 ]
console.log(splice_arr2);       // [5] 削除された要素

// 逆転とソート
/**
 * reverse：配列の要素を逆順に並び替えるメソッド
 * 破壊的メソッド
 */
let reverse_arr = [1,2,3,4,5];
let reverse_arr2 = reverse_arr.reverse(reverse_arr);
console.log(reverse_arr);       // [ 5, 4, 3, 2, 1 ]
console.log(reverse_arr2);      // [ 5, 4, 3, 2, 1 ]
reverse_arr.reverse();         
console.log(reverse_arr);       // [ 1, 2, 3, 4, 5 ]
console.log(reverse_arr2);      // [ 1, 2, 3, 4, 5 ]
/**
 * sort：配列の要素のソートを行うメソッド
 * 破壊的メソッド
 */
let sort_arr = [5,4,3,2,1,];
let sort_arr2 = sort_arr.sort();
console.log(sort_arr);          // [ 1, 2, 3, 4, 5 ]
console.log(sort_arr2);         // [ 1, 2, 3, 4, 5 ]
let sort_name = [
    {name: 'Suzuki'},
    {name: 'Jim'},
    {name: 'Taro'},
    {name:'Amada'}
];
console.log(sort_name);         //[ { name: 'Suzuki' },{ name: 'Jim' },{ name: 'Taro' },{ name: 'Sato' }]
sort_name.sort((a, b) => a.name > b.name); // name でソート
console.log(sort_name);

// 検索
/**
 * indexOf：引数に指定した値に厳密に等しい要素をもつ最初の添字を返す
 * 見つからなかった場合は-1を返す
 */
const o = { name: "ジェリー" };
let indexOf_arr = [1, 5, "a", o, true, 5, [1, 2], "9"];
console.log(indexOf_arr.indexOf("a")); // 2
console.log(indexOf_arr.lastIndexOf("a")); // 2
console.log(indexOf_arr.indexOf({ name: "ジェリー" })); // -1

// map
/**
 * 配列内の要素を変換する。
 */
const cart = [ 
    { 名前: "iPhone", 価格: 54800}, 
    { 名前: "Android", 価格: 49800}
];
const names = cart.map(element => element.名前);
console.log(names);         // [ 'iPhone', 'Android' ]

// filter
/**
 * 配列から不要な要素を取り去る働きをする
 * 条件にマッチしない要素が削除された配列を返す
 */
const words = [
    'spray', 'limit', 'elite', 
    'exuberant', 'destruction', 'present'
];
// 6文字以上を配列に残す
const result = words.filter(word => word.length > 6);
console.log(result);// ["exuberant", "destruction", "present"]

// reduce
/**
 * 配列全体を変換する
 * mapは配列の各要素を変換するが、reduceは配列全体を変換する
 *例えば、配列の全要素の合計を計算したり、
 *平均を計算したりして一つの値に変換する。
 */
 const reduce_arr = [5, 7, 2, 4];
 const sum = reduce_arr.reduce((a, x) => a += x, 0);
 console.log(sum); // 18
 const sum2 = reduce_arr.reduce((a, x) => a + x, 0); //「+=」の「=」 は省略できる
 console.log(sum2); // 18

// join 
/**
 * 配列の各要素をまとめて、1つの文字列を作る
 * 第一引数はセパレータ（デフォルトは「,」になっている）
 */
const join_arr = [1, null, "hello", "world", true, undefined];
delete join_arr[3];
let join_result = join_arr.join();
console.log(join_result); // 1,,hello,,true,
join_result = join_arr.join('');
console.log(join_result); // 1hellotrue
join_result = join_arr.join(' -- ');
console.log(join_result); // 1 --  -- hello --  -- true -- 

// filter
/**
 * 配列の抽出
 */
var items = [3,2,2,4,8,8,8,6,9];
var result_filter = items.filter( function( value, index, array ) {
    //インデックス番号を比較して重複データのみ排除
    return array.indexOf( value ) === index;
})
console.log(result_filter);