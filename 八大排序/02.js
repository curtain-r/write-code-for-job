let arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
function swap(a, b, arr) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function bubbleSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) swap(j, j + 1, arr);
    }
  }
  return arr;
}
console.log(bubbleSort(arr));

arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let right = [],
    left = [];
  let midValue = arr.splice(Math.floor(arr.length / 2), 1);
  arr.forEach((value) => {
    value < midValue ? left.push(value) : right.push(value);
  });
  return quickSort(left).concat(midValue, quickSort(right));
}
console.log(quickSort(arr));
arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];

function choiceSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) swap(j, i, arr);
    }
  }
  return arr;
}
console.log(choiceSort(arr));

arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
function insertSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j++) {
      if (arr[j] < arr[j - 1]) swap(j, j - 1, arr);
    }
  }
  return arr;
}
console.log(insertSort(arr));

arr = [1, 2, 3, 432, 545, 56, 343, 5, 3, 3, 43];
// function merge(left, right) {
//   let i = 0,
//     j = 0;
//   let result = [];
//   while (i < left.length && j < right.length) {
//     result.push(left[i] < right[j] ? left[i++] : right[j++]);
//   }
//   return result.concat(i < left.length ? left.slice(i) : right(j));
// }
// function mergeSort(arr) {
//   if (arr.length < 2) {
//     return arr;
//   } else {
//     let mid = Math.floor(arr.length / 2);
//     let left = mergeSort(arr.slice(0, mid));
//     let right = mergeSort(arr.slice(mid));
//     arr = merge(left, right);
//   }
//   return arr;
// }
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