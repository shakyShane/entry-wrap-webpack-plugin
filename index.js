var ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");

var ConcatSource;
try {
  ConcatSource = require('webpack/lib/ConcatSource');
} catch (e) {
  ConcatSource = require('webpack-sources').ConcatSource;
}

function EntryWrap(before, after, options) {
    this.options = options || {};
    this.before = before;
    this.after = after;
}
module.exports = EntryWrap;

EntryWrap.prototype.apply = function(compiler) {
    var options = this.options;
    var before = this.before;
    var after = this.after;

    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
            chunks.forEach(function(chunk) {
                if(!chunk.initial) return;
                chunk.files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options)).forEach(function(file) {
                    compilation.assets[file] = new ConcatSource(before, "\n", compilation.assets[file], '\n', after);
                });
            });
            callback();
        });
    });
};
