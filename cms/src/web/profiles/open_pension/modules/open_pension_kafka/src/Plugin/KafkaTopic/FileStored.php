<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;
use Drupal\open_pension_files\OpenPensionFiles;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "FileStored",
 *   label = @Translation("File downloaded"),
 *   description = @Translation("Handling when file was downloaded")
 * )
 */
class FileStored extends AbstractKafkaPlugin {

  /**
   * {@inheritDoc}
   */
  public function handleTopicMessage($payload) {
    $payload = json_decode($payload);

    if (OpenPensionFiles::getFilesIDByStorageId($payload->ID)) {
      $this->logger->info(t('A file with the @id already exists', ['@id' => $payload]));
      return;
    }

    $this->getStorage()->create([
      'storage_id' => $payload->ID,
      'label' => $payload->filename,
      'processing_status' => OpenPensionStorageFiles::$SENT,
    ])->save();

    $this->logger->info(t('A matching record to the storage file @id has been created', ['@id' => $payload]));
  }
}
