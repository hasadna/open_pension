<?php

namespace Drupal\open_pension_article\Plugin\OpenPensionMigrateEntities;

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
        'authors' => ['כאן 11'],
        'date' => '2020-03-15',
      ],
      [
        'title' => 'כמה מיליארדים מכספי החוסכים הישראלים מושקעים בשווקים הסיניים, ומי הגוף שנאלץ לצמצם חשיפה?',
        'url' => 'https://www.globes.co.il/news/article.aspx?did=1001317148',
        'image' => 'article-globes-loans.png',
        'authors' => ['רון שטיין', 'אביב לוי', 'שני מוזס'],
        'date' => '2020-02-04',
      ],
      [
        'title' => 'קשה להבין לאן הכסף הולך": הסוד של עולם הפנסיה',
        'url' => 'https://www.youtube.com/watch?v=Jl0jjCABE7Q',
        'image' => 'hard.png',
        'authors' => ['כאן 11'],
        'date' => '2019-12-17',
      ],
      [
        'title' => "ההלוואת הגמל מחבלות ביכולת לנצל את הירידות",
        'url' => 'https://www.calcalist.co.il/markets/articles/0,7340,L-3803657,00.html',
        'image' => 'article-loans-calcalist.png',
        'date' => '2020-03-26',
        'authors' => ['רחלי בינדמן'],
      ],
    ];
  }

  protected function processRow(EntityStorageInterface $entity, array $row_data) {
    $values = [
      'type' => 'article',
      'title' => $row_data['title'],
      'langcode' => 'en',
      'uid' => 1,
      'field_image' => $this->createFileObject('open_pension_article', $row_data['image']),
      'field_link' => $row_data['url'],
      'field_publishing_date' => $row_data['date'],
      'field_authors' => $this->createTerms($row_data['authors'])
    ];

    return $entity->create($values);
  }

  /**
   * Creating a list of terms from authors names.
   *
   * @param $authors
   *  The authors.
   */
  protected function createTerms($authors) {
    $storage = $this->entityManager->getStorage('taxonomy_term');
    $query = $storage->getQuery();

    $terms_ids = [];

    foreach ($authors as $author) {

      if ($ids = $query->condition('name', $author)->execute()) {
        $terms_ids[] = array_keys($ids)[0];
        continue;
      }

      $term = $storage->create(['name' => $author, 'vid' => 'authors']);
      $term->save();

      $terms_ids[] = $term->id();
    }

    return $terms_ids;
  }

}
