## EntryWrap webpack plugin [![Build Status](https://travis-ci.org/shakyShane/entry-wrap-webpack-plugin.svg?branch=master)](https://travis-ci.org/shakyShane/entry-wrap-webpack-plugin)

> Wrap your bundle entry points

### Install 

```shell
npm i entry-wrap-webpack-plugin -D
```

### Usage example

Example: You're adding a Webpack bundle to an existing project where jQuery
is being loaded externally by requireJS. You can tell Webpack to NOT bundle
your own version jQuery (as you want to re-use the external version), but then 
you need to wrap your entry point in a `require` call
to ensure jQuery is loaded before your bundle executes. 

That's what this plugin is for.

**`webpack.config.js`**

```shell
var EntryWrap = require('entry-wrap-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: "./input",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    externals: {
		"jquery": "jQuery"
	},
    plugins: [
        new EntryWrap('require(["jquery"], function (jQuery) {', '})',{
            test: /\.js$/
        })
    ]
};
```

**`input.js`**
```js
// jQuery will NOT be included in your bundle
const $ = require('jquery');
```

... Will result in something along the lines of

```js
require(["jquery"], function (jQuery) {
	// ... webpack bundle here
	// that will not run until jQuery is available on the page
})
```
