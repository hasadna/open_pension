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
   * Iterating over the kafka topics plugins and query for their payloads.
   */
  protected function queryKafkaTopics(callable $pre_logging_handler = NULL, callable $post_logging_handler = NULL) {

    if (!$this->kafkaPlugins) {
      $this->kafkaPlugins = $this->kafkaTopicPluginManager->getDefinitions();
    }

    foreach (['FileStored'] as $plugin_id) {

      /** @var KafkaTopicPluginBase $plugin */
      $plugin = $this->kafkaTopicPluginManager->createInstance($plugin_id);

      // Listen to the event.
      if ($pre_logging_handler) {
        $pre_logging_handler($plugin_id);
      }

      if ($payload = $this->kafkaOrchestrator->consume($plugin_id)) {
        // Got the payload. Trigger the handle.
        $plugin->handleTopicMessage($payload);

        if ($post_logging_handler) {
          $post_logging_handler($payload);
        }
      }
    }

    sleep(1);
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
  public function kafkaListen($daemon=FALSE) {

    // todo:
    //  1. Get all the topics by plugins.
    //  2. if we not in a deamon then we need to limit the range to 60 seconds
    //  3. Take the events from the latest the newer or maybe don't events which
    //    pulled before.
    //  4. Check the flow works...

    $queue = $this->kafkaOrchestrator->getConsumeQueue(['FileStored']);

    while (true) {
      $message = $queue->consume(120*1000);
      if ($message->err == RD_KAFKA_RESP_ERR_NO_ERROR) {
        var_dump($message->payload);
      }

      sleep(1);
    }

//    if ($daemon) {
//      $this->openPensionKafkaLogger->info(dt('Running the service as a daemon'));
//
//      while (true) {
//        $date = \Drupal::service('date.formatter')->format(\Drupal::time()->getCurrentTime(), 'short');
//        $params = [
//          '@date' => $date
//        ];
//
//        $this->queryKafkaTopics(
//          function($plugin_id) use ($params) {
//            $params['@plugin_id'] = $plugin_id;
//            $this->openPensionKafkaLogger->info(dt("@date - Trying to getting message from @plugin_id while running a daemon", $params));
//          },
//          function($payload) use ($params) {
//            $params['@payload'] = $payload;
//            $this->openPensionKafkaLogger->info(dt("@date - Got a message with the payload @payload at ", $params));
//          });
//      }
//      return;
//    }
//
//    $this->openPensionKafkaLogger->info(dt('Start to listen to events for a minute'));
//
//    $max_times = 59;
//
//    for ($i = 0; $i <= $max_times; $i++) {
//      // Start to iterate 60 times. At the end of each iteration we going to
//      // sleep for a second.
//      $this->queryKafkaTopics(
//        function($plugin_id) use ($i, $max_times) {
//        $this->openPensionKafkaLogger->info(dt("Trying to getting message from {$plugin_id} {$i}/{$max_times}"));
//      },
//      function($payload) use ($i, $max_times) {
//        $this->openPensionKafkaLogger->info(dt("Got a message with the payload @payload at {$i}/{$max_times}", ['@payload' => $payload]));
//      });
//    }
  }
}
