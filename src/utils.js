const fs = require('fs');
var path = require("path")

function mkdir(dirname) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
    console.log(`Directory ${dirname} created`);
  }
  else {
    console.log(`Directory ${dirname} already exists`);
  }
}

function rcopy(src,dst) {
  mkdir(dst);
  
  fs.readdirSync(src).forEach(entry => {
    let temp = path.join(src,entry);
    let temp2 = path.join(dst,entry);

    if (fs.lstatSync(temp).isDirectory()) {
      mkdir(temp2);
      rcopy(temp,temp2);
    }
    else {
      fs.copyFile(temp, temp2, (err) => {
        if (err) throw err;
        console.log(`File ${entry} copied to ${dst}`);
      });
    }
  });
}

function read(file, fmt='') {
  if (fmt=='b') {
    return fs.readFileSync(file);
  }
  return fs.readFileSync(file, "utf8");
}

function write(dst, txt) {
  fs.writeFile(dst, txt, (err) => {
    if (err) throw err;
    console.log(`The file ${dst} has been generated and saved`);
  });
}

function version() {
  let tmp = JSON.parse(read(`${__dirname}/../package.json`,'b'));
  return tmp.version;
}

exports.write = write;
exports.read = read;
exports.mkdir = mkdir;
exports.rcopy = rcopy;
exports.version = version;
