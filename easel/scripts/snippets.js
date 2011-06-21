/** =CODE SNIPPETS
*
* if pasting snippets into a project,
*   make sure they are in $(document).ready()
*   or an IIFE -- e.g.
*     (function($) {
*       // code goes here
*     })(jQuery);
************************************************************/


/** =convert youtube links to fancyboxes
* requires jquery.fancybox.js and jquery.fancybox.css
************************************************************/

// links to YouTube videos
var $ytLinks = $('a[href*="youtube.com"]');
if ($ytLinks.length) {
  var $ytWrapper = $('<div class="ytwrapper"></div>').appendTo('body'),
      ytIframes = '';


  $ytLinks.each(function(index) {
    var qsPart, qsParts,
        $link = $(this),
        id = getYoutubeId(this);

    if (id) {
      ytIframes += '<iframe id="' + id + '" width="560" height="349" src="http://www.youtube.com/embed/' + id + '?wmode=transparent" frameborder="0"></iframe>';
      $link
      .addClass('yt-link')
      .attr('href', '#' + id)
      .fancybox({width: 560, height: 349});;
    }
    if ( $link.find('img').length ) {
      $link.prepend('<span class="play-icn"></span>');
    }
  });
  $ytWrapper.append(ytIframes);

}


function getYoutubeId(link) {
  var id = link.hash && link.hash.split('/').pop();
  if (id) {
    return id;
  }
  var qsPart,
      qsParts = link.search && link.search.slice(1).split(/&(?:amp;)?/);

  if (!qsParts.length) {
    return '';
  }
  for (var i = 0; i < qsParts.length; i++) {
    qsPart = qsParts[i].split('=');
    if (qsPart[0] == 'v') {
      id = qsPart[1];
      break;
    }
  }
  return id || '';
}

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
