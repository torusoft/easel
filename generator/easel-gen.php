<?php 
     
  ## For the grid.png image generation to work you must ensure the following:
  
  ## 1. YOU MUST HAVE A DIRECTORY CALLED cache IN THE SAME DIRECTORY AS THIS FILE 
  ## 2. THIS cache DIRECTORY MUST BE WRITABLE BY THIS SCRIPT
  #####################################################

  ## Originally created by Matz [kematzy@gmail.com] 2007-08-20
  $project_name = 'Fusionary Easel';
  $version_str = 'v.06 (2009-06-19)'; # used by the script below
  $bp_version = '0.5'; # used in generated CSS code
  $generated_date = @strftime('%Y-%m-%d');
  $framework_styles = '../framework/styles/';

  ## KLUDGE::  really dirty stuff just to enable support for hidden versions of this generator
  $blueprint_version = 'v06'; # used as a filename
  # used in the <form> below, enables the creation of hidden versions of index.VERSION.php


  # check if we have a POST or not ?
  if (@$_POST['generator']) {
    # yes, we have a post, so begin work
    
    ## Helper functions:

    # calculates the column width based on the given page width, margin and number of columns:
    # rounds the value off to the nearest full integer value i.e: 48.33333  => 48
    function calc_col_width($page_width,$margin_width,$number_of_columns){
      return intval( ((($page_width + $margin_width) / $number_of_columns) - $margin_width) );
    }
    # calculates the page width based on the given column width, margin and number of columns:
    function calc_page_width($column_width,$margin_width,$number_of_columns){
      return ((($column_width + $margin_width) * $number_of_columns) - $margin_width);
    }

    # generates .cols-N, ... {margin-width: npx; }
    function cols_margin($margin_width, $number_of_columns) {
      $col_list = array();
      for ($i=1; $i < $number_of_columns; $i++) { 
        $col_list[$i-1] = 'div.col-' . $i;
      }
      $cols_not_last = implode(',', $col_list) . ' {float: left; margin-right: ' . $margin_width . 'px}' . "\n";
      $cols_last = 'div.col-' . $i . ' {float: left; margin-right: 0;}';
      return $cols_not_last . $cols_last;
      
    }
    # generates the .col-N CSS code chunk.
    function cols($column_width,$margin_width,$number_of_columns){
      $out = '';
      for ($i=1; $i <= $number_of_columns; $i++) { 
        $n = ($i <= 9) ? " " : '';
        $out .= "div.col-$i $n{ width: " . ((($column_width + $margin_width) * $i) - $margin_width) ."px; }\n";
      }
      // return substr($out, 0,strlen($out)-2) . " float: left; smargin: 0; }\n";
      return $out . "\n";
    }
    
    # calculates difference between div and input/textarea width
    function input_div_diff($padding_width, $border_width) {
      return (intval($padding_width ) * 2) + (intval($border_width) * 2);
    }
    
    # generates the input.col-N and textarea.col-N code chunk.
    function input_cols($column_width,$margin_width,$number_of_columns,$padding_width, $border_width){
      $out = '';
      for ($i=1; $i <= $number_of_columns; $i++) { 
        $total_width = ((($column_width + $margin_width) * $i) - $margin_width - input_div_diff($padding_width, $border_width));
        $n = ($i <= 9) ? " " : '';
        $out .= "input.col-$i, textarea.col-$i $n{ width: " . $total_width ."px; margin-right: 0; }\n";
      }
      return $out . "\n";
    }
    
    # generates the .append-N CSS code chunk.
    function appends($column_width,$margin_width,$number_of_columns){
      $out = '';
      for ($i=1; $i <= ($number_of_columns-1); $i++) {
        $n = ($i <= 9) ? " " : '';
        $out .= ".append-$i $n{ padding-right: " . (($column_width + $margin_width) * $i) ."px; }\n";
      }
      return $out;
    }
    # generates the .prepend-N CSS code chunk.
    function prepends($column_width,$margin_width,$number_of_columns){
      $out = '';
      for ($i=1; $i <= ($number_of_columns-1); $i++) { 
        $n = ($i <= 9) ? " " : '';
        $out .= ".prepend-$i $n{ padding-left: " . (($column_width + $margin_width) * $i) ."px; }\n";
      }
      return $out;
    }
    # generates the .pull-N CSS code chunk.
    function pulls($column_width,$margin_width,$number_of_columns){
      $out = '';
      for ($i=1; $i <= $number_of_columns; $i++) {
        $out .= ".pull-$i { margin-left: -" . (($column_width + $margin_width) * $i) ."px; }\n";
      }
      return $out;
    }
    # generates the .push-N CSS code chunk.
    function pushs($column_width,$margin_width,$number_of_columns){
      $out = ".push-0  { margin: 0 0 0 18px; float: right; } /* Right aligns the image. */\n";
      for ($i=1; $i <= $number_of_columns; $i++) {
        $out .= ".push-$i { margin: 0 -" . (($column_width + $margin_width) * $i) ."px 0 18px; float: right;}\n";
      }
      return $out;
    }
    
    ##/ Helper Functions
      
    # extract the vars into:
    # $number_of_columns, $margin_width, $col_width, $page_width, $padding_width, $border_width
    extract(@$_POST['generator']);
    
    # make sure we have a number of columns, defaults to 14
    $number_of_columns = ($number_of_columns != '') ? intval($number_of_columns) : '14';
    # make sure we have a margin numbers, defaults to 20px
    $margin_width = ($margin_width != '') ? intval($margin_width) : '20';
    # check that we have a page_width supplied
    $page_width = ($desired_page_width != '') ? intval($desired_page_width) : calc_page_width($column_width,$margin_width,$number_of_columns);
    # make sure we have a col_width
    $column_width = ($column_width != '') ? intval($column_width) : calc_col_width($page_width,$margin_width,$number_of_columns);
    # set the cols css
    $cols = cols($column_width,$margin_width,$number_of_columns);
    $cols_margin = cols_margin($margin_width, $number_of_columns);
    # set the inputs css
    $inputs = input_cols($column_width,$margin_width,$number_of_columns, $padding_width, $border_width);
    # set the appends css
    $appends = appends($column_width,$margin_width,$number_of_columns);
    # set the prepends css
    $prepends = prepends($column_width,$margin_width,$number_of_columns);
    # set the pulls css (defaults to 3 pulls)
    $pulls = pulls($column_width,$margin_width,4);
    # set the pushs css (defaults to 3 pushs)
    $pushs = pushs($column_width,$margin_width,4);
    
    ## DO A SANITY CHECK ON THE PAGE WIDTH TO CATCH INCORRECT VALUES
    $total_page_width = calc_page_width($column_width,$margin_width,$number_of_columns);
    if ($total_page_width !== $page_width) {
      # the page_width we were given does not correspond with the page_width we've calculated
      # so replace it with the calculated value
      $page_width = $total_page_width;
    }    
    
    # load the template files with the defined __VARIABLES__ in them.
    $grid_css = file_get_contents('tmpl/reset.css');
    $project_name = $_POST['project_name'] ? $_POST['project_name'] : $project_name;
    $gen_date = @strftime('%Y-%m-%d');
    $gen_time = @strftime('%H-%M-%S');
    $gen_url = 'http://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    
    # now replace the variables within grid.css.
    $grid_css_replacements_arr = array(
      '__PROJECT_NAME__' => $project_name,
      '__GEN_DATE__' => $gen_date,
      '__GEN_TIME__' => $gen_time,
      '__GEN_URL__' => $gen_url,
      '__NUMBER_OF_COLUMNS__' => $number_of_columns,
      '__COLUMN_WIDTH__' => $column_width,
      '__MARGIN_WIDTH__' => $margin_width,
      '__HALF_OF_MARGIN_WIDTH__' => ($margin_width/2),
      '__HALF_OF_MARGIN_WIDTH_MINUS_BORDER__' => (($margin_width/2)-1),
      '__PAGE_WIDTH__' => $page_width,
      '__COLS__' => $cols,
      '__COLS_MARGIN__' => $cols_margin,
      '__APPENDS__' => $appends,
      '__PREPENDS__' => $prepends,
      '__PULLS__' => $pulls,
      '__PUSHS__' => $pushs,
      '__INPUTS__' => $inputs,
    );
    foreach ($grid_css_replacements_arr as $key => $value) {
      $grid_css = str_replace($key,$value, $grid_css);
    }
        
    # Special usage monitoring:
    # stores a log of all the requests coming in and the numbers people choose
    $logmsg = @strftime('%Y-%m-%d %T').'::IP=['. $_SERVER['REMOTE_ADDR']. "]::nc=[$number_of_columns],cw=[$column_width],m=[$margin_width],pw=[$page_width];\n";
    $logfile = @strftime('%Y-%m-%d') . '-usage.log';
    error_log($logmsg,3,dirname(__FILE__).'/logs/'.$logfile);
    

    # Add extra stylesheets as requested
    $other_stylesheets = array();    
    $other_contents = array();
    if (isset($_POST['otherstyles'])) {
      foreach ($_POST['otherstyles'] as $key => $value) {
        $other_stylesheets[] = $key;
        $other_contents[] = "\n\n" . file_get_contents($framework_styles . $key );
      }
    }
    if (count($other_stylesheets)) {
      $other_stylesheets = implode(', ', $other_stylesheets);
      $grid_css = str_replace('__OTHER_STYLESHEETS__', ', ' . $other_stylesheets , $grid_css);
    } else {
      $grid_css = str_replace('__OTHER_STYLESHEETS__', '' , $grid_css);
    }

    $grid_css .= implode('', $other_contents);
    
    ##########  GENERATE A NEW FILE ##################
    $new_file = 'generated/reset-' . $page_width . '_' . $number_of_columns . '_' . $column_width . '_' . $margin_width . '.css';

    file_put_contents($new_file, $grid_css);
    
    ##########  IMAGE GENERATION CODE BLOCK ##################
    
    # finally, let's add the grid image to the page.
    
    # set the heigth of the baseline to the default: 18px
    $baseline_height = '18';
    # create the grid image filename. Saving it with it's specifics just so that we can can cache & reuse it.
    $filename = 'blueprint_grid_' . $column_width . '+' . $margin_width .'x' . $baseline_height . '.png';
    
    # now look for the file first of all, does it exist?
    if(!file_exists(dirname(__FILE__).'/cache/'.$filename)){
      # echo "file does not exist";
      # crash out if the cache directory is NOT writable by the server
      if(!is_writable(dirname(__FILE__).'/cache/')){
        die("<html><head><title>ERROR:</title></head><body><h1>ERROR: The cache directory " . dirname(__FILE__).'/cache/' . "is not writable. Please read the installation instructions.</h1></body></html>");
      }
      
      # OK, let's create the image or die
      $imgh = @imagecreate(($column_width + $margin_width), $baseline_height)
          or die("<html><head><title>ERROR:</title></head><body><h1>ERROR: Cannot Initialize new GD image stream</h1></body></html>");
      
      # set the colours for the grid 
      $background_color = imagecolorallocate($imgh, 255, 255, 255);
      $grid_color = imagecolorallocate($imgh, 243, 245, 247);
      $stroke_color = imagecolorallocate($imgh, 230,230,236);
      
      # now add the background
      imagefill($imgh, 0, 0, $background_color);
      # then add the grid color
      imagefilledrectangle($imgh, 0, 0, $column_width, $baseline_height, $grid_color);
      # then add the baseline line
      imagefilledrectangle($imgh, 0, ($baseline_height -1), ($column_width + $margin_width), $baseline_height, $stroke_color);
      # write the .png file
      imagepng($imgh,dirname(__FILE__).'/cache/'.$filename);
      imagedestroy($imgh); # clean up after yourself
    }
    
    ##########  END IMAGE GENERATION CODE BLOCK ##################
  }
  else
  {
    # no POST has happened yet, so showing default values
    
    $baseline_height = '18'; # set the heigth of the baseline to the default: 18px
    $number_of_columns = '24';
    $column_width = '30';
    # margin
    $margin_width = '10';
    # page width (defaults to [empty])
    $page_width = '950';
    # other default values
    $grid_css = file_get_contents('cache/reset.css');

        
    # create the grid image filename. 
    # The filename formula is "blueprint_grid_<COLUMN_WIDTH>+<MARGIN_WIDTH>x<BASELINE_HEIGHT.png"
    $filename = 'blueprint_grid_' . $column_width . '+' . $margin_width .'x' . $baseline_height . '.png';    
  }

  function checked_css($sheet) {
    return isset($_POST['otherstyles']) && array_key_exists($sheet, $_POST['otherstyles']) ? ' checked="checked"' : '';
  }
