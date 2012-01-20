(function($) {

var setNum = function(prop, fallbackNum) {
      if (FM && FM[prop] || FM[prop] === 0) {
        var num = parseInt(FM[prop], 10);
        return isNaN(num) ? fallbackNum : num;
      }
      return fallbackNum;
    },
    cycleSpeed = setNum('cycleSpeed', 600),
    cycleTimeout = setNum('cycleTimeout', 8000),

    players = {},
    pausePlayers = $.noop,
    videoOptions = {
      videoIdPrefix: 'v',
      slideIdPrefix: 's',
      videoWrapper: 'div.slide-videos',
      playerSelector: 'div.mejs-container',
      hideClass: 'hide-accessibly',
      highZClass: 'highz'
    };

// set up pause/resume "events"
$(document).bind('cycleWrap', function(event, pauseresume) {
  if ( !$.fn.cycleWrap.cycles ) {
    return;
  }
  var triggered = 0;
  if (event.target === document) {
    $.each($.fn.cycleWrap.cycles, function(index, val) {
      val.cycle(pauseresume);
      triggered++;
    });
  } else {
    $(event.target).cycle(pauseresume);
    triggered++;
  }
  FM && FM.log && FM.log(pauseresume + 'd: ' + triggered);
});

$.fn.cycleWrap = function(options) {
  options = $.extend(true, {}, $.fn.cycleWrap.defaults, options || {} );
  this.each(function() {

    var wrapper = this,
        $wrapper = $(wrapper),
        opts = $.extend(true, {}, options ),
        $container = opts.container ? $wrapper[opts.container]('.slides') : $wrapper,
        wrapped = opts.wrapped,
        anchorsBuilt = false,
        slideNum = $container.children().length;

    opts.videos = opts.videos || !!$wrapper.find('video').length;
    if ( slideNum ) {

      // add video events to init, before, and after if videos option is true
      if ( opts.videos ) {
        opts.pause = 0;
        var video = $.fn.cycleWrap.video;
        video.init.call(wrapper, opts);

        if (slideNum === 1) {
          $wrapper.find('.' + opts.videoOptions.hideClass).removeClass(opts.videoOptions.hideClass);
          return;
        }

        $.each(['before', 'after'], function(i, evt) {
          var eventFn = opts[evt] || $.noop;
          opts[evt] = function(curr, next) {
            eventFn(curr, next);
            video[evt].call(wrapper, curr, next, opts);
          };
        });
      }

      // add this container to the list of running cycles
      $.fn.cycleWrap.cycles.push($container);

      // call the init function
      opts.init.call(wrapper, $container);

      $.each(opts, function(key, val) {

        // make sure pager anchors are the ones within this cycle wrapper
        if (key === 'pagerAnchorBuilder' && typeof val === 'string') {
          anchorsBuilt = val;
          opts[ key ] = function(index, el) {
            return $wrapper.find( val )[index];
          };

        // make sure next, prev, and pager target elements within this particular cycle wrapper
        } else if ( wrapped[ key ] ) {
          opts[ key ] = $wrapper.find( val );
        }

      });

      if (anchorsBuilt && !opts.pager) {
        opts.pager = $wrapper.find( anchorsBuilt ).parent();
      }

      if (opts.pager && opts.autoPagerPosition) {
        var _optsBefore = opts.before,
            controlsWidth = opts.pager.parent().width(),
            thumbsWidth = opts.pager.children().map(function(index, elem) {
              return $(this).outerWidth();
            }).get(),
            addWidths = function(start, end) {
              var w = 0;
              for ( var i=start; i < end; i++ ) {
                w += thumbsWidth[i];
              }
              return w;
            };

        opts.before = function(c, n, o) {

          var mLeft = parseInt(opts.pager.css('marginLeft'), 10),
              currentPos = addWidths(0, o.nextSlide),
              thumbWidth = addWidths(o.nextSlide-1, o.nextSlide);
          if (currentPos > controlsWidth) {
           opts.pager.animate({marginLeft: -currentPos + (controlsWidth - thumbWidth)});
          } else if (mLeft !== 0) {
            opts.pager.animate({marginLeft: 0});
          }
          if ($.isFunction(_optsBefore)) {
            _optsBefore(c, n, o);
          }
        };
      }
      // call the cycle plugin
      $container.cycle( opts );

      // deal with img loading awkwardness
      $container.find('.js-invisible').each(function() {
        var $invisi = $(this);
        if (this.nodeName == 'IMG' && !this.complete) {

          $invisi.bind('load error', function() {
            $invisi.removeClass('js-invisible');
          });

        } else {
          $invisi.removeClass('js-invisible');
        }
      });

      // pause cycle when user leaves the browser tab, resume when returns
      if ( opts.pauseOnWindowBlur ) {
        $(window).bind('focus blur', function(event) {
          event.stopPropagation();
          var playpause = event.type == 'focus' ? 'resume' : 'pause';
          $container.trigger('cycleWrap', playpause );
        });
      }

    }
  });

  return this;
};

$.fn.cycleWrap.cycles = [];

$.fn.cycleWrap.defaults = {
  // cycleWrap() OPTIONS.
  init: $.noop, // gets called within the context of $().cycleWrap jQuery set -- before .cycle() is called
  container: 'children', // Use null if selector for cycleWrap() is same as selector for cycle()
  containerFilter: '.slides', // Use undefined to select all children of the cycleWrap selector
  pauseOnWindowBlur: true,
  wrapped: {
    next: 1,
    prev: 1,
    pager: 1
  },
  // VIDEO OPTIONS
  videos: false,
  videoOptions: videoOptions,
  player: {
    plugins: ['flash'],
    pluginPath: '/assets/scripts/lib/mediaelement/'
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
  speed: cycleSpeed,
  timeout: cycleTimeout,
  speedIn: cycleSpeed - 50,
  speedOut: cycleSpeed
};

// set up player pausing function
pausePlayers = function(ps, $gallery, opts) {
  var vOpts = opts.videoOptions,
      $slideVideos = $gallery.find(vOpts.videoWrapper),
      firstId = $gallery.find('div.slide').eq(0).attr('id'),
      rvid = new RegExp('^' + vOpts.slideIdPrefix);

  firstId = '#' + firstId.replace(rvid, vOpts.videoIdPrefix);
  $slideVideos.find(vOpts.playerSelector).filter(function() {
    return !$(this).find(firstId).length;
  }).addClass(vOpts.hideClass);
  window.setTimeout(function() {
    // redefine this function after it's run once
    pausePlayers = function(ps) {

      $slideVideos.find(vOpts.playerSelector).addClass(vOpts.hideClass);
      for ( var p in ps ) {
        if (typeof ps[ p ].pause == 'function' ) {
          ps[ p ].pause();
        }
      }
    };
  }, 1000);
};

$.fn.cycleWrap.video = {
  init: function(opts) {
    var vOpts = opts.videoOptions,
        $gallery = $(this);

    // set up videos
    if ( $.fn.mediaelementplayer ) {
      var $slideVideos = $gallery.find(vOpts.videoWrapper),
          slides = $gallery.find('.slides')[0];

      // apply MediaElementPlayer
      $gallery.find('video').each(function(index) {
        var vidid = this.id,
            rvPrefix = new RegExp( vOpts.videoIdPrefix );
            slideId = vidid.replace(rvPrefix, vOpts.slideIdPrefix);

        players[ slideId ] = new MediaElementPlayer('#' + vidid, opts.player);

      });

      // unhide the container, but hide the individual mediaElement wrappers
      $slideVideos.removeClass(vOpts.hideClass)
        .find(vOpts.playerSelector).addClass(vOpts.hideClass);

      // bind clicks
      $gallery.delegate(vOpts.playerSelector, 'click', function(event) {
        var $mep = $(this);

        setTimeout(function() {
          var playpause = $mep.find('.mejs-playpause-button')[0].className;

          if ( /mejs-pause/.test(playpause) ) {
            slides.cyclePause = 10;
          } else {
            slides.cyclePause = 1;
          }
        }, 40);
      });
      $gallery.bind('mouseenter mouseleave', function(event) {
        slides.cyclePause += (event.type == 'mouseenter') ? 1 : -1;
      });
    }
  },
  before: function(curr, next, opts) {
    pausePlayers(players, $(this), opts);
  },
  after: function(curr, next, opts) {
    var vOpts = opts.videoOptions,
        $thisSlide = $(next),
        $slideVideos = $(this).find(vOpts.videoWrapper),
        slideId = $thisSlide.attr('id'),
        vidid = slideId.replace(vOpts.slideIdPrefix, vOpts.videoIdPrefix);

    if ( players[ slideId ] ) {

      $( '#' + vidid ).closest(vOpts.playerSelector)
        .removeClass(vOpts.hideClass);

      $slideVideos.addClass(vOpts.highZClass);
    } else {
      $slideVideos.removeClass(vOpts.highZClass);
    }
  }
};


})(jQuery);
