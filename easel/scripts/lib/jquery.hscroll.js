(function($) {
if ($.fn.hscroll) { return; }

// Creates a horizontal scrollbar for a set of items
var FM = FM || {};

if (!FM.add) {
  FM.add = function(nums) {
    var tally = 0;
    for (var i = nums.length - 1; i >= 0; i--){
      tally += nums[i] || 0;
    }

    return tally;
  };
}
$.fn.hscroll = function(options) {

  if (!this.length) { return this; }
  this.addClass('hscroll').parent().addClass('hscroll-wrapper');
  var opts = $.extend({}, $.fn.hscroll.defaults, options),
      m = Math;

  /** =load dependencies **/

  // biglinks plugin
  if (opts.biglinks && $.fn.biglinks) {
    $(this).children(opts.items).biglinks();
  }

  this.each(function() {
    var $itemList = $(this),
        $itemWrapper = $itemList.parent(),
        $items = $itemList.children(),
        $firstitem = $items.first(),
        itemNum = $items.length,
        widthArray = $items.map(function() {
          return $(this).outerWidth();
        }).get(),
        wrapperWidth = $itemWrapper.width(),
        itemWidth = 0,
        widthDiff = 0,
        sliderOpts = {animate: 400},
        $slider, wiggle;

    FM.wrapperWidth = wrapperWidth;
    itemWidth = FM.add(widthArray);
    wiggle = m.ceil(itemWidth/1000);
    itemWidth += ( wiggle );
    if (itemWidth <= (wrapperWidth || 0)) {
      $itemWrapper.addClass('no-scroller');
      $itemList.width(wrapperWidth);
      return;
    } else {
      $itemWrapper.removeClass('no-scroller');
    }

    if (opts.prevNext) {
      sliderOpts.change = function(e, ui) {
        $itemWrapper.find('.prev').toggleClass('disabled', ui.value == 0);
        $itemWrapper.find('.next').toggleClass('disabled', ui.value == 100);
      };
    }

    if (opts.adjustHeight) {
      $itemWrapper.animate({height: $itemWrapper.height() + 16}, 500);
    }

    $itemList.width(itemWidth);

    widthDiff = wrapperWidth - itemWidth;
    FM.widthDiff = widthDiff;

    $slider = $itemWrapper
    .append('<div class="slider-wrapper ui-widget ui-widget-content ui-corner-all"><div class="slider"></div></div>')
      .find('.slider');

    // show the slider only after all images are loaded.
    var loadedImages = 0;
    $itemList.find('img').each(function(index) {
      if (this.complete) {
        imagesLoaded({
          imgs: ++loadedImages,
          itemNum: itemNum,
          wrapper: $itemWrapper
        });
      } else {
        $(this).bind('load error', function(event) {
          imagesLoaded({
            imgs: ++loadedImages,
            itemNum: itemNum,
            wrapper: $itemWrapper
          });
        });
      }
    });

    $slider.slider(sliderOpts);

    var $handle = $slider.find('.ui-slider-handle').append('<span></span>'),
        handleRightEdge = wrapperWidth - $handle.width() ;

    $slider.parent().bind('mousedown', function(event) {
      var $tgt = $(event.target),
          val = {
            handle: -1
          };


      if ($tgt.is('.slider-wrapper')) {
        var pos = event.pageX - $slider.offset().left;

        if (pos > handleRightEdge) {
          val.handle = 100;
        } else if (pos <= 0) {
          val.handle = 0;
        }

        val.itemList = getMargin(val.handle, widthDiff);

        if (val.handle !== -1) {
          $slider.trigger('slide', [{handle: $(false)}, val]);
        }
      }
    });

    var anim = true;
    $handle.bind('mousedown mouseup', function(event) {
      anim = event.type == 'mousedown' ? false : true;
    });

    $slider.bind('slide', function(event, ui, wrapperVal) {
      if ( itemWidth > wrapperWidth ) {
        var newMargin = 0;
        if (wrapperVal) {
          newMargin = wrapperVal.itemList;
          $slider.slider('value', wrapperVal.handle);
        } else {
          newMargin = getMargin(ui.value, widthDiff);
        }

        if (anim) {
          $itemList.animate(newMargin);

        } else {
          $itemList.css(newMargin);
        }

      } else {
        $itemList.css('margin-left', 0);
      }
    });

    // set up prev/next buttons
    if ( opts.prevNext ) {

      var $prevNext = $(['<a class="prev disabled" href="#">',
                          '<span>Previous</span>',
                        '</a>',
                        '<a class="next" href="#">',
                          '<span>Next</span>',
                        '</a>'].join(''))
                        .appendTo($itemWrapper);

      $itemWrapper.css({position: 'relative'});

      // bind click handlers to prev/next
      $prevNext.bind('click', function(event) {
        event.preventDefault();
        if ( $(this).hasClass('disabled') ) {
          return;
        }

        var sliderValues = slideStep({
          step: opts.prevNext,
          direction: this.className,
          value: $slider.slider('value'),
          width: widthDiff,
          wrapperWidth: wrapperWidth
        });

        $slider.trigger('slide', [{handle: $(false)}, sliderValues]);
      });
    }

    // make sure that the active item within the scroller is visible when it's loaded
    setTimeout(function() {
      var $active = $itemList.find('.active');
      if ($active.length) {
        var activeLeft = -m.floor($active.position().left),
            sliderVal = m.floor( activeLeft / widthDiff * 100 );

        if ( -activeLeft > wrapperWidth - 20 ) {
          sliderVal = sliderVal > 100 ? 100 : sliderVal;
          $slider.trigger('slide', [{handle: $(false)}, {
            itemList: {marginLeft: activeLeft + 'px'},
            handle: sliderVal
          }]);
        }
      }
    }, 150);

  });

  function imagesLoaded(info) {
    if (info.imgs == info.itemNum) {
      info.wrapper.find('.slider-wrapper').animate({top: '0'}, 800);
    }
  }

  function getMargin(val, widthDiff) {

    return {'marginLeft': m.round( val / 100 * widthDiff ) + 'px'};
  }

  function slideStep(step) {
    var position, width,
        d = {
          direction: 'prev',
          step: 1,
          value: 0,
          width: 0,
          wrapperWidth: 0
        },
        s = $.extend({}, d, step);

    width = s.width;
    position = m.round( s.value / 100 * width );
    if ( s.direction.indexOf('prev') > -1 ) {
      position += (s.wrapperWidth * s.step);

      if ( position > 0 ) {
        position = 0;
      }

    } else {
      position -= (s.wrapperWidth * s.step);

      if ( position < width ) {
        position = width;
      }

    }

    return {
      itemList: {marginLeft: position + 'px'},
      handle: m.floor( position / width * 100 )
    };

  }


  return this;

};

// default options
$.fn.hscroll.defaults = {
  adjustHeight: true,
  uistylesheet: '/assets-shared/styles/ui/jquery-ui.css',
  items:'div',
  biglinks: false,
  minElements: 6,
  prevNext: 0 // fraction of the width to scroll with prev/next buttons; accepts number between 0 and 1.
              // if 0, does NOT append prev/next links to wrapper.
};

})(jQuery);
