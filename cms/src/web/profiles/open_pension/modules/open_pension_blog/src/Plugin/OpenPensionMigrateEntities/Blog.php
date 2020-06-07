<?php

namespace Drupal\open_pension_blog\Plugin\OpenPensionMigrateEntities;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;

/**
 * Plugin implementation of the open_pension_migrate_entities.
 *
 * @OpenPensionMigrateEntities(
 *   id = "blog",
 *   label = @Translation("Blog"),
 *   entity = "node"
 * )
 */
class Blog extends OpenPensionMigrateEntitiesPluginBase {

  protected function getRows() {
    return [
      ['title' => 'החזקות', 'file' => 'holdings.html'],
      ['title' => 'אלוקיות', 'file' => 'allocations.html'],
      ['title' => 'ביצועים', 'file' => 'performance.html'],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $file_content = file_get_contents($this->getFilePath("blogs_content/{$row_data['file']}"));

    $values = [
      'type' => 'blog',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'body' => ['value' => $file_content, 'format' => 'full_html', 'summary' => '',],
      'uid' => 1,
    ];

    return $entity->create($values);
  }

}
