var FM = FM || {};

(function(window, arrProto) {
  var docEl = document.documentElement,
      htmlClass = docEl.className;

  if ( htmlClass.indexOf('no-js') !== -1 ) {
    docEl.className = htmlClass.replace(/no-js/, 'js');
  } else if ( (' ' + htmlClass + ' ').indexOf(' js ') === -1 ) {
    docEl.className += ' js';
  }

  /** =utility function to merge objects
  ************************************************************/

  FM.extend = function() {
    var args = arrProto.slice.call( arguments ),
        al = args.length,
        firstArg = al === 1 ? FM : args.shift();

    while (--al > -1) {
      var arg = args[al];
      if (typeof arg  == 'object') {
        for (var prop in arg) {
          firstArg[ prop ] = arg[ prop ];
        }
      }
    }

    return firstArg;
  };

  /** =Namespace variables to be exposed to other files/functions
  ************************************************************/
  FM.extend({
    touch: !!document.createTouch,
    mobileFxOff: true,
    timeStamp: +new Date(),
    devsite: !(/\.(?:com|org|net|biz|co\.\w{2,4})$/).test(window.location.hostname),
    pathname: function(address) {
      address = address || window.location;
      return '/' + address.pathname.replace(/^\//,'');
    },
    html: {
      prevNext: '<div class="prev-next"><a href="#" class="prev">Previous</a><a href="#" class="next">Next</a></div>'
    },
    paths: {
      min: '/tools/min/index.php?g=',
      script: '/assets/scripts/',
      lib: '/assets/scripts/lib/',
      img: '/assets/styles/images/',
      swf: '/assets/styles/swf/'
      }
  });

})(window, Array.prototype);

