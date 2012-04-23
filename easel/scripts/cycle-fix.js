// duck punch .cycle():
// avoid needless console logs
// only call if .children().length > 1
// add an init callback function to be called for each container
(function($) {
  if ( !window.jQuery || !$.fn.cycle ) {
    return;
  }

  var _cycle = $.fn.cycle;

  $.fn.cycle = function(options) {
    var init = options.init || $.fn.cycle.defaults.init;
    return this.each(function() {
      init.call(this);
      if ( $(this).children().length > 1 ) {
        return _cycle.call($(this), options);
      }
    });
  };
  $.extend(true, $.fn.cycle, _cycle);
  $.fn.cycle.defaults.init = $.noop;

})(jQuery);
