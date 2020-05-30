<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\file\Entity\File;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Returns responses for Open Pension Files routes.
 */
class OpenPensionFilesDownloadZippedFile extends ControllerBase {

  /**
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * OpenPensionFilesDownloadZippedFile constructor.
   *
   * @param EntityTypeManagerInterface $entity_type_manager
   *  The entity type manager service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
    );
  }

  /**
   * Builds the response.
   */
  public function build($file) {
    /** @var File $file_entity */
    $file_entity = $this->entityTypeManager->getStorage('file')->load($file);

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
