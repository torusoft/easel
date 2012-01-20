/** =Global ajax function for working with EE modules
************************************************************/
$(document).bind('getAjax', function(event, params) {
  /* params should be an object. for example:

     $('#foo').trigger('getAjax', {
       tag: 'remote_cart',
       method: 'count'
       complete: function(data) { $(this).html(data) }
    });

    This would fetch the return data from {exp:remote_cart:count} and dump it into the <div id="foo">
  */
  var tgt = event.target,
      ajaxEvents = {};

  $.each(['success', 'complete', 'error'], function(index, val) {
    if ( val in params && typeof params[val] === 'function' ) {
      // overwrite success handler with complete handler,
      // so we can target the response data
      var handle = params[val];
      if (val == 'complete') {

        ajaxEvents['success'] = function(data) {
          if ($.isReady) {
            handle.call(tgt, data);
          } else {
            $(document).ready(function() {
              handle.call(tgt, data);
            });
          }
        };
      } else {
        ajaxEvents[val] = handle;
      }
      // remove event handler methods from params, so we can use the rest as data params
      delete params[val];
    }
  });

  var data = $.extend({}, {tag: 'remote_cart', 'method': 'ajaxRequest'}, params);
  var ajaxOpts = $.extend({}, {
    type: 'GET',
    url: '/scripts/ajax-requests/',
    // url: '/files.file.png', // test for ajaxError
    data: data
  }, ajaxEvents );


  $.ajax(ajaxOpts);

}); // bind getAjax


/** =global ajax error handling
************************************************************/
FM.addEvent(window, 'load', function() {

  $(document).ajaxError(function(event, xhr, settings, thrownError) {
    if (/count$/.test(settings.url)) {
      return;
    }
    var $ajaxError = $( document.getElementById('ajax-error') ),
        msg = FM.text.ajaxError;

    if (thrownError) {
      msg += '<div>' + thrownError + '</div>';
    }

    if ( !$ajaxError.length ) {
      $ajaxError = $('<div></div>', {
        id: 'ajax-error',
        className: 'bubble error js-hide ajax-error'
      }).appendTo('body');
    }
    $ajaxError
    .html(msg)
    .fadeIn()
    .delay(6000)
    .fadeOut();

    if (FM.hideLoading) {
      FM.hideLoading();
    }
    $('button[disabled]').removeAttr('disabled');
  });
});
