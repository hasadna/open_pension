<?php

namespace Drupal\open_pension_core\Commands;

use Consolidation\SiteAlias\SiteAliasManager;
use Consolidation\SiteAlias\SiteAliasManagerAwareTrait;
use Drush\Commands\DrushCommands;
use Drupal\Core\Extension\ModuleHandler;

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
class OpenPensionCoreCommands extends DrushCommands {

  use SiteAliasManagerAwareTrait;

  public function __construct(ModuleHandler $module_handler) {
    $this->module_handler = $module_handler;
  }

  /**
   * Command description here.
   *
   * @command open_pension_core:orchestrate
   * @aliases orchestrate
   */
  public function commandName($options = ['option-name' => 'default']) {

    if (!$this->hasSiteAliasManager()) {
      // TODO: Provide some way to initialize the alias file loaders, so
      // that there is some way to specify where alias files may be
      // loaded from.
      $manager = new SiteAliasManager();
      $this->setSiteAliasManager($manager);
    }

    if ($this->module_handler->moduleExists('system')) {
      $this->logger()->info('System is running, updating DB');

      $process = $this->processManager()->drush($this->siteAliasManager()->getSelf(), 'updb');
      $process->mustRun();

      $this->logger()->success('All things are done!');
    }
    else {
      list($MYSQL_USER,$MYSQL_PASSWORD,$MYSQL_HOST,$MYSQL_DATABASE,$ACCOUNT_PASS,$ACCOUNT_NAME) = [
        getenv('MYSQL_USER'),
        getenv('MYSQL_PASSWORD'),
        getenv('MYSQL_HOST'),
        getenv('MYSQL_DATABASE'),
        getenv('ACCOUNT_PASS'),
        getenv('ACCOUNT_NAME'),
      ];
      $process = $this->processManager()->drush($this->siteAliasManager()->getSelf(), 'si', "open_pension --db-url=\"mysql://{$MYSQL_USER}:{$MYSQL_PASSWORD}@{$MYSQL_HOST}/{$MYSQL_DATABASE}\" --account-pass=\"{$ACCOUNT_PASS}\" --account-name=\"{$ACCOUNT_NAME}\"");
      $process->mustRun();
      $this->logger()->info('Installing system');
    }
  }
}
