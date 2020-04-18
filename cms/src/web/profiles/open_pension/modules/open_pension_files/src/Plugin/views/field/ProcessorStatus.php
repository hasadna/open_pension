<?php

namespace Drupal\open_pension_files\Plugin\views\field;

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
      '@trigger-link' => '<b>Trigger link</b>',
      '@download-link' => '<b>Download link</b>',
    ];

    if ($other_service_status == NULL) {
      return t('Send to processor: @trigger-link', $params);
    }

    if ($status == self::STATUS_NEW) {
      return t('New (@process-status) - Trigger process', $params);
    }
    else {
      return t('@process-status (@process-id), @download-link', $params);
    }
  }

}
