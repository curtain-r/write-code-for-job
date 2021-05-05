function render(element, parentNode) {
  // 如果是字符串或者数字的话直接添加就好
  if (typeof element == "string" || typeof element == "number") {
    parentNode.appendChild(document.createTextNode(element));
  }
  // 将传入的element中的type和props接收了
  let type = element.type,
    props = element.props;

  // class也是函数，所以在React.Component中有一个静态属性 static isReactComponent ： true;
  // 判断是不是类组件
  if (type.isReactComponent) {
    // 实例化一个类，并render一下就可以得到返回值(React element);
    let returnedElement = new type(props).render;
    // 给type和props重新赋值
    type = returnedElement.type;
    props = returnedElement.props;
  } else if (typeof type == "function") {
    // 函数组件，，执行一次函数就可以得到返回值(React Element);
    let returnedElement = type(props);
    // 给type和props重新赋值
    type = returnedElement.type;
    props = returnedElement.props;
  }
  // 根据现有的 type 创建出要渲染的DOM
  let domElement = document.createElement(type);

  // 遍历props，给该元素挂在属性和节点,需要注意的是特殊值 className, style, children
  for (let propName in props) {
    if (propName == "className") {
      // 如果是className(这里是因为class是React的一个关键字)
      domElement.className = props[propName];
    } else if (propName == "style") {
      // 样式的话就是一个对象，需要遍历对象设置样式
      let styleObj = props[propName];
      for (let attr in styleObj) {
        domElement.style[attr] = styleObj[attr];
      }
    } else if (propName == "children") {
      // 这里可能有多个值，也可能有一个值，也可能没有，所以不管有没有值，我都用数组存放
      let children = Array.isArray(props.children)
        ? prop.children
        : [props.children];
      // 遍历children数组，将他们按照render规则，render到当前元素就好，这里是一个递归
      children.forEach((child) => render(child, domElement));
    } else {
      // 其余常规属性，只需要用setAttribute设置就OK
      domElement.setAttribute(propName, props[propName]);
    }
  }
  // 最后将 需要渲染的 domElement return 出去就好
  return domElement;
}

function render(element, parentNode) {
  if (typeof element === "string" || typeof element === "number") {
    parentNode.appendChild(document.createTextNode(element));
  }
  let type = element.type,
    props = element.props;
  if (type.isReactComponent) {
    let returnedElement = new type(props).render;
    type = returnedElement.type;
    props = returnedElement.props;
  } else if (typeof type === "function") {
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
      let children = Array.isArray(props.children)
        ? props.children
        : [props.children];
      children.forEach((child) => render(child, domElement));
    } else {
      domElement.setAttribute(propName, props[propName]);
    }
  }
  return domElement;
}

// 将render函数导出
export default { render };
