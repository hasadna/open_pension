<?php

namespace Drupal\open_pension_files\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the open pension storage files entity edit forms.
 */
class OpenPensionStorageFilesForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {

    $entity = $this->getEntity();
    $result = $entity->save();

    $message_arguments = ['%label' => $this->entity->toLink()->toString()];
    $logger_arguments = [
      '%label' => $this->entity->label(),
      'link' => $entity->toLink($this->t('View'))->toString(),
    ];

    switch ($result) {
      case SAVED_NEW:
        $this->messenger()->addStatus($this->t('New open pension storage files %label has been created.', $message_arguments));
        $this->logger('open_pension_files')->notice('Created new open pension storage files %label', $logger_arguments);
        break;

      case SAVED_UPDATED:
        $this->messenger()->addStatus($this->t('The open pension storage files %label has been updated.', $message_arguments));
        $this->logger('open_pension_files')->notice('Updated open pension storage files %label.', $logger_arguments);
        break;
    }

    $form_state->setRedirect('entity.open_pension_storage_files.collection');
  }

}
