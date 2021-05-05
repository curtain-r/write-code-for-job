// call
Function.prototype.myCall = function() {
    let [thisArg, ...args] = arguments;
    thisArg = thisArg || window;
    thisArg.func = this;
    let result = thisArg.func(...args);
    delete thisArg.func;
    return result;
}

// apply
Function.prototype.myApply = function() {
    let [thisArg, args] = arguments;
    thisArg = thisArg || window;
    thisArg.func = this;
    let result = thisArg.func(...args);
    delete thisArg.func;
    return result;
}

// bind
Function.prototype.myBind = function() {
    let [thisArg,...args] = arguments;
    thisArg = thisArg || window;
    let self = this;
    return function() {
        let allArgs = [...args,...arguments];
        return self.call(thisArg,...allArgs);
    }
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