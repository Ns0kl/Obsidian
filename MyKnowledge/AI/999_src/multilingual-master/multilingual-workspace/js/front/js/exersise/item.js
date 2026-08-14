// クラス
export class Item {
    // コンストラクタ
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }
    // メソッド
    toString() {
        return `id:${this.id} name:${this.name} price:${this.price}`
    }
}
