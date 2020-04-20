<?php

namespace Drupal\open_pension_reclamation\Entity;

use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\RevisionableContentEntityBase;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_reclamation\InstrumentTypeCodeInterface;

/**
 * Defines the instrument type code entity class.
 *
 * @ContentEntityType(
 *   id = "open_pension_dim_file",
 *   label = @Translation("Instrument Type Code"),
 *   label_collection = @Translation("Instrument Type Codes"),
 *   handlers = {
 *     "view_builder" = "Drupal\open_pension_reclamation\InstrumentTypeCodeViewBuilder",
 *     "list_builder" = "Drupal\open_pension_reclamation\InstrumentTypeCodeListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_reclamation\InstrumentTypeCodeAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_reclamation\Form\InstrumentTypeCodeForm",
 *       "edit" = "Drupal\open_pension_reclamation\Form\InstrumentTypeCodeForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "instrument_type_code",
 *   revision_table = "instrument_type_code_revision",
 *   show_revision_ui = TRUE,
 *   admin_permission = "access instrument type code overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "revision" = "revision_id",
 *     "label" = "title",
 *     "uuid" = "uuid"
 *   },
 *   revision_metadata_keys = {
 *     "revision_created" = "revision_timestamp",
 *     "revision_log_message" = "revision_log"
 *   },
 *   links = {
 *     "add-form" = "/admin/content/instrument-type-code/add",
 *     "canonical" = "/instrument_type_code/{instrument_type_code}",
 *     "edit-form" = "/admin/content/instrument-type-code/{instrument_type_code}/edit",
 *     "delete-form" = "/admin/content/instrument-type-code/{instrument_type_code}/delete",
 *     "collection" = "/admin/content/instrument-type-code"
 *   },
 * )
 */
class InstrumentTypeCode extends RevisionableContentEntityBase implements InstrumentTypeCodeInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public function getTitle() {
    return $this->get('title')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setTitle($title) {
    $this->set('title', $title);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['code'] = BaseFieldDefinition::create('string')
      ->setRevisionable(TRUE)
      ->setLabel(t('Code'))
      ->setDescription(t('The code of the instrument type'))
      ->setRequired(TRUE)
      ->setSetting('max_length', 255)
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'string',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('view', TRUE);

    $fields['liquidity'] = BaseFieldDefinition::create('string')
      ->setRevisionable(TRUE)
      ->setLabel(t('Liquidity'))
      ->setDescription(t('The liquidity of the instrument type'))
      ->setRequired(TRUE)
      ->setSetting('max_length', 255)
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'string',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('view', TRUE);

    $fields['instrument_type'] = BaseFieldDefinition::create('string')
      ->setRevisionable(TRUE)
      ->setLabel(t('Instrument type'))
      ->setDescription(t('The instrument type of the instrument type'))
      ->setRequired(TRUE)
      ->setSetting('max_length', 255)
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'string',
        'weight' => -5,
      ])
      ->setDisplayConfigurable('view', TRUE);

    return $fields;
  }

}
