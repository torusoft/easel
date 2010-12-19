(function($) {
if ($.fn.hscroll) { return; }

// Creates a horizontal scrollbar for a set of items

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
    var $productList = $(this),
        $productWrapper = $productList.parent(),
        $products = $productList.children(),
        productNum = $products.length,
        productWidth = $products.first().width() + parseInt($products.first().css('marginRight'), 10);
    
    if (productNum <= opts.minElements || 0) {
      return true;
    }
    $productWrapper.animate({height: $productWrapper.height() + 30}, 500);
    $productList.width(productNum * productWidth);

    var widthDiff = $productWrapper.width() - (productNum * productWidth);

    var $slider = $productWrapper.append('<div class="slider-wrapper ui-widget ui-widget-content ui-corner-all"><div class="slider"></div></div>').find('.slider');

    // show the slider only after all images are loaded.
    var loadedImages = 0;
    $productList.find('img').each(function(index) {
      if (this.complete) {
        imagesLoaded({
          imgs: ++loadedImages,
          productNum: productNum,
          wrapper: $productWrapper
        });
      } else {
        $(this).bind('load error', function(event) {
          imagesLoaded({
            imgs: ++loadedImages,
            productNum: productNum,
            wrapper: $productWrapper
          });
        });
      }
    });

    $slider.slider({
      animate: 400
    });
    
    var $handle = $slider.find('.ui-slider-handle'),
        sliderWidth = $slider.width();

    $slider.parent().mousedown(function(event) {
      var $tgt = $(event.target),
          val = {
            handle: -1
          };

      if ($tgt.is('.slider-wrapper')) {
        var pos = event.pageX - $slider.offset().left;
        if (pos > sliderWidth) {
          val.handle = 100;
        } else if (pos <= 0) {
          val.handle = 0;
        }
        val.productList = getMargin(val.handle, widthDiff);
        if (val.handle !== -1) {
          $slider.trigger('slide', [{handle: $(false)}, val]);
          // $productList.animate(val.productList);
        }
      }
    });

    var anim = true;
    $handle.bind('mousedown mouseup', function(event) {
      anim = event.type == 'mousedown' ? false : true;
    });

    $slider.bind('slide', function(event, ui, wrapperVal) {
      var newMargin;
      if ( $productList.width() > $productWrapper.width() ) {

        if (wrapperVal) {
          newMargin = wrapperVal.productList;
          $handle.animate({left: wrapperVal.handle + '%'});
        } else {
          newMargin = getMargin(ui.value, widthDiff);
        }

        if (anim) {
          $productList.animate(newMargin);

        } else {
          $productList.css(newMargin);
        }

      } else {
        $productList.css('margin-left', 0);
      }
    });

  });

  function imagesLoaded(info) {
    if (info.imgs == info.productNum) {
      info.wrapper.find('.slider-wrapper').animate({top: '0'}, 800);
    }
  }

  function getMargin(val, widthDiff) {

    return {'marginLeft': m.round( val / 100 * widthDiff ) + 'px'};
  }

  return this;

};

// default options
$.fn.hscroll.defaults = {
  uistylesheet: '/assets-shared/styles/ui/jquery-ui.css',
  items:'div',
  biglinks: true,
  minElements: 6
};

})(jQuery);
