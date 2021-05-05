// quickSort
{
  function quickSort (arr) {
    if (arr.length < 2) return arr;
    let value = arr.splice(arr.length >> 1, 1);
    let left = [], right = [];
    arr.forEach( v => {
      v < value ? left.push(v) : right.push(v);
    });
    return quickSort(left).concat(value, quickSort(right));
  }
  let a = [2,4,1,2,4,6,7,8,5,3,5,7,5,3];
  console.log(quickSort(a));
}
// mergeSort
{
  function mergeSort (arr) {
    if (arr.length > 1) {
      let mid = arr.lengt >> 1;
      let left = mergeSort(arr.slice(0, mid));
      let right = mergeSort(arr.slice(mid));
      arr = merge(left, right);
    }
    return arr;
  }
  function merge(left, right) {
    let i = 0, j = 0, result = [];
    while(i < left.length && j < right.length) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
  }
  let a = [2,4,1,2,4,6,7,8,5,0,3,5,7,5,3];
  console.log(quickSort(a));
}
// call apply bind
{
  Function.prototype._call = function() {
    let arr = Array.from(arguments);
    let context = arr.shift();
    context.fn = this;
    let result = context.fn(...arr);
    delete context.fn;
    return result;
  }
}
// deepClone
{
  function deepClone (target) {
    return JSON.parse(JSON.stringify(target))
  }
  function deepClone2 (target) {
    if (typeof target !== 'object' || target == null) return target;
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone2(target[key]);
      }
    }
    return result;
  }
  let a = { a: [1, 2, 3, { a: 1 }] };
  console.log(deepClone(a));
  console.log(deepClone2(a));
}
// new
{
  function _new(target, ...args) {
    let result = {};
    result.__proto__ = target.prototype;
    target.call(result, ...args);
    return result;
  }
  function People(name) {
    this.name = name;
  }
  People.prototype.say = function () {
    console.log(this.name);
  };
  let sanguine = _new(People, "sanguine");
  sanguine.say();
}
// ajax
{
  let xhr;
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
  else xhr = new ActiveXObject("Microsoft XMLHTTP");

  xhr.open('GET', '', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200){
      console.log('ajax ok');
    }
  }
}
// promise.all
Promise.all = promises => {
  let result = [];
  let promisesCount = [];
  let promisesLength = promises.length;
  return new Promise((resolve, reject) => {
    for (let item of promises) {
      Promise.resolve(item).then(
        res => {
          promisesCount++;
          result.push(res);
          if (promisesCount === promisesLength) {
            return resolve(result);
          }
        }, err => reject(err)
      )
    }
  })
}