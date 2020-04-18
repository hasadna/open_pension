<?php

namespace Drupal\open_pension_files\Plugin\Action;

use Drupal\Core\Action\ConfigurableActionBase;
use Drupal\Core\File\FileSystem;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Drupal\open_pension_services\OpenPensionServicesHealthStatus;
use GuzzleHttp\Client;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Send files to process in the process service.
 *
 * @Action(
 *   id = "download_processed_files",
 *   label = @Translation("Download processed files"),
 *   type = "media"
 * )
 */
class DownloadProcessedFiles extends ConfigurableActionBase implements ContainerFactoryPluginInterface {

  /**
   * Drupal\open_pension_files\OpenPensionFilesProcessInterface definition.
   *
   * @var \Drupal\open_pension_files\OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesFileProcess;

  /**
   * Collecting a list of files.
   *
   * @var string[]
   */
  protected $collectedFiles;

  /**
   * @var FileSystem
   */
  protected $fileSystem;

  /**
   * @var string
   */
  protected $folderPath;

  /**
   * @var OpenPensionServicesHealthStatus
   */
  protected OpenPensionServicesHealthStatus $serviceHealthStatus;

  /**
   * @var OpenPensionServicesAddresses
   */
  protected OpenPensionServicesAddresses $serviceAddresses;

  /**
   * @var Client
   */
  protected Client $httpClient;

  /**
   * Constructs a new SendFilesToProcessor action.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin ID for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\open_pension_files\OpenPensionFilesProcessInterface $open_pension_files_file_process
   *   The file processor service.
   * @param FileSystem $fileSystem
   * @param OpenPensionServicesHealthStatus $service_health_status
   * @param OpenPensionServicesAddresses $services_addresses
   * @param Client $client
   * @param MessengerInterface $messenger
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    OpenPensionFilesProcessInterface
    $open_pension_files_file_process,
    FileSystem $fileSystem,
    OpenPensionServicesHealthStatus $service_health_status,
    OpenPensionServicesAddresses $services_addresses,
    Client $client,
    MessengerInterface $messenger
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->openPensionFilesFileProcess = $open_pension_files_file_process;
    $this->fileSystem = $fileSystem;
    $this->serviceHealthStatus = $service_health_status;
    $this->serviceAddresses = $services_addresses;
    $this->httpClient = $client;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('open_pension_files.file_process'),
      $container->get('file_system'),
      $container->get('open_pension_services.health_status'),
      $container->get('open_pension_services.services_addresses'),
      $container->get('http_client'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritDoc}
   */
  public function executeMultiple(array $entities) {

    if ($this->serviceHealthStatus->getProcessorState() === OpenPensionServicesHealthStatus::SERVICE_NOT_RESPONDING) {
      $this->messenger->addError(t('The processor service is not responding. Please check if the service alive or not.'));
      return;
    }

    $batch = array(
      'title' => t('Compressing files'),
      'operations' => [],
    );

    $operations = [];
    $operations[] = [[$this, 'createFolder'], []];

    foreach ($entities as $entity) {
      $operations[] = [[$this, 'acquireJsonFile'], [$entity]];
    }
//
//    $operations[] = [[$this, 'zipFiles'], []];
//    $operations[] = [[$this, 'setMessage'], []];
//
    $batch['operations'] = $operations;

    batch_set($batch);
  }

  /**
   * {@inheritDoc}
   */
  public function execute(Media $entity = NULL) {
    $this->acquireJsonFile($entity);
  }

  public function createFolder() {
    $this->folderPath = 'public://open_pension/zipped_file/' . time();
    $this->fileSystem->mkdir('public://open_pension/zipped_file/' . time(), NULL, TRUE);
  }

  public function acquireJsonFile(Media $entity = NULL) {
    // Get the file, process, remove unnecessary data.
    $file_url = open_pension_get_download_link($entity, TRUE);
    $json_body = $this->httpClient->get($file_url)->getBody()->getContents();

    list($file_name) = explode('.', $entity->label());
    $file_content = json_encode(json_decode($json_body)->data->item->processed);

    $this
      ->fileSystem
      ->saveData($file_content, "{$this->folderPath}");
  }

  public function zipFiles() {
    drupal_set_message('Zipping files...');
  }

  public function setMessage() {
    drupal_set_message('Download files');
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {}

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    return $account->hasPermission('manage file');
  }

}
