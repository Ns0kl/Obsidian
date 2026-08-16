# TypeScript 学習ガイド

## はじめに

このガイドは、TypeScriptを段階的に学ぶための総合的なロードマップです。基礎から高度な概念まで、実践的なアプローチで習得できます。

---

## 📚 4段階の学習プログレッション

### **ステージ 1: 基礎概念（1〜2週間）**

TypeScriptの基本的な型システムと制御フローを学びます。JavaScriptの経験がある場合は、型注釈に焦点を当ててください。

**学習内容：**
- [[01_基礎概念/変数と型|変数と型]]: let/const/var、型注釈、型推論、ユニオン型
- [[01_基礎概念/演算と計算|演算と計算]]: すべての演算子、テンプレートリテラル、型強制
- [[01_基礎概念/制御文|制御文]]: if/else、switch、for/while、break/continue
- [[01_基礎概念/関数|関数]]: 関数シグネチャ、デフォルト値、可変長引数、アロー関数

**チェックリスト：**
- [ ] 型注釈を正しく書ける
- [ ] 関数の型を定義できる
- [ ] ユニオン型と交差型の違いが理解できている
- [ ] テンプレートリテラルを使いこなせる

**よくある初心者の間違い：**
- ❌ `let x = 5; x = "string";` ← 型が変わる（型推論による）
- ✅ `let x: number = 5;` ← 型を明示的に指定
- ❌ `function fn(x) { ... }` ← パラメータの型がない
- ✅ `function fn(x: number): number { ... }` ← 型を指定

---

### **ステージ 2: データ構造（2〜3週間）**

TypeScriptの豊富なデータ構造を習得します。実務ではこれらを日常的に使用します。

**学習内容：**
- [[02_データ構造/配列|配列]]: 配列メソッド、map/filter/reduce、スプレッド演算子
- [[02_データ構造/オブジェクト|オブジェクト]]: インターフェース、デストラクチャリング、型安全性
- [[02_データ構造/文字列|文字列]]: 文字列メソッド、正規表現、テンプレートタグ
- [[02_データ構造/Map_Set|Map と Set]]: キーと値の管理、集合演算、WeakMap/WeakSet

**チェックリスト：**
- [ ] 配列の高階関数を使いこなせる
- [ ] インターフェースを定義できる
- [ ] デストラクチャリングでコードを簡潔に書ける
- [ ] Mapと通常のオブジェクトの違いが理解できている
- [ ] 正規表現の基本が理解できている

**実践課題：**
1. ユーザーのリストをフィルタリングして、特定の条件に合う人のメールアドレスを取得する
2. オブジェクトのネストされたデータから特定のプロパティを抽出する
3. Mapを使って単語数をカウントするプログラムを書く

---

### **ステージ 3: 高度な概念（3〜4週間）**

TypeScriptの真の力を引き出す高度なパターンを学びます。プロフェッショナルなコードを書けるようになります。

**学習内容：**
- [[03_高度な概念/クラスとインターフェース|クラスとインターフェース]]: OOP、アクセス修飾子、継承、抽象クラス
- [[03_高度な概念/エラーハンドリング|エラーハンドリング]]: try/catch、カスタム例外、型ガード
- [[03_高度な概念/非同期処理|非同期処理]]: Promise、async/await、コールバック、リトライロジック
- [[03_高度な概念/ジェネリクス|ジェネリクス]]: 汎用型、型制約、条件付き型、Mapped Types

**チェックリスト：**
- [ ] クラスのアクセス修飾子を正しく使える
- [ ] async/awaitでPromiseを正しく処理できる
- [ ] ジェネリクス関数・クラスを定義できる
- [ ] 型ガードで型安全性を確保できる
- [ ] カスタム例外クラスを実装できる

**実践課題：**
1. ユーザー、管理者、ゲストの3つのロールを持つクラス構造を設計
2. APIからデータを取得してエラー処理を含めた実装
3. ジェネリック Repository パターンを実装
4. リトライ機能を持つ非同期関数を実装

**ステージ 3 の学習成果：**
このステージを完了すると、実務的なTypeScriptコードを本当の意味で理解・作成できるようになります。

---

### **ステージ 4: 実践応用（継続的）**

学んだ知識を実務で活用し、より深い理解を得ます。

**学習内容：**
- [[04_実践/アルゴリズム|アルゴリズム]]: ソート、検索、グラフ探索、動的計画法
- [[04_実践/JSON操作|JSON 操作]]: API通信、バリデーション、データ変換
- [[05_ユーティリティ/定数と列挙型|定数と列挙型]]: Enum、const assertion、権限管理
- [[05_ユーティリティ/ユーティリティ型|ユーティリティ型]]: Partial, Required, Pick, Omit, Record

**実践プロジェクト例：**

#### プロジェクト 1: ユーザー管理システム
```typescript
// インターフェース定義
interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user" | "guest";
    createdAt: Date;
}

// リポジトリパターン
class UserRepository {
    private users: User[] = [];

    async getById(id: number): Promise<User | undefined> {
        // 実装
    }

    async save(user: Omit<User, "id" | "createdAt">): Promise<User> {
        // 実装
    }

    async filter(predicate: (user: User) => boolean): Promise<User[]> {
        // 実装
    }
}
```

#### プロジェクト 2: API クライアント
```typescript
class ApiClient {
    async request<T>(
        url: string,
        options?: RequestInit
    ): Promise<T> {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            // エラーハンドリング
            throw error;
        }
    }

    async withRetry<T>(
        fn: () => Promise<T>,
        maxRetries: number = 3
    ): Promise<T> {
        // リトライ実装
        return fn();
    }
}
```

#### プロジェクト 3: 状態管理システム
```typescript
type AppState = {
    user: User | null;
    loading: boolean;
    error: string | null;
};

type Action = 
    | { type: "SET_USER"; payload: User }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string };

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
    }
}
```

---

## 🔧 デバッグのコツ

### **1. 型エラーを読み解く**

```typescript
// ❌ エラー例
const arr: number[] = ["a", "b"];
// Error: Type 'string' is not assignable to type 'number'.

// ✅ 原因分析のステップ
// 1. エラーメッセージをしっかり読む
// 2. 型注釈と実際の値を比較する
// 3. 型推論が正しく働いているか確認する
```

### **2. any型の乱用を避ける**

```typescript
// ❌ 避けるべき
const data: any = fetchData();
console.log(data.unknownProperty);

// ✅ 推奨
interface DataType {
    name: string;
    age: number;
}

const data: DataType = fetchData();
console.log(data.name);
```

### **3. Optional Chaining を活用**

```typescript
// ❌ 煩雑
if (user && user.profile && user.profile.address) {
    console.log(user.profile.address.zip);
}

// ✅ シンプル
console.log(user?.profile?.address?.zip);
```

### **4. 型ガードで型を安全にする**

```typescript
// ❌ 不安全
if (typeof value === "object") {
    console.log(value.name);  // エラー可能性
}

// ✅ 安全
if (typeof value === "object" && value !== null && "name" in value) {
    console.log(value.name);  // 型安全
}

// さらに関数化
function isUser(value: any): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value
    );
}

if (isUser(value)) {
    console.log(value.name);  // User型として扱われる
}
```

---

## ⚠️ よくある落とし穴

### **1. 型の変更の自動化**

```typescript
// ❌ 危険
let value: string | number = "hello";
value = 42;  // 型が変わる
console.log(value.toLowerCase());  // エラー！

// ✅ 安全
let stringValue: string = "hello";
let numberValue: number = 42;
```

### **2. null と undefined を混同**

```typescript
interface User {
    name: string;
    phone?: string;  // undefined の可能性
    nickname: string | null;  // nullの可能性
}

// ❌ 間違い
if (user.phone) { }  // undefinedとfalsy値を区別できない

// ✅ 正確
if (user.phone !== undefined) { }
if (user.nickname !== null) { }
```

### **3. ジェネリクスの過度な使用**

```typescript
// ❌ 過度に複雑
type T<A extends B<C extends D<E>>> = ...

// ✅ シンプルで明確
interface Repository<T> {
    getById(id: number): T;
    save(item: T): void;
}
```

### **4. as による無理な型変換**

```typescript
// ❌ 危険
const user = data as User;  // チェックなし

// ✅ 安全
if (isUser(data)) {
    const user: User = data;  // 型安全
}
```

### **5. Promise と async/await の混在**

```typescript
// ❌ 読みにくい
fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));

fetchOrder(1);  // 順序が不確定

// ✅ 明確
async function main() {
    try {
        const user = await fetchUser(1);
        console.log(user);
        const order = await fetchOrder(1);
    } catch (error) {
        console.error(error);
    }
}

main();
```

---

## 🎯 学習効果を高めるTips

### **1. 型を意識しながらコードを書く**

```typescript
// ❌ 型をつけずに書く
function processData(data) {
    return data.map(item => item * 2);
}

// ✅ 最初から型をつける
function processData(data: number[]): number[] {
    return data.map(item => item * 2);
}
```

### **2. エラーメッセージを友達と思う**

TypeScriptのエラーメッセージは非常に詳細です。しっかり読むことで、多くの学習ができます。

### **3. 実務コードを読む**

有名なOSSプロジェクト（React、Next.js、Express等）のTypeScriptコードを読んで、ベストプラクティスを学びましょう。

### **4. 小さなプロジェクトから始める**

```
Week 1-2: TODOアプリ
Week 3-4: ブログプラットフォーム
Week 5+: 本格的なWebアプリケーション
```

### **5. 定期的にリファクタリング**

過去に書いたコードを見直して、より良い型定義ができるか検討してください。

---

## 📋 チェックリスト: 習得度評価

### **初級（ステージ 1-2 完了時）**
- [ ] 基本的な型注釈ができる
- [ ] 配列やオブジェクトを操作できる
- [ ] 簡単な関数を型付けできる
- [ ] コンパイルエラーを読んで理解できる

### **中級（ステージ 3 完了時）**
- [ ] クラスを設計できる
- [ ] 非同期処理を正しく扱える
- [ ] ジェネリクスを使った型定義ができる
- [ ] エラーハンドリングが適切にできる

### **上級（ステージ 4 継続時）**
- [ ] Mapped Typesなど高度な型操作ができる
- [ ] 複雑なアルゴリズムを型安全に実装できる
- [ ] パフォーマンスを意識した最適化ができる
- [ ] 他者のコードを効果的にレビューできる

---

## 🤔 よくある質問（FAQ）

### **Q: JavaScriptとTypeScriptのどちらを学ぶべき？**

**A:** JavaScriptの基本を理解した後、TypeScriptを学ぶことを強くお勧めします。TypeScriptはJavaScriptの拡張であり、JavaScriptの知識があると学習がスムーズです。

### **Q: 型はすべてにつけるべき？**

**A:** できるだけつけることをお勧めします。特に関数のパラメータと戻り値は必須です。型推論が十分な場合は省略しても構いません。

### **Q: any型は本当にダメ？**

**A:** 完全に避けるべきではありませんが、最後の手段と考えてください。`unknown`か`as const`での回避方法を検討してください。

### **Q: パフォーマンスはJavaScriptと同じ？**

**A:** はい、TypeScriptはJavaScriptにコンパイルされるため、実行時のパフォーマンスは同じです。

### **Q: 学習にはどのくらい時間がかかる？**

**A:** 基礎習得まで 1-2ヶ月、実務レベルまで 3-6ヶ月が目安です。個人差が大きいため、自分のペースで学習してください。

---

## 📚 参考資料

### **公式ドキュメント**
- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### **推奨学習リソース**
- VSCode + TypeScript拡張機能
- ESLint + Prettier（コード品質管理）
- Jest（テストフレームワーク）

---

## 💡 次のステップ

このガイドを完了した後は、以下のトピックを学習することをお勧めします：

- フレームワーク（React/Vue/Angular）でのTypeScript活用
- テスト駆動開発（TDD）
- デザインパターン（Observer、Factory等）
- 型セーフなAPI設計

---

**学習を進める中で、このガイドに戻って確認してください。継続的な学習こそが、TypeScript習得の鍵です！** 🚀
