// call
Function.prototype.myCall = function() {
    let [thisArg, ...args] = arguments;
    thisArg = thisArg || window;
    thisArg.func = this;
    let result = thisArg.func(...args);
    delete thisArg.func;
    return result;
}
	
//apply
Function.prototype.myApply = function() {
    let [thisArg, args] = arguments;
    thisArg = thisArg || window;
    thisArg.func = this;
    let result = thisArg.func(...args);
    delete thisArg.func;
    return result;
}

// bind  比较麻烦
Function.prototype.myBind = function() {
    let [thisArg, ...args] = arguments;
    // F = function() {};
    let current = this;
    result = function() {
        let allArgs = [...args, ...arguments];
        return current.call(thisArg,...allArgs);
    }
    // F.prototype = current.prototype;
    // result.prototype = new F();
    return result;
}

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


test.myCall(testObj,1,2,3,4,5);
test.myApply(testObj,[1,2,4,4]);

let newTest = test.myBind(testObj,1,2,3,4,5);
newTest(19); 