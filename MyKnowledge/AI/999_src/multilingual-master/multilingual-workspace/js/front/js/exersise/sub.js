
// テンプレートリテラル ("世界"はデフォルト引数)
export function createElement(message = "世界") {
    const template = 
    `<p> 
        Hello ${message} 
    <p>`
    return template
}

// tr タグの出力
export function createItemRecord(item) {
    const id = createItemData(item.id)
    const name = createItemData(item.name)
    const price = createItemData(item.price)

    const tr = document.createElement("tr")
    tr.appendChild(id)
    tr.appendChild(name)
    tr.appendChild(price)
    return tr
}

// td タグの出力
function createItemData(value) {
    const td = document.createElement("td")
    const nd = document.createTextNode(value)
    td.appendChild(nd)
    return td
}
