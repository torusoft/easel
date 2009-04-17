$(document).ready(function() {
  // Ampersands
  // http://patrickhaney.com/thinktank/2008/08/19/automatic-awesompersands
  $(document).ready(function() {
    $(":header:contains('&')")
    .contents()
    .each(
      function() {
        if( this.nodeType == 3 ) {
          $(this)
          .replaceWith( this
            .nodeValue
            .replace( /&/g, "<span class='amp'>&</span>" )
          );
        }
      }
    );
  });
});
