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
        'profile_picture' => 'moshe-kashi.jpg',
        'weight' => 0,
      ],
      [
        'title' => 'רועי סגל',
        'position' => 'מוביל טכני',
        'profile_picture' => 'roy-segall.jpg',
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

    if ($row_data['profile_picture']) {
      $row['field_profile_picture'] = $this->createFileObject('open_pension_staff', $row_data['profile_picture']);
    }

    return $row;
  }

}
