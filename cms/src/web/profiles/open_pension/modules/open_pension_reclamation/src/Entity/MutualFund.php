<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\MutualFundInterface;
use Drupal\user\EntityOwnerTrait;

/**
 * Defines the mutual fund entity class.
 *
 * @ContentEntityType(
 *   id = "mutual_fund",
 *   label = @Translation("Mutual fund"),
 *   label_collection = @Translation("Mutual funds"),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_reclamation\MutualFundListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\MutualFundAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\MutualFundForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\MutualFundForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "mutual_fund",
 *   admin_permission = "access mutual fund overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "instrument_number",
 *     "uuid" = "uuid",
 *     "owner" = "uid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/reclamations/mutual-fund/add",
 *     "canonical" = "/mutual_fund/{mutual_fund}",
 *     "edit-form" = "/admin/open_pension/reclamations/mutual-fund/{mutual_fund}/edit",
 *     "delete-form" = "/admin/open_pension/reclamations/mutual-fund/{mutual_fund}/delete",
 *     "collection" = "/admin/open_pension/reclamations/mutual-fund"
 *   },
 * )
 */
class MutualFund extends ContentEntityBase implements MutualFundInterface {

  use ReclamationEntityFieldsHelper;

  protected static function fieldsMetadata() {
    $fields = [];

    $fields['instrument_number'] = self::simpleTextField(t('Instrument number'));
    $fields['instrument_name'] = self::simpleTextField(t('Instrument name'));
    $fields['category'] = self::simpleTextField(t('Category'));
    $fields['sub_category'] = self::simpleTextField(t('Sub category'));
    $fields['giografic'] = self::simpleTextField(t('Giografic'));

    return $fields;
  }

}
