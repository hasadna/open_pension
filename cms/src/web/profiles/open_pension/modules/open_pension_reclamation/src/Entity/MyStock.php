<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\MyStockInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the my stock entity class.
 *
 * @ContentEntityType(
 *   id = "my_stock",
 *   label = @Translation("My stock"),
 *   label_collection = @Translation("My stocks"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\MyStockListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\MyStockAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\MyStockForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\MyStockForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "my_stock",
 *   admin_permission = "access my stock overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "issuer_id",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/my-stock/add",
 *     "canonical" = "/my_stock/{my_stock}",
 *     "edit-form" = "/admin/open_pension/reclamations/my-stock/{my_stock}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/my-stock/{my_stock}/delete",
 *     "collection" = "/admin/open_pension/reclamations/my-stock"
 *   },
 * )
 */
class MyStock extends ContentEntityBase implements MyStockInterface {

  use ReclamationEntityFieldsHelper;

  protected static function fieldsMetadata() {
    $fields = [];

    $fields['issuer_id'] = self::numberField('Issuer ID');
    $fields['issuer_name'] = self::textField('Issuer name');
    $fields['customer_manager'] = self::textField('Customer manager');

    return $fields;
  }

}
