<?php

/**
 * @file
 * Provide a custom views field data that isn't tied to any other module.
 */

/**
 * Implements hook_views_data().
 */
function open_pension_files_views_data() {

  $data['views']['table']['group'] = t('Custom Global');
  $data['views']['table']['join'] = [
      // #global is a special flag which allows a table to appear all the time.
    '#global' => [],
  ];

  // todo: check if the plugins are in used.
  $data['views']['send_file_to_processor_field'] = [
    'title' => t('Send file to processor field'),
    'help' => t('Sending file for processing in the process service'),
    'field' => [
      'id' => 'send_file_to_processor_field',
    ],
  ];
  $data['views']['process_file_field'] = [
    'title' => t('Process file'),
    'help' => t('Trigger a process file'),
    'field' => [
      'id' => 'process_file_field',
    ],
  ];
  $data['views']['trigger_file_processor'] = [
    'title' => t('Process file'),
    'help' => t('Trigger a process file'),
    'field' => [
      'id' => 'trigger_file_processor',
    ],
  ];
  $data['views']['download_processed_files'] = [
    'title' => t('Download multiple processed files'),
    'help' => t('Trigger a process file'),
    'field' => [
      'id' => 'download_processed_files',
    ],
  ];


  // Plugins for improve view.
  $data['views']['open_pension_files_uploaded_file_label'] = [
    'title' => t('View uploaded file'),
    'help' => t('Link to view the uploaded file'),
    'field' => [
      'id' => 'open_pension_files_uploaded_file_label',
    ],
  ];

  $data['views']['open_pension_files_processor_status'] = [
    'title' => t('Processor status'),
    'help' => t('Checking the processor status'),
    'field' => [
      'id' => 'open_pension_files_processor_status',
    ],
  ];

  return $data;
}
