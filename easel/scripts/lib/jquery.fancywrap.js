(function($) {

  if (typeof $.fancybox === 'undefined') { return; }

  $(document).ready(function() {
    $('<div id="fvids"></div>').appendTo('body');
  });

  if ( mejs && mejs.MediaElementDefaults) {
    mejs.MediaElementDefaults.pluginPath = FM.paths.lib + 'mediaelement/';

  }
  $.fn.fancyWrap = function(options) {
    options = options || {};

    var optsType = 'image',
        fwDefaults = $.fn.fancyWrap.defaults,
        $finner = $('#fancybox-inner'),
        optsComplete = $.isFunction(options.onComplete) ? options.onComplete : $.noop,
        // special onComplete function for video:
        videoComplete = function() {
          $finner.find('video')
          .attr('autoplay', true)
          .mediaelementplayer({plugins: ['flash']});
          optsComplete();

        };

    if ( options.type ) {
      optsType = options.type;
      delete options.type;
    }

    var getFancy = function(event) {
      var $link = $(this),
          vidExt = ( /\.(mp4|m4v|mov|webm|ogg|ogv)/ ).test(this.href);

      if ( vidExt ) {
        optsType = 'video';

        var uuid = event ? event.timeStamp : +new Date,
            vid = 'v-' + uuid,
            vidHref = this.href;

        options.href = '#' + vid;

        var $newVid = $('<video></video>')
        .attr({
          id: vid,
          src: vidHref,
          width: '640',
          height: '360',
          autoplay: true
        });
        $('#fvids').empty().append($newVid);

      }

      var defaults = fwDefaults[ optsType ],
          _dc = defaults.onComplete;
      options.onComplete = function() {
        if ( $.isFunction(_dc) ) {
          _dc();
        }
        if ( optsType === 'video' ) {
          videoComplete();
        } else {
          optsComplete();
        }
      };

      var opts = $.extend({}, defaults, options);

      $.fancybox( opts );
    };

    if (options.event) {

      $(this.selector).live(options.event, function(event) {
        delete options.event;
        event.preventDefault();
        getFancy.call(this, event);
      });

    } else {
      getFancy.call(this[0]);
    }

    return this;

  };

  $.fn.fancyWrap.defaults = {
    image: {
      type: 'image',
      titlePosition: 'over'
    },
    video: {
      // type: 'inline',
      transitionIn: 'none',
      transitionOut: 'none',
      padding: 0,
      autoScale: false,
      titlePosition: 'over',
      height: 360,
      width: 640,
      scrolling:  'no',
      onClosed: function() {
        $('#fvids').empty();
      }
    },
    quickview: {
      type: 'ajax',
      padding: 0,
      autoScale: false,
      scrolling:  'no',
      showCloseButton: false,
      onComplete: function() {
        var $quickGallery = $('div.quick-gallery');
        // bail if this quickGallery is already cycling
        if ( $quickGallery.data('cycling') ) { return; }


        $quickGallery.cycleWrap({
          // onPagerEvent: function(f, b) {
          //   FM.log(f, b);
          // },
          init: function() {
            $(this).data('cycling', true);
          },
          timeout: 4500,
          pause: 0,
          activePagerClass: 'active',
          pagerAnchorBuilder: '.thumb',
          fx: 'scrollHorz'
        });
      }
    }
  };

})(jQuery);