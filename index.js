var eta = require("eta")
var path = require("path")
const {init_config} = require("./src/config.js");
const {parse_md} = require("./src/markdown.js");
const fs = require('fs');

config = init_config(process.argv[2]);

// Set Eta's configuration
eta.configure({
  // This tells Eta to look for templates
  // In the /views directory
  views: path.resolve(config.theme)
})

// Eta assumes the .eta extension if you don't specify an extension
// You could also write renderFile("template.eta"), renderFile(path.join(__dirname, "views/template.eta"),
// renderFile("/template"), etc.

function add_css() {
  var out = '';
  config.css.forEach(file => {
    let html = eta.render(`<link rel="stylesheet" href="<%= it.css %>">`,{css: path.join(config.static,file)});
    out += html + '\n';
  });
  return out;
}

function md2html(fname) {return path.basename(fname,'.md') + '.html';}

function navbar_items(current) {
  var out = ''
  navbar = [];
  config.pages.forEach(item => {
    if ('navbar' in item) {
      out += eta.render(`<li class="nav-item"><a class="nav-link ${(current==item.html ? 'active' : '')}" href="<%= it.link %>"><%= it.name %></a></li>`,
        {name: item.navbar, link: item.html}) + '\n';
    }
  });
  return out;
}


config.pages.forEach(page => {
  var data = parse_md(path.join(config.dir, page.md));

  var opts = {name: config.name, head: add_css(), body: data.body,
    navbar: {items: navbar_items(page.html)}, footer: config.footer};

  Object.keys(data.attributes).forEach(key => {
    opts[key] = data.attributes[key];
  });

  let html = eta.render(`<% layout('${page.layout}') %> \n<%~ it.body %>`, opts);

  html = html.replace('<table>','<table class="table table-hover">')
  fs.writeFile(path.join(config.build_dir,page.html), html, (err) => {
    if (err) throw err;
    console.log(`The page ${page.html} has been generated and saved`);
  });
});
