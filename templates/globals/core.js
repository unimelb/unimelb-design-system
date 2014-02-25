(function() {
  if (!Window.prototype.height) {
    Window.prototype.height = function() {
      var h;
      if (window.innerHeight) {
        h = window.innerHeight;
      } else if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetHeight) {
        h = document.documentElement.offsetHeight;
      } else if (document.body && document.body.offsetHeight) {
        h = document.body.offsetHeight;
      } else {
        h = 0;
      }
      return h;
    };
  }

}).call(this);

(function() {
  if (!Element.prototype.hasClass) {
    Element.prototype.hasClass = function(q) {
      var re;
      re = new RegExp(q);
      return re.test(this.className);
    };
  }

  if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(q) {
      var curr;
      curr = this.className + " ";
      if (this.className === null || curr === " ") {
        curr = "";
      }
      if (!this.hasClass(q)) {
        return this.className = curr + q;
      }
    };
  }

  if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function(q) {
      if (this.className === null || this.className === " ") {
        return this.classname = "";
      } else {
        this.className = this.className.replace(q, '');
        if (this.className === " ") {
          return this.className = "";
        }
      }
    };
  }

  if (!Element.prototype.toggleClass) {
    Element.prototype.toggleClass = function(q) {
      if (this.hasClass(q)) {
        return this.removeClass(q);
      } else {
        return this.addClass(q);
      }
    };
  }

}).call(this);
