const http = require('http');	// 用来创建http服务
const url = require('url'); 	// 用来解析URL中的callback

const app = http.createServer((req, res) => {
    const data = {
        x : 10
    }
    res.statusCode = 200;		// 状态码
    // res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");	// * 允许所有
    res.end(JSON.stringify(data))
});
app.listen(3000, () => {
    console.log('server run at port 3000');
})