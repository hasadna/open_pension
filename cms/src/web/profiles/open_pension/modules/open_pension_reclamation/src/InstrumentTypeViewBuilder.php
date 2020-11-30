<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityViewBuilder;

/**
 * Provides a view controller for an instrument type entity type.
 */
class InstrumentTypeViewBuilder extends EntityViewBuilder {

  /**
   * {@inheritdoc}
   */
  protected function getBuildDefaults(EntityInterface $entity, $view_mode) {
    $build = parent::getBuildDefaults($entity, $view_mode);
    // The instrument type has no entity template itself.
    unset($build['#theme']);
    return $build;
  }

}
