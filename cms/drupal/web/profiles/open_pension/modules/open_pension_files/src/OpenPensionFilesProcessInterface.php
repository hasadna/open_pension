<?php

namespace Drupal\open_pension_files;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Logger\LoggerChannel;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use GuzzleHttp\ClientInterface;

/**
 * Interface OpenPensionFilesProcessInterface.
 */
interface OpenPensionFilesProcessInterface {

  /**
   * Processing a file.
   *
   * @param mixed $file_id
   *   The file ID.
   *
   * @return self
   *   The current object.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function processFile($file_id): OpenPensionFilesProcessInterface;

  /**
   * Setting the http client.
   *
   * @param \GuzzleHttp\ClientInterface $httpClient
   *   The http client service.
   *
   * @return OpenPensionFilesFileProcess
   *   The current object.
   */
  public function setHttpClient(ClientInterface $httpClient): OpenPensionFilesProcessInterface;

  /**
   * Get the file storage service.
   *
   * @return \Drupal\Core\Entity\EntityStorageInterface
   *   The entity file storage service.
   */
  public function getFileStorage(): EntityStorageInterface;

  /**
   * Logging what happens - to the watchdog and to the logs property.
   *
   * @param string $log
   *   The message to log.
   * @param string $status
   *   A logger level.
   *
   * @return $this
   *   The current object.
   */
  public function log(string $log, string $status = 'info');

  /**
   * Setting the file storage service.
   *
   * @param \Drupal\Core\Entity\EntityStorageInterface $fileStorage
   *   The files storage service.
   *
   * @return OpenPensionFilesFileProcess
   *   The current object.
   */
  public function setFileStorage(EntityStorageInterface $fileStorage): OpenPensionFilesProcessInterface;

  /**
   * Set the tracking logs.
   *
   * @param string[] $trackingLogs
   *   The list of logs.
   *
   * @return OpenPensionFilesFileProcess
   *   The current object.
   */
  public function setTrackingLogs(array $trackingLogs): OpenPensionFilesProcessInterface;

  /**
   * Setting the logger service.
   *
   * @param \Drupal\Core\Logger\LoggerChannel $logger
   *   The logger service.
   *
   * @return OpenPensionFilesFileProcess
   *   The current object.
   */
  public function setLogger(LoggerChannel $logger): OpenPensionFilesProcessInterface;

  /**
   * Get the logger service.
   *
   * @return \Drupal\Core\Logger\LoggerChannel
   *   The logger service.
   */
  public function getLogger(): LoggerChannel;

  /**
   * Return the client interface.
   *
   * @return \GuzzleHttp\ClientInterface
   *   Get the client service.
   */
  public function getHttpClient(): ClientInterface;

  /**
   * Get all the logs we collected.
   *
   * @return string[]
   *   List of logs.
   */
  public function getTrackingLogs(): array;

  /**
   * Updating the media entity which holds the file refrence.
   *
   * @param \Drupal\media\Entity\Media $media
   *   The file object.
   */
  public function updateEntity(Media $media);

  /**
   * @param File $file
   * @return mixed
   */
  public function sendFileToServer(File $file);

}
