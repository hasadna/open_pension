<?php

namespace Drupal\open_pension_files;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Logger\LoggerChannel;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\Plugin\views\field\ProcessorStatus;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use Drupal\views\Plugin\views\area\HTTPStatusCode;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\HttpFoundation\Response;

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
  protected $sentToProcessed = FALSE;

  /**
   * The process status.
   *
   * @var string
   */
  protected $processStatus = '';

  /**
   * The ID of the processed file from the service.
   *
   * @var string
   */
  protected $processedId;

  /**
   * @var OpenPensionServicesAddresses
   */
  protected $openPensionServicesAddress;

  /**
   * @var FileSystemInterface
   */
  protected $fileSystemService;

  /**
   * @var OpenPensionServicesHealthStatus
   */
  protected $healthServiceStatus;
  /**
   * @var MessengerInterface
   */
  private $messenger;

  /**
   * Constructs a new OpenPensionFilesFileProcess object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The http client service.
   * @param \Drupal\Core\Logger\LoggerChannel $logger
   *   The logger service.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
   *   The entity manager service.
   * @param OpenPensionServicesAddresses $open_pension_services_addresses
   *  The services addresses service.
   *
   * @param FileSystemInterface $fileSystemService
   * @param OpenPensionServicesHealthStatus $health_service_health_status
   * @param MessengerInterface $messenger
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function __construct(
    ClientInterface $http_client,
    LoggerChannel $logger,
    EntityTypeManagerInterface $entity_manager,
    OpenPensionServicesAddresses $open_pension_services_addresses,
    FileSystemInterface $fileSystemService,
    OpenPensionServicesHealthStatus $health_service_health_status,
    MessengerInterface $messenger
  ) {
    $this->httpClient = $http_client;
    $this->logger = $logger;
    $this->fileStorage = $entity_manager->getStorage('file');
    $this->openPensionServicesAddress = $open_pension_services_addresses;
    $this->fileSystemService = $fileSystemService;
    $this->healthServiceStatus = $health_service_health_status;
    $this->messenger = $messenger;
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

    if ($status == 'error') {
      $this->messenger->addMessage($log, $status);
    }

    return $this;
  }

  /**
   * Get the media related to the file.
   *
   * @param $file
   *  The file object.
   */
  protected function getMediaFromFile(File $file) {
    $media = \Drupal::entityQuery('media')
      ->condition('bundle', 'open_pension_file')
      ->condition('field_media_file', $file->id())
      ->execute();

    if (!$media) {
      return;
    }

    return Media::load(reset($media));
  }

  /**
   * {@inheritdoc}
   */
  public function sendToProcessor($file_id): OpenPensionFilesProcessInterface {
    /** @var \Drupal\file\Entity\File $file */
    $file = $this->fileStorage->load($file_id);

    if (!$file) {
      $this->log(t('Could not load a file with the ID @id', ['@id' => $file_id]));
      $this->sentToProcessed = FALSE;
      return $this;
    }

    $this->log(t('Starting to process the file @file_name', ['@file_name' => $file->getFilename()]));
    try {
      $results = $this->sendFileToServer($file);

      if ($results->getStatusCode() == Response::HTTP_CREATED) {
        $this->log(t('The file @file-name has been processed', ['@file-name' => $file->getFilename()]));
        $this->processedId = json_decode($results->getBody(), true)[0]['id'];
        $this->sentToProcessed = TRUE;
        $this->processStatus = ProcessorStatus::STATUS_NEW;
        return $this;
      }

      $this->log(t('The file @file-name was not able to process', ['@file-name' => $file->getFilename()]), 'error');
      $this->sentToProcessed = FALSE;
    }
    catch (\Exception $e) {
      $params = [
        '@file-name' => $file->getFilename(),
        '@error' => $e->getMessage(),
      ];
      $this->log(t('The file @file-name was not able to process due to @error', $params), 'error');
    }

    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function sendFileToServer(File $file): ResponseInterface {
    if ($this->healthServiceStatus->getProcessorState() === OpenPensionServicesHealthStatus::SERVICE_NOT_RESPONDING) {
      $this->log(t('The service is not responding. Please check it\'s on the air'), 'error');
    }

    return $this->httpClient->request('post', "{$this->openPensionServicesAddress->getProcessorAddress()}/upload",
      [
        'multipart' => [
          [
            'name'     => 'files',
            'contents' => fopen($this->fileSystemService->realpath($file->getFileUri()), 'r'),
          ],
        ],
      ]);
  }

  /**
   * {{@inheritDoc}}
   */
  public function processFile($file_id): OpenPensionFilesProcessInterface {
    if ($this->healthServiceStatus->getProcessorState() === OpenPensionServicesHealthStatus::SERVICE_NOT_RESPONDING) {
      $this->log(t('The service is not responding. Please check it\'s on the air'), 'error');
    }

    $file = $this->fileStorage->load($file_id);

    $this->log(t('Sending the file @file to the process service for processing.', ['@file' => $file->label()]));

    if (!$other_service = $this->getMediaFromFile($file)->field_reference_in_other_service) {
      $this->log(t('No media referenced to the file @file', ['@file' => $file->label()]), 'error');
      return $this;
    }

    try {
      $response = $this->httpClient->request('patch', "{$this->openPensionServicesAddress->getProcessorAddress()}/process/{$other_service->value}",
        [
          'multipart' => [
            [
              'name'     => 'files',
              'contents' => fopen($this->fileSystemService->realpath($file->getFileUri()), 'r'),
            ],
          ],
        ]);
    } catch (RequestException $e) {
      $params = [
        '@file-name' => $file->getFilename(),
        '@error' => $e->getMessage(),
      ];
      $this->log(t('The file @file-name was not able to process due to @error', $params), 'error');
      return $this;
    }

    if ($response->getStatusCode() < 200 && $response->getStatusCode() > 299) {
      $params = [
        '@file-name' => $file->getFilename(),
        '@error' => $e->getMessage(),
      ];
      $this->log(t('The file @file-name was not able to process due to @error', $params), 'error');
      return $this;
    }

    $parsed_response = json_decode($response->getBody()->getContents());

    // todo: log the errors in a field.

    $this->sentToProcessed = TRUE;
    $this->processStatus = $parsed_response->status;
    $this->log(t('Processing results for file @file: @results', [
      '@file' => $file->getFilename(),
      '@results' => $parsed->status
    ]));

    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function updateEntity(Media $media) {
    $media->field_processed = $this->sentToProcessed;

    if ($this->processedId) {
      $media->field_reference_in_other_service = $this->processedId;
    }

    if ($this->processStatus) {
      $media->field_processing_status = $this->processStatus;
    }

    // Add the history to the file.
    foreach ($this->getTrackingLogs() as $log) {
      $media->field_history->appendItem($log);
    }

    // Saving file.
    $media->save();
  }

}
