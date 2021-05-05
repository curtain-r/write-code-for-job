// 防抖debounce， 节流throttle

function debounce(fn, delay) {
  return function(event) {
    // 如果fn自身有timer,有还未执行的操作,就取消之前还没有执行的操作
    if (fn.timer) clearTimeout(fn.timer);
    // 不论如何，事件发生我就需要添加一个处理方法
    fn.timer = setTimeout(() => {
      fn.call(this, event);
      // 如果顺利执行了，那就要删除fn.timer
      delete fn.timer;
    }, delay)
  }
}



function throttle(fn, delay) {
  // 定义一个变量来保存上次执行的事件
  let pre = 0;
  return function(event) {
    // 当前函数需要调用时的具体时间
    let current = Date.now();

    // 当前事件和上一次调用事件是否大于传入的delay
    if (current - pre > delay) {
      fn.call(this, event);
      // 更新上一次调用的事件
      pre = current;
    }
  }
}

function debounce(fn ,delay) {
  return function(event) {
    if (fn.timer) clearTimeout(fn.timer);
    fn.timer = setTimeout(() => {
      fn.call(this, event);
      delete fn.timer;
    }, delay);
  }
}

function throttle(fn, delay) {
  let pre = 0;
  return function(event) {
    let current = Date.now();
    if (current - pre > delay) {
      fn.call(this, event);
      pre = current;
    }
  }
}