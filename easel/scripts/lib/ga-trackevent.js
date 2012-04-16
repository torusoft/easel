(function(win, $) {
  /** =Track downloads and external link clicks
  ************************************************************/
  $('body').delegate('a', 'click', function(event) {
    var category, action,
        extensions = {'DOC':1,'XLS':1,'EXE':1,'ZIP':1,'PDF':1,'PPT':1,'SWF':1,'SKP':1,'DWG':1},
        extTest = this.pathname.match(/\.(\w{2,4})$/),
        extension = extTest && extTest[1].toUpperCase() || 'none',
        external = this.hostname && this.hostname !== win.location.hostname,
        label = 'from ' + win.location.pathname;

    extension = extensions[ extension ] && extension;

    if (extension || external) {
      category = extension ? extension + ' Downloads' : 'External Links';
      action = extension ? this.href.match(/\/([\-_\w\.]+)$/)[1] : this.href;

      _gaq.push(['_trackEvent', category, action, label]);
    }
  });
})(window, jQuery);
