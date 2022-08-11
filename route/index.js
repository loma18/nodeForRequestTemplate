const path = require('path')
const fs = require('fs')

const getPathInfo = p => path.parse(p)

/**
 * @description // 递归读取文件
 * @param {String} directory 文件目录
 * @param {Boolean} recurveChild 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 *
 */
function getDirectoryData(directory, recurveChild = false, extList = ['.js']) {
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, recurveChild, extList) {
    const files = fs.readdirSync(directory)
    files.forEach(item => {
      if (item.indexOf('index.js') > -1) {
        return;
      }
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory() && recurveChild) {
        readFileList(path.join(directory, item), recurveChild, extList)
      } else {
        const info = getPathInfo(fullPath)
        extList.includes(info.ext) && filesList.push(fullPath)
      }
    })
  }
  readFileList(directory, recurveChild, extList)

  return filesList.map(item => require(item))
}

const fileDatas = getDirectoryData(path.join(__dirname));
const data = {};
fileDatas.forEach(fileData => {
  Object.keys(fileData).map(key => {
    if (key === 'method') {
      return;
    }
    const method = fileData.method;
    if (!data[method]) {
      data[method] = {};
    }
    if (data[method][`/${key}`]) {
      throw new Error(`存在相同请求类型:${method} 的方法名: ${key} 键值冲突, 请修改后重试`);
    }
    data[method][`/${key}`] = fileData[key];
  });
});

module.exports = data;