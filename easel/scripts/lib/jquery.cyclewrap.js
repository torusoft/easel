(function($) {

$.fn.cycleWrap = function(options) {
  options = $.extend(true, {}, $.fn.cycleWrap.defaults, options || {} );
  this.each(function() {

    var wrapper = this,
        $wrapper = $(wrapper),
        opts = $.extend(true, {}, options ),
        $container = opts.container ? $wrapper[opts.container]('.slides') : $wrapper,
        wrapped = opts.wrapped;


    if ( $container.children().length > 1 ) {
      // call the init function
      opts.init.call($wrapper[0], $container);

      $.each(opts, function(key, val) {

        if (key === 'pagerAnchorBuilder' && typeof val === 'string') {
          opts[ key ] = function(index, el) {
            return $wrapper.find( val )[index];
          };

        } else if ( wrapped[ key ] ) {
          opts[ key ] = $wrapper.find( val );
        }

      });

      $container.cycle( opts );
    }
  });

  return this;
};

$.fn.cycleWrap.defaults = {
  // cycleWrap() OPTIONS.
  init: $.noop, // gets called within the context of $().cycleWrap jQuery set -- before .cycle() is called
  container: 'children', // Use null if selector for cycleWrap() is same as selector for cycle()
  containerFilter: '.slides', // Use undefined to select all children of the cycleWrap selector
  wrapped: {
    next: 1,
    prev: 1,
    pager: 1
  },
  
  // SPECIAL CYCLE OPTIONS (not set here as defaults)
  // these get converted to $wrapper.find('yourSelector')
  // unless their "wrapped" status is set to  false/0/null
  /*
  prev: 'yourSelector',
  next: 'yourSelector',
  pager: 'yourSelector',
  */
  // this one gets converted to a function if it's a string
  /*
  pagerAnchorBuilder = '.controls ul a',
  // converts to function(index, el) { return $wrapper.find('.controls ul a')[index]; }
  */

  // CYCLE DEFAULTS
  pause: 1,
  speed: 600,
  timeout: 8000
};

})(jQuery);
