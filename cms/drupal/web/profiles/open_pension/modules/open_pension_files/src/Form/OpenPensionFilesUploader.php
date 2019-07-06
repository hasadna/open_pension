<?php

namespace Drupal\open_pension_files\Form;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Controller\FormController;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesFileProcess;
use GuzzleHttp\Client;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class OpenPensionFilesUploader.
 */
class OpenPensionFilesUploader extends FormBase
{

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    protected $fileStorage;

    /**
     * OpenPensionFilesUploader constructor.
     */
    public function __construct(\Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager) {
        $this->fileStorage = $entity_manager->getStorage('file');
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
        return new static($container->get('entity_type.manager'));
    }

    /**
     * {@inheritDoc}
     */
    public function getFormId() {
        return 'open_pension_upload_files';
    }

    /**
     * Form constructor.
     *
     * @param array $form
     *   An associative array containing the structure of the form.
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     *   The current state of the form.
     *
     * @return array
     *   The form structure.
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $form['selected_files'] = [
            '#title' => t('Select files to upload'),
            '#description' => t('You can add as many files as you want. The files will be sent to processor for parsing and the rest of the flow.'),
            '#type' => 'managed_file',
            '#upload_location' => 'public://open_pension_processor/',
            '#multiple' => TRUE,
            '#upload_validators' => array('file_validate_extensions' => array('xls xlsx'),),
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
     * {@inheritDoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // todo: set this as a batch operation.
        $files = $this->fileStorage->loadMultiple($form_state->getValue('selected_files'));

        foreach ($files as $file) {
            // todo: check if the file was already uploaded.

            // Setting the file as permanent.
            $file->setPermanent();
            $file->save();

            // Create a media file so we could manage it later on.
            $media = Media::create(['bundle' => 'file']);

            $media->set('field_media_file', $file->id());
            $media->set('field_open_pension_file', true);
            $media->save();
        }

        \Drupal::messenger()->addMessage(t('@file-number has been uploaded.', ['@file-number' => count($files)]));

        $form_state->setRedirectUrl(Url::fromRoute('view.open_pension_uploaded_files.page_1'));
    }
}
