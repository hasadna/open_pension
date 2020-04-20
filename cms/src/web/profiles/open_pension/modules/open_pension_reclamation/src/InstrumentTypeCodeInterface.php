<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining an instrument type code entity type.
 */
interface InstrumentTypeCodeInterface extends ContentEntityInterface, EntityChangedInterface {

  /**
   * Gets the instrument type code title.
   *
   * @return string
   *   Title of the instrument type code.
   */
  public function getTitle();

  /**
   * Sets the instrument type code title.
   *
   * @param string $title
   *   The instrument type code title.
   *
   * @return \Drupal\open_pension_reclamation\InstrumentTypeCodeInterface
   *   The called instrument type code entity.
   */
  public function setTitle($title);

  /**
   * Gets the instrument type code creation timestamp.
   *
   * @return int
   *   Creation timestamp of the instrument type code.
   */
  public function getCreatedTime();

  /**
   * Sets the instrument type code creation timestamp.
   *
   * @param int $timestamp
   *   The instrument type code creation timestamp.
   *
   * @return \Drupal\open_pension_reclamation\InstrumentTypeCodeInterface
   *   The called instrument type code entity.
   */
  public function setCreatedTime($timestamp);

}
