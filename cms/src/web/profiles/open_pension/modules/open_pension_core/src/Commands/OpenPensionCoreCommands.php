<?php

namespace Drupal\open_pension_core\Commands;

use Consolidation\SiteAlias\SiteAliasManager;
use Consolidation\SiteAlias\SiteAliasManagerAwareTrait;
use Drupal\open_pension_kafka\KafkaTopicPluginManager;
use Drupal\open_pension_kafka\OpenPensionKafkaOrchestrator;
use Drupal\open_pension_kafka\Plugin\KafkaTopic\ProcessingStarted;
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
   * Making sure that the Drupal site is alive.
   *
   * @command open_pension_core:orchestrate
   * @aliases orchestrate
   */
  public function orchestrationValidation($options = ['option-name' => 'default']) {

    if (!$this->hasSiteAliasManager()) {
      $manager = new SiteAliasManager();
      $this->setSiteAliasManager($manager);
    }

    if (!$this->module_handler->moduleExists('system')) {
      // The system is not installed. Skipping.
      return;
    }

    $this->logger()->info('System is running, updating DB');

    $this->processManager()->drush($this->siteAliasManager()->getSelf(), 'updb', '-y')->mustRun();
    $this->processManager()->drush($this->siteAliasManager()->getSelf(), 'fra', '-y')->mustRun();

    $this->logger()->success('All things are done!');
  }

  /**
   * Sandbox stuff
   *
   * @command open_pension_core:sandbox
   * @aliases sandbox
   */
  public function sandbox($options = ['option-name' => 'default']) {

    $payload = '{"storageId":1835}';

    /** @var KafkaTopicPluginManager $kafka_plugin */
    $kafka_plugin = \Drupal::service('plugin.manager.kafka_topic');

    /** @var ProcessingStarted $plugin */
    $plugin = $kafka_plugin->createInstance('processingStarted');

    $plugin->handleTopicMessage($payload);

//    $payload = [
//      "system_field" => "",
//      "reports_type" => "",
//      "from_year" => 2020,
//      "to_year" => 2020,
//      "from_quarter" => "1",
//      "to_quarter" => "1"
//    ];
//
//    /** @var OpenPensionKafkaOrchestrator $kafka_orchestrator */
//    $kafka_orchestrator = \Drupal::service('open_pension_kafka.orchestrator');
//
//    $message = json_encode($payload);
//    $kafka_orchestrator->sendTopic('queryFiles', $message);
//
//    print_r("sent {$message}\n");
  }

}
