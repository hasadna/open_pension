<?php

namespace Drupal\open_pension_migrate\Commands;

use Consolidation\OutputFormatters\StructuredData\RowsOfFields;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginBase;
use Drupal\open_pension_migrate\OpenPensionMigrateEntitiesPluginManager;
use Drush\Commands\DrushCommands;

/**
 * A drush command to migrate content to Drupal. Yes, we might need to use the migration module but there's no time for
 * that.
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
