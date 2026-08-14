// 例外処理

/*
 * throw           例外を発生
 * try...catch     例外を処理
 */

// throw 文
class UserException {
    constructor(message) {
        this.message = message;
        this.name = "UserException";
    }
    toString() {
        return `${this.name}: "${this.message}"`;
    }
}
// UserException のインスタンスを作成し、それを投げる
throw new UserException("Value too high");

// try...catch 文
function f() {
    try {
      throw "bogus";
    } catch (e) {
      console.log('caught inner "bogus"');
      throw e; 
    } finally {
      return false; 
    }
}

