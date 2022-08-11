let child_process = require('child_process');
let fs = require('fs-extra');
const path = require('path');
let ChildProcess = child_process.fork(path.join(__dirname, './index.js'));

ChildProcess.on('exit', function (code, siganal) {
  console.log(`child_process exits code: ${code}, siganal: ${siganal}`);
  fs.appendFileSync('./log.txt', `${new Date()} 线程退出, code: ${code}, siganal: ${siganal}\n
----------------------------------------------------------------------------------\n\n`);
  if (code !== 0) {
    child_process.fork(path.join(__dirname, './processReboot.js'));
  }

});