// From Modernizr
module.exports = function hasLocalStorage() {
  var uom = 'uom';
  try {
      localStorage.setItem(uom, uom);
      localStorage.removeItem(uom);
      return true;
  } catch(e) {
      return false;
  }
};
