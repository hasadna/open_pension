<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_kafka\KafkaTopicPluginBase;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "FileStored",
 *   label = @Translation("File downloaded"),
 *   description = @Translation("Handling whena file was downloaded")
 * )
 */
class FileStored extends KafkaTopicPluginBase {

  /**
   * {@inheritDoc}
   */
  public function handleTopicMessage($payload) {
    print_r($payload . "\n");
  }
}
