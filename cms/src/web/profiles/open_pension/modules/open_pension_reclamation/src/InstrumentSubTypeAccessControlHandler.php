<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the instrument sub type entity type.
 */
class InstrumentSubTypeAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view instrument sub type');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit instrument sub type', 'administer instrument sub type'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete instrument sub type', 'administer instrument sub type'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create instrument sub type', 'administer instrument sub type'], 'OR');
  }

}
