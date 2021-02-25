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


  protected $kafkaPlugins = NULL;

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
   * @option daemon Determines if the command will run as a daemon in the
   *  background. Default - false, which meand the command will run at 60
   *  seconds time frame.
   */
  public function kafkaListen($daemon = FALSE) {

    $plugins_ids = array_keys($this->kafkaTopicPluginManager->getDefinitions());
    $queue = $this->kafkaOrchestrator->getConsumeQueue($plugins_ids);
    $plugins = [];

    $i = 0;
    while (true) {

      if (!$daemon && $i >= 59) {
        // We not in a deamon, which means this is not run as a backend service
        // which mean we need to limit the iteration to 60 seconds.
        return;
      }

      $message = $queue->consume(120*1000);
      $date = \Drupal::service('date.formatter')->format(\Drupal::time()->getCurrentTime(), 'short');
      $topic = $message->topic_name;
      $payload = $message->payload;

      $params = [
        '@date' => $date,
        '@topic' => $topic,
      ];

      if ($message->err != RD_KAFKA_RESP_ERR_NO_ERROR) {
        // No valid payload. Skip.
        continue;
      }

      if (!$payload) {
        $this->openPensionKafkaLogger->info(t("No payload for @topic at @date", $params));
        // We did not a payload but it's empty. Skip this one.
        continue;
      }

      // Get the plugin for the message.
      if (empty($plugins[$message->topic_name])) {
        // We did not initialize the plugin before. Create an instance and save
        // it in the plugins objects.
        $plugins[$message->topic_name] = $this->kafkaTopicPluginManager->createInstance($message->topic_name);
      }

      /** @var KafkaTopicPluginBase $plugin */
      $plugin = $plugins[$message->topic_name];

      $params['@payload'] = serialize($message->payload);
      $this->openPensionKafkaLogger->info(t("Parsing payload, @payload, for @topic at @date", $params));

      // Got the payload. Trigger the handle.
      $plugin->handleTopicMessage($message->payload);

      // Sleep one second.
      sleep(1);
      $i++;
    }
  }
}
