<?php

namespace Drupal\open_pension_fetcher\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the open pension links entity edit forms.
 */
class OpenPensionLinksForm extends ContentEntityForm {

  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $form['#attached']['library'][] = 'open_pension_fetcher/fetcher-service-query';
    $form['system_field'] = [
      '#type' => 'select',
      '#title' => t('System field'),
      '#options' => ['foo' => 'bar'],
    ];

    $form['reports_type'] = [
      '#type' => 'select',
      '#title' => t('Reports type'),
      '#options' => ['foo' => 'bar'],
    ];

    $form['period_filter'] = [
      '#type' => 'details',
      '#title' => $this->t('Filter by period'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#open' => TRUE,

      'from' => [
        '#type' => 'details',
        '#title' => $this->t('From'),
        'years' => [
          '#type' => 'select',
          '#title' => t('Years'),
          '#options' => ['foo' => 'bar'],
        ],
        'quarters' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => ['foo' => 'bar'],
        ],
      ],
      'to' => [
        '#type' => 'details',
        '#title' => $this->t('To'),
        'years' => [
          '#type' => 'select',
          '#title' => t('Years'),
          '#options' => ['foo' => 'bar'],
        ],
        'quarters' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => ['foo' => 'bar'],
        ],
      ],
    ];

    unset($form['created']);

    return $form;
  }

}
