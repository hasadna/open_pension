<?php

namespace Drupal\open_pension_files;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannel;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use GuzzleHttp\ClientInterface;

/**
 * Class OpenPensionFilesFileProcess.
 */
class OpenPensionFilesFileProcess implements OpenPensionFilesProcessInterface {

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * The logger service.
   *
   * @var \Drupal\Core\Logger\LoggerChannel
   */
  protected $logger;

  /**
   * The file storage service.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $fileStorage;

  /**
   * List of logs.
   *
   * @var string[]
   */
  protected $trackingLogs = [];

  /**
   * Weather the file processed successfully.
   *
   * @var bool
   */
  protected $processed = FALSE;

  /**
   * Constructs a new OpenPensionFilesFileProcess object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The http client service.
   * @param \Drupal\Core\Logger\LoggerChannel $logger
   *   The logger service.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
   *   The entity manager service.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function __construct(ClientInterface $http_client, LoggerChannel $logger, EntityTypeManagerInterface $entity_manager) {
    $this->httpClient = $http_client;
    $this->logger = $logger;
    $this->fileStorage = $entity_manager->getStorage('file');
  }

  /**
   * {@inheritdoc}
   */
  public function getHttpClient(): ClientInterface {
    return $this->httpClient;
  }

  /**
   * {@inheritdoc}
   */
  public function setHttpClient(ClientInterface $httpClient): OpenPensionFilesProcessInterface {
    $this->httpClient = $httpClient;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getLogger(): LoggerChannel {
    return $this->logger;
  }

  /**
   * {@inheritdoc}
   */
  public function setLogger(LoggerChannel $logger): OpenPensionFilesProcessInterface {
    $this->logger = $logger;

    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getFileStorage(): EntityStorageInterface {
    return $this->fileStorage;
  }

  /**
   * {@inheritdoc}
   */
  public function setFileStorage(EntityStorageInterface $fileStorage): OpenPensionFilesProcessInterface {
    $this->fileStorage = $fileStorage;

    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getTrackingLogs(): array {
    return $this->trackingLogs;
  }

  /**
   * {@inheritdoc}
   */
  public function setTrackingLogs(array $trackingLogs): OpenPensionFilesProcessInterface {
    $this->trackingLogs = $trackingLogs;

    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function log(string $log, string $status = 'info'): OpenPensionFilesProcessInterface {
    $this->trackingLogs[] = $log;
    $this->logger->log($status, $log);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function processFile($file_id): OpenPensionFilesProcessInterface {
    /** @var \Drupal\file\Entity\File $file */
    $file = $this->fileStorage->load($file_id);

    if (!$file) {
      $this->log(t('Could not load a file with the ID @id', ['@id' => $file_id]));
      $this->processed = FALSE;
      return $this;
    }

    $this->log(t('Starting to process the file @file_name', ['@file_name' => $file->getFilename()]));

    $results = $this->sendFileToServer($file);

    if ($results->getStatusCode() == 200) {
      $this->log(t('The file @file-name has been processed', ['@file-name' => $file->getFilename()]));
      $this->processed = TRUE;
      return $this;
    }

    $this->log(t('The file @file-name was not able to process', ['@file-name' => $file->getFilename()]), 'error');
    $this->processed = FALSE;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function sendFileToServer(File $file): \Psr\Http\Message\ResponseInterface {
    return $this->httpClient->request('get', 'http://google.com');
  }

  /**
   * {@inheritdoc}
   */
  public function updateEntity(Media $media) {
    $media->field_processed = $this->processed;

    // Add the history to the file.
    foreach ($this->getTrackingLogs() as $log) {
      $media->field_history->appendItem($log);
    }

    // Saving file.
    $media->save();
  }

}
