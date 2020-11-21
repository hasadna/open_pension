<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\views\Views;

/**
 * Returns responses for Open Pension Files routes.
 */
class OpenPensionFilesStorageFileController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function build() {
    return views_embed_view('storage_files');
  }

}
