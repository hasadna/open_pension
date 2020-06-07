<?php

namespace Drupal\open_pension_migrate\Commands;

use Consolidation\OutputFormatters\StructuredData\RowsOfFields;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginManager;
use Drush\Commands\DrushCommands;

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
class OpenPensionMigrateCommands extends DrushCommands {

  /**
   * @var OpenPensionMigrateEntitiesPluginManager
   */
  protected $migratePlugins;

  /**
   * OpenPensionMigrateCommands constructor.
   *
   * @param OpenPensionMigrateEntitiesPluginManager $migrate_plugins
   */
  public function __construct(OpenPensionMigrateEntitiesPluginManager $migrate_plugins) {
    $this->migratePlugins = $migrate_plugins;
  }

  /**
   * An example of the table output format.
   *
   * @command open_pension_migrate:migrate
   */
  public function migrate() {
    $this->io()->title(dt('Migrating content'));

    $plugins = array_keys($this->migratePlugins->getDefinitions());

    $this->io->progressStart(count($plugins));

    foreach ($plugins as $plugin_id) {
      /** @var OpenPensionMigrateEntitiesPluginBase $plugin */
      $plugin = $this->migratePlugins->createInstance($plugin_id);

      $plugin->migrate();
      $this->io->progressAdvance(1);
    }

    $this->writeln('');
    $this->writeln('');
    $this->writeln('');

    $this->io()->success(dt('Yay! All have been merged'));
  }
}
