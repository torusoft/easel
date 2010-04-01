/** =bring ie6 up to ie7 with js
************************************************************/
var IE7_PNG_SUFFIX = ":"; // using alternate png fix
jQuery.getScript(FM.scriptDir + 'lib/ie7.js');

/** =png fix
************************************************************/
jQuery.getScript(FM.scriptDir + 'lib/dd-belatedpng.js', function() {
  if (FM.pngSelector) {
    DD_belatedPNG.fix(FM.pngSelector);
  }
});