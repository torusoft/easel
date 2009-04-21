<?php include("../includes/header.php"); ?>
<h1 class="page-title">Forms <span class="amp">&amp;</span> Validation</h1>
<h2>Boxes</h2>
<div class="content">
  <div class="box">
    <p class="no-margin">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <a href="#">ullamco laboris nisi ut aliquip</a> ex ea commodo consequat.
    </p>
  </div>
  <div class="box error">
    <p class="no-margin">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <a href="#">ullamco laboris nisi ut aliquip</a> ex ea commodo consequat.
    </p>
  </div>
  <div class="box success">
    <p class="no-margin">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </div>
  <div class="box notice">
    <p class="no-margin">
      Lorem ipsum dolor sit amet, <a href="#">consectetur adipisicing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </div>
  <div class="box notice single-line">
    <p class="no-margin">Use <code>class="single-line"</code> to vertically center short messages.</p>
  </div>
</div>
<div class="content">
  <h2>Forms</h2>
  <form action="forms-thankyou.php" method="post" class="validate col-10 center">
    <fieldset class="hform">
      <h3 class="legend">
        hform
      </h3>
      <div class="hidden">
        <input type="hidden" id="id0">
      </div>
      <div class="text fancy">
        <label for="id1" class="col-4">Fancy input <span class="required-mark">*</span></label> <input class="zip required col-6 col-last" type="text" id="id1">
      </div>
      <div class="text textarea">
        <label for="id2" class="col-4">Textarea</label> 
        <textarea id="id2" class="col-6 col-last">Content</textarea>
      </div>
      <div class="select">
        <label for="id3" class="col-4">Label3</label> <select id="id3" class="col-6 col-last required">
          <option>
            Option 1
          </option>
          <option>
            Option 2
          </option>
        </select>
      </div>
    </fieldset>
    <fieldset class="radios choose-one">
      <h3 class="legend">
        Radio Buttons
      </h3>
      <div class="radio">
        <input id="id4" name="4or5" type="radio"> <label for="id4">Label4</label>
      </div>
      <div class="radio">
        <input id="id5" name="4or5" type="radio"> <label for="id5">Label5</label>
      </div>
    </fieldset>
    <fieldset class="checkboxes">
      <h3 class="legend">
        Checkboxes
      </h3>
      <div class="checkbox">
        <input id="id6" name="" value="" type="checkbox"> <label for="id6">Label6</label>
      </div>
      <div class="checkbox">
        <input id="id7" name="" value="" type="checkbox"> <label for="id7">Label7</label>
      </div>
    </fieldset>
    <fieldset class="vform col-6">
      <h2 class="legend">
        vform
      </h2>
      <div class="file">
        <label for="id8">Label</label> <input type="file" id="id8">
      </div>
      <div class="password text">
        <label for="id9">Label</label> <input type="password" id="id9">
      </div>
      <div class="text fancy">
        <label for="id10">Other Label</label> <input class="required" type="text" id="id10">
      </div>
      <fieldset class="multi-line no-margin">
        <div class="text">
          <label for="id11">Label</label> <input type="text" id="id11">
        </div>
        <div class="text no-margin">
          <label for="id12" class="replace">Label</label> <input type="text" id="id12">
        </div>
      </fieldset>
    </fieldset>
    <div class="actions">
      <button type="submit" class="btn"><span>Submit</span></button>
    </div>
  </form>
</div>
<?php include("../includes/footer.php"); ?>