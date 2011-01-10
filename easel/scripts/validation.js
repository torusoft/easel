(function() {
var validateLoaded = false;

FM.loadValidate = function() {
  
  $(document).ready(function() {
    if (validateLoaded) { return; }
    validateLoaded = true;

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
          success[dt].call(frm, data);
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


}; // FM.loadValidate()

// determine how and when validation scripts should be loaded


  var tvmin = FM.paths.min + 'validate',
      tv = FM.paths.lib + 'jquery.tinyvalidate.js',
      tvr = FM.paths.lib + 'jquery.tinyvalidate.rules.js',
      sel = FM.paths.lib + 'jquery.selectmenu.js';

  if ( FM.inArray(tv, FM.loaded) || FM.inArray(tvmin, FM.loaded) ) {
    FM.loadValidate();
  } else {

    $LAB.wait()
    .script(tv)
    .script(tvr)
    .script(sel)
    .wait(FM.loadValidate);
    FM.loaded.push(tv, tvr, sel);
  }

})();

