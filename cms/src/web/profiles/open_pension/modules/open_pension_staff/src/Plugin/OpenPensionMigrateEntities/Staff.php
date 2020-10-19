<?php

namespace Drupal\open_pension_staff\Plugin\OpenPensionMigrateEntities;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;

/**
 * Plugin implementation of the open_pension_migrate_entities.
 *
 * @OpenPensionMigrateEntities(
 *   id = "staff",
 *   label = @Translation("Staff"),
 *   entity = "taxonomy_term"
 * )
 */
class Staff extends OpenPensionMigrateEntitiesPluginBase {

  protected function getRows() {
    return [
      [
        'title' => 'משה קאשי',
        'position' => 'כלכלן ראשי',
        'image' => null,
        'weight' => 0,
      ],
      [
        'title' => 'רועי סגל',
        'position' => 'מוביל טכני',
        'image' => 'roy-segall.png',
        'weight' => 1,
      ],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $row = [
      'vid' => 'staff',
      'name' => $row_data['title'],
      'field_position' => $row_data['position'],
      'weight' => $row_data['weight']
    ];

    if ($row_data['image']) {
      $row['field_image'] = $this->createFileObject('open_pension_staff', $row_data['image']);
    }

    return $row;
  }

}
