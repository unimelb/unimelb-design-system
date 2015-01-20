---
title: How to Contribute
hidden: true
---

A core philosophy behind web.unimelb is that it is open for suggested modification by anyone in the university community.

You can contribute by creating a 'fork' of <a href="https://github.com/marcom-unimelb/unimelb-design-system">this project</a>, applying your modifications and then sending a 'pull request' back to the main repository.

All changes are reviewed by the Web Marketing team before being accepted into the master branch.

There is also an <a href="https://github.com/marcom-unimelb/unimelb-design-system/issues">issue tracker</a> available if you want to suggest changes or report bugs without providing code.

**Please note:** The ability to fork the templates repository does theoretically enable you to create your own set of bespoke templates and use these to power your site. _This is not permitted outside of development_. It is not acceptable to fork the repository, modify code and use this instead of the centrally hosted assets. Doing so contravenes policy, trademark and copyright obligations and will be policed. The reason this has to be strictly enforced is that there are elements of the templates that are centrally managed. If you go rogue, we will not be able to maintain a consistent web presence.


<!-- ## Getting a copy of the code

### 1. Sign up for github

[GitHub](https://github.com/) is a social coding platform that enables multiple people to contribute to the same set of code at the same time. [Signing up for an account is free](https://github.com/join).

### 2. Create a fork

While signed into your GitHub account, visit the template repository and create a new 'fork' to your personal account.

![](/assets/videos/forking.gif)

### 3. Clone your fork

Create a clone of your fork to your local machine so you can apply your changes. We recommend using [GitHub for Mac](http://mac.github.com) or [GitHub for Windows](http://windows.github.com/).

![](/assets/videos/cloning.gif)

### 4. Push the changes to your repository

//TODO Neil to finish
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.


### 5. Open a pull request to accept your changes

// TODO Neil to finish
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.

### Related resources

* [A github guide to forking projects](https://guides.github.com/overviews/forking/) -->


<!-- ## Running a local development server

Once you've forked the templates repository, if you are making changes to code or examples you may need to set up a local copy of the templates to make sure they work properly. If you're just modifying documentation, you probably don't need to worry about this step (it's also pretty complicated).

- Prerequisite set up steps (bundler )
- Mac / Windows instructions

NEIL TO ADD.
 -->

## Making changes to template documentation

The web templates and their associated documentation are built into the same GitHub repository. This is an intentional design decision as it ensures creators explain how to use the code, and not just add it without this explanation.

The documentation is stored in three file formats - Markdown (.md), Slim (.slim), and sometimes HTML. Occasionally, a .md file may also contain HTML or Slim within it in order to enable a more custom presentation of the information being discussed, but more on this later.

<!-- ### Understanding the structure of the templates

JASON TO ADD -->

### Adding pages to the templates or documentation

Occasionally you may need to add pages to the documentation. This is especially the case if you're adding a new blog post.

#### Posts and pages (blog posts and standard pages - ie. not in the <code>/templates</code> directory)

To add a new page, simply create it in the folder that you would like it to appear. The URL of this new page will be similar to it's location in the file structure.

For example:

A **page** created at `/pages/build/[page-name.md]` will have the url `http://.../build/[page-name.md]`.

#### Component documentation (pages inside the <code>/templates</code> directory)

Component and page template documentation and examples are stored in a very specific way in order to allow for the auto-generation of documentation and production code from the same place.

![Screenshot of components directory](/assets/images/component-listing.png)

Files inside each of the components are specifically named and the naming conventions must be preserved if you look to add additional components.

Each component has, at a minimum, a file named `00-overview.md` and an SCSS file with the same name. SCSS files are precompiled into compressed CSS for use in production.

If the component requires javascript, as is the case with the "Maps" component, it will also have a .coffee file. Coffee files are precompiled into javascript for use in production.

Most components then have one or more example files sequentially numbered. Example files can either be written in Markdown (`.md`) or Slim (`.slim`) and must be sequentially numbered. eg. `01-example.md` comes before `01a-example.slim` comes before `02-example.md`. The file extension must be either a `.md` or `.slim` to be added into the page.

Any pages that you add the component directory will be assembled together into the component page. For example the buttons component is created by combining the files listed above in order. The example pages are also styled and made functional by the SCSS and JS in the folder (as well as all other folders).

![Folder structure](/assets/images/component-assembly-folder-structure.png)
[![Compiled page showing relationship](/assets/images/component-assembly-annotated-thumb.jpg)](/assets/images/component-assembly-annotated.jpg)
[![Compiled page](/assets/images/component-assembly-thumb.jpg)](/assets/images/component-assembly.jpg)

To add additional examples either add additionally sequentially numbered example files or create a new component by creating a new folder and starting it with, at minimum a `00-overview.md` file.

##### Related links

* [SASS-Lang documentation website](http://sass-lang.com)

### File types used

#### Markdown

Markdown is the primary language we have used to write the template documentation.

Created by John Gruber in order to facilitate easy writing and easy reading of HTML without the cruft added by HTML syntax. This makes it easier for people who are not web developers.

As the majority of this site is about explaining how to build great websites in general, and not all about code, we wanted to make it as easy as possible for people from a wide range of backgrounds to write markdown without having a complicated text editor (you can just use the web editor)

Markdown is compatible with HTML, however raw HTML-based pull requests will not be accepted unless these are for the purpose of showing code examples.

##### Related links

* [A Github guide to Markdown](https://guides.github.com/overviews/mastering-markdown/)
* [HowToMarkdown: A simple guide to the markdown syntax](http://howtomarkdown.com/)

#### Slim

Slim ([http://slim-lang.com](http://slim-lang.com))is a templating engine that makes it faster to write HTML code. In particular, by being fastidious about the way that indentation is used, it means HTML can be written without closing tags. This makes it easier to avoid situations where you have to hunt around for missing closing divs or tags.

If you get to a page with the .slim extension, we suggest [reading the documentation pages](http://rdoc.info/gems/slim) before starting to change that page.

Slim is backwards compatible with HTML, however raw HTML-based pull requests will not be accepted unless these are for the purpose of showing code examples.

###### Related links

* [The Slim language documentation website](http://slim-lang.com/)
