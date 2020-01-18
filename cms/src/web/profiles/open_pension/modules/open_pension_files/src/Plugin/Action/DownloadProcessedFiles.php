<?php

namespace Drupal\open_pension_files\Plugin\Action;

use Drupal\Core\Action\ConfigurableActionBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Psr\Log\LogLevel;
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
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, OpenPensionFilesProcessInterface $open_pension_files_file_process) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->openPensionFilesFileProcess = $open_pension_files_file_process;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
          $configuration,
          $plugin_id,
          $plugin_definition,
          $container->get('open_pension_files.file_process')
      );
  }

  public function executeMultiple(array $entities) {
    $operations = [];

    foreach ($entities as $entity) {
      $operations[] = [
        array(
          [get_class($this), 'executeSingle'],
          [$entity]
        ),
      ];
    }

    if ($operations) {
      $batch = [
        'operations' => $operations,
        'finished' => [get_class($this), 'finishBatch'],
      ];
      batch_set($batch);
    }
  }

  /**
   * Finish batch.
   *
   * @param bool $success
   *   Indicates whether the batch process was successful.
   * @param array $results
   *   Results information passed from the processing callback.
   */
  public static function finishBatch($success, $results) {
    \Drupal::messenger()->addMessage(
      \Drupal::translation()->formatPlural($results['processed'], 'One item has been processed.', '@count items have been processed.')
    );
  }

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\TypedData\Exception\MissingDataException
   * @throws \GuzzleHttp\Exception\GuzzleException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function execute(Media $entity = NULL) {
    $this->executeMultiple([$entity]);
  }

  /**
   * Process single item.
   *
   * @param Media $entity
   *  The entity object.
   *
   * @throws \Drupal\Core\TypedData\Exception\MissingDataException
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function executeSingle(Media $entity) {
    exit('a');
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
