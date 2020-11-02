<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\open_pension_kafka\KafkaTopicPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

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
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * FileStored constructor.
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param EntityTypeManagerInterface $entity_type_manager
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager')
    );
  }

  /**

  /**
   * {@inheritDoc}
   */
  public function handleTopicMessage($payload) {
    $storage = $this->entityTypeManager->getStorage('open_pension_storage_files');

    $results = $storage
      ->getQuery()
      ->condition('storage_id')
      ->execute();

    if (!empty($results)) {
      // todo: log here.
      return;
    }

    $storage->create(['storage_id' => $payload])->save();
  }
}
