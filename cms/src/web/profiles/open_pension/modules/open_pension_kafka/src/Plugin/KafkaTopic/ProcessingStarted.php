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
 *   id = "processingStarted",
 *   label = @Translation("File downloaded"),
 *   description = @Translation("Handling when file was downloaded")
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
