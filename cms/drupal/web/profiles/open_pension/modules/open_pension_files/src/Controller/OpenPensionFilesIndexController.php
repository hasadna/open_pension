<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class OpenPensionFilesIndexController.
 */
class OpenPensionFilesIndexController extends ControllerBase {

  /**
   * Router.
   *
   * @return mixed
   *   Return Hello string.
   */
  public function router() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Go to upload files, go to logs view')
    ];
  }

}
