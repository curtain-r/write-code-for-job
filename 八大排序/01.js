let arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];

// 冒泡
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log("bubble: ", bubbleSort(arr));
arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
// 选择
function choiceSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
console.log("choice: ", choiceSort(arr));
arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
// 插入
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }
  return arr;
}
console.log("insert: ", insertSort(arr));
arr = [1, 3, 2, 5, 3, 5, 2, 1, 3, 4, 1];
// 归并
function mergeSort(arr) {
  if (arr.length > 1) {
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid)),
      right = mergeSort(arr.slice(mid));
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
console.log(mergeSort(arr));

arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
// 快速
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let left = [],
    right = [];
  let midValue = arr.splice(Math.floor(arr.length / 2), 1);
  arr.forEach((value) => {
    value > midValue ? right.push(value) : left.push(value);
  });
  return quickSort(left).concat(midValue, quickSort(right));
}
console.log(quickSort(arr));
