<?php

namespace Drupal\open_pension_files;

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
     * @param $file_id
     *  The file ID.
     *
     * @return self
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function processFile($file_id): OpenPensionFilesProcessInterface;

    /**
     * @param ClientInterface $httpClient
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setHttpClient(ClientInterface $httpClient): OpenPensionFilesProcessInterface;

    /**
     * @return \Drupal\Core\Entity\EntityStorageInterface
     */
    public function getFileStorage(): \Drupal\Core\Entity\EntityStorageInterface;

    /**
     * Logging what happens - to the watchdog and to the logs property.
     *
     * @param string $log
     *  The message to log.
     * @param string $status
     *  A logger level.
     *
     * @return $this
     */
    public function log(string $log, string $status = 'info');

    /**
     * @param \Drupal\Core\Entity\EntityStorageInterface $fileStorage
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setFileStorage(\Drupal\Core\Entity\EntityStorageInterface $fileStorage): OpenPensionFilesProcessInterface;

    /**
     * @param string[] $trackingLogs
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setTrackingLogs(array $trackingLogs): OpenPensionFilesProcessInterface;

    /**
     * @param LoggerChannel $logger
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setLogger(LoggerChannel $logger): OpenPensionFilesProcessInterface;

    /**
     * @return LoggerChannel
     */
    public function getLogger(): LoggerChannel;

    /**
     * @return ClientInterface
     */
    public function getHttpClient(): ClientInterface;

    /**
     * @return string[]
     */
    public function getTrackingLogs(): array;

    /**
     * Updating the media entity which holds the file refrence.
     *
     * @param Media $media
     *  The file object.
     */
    public function updateEntity(Media $media);
}
