<?php

namespace Drupal\open_pension_page_element\Plugin\OpenPensionMigrateEntities;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;

/**
 * Plugin implementation of the open_pension_migrate_entities.
 *
 * @OpenPensionMigrateEntities(
 *   id = "page_element",
 *   label = @Translation("Page element"),
 *   entity = "node"
 * )
 */
class PageElement extends OpenPensionMigrateEntitiesPluginBase {

  protected function getRows() {
    return [
      ['title' => 'עמוד ראשי - אודותינו', 'file' => 'front-page-about-us.html', 'field_page' => 'front', 'field_section' => 'above-footer'],
      ['title' => 'עמוד ראשי - כסף', 'file' => 'front-page-money.html', 'field_page' => 'front', 'field_section' => 'upper'],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    return [
      'type' => 'page_element',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'body' => [
        'value' => file_get_contents($this->getAssetLibrary('open_pension_page_element', $row_data['file'])),
        'format' => 'full_html',
        'summary' => '',
      ],
      'field_page' => $row_data['field_page'],
      'field_section' => $row_data['field_section'],
      'uid' => 1,
    ];
  }

}
