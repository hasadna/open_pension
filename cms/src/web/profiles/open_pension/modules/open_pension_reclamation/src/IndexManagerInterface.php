<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining an index manager entity type.
 */
interface IndexManagerInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
