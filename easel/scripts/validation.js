(function() {
  var validateLoaded = false,
      meths = ['showLoading', 'hideLoading'];

  for (var meth in meths) {
    if ( !(meth in FM) ) {
      FM[meth] = function() {};
    }
  }

  $(document).ready(function() {
    if (typeof $.fn.tinyvalidate === 'undefined') {
      return;
    }

    $.fn.tinyvalidate.defaults.summary.lineItems = null;

    // success handlers by dataType (this == form)
    var success = {
      'html': function(html) {
        FM.hideLoading();

      },
      'json': function(json) {
        $('#form-response').remove();
        FM.hideLoading();
        $response = $('<div id="form-response" class="' + json.status + '"></div>')
          .html( decodeURIComponent(json.msg) );

        $response.insertAfter(this);
      }
    };

    // submitOverride function
    function submitOverride() {
      var frm = this,
          $frm = $(frm),
          dt = FM.ajaxify === true ? 'html' : FM.ajaxify;

      FM.showLoading();
      $.ajax({
        url: frm.action,
        data: $frm.serialize(),
        dataType: dt,
        success: function(data) {
          success[dt] && success[dt].call(frm, data);
        }
      });
    }

    // apply tinyvalidate plugin to all forms with class="validate"
    $('form.validate').each(function() {

      var opts = FM.validateOptions || {};
      if (FM.ajaxify) {
        opts.submitOverride = submitOverride;
      }

      $(this).tinyvalidate(opts);

    });

  }); //document ready



})();

