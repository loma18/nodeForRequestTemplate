const routes = require('./route');

function router(data) {
  const { pathname, res, req } = data;
  const method = req.method.toLowerCase();
  if (typeof routes[method]?.[pathname] === 'function') {
    console.log("请求: " + pathname);
    routes[method][pathname](data);
  } else {
    console.log("未找到请求: " + pathname);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not found");
  }
}
module.exports = router;