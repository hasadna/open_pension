<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\open_pension_reclamation\Entity\ReclamationEntityFieldsHelper;

trait ReclamationBuildRowHelperTrait {

  public static function appendFieldsRowsSimple($keys, ContentEntityInterface $entity) {
    $fields['id'] = $entity->id();
    $fields['label'] = $entity->toLink();

    foreach ($keys as $key) {
      $fields[$key] = $entity->get($key)->value;
    }

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    return self::appendFieldsRowsSimple(self::$fields, $entity) + parent::buildRow($entity);
  }
}
