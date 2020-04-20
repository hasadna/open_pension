<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the instrument type code entity type.
 */
class InstrumentTypeCodeAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view instrument type code');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit instrument type code', 'administer instrument type code'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete instrument type code', 'administer instrument type code'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create instrument type code', 'administer instrument type code'], 'OR');
  }

}
