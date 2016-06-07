es3ify-webpack-plugin
====================

A [Webpack][] plugin that transforms ES5 JavaScript output to ES3 by using ES3ify.

[webpack]: https://webpack.github.io/

Usage
-----

In `webpack.config.js`:

```javascript
module.exports = {
    ...
    plugins: [
        new OutputEs3ify()
    ]
};
```


Installation
------------

```bash
npm install es3ify-webpack-plugin
```

