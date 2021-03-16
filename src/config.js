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

  if ('theme_path' in config) {
    config.theme = path.resolve(path.join(config.theme_path, config.theme));    
  }
  else {
    config.theme = path.resolve(path.join(__dirname, '../themes', config.theme));
  }

  if (!('static' in config)) {
    config.static = '_static';
  }
  config.static_src = path.join(config.theme, config.static);
  config.static_dst = path.join(config.build_dir, config.static);
  mkdir(config.static_dst);

  if (!('css' in config)) {
    config.css = []
  }

  fs.readdirSync(config.static_src).forEach(file => {
    let ext = path.extname(file);
    if (ext=='.css') {config.css.push(file);}
    fs.copyFile(path.join(config.static_src, file), path.join(config.static_dst, file), (err) => {
      if (err) throw err;
      console.log(`File ${file} copied to ${config.static}`);
    });
  });

  config.pages.forEach(page => {
    let base = path.basename(page.file,'.md');
    if (!('html' in page)) {
      page.html = base + '.html';
    }
    page.md = base + '.md';
    if (!('layout' in page)) {
      page.layout = 'layout';
    }
  });

  if (!('footer' in config)) {config.footer = '';}

  if (!('images' in config)) {config.images = '_images';}
  let img_src = path.resolve(path.join(config.dir, config.images));
  let img_dst = path.join(config.build_dir, config.images);
  mkdir(img_dst);
  if (fs.existsSync(img_src)) {
    fs.readdirSync(img_src).forEach(file => {
      fs.copyFile(path.join(img_src, file), path.join(img_dst, file), (err) => {
        if (err) throw err;
        console.log(`File ${file} copied to ${img_dst}`);
      });
    });
  }

  return config;
}

function get_config() {return config;}

exports.init_config = init_config;
exports.get_config = get_config;
