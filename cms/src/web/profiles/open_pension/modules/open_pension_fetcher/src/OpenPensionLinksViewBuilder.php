<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityViewBuilder;

/**
 * Provides a view controller for an open pension links entity type.
 */
class OpenPensionLinksViewBuilder extends EntityViewBuilder {

  /**
   * {@inheritdoc}
   */
  protected function getBuildDefaults(EntityInterface $entity, $view_mode) {
    $build = parent::getBuildDefaults($entity, $view_mode);
    // The open pension links has no entity template itself.
    unset($build['#theme']);
    return $build;
  }

}
