/**
 * CreateNameSpace
 *
 * @param  {Object} props
 */
function CreateNameSpace() {
  var bodyclass;
  if (/(MSIE 9.0)/g.test(navigator.userAgent))
    bodyclass = 'ie ie9';
  else if (/(MSIE 10.0)/g.test(navigator.userAgent))
    bodyclass = 'ie10';
  else if (/(Trident\/7.0)/g.test(navigator.userAgent))
    bodyclass = 'ie11';

  if (bodyclass) {
    document.body.classList.add.apply(document.body.classList, bodyclass.split(' '));
  }

  // Create page wrapper if it doesn't already exist
  var parent = document.querySelector('.uomcontent');
  if (!parent) {
    parent = document.createElement('div');
    parent.className = 'uomcontent';
    document.body.appendChild(parent);
  }

  parent.id = 'top';

  var page = document.querySelector('.page-inner');
  if (!page) {
    page = document.createElement('div');
    page.className = 'page-inner';

    for (var nodes=document.body.childNodes, i=nodes.length - 1; i >= 0; i--) {
      if (nodes[i] && nodes[i] != parent) {
        var move = document.body.removeChild(nodes[i]);
        page.appendChild(move);
      }
    }

    parent.appendChild(page);
  }
}

module.exports = CreateNameSpace;
