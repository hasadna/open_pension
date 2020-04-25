<?php

namespace Drupal\open_pension_reclamation\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\Entity\Node;
use Drupal\open_pension_reclamation\Entity\Instrument;
use Drupal\open_pension_reclamation\Entity\InstrumentTypeCode;
use Drupal\open_pension_reclamation\OpenPensionReclamationParseSourceFile;
use Drush\Commands\DrushCommands;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;
use Symfony\Component\Console\Question\ChoiceQuestion;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class OpenPensionReclamationCommands extends DrushCommands {

  protected $entities = [
    'instrument_type' => [
      'entity_id' => 'instrument_type',
      'worksheet' => 'Dim InstrumentType',
      'class' => '\Drupal\open_pension_reclamation\Entity\InstrumentType',
    ],
    'mutual_fund' => [
      'entity_id' => 'mutual_fund',
      'worksheet' => 'Dim MutualFund',
      'class' => '\Drupal\open_pension_reclamation\Entity\MutualFund',
    ],
    'instrument_sub_type' => [
      'entity_id' => 'instrument_sub_type',
      'worksheet' => 'Dim InstrumentSubType',
      'class' => '\Drupal\open_pension_reclamation\Entity\InstrumentSubType',
    ],
    'issuer' => [
      'entity_id' => 'issuer',
      'worksheet' => 'Dim Issuer',
      'class' => '\Drupal\open_pension_reclamation\Entity\Issuer',
    ],
    'instrument' => [
      'entity_id' => 'instrument',
      'worksheet' => 'Dim Instrument',
      'class' => '\Drupal\open_pension_reclamation\Entity\Instrument',
    ],
    'my_stock' => [
      'entity_id' => 'my_stock',
      'worksheet' => 'MyStock',
      'class' => '\Drupal\open_pension_reclamation\Entity\MyStock',
    ],
    'index_manager' => [
      'entity_id' => 'index_manager',
      'worksheet' => 'Dim IndexManager',
      'class' => '\Drupal\open_pension_reclamation\Entity\IndexManager',
    ],
    'manager' => [
      'entity_id' => 'manager',
      'worksheet' => 'DimManager',
      'class' => '\Drupal\open_pension_reclamation\Entity\Manager',
    ],
    'date' => [
      'entity_id' => 'date',
      'worksheet' => 'DimDate',
      'class' => '\Drupal\open_pension_reclamation\Entity\Date',
    ],
    'market_date' => [
      'entity_id' => 'market_date',
      'worksheet' => 'Market Data',
      'class' => '\Drupal\open_pension_reclamation\Entity\MarketDate',
    ],
  ];

  /**
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * @var OpenPensionReclamationParseSourceFile
   */
  protected $parseSourceFile;

  public function __construct(EntityTypeManagerInterface $entityTypeManager, OpenPensionReclamationParseSourceFile $parseSourceFile) {
    $this->entityTypeManager = $entityTypeManager;
    $this->parseSourceFile = $parseSourceFile;
  }

  protected function displayListAndInteract($all, $method_name) {
    if ($all) {
      call_user_func([$this, $method_name], array_keys($this->entities));
      return;
    }
    $question = new ChoiceQuestion(
      dt('Which one would you like to import?'),
      array_keys($this->entities),
      '0,1'
    );

    $question->setMultiselect(true);
    call_user_func([$this, $method_name], $this->io()->askQuestion($question));
  }

  /**
   * Migrate data from the dim file.
   *
   * @command open_pension_reclamation:import
   * @option all Determine if we need to migrate all.
   * @aliases reclamation:import
   */
  public function migrate($options = ['all' => false]) {

    $this->io()->title('Migrating reclamation records');
    $this->displayListAndInteract($options['all'], 'migrateSheets');
  }

  /**
   * Rollback entries we migrated.
   *
   * @command open_pension_reclamation:rollback
   * @option all Determine if we need to migrate all.
   * @aliases reclamation:rollback
   */
  public function rollback($options = ['all' => false]) {
    $this->io()->error('This action will delete all the content - migrated and not migrated');

    if (!$this->io()->confirm(dt('Are you sure?'))) {
      return;
    }

    $this->displayListAndInteract($options['all'], 'rollbackImportedSheetData');
  }

  /**
   * Migrating all the given sheets.
   *
   * @param $selected_sheets_identifier
   *  List of sheets which the user selected.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function migrateSheets($selected_sheets_identifier) {

    $this->say('Start to migrating all the migrations');

    $this->io->progressStart(count($selected_sheets_identifier));

    foreach ($selected_sheets_identifier as $sheet) {
      $this->migrateSheet($sheet);
      $this->io->progressAdvance(1);
      $this->writeln('');
      $this->say(dt('The @type sheet has been merged', ['@type' => $sheet]));
    }

    $this->writeln('');
    $this->writeln('');
    $this->writeln('');

    $this->io()->success('Yay! All have been merged');
  }

  /**
   * Migrate a sheet name by it's identifier from what the user selected.
   *
   * @param $selection_identifier
   *  The sheet identifier.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function migrateSheet($selection_identifier) {

    $metadata = $this->entities[$selection_identifier];
    $entity = $this->entityTypeManager->getStorage($metadata['entity_id']);

    $this->parseSourceFile->getSheetRows($metadata['worksheet'], array_keys($metadata['class']::fieldsMetadata()), function($row) use ($entity) {
      $entity->create($row)->save();
    });
  }

  public function rollbackImportedSheetData($selected_sheets_identifier) {
    $this->say('Start to rollback all the migrated data');

    $this->io->progressStart(count($selected_sheets_identifier));

    foreach ($selected_sheets_identifier as $sheet_identifier) {
      $this->rollbackSheetData($sheet_identifier);
      $this->io->progressAdvance(1);
      $this->writeln('');
      $this->say(dt('@type: All the data has been deleted', ['@type' => $sheet_identifier]));
    }

    $this->writeln('');
    $this->writeln('');
    $this->writeln('');

    $this->io()->success('Yay! All the data have been deleted');
  }

  /**
   * Rollback and the entities.
   *
   * @param $sheet_identifier
   *  The identifier from the list of entities property.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function rollbackSheetData($sheet_identifier) {
    $storage = $this->entityTypeManager->getStorage($this->entities[$sheet_identifier]['entity_id']);
    $storage->delete($storage->loadMultiple());
  }
}
