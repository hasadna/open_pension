<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannel;
use Drupal\open_pension_files\Entity\OpenPensionStorageFiles;
use Drupal\open_pension_files\OpenPensionFiles;
use Drupal\open_pension_kafka\KafkaTopicPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the kafka_topic.
 *
 * @KafkaTopic(
 *   id = "processingCompelted",
 *   label = @Translation("File downloaded"),
 *   description = @Translation("Handling when file was downloaded")
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
