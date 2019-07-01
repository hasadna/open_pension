<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class UploadFilesToProcessController.
 */
class UploadFilesToProcessController extends ControllerBase {

  /**
   * Upload_files.
   *
   * @return mixed
   *   Return Hello string.
   */
  public function upload_files() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Drag files here')
    ];
  }
}
