<?php

/**
 * @file
 * Contains open_pension_files\open_pension_files.views.inc..
 * Provide a custom views field data that isn't tied to any other module. */


/**
* Implements hook_views_data().
*/
function open_pension_files_views_data() {

    $data['views']['table']['group'] = t('Custom Global');
    $data['views']['table']['join'] = [
      // #global is a special flag which allows a table to appear all the time.
      '#global' => [],
    ];

    $data['views']['send_file_to_processor_field'] = [
        'title' => t('Send file to processor field'),
        'help' => t('Sending file for processing in the process service'),
        'field' => [
            'id' => 'send_file_to_processor_field',
        ],
    ];
    return $data;
}
