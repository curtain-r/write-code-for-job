const http = require('http');
const url = require('url')

const app = http.createServer( (req, res) => {
  const data = {
    x : 10
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*")
  const callback = url.parse(req.url, true).query.callback
  res.end(`${callback}(${JSON.stringify(data)})`);
});

app.listen(3000,()=>{
  console.log('server run at port 3000')
})