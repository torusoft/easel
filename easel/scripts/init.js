var FM = FM || {};

(function(docel) {

  // html class for js-only styling (done with Modernizr)

  // utility function to merge obects.
  FM.extend = function() {
    var args = Array.prototype.slice.call( arguments ),
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

})(document.documentElement);

/** =Set up some default values
************************************************************/
FM.extend({
  timeStamp: +new Date(),
  current: (function() {
    var d = new Date();
    var c = '';
    var dateMethods = [ 'getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds' ];
    var tmp;
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
  devsite: !(/\.(?:com|org|net|biz|co\.\w{2,4})$/).test(location.hostname),
  pathname: function(address) {
    return '/' + address.pathname.replace(/^\//,'');
  },
  paths: {
    min: '/tools/min/index.php?g=',
    script: '/assets/scripts/',
    lib: '/assets/scripts/lib/',
    img: '/assets/styles/images/',
    swf: '/assets/styles/swf/'
  },
  html: {
    prevNext: '<a href="#" class="prev">Previous</a><a href="#" class="next">Next</a>'
  }
});

/**
 **  site-specific (header/footer): STRINGS or ARRAYS
 **  section/page scripts (from body class): STRINGS or ARRAYS
 ** scripts are executed in the following order (provided they exist, of course):
    1. scripts[sitename].header
    2. scripts[sitename][bodyClassNames]
    3. scripts[sitename].footer
************************************************************/
// uncomment next line to bust some cache, yo.
if (location.search.indexOf('bust') !== -1) {
  FM.bustCache = FM.timeStamp;
}
FM.scripts = {

  prepend: [
    FM.paths.min + 'jq',
    FM.paths.min + 'box-and-cycle',
    FM.paths.min + 'js'
  ],
  append: [
    // FM.paths.lib + 'jquery.fancybox.js',
    // FM.paths.script + 'fancyboxes.js',
    // FM.paths.lib + 'fm.showloading.js'
  ],

  'p-work': [
    FM.paths.min + 'filters'
  ],
  'p-people': [
    FM.paths.min + 'filters'
  ]
  
};


/** =build the script queue for LABjs
************************************************************/
(function(scripts, q, arrayPush) {
  
  if ( typeof $LAB == 'undefined' ) {
    return;
  }
  
  var scr,
      $L = $LAB,
      bust = FM.bustCache,
      doQueue = function(item) {
        if (!item ) {
          $L = $L.wait();

        } else if ( typeof item == 'function' ) {
          $L = $L.wait(item);

        } else {
          $L = $L.script(item);
        }
      };

  $L.setGlobalDefaults({
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

})(FM.scripts, FM.scriptQueue, Array.prototype.push);

