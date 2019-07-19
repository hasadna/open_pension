<?php

namespace Drupal\open_pension_files_test;

use Drupal\file\Entity\File;
use Drupal\open_pension_files\OpenPensionFilesFileProcess;
use GuzzleHttp\Psr7\Response;

class OpenPensionFilesTestFileProcess extends OpenPensionFilesFileProcess {

  /**
   * {@inheritdoc}
   */
  public function sendFileToServer(File $file) {
    if ($file->getFilename() == 'dummy-xsl-file.xlsx') {
      return new Response(200);
    }

    return new Response(400);
  }

}
