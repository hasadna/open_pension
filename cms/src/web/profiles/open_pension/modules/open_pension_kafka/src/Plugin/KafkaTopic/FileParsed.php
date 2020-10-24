<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_kafka\KafkaTopicPluginBase;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "file_parsed",
 *   label = @Translation("File parsed"),
 *   description = @Translation("Handeling a file parsing event")
 * )
 */
class FileParsed extends KafkaTopicPluginBase {

  /**
   * {@inheritDoc}
   */
  public function handleTopicMessage($payload) {
  }
}
