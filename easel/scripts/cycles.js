/**
* cycle
* requires lib/jquery.cycle.js and lib/jquery.cyclewrap.js
*/
$(document).ready(function() {

  $('div.case-gallery').cycleWrap({
    init: function() {
      $(this).append(FM.html.prevNext);
    },
    fx: 'scrollHorz',
    next: '.next',
    prev: '.prev'
  });

});
