// quickSort
{
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let index = Math.floor(arr.length / 2);
    let value = arr.splice(index, 1);
    let left = [],
      right = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] < value ? left.push(arr[i]) : right.push(arr[i]);
    }
    return quickSort(left).concat(value, quickSort(right));
  }
  const test = [2, 4, 1, 43, 1, 4, 1, 2, 34, 5, 235, 2, 5125, 12, 5, 4, 5, 4];
  console.log(quickSort(test));
}

// call apply bind
{
  Function.prototype.mycall = function () {
    let arr = Array.prototype.slice.call(arguments);
    let context = arr.shift() || window;
    context.fn = this;
    let result = context.fn(...arr);
    delete context.fn;
    return result;
  };
  Function.prototype.myapply = function () {
    let arr = Array.from(arguments);
    let context = arr[0] || window;
    let args = arr[1];
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
  };
  Function.prototype.mybind = function () {
    let arr = Array.prototype.slice.call(arguments);
    let context = arr.shift() || window;
    let self = this;
    return function () {
      let args = arr.concat(Array.from(arguments));
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

// debounce throttle
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

// ajax
{
  let xhr;
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
  else xhr = new ActiveXObject("Microsoft XMLHTTP");
  xhr.open("get", "/", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("请求成功");
    }
  };
}

// deepClone
{
  function deepClone(target) {
    if (typeof target !== "object" || target == null) {
      return target;
    }
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key]);
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
}

// React
{
  const React = {
    reactElement(type, props) {
      let element = { type, props };
      return element;
    },
    createElement(type, config = {}, children) {
      let propName;
      let props = {};
      for (propName in config) {
        props[propName] = config[propName];
      }
      let childrenLength = arguments.length - 2;
      if (childrenLength == 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        props.children = Array.from(arguments).slice(2);
      }
      return this.reactElement(type, props);
    },
  };
  const ReactDOM = {
    render(element, parentNode) {
      if (typeof element === "string" || typeof element === "number") {
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
      for (let propName in props) {
        if (propName === "className") {
          domElement.className = props[propName];
        } else if (propName === "style") {
          let styleObj = props[propName];
          for (let attr in styleObj) {
            domElement.style[attr] = styleObj[attr];
          }
        } else if (propName === "children") {
          let children = Array.isArray(props[propName])
            ? props[propName]
            : [props[propName]];
          children.forEach((child) => this.render(child, domElement));
        } else {
          domElement.setAttribute(propName, props[propName]);
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

// new
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

// promise.all
{
  Promise.all = (promises) => {
    let promisesLength = promises.length;
    let promisesCount = 0;
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
          (err) => {
            return reject(err);
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

// instanceof
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
