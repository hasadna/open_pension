<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\user\EntityOwnerInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining an instrument type entity type.
 */
interface InstrumentTypeInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

  /**
   * Gets the instrument type title.
   *
   * @return string
   *   Title of the instrument type.
   */
  public function getTitle();

  /**
   * Sets the instrument type title.
   *
   * @param string $title
   *   The instrument type title.
   *
   * @return \Drupal\open_pension_reclamation\InstrumentTypeInterface
   *   The called instrument type entity.
   */
  public function setTitle($title);

  /**
   * Gets the instrument type creation timestamp.
   *
   * @return int
   *   Creation timestamp of the instrument type.
   */
  public function getCreatedTime();

  /**
   * Sets the instrument type creation timestamp.
   *
   * @param int $timestamp
   *   The instrument type creation timestamp.
   *
   * @return \Drupal\open_pension_reclamation\InstrumentTypeInterface
   *   The called instrument type entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the instrument type status.
   *
   * @return bool
   *   TRUE if the instrument type is enabled, FALSE otherwise.
   */
  public function isEnabled();

  /**
   * Sets the instrument type status.
   *
   * @param bool $status
   *   TRUE to enable this instrument type, FALSE to disable.
   *
   * @return \Drupal\open_pension_reclamation\InstrumentTypeInterface
   *   The called instrument type entity.
   */
  public function setStatus($status);

}
