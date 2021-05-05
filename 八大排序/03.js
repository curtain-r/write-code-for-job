function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// 冒泡排序
let arr = [1, 3, 2, 5, 3, 5, 2, 1, 3, 4, 1];
function bubbleSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      arr[j] > arr[j + 1] && swap(j + 1, j, arr);
    }
  }
  return arr;
}
// console.log(bubbleSort(arr));
// 选择排序
function choiceSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      arr[j] < arr[i] && swap(j, i, arr);
    }
  }
  return arr;
}
// console.log(choiceSort(arr));
// 插入排序
function insertSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 1, len = arr.length; i < len; i++) {
    for (let j = i; j >= 0; j--) {
      arr[j] < arr[j - 1] && swap(j, j - 1, arr);
    }
  }
  return arr;
}

// console.log(insertSort(arr));
// 归并排序
function mergeSort(arr) {
  if (arr.length > 1) {
    let mid = Math.floor(arr.length / 2);
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
// console.log(mergeSort(arr));

// 快速排序
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let left = [],
    right = [];
  let value = arr.splice(Math.floor(arr.length / 2), 1);
  arr.forEach((v) => {
    v < value ? left.push(v) : right.push(v);
  });
  return quickSort(left).concat(value, quickSort(right));
}

console.log(quickSort(arr));
