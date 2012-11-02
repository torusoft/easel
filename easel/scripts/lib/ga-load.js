// Requires init.js >= 11-02-2012

FM.googleAnalyticsId = FM.googleAnalyticsId || FM.googleAnalyticsKey || FM.siteId;

FM.trackPageview = FM.trackPageview || ['_trackPageview'];

if ( FM.trackPageview.length === 1 && (/page not found/i).test(document.title) ) {
  FM.trackPageview.push('/404/' + window.location.pathname.replace(/^\//,'') );
}

// global _gaq array
var _gaq = [
  ['_setAccount', FM.googleAnalyticsId],
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

}
// else {
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
  //    pageTracker = _gat._getTracker(FM.googleAnalyticsId);
  //    addthis_config.data_ga_tracker = pageTracker;
  // });

// }

// Load the Google Analytics script
if ( FM.googleAnalyticsId && FM.googleAnalyticsId.indexOf('XXXXX') === -1 ) {
  FM.addScript('//www.google-analytics.com/ga.js', 'loaded-ga');
}

