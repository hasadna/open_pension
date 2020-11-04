<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;
use Drupal\open_pension_files\OpenPensionFiles;
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

    if (OpenPensionFiles::getFilesIDByStorageId($payload)) {
      \Drupal::logger('open_pension_kafka')->info(t('A file with the @id already exists', ['@id' => $payload]));
      return;
    }

    $storage->create([
      'storage_id' => $payload,
      'label' => 'Matching file ' . $payload,
      'processing_status' => OpenPensionStorageFiles::$SENT,
    ])->save();

    \Drupal::logger('open_pension_kafka')->info(t('A matching record to the storage file @id has been created', ['@id' => $payload]));

  }
}
