var FM = FM || {};

(function(window) {
  var bust, scr, doQueue,
      q = FM.scriptQueue || [],
      p = FM.paths || {},
      min = p.min,
      script = p.script,
      lib = p.lib,
      img = p.img,
      swf = pswf;
      

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
  

  FM.scripts = scripts;
})(window);