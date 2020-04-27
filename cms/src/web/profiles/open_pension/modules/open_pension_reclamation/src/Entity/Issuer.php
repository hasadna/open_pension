<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\IssuerInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the issuer entity class.
 *
 * @ContentEntityType(
 *   id = "issuer",
 *   label = @Translation("Issuer"),
 *   label_collection = @Translation("Issuers"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\IssuerListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\IssuerAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\IssuerForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\IssuerForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "issuer",
 *   admin_permission = "access issuer overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "issuer_num",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/issuer/add",
 *     "canonical" = "/issuer/{issuer}",
 *     "edit-form" = "/admin/open_pension/reclamations/issuer/{issuer}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/issuer/{issuer}/delete",
 *     "collection" = "/admin/open_pension/reclamations/issuer"
 *   },
 * )
 */
class Issuer extends ContentEntityBase implements IssuerInterface {

  use ReclamationEntityFieldsHelper;

  public static function fieldsMetadata() {
    $fields = [];

    $fields['issuer_num'] = self::numberField(t('Issuer num'));
    $fields['issuer_id'] = self::numberField(t('Issuer ID'));
    $fields['issuer_name'] = self::textField(t('Issuer name'));
    $fields['sector'] = self::textField(t('Sector'));
    $fields['sector_stub'] = self::textField(t('Sector stub'));
    $fields['sector_nisha'] = self::textField(t('Sector nisha'));

    return $fields;
  }

}
