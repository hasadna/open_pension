<?php

namespace Drupal\open_pension_blog\Plugin\OpenPensionMigrateEntities;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;

/**
 * Plugin implementation of the open_pension_migrate_entities.
 *
 * @OpenPensionMigrateEntities(
 *   id = "article",
 *   label = @Translation("Article"),
 *   entity = "node"
 * )
 */
class Article extends OpenPensionMigrateEntitiesPluginBase {

  protected function getRows() {
    return [
      [
        'title' => '"יותר טוב שליש מכלום": המחיר שנשלם בגלל נפילת מניית דלק',
        'url' => 'https://www.youtube.com/watch?v=WneQT3Hifmg',
        'image' => 'take_it_or_leave_it.png',
      ],
      [
        'title' => 'כמה מיליארדים מכספי החוסכים הישראלים מושקעים בשווקים הסיניים, ומי הגוף שנאלץ לצמצם חשיפה?',
        'url' => 'https://www.globes.co.il/news/article.aspx?did=1001317148',
        'image' => 'article-globes-loans.png',
      ],
      [
        'title' => 'קשה להבין לאן הכסף הולך": הסוד של עולם הפנסיה',
        'url' => 'https://www.youtube.com/watch?v=Jl0jjCABE7Q',
        'image' => 'hard.png',
      ],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $values = [
      'type' => 'article',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'uid' => 1,
      'field_image' => $this->createFileObject('migration_assets', "migration_assets/{$row_data['image']}")
    ];

    return $entity->create($values);
  }

}
