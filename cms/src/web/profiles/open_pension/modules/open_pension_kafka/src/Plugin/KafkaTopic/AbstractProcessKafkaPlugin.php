<?php

namespace Drupal\open_pension_kafka\Plugin\KafkaTopic;

use Drupal\open_pension_files\OpenPensionFiles;

abstract class AbstractProcessKafkaPlugin extends AbstractKafkaPlugin {

  /**
   * @return string
   */
  abstract protected function getFileStatus();

  /**
   * {@inheritDoc}
   */
  public function handleTopicMessage($payload) {
    $payload = json_decode($payload);

    $storage_id = $payload->storageId;

    if (!$file_ids = OpenPensionFiles::getFilesIDByStorageId($storage_id)) {
      // todo: query the file from the storage.
      $this->getStorage()->create([
        'storage_id' => $storage_id,
        'label' => 'TBD',
        'processing_status' => $this->getFileStatus(),
      ])->save();
      return;
    }

    $file = $this->getStorage()->load(reset($file_ids));

    // todo: get the process history from the processor.

    $file->processing_status = $this->getFileStatus();
    $file->save();
  }

}
