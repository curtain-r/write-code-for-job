{
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let midValue = arr.splice(Math.floor(arr.length / 2), 1);
    let left = [],
      right = [];
    arr.forEach((value) => {
      value < midValue ? left.push(value) : right.push(value);
    });
    return quickSort(left).concat(midValue, quickSort(right));
  }
  const test = [2, 4, 1, 43, 1, 4, 1, 2, 34, 5, 235, 2, 5125, 12, 5, 4, 5, 4];
  console.log(quickSort(test));
}
{
  Function.prototype.mycall = function () {
    let arr = Array.from(arguments);
    let context = arr.shift();
    context.fn = this;
    let result = context.fn(...arr);
    delete context.fn;
    return result;
  };
  Function.prototype.myapply = function () {
    let arr = Array.from(arguments);
    let context = arr[0];
    let args = arr[1];
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
  };
  Function.prototype.mybind = function () {
    let arr = Array.from(arguments);
    let context = arr.shift();
    let self = this;
    return function () {
      let args = Array.from(arguments).concat(arr);
      return self.call(context, ...args);
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
}
{
  function debounce(fn, delay) {
    return function (e) {
      if (fn.timer) clearTimeout(fn.timer);
      fn.timer = setTimeout(() => {
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
  div.onmousemove = debounce(fn, 1000);
  // div.onmousemove = throttle(fn, 1000);
}
{
  function ajax(method, url) {
    let xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject("Microsoft XMLHTTP");
    xhr.open(method, url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("ok");
      }
    };
  }
  ajax("get", "/");
}
{
  function deepClone(target) {
    if (typeof target !== "object" || target == null) return target;
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      result[key] = deepClone(target[key]);
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
}
{
  const React = {
    reactElement(type, props) {
      let element = { type, props };
      return element;
    },
    createElement(type, config = {}, children) {
      let props = {};
      for (let key in config) {
        props[key] = config[key];
      }
      let childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        props.children = Array.from(arguments).slice(2);
      }
      return this.reactElement(type, props);
    },
  };
  const ReactDOM = {
    render(element, parentNode) {
      if (typeof element === "number" || typeof element === "string") {
        parentNode.appendChild(document.createTextNode(element));
        return;
      }
      let type = element.type,
        props = element.props;
      if (type.isReactComponent) {
        let ele = new type(props).render;
        type = ele.type;
        props = ele.props;
      } else if (typeof type === "function") {
        let ele = type(props);
        type = ele.type;
        props = ele.props;
      }
      let domElement = document.createElement(type);
      for (let key in props) {
        if (key === "className") {
          domElement.className = props[key];
        } else if (key === "style") {
          let styleObj = props[key];
          for (let attr in styleObj) {
            domElement.style[attr] = styleObj[attr];
          }
        } else if (key === "children") {
          let children = Array.isArray(props[key]) ? props[key] : [props[key]];
          children.forEach((child) => this.render(child, domElement));
        } else {
          domElement.setAttribute(key, props[key]);
        }
      }
      parentNode.appendChild(domElement);
    },
  };
  let div = document.getElementById("test");
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
}
{
  function myNew(target, ...args) {
    let obj = {};
    obj.__proto__ = target.prototype;
    target.call(obj, ...args);
    return obj;
  }
  function People(name) {
    this.name = name;
  }
  People.prototype.say = function () {
    console.log(this.name);
  };
  let sanguine = myNew(People, "sanguine");
  sanguine.say();
}
{
  Promise.all = (promises) => {
    let promisesCount = 0;
    let promisesLength = promises.length;
    let result = [];
    return new Promise((resolve, reject) => {
      for (let item of promises) {
        Promise.resolve(item).then(
          (res) => {
            promisesCount++;
            result.push(res);
            if (promisesCount === promisesLength) {
              return resolve(result);
            }
          },
          (reason) => {
            return reject(reason);
          }
        );
      }
    });
  };
  let a = 11;
  let promise1 = new Promise((resolve, reject) => {
    if (a > 5) {
      resolve(a);
    } else {
      reject(a);
    }
  });
  let promise2 = new Promise((resolve, reject) => {
    if (a > 10) {
      resolve(a);
    } else {
      reject(a);
    }
  });
  Promise.all([promise1, promise2])
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.error(e));
}
{
  function _instanceof(L, R) {
    let target = R.prototype;
    L = L.__proto__;
    while (true) {
      if (L === target) return true;
      if (L === null) return false;
      L = L.__proto__;
    }
  }
  let a = {};
  console.log(_instanceof(a, Array));
}
{
  function add(a, b) {
    if (a === 0) return b;
    if (b === 0) return a;
    let A = a ^ b;
    let B = (a & b) << 1;
    return add(A, B);
  }
  console.log(add(10, 20));
}
