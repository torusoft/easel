<?php
// for making .cycle() slideshows
// currently used in ofield/simplycremations, lippincott

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
      'img' => 'img',
      'url' => 'url',
    );
    $opts = array_merge(  $defaults, $options );

    $built = $this->build_slides($slides, $opts);

    return $built;

  }


  public function videos( $options = array(), $slides ) {
    $slides = $slides ? $slides : $this->slideset;
    $defaults = array(
      'width' => '640',
      'height' => '360',
      'preload' => false,
      'autoplay' => false,
      'controls' => false,
      'slide_class' => 'slide',
      'id_prefix' => 'v-',
      'return_type' => 'string',

    );
    $opts = array_merge(  $defaults, $options );

    $videos = $this->build_videos($slides, $opts);

    return $videos;

  }

  private function has_video($video) {
    $has = false;
    $videofiles = isset($video['files']) ? $video['files'] : (array)$video;
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

      $s['url'] = isset($s[ $opts['url'] ]) ? $s[ $opts['url'] ] : '';
      $s['img'] = isset($s[ $opts['img'] ]) ? $s[ $opts['img'] ] : '';

      $slide_class = $opts['slide_class'];
      $has_video = $this->has_video($s['video']);
      $has_link = !empty($s['url']);
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
    $attr_opts = array(
      'preload',
      'autobuffer',
      'width',
      'height',
      'poster',
      'controls',
      'id',
    );

    foreach ($items as $id => $s) :
      $has_video = $this->has_video($s['video']);
      $multi_source = false;
      if (!$has_video) { continue; }

      // normalize a couple opts to be added to video attributes
      $opts['id'] = $opts['id_prefix'] . $id;
      $opts['poster'] = $s['img'];

      $video = $s['video'];
      $source = array();
      $video_attrs = array();

      $videofiles = (array)$video;
      if ( isset($video['files']) ):
        $videofiles = $video['files'];
        $opts['width'] = isset( $video['width'] ) && $video['width'] ? $video['width'] : $opts['width'];
        $opts['height'] = isset( $video['height'] ) && $video['height'] ? $video['height'] : $opts['height'];
      endif;

      // gather src and type attrs, and possibly <source>
      foreach ($videofiles as $type => $file):
        // make sure $file isn't empty string
        if ($file) :
          // $file = '/files/videos/VTS_01_3.mp4';
          $video_attrs['src'] = $file;
          if ( !preg_match('/^\d+$/', $type) ):
            $codec = strpos($type, '.m4v') > 0 ? 'video/mp4' : $type;
            $video_attrs['type'] = $codec;
          endif;

          $type_attr = $type ? ' type="' . $type . '"' : '';
          $source[] = '<source src="' . $file . '"' . $type_attr . '></source>';
        endif;
      endforeach;

      // if no sources, skip this video
      if ( empty($source) ) {
        continue;
      } elseif ( count($source) > 1 ) {
        $multi_source = true;
      }

      // build up video attributes

      for ($i=0; $i < count($attr_opts); $i++) {
        $video_attrs[ $attr_opts[$i] ] = $opts[ $attr_opts[$i] ];
      }

      $item = '<video';
        $item .= $this->build_attrs($video_attrs, $multi_source);
      $item .= '>';
        $item .= $multi_source ? implode("\n", $source) : '';
      $item .= '</video>';

      $item_list[] = $item;

    endforeach;

    if ($opts['return_type'] == 'array'):
      return $item_list;
    endif;

    $item_list = implode("\n", $item_list);
    return $item_list;
  }

  private function build_attrs($attrs, $multi) {
    $attr_string = '';

    if ($multi):
      unset($attrs['src']);
      unset($attrs['type']);
    endif;

    if (!$attrs['autoplay']):
      $attrs['autobuffer'] = true;
    endif;

    foreach ($attrs as $name => $val):
      if ($val):
        $attr_string .= ' ';
        $attr_string .= $name . '="';
        $attr_string .= $val === true ? $name : $val;
        $attr_string .= '"';
      endif;

    endforeach;

    return $attr_string;
  }

}
?>
