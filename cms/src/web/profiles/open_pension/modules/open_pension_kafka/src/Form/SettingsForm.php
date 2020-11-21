<?php

namespace Drupal\open_pension_kafka\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Open Pension Kafka settings for this site.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_pension_kafka_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['open_pension_kafka.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $kafka_address = $this->config('open_pension_kafka.settings')->get('kafka_address');

    $form['kafka_address'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Example'),
      '#default_value' => $kafka_address ? $kafka_address : 'http://kafka',
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('open_pension_kafka.settings')
      ->set('kafka_address', $form_state->getValue('kafka_address'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
