<?php

namespace Drupal\open_pension_migrate\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines open_pension_migrate_entities annotation object.
 *
 * @Annotation
 */
class OpenPensionMigrateEntities extends Plugin {

  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The human-readable name of the plugin.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $title;

  /**
   * @var string
   */
  public $entity;
}
