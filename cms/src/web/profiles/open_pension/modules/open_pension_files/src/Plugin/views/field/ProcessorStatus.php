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
    $value = parent::render($values);
    return "🍕";
  }

}
