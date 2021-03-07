<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "processingStarted",
 *   label = @Translation("Processing started"),
 *   description = @Translation("Handling when the service started to process the file")
 * )
 */
class ProcessingStarted extends AbstractProcessKafkaPlugin {

  /**
   * @return string
   */
  protected function getFileStatus() {
    return OpenPensionStorageFiles::$PROCESS_STARTED;
  }

}
