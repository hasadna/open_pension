<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\InstrumentTypeInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the instrument type entity class.
 *
 * @ContentEntityType(
 *   id = "instrument_type",
 *   label = @Translation("Instrument type"),
 *   label_collection = @Translation("Instrument types"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\InstrumentTypeListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\InstrumentTypeAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\InstrumentTypeForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\InstrumentTypeForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "instrument_type",
 *   admin_permission = "access instrument type overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "code",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/instrument-type/add",
 *     "canonical" = "/instrument_type/{instrument_type}",
 *     "edit-form" = "/admin/open_pension/reclamations/instrument-type/{instrument_type}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/instrument-type/{instrument_type}/delete",
 *     "collection" = "/admin/content/instrument-type"
 *   },
 * )
 */
class InstrumentType extends ContentEntityBase implements InstrumentTypeInterface {

  use ReclamationEntityFieldsHelper;

  protected static function fieldsMetadata() {
    $fields = [];

    $fields['code'] = self::textField(t('Code'));
    $fields['liquidity'] = self::textField(t('Liquidity'));
    $fields['instrument_type'] = self::textField(t('Instrument type'));

    return $fields;
  }

}
