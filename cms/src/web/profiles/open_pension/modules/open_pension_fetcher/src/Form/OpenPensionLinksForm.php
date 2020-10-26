<?php

namespace Drupal\open_pension_fetcher\Form;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\open_pension_fetcher\OpenPensionFetcherService;
use Drupal\open_pension_kafka\OpenPensionKafkaOrchestrator;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Form controller for the open pension links entity edit forms.
 */
class OpenPensionLinksForm extends ContentEntityForm {

  /**
   * @var OpenPensionFetcherService
   */
  protected $openPensionFetcherQuery;

  /**
   * The kafka orchestrator service.
   *
   * @var OpenPensionKafkaOrchestrator
   */
  protected $kafkaOrchestrator;

  /**
   * OpenPensionLinksForm constructor.
   * @param EntityRepositoryInterface $entity_repository
   * @param EntityTypeBundleInfoInterface $entity_type_bundle_info
   * @param TimeInterface $time
   * @param OpenPensionFetcherService $open_pension_fetcher_query
   * @param MessengerInterface $messenger
   * @param OpenPensionKafkaOrchestrator $kafka_orchestrator
   */
  public function __construct(
    EntityRepositoryInterface $entity_repository,
    EntityTypeBundleInfoInterface $entity_type_bundle_info,
    TimeInterface $time,
    OpenPensionFetcherService $open_pension_fetcher_query,
    MessengerInterface $messenger,
    OpenPensionKafkaOrchestrator $kafka_orchestrator
  ) {
    parent::__construct($entity_repository, $entity_type_bundle_info, $time);
    $this->openPensionFetcherQuery = $open_pension_fetcher_query;
    $this->messenger = $messenger;
    $this->kafkaOrchestrator = $kafka_orchestrator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.repository'),
      $container->get('entity_type.bundle.info'),
      $container->get('datetime.time'),
      $container->get('open_pension_fetcher.query'),
      $container->get('messenger'),
      $container->get('open_pension_kafka.orchestrator'),
    );
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
  protected function actions(array $form, FormStateInterface $form_state) {
    $actions = parent::actions($form, $form_state);

    if ($this->getOperation() == 'edit') {
      return $actions;
    }

    $actions['submit']['#submit'] = ['::submitForm', '::sendMutation'];

    return $actions;
  }

  /**
   * {@inheritDoc}
   */
  public function form(array $form, FormStateInterface $form_state) {

    $form = parent::form($form, $form_state);

    if ($this->getOperation() == 'edit') {
      return $form;
    }

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

    // No need to display the URL.
    $form['url']['#access'] = FALSE;
    $form['open_pension_file']['#access'] = FALSE;

    unset($form['created']);

    return $form;
  }

  /**
   * {@inheritDoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->getEntity();
    $result = $entity->save();
    $link = $entity->toLink($this->t('View'))->toRenderable();

    $message_arguments = ['%label' => $this->entity->label()];
    $logger_arguments = $message_arguments + ['link' => render($link)];

    if ($result == SAVED_NEW) {
      $this->messenger()->addStatus($this->t('New open pension links %label has been created.', $message_arguments));
      $this->logger('open_pension_fetcher')->notice('Created new open pension links %label', $logger_arguments);
    }
    else {
      $this->messenger()->addStatus($this->t('The open pension links %label has been updated.', $message_arguments));
      $this->logger('open_pension_fetcher')->notice('Updated new open pension links %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.open_pension_links.collection', ['open_pension_links' => $entity->id()]);
  }

  /**
   * Submit handler. Sending the mutation query.
   *
   * @param array $form
   *  The form variable we get from FAPI.
   * @param FormStateInterface $form_state
   *  The form state object we get from FAPI.
   */
  public function sendMutation(array $form, FormStateInterface $form_state) {
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
      $payload[$key] = $form_state->getValue($key);
    }

    $this->kafkaOrchestrator->sendTopic('queryFiles', json_encode($payload));

    $this->messenger->addMessage(t('Success. The message was broadcast'));
    $form_state->setRedirect('entity.open_pension_links.collection');
  }

}
