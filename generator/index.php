<?php
  $form_action = dirname($_SERVER['PHP_SELF']) . '/';  # removes the /index.php from the path
  include 'easel-gen.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Easel Stylesheet Generator</title>
      
  <link rel="stylesheet" href="../framework/styles/grid.css" type="text/css" media="screen, projection">
  <link rel="stylesheet" href="../framework/styles/reset.css" type="text/css" media="screen, projection">
  <link rel="stylesheet" href="../framework/styles/forms.css" type="text/css" media="screen, projection">
  <link rel="stylesheet" href="../framework/styles/screen.css" type="text/css" media="screen, projection">
  <link rel="stylesheet" href="../examples/styles/screen.css" type="text/css" media="screen, projection">
  <style type="text/css">
    #grid_img {
      margin: 1em 0;
    }
    #grid_img img {
      padding: 5px;
      border: 1px solid #999;
    }
    textarea { font-family: Monaco, sans-serif; font-size: 12px; }
  </style>
</head>

<body>
  <div class="container">
    <div class="col-24 header">
      <h1>Easel Stylesheet Generator</h1>
    </div>
    
    <hr>
    <div class="col-24">
      <div class="col-7">
        <h2>Options</h2>
        <div class="box">
          <form name="generator" method="post" id="generator" action="<?php echo $form_action; ?>">
            <fieldset>
              <div class="text">
                <label for="project_name">Project Name</label>
                <input type="text" name="project_name" value="Fusionary Easel" id="project_name" />
              </div>
              
              <div class="text">
                <label for="num_cols">Number of Columns:</label>
                <input type="text" id="num_cols" name="generator[number_of_columns]" value="<?php echo $number_of_columns; ?>" maxlength="2">
              </div>
              
              <div class="text">
                <label for="column_width">Column Width:</label>
                <input type="text" id="column_width" name="generator[column_width]" value="<?php echo $column_width; ?>" maxlength="3">
              </div>
              
              <div class="text">
                <label for="margin_width">Margin Width:</label>
                <input type="text" id="margin_width" name="generator[margin_width]" value="<?php echo $margin_width; ?>" maxlength="2">
              </div>
              <div class="text" style="display: none">
                <label for="total_page_width">Total Page Width:</label>
                <input type="text" name="total_page_width" id="total_page_width" value="">
                <span id="total_width_output">---</span>
              </div>
              
              <div class="text">
                <label for="desired_page_width">Desired Page Width:</label>
                <input type="text" id="desired_page_width" name="generator[desired_page_width]" value="<?php echo $page_width; ?>" maxlength="4">
              </div>
              <div class="text">
                <label for="input_padding">Input Padding Width:</label>
                <input type="text" id="input_padding" name="generator[padding_width]" value="2" maxlength="4">
              </div>
              <div class="text">
                <label for="input_border">Input Border Width:</label>
                <input type="text" id="input_border" name="generator[border_width]" value="1" maxlength="4">
              </div>
              
              <fieldset>
                <div class="legend">Stylesheets to Append</div>
                <div class="checkbox">
                  <input type="checkbox" value="yes" id="reset_css" name="otherstyles[reset.css]"<?= checked_css('reset.css'); ?>>
                  <label for="reset_css">reset</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" value="yes" id="forms_css" name="otherstyles[forms.css]"<?= checked_css('forms.css'); ?>>
                  <label for="forms_css">forms</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" value="yes" id="extras_css" name="otherstyles[extras.css]"<?= checked_css('extras.css'); ?>>
                  <label for="extras_css">extras</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" value="yes" id="admin_css" name="otherstyles[admin.css]"<?= checked_css('admin.css'); ?>>
                  <label for="admin_css">admin</label>
                </div>
              </fieldset>
              <fieldset>
                <div class="legend">Generate IE Stylesheet</div>
                <div class="radio">
                  <input type="radio" value="yes" id="ie_yes" name="generate_ie">
                  <label for="ie_yes">yes</label>
                </div>
                <div class="radio">
                  <input type="radio" value="ie_no" id="ie_no" name="generate_ie" checked="checked">
                  <label for="ie_no">no</label>
                </div>
                
              </fieldset>
              <div class="actions">
                <input type="submit" id="generate" name="generate" value="Generate CSS">
                <span class="btn_fit"><input type="button" value="Reset"></span>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <!-- /options -->
      
      <!-- generated code:  -->
      <div class="col-16 push-0 last">
        <h2>Generated Code</h2>
        <textarea id="g_css" class="txt_area" name="g_css" rows="50" cols="60" tabindex="6"><?php echo $grid_css ?></textarea>
        <div id="grid_img">
          <p>
            <img class="attn" src="cache/<?php echo $filename; ?>" alt="<?php echo $filename; ?>">
          </p>
          <p>Drag image to your desktop or right/control-click on the image to save it.</p>
        </div>
      </div>
    </div>
    
  </div>
  <!-- /div.container -->
  
</body>
  
</html>