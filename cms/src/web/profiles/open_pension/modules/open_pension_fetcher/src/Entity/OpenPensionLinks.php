<?php

namespace Drupal\open_pension_fetcher\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\open_pension_fetcher\OpenPensionLinksInterface;

/**
 * Defines the open pension links entity class.
 *
 * @ContentEntityType(
 *   id = "open_pension_links",
 *   label = @Translation("Open Pension Links"),
 *   label_collection = @Translation("Open Pension files links"),
 *   handlers = {
 *     "view_builder" = "Drupal\open_pension_fetcher\OpenPensionLinksViewBuilder",
 *     "list_builder" = "Drupal\open_pension_fetcher\OpenPensionLinksListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\open_pension_fetcher\OpenPensionLinksAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\open_pension_fetcher\Form\OpenPensionLinksForm",
 *       "edit" = "Drupal\open_pension_fetcher\Form\OpenPensionLinksForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "open_pension_links",
 *   admin_permission = "access open pension links overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "id",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "add-form" = "/admin/open_pension/files-links/add",
 *     "canonical" = "/open_pension_links/{open_pension_links}",
 *     "edit-form" = "/admin/open_pension/files-links/{open_pension_links}/edit",
 *     "delete-form" = "/admin/open_pension/files-links/{open_pension_links}/delete",
 *     "collection" = "/admin/open_pension/open-pension-links"
 *   },
 * )
 */
class OpenPensionLinks extends ContentEntityBase implements OpenPensionLinksInterface {

  use EntityChangedTrait;

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

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Authored on'))
      ->setDescription(t('The time that the open pension links was created.'))
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
      ->setDescription(t('The time that the open pension links was last edited.'));

    return $fields;
  }

}
