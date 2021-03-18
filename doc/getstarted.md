# Get started

To get started with `websmith.js` you need one file

 * `config.json`: configuration file used to generate the various webapges

The configuration file tells the library what the basic structure and content
of the website is going to be.

```javascript
{
  "title": "my website",
  "build": "./build",
  "assets": "./themes/superhero/assets",
  "navbar": {
    "name": "My New Website",
    "items": [{
      "link": "index.html",
      "name": "Home"
    }]
  },
  "layouts": "./themes/superhero/layouts",
  "pages": [
    {
      "name": "index.html",
      "desc": "Some catch phrase goes here",
      "body": "The content of the body",
      "layout": "home"
    }
  ],
  "footer": "Copyright © year author."
}
```

In this example above, we can see how `websmith.js` works:

  * `build` specifies the build directory;

  * `title` and `footer` are mandatory; if the title field is not present inside
  one of the pages, the global title is used for every webpage;

 * the assets contain the basic `.css` and `.js` files that define the style of
 the webpage. The user can add images for examples to a subfolder called `img` and
 load them in the Markdown source files; the program will copy the content in the build
 directory;

 * the layouts contain the structure of the webpage, and their content is filled
 via the `body` field, which can be either a string of HTML, or a Markdown file
 such as `index.md`;

 * `navbar` defines the structure of the navigatio bar; each item must contain a
 `link` to a webpage, and a `name` to be displayde forr it;

 * webpages are created following the content of the `pages` field; for each
 entry a name, body and layout must be specified;

 * special layouts, such as `home` may require additional fields; for the home layout
 the user can provide a description and logo;

***

## Custom templates

Custom templates can be easily used by specifying the proper `assets` and `layouts`
directories. They are based on the [ETA](https://eta.js.org) templating engine and
each field defined in the template must be matched by the
corresponding entry in the configure file

```html
  ...
  <div class="page-header">
    <img src="<%= it.logo %>" style="height: 1em;"></h1>
  </div>
  ...
```

```javascript
{
  "pages": [
    ...
    {
      ...
      "logo": "assets/img/logo.png"
    }
  ]
}
```
