<?php

namespace Drupal\open_pension_services\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\open_pension_services\OpenPensionServicesAddresses;

/**
 * Configure Open Pension Services settings for this site.
 */
class ServicesAddresses extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_pension_services_services_addresses';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [OpenPensionServicesAddresses::SERVICES_ADDRESSES_CONFIG];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['processor'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Processor address'),
      '#default_value' => $this->config(OpenPensionServicesAddresses::SERVICES_ADDRESSES_CONFIG)->get('processor'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config(OpenPensionServicesAddresses::SERVICES_ADDRESSES_CONFIG)
      ->set('processor', $form_state->getValue('processor'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
