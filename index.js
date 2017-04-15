var ConcatSource = require('webpack-sources/lib/ConcatSource');
var ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

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

    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
            chunks.forEach(function(chunk) {
                if(!chunk.isInitial()) return;
                chunk.files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options)).forEach(function(file) {
                    compilation.assets[file] = new ConcatSource(before, '\n', compilation.assets[file], '\n', after);
                });
            });
            callback();
        });
    });
};
