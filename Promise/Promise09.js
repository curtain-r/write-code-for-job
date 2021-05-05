const add = function(x) {
  return function (y) {
    return x + y;
  }
}

const add1 = add(1);
console.log(add1);
console.log(add1(2));
console.log(add1(2))