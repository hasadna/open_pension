<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\file\Entity\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Returns responses for Open Pension Files routes.
 */
class OpenPensionFilesDownloadZippedFile extends ControllerBase {

  /**
   * Builds the response.
   */
  public function build($file) {
    /** @var File $file_entity */
    $file_entity = \Drupal::entityTypeManager()->getStorage('file')->load($file);

    // Do some file validation here, like checking for extension.

    // File lives in /files/downloads.
    $uri = $file_entity->getFileUri();

    $filename = $file_entity->label();

    $headers = [
      'Content-Type' => 'application/zip',
      'Content-Description' => 'File Download',
      'Content-Disposition' => 'attachment; filename=' . $filename
    ];

    // Return and trigger file download.
    return new BinaryFileResponse($uri, 200, $headers, true );
  }

}
