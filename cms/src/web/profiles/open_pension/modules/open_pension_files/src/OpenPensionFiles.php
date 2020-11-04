<?php

namespace Drupal\open_pension_files;

class OpenPensionFiles {

  /**
   * Get the file ID by a storage ID.
   *
   * @param $storage_id
   * @param $exclude_file_id
   */
  static public function getFilesIDByStorageId($storage_id, $exclude_file_id=NULL) {
    $storage = \Drupal::entityTypeManager()
      ->getStorage('open_pension_storage_files');

    $query = $storage
      ->getQuery()
      ->condition('storage_id', $storage_id);

    if ($exclude_file_id) {
      $query->condition('id', $exclude_file_id, '<>');
    }

    return $query->execute();
  }
}
