<?php

namespace Drupal\open_pension_core\Plugin\OpenPensionMigrateEntities;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;

/**
 * Plugin implementation of the open_pension_migrate_entities.
 *
 * @OpenPensionMigrateEntities(
 *   id = "basic_page",
 *   label = @Translation("Basic page"),
 *   entity = "node"
 * )
 */
class PageElement extends OpenPensionMigrateEntitiesPluginBase {

  protected function getRows() {
    return [
      ['title' => 'אודותינו', 'file' => 'about-us.html'],
      ['title' => 'מדיניות פרטיות', 'file' => 'privacy.html'],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $values = [
      'type' => 'page',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'body' => [
        'value' => file_get_contents($this->getAssetLibrary('open_pension_core', $row_data['file'])),
        'format' => 'full_html',
        'summary' => '',
        ],
      'uid' => 1,
    ];

    return $entity->create($values);
  }

}
