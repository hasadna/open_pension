<?php

namespace Drupal\open_pension_files\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * Provides Uploaded file label field handler.
 *
 * @ViewsField("open_pension_files_uploaded_file_label")
 */
class UploadedFileLabel extends FieldPluginBase {

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

    return $entity->toLink(null, 'edit-form')->toString();
  }

}
