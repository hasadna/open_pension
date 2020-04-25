<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\IndexManagerInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the index manager entity class.
 *
 * @ContentEntityType(
 *   id = "index_manager",
 *   label = @Translation("Index manager"),
 *   label_collection = @Translation("Index managers"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\IndexManagerListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\IndexManagerAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\IndexManagerForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\IndexManagerForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "index_manager",
 *   admin_permission = "access index manager overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "manager_number",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/index-manager/add",
 *     "canonical" = "/index_manager/{index_manager}",
 *     "edit-form" = "/admin/open_pension/reclamations/index-manager/{index_manager}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/index-manager/{index_manager}/delete",
 *     "collection" = "/admin/open_pension/reclamations/index-manager"
 *   },
 * )
 */
class IndexManager extends ContentEntityBase implements IndexManagerInterface {

  use ReclamationEntityFieldsHelper;

  static public function fieldsMetadata() {
    $fields = [];

    $fields['manager_number'] = self::textField('Manager number');
    $fields['manager_name'] = self::textField('Manager name');
    $fields['channel'] = self::textField('Channel');

    return $fields;
  }

}
