const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/preview.js",
    "./js/server.js",
    "./js/gallery.js",
    "./js/filter.js",
    "./js/editing.js",
    "./js/form.js",
    "./js/validation.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
