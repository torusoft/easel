/**
* cycle
* requires lib/jquery.cycle.js and lib/jquery.cyclewrap.js
*/
$(document).ready(function() {
  var $gallery = $('div.case-gallery');
  $gallery
    .append(FM.html.prevNext)
    .find('div.slides').cycle({
      fx: 'scrollHorz',
      next: $gallery.find('a.next'),
      prev: $gallery.find('a.prev')
  });
  
});
