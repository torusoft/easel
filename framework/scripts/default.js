if (document.documentElement) {
  document.documentElement.className = 'js';
}

$(document).ready(function() {
  
// Animated Scrolling for Same-Page Links
// @see http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
function filterPath(string) {
return string
  .replace(/^\//,'')
  .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
  .replace(/\/$/,'');
}
var locationPath = filterPath(location.pathname);
$('a[href*=#]').each(function() {
  var thisPath = filterPath(this.pathname) || locationPath;
  if (  locationPath == thisPath
  && (location.hostname == this.hostname || !this.hostname)
  && this.hash.replace(/#/,'') ) {
    var $target = $(this.hash), target = this.hash;
    if (target) {
      var targetOffset = $target.offset().top;
      $(this).click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: targetOffset}, 800, function() {
          location.hash = target;
        });
      });
    }
  }
});
    
// Ajax form submission
var $ajaxForm =  $('form.validate');
var submitOptions = {
  clearForm: true,
  beforeSubmit: function() {
    $('<div class="loading">Processing<img src="/assets/images/ajax-loader.gif" alt="" /></div>').appendTo('div.actions');
    $('<div class="overlay"></div>').css({opacity: '.4'}).appendTo($ajaxForm);
  },
  success: function(responseText) {
    $ajaxForm.slideUp(200, function() {        
      var response = $('<div>' + responseText + '</div>').find('p:first').html();
      $('.loading').insertAfter(this).addClass('box success single-line').html(response).removeClass('loading');
    });
    $('div.overlay').fadeOut(100, function() {
      $(this).remove();
    });
  }
};
$ajaxForm.tinyvalidate({
  submitOverride: function() {
    $ajaxForm.ajaxSubmit(submitOptions);
  },
  summary: {
    wrapper: '<div class="error-summary error box"></div>',
    preMessage: '<p>There was a problem processing your request. <br>Please correct the {num} highlighted {field|fields} and try again.</p><ul>',
    postMessage: '</ul>'
  }
});
}); // document.ready
