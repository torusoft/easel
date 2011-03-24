<?php
// for making .cycle() slideshows

class FM_gallery
{

  function __construct( $slideset = array() ) {
    $this->slideset = $slideset;
    return $slideset;
  }

  public function slides( $options = array(), $slides ) {
    $slides = $slides ? $slides : $this->slideset;
    $defaults = array(
      'slide_class' => 'slide',
      'id_prefix' => 's-',
      'return_type' => 'string',
    );
    $opts = array_merge(  $defaults, $options );

    $built = $this->build_slides($slides, $opts);

    return $built;

  }


  public function videos( $options = array(), $slides ) {
    $slides = $slides ? $slides : $this->slideset;
    $defaults = array(
      'slide_class' => 'slide',
      'id_prefix' => 'v-',
      'return_type' => 'string',
      'preload' => false,
    );
    $opts = array_merge(  $defaults, $options );

    $videos = $this->build_videos($slides, $opts);

    return $videos;

  }

  private function has_video($video) {
    $has = false;
    $videofiles = (array)$video;
    foreach ($videofiles as $type => $file):
      if ($file) :
        $has = true;
        return $has;
      endif;
    endforeach;
    return $has;
  }

  private function build_slides($items, $opts) {
    $item_list = array();
    $first_slide = true;

    foreach ($items as $id => $s) {
      $slide_html = '';
      $slide_class = $opts['slide_class'];
      $has_video = $this->has_video($s['video']);
      $has_link = isset($s['url']) && !empty($s['url']);
      if ($first_slide):
        $slide_class .= ' first';
        $first_slide = false;
      else:
        $slide_class .= ' js-invisible';
      endif;

        // build slide from inside out
        $slide_html .= $s['img'] ? '<img src="' . $s['img'] . '" alt="" />' : '';

        if ( $has_link ):
          $slide_html = '<a href="' . $s['url'] . '">' . $slide_html . '</a>';
        endif;
        if ( $has_video ):
          $slide_html = '<div class="video-slide">' . $slide_html . '</div>';
        endif;

      $slide_div = '<div';
        $slide_div .= ' class="' . $slide_class . '"';
        $slide_div .= ' id="' . $opts['id_prefix'] . $id . '"';
      $slide_div .= '>';

      $slide_html = $slide_div . $slide_html . '</div>';

      $item_list[] = $slide_html;
    }

    if ($opts['return_type'] == 'array') {
       return $item_list;
    }

    $item_list = implode("\n", $item_list);
    return $item_list;

  }

  private function build_videos($items, $opts) {
    $item_list = array();

    foreach ($items as $id => $s) :
      $has_video = $this->has_video($s['video']);
      if (!$has_video) { continue; }

      $video = $s['video'];

      $videofiles = (array)$video;
      $source = array();
      foreach ($videofiles as $type => $file):
        if ($file) :
        $type_attr = ( preg_match('/^\d+$/', $type) ) ? '' : ' type="' . $type . '"';
        $source[] = '<source src="' . $file . '"' . $type_attr . '></source>';
        endif;
      endforeach;

      if (!empty($source)):
        $preload = $opts['preload'] ? ' preload="preload"' : '';
        $item = '<video';
          $item .= ' id="' . $opts['id_prefix'] . $id . '"';
          $item .= ' poster="' .  $s['img'] . '"';
          $item .= $preload;
          $item .= ' width="' . $opts['width'] . '" height="' . $opts['height'] . '"';
        $item .= '>';
          $item .= implode("\n", $source);
        $item .= '</video>';

        $item_list[] = $item;
      endif;
    endforeach;

    if ($opts['return_type'] == 'array'):
      return $item_list;
    endif;

    $item_list = implode("\n", $item_list);
    return $item_list;
  }


}
?>
