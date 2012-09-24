/** =set up addthis configuration
************************************************************/

var FM = FM || {};

FM.siteId = FM.siteId || FM.googleAnalyticsId || '';
FM.trackPageview = FM.trackPageview || ['_trackPageview'];

if ( FM.trackPageview.length == 1 && (/page not found/i).test(document.title) ) {
  FM.trackPageview.push('/404/' + window.location.pathname.replace(/^\//,'') );
}

// global _gaq array
var _gaq = [
  ['_setAccount', FM.siteId],
  // add site-specific parameters here.
  // ['_setDomainName', 'none'],
  // ['_setAllowLinker', true],
  // ['_setAllowHash', false],

  // finish up
  FM.trackPageview
];

if (FM.searchWords) {
  _gaq.pop();
  _gaq.push(['_trackEvent', 'Search', FM.searchWords, FM.searchResults]);

} else {
  // this is needed for addThis tracking:

  // var addthis_config = {
  //   ui_use_css: false,
  //   username: 'steelcasestore',
  //   data_track_clickback: true,
  //   services_compact: 'print,email,favorites,facebook,twitter,myspace,google,digg,live,delicious'
  // };
  // var addthis_share = {
  //   templates: {
  //     twitter: '{{title}}: {{url}}'
  //   }
  // };

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
    if (FM.log) {
      FM.log('Google Analytics account not set.');
    }
    return;
  }


  if (typeof $LAB != 'undefined') {
    $LAB = $LAB.script(gurl);
  } else {
    appendGA();
  }



})(document, 'script', 'async');

