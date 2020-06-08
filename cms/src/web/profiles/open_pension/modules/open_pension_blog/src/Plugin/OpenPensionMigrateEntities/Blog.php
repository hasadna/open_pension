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
      ['title' => 'החזקות', 'file' => 'holdings'],
      ['title' => 'אלוקיות', 'file' => 'allocations'],
      ['title' => 'ביצועים', 'file' => 'performance'],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $values = [
      'type' => 'blog',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'body' => [
        'value' => file_get_contents($this->getAssetLibrary('open_pension_blog', "blogs_content/{$row_data['file']}.html")),
        'format' => 'full_html',
        'summary' => '',
        ],
      'uid' => 1,
      'field_image' => $this->createFileObject('open_pension_blog', "blogs_content/{$row_data['file']}.png")
    ];

    return $entity->create($values);
  }

}
