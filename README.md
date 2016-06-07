# es5to3-webpack-plugin

A [Webpack][] plugin that transforms ES5 JavaScript output to ES3.
This plugin supports also source maps and handles source map transformation if needed.

[webpack]: https://webpack.github.io/


## Installation
```bash
npm install es5to3-webpack-plugin
```


## Usage
In `webpack.config.js`:

```javascript

var ES5to3OutputPlugin = require("es5to3-webpack-plugin");
module.exports = {

    // enable source map generation, if necessary
    devtool: "source-map",

    ...
    plugins: [
        new ES5to3OutputPlugin()
    ]
};
```

## Options

### options.test
Regular expression that will be used to filter the files within the output stream.
Default: defines the file filter, default: /\.js$/i

(Hint: Only JavaScript can be transformed.)