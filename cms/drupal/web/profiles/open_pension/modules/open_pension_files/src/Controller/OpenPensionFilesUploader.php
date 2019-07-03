<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class OpenPensionFilesUploader.
 */
class OpenPensionFilesUploader extends ControllerBase {

  /**
   * Uploading a file for processing.
   *
   * @return array
   *   Return a form for uploading file.
   */
  public function main(): array {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Upload files here')
    ];
  }

}
