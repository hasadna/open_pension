<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the mutual fund entity type.
 */
class MutualFundAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view mutual fund');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit mutual fund', 'administer mutual fund'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete mutual fund', 'administer mutual fund'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create mutual fund', 'administer mutual fund'], 'OR');
  }

}
