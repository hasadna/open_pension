<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "fileStoredByService",
 *   label = @Translation("File stored by service"),
 *   description = @Translation("Handling when file was stored by the service")
 * )
 */
class storedByService extends AbstractProcessKafkaPlugin {

  /**
   * @return string
   */
  protected function getFileStatus() {
    return OpenPensionStorageFiles::$STORED_BY_SERVICE;
  }
}
