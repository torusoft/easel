<?php
// split string into array of inputs or options
$file_input_count = 0;
function split_values($str) {
  $split_values = array();

  $fields = preg_split('/[\r\n]+/', $str);
  $subgroups = 0;
  foreach ($fields as $field) {
    $values = preg_split('/\s*:\s*/', trim($field));

    if ( !isset($values[1]) ) {
      $values[1] = $values[0];
    }
    if ( $values[0] == '-----' ) {
      $values[1] .= $subgroups++;
    }
    if ( isset($values[2]) ) {
      $values[0] = array($values[0], $values[2]);
    }

    $split_values[$values[1]] = $values[0];

  }
  return $split_values;
}

// Strip array notation brackets off field names
function strip_braces($str) {
  return str_replace('[]', '', $str);
}

// build array of HTML attributes into a string
function build_attr($array) {
  $str = '';
  $filtered = array_filter($array);
  foreach ($filtered as $attr => $value) {
    $str .= ' ' . $attr . '="';
    $str .= is_array($value) ? implode(' ', $value) : $value;
    $str .= '"';
  }
  return $str;
}

// Populates the field HTML
function build_input($field, $required_mark) {
  global $file_input_count;
  // define vars
  $div_class = @trim($field['div_class']);

  $field['select_options'] = array();
  $field['html'] = '';
  $field['div_class'] = $div_class ? array( $div_class ) : array();
  $field['extra_element'] = @$field['extra_element'] ? $field['extra_element'] : '';
  $field['attr'] = array(
    'type' => '',
    'name' => $field['name'],
    'id' => strip_braces(@$field['id'] ? $field['id'] : $field['name']),
    'rows' => '',
    'class' => array(),
    'cols' => '',
    'placeholder' => '',
    'required' => '',
  );
  if ( isset($field['attrs']) ) {
    foreach ($field['attrs'] as $key => $value) {
      $field['attr'][$key] = $value;
    }
  }
  // classes
  if ( isset($field['input_class']) ) {
    $field['attr']['class'][] = trim($field['input_class']);
  }

  if ( !empty($field['required']) ) {
    $field['attr']['class'][] = 'required';
  } else {
    $required_mark = '';
  }
  if ( !empty($field['validation']) ) {
    $field['attr']['class'][] = $field['validation'];
  }

  $field['div_class'][] = trim($field['type']);

  // labels
  $label = trim($field['label']);
  if ($label) {
    $label = '<label for="' . $field['attr']['id'] . '">' . $field['label'] . $required_mark . '</label>';
  } else {
    $field['div_class'][] = 'no-label';
  }

  switch ($field['type']) {
    //
    // textareas
    case 'textarea':
      $field['div_class'][] = 'text';
      $field['attr']['rows'] = '8';
      $field['attr']['cols'] = '40';
      $field['html'] .= $label
                      . '<textarea'
                      . build_attr($field['attr'])
                      . '>'
                      . $field['value']
                      . '</textarea>';
      break;

    // selects
    case 'multi-select':
      $field['attr']['multiple'] = 'multiple';
    case 'select':
      $field['select_options'] = split_values($field['value']);

       $field['html'] .= $label
                     . '<select'
                     . build_attr($field['attr'])
                     . '>';
       foreach ($field['select_options'] as $label => $value) {
         $field['html'] .= '<option value="' . $value . '">' . $label .'</option>';
       }
       $field['html'] .= '</select>';
      break;
    case 'checkbox':
    case 'radio':
      // default value if not present
      $field['attr']['type'] = $field['type'];
      $field['attr']['value'] = $field['value'] ? $field['value'] : '1';

      $field['html'] .= '<input'
                      . build_attr($field['attr'])
                      . '>'
                      . $label;
      break;

    case 'file':
      $field['div_class'][] = 'text';

      $file_input_count++;
      $field['attr']['type'] = $field['type'];
      $input_name = $field['type'] . $file_input_count;
      $field['attr']['name'] = $input_name;
      $field['attr']['id'] = $input_name;
      if ($label) {
        $label = '<label for="' . $field['attr']['id'] . '">' . $field['label'] . '</label>';
      }


      $field['html'] .= $field['extra_element']
                      . $label
                      . '<input'
                      . build_attr($field['attr'])
                      . '>';
      break;


    // all other input tag inputs
    default:
      if ($field['type'] == 'number') {
        $field['attr']['type'] = 'text';
        $field['attr']['pattern'] = '[-+.0-9]*';
      } else {
        $field['attr']['type'] = $field['type'];
      }


      if (!in_array('text', $field['div_class'])) {
        $field['div_class'][] = 'text';
      }

      // placeholder if value present
      $field['attr']['placeholder'] = $field['value'] ? $field['value'] : '';


      $field['html'] .= $field['extra_element']
                      . $label
                      . '<input'
                      . build_attr($field['attr'])
                      . '>';
      break;
  }

  // return
  $field['html']  = '<div class="' . implode(' ', $field['div_class']) . '">'
                  . $field['html']
                  . '</div>';
  return $field;
}

// Splits groups into their own fields, wrapped in a fieldset
function build_group($field, $required_mark) {
  $group_fields = array();
  $split_str = split_values($field['value']);
  $counter = 0;
  foreach ($split_str as $label => $value) {

    $attrs = array();
    $val = $value;
    if ( is_array($value) ) {
      $val = array_shift($value);
      $attrs = $value;
    }
    $group_fields[$counter] = array(
      'type' => preg_replace('/.group$/', '', $field['type']),
      'name' => $field['type'] == 'checkbox-group' ? $field['name'] . '[]' : $field['name'],
      'label' => $label,
      'value' => $val,
      'id' => $field['name'] . '-' . $val,
    );

    if (count($attrs)) {
      $group_fields[$counter]['attrs'] = array();
    }
    foreach ($attrs as $attr) {
     $group_fields[$counter]['attrs'][$attr] = $attr;
    }

    $counter++;
  }

  $fs_class = array($field['type']);
  if ($field['required']) {
    $fs_class[] = 'choose-one';
  } else {
    $required_mark = '';
  }
  if ( isset($field['div_class']) ) {
    $field['div_class'] = array( trim($field['div_class']) );

    foreach ($field['div_class'] as $divclass) {
     $fs_class[] = $divclass;
    }

  }
  if (!$field['label']) {
    $fs_class[] = 'no-label';
  }

  $legend_tag = @$field['legend_tag'] ? $field['legend_tag'] : 'h3';
  $field['html']  = '<fieldset class="' . implode(' ', $fs_class) . '">';
  if($field['label']) {
    $field['html'] .= '<'
                    . $legend_tag
                    . ' class="legend">'
                    . $field['label']
                    . $required_mark
                    . '</' . $legend_tag . '>';
  }

  $subgroups = array_count_values($split_str);
  $subgroups = $subgroups && isset($subgroups['-----']) ? $subgroups['-----'] : false;

  if ($subgroups) {
    $subgroups++;
    $field['html'] .= '<div class="sub-group sub-group-' . $subgroups . '">';
  }

  foreach ($group_fields as $group_field) {
    if ($group_field['value'] == '-----') {
      $field['html'] .= '</div><div class="sub-group sub-group-' . $subgroups . '">';
    } else {
      $build_field = build_input($group_field, $required_mark);
      $field['html'] .= $build_field['html'];
    }
  }
  if ( $subgroups ) {
    $field['html'] .= '</div>';
  }

  $field['html'] .= '</fieldset>';
  return $field;
}

// build all fields, separate groups from fields
function build_form($fields, $required_mark = '') {
  $array = array();
  foreach ($fields as $key => $field) {
    // trim whitespace from values
    $field['value'] = trim($field['value']);
    if(preg_match('/.group$/', $field['type'])) {
      $array[] = build_group($field, $required_mark);
    }
    else {
      $array[] = build_input($field, $required_mark);
    }
  }

  return $array;
}
?>