---
title: Build process
---

# Templates build process

A number of things happen when we deploy the templates in order to ensure that the @unimelb web presence remains consistent, you are provided with the best possible code that all bugs are fixed in a timely manner.  

For the purpose of transparency, this page documents how the templates are built from their component pieces and deployed to a content distribution network (CDN) for distribution.

## Deploy process

The deploy process for the templates is highly automated. 

1. A deploy script is run by central marketing
2. **Components:** SCSS and Coffee code from the `/components` directories are concatenated and compressed into temporary files (lets call them `components-v-n.css` and `components-v-n.js`). These files are added to the repository in this state, but are not yet ready for production.
3. **Injection:** SCSS and Coffee code from the `/injection` sub-directories is concatenated and compressed into temporary files (lets call them `injection-temp.css` and `injection-temp.js`)
4. `Injection-temp.css` and `components-v-n.css` are merged into `unimelb-v-n.css`. `Injection-temp.js` and `components-v-n.js` are merged into `unimelb-v-n.js`
5. All previous versions of components.css and components.js are retrieved from storage and concatenated with the current `injection-temp.js` to re-create `unimelb-v-1.css`...`unimelb-v-n.css` adn equivalent javascript files. This ensures that the latest injection changes are deployed across all previous versions of the templates and consistency is maintained in global, centrally maintained elements. This produces a new file for each version which updates global elements, but leaves local elements unchanged.
6. All of these files are uploaded to the CDN. Existing files are overwritten. 


* [Related: Learn about template versioning](/templates/versioning)