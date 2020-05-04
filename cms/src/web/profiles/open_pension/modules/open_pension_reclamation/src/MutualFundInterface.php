<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a mutual fund entity type.
 */
interface MutualFundInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
