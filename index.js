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
  views: path.join(config.dir, "views")
})

// Eta assumes the .eta extension if you don't specify an extension
// You could also write renderFile("template.eta"), renderFile(path.join(__dirname, "views/template.eta"),
// renderFile("/template"), etc.

function add_css() {
  var out = ''
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
  config.navbar.forEach(item => {
    let page = item;

    out += eta.render(`<li class="nav-item"><a class="nav-link ${(current==item[1] ? 'active' : '')}" href="<%= it.link %>"><%= it.name %></a></li>`,
      {name: item[0], link: item[1]}) + '\n';
  });
  return out;
}


config.pages.forEach(page => {
  let outname = md2html(page);
  var data = parse_md(path.join(config.dir, page));

  let html = eta.render(
    `<% layout('./layout') %>

    <div class="row">
      <%~ it.body %>
    </div>`, {head: add_css(), body: data.body, navbar: {
      brand: config.name, items: navbar_items(outname)
    }});

  fs.writeFile(path.join(config.build_dir,outname), html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
