function add(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  let numA = a ^ b;
  let numB = (a & b) << 1;
  return add(numA, numB);
}
console.log(add(10, 15));
