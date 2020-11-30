<?php

namespace Drupal\open_pension_kafka;

use Drupal\Component\Plugin\PluginBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;

/**
 * Base class for kafka_topic plugins.
 */
abstract class KafkaTopicPluginBase extends PluginBase implements KafkaTopicInterface, ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function label() {
    // Cast the label to a string since it is a TranslatableMarkup object.
    return (string) $this->pluginDefinition['label'];
  }

  /**
   * Handle the a topic message.
   *
   * @param $payload
   *  The topic payload.s
   */
  abstract public function handleTopicMessage($payload);

}
