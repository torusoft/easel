
(function(win, doc) {

var h = doc.getElementsByTagName('head')[0],
    m = Math;

// turn off jQuery animations on touch devices unless FM.fxOff == false
if (FM.touch && typeof jQuery != 'undefined') {
  jQuery.fx.off = mobileFxOff;
}

// a few utility functions
FM.extend({

  //=determine whether item "el" is in array "arr"
  inArray: function(el, arr) {
    for (var i = arr.length - 1; i >= 0; i--){
      if (arr[i] === el) {
        return true;
      }
    }
    return false;
  },

  //=add an array of numbers
  add: function(nums) {
    var tally = 0;
    for (var i = nums.length - 1; i >= 0; i--){
      tally += nums[i];
    }

    return tally;
  },

  //=convert an object to a serialized string
  serialize: function(obj) {
    var serial = [];
    for (var el in obj) {
      serial.push( encodeURIComponent(el) + '=' + encodeURIComponent(obj[el]) );
    }
    return serial.join('&');
  },
  //=insert a CSS <link> element in the head.
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
  callMethod: function(obj, meth, args, ctx) {

    // if the object is excluded, we'll assume that FM is the obj.
    // so, we need to shift all the other arguments.
    if (typeof obj == 'string') {
      ctx = args || FM;

      // args needs to be an array, even if we're only passing a single argument
      args = meth || [];
      meth = obj;
      obj = FM;
    } else {
      args = args || [];
      ctx = ctx || FM;
    }

    if (obj[meth]) {
      return obj[meth].apply(ctx, args);
    }
    return false;
  }
});

})(window, window.document);

(function(window) {
  /** =generic addEventListener
      makes for more reliable window.onload.
  ************************************************************/
  var listenerType, prefix = '';

  if (typeof window.addEventListener === 'function') {
    listenerType = 'addEventListener';
  } else if (typeof doc.attachEvent == 'function' || typeof doc.attachEvent == 'object') {
    listenerType = 'attachEvent';
    prefix = 'on';
  }

  FM.addEvent = listenerType ? function(el, type, fn) {
    el[ listenerType ](prefix + type, fn, false);
  } : function() {};

  // call addEvent on window load
  // redefine addEvent to call the function immediately if window is already loaded
  FM.addEvent(window, 'load', function() {
    document.body.className += ' js-loaded';
    FM.windowLoaded = true;

    if (FM.touch && typeof jQuery != 'undefined') {
      jQuery.fx.off = FM.mobileFxOff;
    }

    var _listener = FM.addEvent;

    FM.addEvent = function(el, type, fn) {
      if (el == window && type === 'load') {
        fn();
      } else {
        _listener(el, type, fn);
      }
    };
  });

  // Convert FM to FM() constructor function
  var fm = function() {
    if (!(this instanceof fm)) {
      return new fm();
    }
    return this;
  };

  for (var e in FM) {
    if (typeof FM[e] == 'function') {
      fm.prototype[e] = FM[e];
    }
    fm[e] = FM[e];
  }
  FM = fm;

})(window);