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
use Drupal\open_pension_reclamation\OpenPensionReclamationParseSourceFile;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * The 'open_pension_dim_file' source plugin.
 *
 * @MigrateSource(
 *   id = "dim"
 * )
 */
class OpenPensionDimFile extends SourcePluginBase implements ContainerFactoryPluginInterface, DependentPluginInterface {
  /**
   * @var OpenPensionReclamationParseSourceFile
   */
  protected $sourceFileParser;

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

  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, OpenPensionReclamationParseSourceFile $source_file_parser) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);
    $this->sourceFileParser = $source_file_parser;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('open_pension_reclamation.source_file_parser')
    );
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
    return ['id' => ['type' => 'integer', 'alias' => 'n',],];
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    return ['id', 'InstrumentType Code', 'Liquidity ', 'InstrumentType'];
  }

  /**
   * {@inheritdoc}
   */
  public function initializeIterator() {
    var_dump($this->sourceFileParser->getSheetRows('Dim InstrumentType'));
    return new \ArrayIterator($this->sourceFileParser->getSheetRows('Dim InstrumentType'));
  }

  public function calculateDependencies() {
    return [];
  }
}
