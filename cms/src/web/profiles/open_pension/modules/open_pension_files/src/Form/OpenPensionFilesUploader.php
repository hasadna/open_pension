<?php

namespace Drupal\open_pension_files\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class OpenPensionFilesUploader.
 */
class OpenPensionFilesUploader extends FormBase {

  /**
   * The file storage service.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $fileStorage;

  // @codingStandardsIgnoreStart
  /**
   * @var OpenPensionFilesProcessInterface
   */
  protected $fileProcessorService;

  /**
   * OpenPensionFilesUploader constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
   *   The entity service.
   *
   * @param MessengerInterface $messenger
   * @param OpenPensionFilesProcessInterface $file_processor
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function __construct(
    EntityTypeManagerInterface $entity_manager,
    MessengerInterface $messenger,
    OpenPensionFilesProcessInterface $file_processor
  ) {
    $this->fileStorage = $entity_manager->getStorage('file');
    $this->messenger = $messenger;
    $this->fileProcessorService = $file_processor;
  }
  // @codingStandardsIgnoreEnd

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('messenger'),
      $container->get('open_pension_files.file_process')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_pension_upload_files';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['selected_files'] = [
      '#title' => t('Select files to upload'),
      '#description' => t('You can add as many files as you want. The files will be sent to processor for parsing and the rest of the flow.'),
      '#type' => 'managed_file',
      '#upload_location' => 'public://open_pension_processor/',
      '#multiple' => TRUE,
      '#upload_validators' => ['file_validate_extensions' => ['xls xlsx']],
    ];

    $form['actions'] = [
      '#type' => 'actions',
      'submit' => [
        '#type' => 'submit',
        '#value' => t('Submit'),
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    /** @var File[] $files */
    $files = $this->fileStorage->loadMultiple($form_state->getValue('selected_files'));

    // todo: create a batch operation.
    foreach ($files as $file) {

      try {
        $this->fileProcessorService->sendFileToStorage($file);
      } catch (\Exception $e) {
        dpm($e);
      }
    }

    $this->messenger->addMessage(t('The file was sent to storage and will be processed later.'));
    $form_state->setRedirectUrl(Url::fromRoute('open_pension_core.main'));
  }

}
