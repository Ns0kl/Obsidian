// オブジェクトとプロパティ
// オブジェクトに属する変数

var myObj = new Object(),
  str = "myString",
  rand = Math.random(),
  obj = new Object();

myObj.type = "ドット表記";
myObj["date created"] = "空白入りの文字列";
myObj[str] = "文字列の値";
myObj[rand] = "乱数";
myObj[obj] = "オブジェクト";
myObj[""] = "空文字列も可能";

console.log(myObj);

// オブジェクトの列挙
function listAllProperties(o) {
    var objectToInspect;
    var result = [];
  
    for (
      objectToInspect = o;
      objectToInspect !== null;
      objectToInspect = Object.getPrototypeOf(objectToInspect)
    ) {
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    }
  
    return result;
}

/* オブジェクト作成 */
// Ex.1
var obj = {
    property_1: value_1,
    2: value_2, 
    "property n": value_n,
};
// Ex.2
if (cond) var x = { greeting: "hi there" };
// Ex.3
var myHonda = { color: "red", wheels: 4, engine: { cylinders: 4, size: 2.2 } };

// コンストラクタ
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
var mycar = new Car("Eagle", "Talon TSi", 1993);

// Object.create()
var Animal = {
    type: "Invertebrates", 
    displayType: function () {
      console.log(this.type);
    },
};
var animal1 = Object.create(Animal);
animal1.displayType(); // Invertebrates
  
var fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Fishes

/* オブジェクトの参照 */
const Manager = {
    name: "John",
    age: 27,
    job: "Software Engineer",
};
const Intern = {
    name: "Ben",
    age: 21,
    job: "Software Engineer Intern",
};
  
function sayHi() {
    console.log("Hello, my name is", this.name);
}

Manager.sayHi = sayHi;
Intern.sayHi = sayHi;
  
Manager.sayHi(); // Hello, my name is John'
Intern.sayHi(); // Hello, my name is Ben'

// getter ・ setter
var o = {
    a: 7,
    get b() {
      return this.a + 1;
    },
    set c(x) {
      this.a = x / 2;
    },
};
  
console.log(o.a); // 7
console.log(o.b); // 8 
o.c = 50; 
console.log(o.a); // 25

// プロパティの削除
var myobj = new Object();
myobj.a = 5;
myobj.b = 12;

delete myobj.a;
console.log("a" in myobj); // yields "false"

// オブジェクトの比較
var fruit = { name: "apple" };
var fruitbear = { name: "apple" };

fruit == fruitbear; // false
fruit === fruitbear; // false

// オブジェクトを配列に変換する
var obj = {'2': 3, '1': 37, '23': 40, '41': 220, '115': 230};
var arr = Object.keys(obj).map(function(key) {
  return [Number(key), obj[key]];
});
console.log(arr);

