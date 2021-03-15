const marked = require("marked");
const fm = require("front-matter");
const fs = require('fs');
const path = require('path');

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function(code, language) {
  //   const hljs = require("highlight.js");
  //   const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
  //   return hljs.highlight(validLanguage, code).value;
  // },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

function parse_md(mdfile) {
  const data = fs.readFileSync(mdfile, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = mdfile;
  return content;
};

exports.parse_md = parse_md;
