<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "processingCompletedWithErrors",
 *   label = @Translation("Process completed with errors"),
 *   description = @Translation("Handleing when the service finish processing the file but got some errors.")
 * )
 */
class processingCompletedWithErrors extends AbstractProcessKafkaPlugin {

  /**
   * @return string
   */
  protected function getFileStatus() {
    return OpenPensionStorageFiles::$PROCESS_COMPLETED_WITH_ERRORS;
  }

}
