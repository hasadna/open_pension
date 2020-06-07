<?php

namespace Drupal\open_pension_migrate;

use Drupal\Component\Plugin\PluginBase;
use Drupal\Core\Entity\EntityStorageInterface;

/**
 * Base class for open_pension_migrate_entities plugins.
 */
abstract class OpenPensionMigrateEntitiesPluginBase extends PluginBase implements OpenPensionMigrateEntitiesInterface {

  /**
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityManager;

  /**
   * OpenPensionMigrateEntitiesPluginBase constructor.
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityManager = \Drupal::entityTypeManager();
  }

  /**
   * {@inheritdoc}
   */
  public function label() {
    // Cast the label to a string since it is a TranslatableMarkup object.
    return (string) $this->pluginDefinition['label'];
  }

  /**
   * Get the file path relative to the asserts folder.
   *
   * @param $relative_path
   *  The relative path.
   * @return string
   *  A path which can be handle by Drupal.
   */
  protected function getFilePath($relative_path) {
    return drupal_get_path('module', 'open_pension_blog') . '/assets/' . $relative_path;
  }

  abstract protected function getRows();
  abstract protected function processRow(EntityStorageInterface $entity_storage, array $row_data);

  public function migrate() {
    $plugin_definition = $this->getPluginDefinition();

    $entity = $this->entityManager->getStorage($plugin_definition['entity']);

    foreach ($this->getRows() as $row) {
      $this->processRow($entity, $row)->save();
    }
  }

}
