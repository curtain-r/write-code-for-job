const http = require('http');
const host = '127.0.0.1';
const port = 3000;

let server = http.createServer((req, res) => {
  // 用 HTTP 状态码和内容类型（Content-Type）设置 HTTP 响应头
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // 发送响应体
  res.end('Hello World\n');
})

server.listen(host, port, () => {
  console.log(`${host}:${port}`)
})