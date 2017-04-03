var EntryWrap = require('./');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: "./input",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    externals: {
        jquery: "jQuery"
    },
    plugins: [
        new EntryWrap('require(["jquery"], function (jQuery) {', '})')
    ]
};
