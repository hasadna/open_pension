<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the market date entity type.
 */
class MarketDateAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view market date');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit market date', 'administer market date'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete market date', 'administer market date'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create market date', 'administer market date'], 'OR');
  }

}
