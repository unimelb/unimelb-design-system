/**
 * SidebarTabs
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function SidebarTabs(el, props) {
  this.el = el;
  this.props = props;
  this.props.tabs = this.el.querySelectorAll('nav a');
  this.props.panels = [];

  // this.activateContainer();

  // // Event bindings
  // if (this.el.hasAttribute('data-tabbed')) {
  //   this.setupPanels();
  //   this.selectPanel();
  // }
}

SidebarTabs.prototype.setupPanels = function() {
};

module.exports = SidebarTabs;

// unless window.UOMSidebarTabs
//   window.UOMSidebarTabs = ->
//     class SidebarTabs
//       constructor: (@el, @selector) ->
//         @nav = @el.querySelectorAll('a')
//         @current = 0
//         t = this

//         for item in @nav
//           item.addEventListener 'click', (e) ->
//             e.preventDefault()

//             for rec, i in t.nav
//               if rec == this
//                 t.hide()
//                 t.current = i
//                 t.show()

//         if window.location.hash
//           for rec, i in @nav
//             if rec.getAttribute('href')==window.location.hash
//               @hide()
//               @current = i
//               @show()

//               # TODO move the outer tab (edge)

//       hide: ->
//         root = document
//         if document.countSelector('.tab') > 1
//           root = document.querySelector('.tab[data-current]')

//         @pages = root.querySelectorAll(@selector)

//         p.removeClass('current') for p in @nav
//         p.removeClass('current') for p in @pages

//       show: ->
//         for rec, i in @nav
//           if i==@current
//             target = document.querySelector(rec.getAttribute('href'))
//             if target
//               rec.addClass('current')
//               target.addClass('current')
