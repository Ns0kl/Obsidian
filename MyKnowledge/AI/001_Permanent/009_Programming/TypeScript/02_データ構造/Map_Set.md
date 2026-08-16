# Map と Set

## 概要

**Map** と **Set** は、ES6で導入されたコレクション型です。通常のオブジェクトと配列より効率的です。

## Map

### 基本的な使い方

```typescript
// Mapの作成
const map: Map<string, number> = new Map();

// キーと値を追加
map.set("apple", 100);
map.set("banana", 200);
map.set("orange", 150);

// 値を取得
console.log(map.get("apple"));    // 100
console.log(map.get("not-exist")); // undefined

// キーの存在確認
console.log(map.has("banana"));   // true
console.log(map.has("grape"));    // false

// 削除
map.delete("banana");
console.log(map.has("banana"));   // false

// サイズ
console.log(map.size);  // 2

// すべて削除
map.clear();
console.log(map.size);  // 0
```

### 初期化時にデータを設定

```typescript
// 配列からMapを作成
const data: [string, number][] = [
    ["a", 1],
    ["b", 2],
    ["c", 3]
];

const map: Map<string, number> = new Map(data);
console.log(map.get("b"));  // 2
```

### Mapの反復処理

```typescript
const map: Map<string, number> = new Map([
    ["apple", 100],
    ["banana", 200],
    ["orange", 150]
]);

// forEach
map.forEach((value: number, key: string) => {
    console.log(`${key}: ${value}`);
});

// for...of でキーを取得
for (const key of map.keys()) {
    console.log(key);
}

// for...of で値を取得
for (const value of map.values()) {
    console.log(value);
}

// for...of でキーと値を取得
for (const [key, value] of map.entries()) {
    console.log(`${key}: ${value}`);
}

// デストラクチャリングでシンプルに
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
```

### オブジェクトをキーに使う

```typescript
// Mapの利点：任意の値をキーに使える
const obj1: { id: number } = { id: 1 };
const obj2: { id: number } = { id: 2 };

const map: Map<{ id: number }, string> = new Map();
map.set(obj1, "Object 1");
map.set(obj2, "Object 2");

console.log(map.get(obj1));  // "Object 1"
console.log(map.size);       // 2
```

## Set

### 基本的な使い方

```typescript
// Setの作成
const set: Set<number> = new Set();

// 要素を追加
set.add(1);
set.add(2);
set.add(3);
set.add(2);  // 重複は追加されない

// サイズ
console.log(set.size);  // 3（重複は1回のみ）

// 要素の存在確認
console.log(set.has(2));   // true
console.log(set.has(100));  // false

// 削除
set.delete(2);
console.log(set.has(2));   // false

// すべて削除
set.clear();
console.log(set.size);  // 0
```

### 配列から重複を削除

```typescript
const arr: number[] = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

// 重複を削除
const unique: number[] = [...new Set(arr)];
console.log(unique);  // [1, 2, 3, 4]

// 文字列配列
const words: string[] = ["apple", "banana", "apple", "cherry"];
const uniqueWords: string[] = [...new Set(words)];
console.log(uniqueWords);  // ["apple", "banana", "cherry"]
```

### Setの反復処理

```typescript
const set: Set<string> = new Set(["red", "green", "blue"]);

// forEach
set.forEach((value: string) => {
    console.log(value);
});

// for...of
for (const value of set) {
    console.log(value);
}

// 値の配列に変換
const values: string[] = Array.from(set);
console.log(values);  // ["red", "green", "blue"]
```

## WeakMap と WeakSet

### WeakMap

```typescript
// 弱参照をサポートするMap
// ガベージコレクションの対象になりやすい

const weakMap: WeakMap<{ id: number }, string> = new WeakMap();

let obj: { id: number } | null = { id: 1 };
weakMap.set(obj, "Some value");
console.log(weakMap.get(obj));  // "Some value"

// オブジェクトの参照を削除するとGCの対象に
obj = null;

// WeakMapはサイズやキーの反復処理ができない
// console.log(weakMap.size);  // Error
```

### WeakSet

```typescript
// 弱参照をサポートするSet
const weakSet: WeakSet<object> = new WeakSet();

let obj1: object | null = { id: 1 };
let obj2: object | null = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1));  // true

// 反復処理できない
// for (const item of weakSet) { }  // Error
```

## Set操作（集合演算）

```typescript
const setA: Set<number> = new Set([1, 2, 3, 4]);
const setB: Set<number> = new Set([3, 4, 5, 6]);

// 和集合（Union）
const union: Set<number> = new Set([...setA, ...setB]);
console.log(union);  // Set(6) { 1, 2, 3, 4, 5, 6 }

// 交集合（Intersection）
const intersection: Set<number> = new Set(
    [...setA].filter(x => setB.has(x))
);
console.log(intersection);  // Set(2) { 3, 4 }

// 差集合（Difference）
const difference: Set<number> = new Set(
    [...setA].filter(x => !setB.has(x))
);
console.log(difference);  // Set(2) { 1, 2 }

// 対称差（Symmetric Difference）
const symmetricDiff: Set<number> = new Set(
    [...setA, ...setB].filter(
        x => (setA.has(x) && !setB.has(x)) || (!setA.has(x) && setB.has(x))
    )
);
console.log(symmetricDiff);  // Set(4) { 1, 2, 5, 6 }
```

## Map vs Object

```typescript
// Object
const objMap: { [key: string]: number } = {};
objMap["a"] = 1;
objMap["b"] = 2;

// Map
const map: Map<string, number> = new Map();
map.set("a", 1);
map.set("b", 2);

// Mapの利点：
// 1. キーの型が多様（オブジェクト、関数など）
// 2. サイズが直接取得可能
// 3. 反復処理が簡単
// 4. キーと値の関係が明確

console.log(Object.keys(objMap).length);  // 2
console.log(map.size);                     // 2

// イテレータ
for (const [key, value] of map) {
    console.log(key, value);
}
```

## 実用例

### キャッシュ（WeakMap）

```typescript
const cache: WeakMap<object, any> = new WeakMap();

function computeExpensive(obj: object): string {
    if (cache.has(obj)) {
        console.log("キャッシュから取得");
        return cache.get(obj);
    }
    
    console.log("計算中...");
    const result: string = JSON.stringify(obj);
    cache.set(obj, result);
    return result;
}

let obj: object | null = { a: 1, b: 2 };
console.log(computeExpensive(obj));  // 計算中...
console.log(computeExpensive(obj));  // キャッシュから取得
```

### 単語数カウント

```typescript
const text: string = "The quick brown fox jumps over the lazy dog";
const words: string[] = text.toLowerCase().split(" ");

const wordCount: Map<string, number> = new Map();

for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
}

console.log(wordCount);
// Map(8) {
//   'the' => 2,
//   'quick' => 1,
//   'brown' => 1,
//   ...
// }
```

## 📌 重要なポイント

- **Map**: キーと値のペアを保存、オブジェクトをキーに使える
- **Set**: ユニークな値のコレクション、重複を自動で削除
- **WeakMap・WeakSet**: メモリ効率が良い、ガベージコレクション対応
- **集合演算**: 和集合、交集合、差集合を実装可能

## 参照

- [[02_データ構造/配列]]
- [[02_データ構造/オブジェクト]]
