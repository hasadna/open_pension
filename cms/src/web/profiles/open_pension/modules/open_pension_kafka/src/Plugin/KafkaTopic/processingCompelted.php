<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "processingCompelted",
 *   label = @Translation("Process completed"),
 *   description = @Translation("Handling when the file was processes succesfully by the service")
 * )
 */
class processingCompelted extends AbstractProcessKafkaPlugin {

  /**
   * @return string
   */
  protected function getFileStatus() {
    // todo: support getKafkaFileStoredByService.
    return OpenPensionStorageFiles::$PROCESS_COMPLETED;
  }
}
