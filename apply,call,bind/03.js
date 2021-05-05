// call 
Function.prototype.my_call = function() {
  let [thisArg, ...args] = arguments;
  thisArg = thisArg || window;
  thisArg.func = this;
  let result = thisArg.func(...args);
  delete thisArg.func;
  return result;
}

// apply

Function.prototype.my_apply = function() {
  let [thisArg, args] = arguments;
  thisArg = thisArg || window;
  thisArg.func = this;
  let result = thisArg.func(...args);
  delete thisArg.func;
  return result;
}

// bind
Function.prototype.my_bind = function() {
  let [thisArg, ...args] = arguments;
  let self = this;
  return function() {
    let allArgs = [...args, ...arguments];
    self.call(thisArg, ...allArgs);
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
let newTest = test.my_bind(testObj,1,2,3,4,5);
newTest(19);  
test.my_call(testObj,1,2,3,4,5);
test.my_apply(testObj,[1,2,4,4]);
