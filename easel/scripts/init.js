var FM = FM || {};

(function(window, q, arrProto) {

  // variables to be used within this init function

  var bust, scr, doQueue,
      min = '/tools/min/index.php?g=',
      script = '/assets/scripts/',
      lib = '/assets/scripts/lib/',
      img = '/assets/styles/images/',
      swf = '/assets/styles/swf/',
      timeStamp = +new Date();

  /** SCRIPT LOADING
   ** scripts can be functions, strings, or arrays. Usually arrays
   ** scripts are executed in the following order (provided they exist, of course):
      1. scripts[sitename].prepend
      2. scripts[sitename][bodyClassNames]
      3. scripts[sitename].append
  ************************************************************/

  var scripts = {
    prepend: [

    ],
    append: [

    ],
    'p-case-detail': [
      lib + 'jquery.masonry.min.js'
    ]
  };

  /** =build the script queue for LABjs
  ************************************************************/

  if (window.location.search.indexOf('bust') !== -1) {
    bust = timeStamp;
  }

  if (window.$LAB) {
    doQueue = function(item) {

      if (!item ) {
        $LAB = $LAB.wait();

      } else if ( typeof item == 'function' ) {
        $LAB = $LAB.wait(item);

      } else {
        $LAB = $LAB.script(item);
      }
    };

    $LAB.setGlobalDefaults({
      AlwaysPreserveOrder: true,
      AllowDuplicates: false
    });

    // FM.bodyClass always includes 'prepend' at index 0 and 'append' at length-1
    for ( var i=0, bc = FM.bodyClass, bcl = FM.bodyClass.length; i < bcl; i++ ) {
      scr = scripts[ bc[i] ];
      if (scr) {
        if (bust && typeof scr !== 'string') {
          for ( var b=0, bl = scr.length; b < bl; b++) {
            scr[b] += (scr[b].indexOf('?') === -1 ? '?' : '&') + bust;
          }
        }
        doQueue(scr);
      }
    }

    // other scripts that may have been added to FM.scriptQueue
    // these could be one-off functions or a path to some 3rd-party script
    if (q && q.length) {
      for ( var j = 0, ql = q.length; j < ql; j++ ) {
        doQueue( q[j] );
      }
    }
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
    timeStamp: timeStamp,
    current: (function() {
      var tmp,
          c = '',
          d = new Date(),
          dateMethods = [ 'getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds' ];

      for (var i=0, il = dateMethods.length; i < il; i++) {
        tmp = d[ dateMethods[i] ]();
        if (dateMethods[i] === 'getMonth') {
          tmp +=1;
        }
        tmp = '' + tmp;
        tmp = tmp.length === 1 ? '0' + tmp : tmp;
        c += tmp;
      }

      return c;
    })(),
    devsite: !(/\.(?:com|org|net|biz|co\.\w{2,4})$/).test(window.location.hostname),
    pathname: function(address) {
      return '/' + address.pathname.replace(/^\//,'');
    },
    html: {
      prevNext: '<div class="prev-next"><a href="#" class="prev">Previous</a><a href="#" class="next">Next</a></div>'
    },
    paths: {
      min: min,
      script: script,
      lib: lib,
      img: img,
      swf: swf
    },
    scripts: scripts
  });

})(this, FM.scriptQueue, Array.prototype);

