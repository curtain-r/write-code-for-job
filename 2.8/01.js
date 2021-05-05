// 防抖
{
  function debounce(fn, wait) {
    return function() {
      if (fn.timer) clearTimeout(fn.timer);
      fn.timer = setTimeout(()=> {
        fn.call(this);
        delete fn.timer;
      }, wait)
    }
  }
}
// 节流
{
  function throttle(fn, wait) {
    let pre = 0;
    return function() {
      let current = Date.now();
      if (current - pre > wait) {
        fn.call(this);
        pre = current;
      }
    }
  }
}
// call apply bind
{
  Function.prototype.myCall = function() {
    let args = [...arguments];
    let context = args.shift();
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
  }
  Function.prototype.myApply = function() {
    let args = [...argument];
    let context = args[0] || window;
    context.fn = this;
    let result = context.fn(args[1]);
    delete context.fn;
    return result;
  }
  Function.prototype.myBind = function() {
    let args = [...arguments];
    let context = args.shift();
    let self = this;
    return function() {
      let all = [...args, ...arguments];
      self.apply(context, all);
    }
  }
}
// deepClone
{
  function deepClone(target) {
    if (typeof target !== 'object' || target == null) return target;
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key]);
      }
    }
    return result;
  }
  function clone(target) {
    return JSON.parse(JSON.stringify(target));
  }
  const a = {
    name: "sanguine",
    age: 20,
    arr: [1, 2, 3, 4, 5, { a: 1, arr: [22] }],
  };
  let cloneA = deepClone(a);
  console.log(cloneA,clone(a));
}
// new 
{
  function _new(target, ...args) {
    let obj = {};
    obj.__proto__ = target.prototype;
    target.call(obj, ...args);
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
      if (L == null) return false;
      L = L.__proto__;
    }
  }
}
// promise.all
{
  Promise.all = promises => {
    let result = [],count = 0, length = promises.length;
    return new Promise((resolve, reject) => {
      for (let item of promises) {
        Promise.resolve(item).then( res => {
          count++;
          result.push(res);
          if (count === length) {
            return resolve(result)
          }
        }, err => {
          return reject(err);
        })
      }
    })
  }
}
// 最大最小子串
{
  function demo(arr) {
    let max = -2147483647, min = 2147483647, sum = 0;
    for (let i=0;i<arr.length;i++) {
      sum += arr[i];
      max = Math.max(max, sum);
      min = Math.min(min, sum);
      // if (sum < 0) sum = 0;
      if (sum > 0) sum = 0;
    }
    return [max, min]
  }
  console.log(demo([1,2,3,4,5,6,-5,-10,-2,-4,88,1]))
}