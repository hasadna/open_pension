<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannel;
use Drupal\open_pension_kafka\KafkaTopicPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

abstract class AbstractKafkaPlugin extends KafkaTopicPluginBase {

  /**
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Open pension logger.
   *
   * @var LoggerChannel
   */
  protected $logger;

  /**
   * FileStored constructor.
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param EntityTypeManagerInterface $entity_type_manager
   * @param LoggerChannel $open_pension_logger
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, LoggerChannel $open_pension_logger) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $open_pension_logger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('entity_type.manager'), $container->get('logger.open_pension_kafka'));
  }

  /**
   * @return \Drupal\Core\Entity\EntityStorageInterface
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getStorage() {
    return $this->entityTypeManager->getStorage('open_pension_storage_files');
  }

}
