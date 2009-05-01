<?php include("../includes/header_top.php"); ?>
<link href="/framework/styles/dev.css" media="screen, projection" rel="stylesheet" type="text/css">
<?php include("../includes/header_bottom.php"); ?>
<h1 class="page-title">Development Styles</h1>

<div class="example block">
  <h2>Rails Pagination Markup</h2>
  <div class="pagination">
    <span class="disabled prev_page">&laquo; Previous</span>
    <span class="current">1</span>
    <a href="/foo?page=2" rel="next">2</a><a href="/foo?page=3">3</a>
    <a href="/foo?page=4">4</a> <a href="/foo?page=2" class="next_page" rel="next">Next &raquo;</a>
  </div>
</div>
<div class="example block">
  <h2>ExpressionEngine Pagination Markup</h2>
  <div class="pagination">
    <a href="http://www.bas-k12.org/index.php/staff/">&laquo; First</a>
    <a href="http://www.bas-k12.org/index.php/staff/P8/"><</a>
    <a href="http://www.bas-k12.org/index.php/staff/P0/">1</a>
    <a href="http://www.bas-k12.org/index.php/staff/P8/">2</a>
    <b>3</b>
    <a href="http://www.bas-k12.org/index.php/staff/P24/">4</a>
    <a href="http://www.bas-k12.org/index.php/staff/P32/">5</a>
    <a href="http://www.bas-k12.org/index.php/staff/P24/">></a> 
    <a href="http://www.bas-k12.org/index.php/staff/P304/">Last &raquo;</a>
  </div>
</div>
<div class="example block">
  <h2>Horizontal Navigation</h2>
  <ul class="hnav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a class="active" href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
<div class="example block">
  <h2>Vertical Navigation</h2>
  <ul class="vnav col-4 col-last">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a class="active" href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
<div class="example block">
  <h2>Inline Navigation</h2>
  <ul class="inav">
    <li class="li-1"><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a class="active" href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <ul class="inav text-center">
    <li class="li-1"><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a class="active" href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  
</div>
<?php include("../includes/footer.php"); ?>