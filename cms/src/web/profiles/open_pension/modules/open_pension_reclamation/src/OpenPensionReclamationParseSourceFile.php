<?php

namespace Drupal\open_pension_reclamation;

use Drupal\Core\File\FileSystemInterface;

/**
 * OpenPensionReclamationParseSourceFile service.
 */
class OpenPensionReclamationParseSourceFile {

  /**
   * The file system service.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   */
  protected $fileSystem;

  /**
   * Constructs an OpenPensionReclamationParseSourceFile object.
   *
   * @param \Drupal\Core\File\FileSystemInterface $file_system
   *   The file system service.
   */
  public function __construct(FileSystemInterface $file_system) {
    $this->fileSystem = $file_system;
  }

  /**
   * Method description.
   */
  public function parseFile() {
    $xls = \SimpleXLSX::parse(drupal_get_path('module', 'open_pension_reclamation') . '/DIM_PensionFund.xlsx');
    var_dump($xls->worksheet(0));


//    var_dump($xsl);
  }

}
