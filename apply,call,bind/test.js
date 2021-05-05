Function.prototype.myBind = function() {
    let [thisArg, ...args] = arguments;
    // 将this保存下来，和result形成闭包
    let self = this;
    // 创建一个寄生类
    F = function() {};
    result = function() {
        let allArgs = [...args, ...arguments];  // 合并bind传入的参数，和调用时传入的参数
        return self.call((this instanceof F ? this : thisArg),...allArgs);
        // return self.apply((this instanceof F ? this : thisArg),allArgs);
        // 这里主要说明一下，this instanceof F ? this : thisArg
        // 如果调用bind的调用者，是构造函数的实例的时候
    }
    // 让寄生类的原型指向bind的原型
    F.prototype = self.prototype;
    // 让result的原型执行F的构造函数
    result.prototype = new F();
    return result;
}

// 测试
function test() {
    let args = arguments;
    let result = 0;
    for (let i=0;i<[...args].length;i++) {
        result += [...args][i];
    }
    console.log(this.name,result);
}
let testObj = {
    name: 'Sanguine'
}
let newTest = test.myBind(testObj,1,2,3,4,5);
newTest(19);            // Sanguine 34