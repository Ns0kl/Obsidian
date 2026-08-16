# JSON 操作

## 概要

**JSON**（JavaScript Object Notation）は、データ交換の標準形式です。TypeScriptでは`JSON`オブジェクトと型定義を組み合わせて安全に扱えます。

## JSON.stringify

### 基本形

```typescript
const user: { name: string; age: number } = {
    name: "Alice",
    age: 30
};

const json: string = JSON.stringify(user);
console.log(json);  // '{"name":"Alice","age":30}'

// 見やすくインデント
const prettyJson: string = JSON.stringify(user, null, 2);
console.log(prettyJson);
// {
//   "name": "Alice",
//   "age": 30
// }
```

### フィルタリング

```typescript
const user: { name: string; age: number; password: string } = {
    name: "Alice",
    age: 30,
    password: "secret"
};

// 特定のプロパティだけを含める
const json: string = JSON.stringify(user, ["name", "age"]);
console.log(json);  // '{"name":"Alice","age":30}'

// リプレーサー関数
const filtered: string = JSON.stringify(user, (key, value) => {
    if (key === "password") {
        return undefined;  // 除外
    }
    return value;
});
console.log(filtered);  // '{"name":"Alice","age":30}'
```

### 変換関数

```typescript
const data: { name: string; createdAt: Date } = {
    name: "Alice",
    createdAt: new Date()
};

// Date オブジェクトを文字列に変換
const json: string = JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
        return value.toISOString();
    }
    return value;
});

console.log(json);
// '{"name":"Alice","createdAt":"2024-01-15T10:30:00.000Z"}'
```

### toJSON メソッド

```typescript
class User {
    constructor(
        public id: number,
        public name: string,
        private password: string
    ) {}

    toJSON(): any {
        return {
            id: this.id,
            name: this.name
            // password は含めない
        };
    }
}

const user: User = new User(1, "Alice", "secret");
const json: string = JSON.stringify(user);
console.log(json);  // '{"id":1,"name":"Alice"}'
```

## JSON.parse

### 基本形

```typescript
const json: string = '{"name":"Alice","age":30}';

const user: { name: string; age: number } = JSON.parse(json);
console.log(user.name);  // "Alice"
console.log(user.age);   // 30
```

### 型定義との組み合わせ

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const json: string = '{"id":1,"name":"Alice","email":"alice@example.com"}';

// 型アサーション
const user: User = JSON.parse(json) as User;
console.log(user.id);    // 1
console.log(user.name);  // "Alice"
```

### バリデーション

```typescript
interface ApiResponse<T> {
    status: number;
    data: T;
}

function parseResponse<T>(json: string): ApiResponse<T> {
    const parsed: any = JSON.parse(json);

    if (!parsed.status || !("data" in parsed)) {
        throw new Error("Invalid response format");
    }

    return parsed as ApiResponse<T>;
}

const json: string = '{"status":200,"data":{"name":"Alice"}}';
const response = parseResponse<{ name: string }>(json);
console.log(response.data.name);  // "Alice"
```

### Reviver 関数

```typescript
interface Event {
    name: string;
    date: Date;
}

const json: string = '{"name":"Meeting","date":"2024-01-15T10:00:00Z"}';

// Date文字列を Date オブジェクトに変換
const event: Event = JSON.parse(json, (key, value) => {
    if (key === "date" && typeof value === "string") {
        return new Date(value);
    }
    return value;
});

console.log(event.date instanceof Date);  // true
console.log(event.date.getFullYear());    // 2024
```

## API レスポンス処理

### 型安全な API 呼び出し

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

async function fetchUser(userId: number): Promise<User> {
    const response: Response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const result: ApiResponse<User> = await response.json();

    if (!result.success) {
        throw new Error(result.error || "Unknown error");
    }

    if (!result.data) {
        throw new Error("No data returned");
    }

    return result.data;
}

// 使用
(async () => {
    try {
        const user: User = await fetchUser(1);
        console.log(user.name);
    } catch (error) {
        console.error("Failed to fetch user");
    }
})();
```

### 複雑なデータ構造

```typescript
interface Post {
    id: number;
    title: string;
    author: {
        id: number;
        name: string;
    };
    comments: {
        id: number;
        text: string;
        author: string;
    }[];
}

const json: string = `{
    "id": 1,
    "title": "TypeScript Tips",
    "author": {
        "id": 1,
        "name": "Alice"
    },
    "comments": [
        {"id": 1, "text": "Great!", "author": "Bob"},
        {"id": 2, "text": "Very helpful", "author": "Charlie"}
    ]
}`;

const post: Post = JSON.parse(json);
console.log(post.author.name);           // "Alice"
console.log(post.comments[0].text);      // "Great!"
console.log(post.comments.length);       // 2
```

## エラーハンドリング

### 無効な JSON

```typescript
function safeParse<T>(json: string): T | null {
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("無効な JSON:", error.message);
        } else {
            console.error("予期しないエラー:", error);
        }
        return null;
    }
}

const result1 = safeParse('{"name":"Alice"}');
console.log(result1);  // { name: "Alice" }

const result2 = safeParse('invalid json');
console.log(result2);  // null
```

### 部分的なパース

```typescript
function parseWithDefault<T>(
    json: string,
    defaultValue: T
): T {
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        console.warn("JSONパース失敗、デフォルト値を使用");
        return defaultValue;
    }
}

const user = parseWithDefault('invalid', { name: "Unknown", age: 0 });
console.log(user);  // { name: "Unknown", age: 0 }
```

## JSON スキーマバリデーション

```typescript
interface ValidationRule<T> {
    [K in keyof T]?: (value: T[K]) => boolean;
}

interface User {
    name: string;
    age: number;
    email: string;
}

const userRules: ValidationRule<User> = {
    name: (value) => typeof value === "string" && value.length > 0,
    age: (value) => typeof value === "number" && value >= 0,
    email: (value) => typeof value === "string" && value.includes("@")
};

function validateJson<T>(data: any, rules: ValidationRule<T>): boolean {
    for (const [key, rule] of Object.entries(rules)) {
        if (rule && !rule((data as any)[key])) {
            console.error(`Validation failed for ${key}`);
            return false;
        }
    }
    return true;
}

const json = '{"name":"Alice","age":30,"email":"alice@example.com"}';
const data = JSON.parse(json);
console.log(validateJson(data, userRules));  // true

const invalidJson = '{"name":"","age":-5,"email":"invalid"}';
const invalidData = JSON.parse(invalidJson);
console.log(validateJson(invalidData, userRules));  // false
```

## LocalStorage との連携

```typescript
interface Settings {
    theme: "light" | "dark";
    fontSize: number;
    language: string;
}

function saveSettings(settings: Settings): void {
    const json: string = JSON.stringify(settings);
    localStorage.setItem("appSettings", json);
}

function loadSettings(): Settings {
    const json: string | null = localStorage.getItem("appSettings");
    
    if (!json) {
        return { theme: "light", fontSize: 14, language: "en" };
    }

    try {
        return JSON.parse(json) as Settings;
    } catch (error) {
        console.error("Failed to load settings");
        return { theme: "light", fontSize: 14, language: "en" };
    }
}

// 使用
const settings: Settings = loadSettings();
settings.theme = "dark";
saveSettings(settings);
```

## 📌 重要なポイント

- **stringify**: オブジェクト → JSON文字列
- **parse**: JSON文字列 → オブジェクト
- **型安全性**: インターフェースでデータ構造を定義
- **エラーハンドリング**: try/catchで無効なJSONに対応
- **Reviver/Replacer**: パース/シリアライズ時の変換処理

## 参照

- [[01_基礎概念/変数と型]]
- [[02_データ構造/オブジェクト]]
- [[03_高度な概念/非同期処理]]
