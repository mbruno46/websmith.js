const marked = require("marked");
const fm = require("front-matter");
const fs = require('fs');
const path = require('path');

var renderer = new marked.Renderer();

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

function parse_md(mdfile) {
  const data = fs.readFileSync(mdfile, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = mdfile;
  return content;
};

exports.parse_md = parse_md;
