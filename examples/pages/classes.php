<?php include("../includes/header_top.php"); ?>
<?php include("../includes/header_bottom.php"); ?>
<h1 class="page-title">Class Reference <span class="amp">&amp;</span> Examples</h1>
<div class="content block">
  <h2>Reset</h2>
  <p>This class removes all margins, padding, backgrounds, etc from any element. If you add it to an ol, ul, or dl, their child elements will also be reset.</p>
  <ul class="reset">
    <li><code>&lt;ul class=&quot;reset&quot;&gt;</code></li>
    <li>two</li>
    <li>three</li>
  </ul>
  <ol class="reset">
    <li><code>&lt;ol class=&quot;reset&quot;&gt;</code></li>
    <li>two</li>
    <li>three</li>
  </ol>
  <dl class="reset">
    <dt><code>&lt;dl class=&quot;reset&quot;&gt;</code></dt>
    <dd>I'm a description</dd>
  </dl>
</div>
<div class="content block">
  <h2>Hiding &amp; Showing</h2>
  <p>
    This stuff will be hidden, so view source if you want to see what is happening.
  </p>
  <h3><code>class="hide"</code></h3>
  <p class="hide">Hide me!</p>
  <h3><code>class="js-hide"</code></h3>
  <p class="js-hide">Hide me if you have javascript!</p>
  <h3><code>class="js-show"</code></h3>
  <p class="js-show">Show me only if you have javascript!</p>
  <h3><code>class="access"</code></h3>
  <p class="access">Hide me, but in an accessibly friendly way!</p>
</div>
<div class="content">  
  <h2>Ruled List</h2>
  <h3><code>class=&quot;ruled&quot;</code></h3>
  <ul class="ruled">
    <li>&lt;code&gt;class=&quot;ruled&quot;&lt;/code&gt;An un-ordered list: Donec commodo.
    </li>
    <li>
      <strong>&lt;strong&gt;Quisque eget eros.&lt;/strong&gt;</strong>
    </li>
    <li>&lt;em&gt;<em>Sed mollis sem eu orci.&lt;/em&gt;</em>
    </li>
    <li>
      <a href="#">&lt;a&gt;Curabitur venenatis porta eros.&lt;/a&gt;</a>
    </li>
    <li>Duis vehicula mi at augue.
    </li>
  </ul>
  <h3><code>class=&quot;ruled links&quot;</code></h3>
  <ul class="ruled links">
    <li><a href="#">&lt;code&gt;class=&quot;ruled links&quot;&lt;/code&gt;An un-ordered list: Donec commodo.</a>
    </li>
    <li>
      <strong><a href="#">&lt;strong&gt;Quisque eget eros.&lt;/strong&gt;</a></strong>
    </li>
    <li><a href="#">&lt;em&gt;<em>Sed mollis sem eu orci.&lt;/em&gt;</em></a>
    </li>
    <li>
      <a href="#">&lt;a&gt;Curabitur venenatis porta eros.&lt;/a&gt;</a>
    </li>
    <li><a href="#">Duis vehicula mi at augue.</a>
    </li>
  </ul>
</div>
<div class="content block">
  <h2>Utility Classes</h2>
  <p class="right"><code>class="right"</code></p>
  <p class="clear"><code>class="clear"</code></p>
  <p class="left"><code>class="left"</code></p>
  <p class="center clear col-6 col-last"><code>class="center" <em class="note">Also needs a defined width, here I'm using a col-6 class for this. Since images have an implicit width, they don't need a width defined.</em></code></p>
  <p class="text-right"><code>class="text-right"</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p class="text-left"><code>class="text-left"</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p class="text-center"><code>class="text-center"</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>
    <span class="uppercase"><code>class="uppercase"</code></span><br>
    <span class="lowercase"><code>class="LOWERCASE"</code></span><br>
    <span class="capitalize"><code>class="capitalize"</code></span><br>
    <span class="smallcaps"><code>class="smallcaps"</code></span>
  </p>
  <ul class="hnav">
    <li><a href="#"><code>class="hnav"</code></a></li>
    <li><a href="#"><code>class="hnav"</code></a></li>
    <li><a href="#"><code>class="hnav"</code></a></li>
  </ul>
  <ul class="vnav">
    <li><a href="#"><code>class="vnav"</code></a></li>
    <li><a href="#"><code>class="vnav"</code></a></li>
    <li><a href="#"><code>class="vnav"</code></a></li>
  </ul>
  <ul class="inav">
    <li><a href="#"><code>class="inav"</code></a></li>
    <li><a href="#"><code>class="inav"</code></a></li>
    <li><a href="#"><code>class="inav"</code></a></li>
  </ul>
  </div>
  <div class="content">
    <h2>Numbers</h2>
    <span class="pos">5 class="pos"</span>
    <span class="neg">5 class="pos"</span>
    <table class="recordset" cellspacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th class="number">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lorem ipsum dolor sit amet</td>
          <td class="number">$100,000,000.89</td>
        </tr>
      </tbody>
    </table>
  </div>
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
    <li class="no-bullet"><code>class="no-bullet"</code></li>
    <li>five</li>
  </ul>
  <p><ins><code>This <code>&lt;ins&gt;</code> has a border</ins>. <ins class="no-border">This one does not: <code>class="no-border"</code></ins></p>
  <p>This can happen if you don't use the <code>.img</code> class (hover over image):</p>
  <a href="#"><img src="/examples/assets/images/mugs.jpg" width="150px" alt="Fusionary Mugs"></a>
  <p>Using <code>class="img"</code> will fix this:</p>
  <a href="#" class="img"><img src="/examples/assets/images/mugs.jpg" width="150px" alt="Fusionary Mugs"></a>
<?php include("../includes/footer.php"); ?>