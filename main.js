var eta = require("eta")
const pretty = require('pretty');
const marked = require("marked");
const utils = require("./src/utils");
var path = require("path")

var renderer = new marked.Renderer();
var config;
var src;
var build;

function highlight(code, language) {
  const hljs = require("highlight.js");
  const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
  return hljs.highlight(validLanguage, code).value;
}
renderer.code = function(code, language) {
  return `<pre><code class="language-${language} hljs">${highlight(code,language)}</code></pre>`
}

marked.setOptions({
  renderer: renderer,
  // highlight: function(code, language) {return highlight(code,language);},
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

function parse_md(mdfile) {return marked(utils.read(mdfile));};

let conf_file = process.argv[2];

config = JSON.parse(utils.read(conf_file,'b'));
src = path.resolve(path.dirname(conf_file));

if (!('build' in config)) {
  config.build = './public';
}
build = path.resolve(path.join(src, config.build));
utils.mkdir(build);

if (!('assets' in config)) {
  config.assets = './assets';
}
utils.rcopy(path.join(src,config.assets),path.join(build,config.assets));

if (!('layouts' in config)) {
  config.layouts = './layouts'
}
eta.configure({views: src + '/' + config.layouts});

config.pages.forEach(page => {
  page.footer = config.footer;
  if (!('title' in page)) {
    page.title = config.title;
  }

  if (page.body.indexOf('.md') > -1) {
    page.body = parse_md(path.join(src,page.body));
  }

  if ('navbar' in config) {page.navbar = config.navbar;}

  let html = eta.render(`<% layout('${page.layout}') %> \n<%~ it.body %>`, page);
  // let html = eta.renderFile(src + '/' + page.layout, page);
  // let html = eta.render(utils.read(src + '/' + page.layout + '.eta'), page)

  let out = path.join(build, page.name)
  utils.write(out, pretty(html));
});
