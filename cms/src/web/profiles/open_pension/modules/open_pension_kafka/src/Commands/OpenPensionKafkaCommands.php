<?php

namespace Drupal\open_pension_kafka\Commands;

use Drupal\Core\Logger\LoggerChannel;
use Drupal\open_pension_kafka\KafkaTopicPluginBase;
use Drupal\open_pension_kafka\KafkaTopicPluginManager;
use Drupal\open_pension_kafka\Logger\OpenPensionKafkaLogger;
use Drupal\open_pension_kafka\OpenPensionKafkaOrchestrator;
use Drush\Commands\DrushCommands;


/**
 * Drush command of the open pension kafka module.
 */
class OpenPensionKafkaCommands extends DrushCommands {

  /**
   * @var OpenPensionKafkaOrchestrator
   */
  protected $kafkaOrchestrator;

  /**
   * The kafka topic plugin manager.
   *
   * @var KafkaTopicPluginManager
   */
  protected $kafkaTopicPluginManager;

  /**
   * The kafka logger.
   *
   * @var OpenPensionKafkaLogger
   */
  protected $openPensionKafkaLogger;

  /**
   * OpenPensionKafkaCommands constructor.
   *
   * @param OpenPensionKafkaOrchestrator $kafka_orchestrator
   *  The kafka orchestrator service.
   * @param KafkaTopicPluginManager $kafka_topic_manager
   *  The kakfa topic manager.
   * @param LoggerChannel $open_pension_kafka_logger
   *  The open pension kafka logger service.
   */
  public function __construct(
    OpenPensionKafkaOrchestrator $kafka_orchestrator,
    KafkaTopicPluginManager $kafka_topic_manager,
    LoggerChannel $open_pension_kafka_logger
  ) {
    $this->kafkaOrchestrator = $kafka_orchestrator;
    $this->kafkaTopicPluginManager = $kafka_topic_manager;
    $this->openPensionKafkaLogger = $open_pension_kafka_logger;
  }

  /**
   * Listening to kafka topics for a minute.
   *
   * We going to query kafka topics based on the kafka topics we implemented.
   *
   * @command open_pension_kafka:kafka_listen
   * @aliases kafka_listen
   */
  public function kafkaListen() {
    $plugins = $this->kafkaTopicPluginManager->getDefinitions();

    $this->openPensionKafkaLogger->info(dt('Start to listen to events'));

    $max_times = 59;

    for ($i = 0; $i <= $max_times; $i++) {
      // Start to iterate 60 times. At the end of each iteration we going to
      // sleep for a second.

      foreach (array_keys($plugins) as $plugin_id) {

        /** @var KafkaTopicPluginBase $plugin */
        $plugin = $this->kafkaTopicPluginManager->createInstance($plugin_id);

        // Listen to the event.
        $this->openPensionKafkaLogger->info(dt("Trying to getting message from {$plugin_id} {$i}/{$max_times}"));

        if ($payload = $this->kafkaOrchestrator->consume($plugin_id)) {
          // Got the payload. Trigger the handle.
          $plugin->handleTopicMessage($payload);

          $this->openPensionKafkaLogger->info(dt("Got a message with the payload @payload at {$i}/{$max_times}", ['@payload' => $payload]));
        }
      }

      sleep(1);
    }
  }
}
