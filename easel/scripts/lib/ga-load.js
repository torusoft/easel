/** =FOR STEELCASE SITES ONLY: set up addthis configuration
************************************************************/
var addthis_config = {
  ui_use_css: false,
  username: 'steelcasestore',
  data_track_clickback: true,
  // ui_cobrand: 'Steelcase Store',
  services_compact: 'print,email,favorites,facebook,twitter,myspace,google,digg,live,delicious'
};
/***********************************************************/

// global _gaq array
var _gaq = [
  ['_setAccount', FM.siteId],
  // add site-specific parameters here.
  ['_setDomainName', 'none'],
  ['_setAllowLinker', true],
  ['_setAllowHash', false],
  ['_trackPageview']
];

if (FM.searchWords) {
  _gaq.pop();
  _gaq.push(['_trackEvent', 'Search', FM.searchWords, FM.searchResults]);

} else {
  // this is needed for addThis tracking:
  var pageTracker = {};

  _gaq.push(function() {
     pageTracker = _gat._getTracker(FM.siteId);
     addthis_config.data_ga_tracker = pageTracker;
  });

}

(function(d, t, a) {

  if (!FM.siteId || FM.siteId == 'XXXXXX') {
    FM.log('Google Analytics account not set.');
    return;
  }

  var g = d.createElement(t),
  s = d.getElementsByTagName(t)[0];
  g[a] = a;
  g.src = 'http://www.google-analytics.com/ga.js';
  s.parentNode.insertBefore(g, s);

})(document, 'script', 'async');

