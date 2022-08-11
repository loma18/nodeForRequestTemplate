const http = require('http');
const url = require('url');
const router = require('./router');

const server = http.Server();

function start() {
  server.on('request', (req, res) => {
    const urlObj = url.parse(req.url, true);
    const { query, pathname } = urlObj;
    router({ query, pathname, req, res });
  });
  //显示了三次这也证明了TCP的三次握手
  server.on('connection', () => {
    console.log('请求连接');
  });

  server.on('close', () => {
    console.log('请求连接关闭');
  });

  server.listen(8811);
}

// 服务启动
start();
