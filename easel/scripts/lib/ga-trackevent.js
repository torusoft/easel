(function(win, $) {
  /** =Track downloads and external link clicks
  ************************************************************/
  $('body').delegate('a', 'click', function(event) {
    var category, action,
        extensions = ['doc','xls','exe','zip','pdf','ppt','swf','skp','dwg'],
        extTest = this.pathname.match(/.(\w{2,4})$/),
        extension = extTest && extTest[1].toLowerCase() || '',
        external = this.hostname && this.hostname !== win.location.hostname,
        label = 'from ' + win.location.pathname;

    extension = ($.inArray(extension, extensions) > -1) && extension;

    if (extension || external) {
      category = extension ? extension.toUpperCase() + ' Downloads' : 'External Links';
      action = extension ? this.href.match(/\/([-_\w\.]+)$/)[1] : this.href;

      _gaq.push(['_trackEvent', category, action, 'from: ' + win.location.pathname]);
    }
  });
})(window, jQuery);
