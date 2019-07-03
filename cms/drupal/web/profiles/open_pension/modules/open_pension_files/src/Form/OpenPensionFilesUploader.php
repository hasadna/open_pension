<?php

namespace Drupal\open_pension_files\Form;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Controller\FormController;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class OpenPensionFilesUploader.
 */
class OpenPensionFilesUploader extends FormBase {


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
            '#upload_validators' => array(
                'file_validate_extensions' => array('xls xlsx'),
            ),
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
        $files = $form_state->getValue('selected_files');

//        $file = \Drupal::entityTypeManager()->getStorage('file');
//        dpm($file->loadMultiple($files));

        \Drupal::messenger()->addMessage(t('@files-length has been proccessed', ['@files-length' => count($files)]));
    }
}
