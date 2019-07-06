<?php

namespace Drupal\open_pension_files;

use Drupal\Core\Executable\ExecutableException;
use Drupal\Core\Logger\LoggerChannel;
use GuzzleHttp\ClientInterface;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * Class OpenPensionFilesFileProcess.
 */
class OpenPensionFilesFileProcess implements OpenPensionFilesProcessInterface
{

    /**
     * GuzzleHttp\ClientInterface definition.
     *
     * @var ClientInterface
     */
    protected $httpClient;

    /**
     * @var LoggerChannel
     */
    protected $logger;

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    protected $fileStorage;

    /**
     * @var \Drupal\file\Entity\File[]
     */
    protected $files = [];

    /**
     * Constructs a new OpenPensionFilesFileProcess object.
     *
     * @param ClientInterface $http_client
     * @param LoggerChannel $logger
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
     *
     * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
     * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
     */
    public function __construct(ClientInterface $http_client, LoggerChannel $logger, \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager) {
        $this->httpClient = $http_client;
        $this->logger = $logger;
        $this->fileStorage = $entity_manager->getStorage('file');
    }

    /**
     * @param array $fids
     *
     * @return OpenPensionFilesFileProcess
     */
    public function loadFiles(array $fids) {
        $this->files = $this->fileStorage->loadMultiple($fids);
        $this->logger->log('info', 'Files were loaded from DB');

        return $this;
    }

    /**
     * Processing a file.
     *
     * @param $file_id
     *  The file ID.
     *
     * @return bool
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function processFile($file): bool {
        dpm($this->fileStorage->load($file));
        return false;
        $file = $this->files[$file_id];

        $this->logger->log('info', t('Starting to process the file @file_name', ['@file_name' => $file->getFilename()]));

        $results = $this->httpClient->request('get', 'http://google.com');

        if ($results->getStatusCode() == 200) {
            $this->logger->log('info', t('The processor processed the file successfully', ['@id' => $file_id]));
            return true;
        }

        $this->logger->log('error', t('The file @id has failed in the process', ['@id' => $file_id]));
        return false;
    }

}
