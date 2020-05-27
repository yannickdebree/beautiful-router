# Beautiful Router

A fast and dynamic router for Server-Side-Rendering applications.

## How it works ?

Beautiful Router will send a GET request from all links present the HTML page. Then it will storage the response in cache. So when the website viewer clicked on a link, the associated content will be injected in the view faster than the server's response waiting.

## How to use it ?

Using Beautiful Router involves than all of your pages have the same structure (header, navbar, main, footer,...), so it's advised to use a template manager like Twig to organize your partials.

- First of all import script in your HTML.

```html
<html>
  ...
  <body>
    ...
    <script src="./dist/beautiful-router.min.js"></script>
  </body>
</html>
```

- Then insert your movable content into a tagged div element.

```html
<html>
  ...
  <body>
    <div id="root">
      <!-- Your website's content will be automatically injected here. -->
    </div>
    <script src="./dist/beautiful-router.min.js"></script>
  </body>
</html>
```

- Finally call Beautiful Router class and enjoy your new router !

```html
<html>
  ...
  <body>
    <div id="root">
      <!-- Your website's content will be automatically injected here. -->
    </div>
    <script src="./dist/beautiful-router.min.js"></script>
    <script>
      new BeautifulRouter("#root");
    </script>
  </body>
</html>
```
