# Get started

To get started with `websmith.js` you need two files

 * `config.json`: configuration file used to generate the various webapges
 * `index.md`: a Markdown file with the content of your home page

The configuration file tells the library what the basic structure of the website
is going to look like.

```javascript
{
  "name": "My awesome website",
  "build": "./public",
  "theme": "./themes/superhero",
  "pages": [
    {
      "file": "index.md",
      "layout": "home",
      "navbar": "Home"
    },
    {
      "file": "page.md",
      "navbar": "More"
    }
  ],
  "footer": "Copyright © 2021 Author. Or anything else."
}
```

In the example above, the program will try to locate two files, `index.md` and
`page.md` that will serve as Markdown source files for two separate webpages.
The fields `file` should contain a path relative to the location of the configuration
file. For example, if a source file is located inside a directory called `./src/`,
while the configuration file is at `./config.json`, then

```javascript
  ...
  "pages": [
    ...
    {
      "file": "src/page.md"
    }
  ],
```

The option `navbar` tells the software to add this page to the navigation bar. If
not present such page will not be accessible from the navigation bar and the user
will have to provide the necessary link in one of the other pages.

The option `layout` specifies which page layout should be used. For example,
all themes have a special layout for the home page, called `home`. If not specified
the basic layout is automatically chosen.

The file `index.md` is divided in two parts: a front-matter header and a Markdown
text, like so

```Markdown
---
title: TITLE
desc: A catch phrase
logo: _images/logo.png
---

# Section title

Section text goes here.
```

The first three fields, `title`, `desc` and `logo`, are used in the home page of every theme
and define a catching title and description for the website, together with a logo.
Note that the description is sometimes rendered with a different font.
While `title` and `desc` are mandatory, `logo` is optional.
