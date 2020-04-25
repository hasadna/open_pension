<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\InstrumentSubTypeInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the instrument sub type entity class.
 *
 * @ContentEntityType(
 *   id = "instrument_sub_type",
 *   label = @Translation("Instrument sub type"),
 *   label_collection = @Translation("Instrument sub types"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\InstrumentSubTypeListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\InstrumentSubTypeAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\InstrumentSubTypeForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\InstrumentSubTypeForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "instrument_sub_type",
 *   admin_permission = "access instrument sub type overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "code",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/instrument-sub-type/add",
 *     "canonical" = "/instrument_sub_type/{instrument_sub_type}",
 *     "edit-form" = "/admin/open_pension/reclamations/instrument-sub-type/{instrument_sub_type}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/instrument-sub-type/{instrument_sub_type}/delete",
 *     "collection" = "/admin/open_pension/reclamations/instrument-sub-type"
 *   },
 * )
 */
class InstrumentSubType extends ContentEntityBase implements InstrumentSubTypeInterface {

  use ReclamationEntityFieldsHelper;

  public static function fieldsMetadata() {
    $fields = [];

    $fields['code'] = self::textField(t('Code'));
    $fields['type'] = self::textField(t('Type'), FALSE);
    $fields['stat'] = self::textField(t('Stat'), FALSE);

    return $fields;
  }

}
