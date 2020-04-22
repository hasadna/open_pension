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
      'entity_id' => 'open_pension_dim_file',
      'worksheet' => 'Dim InstrumentType',
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
   * @aliases opri
   */
  public function commandName($options = ['all' => false]) {

    $this->io()->title('Migrating reclamation records');

    if ($options['all']) {
      $this->say('Start to migrating all the migrations');
      $this->migrateSheets(array_keys($this->entities));
//      $this->io()->success('Yay! All have been merged');
      return;
    }

    $question = new ChoiceQuestion(
      dt('Which one would you like to import?'),
      array_keys($this->entities),
      '0,1'
    );

    $question->setMultiselect(true);
    $types_to_import = $this->io()->askQuestion($question);
  }

  public function migrateSheets($sheets) {

//    $this->io->progressStart(count($this->entities));

    foreach ($sheets as $sheet) {
      $this->migrateSheet($sheet);
//      $this->io->progressAdvance(1);
    }

//    $this->writeln('');
//    $this->writeln('');
//    $this->writeln('');
  }

  public function migrateSheet($sheet_name) {
    $entity = $this->entityTypeManager->getStorage($this->entities[$sheet_name]['entity_id']);
    $this->parseSourceFile->getSheetRows('Dim InstrumentType', function($row) use ($entity) {
      $entity->create($row)->save();
    });
  }
}
