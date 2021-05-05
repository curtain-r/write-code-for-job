// quickSort(arr)
{
  function quickSort(arr) {
    if (arr.length < 2) return arr;
    let value = arr.splice(arr.length >> 1);
    let right = [],
      left = [];
    arr.forEach((v) => {
      v < value ? left.push(v) : right.push[v];
    });
    return quickSort(left).concat(value, quickSort(right));
  }
}
// mergeSort(arr)
{
  function mergeSort(arr) {
    if (arr.length > 1) {
      let mid = arr.length >> 1;
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
}
// call apply bind
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
    let context = arr[0] || window;
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
      let args = arr.concat(Array.from(arguments));
      return self.call(context, ...args);
    };
  };
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
}
// ajax
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
// deepClone
{
  function deepClone(target) {
    if (typeof target !== "object" || target == null) return target;
    let result = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key]);
      }
    }
    return result;
  }
  function deepClone2(target) {
    return JSON.parse(JSON.stringify(target));
  }
}
// React
{
  const React = {
    reactElement(type, props) {
      let element = { type, props };
      return element;
    },
    createElement(type, config = {}, children) {
      let props = [];
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
      for (let key in props) {
        if (key === "className") {
          domElement.className = props[key];
        } else if (key === "style") {
          for (let attr in props[key]) {
            domElement.style[attr] = props[key][attr];
          }
        } else if (key === "children") {
          children = Array.isArray(props[key]) ? props[key] : [props[key]];
          children.forEach((child) => this.render(child, domElement));
        } else {
          domElement.setAttribute(key, props[key]);
        }
      }
      parentNode.appendChild(domElement);
    },
  };
}
// new
{
  function myNew(target, ...args) {
    let obj = {};
    obj.__proto__ = target.prototype;
    target.call(target, ...args);
    return obj;
  }
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
}
// add
{
  function add(a, b) {
    if (a === 0) return b;
    if (b === 0) return a;
    let A = a ^ b;
    let B = (a & b) << 1;
    return add(A, B);
  }
}
// treeDepth
{
  function treeDepth(root) {
    if (!root) return 0;
    return Math.max(treeDepth(root.left), treeDepth(root.right)) + 1;
  }
}
// binaryTreeTraversal
{
  function binaryTreeTraversal(root) {
    if (root) {
      console.log(root);
      binaryTreeTraversal(root.left);
      binaryTreeTraversal(root.right);
    }
  }
}
// theLargestSubarray
{
  function theLargestSubarray(arr) {
    let max = -2147483647;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      max = Math.max(max, sum);
      if (sum < 0) sum = 0;
    }
    return max;
  }
}
