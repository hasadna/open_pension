<?php

namespace Drupal\open_pension_files\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_files\OpenPensionStorageFilesInterface;

/**
 * Defines the open pension storage files entity class.
 *
 * @ContentEntityType(
 *   id = "open_pension_storage_files",
 *   label = @Translation("Open Pension Storage Files"),
 *   label_collection = @Translation("Open Pension Storage Filess"),
 *   label_singular = @Translation("open pension storage files"),
 *   label_plural = @Translation("open pension storage filess"),
 *   label_count = @PluralTranslation(
 *     singular = "@count open pension storage filess",
 *     plural = "@count open pension storage filess",
 *   ),
 *   handlers = {
 *     "list_builder" = "Drupal\open_pension_files\OpenPensionStorageFilesListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_files\OpenPensionStorageFilesAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_files\Form\OpenPensionStorageFilesForm",
 *       "edit" = "Drupal\open_pension_files\Form\OpenPensionStorageFilesForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\open_pension_files\Routing\OpenPensionStorageFilesHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "open_pension_storage_files",
 *   admin_permission = "administer open pension storage files",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid",
 *   },
 *   links = {
 *     "collection" = "/admin/content/open-pension-storage-files",
 *     "add-form" = "/admin/open_pension/storage-files/add",
 *     "canonical" = "/admin/open_pension/storage-files/{open_pension_storage_files}",
 *     "edit-form" = "/admin/open_pension/storage-files/{open_pension_storage_files}",
 *     "delete-form" = "/admin/open_pension/storage-files/{open_pension_storage_files}/delete",
 *   },
 *   field_ui_base_route = "entity.open_pension_storage_files.settings",
 * )
 */
class OpenPensionStorageFiles extends ContentEntityBase implements OpenPensionStorageFilesInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['label'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Label'))
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

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Authored on'))
      ->setDescription(t('The time that the open pension storage files was created.'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'timestamp',
        'weight' => 20,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayOptions('form', [
        'type' => 'datetime_timestamp',
        'weight' => 20,
      ])
      ->setDisplayConfigurable('view', TRUE);

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the open pension storage files was last edited.'));

    return $fields;
  }

}
