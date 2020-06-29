<?php

namespace Drupal\open_pension_fetcher;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the open pension links entity type.
 */
class OpenPensionLinksAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view open pension links');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit open pension links', 'administer open pension links'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete open pension links', 'administer open pension links'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create open pension links', 'administer open pension links'], 'OR');
  }

}
