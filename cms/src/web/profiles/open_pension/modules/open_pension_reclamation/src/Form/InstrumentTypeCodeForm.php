<?php

namespace Drupal\open_pension_reclamation\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the instrument type code entity edit forms.
 */
class InstrumentTypeCodeForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {

    $entity = $this->getEntity();
    $result = $entity->save();
    $link = $entity->toLink($this->t('View'))->toRenderable();

    $message_arguments = ['%label' => $this->entity->label()];
    $logger_arguments = $message_arguments + ['link' => render($link)];

    if ($result == SAVED_NEW) {
      $this->messenger()->addStatus($this->t('New instrument type code %label has been created.', $message_arguments));
      $this->logger('open_pension_reclamation')->notice('Created new instrument type code %label', $logger_arguments);
    }
    else {
      $this->messenger()->addStatus($this->t('The instrument type code %label has been updated.', $message_arguments));
      $this->logger('open_pension_reclamation')->notice('Updated new instrument type code %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.instrument_type_code.canonical', ['instrument_type_code' => $entity->id()]);
  }

}
