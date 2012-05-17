/** =CODE SNIPPETS
*
* if pasting snippets into a project,
*   make sure they are in $(document).ready()
*   or an IIFE -- e.g.
*     (function($) {
*       // code goes here
*     })(jQuery);
* BUT, you don't need to create a new ready/iife just for the snippet
************************************************************/

/** =cachedAjax plugin
* Requires utils.js ( for FM.serialize() )
************************************************************/
$.cachedAjax = function( url, opts ) {
  if ( $.isPlainObject( url) ) {
    opts = url;
    url = opts.url || location.pathname;
  }
  opts = opts || {};

  var nsCache = $.cachedAjax.caches[ url ] || {};
  var thisRequest = 'request';

  // if the request has data, we need to set cache key to url[data]
  if (opts.data) {
    thisRequest = $.isPlainObject(opts.data) ? FM.serialize(opts.data) : opts.data;
  }

  if ( !nsCache[ thisRequest ] ) {
    nsCache[ thisRequest ] = $.ajax( url, opts );
  }

  // reset the global cache
  $.cachedAjax.caches[ url ] = nsCache;

  return nsCache[ thisRequest ];
};
$.cachedAjax.caches = {};
//~~~~~~~~~^^ cachedAjax plugin ^^~~~~~~~~~~~//



// set text selection plugin
$.fn.setSelection = function (startPos, endPos) {
  startPos = startPos || 0;
  var elem = this[0],
      val = $(elem).val(),
      chars = val.split('');

  if (typeof endPos == 'undefined') {
    endPos = chars.length;
  }

  if('selectionStart' in elem) {
      elem.focus();
      elem.selectionStart = startPos;
      elem.selectionEnd = endPos;
  }
  //IE
  else if (document.selection) {
    elem.focus();
    var tr = elem.createTextRange();

    //Fix IE from counting the newline characters as two seperate characters
    var startChars = chars.slice(0, startPos),
        endChars = chars.slice(startPos, endPos-startPos);


    $.each(startChars, function(i, chr) {
      if (chr == "\r" && chars[i+1] == "\n") {
        startPos -= 1;
      }
    });
    $.each(endChars, function(i, chr) {
      if (chr == "\r" && chars[i+1] == "\n") {
        endPos -= 1;
      }
    });

    tr.moveEnd('textedit', -1);
    tr.moveStart('character',startPos);
    tr.moveEnd('character', endPos - startPos);
    tr.select();
  }

  return this;
};
