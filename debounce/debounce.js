// let btn = document.getElementById('debounce');
// let th = document.getElementById('throttle');

// th.onmousemove = throttle(b,1000);
// btn.onmousemove = debounce(a, 2000);
// // function() {
// //   console.log('1');
// // }
// function a() {
//   console.log('111');
// }
// function b() {
//   console.log('222');
// }

// function debounce(fn, delay) {
//   return function() {
//     if (fn.time) clearTimeout(fn.time);
//     fn.time = setTimeout(() => {
//       fn();
//       delete fn.time;
//     }, delay);
//   }
// };

// function throttle(fn, timer) {
//   let a = 0;
//   return function() {
//     let current = Date.now();
//     if (current - a > timer) {
//       fn();
//       a = current;
//     }
//   }
// }

let debounce = document.getElementById('debounce');
let throttle = document.getElementById('throttle');
function test(event) {
  console.log('111', event, this)
}
function testDebounce (fn, delay) {
  return function(event) {
    if (fn.timer) clearTimeout(fn.timer);
    fn.timer = setTimeout(()=> {
      fn.call(this,event);
      delete fn.timer;
    },delay)
  }
}
debounce.onmousemove = testDebounce(test, 1000);
function testThrottle(fn, delay) {
  let x = 0;
  return function(event) {
    let current = Date.now();
    if (current - x > delay) {
      fn.call(this,event);
      x = current;
    }
  }
}
throttle.onmousemove = testThrottle(test, 1000)