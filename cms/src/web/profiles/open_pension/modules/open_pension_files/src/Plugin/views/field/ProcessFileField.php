<?php

namespace Drupal\open_pension_files\Plugin\views\field;

use Drupal\Core\Url;
use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * A handler to provide a field that is completely custom by the administrator.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("process_file_field")
 */
class ProcessFileField extends FieldPluginBase {

  /**
   * {@inheritdoc}
   */
  public function usesGroupBy() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    // Do nothing -- to override the parent query.
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    $options['hide_alter_empty'] = ['default' => FALSE];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {

    /** @var \Drupal\media\Entity\Media $entity */
    $entity = $this->getEntity($values);

    if (!$field_value = $entity->get('field_media_file')->getValue()) {
      return [];
    }

    $link_array = [
      '#type' => 'link',
      '#title' => t('Trigger file process'),
      '#url' => Url::fromRoute('open_pension_files.process_file', ['media' => $entity->id()]),
      '#attributes' => [
        'class' => ['use-ajax'],
        'data-dialog-type' => 'dialog',
      ],
      '#attached' => ['library' => ['core/drupal.ajax']],
    ];

    return drupal_render($link_array);
  }

}
