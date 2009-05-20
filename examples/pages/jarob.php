<!DOCTYPE html><html lang="en" class="js"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Jarob Centrifics</title>
    <link href="../../framework/styles/reset.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/forms.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/extras.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/screen.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/admin.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/grid.css" media="screen" rel="stylesheet" type="text/css">
<link href="../../framework/styles/dev.css" media="screen" rel="stylesheet" type="text/css">
<link href="../styles/jarob.css" media="screen" rel="stylesheet" type="text/css">
    <!--[if lt IE 8]>
      <link href="../../framework/styles/ie.css" media="screen" rel="stylesheet" type="text/css" />
    <![endif]-->
    
  </head><body>
    <div class="container content">
      <div class="header group">
        <h1 class="col-12">Jarob Centrifics</h1>
        <div class="col-12 col-last nav-authentication">
          
  <p>
    You are currently logged in as <em>Admin User</em>. 
    
      
        <a href="/" class="btn"><span>Public Site</span></a>
      
    
    <a href="/account" class="btn"><span>Profile</span></a>
    <a href="/logout" class="btn"><span>Logout</span></a>
  </p>

        </div>
      </div>
      
      
      <ul class="hnav nav-global">
  <li><a href="/admin/users">Users</a></li>
  <li><a href="/admin/customers">Customers</a></li>
  <li class="active"><a href="/admin/products">Products</a></li>
</ul>
      <h2>Create a New Product Template</h2>
<form action="/admin/products/product_templates" class="new_product_template" enctype="multipart/form-data" id="new_product_template" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="GZ4G5zYeNDKcUaS/rfpV8c1jwTE5ldTcFdGRqqeOi4E="></div>
  
<fieldset class="col-12">
  <h3 class="legend">Product Info</h3>
    <div class="select col-6 hform label-space">
      <label class="col-2" for="product_template_product_mounting_method_id">Mounting Method</label>
      <select class="col-4 col-last" id="product_template_product_mounting_method_id" name="product_template[product_mounting_method_id]"></select>
    </div>
    <div class="select col-last col-6 hform label-space">
      <label class="col-2" for="product_template_customer_id">Customer</label>
      <select class="col-4 col-last" id="product_template_customer_id" name="product_template[customer_id]"><option value="1">Meijer</option></select>
    </div>
  <div class="file vform clear col-12 col-last">
    <label for="product_template_installation_guide">Installation guide</label>
    <input id="product_template_installation_guide" name="product_template[installation_guide]" size="30" type="file">
  </div>
  <div class="checkbox">
    <input id="product_template_disable_installation_guide_validation" name="product_template[disable_installation_guide_validation]" type="hidden">
  </div>
</fieldset>
<fieldset class="col-last col-12"><h3 class="legend">Product Dimensions</h3>
  <div class="text col-2 vform">
    <label for="product_template_width">Width</label>
    <input class="col-2" id="product_template_width" name="product_template[width]" size="30" type="text">
  </div>
  <div class="checkbox col-2 label-space">
    <input type="checkbox">
    <label for="product_template_width">Active</label>
  </div>
  
  <div class="text col-4 vform">
    <label for="product_template_height">Height</label>
    <input class="col-4" id="product_template_height" name="product_template[height]" size="30" type="text">
  </div>
  <div class="text col-last col-4 vform">
    <label for="product_template_depth">Depth</label>
    <input class="col-4" id="product_template_depth" name="product_template[depth]" size="30" type="text">
  </div>
</fieldset>
  <fieldset class="actions clear">
    <button class="btn" type="submit"><span>Create</span></button> or <a href="javascript:history.back()" class="btn"><span>Cancel</span></a>
  </fieldset>
</form>
      
      <div class="footer">
        <p>Copyright ©2009</p>
      </div>
    </div>
    
  
</body></html>