<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining an issuer entity type.
 */
interface IssuerInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
