<?php

namespace Drupal\open_pension_reclamation\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\open_pension_reclamation\Entity\InstrumentTypeCode;
use Drupal\open_pension_reclamation\OpenPensionReclamationParseSourceFile;
use Drush\Commands\DrushCommands;
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
    'instrument' => [
      'entity_id' => 'instrument_type',
      'worksheet' => 'Dim InstrumentType',
      'keys' => [
        'code', 'liquidity', 'instrument_type',
      ],
    ],
    'mutual_fund' => [
      'entity_id' => 'mutual_fund',
      'worksheet' => 'Dim MutualFund',
      'keys' => ['instrument_number', 'instrument_name', 'category', 'sub_category', 'giografic'],
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

  /**
   * Import data from the dim file.
   *
   * @command open_pension_reclamation:import
   * @option all Determine if we need to migrate all.
   * @aliases reclamation:import
   */
  public function commandName($options = ['all' => false]) {

    $this->io()->title('Migrating reclamation records');

    if ($options['all']) {
      $this->migrateSheets(array_keys($this->entities));
      return;
    }

    $question = new ChoiceQuestion(
      dt('Which one would you like to import?'),
      array_keys($this->entities),
      '0,1'
    );

    $question->setMultiselect(true);
    $this->migrateSheets($this->io()->askQuestion($question));
  }

  public function migrateSheets($sheets) {

    $this->say('Start to migrating all the migrations');

    $this->io->progressStart(count($sheets));

    foreach ($sheets as $sheet) {
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

  public function migrateSheet($selection_identifier) {
    $metadata = $this->entities[$selection_identifier];
    $entity = $this->entityTypeManager->getStorage($metadata['entity_id']);
    $this->parseSourceFile->getSheetRows($metadata['worksheet'], $metadata['keys'], function($row) use ($entity) {
      $entity->create($row)->save();
    });
  }
}
