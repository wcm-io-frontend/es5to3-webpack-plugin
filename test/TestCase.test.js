var fs = require("fs");
var webpack = require("webpack");
var should = require("should");

var webpackConfig = require("./webpack.config");

describe("Test output", function() {

  it("should transform ES3 reserved words correctly", function(done) {

    webpack(webpackConfig, function(err, stats) {

      if(err) return done(err);
      if(stats.hasErrors()) return done(new Error(stats.toString()));

      var result = fs.readFileSync(__dirname + "/result.js", "utf-8");
      var expected = fs.readFileSync(__dirname + "/expected.js", "utf-8");

      result.indexOf(expected).should.not.be.false();
      done();
    });
  });
});
