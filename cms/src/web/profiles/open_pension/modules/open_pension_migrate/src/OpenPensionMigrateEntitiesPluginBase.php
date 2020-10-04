<?php

namespace Drupal\open_pension_migrate;

use Drupal\Component\Plugin\PluginBase;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\pathauto\PathautoState;

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
   * @param $module
   *  The module name.
   * @param $relative_path
   *  The relative path.
   *
   * @return string
   *  A path which can be handle by Drupal.
   */
  protected function getAssetLibrary($module, $relative_path) {
    return drupal_get_path('module', $module) . '/assets/' . $relative_path;
  }

  protected function createFileObject($module, $relative_path) {
    $source = drupal_get_path('module', $module) . '/assets/' . $relative_path;
    $uri = \Drupal::service('file_system')->copy($source, 'public://');

    $file = \Drupal::entityTypeManager()->getStorage('file')->create(['uri' => $uri]);
    $file->save();

    return $file->id();
  }

  /**
   * Returns a list of items which we need to process.
   *
   * @return array
   */
  abstract protected function getRows();

  /**
   * Processing a row into an entity object.
   *
   * @param EntityStorageInterface $entity_storage
   *  The entity object.
   * @param array $row_data
   *  The single row data from the getRows function.
   *
   * @return mixed
   */
  abstract protected function processRow(EntityStorageInterface $entity_storage, array $row_data);

  /**
   * Migrating the content.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function migrate() {
    $plugin_definition = $this->getPluginDefinition();

    $entity = $this->entityManager->getStorage($plugin_definition['entity']);

    foreach ($this->getRows() as $row) {
      $entity_values = $this->processRow($entity, $row);
      $entity_object = $entity->create($entity_values);
      $entity_object->save();

      \Drupal::service('pathauto.generator')->updateEntityAlias($entity_object, 'insert', ['force' => TRUE]);
    }
  }
}
