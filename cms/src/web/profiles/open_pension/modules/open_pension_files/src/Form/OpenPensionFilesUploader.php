<?php

namespace Drupal\open_pension_files\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\media\Entity\Media;
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
   * OpenPensionFilesUploader constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
   *   The entity service.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function __construct(EntityTypeManagerInterface $entity_manager) {
    $this->fileStorage = $entity_manager->getStorage('file');
  }
  // @codingStandardsIgnoreEnd

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('entity_type.manager'));
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
    /** @var \Drupal\file\Entity\File[] $files */
    $files = $this->fileStorage->loadMultiple($form_state->getValue('selected_files'));

    foreach ($files as $file) {
      // Setting the file as permanent.
      $file->setPermanent();
      $file->save();

      // Create a media file so we could manage it later on.
      $media = Media::create(['bundle' => 'open_pension_file']);

      // todo: send the file to the processor already. If it's failed then
      // never mind.

      $media->set('field_media_file', $file->id());
      $media->save();
    }

    \Drupal::messenger()->addMessage(t('@file-number has been uploaded.', ['@file-number' => count($files)]));

    $form_state->setRedirectUrl(Url::fromRoute('view.open_pension_uploaded_files.page_1'));
  }

}
