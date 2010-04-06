/** =forms
************************************************************/
$(document).ready(function() {
	
	/** =disabled inputs **/
	$(':disabled').parent('div').addClass('disabled');
	
	/** =placeholder text **/
	if (typeof $.fn.defaulttext !== 'undefined'){
		$(':input[placeholder]').each(function(index) {
			$(this).defaulttext({
				defaultClass: 'placeholder',
				text: 'placeholder'
			});
		});
	}
		
});

/** =validation
************************************************************/
$(document).ready(function() {
	$form = $('form.validate');
	if ($form.length || typeof $.fn.tinyvalidate !== 'undefined') {
		$form.each(function(index) {
			$(this).tinyvalidate({
			  inline: {
			    errorElement: '<div class="error-message"></div>'
			  },
				summary: {
					preMessage: '<p>Please correct the {num} highlighted {field|fields} and try again.</p><ul>',
					wrapper: '<div class="box error"></div>'
				}				
			});
		});
	}
});
