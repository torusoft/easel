/** =set up addthis configuration
************************************************************/
// var addthis_config = {
//   ui_use_css: false,
//   username: 'steelcasestore',
//   data_track_clickback: true,
//   // ui_cobrand: 'Steelcase Store',
//   services_compact: 'print,email,favorites,facebook,twitter,myspace,google,digg,live,delicious'
// };
// var addthis_share = {
//   templates: {
//     twitter: '{{title}}: {{url}}'
//   }
// };

// global _gaq array
var _gaq = [
  ['_setAccount', FM.siteId],
  // add site-specific parameters here.
  ['_trackPageview']
];

if (FM.searchWords) {
  _gaq.pop();
  _gaq.push(['_trackEvent', 'Search', FM.searchWords, FM.searchResults]);

} else {
  // this is needed for addThis tracking:
  // var pageTracker = {};
  // _gaq.push(function() {
  //    pageTracker = _gat._getTracker(FM.siteId);
  //    addthis_config.data_ga_tracker = pageTracker;
  // });

}

(function(d, t, a) {

  var gurl = '//www.google-analytics.com/ga.js',
      appendGA = function() {
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];

        g[a] = a;
        g.src = gurl;
        s.parentNode.insertBefore(g, s);
      };

  if (!FM.siteId || FM.siteId == 'XXXXXX') {
    FM.log('Google Analytics account not set.');
    return;
  }


  if (typeof $LAB != 'undefined') {
    $LAB = $LAB.script(gurl);
  } else {
    appendGA();
  }



})(document, 'script', 'async');

