/*
五步走
1. 创建一个Ajax对象，使用XMLHttpRequest;
2. 绑定监听函数 onreadystatechange;
3. 绑定处理请求的地址，对async参数的选项：true为异步
4. POST提交设置的协议头
5. 发送请求

*/





// Promise封装
let Ajax = function(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get',url,true);
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if(xhr.status === 200 && this.readyState == 4) {
        let json = JSON.parse(xhr.responseText);
        resolve(json);
      } else {
        reject('error');
      }
    }
  })
}

// 1 创建Ajax对象
let xhr;
if (XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {  // for IE5 IE6
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
// 2 设置请求参数,发送请求
xhr.open('GET', url, true);
xhr.send();

xhr.onreadystatechange = function() {
  if(xhr.status == 200 && xhr.readyState === 4) {
    console.log(xhr.responseText);
  } else {
    console.log('error');
  }
}