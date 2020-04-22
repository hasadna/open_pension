<?php

namespace Drupal\open_pension_reclamation\Plugin\migrate\source;

use Drupal\Component\Plugin\ConfigurablePluginInterface;
use Drupal\Component\Plugin\DependentPluginInterface;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\Plugin\migrate\source\SourcePluginBase;
use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * The 'open_pension_dim_file' source plugin.
 *
 * @MigrateSource(
 *   id = "dim"
 * )
 */
class OpenPensionDimFile extends SourcePluginBase {

  /**
   * Flag to determine if the iterator has been initialized.
   *
   * @var bool
   */
  protected $iteratorIsInitialized = FALSE;

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'file' => NULL,
      'worksheet' => NULL,
      'origin' => 'A2',
      'header_row' => NULL,
      'columns' => [],
      'keys' => [],
      'row_index_column' => NULL,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setConfiguration(array $configuration) {
    $this->configuration = NestedArray::mergeDeep(
      $this->defaultConfiguration(),
      $configuration
    );
  }

  public function __toString() {
    return $this->configuration['file'] . ':' . $this->configuration['worksheet'];
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    $config = $this->getConfiguration();

    return $config['keys'];
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    return ['foo'];
  }

  /**
   * {@inheritdoc}
   */
  public function initializeIterator() {

    $rows = [];
    return new \ArrayIterator($rows);
  }

}
