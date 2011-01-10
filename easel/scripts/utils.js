(function(doc, win) {

var h = doc.getElementsByTagName('head')[0],
    m = Math;

// a couple utility functions

FM.extend({
  inArray: function(el, arr) {
    for (var i = arr.length - 1; i >= 0; i--){
      if (arr[i] === el) {
        return true;
      }
    }
    return false;
  },
  add: function(nums) {
    var tally = FM.basePrice;
    for (var i = nums.length - 1; i >= 0; i--){
      tally += nums[i];
    }

    return tally;
  },

  /** =insert a CSS <link> element in the head.
  ************************************************************/
  addLink: function(params) {

    var opts = FM.extend({
      media: 'screen',
      rel: 'stylesheet',
      type: 'text/css',
      href: ''
    }, params);

    // bail out if the <link> element is already there
    for (var i=0, lnks=h.getElementsByTagName('link'), ll=lnks.length; i < ll; i++ ) {
      if (!opts.href || lnks[i].href.indexOf(opts.href) !== -1) {
        return;
      }
    }
    var lnk = doc.createElement('link');
    for (var prop in opts) {
      lnk[prop] = opts[prop];
    }
    h.appendChild(lnk);

    lnk = null;

  },

  // GRID LIST
  list: function(obj) {
    if ( !(this instanceof FM.list) ) {
      return new FM.list(obj);
    }

    this.view = obj || (FM && FM.listData) || {};

    return this;
  }
});

/* list sorting USAGE:
  1. Instantiate the list with the field name to sort by and the array
      to be sorted:
      var sortPeopleByName = FM.list('fullname', people);

  2. run a sort algorithm on the created object -- .asc() or .desc() or .random():
      var sortedPeople = sortPeopleByName.asc();

  or, you can do steps 1 and 2 in one swell foop:
      var sortedPeople = FM.list('fullname', people).asc();

*/


var sortMethods = {'asc': 1, 'desc': -1, 'random': 'random'},
    randomize = function() {
      return ( m.round( m.random() ) -0.5 ) * 2 ;
    };

FM.list.prototype = {
  sorts: function(dir, orderby) {
    dir = dir || 1;
    // return this;
    var sortKey = orderby, //this.field,
        view = this.view;

    if ( dir === 'random' ) {
      view = view.sort(randomize);

    } else if ( view[0] && view[0][sortKey] ) {

      view = view.sort(function(a, b) {
        return a[sortKey] >= b[sortKey] ? dir : -dir;
      });

    }
    this.view = view;
    return this;
  }
};

for (var meth in sortMethods) {
  (function(dir) {
    FM.list.prototype[meth] = function(orderby) {
      return FM.list.prototype.sorts.call(this, dir, orderby);
    };
  })(sortMethods[meth]);
}

// FILTER (actually just hides)
FM.list.prototype.filter = function(filtered, limit) {

  var hide,
      visCount = 0,
      view = this.view;
  for (var i = 0, l = view.length; i < l; i++) {
    hide = false;
    for (var f in filtered) {
      if ( f === 'year' ) {
        hide = view[i].year_from > filtered.year.max || view[i].year_to < filtered.year.min;
      } else {
        hide = view[i].filters[f][ filtered[f] ] !== 'y';
      }
      if (hide) {
        break;
      }
    }
    
    if (limit) {
      visCount += !hide ? 1 : 0;
      hide = visCount > 2 ? true : hide;
    }

    view[i].hide = hide;
  }

  this.view = view;
  return this;

};

/** =generic addEventListener
    used almost solely as more reliable window.onload
    because of how LABjs loads stuff.
************************************************************/

var listener;

if (typeof win.addEventListener === 'function') {
  listener = function(el, type, fn) {
    el.addEventListener(type, fn, false);
  };
} else if (typeof doc.attachEvent == 'function' || typeof doc.attachEvent == 'object') {

  listener = function(el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
} else {
  el['on' + type] = fn;

}
FM.addEvent = listener;

// call addEvent on window load
// redefine addEvent to call the function immediately if window is already loaded

FM.addEvent(win, 'load', function() {

  FM.windowLoaded = true;
  var _listener = FM.addEvent;

  FM.addEvent = function(el, type, fn) {
    if (el == window && type === 'load') {
      fn();
    } else {
      _listener(el, type, fn);
    }
  };
});

})(document, this);