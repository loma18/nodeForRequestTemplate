const multiparty = require('multiparty');

const transferData = (data) => {
  const { req, res } = data;
  let postStr = '';
  req.on('data', (chunk) => {
    postStr += chunk;
  });
  req.on('end', (chunk) => {
    try {
      let reqData = JSON.parse(postStr);
      console.log(reqData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(reqData));
      res.end();
    } catch (e) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(`解析数据错误，请检查入参。${e}`);
    }
  });
};

// 以下均为示例
const postData = (data) => {
  const { req, res, query } = data;
  let postStr = '';

  // 对于form-data类型，需要特殊处理
  if (req.headers['content-type'].match(/multipart\/form-data/)) {
    const form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write(JSON.stringify({ fields, files }));
      res.end();
    });
    return;
  }

  req.on('data', (chunk) => {
    postStr += chunk;
  });
  req.on('end', (chunk) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify({ body: postStr, query }));
    res.end();
  });
};

// method必须导出，批量处理数据时，才能知道该文件导出的方法是用来处理什么请求类型
exports.method = 'post';

// 导出名称不带请求标识
exports.transferData = transferData;
exports.data = postData;