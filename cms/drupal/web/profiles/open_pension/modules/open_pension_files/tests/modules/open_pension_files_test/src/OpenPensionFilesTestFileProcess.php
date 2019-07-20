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

    // We can't mock responses for both the file handling so we going to return
    // a response base on the name. Why we can't mock responses for two files
    // because each file handling the http client is re-initiated thus keep
    // guzzle mock requests queue the same for each file.
    if ($file->getFilename() == 'dummy-xsl-file.xlsx') {
      return new Response(200);
    }

    return new Response(400);
  }

}
