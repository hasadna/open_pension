<?php

namespace Drupal\open_pension_migrate;

/**
 * Interface for open_pension_migrate_entities plugins.
 */
interface OpenPensionMigrateEntitiesInterface {

  /**
   * Returns the translated plugin label.
   *
   * @return string
   *   The translated title.
   */
  public function label();

}
