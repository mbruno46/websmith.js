const fs = require('fs');
const path = require('path');

var config;


function mkdir(dirname) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
    console.log(`Directory ${dirname} created`);
  }
  else {
    console.log(`Directory ${dirname} already exists`);
  }
}


function init_config(conf_file) {
  config = JSON.parse(fs.readFileSync(conf_file));
  config.dir = path.resolve(path.dirname(conf_file));
  if (!('build' in config)) {
    config.build = './public';
  }
  config.build_dir = path.resolve(path.join(config.dir, config.build));
  mkdir(config.build_dir);

  if (!('static' in config)) {
    config.static = './_static';
  }
  config.static_src = path.resolve(path.join(config.dir, config.static));
  config.static_dst = path.join(config.build_dir, config.static);
  mkdir(config.static_dst);

  config.css.forEach(f => {
    fs.copyFile(path.join(config.static_src, f), path.join(config.static_dst, f), (err) => {
      if (err) throw err;
      console.log(`${f} copied`);
    });
  });

  return config;
}

function get_config() {return config;}

exports.init_config = init_config;
exports.get_config = get_config;
