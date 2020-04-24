<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\InstrumentInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the instrument entity class.
 *
 * @ContentEntityType(
 *   id = "instrument",
 *   label = @Translation("Instrument"),
 *   label_collection = @Translation("Instruments"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\InstrumentListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\InstrumentAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\InstrumentForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\InstrumentForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "instrument",
 *   admin_permission = "access instrument overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "instrument_number",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/instrument/add",
 *     "canonical" = "/instrument/{instrument}",
 *     "edit-form" = "/admin/open_pension/reclamations/instrument/{instrument}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/instrument/{instrument}/delete",
 *     "collection" = "/admin/open_pension/reclamations/instrument"
 *   },
 * )
 */
class Instrument extends ContentEntityBase implements InstrumentInterface {

  use ReclamationEntityFieldsHelper;

  public static function fieldsMetadata() {
    $fields = [];

    $fields['instrument_number'] = self::textField('Instrument Num');
    $fields['instrument_name'] = self::textField('Instrument Num');
    $fields['isin'] = self::textField('ISIN');
    $fields['issuer_num'] = self::textField('Issuer num');
    $fields['issuer_id'] = self::textField('Issuer ID');
    $fields['instrument_type'] = self::textField('Issuer type');
    $fields['liquidity'] = self::textField('Liquidity');

    return $fields;
  }

}
