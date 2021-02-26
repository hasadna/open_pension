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
   * List of parsing errors.
   *
   * @var string[]
   */
  protected $parsingErrors = [];

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
   * {@inheritdoc}
   */
  public function sendFileToStorage(File $file): ResponseInterface {
    if ($this->healthServiceStatus->getStorageState() === OpenPensionServicesHealthStatus::SERVICE_NOT_RESPONDING) {
      $this->log(t('The storage service is not responding. Please check it\'s on the air'), 'error');
    }

    return $this->httpClient->request('post', "{$this->openPensionServicesAddress->getStorageAddress()}/file",
      [
        'multipart' => [
          [
            'name'     => 'file',
            'contents' => fopen($this->fileSystemService->realpath($file->getFileUri()), 'r'),
          ],
        ],
      ]);
  }

}
