<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining an open pension links entity type.
 */
interface OpenPensionLinksInterface extends ContentEntityInterface, EntityChangedInterface {

  /**
   * Gets the open pension links creation timestamp.
   *
   * @return int
   *   Creation timestamp of the open pension links.
   */
  public function getCreatedTime();

  /**
   * Sets the open pension links creation timestamp.
   *
   * @param int $timestamp
   *   The open pension links creation timestamp.
   *
   * @return \Drupal\open_pension_fetcher\OpenPensionLinksInterface
   *   The called open pension links entity.
   */
  public function setCreatedTime($timestamp);

}
