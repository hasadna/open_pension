<?php

namespace Drupal\open_pension_fetcher\Form;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\open_pension_fetcher\OpenPensionFetcherService;
use Drupal\open_pension_kafka\OpenPensionKafkaOrchestrator;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a Open Pension Fetcher form.
 */
class OpenPensionFetcherForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('open_pension_fetcher.query'),
      $container->get('messenger'),
      $container->get('open_pension_kafka.orchestrator'),
    );
  }

  /**
   * OpenPensionLinksForm constructor.
   *
   * @param EntityRepositoryInterface $entity_repository
   * @param EntityTypeBundleInfoInterface $entity_type_bundle_info
   * @param TimeInterface $time
   * @param OpenPensionFetcherService $open_pension_fetcher_query
   * @param MessengerInterface $messenger
   * @param OpenPensionKafkaOrchestrator $kafka_orchestrator
   */
  public function __construct(
    OpenPensionFetcherService $open_pension_fetcher_query,
    MessengerInterface $messenger,
    OpenPensionKafkaOrchestrator $kafka_orchestrator
  ) {
    $this->openPensionFetcherQuery = $open_pension_fetcher_query;
    $this->messenger = $messenger;
    $this->kafkaOrchestrator = $kafka_orchestrator;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_pension_fetcher_open_pension_fetcher';
  }

  /**
   * Constructing a list of id and label from the graphQL resluts.
   *
   * @param $items
   *  List of items form the query.
   * @return array
   *  Unified key-value array.
   */
  protected function idLabelProcessor($items) {
    $processed_items = [];
    foreach ($items as $item) {
      $processed_items[$item['Id']] = $item['Label'];
    }

    return $processed_items;
  }

  /**
   * Constructing a list of years from the GrpahQL query results.
   *
   * @param $items
   *  List of years.
   *
   * @return array
   *  List of key-value for presenting the years.
   */
  protected function processYears($items) {
    $processed_items = [];
    foreach ($items as $item) {
      $processed_items[$item] = $item;
    }

    return $processed_items;
  }

  /**
   * {@inheritDoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $query_response = $this->openPensionFetcherQuery->query();

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

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Send'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $form_keys = [
      'system_field',
      'reports_type',
      'from_year',
      'from_quarter',
      'to_year',
      'to_quarter',
    ];

    $payload = [];
    foreach ($form_keys as $key) {

      $value = $form_state->getValue($key);

      // Converting the quarters to a string.
      if (in_array($key, ['from_quarter', 'to_quarter'])) {
        $value = (string) $value;
      }

      // Converting the years to integers.
      if (in_array($key, ['to_year', 'from_year'])) {
        $value = (int) $value;
      }

      $payload[$key] = $value;
    }

    $this->kafkaOrchestrator->sendTopic('queryFiles', json_encode($payload));

    $this->messenger->addMessage(t('Success. The message was broadcast'));
    $form_state->setRedirect('open_pension_core.main');
  }

}
