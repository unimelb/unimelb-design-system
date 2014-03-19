# Web Templates


## Setting up the development environment

1. `cd` into the cloned repository
2. Run `bundle install`
3. Run `bundle exec thin start`
4. Visit [http://localhost:3000/](http://localhost:3000/)


## Examples use github flavoured markup

[http://github.github.com/github-flavored-markdown/](http://github.github.com/github-flavored-markdown/)

## Writing example code

Each component or template must have:

* A file named 00-summary.md. This file explains the purpose of the piece or global or component
* A file names 01-[example-name].md (eg. 01-google-map.md) This file provides sample markup. It should begin with a H2 (##)
* Subsequent example files should be sequentially numbered (eg. 02,03,04)
* Example imagery shoud be stored in the /public/examples/ folder.
* Assets for inclusion in the templates should be included in the same folder as the [piece name].scss / [piece-name].js.coffee file.
