<?php

namespace Drupal\open_pension_kafka;

/**
 * Interface for kafka_topic plugins.
 */
interface KafkaTopicInterface {

  /**
   * Returns the translated plugin label.
   *
   * @return string
   *   The translated title.
   */
  public function label();

}
