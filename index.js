var es3ify = require("es3ify");
var jstransform = require("jstransform");
var RawSource = require("webpack-sources").RawSource;
var SourceMapSource = require("webpack-sources").SourceMapSource;

/**
 * Plugin to be used in the `plugins` section in webpack configuration.
 * @param {object} options - settings for this plugin
 * @constructor
 */
function ES5to3OutputPlugin(options) {
  this.options = options || {};
}

/**
 * Will be called automatically by webpack to register the plugin.
 * @param {Compiler} compiler - webpack compiler located in webpack/lib/Compiler
 */
ES5to3OutputPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var generateSourceMap = compiler.options.devtool;

  // handle JS files only
  options.test = options.test || /\.js$/i;
  if (typeof options.test === "string") {
    options.test = new RegExp("^" + options.test.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
  }

  compiler.plugin("compilation", function(compilation) {

    compilation.plugin("optimize-chunk-assets", function(chunks, callback) {

      var files = [];

      // collect all files
      chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file) {
          files.push(file);
        });
      });
      compilation.additionalChunkAssets.forEach(function(file) {
        files.push(file);
      });

      // filter JS files
      files = files.filter(function(elem) {
        return options.test.test(elem);
      });

      // transform each JS file
      files.forEach(function(file) {

        var asset = compilation.assets[file];
        var source;
        var inputSourceMap;
        var sourceMap;
        var result;
        var transformOptions = {};

        // check if asset was transformed before (and cached)
        if (asset.__es5to3) {
          compilation.assets[file] = asset.__es5to3;
          return;
        }

        if(generateSourceMap !== false) {
          if(asset.sourceAndMap) {
            var sourceAndMap = asset.sourceAndMap();
            inputSourceMap = sourceAndMap.map;
            source = sourceAndMap.source;
          } else {
            inputSourceMap = asset.map();
            source = asset.source();
          }

          transformOptions.sourceMap = true;
          transformOptions.filename = file;
        } else {
          source = asset.source();
        }

        // transform source code
        result = jstransform.transform(es3ify.visitorList, source, transformOptions);

        // convert generated source map result
        if (result.sourceMap) {
          sourceMap = result.sourceMap.toJSON();
          sourceMap.sources = [file]; // override due to wrong result from jstransform
          sourceMap.sourcesContent = [source];
          result.sourceMap = sourceMap;
        }

        asset.__es5to3 = compilation.assets[file] = result.sourceMap ?
          new SourceMapSource(result.code, file, result.sourceMap, source, inputSourceMap) :
          new RawSource(result.code);
      });

      callback();
    });
  });
};

module.exports = ES5to3OutputPlugin;
