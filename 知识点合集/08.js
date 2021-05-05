// quickSort
{
  function quickSort(arr) {
    if (arr.length < 2) return arr;
    let value = arr.splice(arr.length >> 1, 1);
    let left = [],
      right = [];
    arr.forEach((v) => {
      v < value ? left.push(v) : right.push(v);
    });
    return quickSort(left).concat(value, quickSort(right));
  }
  let a = [1, 3, 23, 21, 412, 541, 12, 31, 41, 43, 41];
  console.log(quickSort(a));
}
// mergeSort(arr)
{
  function mergeSort(arr) {
    if (arr.length > 1) {
      let mid = arr.length >> 1;
      let left = mergeSort(arr.slice(0, mid));
      let right = mergeSort(arr.slice(mid));
      arr = merge(left, right);
    }
    return arr;
  }
  function merge(left, right) {
    let i = 0,
      j = 0;
    let result = [];
    while (i < left.length && j < right.length) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
  }
  let a = [1, 3, 23, 21, 412, 541, 12, 31, 41, 43, 41];
  console.log(quickSort(a));
}
// call apply bind
{
  Function.prototype.myCall = function () {
    let arr = Array.from(arguments);
    let context = arr.shift();
    context.fn = this;
    let result = context.fn(...arr);
    delete context.fn;
    return result;
  };
  Function.prototype.myApply = function () {
    let arr = Array.from(arguments);
    let context = arr[0] || window;
    let args = arr[1];
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
  };
  Function.prototype.myBind = function () {
    let arr = Array.from(arguments);
    let context = arr.shift();
    let self = this;
    return function () {
      let args = arr.concat(Array.from(arguments));
      return self.call(context, ...args);
    };
  };
  let context = {
    name: "sanguine",
    age: 20,
  };
  function log() {
    console.log(Array.from(arguments));
    console.log(this.name, this.age);
  }
  console.log(log.myCall(context, 1, 3, 3));
  console.log(log.myApply(context, [1, 3, 2, 2]));
  let c = log.myBind(context, 333);
  console.log(c("a"));
}
// deepClone
{
  function deepClone(target) {
    if (typeof target !== "object" || target == null) return target;
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key]);
      }
    }
    return result;
  }
  function deepClone2(target) {
    return JSON.parse(JSON.stringify(target));
  }
  let a = { a: [1, 2, 3, { a: 1 }] };
  console.log(deepClone(a));
  console.log(deepClone2(a));
}
// new
{
  function myNew(target, ...args) {
    let obj = {};
    obj.__proto__ = target.prototype;
    target.call(target, ...args);
    return obj;
  }
}
// instanceof
{
  function _instanceof(L, R) {
    let target = R.prototype;
    L = L.__proto__;
    while (true) {
      if (L === target) return true;
      if (L === null) return false;
      L = L.__proto__;
    }
  }
}
// add
{
  function add(a, b) {
    if (a === 0) return b;
    if (b === 0) return a;
    let A = a ^ b;
    let B = (a & b) << 1;
    return add(A, B);
  }
}
// treeDepth
{
  function treeDepth(root) {
    if (!root) return 0;
    return Math.max(treeDepth(root.left), treeDepth(root.right)) + 1;
  }
}
