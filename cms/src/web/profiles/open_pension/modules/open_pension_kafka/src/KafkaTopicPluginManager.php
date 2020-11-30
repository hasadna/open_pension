<?php

namespace Drupal\open_pension_kafka;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;

/**
 * KafkaTopic plugin manager.
 */
class KafkaTopicPluginManager extends DefaultPluginManager {

  /**
   * Constructs KafkaTopicPluginManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct(
      'Plugin/KafkaTopic',
      $namespaces,
      $module_handler,
      'Drupal\open_pension_kafka\KafkaTopicInterface',
      'Drupal\open_pension_kafka\Annotation\KafkaTopic'
    );
    $this->alterInfo('kafka_topic_info');
    $this->setCacheBackend($cache_backend, 'kafka_topic_plugins');
  }

}
