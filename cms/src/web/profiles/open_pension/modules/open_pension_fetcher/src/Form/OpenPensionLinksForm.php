<?php

namespace Drupal\open_pension_fetcher\Form;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\open_pension_fetcher\OpenPensionFetcherQuery;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Form controller for the open pension links entity edit forms.
 */
class OpenPensionLinksForm extends ContentEntityForm {

  /**
   * @var OpenPensionFetcherQuery
   */
  protected $openPensionFetcherQuery;

  public function __construct(
    EntityRepositoryInterface $entity_repository,
    EntityTypeBundleInfoInterface $entity_type_bundle_info,
    TimeInterface $time,
    OpenPensionFetcherQuery $open_pension_fetcher_query
  ) {
    parent::__construct($entity_repository, $entity_type_bundle_info, $time);
    $this->openPensionFetcherQuery = $open_pension_fetcher_query;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.repository'),
      $container->get('entity_type.bundle.info'),
      $container->get('datetime.time'),
      $container->get('open_pension_fetcher.query')
    );
  }

  protected function idLabelProcessor($items) {
      $processed_items = [];
      foreach ($items as $item) {
        $processed_items[$item['Id']] = $item['Label'];
      }

      return $processed_items;
  }

  protected function processYears($items) {
    $processed_items = [];
    foreach ($items as $item) {
      $processed_items[$item] = $item;
    }

    return $processed_items;
  }

  protected function actions(array $form, FormStateInterface $form_state) {
    $actions = parent::actions($form, $form_state);
    $actions['submit']['#submit'] = ['::submitForm', '::sendMutation'];

    return $actions;
  }

  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $query_response = $this->openPensionFetcherQuery->query();
    dpm($this->openPensionFetcherQuery->mutate());

    $form['#attached']['library'][] = 'open_pension_fetcher/fetcher-service-query';
    $form['system_field'] = [
      '#type' => 'select',
      '#title' => t('System field'),
      '#options' => $this->idLabelProcessor($query_response['systemField']),
    ];

    $form['reports_type'] = [
      '#type' => 'select',
      '#title' => t('Reports type'),
      '#options' => $this->idLabelProcessor($query_response['reportsType']),
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
        'from_year' => [
          '#type' => 'select',
          '#title' => t('Years'),
          '#default_value' => date('Y'),
          '#options' => $this->processYears($query_response['fromYearRange']['Years']),
        ],
        'from_quarter' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => $this->idLabelProcessor($query_response['fromYearRange']['Quarters']),
        ],
      ],
      'to' => [
        '#type' => 'details',
        '#title' => $this->t('To'),
        'to_year' => [
          '#type' => 'select',
          '#default_value' => date('Y'),
          '#title' => t('Years'),
          '#options' => $this->processYears($query_response['fromYearRange']['Years']),
        ],
        'to_quarter' => [
          '#type' => 'select',
          '#title' => t('Quarters'),
          '#options' => $this->idLabelProcessor($query_response['fromYearRange']['Quarters']),
        ],
      ],
    ];

    unset($form['created']);

    return $form;
  }

  public function sendMutation(array $form, FormStateInterface $form_state) {
    dpm($form_state->getValues());
  }

}
