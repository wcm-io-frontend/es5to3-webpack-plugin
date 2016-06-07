var path = require("path");
var ES5to3OutputPlugin = require("../index");

module.exports = {
  context: path.resolve(__dirname),

  entry: "./source.js",

  output: {
    path: "./test",
    filename: "result.js"
  },

  plugins: [
    new ES5to3OutputPlugin()
  ]
};