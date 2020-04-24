<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\ManagerInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the manager entity class.
 *
 * @ContentEntityType(
 *   id = "manager",
 *   label = @Translation("Manager"),
 *   label_collection = @Translation("Managers"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\ManagerListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\ManagerAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\ManagerForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\ManagerForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "manager",
 *   admin_permission = "access manager overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "manager_number",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/manager/add",
 *     "canonical" = "/manager/{manager}",
 *     "edit-form" = "/admin/open_pension/reclamations/manager/{manager}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/manager/{manager}/delete",
 *     "collection" = "/admin/open_pension/reclamations/manager"
 *   },
 * )
 */
class Manager extends ContentEntityBase implements ManagerInterface {

  use ReclamationEntityFieldsHelper;

  protected static function fieldsMetadata() {
    $fields = [];

    $fields['manager_number'] = self::numberField(t('Manager number'));
    $fields['manager_name'] = self::textField(t('Manager name'));

    return $fields;
  }

}
