<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\DateInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the date entity class.
 *
 * @ContentEntityType(
 *   id = "date",
 *   label = @Translation("Date"),
 *   label_collection = @Translation("Dates"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\DateListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\DateAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\DateForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\DateForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "date",
 *   admin_permission = "access date overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "date_code",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/date/add",
 *     "canonical" = "/date/{date}",
 *     "edit-form" = "/admin/open_pension/reclamations/date/{date}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/date/{date}/delete",
 *     "collection" = "/admin/open_pension/reclamations/date"
 *   },
 * )
 */
class Date extends ContentEntityBase implements DateInterface {
  use ReclamationEntityFieldsHelper;

  public static function fieldsMetadata() {
    $fields = [];

    $fields['date_code'] = self::textField(t('Date code'));
    $fields['date'] = self::textField(t('Date code'));

    return $fields;
  }
}
