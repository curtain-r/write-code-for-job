// function quickSort(arr) {
//   if (arr.length <= 1) return arr;
//   // 寻找基准值的索引
//   let index = Math.floor(arr.length/2);
//   // 寻找基准值
//   let value = arr.splice(index, 1)[0];
//   let right = [];
//   let left = [];
//   for (let i=0; i<arr.length; i++) {
//     if (arr[i] > value) {
//       right.push(arr[i]);
//     } else {
//       left.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat([value], quickSort(right));
// }

// function quickSort(arr) {
//   if (arr.length <= 1) return arr;
//   let index = Math.floor(arr.length/2);
//   let value = arr.splice(index, 1);
//   let right = [];
//   let left = [];
//   for (let i=0;i<arr.length; i++) {
//     if (arr[i] > value) right.push(arr[i]);
//     else left.push(arr[i]);
//   }
//   return quickSort(left).concat(value, quickSort(right));
// }

// function quickSort1 (arr) {
//   if (arr.length<=1) return arr;
//   let index = Math.floor(arr.length/2);
//   let right =[], left = [];
//   let value = arr.splice(index,1);
//   for (let i=0; i<arr.length; i++) {
//     arr[i] > value ? right.push(arr[i]) : left.push(arr[i]);
//   }
//   return quickSort1(left).concat(value, quickSort1(right));
// }
// function quickSort2(arr) {
//   if (arr.length <= 1) return arr;
//   let index = Math.floor(arr.length / 2);
//   let value = arr.splice(index, 1);
//   let right = [],
//     left = [];
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] < value ? left.push(arr[i]) : right.push(arr[i]);
//   }
//   return quickSort2(left).concat(value, quickSort2(right));
// }

// console.log(
//   quickSort2([1, 2, 2, 1, 4, 5, 32, 52, 4, 64, 2, 5, 2, 546, 4, 6, 24, 6, 2, 6])
// );

// for (var i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1);
// }

// for (let i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1);
// }
