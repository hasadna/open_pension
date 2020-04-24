<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\EntityInterface;
use Drupal\open_pension_reclamation\Entity\ReclamationEntityFieldsHelper;

trait ReclamationBuildRowHelperTrait {

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    return ReclamationEntityFieldsHelper::appendFieldsRowsSimple(self::$fields, $entity) + parent::buildRow($entity);
  }
}
