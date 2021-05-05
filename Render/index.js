function render (element, parentNode) {
  // 字符串或者数字直接添加到父节点里面
  if (typeof element == 'string' || typeof element == 'number'){
    parentNode.appendChild(document.createTextNode(element));
  }
  let type, props;
  type = element.type;
  props = element.props;
  if (type.isReactComponent) {
    let returnElement = new type(props).render();
    type = returnElement.type;
    props = returnElement.props;
  } else if (typeof type == 'function') {
    // 如果是函数执行它一次就可以得到react元素
    let returnElement = type(props);
    type = returnElement.type;
    props = returnElement.props;
  }
  let domElement = document.createElement(type);
  for (let propName in props) {
    if (propName == 'className') {
      domElement.className = props[propName];
    } else if (propName == 'style') {
      let styleObj = props[propName];
      for (let attr in styleObj) {
        domElement.style[attr] = styleObj[attr];
      }
    } else if (propName == 'children') {
      let children = Array.isArray(props.children) ? props.children : [props.children];
      children.forEach(child => render (child, domElement));
    } else {
      domElement.setAttribute(propName, props[propName]);
    }
  }
  parentNode.appendChild(domElement)
}

export default { render };