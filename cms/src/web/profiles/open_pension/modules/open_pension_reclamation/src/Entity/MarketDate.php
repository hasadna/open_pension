<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\MarketDateInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the market date entity class.
 *
 * @ContentEntityType(
 *   id = "market_date",
 *   label = @Translation("Market date"),
 *   label_collection = @Translation("Market dates"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\MarketDateListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\MarketDateAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\MarketDateForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\MarketDateForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "market_date",
 *   admin_permission = "access market date overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "instrument_num",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/market-date/add",
 *     "canonical" = "/market_date/{market_date}",
 *     "edit-form" = "/admin/open_pension/reclamations/market-date/{market_date}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/market-date/{market_date}/delete",
 *     "collection" = "/admin/open_pension/reclamations/market-date"
 *   },
 * )
 */
class MarketDate extends ContentEntityBase implements MarketDateInterface {

  use ReclamationEntityFieldsHelper;

  protected static function fieldsMetadata() {
    $fields = [];

    $fields['date_quarter'] = self::dateField(t('Date quarter'));
    $fields['instrument_num'] = self::textField(t('Instrument num'));
    $fields['vol_nominal'] = self::textField(t('A VolNominal'));
    $fields['vol_chas'] = self::textField(t('A VolChas'));
    $fields['price'] = self::textField(t('Price'));
    $fields['price_qoq'] = self::textField(t('Price-QoQ'));
    $fields['price_ave'] = self::textField(t('Price Ave'));
    $fields['registered_capital'] = self::textField(t('Registered Capital'));
    $fields['price_ave_qoq'] = self::textField(t('Price Ave - QoQ'));

    return $fields;
  }

}
