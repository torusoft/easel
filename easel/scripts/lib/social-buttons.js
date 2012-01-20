/*!
 * this script courtesy of Stoyan Stefanov
 * http://www.phpied.com/social-button-bffs/
*/
(function(d, s) {
  var js, 
      fjs = d.getElementsByTagName(s)[0], 
      load = function(url, id) {
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); 
        js.src = url; 
        js.id = id;
        fjs.parentNode.insertBefore(js, fjs);
      };
      
  load('//connect.facebook.net/en_US/all.js#xfbml=1', 'fbjssdk');
  load('https://apis.google.com/js/plusone.js', 'gplus1js');
  load('//platform.twitter.com/widgets.js', 'tweetjs');
  
})(document, 'script');

/** use the following html
<!-- facebook like -->
<div class="fb-like" data-send="false" data-width="280"></div>
<!-- twitter -->
<a class="twitter-share-button" data-count="horizontal">Tweet</a>
<!-- g+ -->
<div class="g-plusone" data-size="medium"></div>

*/
