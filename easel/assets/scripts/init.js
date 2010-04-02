/** =js class for styling
************************************************************/
document.documentElement.className = 'js';

/** =prevent print styles from halting page load
************************************************************/
(function($) {
	$(window).bind('load', function() {
	  $('<link rel="stylesheet" href="/assets/styles/print.css" type="text/css" media="print" />').appendTo('head');
	});
})(jQuery);

/** =constants
************************************************************/
var FM = {
  hash: location.hash,
  scriptDir: '/assets/scripts/',
  imgDir:    '/assets/styles/images/',
  pngSelector: ''
};
