<?php

namespace Drupal\open_pension_files\Plugin\views\field;

use Drupal\Core\Url;
use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * Provides Processor status field handler.
 *
 * @ViewsField("open_pension_files_processor_status")
 */
class ProcessorStatus extends FieldPluginBase {

  const STATUS_NEW = 'New';
  const PROCESSED = 'processed';
  const PROCESSED_WITH_ERRORS = 'processed with errors';

  /**
   * {@inheritdoc}
   */
  public function query() {
    // Do nothing -- to override the parent query.
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {
    /** @var \Drupal\media\Entity\Media $entity */
    $entity = $this->getEntity($values);

    // Get the process status.
    $status = $entity->get('field_processing_status')->value;
    $other_service_status = $entity->get('field_reference_in_other_service')->value;

    $params = [
      '@process-status' => $status,
      '@process-id' => $other_service_status,
      '@upload-link' => Url::fromRoute('open_pension_files.send_file_to_process_controller_handle_file', ['media' => $entity->id()])->toString(),
      '@process-link' => Url::fromRoute('open_pension_files.process_file', ['media' => $entity->id()])->toString(),
      '@download-link' => open_pension_get_download_link($entity, TRUE),
    ];

    if ($other_service_status == NULL) {
      return t('<a href="@upload-link">Send file for processing</a>', $params);
    }

    if ($status == self::STATUS_NEW) {
      return t('New (@process-id) - <a href="@process-link">Trigger processing</a>', $params);
    }
    else {
      return t('@process-status (@process-id), <a href="@download-link">Download processed file</a>', $params);
    }
  }

}
