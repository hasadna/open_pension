<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a market date entity type.
 */
interface MarketDateInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
