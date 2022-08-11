// 以下均为示例
const getData = (data) => {
  const { req, res, query } = data;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('hello getData');
  res.end();
};

// method必须导出，批量处理数据时，才能知道该文件导出的方法是用来处理什么请求类型
exports.method = 'get';

// 导出名称不带请求标识
exports.data = getData;