// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let index = Math.floor(arr.length / 2);
  let value = arr.splice(index, 1);
  let right = [],
    left = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] < value ? left.push(arr[i]) : right.push(arr[i]);
  }
  return quickSort(left).concat(value, quickSort(right));
}
const arr = [1, 3, 2, 4, 3, 2, 3, 2, 3, 4, 5, 2];
console.log(quickSort(arr));

// call apply bing
Function.prototype.mycall = function () {
  let args = Array.prototype.slice.call(arguments);
  let context = args.shift();
  // context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.myapply = function () {
  let args = Array.prototype.slice.call(arguments);
  let context = args[0];
  // context = context || window;
  context.fn = this;
  let result = context.fn(...args[1]);
  delete context.fn;
  return result;
};
Function.prototype.mybind = function () {
  let args = Array.prototype.slice.call(arguments);
  let context = args.shift();
  // context = context || window;
  let self = this;
  return function () {
    let newargs = Array.prototype.slice.call(arguments);
    return self.call(context, ...args, ...newargs);
  };
};
let context = {
  name: "sanguine",
  age: 20,
};
function test(a, b) {
  console.log(this);
  return a + b;
}
console.log(test.mycall(context, 3, 5));
console.log(test.myapply(context, [5, 67]));
console.log(test.mybind(context, 5, 5)());

// 防抖节流
function debounce(fn, delay) {
  return function (e) {
    if (fn.timer) clearTimeout(fn.timer);
    fn.timer = setTimeout((e) => {
      fn.call(this, e);
      delete fn.timer;
    }, delay);
  };
}
function throttle(fn, delay) {
  let pre = 0;
  return function (e) {
    let current = Date.now();
    if (current - pre > delay) {
      fn.call(this, e);
      pre = current;
    }
  };
}
let div = document.getElementById("test");
let count = 0;
function fn() {
  console.log("a");
}
// div.onmousemove = debounce(fn, 1000);
div.onmousemove = throttle(fn, 1000);
// ajax
let xhr;
if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
else xhr = new ActiveXObject("Microsoft XMLHTTP");

xhr.open("GET", "", true);
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // console.log(xhr.responseText);
  }
};

// deepClone
function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) return obj;
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
const a = {
  name: "sanguine",
  age: 20,
  arr: [1, 2, 3, 4, 5, { a: 1, arr: [22] }],
};
let cloneA = deepClone(a);
console.log("a: ", a, "cloneA: ", cloneA);

// React
const React = {
  ReactElement(type, props) {
    const element = { type, props };
    return element;
  },
  createElement(type, config = {}, children) {
    let propName;
    let props = {};
    for (propName in config) {
      props[propName] = config[propName];
    }
    const childrenLength = arguments.length - 2;
    if (childrenLength == 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      props.children = Array.from(arguments).slice(2);
    }
    return this.ReactElement(type, props);
  },
};

// ReactDOM
const ReactDOM = {
  render(element, parentNode) {
    if (typeof element == "string" || typeof element == "number") {
      parentNode.appendChild(document.createTextNode(element));
      return;
    }

    let type = element.type,
      props = element.props;
    if (type.isReactComponent) {
      let returnedElement = new type(props).render;
      type = returnedElement.type;
      props = returnedElement.props;
    } else if (typeof type == "function") {
      let returnedElement = type(props);
      type = returnedElement.type;
      props = returnedElement.props;
    }
    let domElement = document.createElement(type);
    for (let propName in props) {
      if (propName == "className") {
        domElement.className = props[propName];
      } else if (propName == "style") {
        let styleObj = props[propName];
        for (let attr in styleObj) {
          domElement.style[attr] = styleObj[attr];
        }
      } else if (propName == "children") {
        let children = Array.isArray(props[propName])
          ? props[propName]
          : [props[propName]];
        children.forEach((child) => this.render(child, domElement));
      } else {
        domElement.setAttribute(propName, props[propName]);
      }
      parentNode.appendChild(domElement);
    }
  },
};

ReactDOM.render(
  React.createElement(
    "h1",
    {
      className: "title",

      style: {
        color: "yellow",
        width: "100px",
        height: "100px",
        backgroundColor: "red",
      },
    },
    "happy"
  ),
  div
);

// new
function People(name) {
  this.name = name;
}
People.prototype.say = function () {
  console.log(this.name);
};

function myNew(target, ...args) {
  let obj = {};
  obj.__proto__ = target.prototype;
  target.call(obj, ...args);
  return obj;
}

let sanguine = myNew(People, "sanguine");
sanguine.say();

// promise.all
Promise.all = (promises) => {
  let result = [];
  let promisesCount = 0;
  let promisesLength = promises.length;
  return new Promise((resolve, reject) => {
    for (let item of promise) {
      Promise.resolve(item).then(
        (res) => {
          promisesCount++;
          result.push(res);
          if (promisesCount === promisesLength) {
            return resolve(result);
          }
        },
        (err) => {
          return reject(err);
        }
      );
    }
  });
};
