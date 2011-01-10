var FM = FM || {};
(function(win, cons, doc, docel) {

  
  /** =console logging
  ************************************************************/
  var defaults = {
    // debug is a global switch to turn console logging on (set to true) or off (set to false).
    // if you want to force logging in a browser that doesn't support it by appending a div to the <body>
    // set debug to 'force' (requires jQuery 1.4+)
    debug: true,
    console: {
      // devsite is currently set to disallow console logging when the TLD is one of the following:
      // .com, .org, .net, .biz, .co.xx(xx)
      // if you don't want to use this feature, you can simply set devsite to true
      devsite: FM.devsite || !(/\.(?:com|org|net|biz|co\.\w{2,4})$/).test(location.hostname),
      types: ['info', 'dir', 'log', 'error','warn']
    }
  };

  // override defaults with props set "globally" on the FM object.
  if (FM.extend) {
    FM.extend(defaults, FM);  
  } else {
    FM.debug = defaults.debug;
    FM.console = defaults.console;
  }

/** =Utility function for logging.
** Only works when FM.debug is true or "force" and when you are on dev site
************************************************************/
  for (i=0, ctl = FM.console.types.length; i<ctl; i++) {
    (function(ct) {  
      var ctype = ct[i];
      FM[ctype] = function() {

        if ( !FM.debug || !FM.console.devsite || !arguments.length) { return; }
         ct = !cons ? 'logalt' : cons[ ctype ] && ctype || 'log';
        var args = Array.prototype.slice.call( arguments );

        if (ctype == 'logalt' && FM.debug === 'force') {

          // this is basically a poor man's output console for IE6, so going with IE's window width
          var wwidth = docel.clientWidth;

          var fml = doc.getElementById('FM-log'),
              fmlogdiv = doc.createElement('div'),
              fmlogmsg = doc.createTextNode( args.join(' ') ),
              b = doc.getElementsByTagName('body')[0];

          if ( !fml ) {
            fml = doc.createElement('div');
            fml.setAttribute('id', 'FM-log');
            fml.style.width =  (wwidth-20)+'px';
            fml.style.position = 'absolute';
            fml.style.left = '0px';
            fml.style.bottom = '0px';
            fml.style.padding = '10px';
            fml.style.backgroundColor = '#ffffcc';
            docel.insertBefore(fml, b);

            var btn = doc.createElement('button'),
                span = doc.createElement('span'),
                spanTxt = doc.createTextNode('close');

            btn.className = 'btn';
            btn.onclick = function() {

              var attrs = ['style', 'id', 'className', 'onclick'];
              for (var i=0, il = attrs.length; i < il; i++) {
                if (attrs[i] in fml ) {
                  delete fml[attrs[i]];
                }
              }
              docel.removeChild(fml);
              fml = null;
            };

            fml.appendChild(btn);
            btn.appendChild(span);
            span.appendChild(spanTxt);
          }
          fmlogdiv.appendChild(fmlogmsg);
          fml.appendChild(fmlogdiv);
        } else if ( cons[ctype].apply ) {
            cons[ctype].apply(cons, args);

        } else  {
          cons[ctype](args.join(' '));
        }
      };
    })(FM.console.types);
  }
})(window, window.console, document, document.documentElement);