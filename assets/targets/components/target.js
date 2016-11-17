// Require the base JS, basically our entry point for JS
// If your target doesn't require JavaScript you can comment this out
require("./index.js");

// Require all images by default
// This will inspect all subdirectories from the context (first param) and
// require files matching the regex.
require.context("..", true, /^\.\/.*\.(jpe?g|png|gif|svg)$/);
