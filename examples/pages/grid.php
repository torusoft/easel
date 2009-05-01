<?php include("../includes/header_top.php"); ?>
<?php include("../includes/header_bottom.php"); ?>
<h1 class="page-title">Grid <span class="amp">&amp;</span> Layout</h1>
<div class="content block">
  <h2><code>class="content block"</code></h2>
  <p class="no-margin">This is a 24 column grid. Without using any <code>col-x</code> classes, this container stretches the full width. The <code>block</code> class gives this a standard bottom margin.</p></div>
<div class="content">
  <div class="col-12">
    <h2><code>class="col-12"</code></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
  <div class="col-12 col-last">
    <h2><code>class="col-12 col-last"</code></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</div>
<div class="content">
  <div class="prepend-4 col-20 col-last">
    <h2><code>class="prepend-4 col-20 col-last"</code></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</div>
<div class="content">
  <div class="append-16 col-8 col-last">
    <h2><code>class="append-12 col-12 col-last"</code></h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</div>
<div class="content">
  <div class="col-12">
    <h2><code>class="col-12"</code></h2>
    <div class="col-6 highlight">
      <h3><code>class="col-6 highlight"</code></h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div class="col-6 col-last">
      <h3><code>class="col-6 col-last"</code></h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
  <div class="col-12 col-last highlight block">
    <h2><code>class="col-12 col-last highlight block"</code></h2>
    <div class="col-8">
      <h3><code>class="col-8"</code></h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div class="col-4 col-last">
      <h3><code>class="col-4 col-last"</code></h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
</div>
<div class="content">
  <div class="col-12">
    <h2><code>class="col-12"</code></h2>
    <p class="note">If you put a <code>col-x</code> class on a <code>fieldset</code>, all containing <code>input</code>s will inherit the proper width.</p>
    <form action="#">
      <h3><code>class="col-8 vform"</code></h3>
      <fieldset class="col-8 vform">
        <div class="text">
          <label for="id1">Text Input</label> <input type="text" id="id1">
        </div>
        <div class="text textarea">
          <label for="id2">Textarea</label> 
          <textarea id="id2">Content</textarea>
        </div>
        <div class="select">
          <label for="id3">Select</label>
          <select id="id3">
            <option>
              Option 1
            </option>
            <option>
              Option 2
            </option>
          </select>
        </div>
      </fieldset>
      <div class="actions">
        <button class="btn" type="submit"><span>&lt;button class=&quot;btn&quot; type=&quot;submit&quot;&gt;&lt;span&gt;Send&lt;/span&gt;&lt;/button&gt;</span></button>
      </div>
    </form>
  </div>
  <div class="col-12 col-last">
    <h2><code>class="col-12 col-last"</code></h2>
    <p class="note">&hellip; or you can specify widths per <code>input</code>. This is necessary for the <code>hform</code> class, as the <code>label</code> width and <code>input</code> width both need to be specified.</p>
    <form action="#">
      <fieldset class="hform">
        <div class="text">
          <label for="id4" class="col-4">Text Input</label> <input class="col-4 col-last" type="text" id="id4">
        </div>
        <div class="text textarea">
          <label for="id5" class="col-4">Textarea</label> 
          <textarea id="id5" class="col-8 col-last">Content</textarea>
        </div>
        <div class="select">
          <label for="id6" class="col-4">Select</label> <select id="id6" class="col-6 col-last">
            <option>
              Option 1
            </option>
            <option>
              Option 2
            </option>
          </select>
        </div>
      </fieldset>
      <div class="actions">
        <button class="btn" type="submit"><span class="col-4 col-last">.col-4.col-last</span></button>
      </div>
    </form>
  </div>
</div>
<?php include("../includes/footer.php"); ?>
